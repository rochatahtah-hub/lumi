-- LUMI — "a base é o coração": busca na base própria, IA só para lacunas,
-- conteúdos encontrados pela IA com revisão, perguntas não encontradas e ciclo mensal de atualização.

create extension if not exists unaccent;
create extension if not exists pg_trgm;

-- unaccent não é IMMUTABLE; este wrapper permite usá-lo em índices e colunas geradas
create or replace function public.f_unaccent(text) returns text
language sql immutable parallel safe strict set search_path = public, extensions as $$
  select unaccent($1)
$$;

-- ─────────────────────────── busca textual nas aulas ───────────────────────────
alter table public.lessons add column search_doc tsvector;
alter table public.lessons add column search_text text not null default '';
create index lessons_search_doc_idx on public.lessons using gin (search_doc);
create index lessons_search_text_trgm on public.lessons using gin (search_text gin_trgm_ops);

create or replace function public.lessons_search_refresh() returns trigger
language plpgsql set search_path = public, extensions as $$
declare v_topic text;
begin
  select name into v_topic from topics where id = new.topic_id;
  new.search_text := lower(public.f_unaccent(concat_ws(' ', new.title, new.subtopic, v_topic, array_to_string(new.aliases, ' '), array_to_string(new.related_questions, ' '))));
  new.search_doc :=
    setweight(to_tsvector('portuguese', public.f_unaccent(coalesce(new.title, '') || ' ' || coalesce(new.subtopic, ''))), 'A') ||
    setweight(to_tsvector('portuguese', public.f_unaccent(array_to_string(new.aliases, ' ') || ' ' || coalesce(v_topic, ''))), 'A') ||
    setweight(to_tsvector('portuguese', public.f_unaccent(array_to_string(new.related_questions, ' '))), 'B') ||
    setweight(to_tsvector('portuguese', public.f_unaccent(coalesce(new.summary, '') || ' ' || coalesce(new.intro, ''))), 'C');
  return new;
end $$;
create trigger lessons_search_refresh before insert or update on public.lessons
  for each row execute function public.lessons_search_refresh();

-- lexemas da pergunta (já com radical em português e sem acento)
create or replace function public.query_lexemes(p_query text) returns text[]
language sql immutable set search_path = public, extensions as $$
  select coalesce(array_agg(distinct x), '{}') from unnest(tsvector_to_array(to_tsvector('portuguese', public.f_unaccent(coalesce(p_query, ''))))) x
$$;

-- Busca na base oficial (só aulas publicadas). score 0–100:
-- 80% = quanto das palavras da pergunta aparece no conteúdo (full-text), 20% = semelhança por trigramas.
create or replace function public.lumi_search(p_query text, p_subject text default null, p_limit int default 5)
returns table (id text, title text, subject_id text, score int)
language sql stable security definer set search_path = public, extensions as $$
  with q as (select public.query_lexemes(p_query) lex, lower(public.f_unaccent(p_query)) txt)
  select l.id, l.title, l.subject_id,
         round(least(100,
           80 * (select count(*)::numeric from unnest(q.lex) x where l.search_doc @@ to_tsquery('simple', quote_literal(x))) / greatest(array_length(q.lex, 1), 1)
         + 20 * greatest(similarity(l.search_text, q.txt), word_similarity(q.txt, l.search_text))
         ))::int as score
  from lessons l, q
  where l.status = 'published'
    and (p_subject is null or l.subject_id = p_subject)
    and array_length(q.lex, 1) > 0
    and (l.search_doc @@ to_tsquery('simple', array_to_string(array(select quote_literal(x) from unnest(q.lex) x), ' | '))
         or similarity(l.search_text, q.txt) > 0.3)
  order by score desc
  limit least(greatest(p_limit, 1), 20)
$$;

-- ─────────────────────────── conteúdos encontrados pela IA ───────────────────────────
-- Tudo que a IA pesquisa para preencher uma lacuna fica aqui até a revisão administrativa.
create table public.ai_found_contents (
  id uuid primary key default gen_random_uuid(),
  question text not null,                  -- pergunta feita pelo aluno
  topic text not null,                     -- assunto identificado
  subject_id text references public.subjects,
  level text,
  content jsonb not null,                  -- aula gerada (mesmo formato do app)
  sources jsonb not null default '[]',     -- fontes usadas na pesquisa [{title,url}]
  provider text,                           -- provedor de IA (só visível no painel)
  origin text not null default 'aluno' check (origin in ('aluno','admin','rotina')),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  times_served int not null default 1,     -- quantos alunos receberam este conteúdo antes da revisão
  lesson_id text references public.lessons on delete set null,
  review_notes text,
  reviewed_by uuid references auth.users,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  search_text text generated always as (lower(public.f_unaccent(topic || ' ' || question))) stored
);
create index ai_found_status_idx on public.ai_found_contents (status, created_at desc);
create index ai_found_search_trgm on public.ai_found_contents using gin (search_text gin_trgm_ops);
alter table public.ai_found_contents enable row level security;
create policy "conteúdos IA admin" on public.ai_found_contents for all using (public.is_admin()) with check (public.is_admin());

-- para a edge function: reaproveitar conteúdo já pesquisado (pendente) antes de chamar a IA de novo
create or replace function public.ai_found_match(p_query text, p_subject text default null)
returns setof public.ai_found_contents
language sql stable security definer set search_path = public, extensions as $$
  select * from ai_found_contents a
  where a.status = 'pending' and (p_subject is null or a.subject_id = p_subject or a.subject_id is null)
    and greatest(similarity(a.search_text, lower(public.f_unaccent(p_query))), word_similarity(lower(public.f_unaccent(p_query)), a.search_text)) >= 0.6
  order by similarity(a.search_text, lower(public.f_unaccent(p_query))) desc
  limit 1
$$;
revoke execute on function public.ai_found_match(text, text) from public, anon, authenticated;

-- "Adicionar à base oficial": publica a aula revisada e marca o conteúdo como aprovado
create or replace function public.admin_promote_ai_content(p_id uuid, p_lesson jsonb) returns text
language plpgsql security definer set search_path = public as $$
declare v_lesson text; v_item ai_found_contents;
begin
  if not public.is_admin() then raise exception 'acesso negado' using errcode = '42501'; end if;
  select * into v_item from ai_found_contents where id = p_id for update;
  if v_item.id is null then raise exception 'conteúdo não encontrado'; end if;
  v_lesson := public.admin_save_lesson(
    p_lesson || jsonb_build_object('origin', 'ia',
      'sources', coalesce(p_lesson->'sources', '[]'::jsonb) || coalesce((select jsonb_agg(s || jsonb_build_object('kind', coalesce(s->>'kind', 'site'))) from jsonb_array_elements(v_item.sources) s), '[]'::jsonb)),
    'published');
  update ai_found_contents set status = 'approved', lesson_id = v_lesson, reviewed_by = auth.uid(), reviewed_at = now() where id = p_id;
  update topic_requests set resolved_lesson_id = v_lesson where ai_content_id = p_id;
  return v_lesson;
end $$;

create or replace function public.admin_reject_ai_content(p_id uuid, p_notes text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'acesso negado' using errcode = '42501'; end if;
  update ai_found_contents set status = 'rejected', review_notes = left(p_notes, 1000), reviewed_by = auth.uid(), reviewed_at = now() where id = p_id;
end $$;

-- ─────────────────────────── perguntas que o LUMI não encontrou ───────────────────────────
alter table public.topic_requests add column possible_topic text;
alter table public.topic_requests add column ai_content_id uuid references public.ai_found_contents on delete set null;
alter table public.topic_requests add column resolved_lesson_id text references public.lessons on delete set null;
alter table public.topic_requests add column normalized text generated always as (lower(public.f_unaccent(trim(topic)))) stored;
create index topic_requests_norm_idx on public.topic_requests (normalized);

create or replace function public.log_topic_request(p_topic text, p_subject text, p_level text) returns void
language sql security definer set search_path = public as $$
  insert into topic_requests (topic, subject_id, level)
  select left(trim(p_topic), 200), left(p_subject, 30), left(p_level, 10) where char_length(trim(p_topic)) between 2 and 200
$$;

create or replace function public.admin_unanswered(p_days int default 90)
returns table (question text, times int, first_at timestamptz, last_at timestamptz, subject_id text, possible_topic text, has_ai_content boolean, resolved boolean)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'acesso negado' using errcode = '42501'; end if;
  return query
  select (array_agg(r.topic order by r.created_at desc))[1], count(*)::int, min(r.created_at), max(r.created_at),
         mode() within group (order by r.subject_id), max(r.possible_topic),
         bool_or(r.ai_content_id is not null), bool_or(r.resolved_lesson_id is not null)
  from topic_requests r
  where r.created_at > now() - make_interval(days => p_days)
  group by r.normalized
  order by count(*) desc, max(r.created_at) desc
  limit 300;
end $$;

-- ─────────────────────────── atualização mensal da base ───────────────────────────
create table public.kb_update_cycles (
  id bigint generated always as identity primary key,
  period_start timestamptz not null,
  closed_at timestamptz not null default now(),
  closed_by uuid references auth.users,
  notes text,
  summary jsonb not null
);
alter table public.kb_update_cycles enable row level security;
create policy "ciclos admin" on public.kb_update_cycles for select using (public.is_admin());

create or replace function public.kb_cycle_stats(p_since timestamptz) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'new_lessons', (select count(*) from lessons where created_at >= p_since),
    'reviewed_lessons', (select count(distinct lesson_id) from lesson_versions where saved_at >= p_since),
    'corrections', (select count(*) from lesson_versions v join lessons l on l.id = v.lesson_id where v.saved_at >= p_since and l.created_at < p_since),
    'new_questions', (
      select coalesce(sum(greatest(0, cur.n - coalesce(prev.n, 0))), 0)::int from (
        select l.id, (select count(*) from questions q where q.lesson_id = l.id) n, l.created_at from lessons l where l.updated_at >= p_since
      ) cur
      left join lateral (
        select jsonb_array_length(v.content->'questions') n from lesson_versions v
        where v.lesson_id = cur.id and v.saved_at >= p_since order by v.saved_at asc limit 1
      ) prev on cur.created_at < p_since
    ),
    'ai_found', (select count(*) from ai_found_contents where created_at >= p_since),
    'ai_approved', (select count(*) from ai_found_contents where status = 'approved' and reviewed_at >= p_since),
    'ai_pending', (select count(*) from ai_found_contents where status = 'pending'),
    'unanswered', (select count(distinct normalized) from topic_requests where created_at >= p_since),
    'published_total', (select count(*) from lessons where status = 'published'),
    'questions_total', (select count(*) from questions q join lessons l on l.id = q.lesson_id where l.status = 'published')
  )
$$;

create or replace function public.admin_kb_update_status() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare v_last kb_update_cycles; v_since timestamptz;
begin
  if not public.is_admin() then raise exception 'acesso negado' using errcode = '42501'; end if;
  select * into v_last from kb_update_cycles order by closed_at desc limit 1;
  v_since := coalesce(v_last.closed_at, (select min(created_at) from lessons), now());
  return jsonb_build_object(
    'last_update', v_last.closed_at,
    'next_update', coalesce(v_last.closed_at, v_since) + interval '1 month',
    'current_period_start', v_since,
    'current', public.kb_cycle_stats(v_since),
    'history', coalesce((select jsonb_agg(jsonb_build_object('id', c.id, 'period_start', c.period_start, 'closed_at', c.closed_at, 'notes', c.notes, 'summary', c.summary) order by c.closed_at desc)
                         from (select * from kb_update_cycles order by closed_at desc limit 12) c), '[]')
  );
end $$;

create or replace function public.admin_close_kb_cycle(p_notes text) returns void
language plpgsql security definer set search_path = public as $$
declare v_since timestamptz;
begin
  if not public.is_admin() then raise exception 'acesso negado' using errcode = '42501'; end if;
  v_since := coalesce((select max(closed_at) from kb_update_cycles), (select min(created_at) from lessons), now());
  insert into kb_update_cycles (period_start, closed_by, notes, summary) values (v_since, auth.uid(), left(p_notes, 2000), public.kb_cycle_stats(v_since));
end $$;

-- ─────────────────────────── histórico de versões com responsável ───────────────────────────
create or replace function public.admin_lesson_history(p_id text)
returns table (version int, saved_at timestamptz, saved_by_email text, content jsonb)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'acesso negado' using errcode = '42501'; end if;
  return query
  select v.version, v.saved_at, coalesce(u.email::text, 'sistema'), v.content
  from lesson_versions v left join auth.users u on u.id = v.saved_by
  where v.lesson_id = p_id order by v.version desc, v.saved_at desc limit 50;
end $$;

-- a versão guardada registra quem salvou a versão NOVA (o responsável pela alteração)
create or replace function public.lesson_versions_author() returns trigger
language plpgsql set search_path = public as $$
begin
  new.saved_by := coalesce(new.saved_by, auth.uid());
  return new;
end $$;
create trigger lesson_versions_author before insert on public.lesson_versions for each row execute function public.lesson_versions_author();

-- ─────────────────────────── painel ───────────────────────────
create or replace function public.admin_dashboard() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r jsonb;
begin
  if not public.is_admin() then raise exception 'acesso negado' using errcode = '42501'; end if;
  select jsonb_build_object(
    'students', (select count(distinct install_id) from study_sessions),
    'students_30d', (select count(distinct install_id) from study_sessions where finished_at > now() - interval '30 days'),
    'accounts', (select count(*) from profiles),
    'sessions', (select count(*) from study_sessions),
    'sessions_7d', (select count(*) from study_sessions where finished_at > now() - interval '7 days'),
    'attempts', (select count(*) from question_attempts),
    'subjects', (select count(*) from subjects),
    'topics', (select count(*) from topics),
    'lessons', (select count(*) from lessons),
    'lessons_published', (select count(*) from lessons where status = 'published'),
    'questions', (select count(*) from questions),
    'pending_research', (select count(*) from ai_found_contents where status = 'pending'),
    'unanswered_30d', (select count(distinct normalized) from topic_requests where created_at > now() - interval '30 days' and resolved_lesson_id is null),
    'most_accessed', coalesce((select jsonb_agg(x) from (select lesson_ref, subject_id, count(*) as sessions, round(avg(correct::numeric / nullif(total,0)) * 100) as avg_pct
                                 from study_sessions group by lesson_ref, subject_id order by count(*) desc limit 10) x), '[]'),
    'highest_error', coalesce((select jsonb_agg(x) from (select question_ref, skill, count(*) as attempts, round(avg(case when first_correct then 0 else 1 end) * 100) as error_pct
                                 from question_attempts group by question_ref, skill having count(*) >= 5 order by avg(case when first_correct then 0 else 1 end) desc, count(*) desc limit 10) x), '[]'),
    'requested_topics', coalesce((select jsonb_agg(x) from (select (array_agg(topic order by created_at desc))[1] as topic, count(*) as requests from topic_requests
                                 where created_at > now() - interval '60 days' group by normalized order by count(*) desc limit 15) x), '[]'),
    'sessions_by_day', coalesce((select jsonb_agg(x order by day) from (select date_trunc('day', finished_at)::date as day, count(*) as sessions
                                 from study_sessions where finished_at > now() - interval '14 days' group by 1) x), '[]')
  ) into r;
  return r;
end $$;

grant execute on function public.lumi_search(text, text, int) to anon, authenticated;
grant execute on function public.admin_promote_ai_content(uuid, jsonb) to authenticated;
grant execute on function public.admin_reject_ai_content(uuid, text) to authenticated;
grant execute on function public.admin_unanswered(int) to authenticated;
grant execute on function public.admin_kb_update_status() to authenticated;
grant execute on function public.admin_close_kb_cycle(text) to authenticated;
grant execute on function public.admin_lesson_history(text) to authenticated;
