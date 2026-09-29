-- LUMI — acervo educacional estruturado
-- objetivo, pré-requisitos/próximo conteúdo, perguntas equivalentes, dúvidas e erros comuns, fórmulas,
-- dados de História, relação com o ENEM, data da última revisão, exercício "ordenar", data de acesso das fontes
-- e busca semântica (pgvector) como reforço da busca textual.

create extension if not exists vector;

insert into public.subjects (id, name, stage, sort) values
  ('redacao', 'Redação', '{fund2,medio}', 14), ('edfisica', 'Educação Física', '{fund1,fund2,medio}', 15)
on conflict do nothing;
update public.subjects set name = 'Arte', stage = '{fund1,fund2,medio}' where id = 'artes';

alter table public.lessons
  add column objective text not null default '',
  add column prerequisites text[] not null default '{}',
  add column next_lessons text[] not null default '{}',
  add column equivalent_questions text[] not null default '{}',
  add column common_doubts jsonb not null default '[]',
  add column common_errors text[] not null default '{}',
  add column formulas jsonb not null default '[]',
  add column history jsonb,
  add column enem text not null default '',
  add column reviewed_at timestamptz;

-- exercício "ordenar": os itens (na ordem correta) ficam em questions.answers
alter table public.questions drop constraint questions_type_check;
alter table public.questions add constraint questions_type_check check (type in ('mc','tf','fill','match','open','order'));

alter table public.sources add column accessed_at date;

-- busca textual passa a considerar as perguntas equivalentes
create or replace function public.lessons_search_refresh() returns trigger
language plpgsql set search_path = public, extensions as $$
declare v_topic text;
begin
  select name into v_topic from topics where id = new.topic_id;
  new.search_text := lower(public.f_unaccent(concat_ws(' ', new.title, new.subtopic, v_topic, array_to_string(new.aliases, ' '),
    array_to_string(new.related_questions, ' '), array_to_string(new.equivalent_questions, ' '))));
  new.search_doc :=
    setweight(to_tsvector('portuguese', public.f_unaccent(coalesce(new.title, '') || ' ' || coalesce(new.subtopic, ''))), 'A') ||
    setweight(to_tsvector('portuguese', public.f_unaccent(array_to_string(new.aliases, ' ') || ' ' || coalesce(v_topic, ''))), 'A') ||
    setweight(to_tsvector('portuguese', public.f_unaccent(array_to_string(new.related_questions, ' ') || ' ' || array_to_string(new.equivalent_questions, ' '))), 'B') ||
    setweight(to_tsvector('portuguese', public.f_unaccent(coalesce(new.summary, '') || ' ' || coalesce(new.intro, '') || ' ' || coalesce(new.objective, ''))), 'C');
  return new;
end $$;

-- ─────────────────────────── aula completa (formato do app) ───────────────────────────
create or replace function public.lesson_json(p_id text) returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_strip_nulls(jsonb_build_object(
    'id', l.id, 'subject', l.subject_id, 'title', l.title, 'levels', to_jsonb(l.levels), 'grade', l.grade,
    'aliases', to_jsonb(l.aliases), 'topic', coalesce((select t.name from topics t where t.id = l.topic_id), ''), 'subtopic', l.subtopic,
    'relatedQuestions', to_jsonb(l.related_questions), 'equivalentQuestions', to_jsonb(l.equivalent_questions),
    'summary', l.summary, 'intro', l.intro, 'objective', nullif(l.objective, ''),
    'prerequisites', to_jsonb(l.prerequisites), 'next', to_jsonb(l.next_lessons),
    'review', to_jsonb(l.review), 'skills', l.skills,
    'commonDoubts', l.common_doubts, 'commonErrors', to_jsonb(l.common_errors), 'formulas', l.formulas, 'history', l.history,
    'enem', nullif(l.enem, ''),
    'status', l.status, 'version', l.version, 'createdAt', l.created_at, 'reviewedAt', l.reviewed_at,
    'blocks', coalesce((select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('id', 'b' || b.position, 'title', b.title, 'text', b.text, 'example', b.example, 'skill', b.skill, 'variants', b.variants)) order by b.position)
                        from lesson_blocks b where b.lesson_id = l.id), '[]'::jsonb),
    'questions', coalesce((select jsonb_agg(jsonb_strip_nulls(jsonb_build_object(
        'id', q.ref, 'type', q.type, 'prompt', q.prompt, 'difficulty', q.difficulty, 'skill', q.skill, 'explanation', q.explanation,
        'answer', case q.type when 'tf' then to_jsonb(q.answer_bool)
                              when 'mc' then (select to_jsonb(o.position) from question_options o where o.question_id = q.id and o.is_correct limit 1) end,
        'options', case when q.type = 'mc' then (select jsonb_agg(o.label order by o.position) from question_options o where o.question_id = q.id) end,
        'pairs', case when q.type = 'match' then (select jsonb_agg(jsonb_build_array(o.label, o.match_label) order by o.position) from question_options o where o.question_id = q.id) end,
        'answers', case when q.type = 'fill' then to_jsonb(q.answers) end,
        'items', case when q.type = 'order' then to_jsonb(q.answers) end,
        'modelAnswer', q.model_answer, 'keywords', to_jsonb(q.keywords),
        'hints', (select jsonb_agg(h.text order by h.level) from question_hints h where h.question_id = q.id)
      )) order by q.position) from questions q where q.lesson_id = l.id), '[]'::jsonb),
    'sources', coalesce((select jsonb_agg(jsonb_strip_nulls(jsonb_build_object('title', s.title, 'url', s.url, 'author', s.author, 'kind', s.kind, 'accessedAt', s.accessed_at)))
                         from lesson_sources ls join sources s on s.id = ls.source_id where ls.lesson_id = l.id), '[]'::jsonb)
  ))
  from lessons l where l.id = p_id and (l.status = 'published' or public.can_admin())
$$;

-- ─────────────────────────── salvar (com versão anterior no histórico) ───────────────────────────
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

  insert into lessons (id, subject_id, topic_id, title, levels, grade, aliases, subtopic, related_questions, equivalent_questions,
                       summary, intro, objective, prerequisites, next_lessons, review, skills, common_doubts, common_errors, formulas, history, enem,
                       status, origin, created_by, updated_by, published_at, reviewed_at)
  values (v_id, p->>'subject', v_topic, p->>'title',
          coalesce(array(select jsonb_array_elements_text(p->'levels')), '{}'), coalesce(p->>'grade',''),
          coalesce(array(select jsonb_array_elements_text(p->'aliases')), '{}'), coalesce(p->>'subtopic',''),
          coalesce(array(select jsonb_array_elements_text(p->'relatedQuestions')), '{}'),
          coalesce(array(select jsonb_array_elements_text(p->'equivalentQuestions')), '{}'),
          coalesce(p->>'summary',''), coalesce(p->>'intro',''), coalesce(p->>'objective',''),
          coalesce(array(select jsonb_array_elements_text(p->'prerequisites')), '{}'),
          coalesce(array(select jsonb_array_elements_text(p->'next')), '{}'),
          coalesce(array(select jsonb_array_elements_text(p->'review')), '{}'), coalesce(p->'skills','{}'::jsonb),
          coalesce(p->'commonDoubts','[]'::jsonb), coalesce(array(select jsonb_array_elements_text(p->'commonErrors')), '{}'),
          coalesce(p->'formulas','[]'::jsonb), p->'history', coalesce(p->>'enem',''),
          v_status, case when p->>'origin' in ('base','pesquisa','admin','ia') then p->>'origin' else 'admin' end,
          auth.uid(), auth.uid(),
          case when v_status = 'published' then now() end, case when v_status = 'published' then now() end)
  on conflict (id) do update set
    subject_id = excluded.subject_id, topic_id = excluded.topic_id, title = excluded.title, levels = excluded.levels, grade = excluded.grade, aliases = excluded.aliases,
    subtopic = excluded.subtopic, related_questions = excluded.related_questions, equivalent_questions = excluded.equivalent_questions,
    summary = excluded.summary, intro = excluded.intro, objective = excluded.objective, prerequisites = excluded.prerequisites, next_lessons = excluded.next_lessons,
    review = excluded.review, skills = excluded.skills, common_doubts = excluded.common_doubts, common_errors = excluded.common_errors,
    formulas = excluded.formulas, history = excluded.history, enem = excluded.enem, status = v_status,
    version = lessons.version + 1, updated_by = auth.uid(), updated_at = now(),
    published_at = case when v_status = 'published' and lessons.status <> 'published' then now() else lessons.published_at end,
    reviewed_at = case when v_status = 'published' then now() else lessons.reviewed_at end;

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
            case when v_q->>'type' = 'fill' then array(select jsonb_array_elements_text(v_q->'answers'))
                 when v_q->>'type' = 'order' then array(select jsonb_array_elements_text(v_q->'items')) end,
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

  delete from lesson_sources where lesson_id = v_id;
  for v_src in select * from jsonb_array_elements(coalesce(p->'sources','[]'::jsonb)) loop
    continue when coalesce(v_src->>'title','') = '';
    select id into v_sid from sources where title = v_src->>'title' and coalesce(url,'') = coalesce(v_src->>'url','') limit 1;
    if v_sid is null then
      insert into sources (kind, title, url, author, trust, accessed_at)
      values (case when v_src->>'kind' in ('curriculo','livro','material','site','instituicao','video','canal','autoral','ia') then v_src->>'kind' else 'site' end,
              v_src->>'title', nullif(v_src->>'url',''), nullif(v_src->>'author',''), 'ok', nullif(v_src->>'accessedAt','')::date)
      returning id into v_sid;
    else
      update sources set accessed_at = coalesce(nullif(v_src->>'accessedAt','')::date, accessed_at), author = coalesce(nullif(v_src->>'author',''), author) where id = v_sid;
    end if;
    insert into lesson_sources (lesson_id, source_id) values (v_id, v_sid) on conflict do nothing;
  end loop;

  return v_id;
end $$;

-- ─────────────────────────── busca semântica (reforço) ───────────────────────────
-- Cada pergunta cadastrada (título, relacionadas e equivalentes) vira um vetor de significado.
-- Usado só quando a busca textual não encontra — e NÃO é IA generativa: nada é escrito, só comparado.
create table public.kb_embeddings (
  id bigint generated always as identity primary key,
  lesson_id text not null references public.lessons on delete cascade,
  text text not null,
  embedding vector(768) not null,
  model text not null,
  created_at timestamptz not null default now()
);
create index kb_embeddings_lesson_idx on public.kb_embeddings (lesson_id);
create index kb_embeddings_hnsw on public.kb_embeddings using hnsw (embedding vector_cosine_ops);
alter table public.kb_embeddings enable row level security;
create policy "embeddings admin" on public.kb_embeddings for select using (public.is_admin());

create or replace function public.kb_semantic_match(p_embedding vector(768), p_count int default 5)
returns table (lesson_id text, title text, text text, similarity float)
language sql stable security definer set search_path = public, extensions as $$
  select e.lesson_id, l.title, e.text, 1 - (e.embedding <=> p_embedding) as similarity
  from kb_embeddings e join lessons l on l.id = e.lesson_id
  where l.status = 'published'
  order by e.embedding <=> p_embedding
  limit least(greatest(p_count, 1), 20)
$$;
revoke execute on function public.kb_semantic_match(vector, int) from public, anon, authenticated;
