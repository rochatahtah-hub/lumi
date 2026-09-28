-- LUMI — estrutura inicial
-- Base de conhecimento: matéria → série/ano → assunto → aula (conteúdo) → blocos (conceitos/exemplos) → questões → alternativas/dicas → revisão
-- Alunos: sessões, tentativas, progresso, conquistas (tudo opcional — o app funciona sem conta)
-- Preparado para: escolas, turmas, professores


-- ─────────────────────────── perfis e papéis ───────────────────────────
-- Dados mínimos: nada de nome completo, CPF, telefone ou endereço.
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  nickname text check (char_length(nickname) <= 20),
  level text check (level in ('fund1','fund2','medio')),
  role text not null default 'student' check (role in ('student','teacher','admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
$$;

-- escrita administrativa: admin logado, edge functions com service role, ou o seed rodando direto no banco
create or replace function public.can_admin() returns boolean
language sql stable security definer set search_path = public as $$
  -- via API o papel sempre vem preenchido (anon/authenticated/service_role); nulo = conexão direta ao banco (seed/migração)
  select public.is_admin() or auth.role() = 'service_role' or auth.role() is null
$$;

-- ─────────────────────────── base de conhecimento ───────────────────────────
create table public.subjects (
  id text primary key,
  name text not null,
  stage text[] not null default '{}', -- fund1, fund2, medio
  sort int not null default 0
);

create table public.grade_levels (
  id text primary key, -- ex.: 'ef-6', 'em-1'
  stage text not null check (stage in ('fund1','fund2','medio')),
  label text not null,
  sort int not null default 0
);

create table public.topics (
  id uuid primary key default gen_random_uuid(),
  subject_id text not null references public.subjects,
  grade_level_id text references public.grade_levels,
  name text not null,
  aliases text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (subject_id, name)
);

-- aula = conteúdo estudável de um assunto. status controla o que chega aos alunos.
create table public.lessons (
  id text primary key,
  topic_id uuid references public.topics on delete set null,
  subject_id text not null references public.subjects,
  title text not null,
  levels text[] not null default '{}',
  grade text not null default '',
  aliases text[] not null default '{}',          -- palavras-chave e sinônimos
  subtopic text not null default '',              -- subassunto
  related_questions text[] not null default '{}', -- perguntas como os alunos fazem
  summary text not null default '',
  intro text not null default '',
  review text[] not null default '{}',
  skills jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','in_review','published','archived')),
  origin text not null default 'base' check (origin in ('base','pesquisa','admin','ia')),
  version int not null default 1,
  created_by uuid references auth.users,
  updated_by uuid references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);
create index on public.lessons (subject_id, status);

-- conceito explicado (com exemplo e reformulações para o "Não entendi")
create table public.lesson_blocks (
  id uuid primary key default gen_random_uuid(),
  lesson_id text not null references public.lessons on delete cascade,
  position int not null,
  title text not null,
  text text not null,
  example text,
  skill text,
  variants jsonb not null default '{}'::jsonb,
  unique (lesson_id, position)
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id text not null references public.lessons on delete cascade,
  ref text not null, -- id estável dentro da aula (q1, q2…)
  position int not null,
  type text not null check (type in ('mc','tf','fill','match','open')),
  prompt text not null,
  difficulty int not null default 2 check (difficulty between 1 and 3),
  skill text not null,
  explanation text not null default '',
  answer_bool boolean,          -- tf
  answers text[],               -- fill (respostas aceitas)
  model_answer text,            -- open
  keywords text[],              -- open
  unique (lesson_id, ref)
);

-- alternativas (mc) e pares (match)
create table public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions on delete cascade,
  position int not null,
  label text not null,
  match_label text,             -- lado direito do par, em questões de associação
  is_correct boolean not null default false,
  unique (question_id, position)
);

create table public.question_hints (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions on delete cascade,
  level int not null check (level between 1 and 3),
  text text not null,
  unique (question_id, level)
);

-- histórico de versões: nada é sobrescrito sem deixar rastro
create table public.lesson_versions (
  id bigint generated always as identity primary key,
  lesson_id text not null references public.lessons on delete cascade,
  version int not null,
  content jsonb not null,
  saved_by uuid references auth.users,
  saved_at timestamptz not null default now()
);

-- ─────────────────────────── fontes e pesquisa ───────────────────────────
create table public.sources (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('curriculo','livro','material','site','instituicao','video','canal','autoral','ia')),
  title text not null,
  url text,
  author text,
  channel_id text,
  license text,                 -- ex.: 'youtube-standard', 'cc-by'
  trust text not null default 'unreviewed' check (trust in ('trusted','ok','unreviewed','rejected')),
  created_at timestamptz not null default now()
);
create unique index sources_title_url_key on public.sources (title, coalesce(url, ''));

create table public.lesson_sources (
  lesson_id text not null references public.lessons on delete cascade,
  source_id uuid not null references public.sources on delete cascade,
  note text,
  primary key (lesson_id, source_id)
);

-- canais, professores e instituições priorizados como fonte nas pesquisas
create table public.trusted_channels (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  youtube_channel_id text unique,
  subjects text[] not null default '{}',
  note text,
  active boolean not null default true
);

-- assuntos pedidos pelos alunos que ainda não existem na base
create table public.topic_requests (
  id bigint generated always as identity primary key,
  topic text not null check (char_length(topic) <= 200),
  subject_id text,
  level text,
  created_at timestamptz not null default now()
);

-- ─────────────────────────── uso dos alunos ───────────────────────────
-- install_id é um código aleatório do aparelho; user_id só existe se o aluno criou conta
create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  install_id uuid not null,
  user_id uuid references auth.users on delete set null,
  lesson_ref text not null,
  subject_id text,
  level text,
  mode text not null default 'aula',
  correct int not null,
  total int not null,
  hints_used int not null default 0,
  started_at timestamptz,
  finished_at timestamptz not null default now()
);
create index on public.study_sessions (lesson_ref);
create index on public.study_sessions (finished_at desc);

create table public.question_attempts (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.study_sessions on delete cascade,
  question_ref text not null,  -- 'licao:q3'
  skill text,
  first_correct boolean not null,
  tries int not null default 1,
  hints int not null default 0
);
create index on public.question_attempts (question_ref);

-- progresso completo do aluno com conta (espelho do armazenamento local)
create table public.progress_snapshots (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.achievements (
  id text primary key,
  title text not null,
  description text not null,
  icon text not null
);

create table public.user_achievements (
  user_id uuid not null references auth.users on delete cascade,
  achievement_id text not null references public.achievements,
  unlocked_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

-- limite diário de uso da IA por aparelho/usuário (proteção de custo)
create table public.ai_usage (
  bucket text not null,          -- install:<uuid> ou user:<uuid>
  day date not null default current_date,
  calls int not null default 0,
  primary key (bucket, day)
);

-- ─────────────────────────── expansão: escolas e turmas ───────────────────────────
create table public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);
create table public.classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools on delete cascade,
  teacher_id uuid references auth.users on delete set null,
  name text not null,
  grade_level_id text references public.grade_levels,
  join_code text unique,
  created_at timestamptz not null default now()
);
create table public.class_members (
  class_id uuid not null references public.classes on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  role text not null default 'student' check (role in ('student','teacher')),
  joined_at timestamptz not null default now(),
  primary key (class_id, user_id)
);

-- ─────────────────────────── RLS ───────────────────────────
alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.grade_levels enable row level security;
alter table public.topics enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_blocks enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.question_hints enable row level security;
alter table public.lesson_versions enable row level security;
alter table public.sources enable row level security;
alter table public.lesson_sources enable row level security;
alter table public.trusted_channels enable row level security;
alter table public.topic_requests enable row level security;
alter table public.study_sessions enable row level security;
alter table public.question_attempts enable row level security;
alter table public.progress_snapshots enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.ai_usage enable row level security;
alter table public.schools enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;

-- perfil: cada um vê/edita o seu (sem poder se promover a admin); admin vê todos
create policy "perfil próprio" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "editar perfil próprio" on public.profiles for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select p.role from public.profiles p where p.id = auth.uid()));
create policy "admin gerencia perfis" on public.profiles for update using (public.is_admin());

-- catálogo público (leitura), escrita só admin
create policy "catálogo leitura" on public.subjects for select using (true);
create policy "catálogo admin" on public.subjects for all using (public.is_admin()) with check (public.is_admin());
create policy "séries leitura" on public.grade_levels for select using (true);
create policy "séries admin" on public.grade_levels for all using (public.is_admin()) with check (public.is_admin());
create policy "assuntos leitura" on public.topics for select using (true);
create policy "assuntos admin" on public.topics for all using (public.is_admin()) with check (public.is_admin());
create policy "conquistas leitura" on public.achievements for select using (true);
create policy "conquistas admin" on public.achievements for all using (public.is_admin()) with check (public.is_admin());

-- aulas: aluno lê apenas publicadas (via função published_lessons); admin tudo
create policy "aulas publicadas" on public.lessons for select using (status = 'published' or public.is_admin());
create policy "aulas admin" on public.lessons for all using (public.is_admin()) with check (public.is_admin());
create policy "blocos admin" on public.lesson_blocks for all using (public.is_admin()) with check (public.is_admin());
create policy "questões admin" on public.questions for all using (public.is_admin()) with check (public.is_admin());
create policy "alternativas admin" on public.question_options for all using (public.is_admin()) with check (public.is_admin());
create policy "dicas admin" on public.question_hints for all using (public.is_admin()) with check (public.is_admin());
create policy "versões admin" on public.lesson_versions for all using (public.is_admin()) with check (public.is_admin());
create policy "fontes admin" on public.sources for all using (public.is_admin()) with check (public.is_admin());
create policy "fontes aula admin" on public.lesson_sources for all using (public.is_admin()) with check (public.is_admin());
create policy "canais admin" on public.trusted_channels for all using (public.is_admin()) with check (public.is_admin());
create policy "pedidos admin" on public.topic_requests for select using (public.is_admin());

-- uso: gravação só pelas funções log_*; aluno com conta lê o próprio; admin lê tudo
create policy "sessões leitura" on public.study_sessions for select using (user_id = auth.uid() or public.is_admin());
create policy "tentativas admin" on public.question_attempts for select using (public.is_admin());
create policy "snapshot próprio" on public.progress_snapshots for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "conquistas próprias" on public.user_achievements for all using (user_id = auth.uid()) with check (user_id = auth.uid());
-- ai_usage: sem policies = inacessível pelo cliente (só service role nas edge functions)

create policy "escolas admin" on public.schools for all using (public.is_admin()) with check (public.is_admin());
create policy "turmas professor/admin" on public.classes for all using (teacher_id = auth.uid() or public.is_admin()) with check (teacher_id = auth.uid() or public.is_admin());
create policy "membros da turma" on public.class_members for select using (user_id = auth.uid() or public.is_admin()
  or exists (select 1 from public.classes c where c.id = class_id and c.teacher_id = auth.uid()));

-- ─────────────────────────── funções ───────────────────────────
-- monta a aula completa (formato do app) a partir das tabelas normalizadas
create or replace function public.lesson_json(p_id text) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'id', l.id, 'subject', l.subject_id, 'title', l.title, 'levels', to_jsonb(l.levels), 'grade', l.grade,
    'aliases', to_jsonb(l.aliases), 'topic', coalesce((select t.name from topics t where t.id = l.topic_id), ''), 'subtopic', l.subtopic,
    'relatedQuestions', to_jsonb(l.related_questions), 'summary', l.summary, 'intro', l.intro, 'review', to_jsonb(l.review), 'skills', l.skills,
    'status', l.status, 'version', l.version,
    'blocks', coalesce((select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('id', 'b' || b.position, 'title', b.title, 'text', b.text, 'example', b.example, 'skill', b.skill, 'variants', b.variants)) order by b.position)
                        from lesson_blocks b where b.lesson_id = l.id), '[]'::jsonb),
    'questions', coalesce((select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
        'id', q.ref, 'type', q.type, 'prompt', q.prompt, 'difficulty', q.difficulty, 'skill', q.skill, 'explanation', q.explanation,
        'answer', case q.type when 'tf' then to_jsonb(q.answer_bool)
                              when 'mc' then (select to_jsonb(o.position) from question_options o where o.question_id = q.id and o.is_correct limit 1) end,
        'options', case when q.type = 'mc' then (select jsonb_agg(o.label order by o.position) from question_options o where o.question_id = q.id) end,
        'pairs', case when q.type = 'match' then (select jsonb_agg(jsonb_build_array(o.label, o.match_label) order by o.position) from question_options o where o.question_id = q.id) end,
        'answers', to_jsonb(q.answers), 'modelAnswer', q.model_answer, 'keywords', to_jsonb(q.keywords),
        'hints', (select jsonb_agg(h.text order by h.level) from question_hints h where h.question_id = q.id)
      )) order by q.position) from questions q where q.lesson_id = l.id), '[]'::jsonb),
    'sources', coalesce((select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('title', s.title, 'url', s.url, 'author', s.author, 'kind', s.kind)))
                         from lesson_sources ls join sources s on s.id = ls.source_id where ls.lesson_id = l.id), '[]'::jsonb)
  )
  from lessons l where l.id = p_id and (l.status = 'published' or public.can_admin())
$$;

create or replace function public.published_lessons() returns table (id text, content jsonb)
language sql stable security definer set search_path = public as $$
  select l.id, public.lesson_json(l.id) from lessons l where l.status = 'published'
$$;

-- salva a aula inteira de uma vez (transação), guardando a versão anterior
create or replace function public.admin_save_lesson(p jsonb, p_status text default null) returns text
language plpgsql security definer set search_path = public as $$
declare
  v_id text := p->>'id';
  v_prev jsonb;
  v_q jsonb;
  v_qid uuid;
  v_i int;
  v_pos int := 0;
  v_status text;
  v_src jsonb;
  v_sid uuid;
  v_topic uuid;
begin
  if not public.can_admin() then raise exception 'acesso negado' using errcode = '42501'; end if;
  if v_id is null or coalesce(p->>'title','') = '' then raise exception 'aula sem id ou título'; end if;

  select public.lesson_json(v_id) into v_prev;
  if v_prev is not null then
    insert into lesson_versions (lesson_id, version, content, saved_by) values (v_id, (v_prev->>'version')::int, v_prev, auth.uid());
  end if;

  v_status := coalesce(p_status, (select status from lessons where id = v_id), 'draft');

  v_topic := null;
  if coalesce(trim(p->>'topic'), '') <> '' then
    insert into topics (subject_id, name) values (p->>'subject', trim(p->>'topic'))
    on conflict (subject_id, name) do update set name = excluded.name
    returning id into v_topic;
  end if;

  insert into lessons (id, subject_id, topic_id, title, levels, grade, aliases, subtopic, related_questions, summary, intro, review, skills, status, origin, created_by, updated_by, published_at)
  values (v_id, p->>'subject', v_topic, p->>'title',
          coalesce(array(select jsonb_array_elements_text(p->'levels')), '{}'), coalesce(p->>'grade',''),
          coalesce(array(select jsonb_array_elements_text(p->'aliases')), '{}'), coalesce(p->>'subtopic',''),
          coalesce(array(select jsonb_array_elements_text(p->'relatedQuestions')), '{}'), coalesce(p->>'summary',''), coalesce(p->>'intro',''),
          coalesce(array(select jsonb_array_elements_text(p->'review')), '{}'), coalesce(p->'skills','{}'::jsonb),
          v_status, case when p->>'origin' in ('base','pesquisa','admin','ia') then p->>'origin' else 'admin' end, auth.uid(), auth.uid(), case when v_status = 'published' then now() end)
  on conflict (id) do update set
    subject_id = excluded.subject_id, topic_id = excluded.topic_id, title = excluded.title, levels = excluded.levels, grade = excluded.grade, aliases = excluded.aliases,
    subtopic = excluded.subtopic, related_questions = excluded.related_questions,
    summary = excluded.summary, intro = excluded.intro, review = excluded.review, skills = excluded.skills, status = v_status,
    version = lessons.version + 1, updated_by = auth.uid(), updated_at = now(),
    published_at = case when v_status = 'published' and lessons.status <> 'published' then now() else lessons.published_at end;

  delete from lesson_blocks where lesson_id = v_id;
  insert into lesson_blocks (lesson_id, position, title, text, example, skill, variants)
  select v_id, t.n, t.b->>'title', t.b->>'text', nullif(t.b->>'example',''), nullif(t.b->>'skill',''), coalesce(t.b->'variants','{}'::jsonb)
  from jsonb_array_elements(coalesce(p->'blocks','[]'::jsonb)) with ordinality as t(b, n);

  delete from questions where lesson_id = v_id;
  for v_q in select * from jsonb_array_elements(coalesce(p->'questions','[]'::jsonb)) loop
    v_pos := v_pos + 1;
    insert into questions (lesson_id, ref, position, type, prompt, difficulty, skill, explanation, answer_bool, answers, model_answer, keywords)
    values (v_id, coalesce(v_q->>'id', 'q' || v_pos), v_pos, v_q->>'type', v_q->>'prompt', coalesce((v_q->>'difficulty')::int, 2), coalesce(v_q->>'skill','geral'),
            coalesce(v_q->>'explanation',''),
            case when v_q->>'type' = 'tf' then (v_q->>'answer')::boolean end,
            case when v_q->>'type' = 'fill' then array(select jsonb_array_elements_text(v_q->'answers')) end,
            case when v_q->>'type' = 'open' then v_q->>'modelAnswer' end,
            case when v_q->>'type' = 'open' then array(select jsonb_array_elements_text(v_q->'keywords')) end)
    returning id into v_qid;

    if v_q->>'type' = 'mc' then
      for v_i in 0 .. jsonb_array_length(v_q->'options') - 1 loop
        insert into question_options (question_id, position, label, is_correct) values (v_qid, v_i, v_q->'options'->>v_i, v_i = (v_q->>'answer')::int);
      end loop;
    elsif v_q->>'type' = 'match' then
      for v_i in 0 .. jsonb_array_length(v_q->'pairs') - 1 loop
        insert into question_options (question_id, position, label, match_label, is_correct) values (v_qid, v_i, v_q->'pairs'->v_i->>0, v_q->'pairs'->v_i->>1, true);
      end loop;
    end if;

    for v_i in 0 .. least(coalesce(jsonb_array_length(v_q->'hints'), 0), 3) - 1 loop
      insert into question_hints (question_id, level, text) values (v_qid, v_i + 1, v_q->'hints'->>v_i);
    end loop;
  end loop;

  -- fontes: reaproveita a mesma fonte entre aulas (mesmo título + url)
  delete from lesson_sources where lesson_id = v_id;
  for v_src in select * from jsonb_array_elements(coalesce(p->'sources','[]'::jsonb)) loop
    continue when coalesce(v_src->>'title','') = '';
    select id into v_sid from sources where title = v_src->>'title' and coalesce(url,'') = coalesce(v_src->>'url','') limit 1;
    if v_sid is null then
      insert into sources (kind, title, url, author, trust)
      values (case when v_src->>'kind' in ('curriculo','livro','material','site','instituicao','video','canal','autoral','ia') then v_src->>'kind' else 'site' end,
              v_src->>'title', nullif(v_src->>'url',''), nullif(v_src->>'author',''), 'ok')
      returning id into v_sid;
    end if;
    insert into lesson_sources (lesson_id, source_id) values (v_id, v_sid) on conflict do nothing;
  end loop;

  return v_id;
end $$;

create or replace function public.admin_set_lesson_status(p_id text, p_status text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.can_admin() then raise exception 'acesso negado' using errcode = '42501'; end if;
  update lessons set status = p_status, updated_by = auth.uid(), updated_at = now(),
    published_at = case when p_status = 'published' then coalesce(published_at, now()) else published_at end
  where id = p_id;
end $$;

-- registro anônimo de sessão (único caminho de escrita em study_sessions/question_attempts)
create or replace function public.log_study_session(
  p_install_id uuid, p_lesson_ref text, p_subject text, p_level text, p_mode text,
  p_correct int, p_total int, p_hints int, p_started_at timestamptz, p_finished_at timestamptz, p_attempts jsonb
) returns void
language plpgsql security definer set search_path = public as $$
declare v_sid uuid;
begin
  if p_total < 0 or p_total > 30 or p_correct < 0 or p_correct > p_total or char_length(p_lesson_ref) > 80
     or jsonb_array_length(coalesce(p_attempts,'[]'::jsonb)) > 30 then
    raise exception 'sessão inválida';
  end if;
  -- anti-abuso simples: no máximo 200 sessões por aparelho por dia
  if (select count(*) from study_sessions where install_id = p_install_id and finished_at > now() - interval '1 day') >= 200 then return; end if;

  insert into study_sessions (install_id, user_id, lesson_ref, subject_id, level, mode, correct, total, hints_used, started_at, finished_at)
  values (p_install_id, auth.uid(), p_lesson_ref, left(p_subject, 30), left(p_level, 10), left(p_mode, 10), p_correct, p_total, greatest(p_hints, 0),
          p_started_at, least(coalesce(p_finished_at, now()), now()))
  returning id into v_sid;

  insert into question_attempts (session_id, question_ref, skill, first_correct, tries, hints)
  select v_sid, left(a->>'question_ref', 120), left(a->>'skill', 120), coalesce((a->>'first_correct')::boolean, false),
         least(greatest(coalesce((a->>'tries')::int, 1), 0), 20), least(greatest(coalesce((a->>'hints')::int, 0), 0), 3)
  from jsonb_array_elements(coalesce(p_attempts,'[]'::jsonb)) a;
end $$;

create or replace function public.log_topic_request(p_topic text, p_subject text, p_level text) returns void
language sql security definer set search_path = public as $$
  insert into topic_requests (topic, subject_id, level) select left(trim(p_topic), 200), left(p_subject, 30), left(p_level, 10) where char_length(trim(p_topic)) between 2 and 200
$$;

-- painel: números gerais e rankings
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
    'most_accessed', coalesce((select jsonb_agg(x) from (select lesson_ref, subject_id, count(*) as sessions, round(avg(correct::numeric / nullif(total,0)) * 100) as avg_pct
                                 from study_sessions group by lesson_ref, subject_id order by count(*) desc limit 10) x), '[]'),
    'highest_error', coalesce((select jsonb_agg(x) from (select question_ref, skill, count(*) as attempts, round(avg(case when first_correct then 0 else 1 end) * 100) as error_pct
                                 from question_attempts group by question_ref, skill having count(*) >= 5 order by avg(case when first_correct then 0 else 1 end) desc, count(*) desc limit 10) x), '[]'),
    'requested_topics', coalesce((select jsonb_agg(x) from (select lower(topic) as topic, count(*) as requests from topic_requests
                                 where created_at > now() - interval '60 days' group by lower(topic) order by count(*) desc limit 15) x), '[]'),
    'sessions_by_day', coalesce((select jsonb_agg(x order by day) from (select date_trunc('day', finished_at)::date as day, count(*) as sessions
                                 from study_sessions where finished_at > now() - interval '14 days' group by 1) x), '[]')
  ) into r;
  return r;
end $$;

grant execute on function public.published_lessons() to anon, authenticated;
grant execute on function public.lesson_json(text) to anon, authenticated;
grant execute on function public.log_study_session(uuid, text, text, text, text, int, int, int, timestamptz, timestamptz, jsonb) to anon, authenticated;
grant execute on function public.log_topic_request(text, text, text) to anon, authenticated;
grant execute on function public.admin_save_lesson(jsonb, text) to authenticated;
grant execute on function public.admin_set_lesson_status(text, text) to authenticated;
grant execute on function public.admin_dashboard() to authenticated;
grant execute on function public.is_admin() to authenticated;

-- ─────────────────────────── dados iniciais ───────────────────────────
insert into public.subjects (id, name, stage, sort) values
  ('matematica','Matemática','{fund1,fund2,medio}',1), ('portugues','Português','{fund1,fund2,medio}',2),
  ('ciencias','Ciências','{fund1,fund2}',3), ('historia','História','{fund1,fund2,medio}',4),
  ('geografia','Geografia','{fund1,fund2,medio}',5), ('ingles','Inglês','{fund1,fund2,medio}',6),
  ('artes','Artes','{fund1,fund2}',7), ('literatura','Literatura','{medio}',8), ('fisica','Física','{medio}',9),
  ('quimica','Química','{medio}',10), ('biologia','Biologia','{medio}',11), ('filosofia','Filosofia','{medio}',12),
  ('sociologia','Sociologia','{medio}',13)
on conflict do nothing;

insert into public.grade_levels (id, stage, label, sort) values
  ('ef-1','fund1','1º ano',1),('ef-2','fund1','2º ano',2),('ef-3','fund1','3º ano',3),('ef-4','fund1','4º ano',4),('ef-5','fund1','5º ano',5),
  ('ef-6','fund2','6º ano',6),('ef-7','fund2','7º ano',7),('ef-8','fund2','8º ano',8),('ef-9','fund2','9º ano',9),
  ('em-1','medio','1ª série',10),('em-2','medio','2ª série',11),('em-3','medio','3ª série',12)
on conflict do nothing;

insert into public.achievements (id, title, description, icon) values
  ('primeira-aula','Primeira aula concluída','Terminou sua primeira atividade.','🎓'),
  ('dez-questoes','10 questões respondidas','Respondeu 10 questões.','✏️'),
  ('cinquenta-questoes','50 questões respondidas','Respondeu 50 questões.','📝'),
  ('nota-maxima','Nota máxima','Acertou todas as questões de uma atividade.','⭐'),
  ('sem-dicas','Por conta própria','Concluiu uma atividade sem usar dicas.','💪'),
  ('tres-dias','3 dias estudando','Estudou 3 dias seguidos.','🔥'),
  ('cinco-dias','5 dias estudando','Estudou 5 dias seguidos.','🔥'),
  ('explorador','Explorador','Estudou 3 matérias diferentes.','🧭'),
  ('cinco-conteudos','5 conteúdos concluídos','Concluiu 5 assuntos diferentes.','📚'),
  ('revisao','Revisão em dia','Fez sua primeira revisão.','🔄'),
  ('meu-conteudo','Meu próprio material','Estudou um conteúdo que você colou.','📄')
on conflict do nothing;

-- canais educacionais sugeridos para a pesquisa (ids do YouTube são resolvidos pela rotina e revisados no painel)
insert into public.trusted_channels (name, subjects, note) values
  ('Khan Academy Brasil', '{matematica,ciencias,fisica,quimica,biologia}', 'Organização sem fins lucrativos; licenças abertas em parte do acervo'),
  ('Brasil Escola', '{matematica,portugues,historia,geografia,biologia,quimica,fisica}', 'Portal educacional'),
  ('Me Salva!', '{matematica,fisica,quimica,biologia,portugues}', 'Foco em Ensino Médio/ENEM'),
  ('Descomplica', '{matematica,portugues,historia,geografia,biologia,quimica,fisica,filosofia,sociologia}', 'Foco em Ensino Médio/ENEM'),
  ('Professor Ferretto', '{matematica}', 'Matemática'),
  ('Biologia Total', '{biologia,ciencias}', 'Biologia'),
  ('Débora Aladim', '{historia}', 'História'),
  ('Professor Noslen', '{portugues,literatura}', 'Língua Portuguesa'),
  ('Manual do Mundo', '{ciencias,fisica,quimica}', 'Divulgação científica — conferir alinhamento curricular'),
  ('Canal Futura', '{ciencias,historia,geografia,portugues,artes}', 'TV educativa (Fundação Roberto Marinho)')
on conflict do nothing;

-- contador de uso da IA (chamado só pelas edge functions com service role)
create or replace function public.ai_bump(p_bucket text, p_limit int) returns boolean
language plpgsql security definer set search_path = public as $$
declare v int;
begin
  insert into ai_usage (bucket, day, calls) values (p_bucket, current_date, 1)
  on conflict (bucket, day) do update set calls = ai_usage.calls + 1
  returning calls into v;
  return v <= p_limit;
end $$;
revoke execute on function public.ai_bump(text, int) from public, anon, authenticated;
