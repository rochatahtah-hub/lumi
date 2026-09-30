-- LUMI — Curso de Inglês (A1→C1) e Jogos Educativos
-- A aula continua sendo a unidade da Base Oficial: os dados de Inglês e de jogos ficam na própria aula
-- (lessons.english / lessons.games) e são espelhados em tabelas próprias para consulta, painel e relatórios.
-- Progresso do aluno (domínio, tentativas, jogos) fica em tabelas com RLS: cada um só vê o que é seu.

-- ─────────────────────────── aula: campos novos ───────────────────────────
alter table public.lessons add column english jsonb, add column games jsonb;

-- versões atuais viram "core"; as novas incluem Inglês e jogos (o histórico de versões continua igual)
alter function public.lesson_json(text) rename to lesson_json_core;
alter function public.admin_save_lesson(jsonb, text) rename to admin_save_lesson_core;
revoke execute on function public.admin_save_lesson_core(jsonb, text) from public, anon, authenticated;

create or replace function public.lesson_json(p_id text) returns jsonb
language sql stable security definer set search_path = public as $$
  select public.lesson_json_core(p_id) || jsonb_strip_nulls(jsonb_build_object('english', l.english, 'games', l.games))
  from lessons l where l.id = p_id and (l.status = 'published' or public.can_admin())
$$;
grant execute on function public.lesson_json(text) to anon, authenticated;

-- ─────────────────────────── curso de Inglês: estrutura ───────────────────────────
create table public.english_levels (id text primary key check (id in ('A1','A2','B1','B2','C1')), title text not null, description text not null default '', can_do text not null default '', sort int not null);
create table public.english_sections (id text primary key, level_id text not null references public.english_levels, title text not null, sort int not null);
create table public.english_units (
  id text primary key, section_id text not null references public.english_sections on delete cascade, level_id text not null references public.english_levels,
  title text not null, subtitle text not null default '', objective text not null, sort int not null
);
-- aulas previstas na unidade (podem ainda não existir na base: aparecem como "em produção")
create table public.english_unit_lessons (unit_id text not null references public.english_units on delete cascade, position int not null, lesson_id text not null, title text not null, primary key (unit_id, position));

-- espelho dos dados de Inglês de cada aula (preenchido por admin_save_lesson)
create table public.english_lessons (
  lesson_id text primary key references public.lessons on delete cascade, cefr text not null references public.english_levels,
  unit_id text references public.english_units on delete set null, sort int not null default 0, area text not null, focus text[] not null default '{}',
  challenge text, tips text[] not null default '{}'
);
create table public.english_topics (id bigint generated always as identity primary key, lesson_id text not null references public.lessons on delete cascade, kind text not null check (kind in ('grammar','vocabulary')), name text not null, level text not null, unique (lesson_id, kind, name));
create table public.english_grammar (
  lesson_id text primary key references public.lessons on delete cascade, name text not null, when_to_use text not null, structure text not null,
  affirmative text[] not null default '{}', negative text[] not null default '{}', interrogative text[] not null default '{}', compare text, context text
);
create table public.english_vocabulary (
  id bigint generated always as identity primary key, lesson_id text not null references public.lessons on delete cascade,
  word text not null, translation text not null, definition text not null, example text not null, pronunciation text, part_of_speech text not null,
  level text not null, topic text, synonyms text[] not null default '{}', antonyms text[] not null default '{}', collocations text[] not null default '{}',
  related_words text[] not null default '{}', difficulty int not null check (difficulty between 1 and 3), unique (lesson_id, word)
);
create index english_vocabulary_word_idx on public.english_vocabulary (lower(word));
create table public.english_phrases (id bigint generated always as identity primary key, lesson_id text not null references public.lessons on delete cascade, phrase text not null, context text not null);
create table public.english_audio (
  id uuid primary key default gen_random_uuid(), lesson_id text references public.lessons on delete cascade, text text not null,
  -- 'tts' = voz do aparelho lendo o roteiro original; arquivo só com licença registrada
  source text not null default 'tts' check (source in ('tts','original','licenciado')), url text, license text, created_at timestamptz not null default now()
);
create table public.english_reading (lesson_id text primary key references public.lessons on delete cascade, title text not null, genre text not null, text text not null, questions jsonb not null default '[]');
create table public.english_listening (lesson_id text primary key references public.lessons on delete cascade, title text not null, kind text not null, script text[] not null, rate numeric, audio_id uuid references public.english_audio on delete set null, questions jsonb not null default '[]');
create table public.english_speaking (lesson_id text primary key references public.lessons on delete cascade, situation text not null, vocabulary text[] not null default '{}', phrases text[] not null default '{}', example text not null, challenge text not null, expected text[] not null default '{}');
create table public.english_writing (lesson_id text primary key references public.lessons on delete cascade, prompt text not null, criteria text[] not null default '{}', model text not null, keywords text[] not null default '{}', min_words int not null default 0);

-- ─────────────────────────── jogos: estrutura ───────────────────────────
create table public.game_types (id text primary key, name text not null, emoji text not null, description text not null, english_only boolean not null default false);
insert into public.game_types (id, name, emoji, description, english_only) values
  ('quebra','Quebra-cabeça','🧩','Monte a imagem e aprenda com os detalhes.',false),
  ('caca','Caça-palavras','🔎','Encontre as palavras relacionadas ao conteúdo.',false),
  ('memoria','Jogo da Memória','🧠','Encontre os pares de palavras e significados.',false),
  ('ligue','Ligue os Pares','🔗','Relacione cada item ao seu significado.',false),
  ('ordem','Ordene a Sequência','🔢','Coloque frases ou acontecimentos na ordem correta.',false),
  ('complete','Complete a Frase','✏️','Preencha o espaço com a palavra correta.',false),
  ('quiz','Quiz Relâmpago','🎯','Responda perguntas rápidas.',false),
  ('mapa','Mapa Interativo','🗺️','Identifique países, estados e regiões.',false),
  ('dialogo','Complete o Diálogo','💬','Escolha a fala que completa a conversa.',true),
  ('listening','Listening Challenge','🎧','Ouça e responda.',true),
  ('reading','Reading Challenge','📖','Leia um texto e responda.',true);

-- um jogo por (aula, tipo) quando a aula tem material suficiente
create table public.games (
  id uuid primary key default gen_random_uuid(), lesson_id text not null references public.lessons on delete cascade,
  game_type text not null references public.game_types, subject_id text not null references public.subjects, grade text not null default '',
  english_level text references public.english_levels, grammar_topic text, vocabulary_topic text, items int not null default 0,
  config jsonb, unique (lesson_id, game_type)
);
create table public.game_words (id bigint generated always as identity primary key, lesson_id text not null references public.lessons on delete cascade, word text not null, clue text not null, difficulty int not null check (difficulty between 1 and 3));
create table public.game_pairs (id bigint generated always as identity primary key, lesson_id text not null references public.lessons on delete cascade, a text not null, b text not null, difficulty int not null check (difficulty between 1 and 3), speak boolean not null default false, source text not null default 'jogo');
create table public.game_sequences (id bigint generated always as identity primary key, lesson_id text not null references public.lessons on delete cascade, prompt text not null, items text[] not null, words boolean not null default false, explanation text not null default '', difficulty int not null check (difficulty between 1 and 3));
-- frases com lacuna e diálogos; as alternativas ficam em game_answers
create table public.game_questions (id bigint generated always as identity primary key, lesson_id text not null references public.lessons on delete cascade, kind text not null check (kind in ('blank','dialogue')), prompt text not null, lines jsonb, explanation text not null default '', difficulty int not null check (difficulty between 1 and 3));
create table public.game_answers (question_id bigint not null references public.game_questions on delete cascade, position int not null, label text not null, is_correct boolean not null default false, primary key (question_id, position));
create index game_words_lesson_idx on public.game_words (lesson_id);
create index game_pairs_lesson_idx on public.game_pairs (lesson_id);
create index game_sequences_lesson_idx on public.game_sequences (lesson_id);
create index game_questions_lesson_idx on public.game_questions (lesson_id);

-- ─────────────────────────── progresso do aluno ───────────────────────────
create table public.game_attempts (
  id uuid primary key, user_id uuid not null references auth.users on delete cascade, lesson_id text not null, game_type text not null references public.game_types,
  subject_id text not null, difficulty int not null check (difficulty between 1 and 3), correct int not null default 0, wrong int not null default 0,
  hints int not null default 0, moves int not null default 0, total int not null default 0, ms int not null default 0, completed boolean not null default false,
  created_at timestamptz not null default now()
);
create index game_attempts_user_idx on public.game_attempts (user_id, created_at desc);
create table public.game_progress (
  user_id uuid not null references auth.users on delete cascade, lesson_id text not null, game_type text not null references public.game_types,
  plays int not null default 0, completed int not null default 0, best_accuracy int not null default 0, last_played_at timestamptz not null default now(),
  primary key (user_id, lesson_id, game_type)
);
create table public.english_attempts (
  id uuid primary key, user_id uuid not null references auth.users on delete cascade, lesson_id text,
  kind text not null check (kind in ('reading','listening','speaking','writing','desafio','unit_test','placement')),
  unit_id text, correct int not null default 0, total int not null default 0, created_at timestamptz not null default now()
);
create index english_attempts_user_idx on public.english_attempts (user_id, created_at desc);
create table public.english_mastery (
  user_id uuid not null references auth.users on delete cascade, lesson_id text not null,
  mastery int not null check (mastery between 0 and 100), state text not null check (state in ('NOT_STARTED','LEARNING','PRACTICING','REVIEW','MASTERED')),
  attempts int not null default 0, right_answers int not null default 0, wrong_answers int not null default 0, reviews int not null default 0,
  error_skills text[] not null default '{}', time_ms bigint not null default 0, last_at timestamptz, updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);
create table public.english_reviews (id bigint generated always as identity primary key, user_id uuid not null references auth.users on delete cascade, lesson_id text not null, reviewed_at timestamptz not null default now(), correct int not null default 0, total int not null default 0);
create table public.english_progress (
  user_id uuid primary key references auth.users on delete cascade, level text references public.english_levels, placement jsonb,
  units_passed text[] not null default '{}', words_learned int not null default 0, updated_at timestamptz not null default now()
);

-- partida registrada → atualiza o resumo por jogo/aula
create or replace function public.game_progress_refresh() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into game_progress (user_id, lesson_id, game_type, plays, completed, best_accuracy, last_played_at)
  values (new.user_id, new.lesson_id, new.game_type, 1, case when new.completed then 1 else 0 end,
          case when new.correct + new.wrong > 0 then (100 * new.correct / (new.correct + new.wrong)) else 0 end, new.created_at)
  on conflict (user_id, lesson_id, game_type) do update set
    plays = game_progress.plays + 1, completed = game_progress.completed + excluded.completed,
    best_accuracy = greatest(game_progress.best_accuracy, excluded.best_accuracy), last_played_at = excluded.last_played_at;
  return new;
end $$;
create trigger game_attempts_progress after insert on public.game_attempts for each row execute function public.game_progress_refresh();

-- ─────────────────────────── espelhar Inglês e jogos de uma aula ───────────────────────────
create or replace function public.sync_lesson_extras(p_id text) returns void
language plpgsql security definer set search_path = public as $$
declare
  l lessons%rowtype;
  e jsonb; g jsonb; x jsonb; v_q bigint; v_i int; v_level text; v_n int;
  v_pairs int; v_words int; v_seq int; v_blanks int; v_quiz int; v_dial int;
begin
  select * into l from lessons where id = p_id;
  if not found then return; end if;
  e := l.english; g := l.games;

  delete from english_lessons where lesson_id = p_id;
  delete from english_topics where lesson_id = p_id;
  delete from english_grammar where lesson_id = p_id;
  delete from english_vocabulary where lesson_id = p_id;
  delete from english_phrases where lesson_id = p_id;
  delete from english_reading where lesson_id = p_id;
  delete from english_listening where lesson_id = p_id;
  delete from english_speaking where lesson_id = p_id;
  delete from english_writing where lesson_id = p_id;
  delete from games where lesson_id = p_id;
  delete from game_words where lesson_id = p_id;
  delete from game_pairs where lesson_id = p_id;
  delete from game_sequences where lesson_id = p_id;
  delete from game_questions where lesson_id = p_id;

  v_level := case when e ? 'cefr' and e->>'cefr' in ('A1','A2','B1','B2','C1') then e->>'cefr' end;
  if v_level is not null then
    insert into english_lessons (lesson_id, cefr, unit_id, sort, area, focus, challenge, tips)
    values (p_id, v_level, (select id from english_units where id = e->>'unit'), coalesce((e->>'order')::int, 0), coalesce(e->>'area', 'grammar'),
            coalesce(array(select jsonb_array_elements_text(e->'focus')), '{}'), e->>'challenge', coalesce(array(select jsonb_array_elements_text(e->'tips')), '{}'));
    if e ? 'grammar' then
      x := e->'grammar';
      insert into english_grammar values (p_id, x->>'name', x->>'when', x->>'structure',
        coalesce(array(select jsonb_array_elements_text(x->'affirmative')), '{}'), coalesce(array(select jsonb_array_elements_text(x->'negative')), '{}'),
        coalesce(array(select jsonb_array_elements_text(x->'interrogative')), '{}'), x->>'compare', x->>'context');
      insert into english_topics (lesson_id, kind, name, level) values (p_id, 'grammar', x->>'name', v_level) on conflict do nothing;
    end if;
    for x in select * from jsonb_array_elements(coalesce(e->'vocabulary', '[]')) loop
      insert into english_vocabulary (lesson_id, word, translation, definition, example, pronunciation, part_of_speech, level, topic, synonyms, antonyms, collocations, related_words, difficulty)
      values (p_id, x->>'word', x->>'translation', x->>'definition', x->>'example', x->>'pronunciation', x->>'pos', v_level, coalesce(x->>'topic', l.subtopic),
              coalesce(array(select jsonb_array_elements_text(x->'synonyms')), '{}'), coalesce(array(select jsonb_array_elements_text(x->'antonyms')), '{}'),
              coalesce(array(select jsonb_array_elements_text(x->'collocations')), '{}'), coalesce(array(select jsonb_array_elements_text(x->'related')), '{}'),
              coalesce((x->>'difficulty')::int, 2))
      on conflict (lesson_id, word) do nothing;
    end loop;
    if jsonb_array_length(coalesce(e->'vocabulary', '[]')) > 0 then insert into english_topics (lesson_id, kind, name, level) values (p_id, 'vocabulary', l.subtopic, v_level) on conflict do nothing; end if;
    if e ? 'reading' then x := e->'reading'; insert into english_reading values (p_id, x->>'title', x->>'genre', x->>'text', coalesce(x->'questions', '[]')); end if;
    if e ? 'listening' then x := e->'listening'; insert into english_listening (lesson_id, title, kind, script, rate, questions) values (p_id, x->>'title', x->>'kind', array(select jsonb_array_elements_text(x->'script')), (x->>'rate')::numeric, coalesce(x->'questions', '[]')); end if;
    if e ? 'speaking' then
      x := e->'speaking';
      insert into english_speaking values (p_id, x->>'situation', coalesce(array(select jsonb_array_elements_text(x->'vocabulary')), '{}'), coalesce(array(select jsonb_array_elements_text(x->'phrases')), '{}'), x->>'example', x->>'challenge', coalesce(array(select jsonb_array_elements_text(x->'expected')), '{}'));
      insert into english_phrases (lesson_id, phrase, context) select p_id, t, 'speaking' from jsonb_array_elements_text(coalesce(x->'phrases', '[]')) t;
    end if;
    if e ? 'writing' then x := e->'writing'; insert into english_writing values (p_id, x->>'prompt', coalesce(array(select jsonb_array_elements_text(x->'criteria')), '{}'), x->>'model', coalesce(array(select jsonb_array_elements_text(x->'keywords')), '{}'), coalesce((x->>'minWords')::int, 0)); end if;
  end if;

  -- material de jogo cadastrado + vocabulário (vira pares e palavras) + exercícios da aula
  for x in select * from jsonb_array_elements(coalesce(g->'words', '[]')) loop insert into game_words (lesson_id, word, clue, difficulty) values (p_id, x->>'word', x->>'clue', coalesce((x->>'difficulty')::int, 2)); end loop;
  for x in select * from jsonb_array_elements(coalesce(e->'vocabulary', '[]')) loop
    insert into game_words (lesson_id, word, clue, difficulty) values (p_id, x->>'word', x->>'translation', coalesce((x->>'difficulty')::int, 2));
    insert into game_pairs (lesson_id, a, b, difficulty, speak, source) values (p_id, x->>'word', x->>'translation', coalesce((x->>'difficulty')::int, 2), true, 'vocabulario');
  end loop;
  for x in select * from jsonb_array_elements(coalesce(g->'pairs', '[]')) loop insert into game_pairs (lesson_id, a, b, difficulty, speak) values (p_id, x->>'a', x->>'b', coalesce((x->>'difficulty')::int, 2), coalesce((x->>'speak')::boolean, false)); end loop;
  insert into game_pairs (lesson_id, a, b, difficulty, source)
  select p_id, o.label, o.match_label, q.difficulty, 'exercicio' from questions q join question_options o on o.question_id = q.id where q.lesson_id = p_id and q.type = 'match';
  for x in select * from jsonb_array_elements(coalesce(g->'sequences', '[]')) loop insert into game_sequences (lesson_id, prompt, items, words, explanation, difficulty) values (p_id, x->>'prompt', array(select jsonb_array_elements_text(x->'items')), coalesce((x->>'words')::boolean, false), coalesce(x->>'explanation', ''), coalesce((x->>'difficulty')::int, 2)); end loop;
  insert into game_sequences (lesson_id, prompt, items, explanation, difficulty) select p_id, q.prompt, q.answers, q.explanation, q.difficulty from questions q where q.lesson_id = p_id and q.type = 'order';
  for x in select * from jsonb_array_elements(coalesce(g->'blanks', '[]')) loop
    insert into game_questions (lesson_id, kind, prompt, explanation, difficulty) values (p_id, 'blank', x->>'sentence', coalesce(x->>'explanation', ''), coalesce((x->>'difficulty')::int, 2)) returning id into v_q;
    for v_i in 0 .. jsonb_array_length(x->'options') - 1 loop insert into game_answers values (v_q, v_i, x->'options'->>v_i, v_i = (x->>'answer')::int); end loop;
  end loop;
  for x in select * from jsonb_array_elements(coalesce(g->'dialogues', '[]')) loop
    insert into game_questions (lesson_id, kind, prompt, lines, explanation, difficulty) values (p_id, 'dialogue', x->>'title', x->'lines', coalesce(x->>'explanation', ''), coalesce((x->>'difficulty')::int, 2)) returning id into v_q;
    for v_i in 0 .. jsonb_array_length(x->'options') - 1 loop insert into game_answers values (v_q, v_i, x->'options'->>v_i, v_i = (x->>'answer')::int); end loop;
  end loop;

  -- quais jogos a aula oferece (mesmos mínimos do app: src/games/content.ts)
  -- como no app: pares com termo ou significado repetido não contam (deixariam o jogo ambíguo)
  select least(count(distinct lower(a)), count(distinct lower(b))) into v_pairs from game_pairs where lesson_id = p_id and lower(a) <> lower(b);
  select count(distinct lower(word)) into v_words from game_words where lesson_id = p_id and length(regexp_replace(public.f_unaccent(word), '[^A-Za-z]', '', 'g')) between 3 and 12;
  select count(*) into v_seq from game_sequences where lesson_id = p_id and cardinality(items) >= 3;
  select count(*) into v_blanks from game_questions where lesson_id = p_id and kind = 'blank';
  select v_blanks + count(*) into v_blanks from questions where lesson_id = p_id and type = 'mc' and prompt ~ '_{2,}';
  select count(*) into v_quiz from questions where lesson_id = p_id and (type = 'tf' or (type = 'mc' and prompt !~ '_{2,}'));
  select count(*) into v_dial from game_questions where lesson_id = p_id and kind = 'dialogue';
  select count(*) into v_n from lesson_blocks where lesson_id = p_id;
  insert into games (lesson_id, game_type, subject_id, grade, english_level, grammar_topic, vocabulary_topic, items, config)
  select p_id, t.id, l.subject_id, l.grade, v_level, e->'grammar'->>'name', case when v_level is not null then l.subtopic end, t.n, t.cfg
  from (values
    ('quebra', v_n, v_n >= 2, null::jsonb), ('caca', v_words, v_words >= 4, null), ('memoria', v_pairs, v_pairs >= 4, null), ('ligue', v_pairs, v_pairs >= 4, null),
    ('ordem', v_seq, v_seq >= 1, null), ('complete', v_blanks, v_blanks >= 3, null), ('quiz', v_quiz, v_quiz >= 5, null),
    ('mapa', coalesce(jsonb_array_length(g->'map'->'targets'), 0), coalesce(jsonb_array_length(g->'map'->'targets'), 0) >= 3, g->'map'),
    ('dialogo', v_dial, v_dial >= 2, null),
    ('listening', coalesce(jsonb_array_length(e->'listening'->'questions'), 0), coalesce(jsonb_array_length(e->'listening'->'questions'), 0) > 0, null),
    ('reading', coalesce(jsonb_array_length(e->'reading'->'questions'), 0), coalesce(jsonb_array_length(e->'reading'->'questions'), 0) > 0, null)
  ) as t(id, n, ok, cfg) where t.ok;
end $$;
revoke execute on function public.sync_lesson_extras(text) from public, anon, authenticated;

create or replace function public.admin_save_lesson(p jsonb, p_status text default null) returns text
language plpgsql security definer set search_path = public as $$
declare v_id text;
begin
  v_id := public.admin_save_lesson_core(p, p_status); -- valida permissão, guarda a versão anterior e salva a aula
  update lessons set english = p->'english', games = p->'games' where id = v_id;
  perform public.sync_lesson_extras(v_id);
  return v_id;
end $$;
grant execute on function public.admin_save_lesson(jsonb, text) to authenticated;

-- ─────────────────────────── visões com o nome pedido (sem duplicar dados) ───────────────────────────
create view public.english_exercises with (security_invoker = true) as
  select q.* from questions q join lessons l on l.id = q.lesson_id where l.subject_id = 'ingles';
create view public.english_exercise_options with (security_invoker = true) as
  select o.* from question_options o join questions q on q.id = o.question_id join lessons l on l.id = q.lesson_id where l.subject_id = 'ingles';
create view public.english_hints with (security_invoker = true) as
  select h.* from question_hints h join questions q on q.id = h.question_id join lessons l on l.id = q.lesson_id where l.subject_id = 'ingles';
create view public.english_games with (security_invoker = true) as select * from games where subject_id = 'ingles';
create view public.english_game_items with (security_invoker = true) as
  select lesson_id, 'palavra' as kind, word as item, clue as meaning, difficulty from game_words where lesson_id in (select lesson_id from english_lessons)
  union all select lesson_id, 'par', a, b, difficulty from game_pairs where lesson_id in (select lesson_id from english_lessons);
create view public.english_sources with (security_invoker = true) as
  select ls.lesson_id, s.* from lesson_sources ls join sources s on s.id = ls.source_id join lessons l on l.id = ls.lesson_id where l.subject_id = 'ingles';
create view public.english_content_versions with (security_invoker = true) as
  select v.* from lesson_versions v join lessons l on l.id = v.lesson_id where l.subject_id = 'ingles';

-- ─────────────────────────── RLS ───────────────────────────
do $$
declare t text;
begin
  -- conteúdo: leitura pública do que é OFICIAL (admin vê tudo); escrita só pelas funções de admin
  foreach t in array array['english_lessons','english_topics','english_grammar','english_vocabulary','english_phrases','english_audio','english_reading','english_listening','english_speaking','english_writing','games','game_words','game_pairs','game_sequences','game_questions'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "conteudo oficial" on public.%I for select using (exists (select 1 from public.lessons l where l.id = lesson_id and (l.status = ''published'' or public.can_admin())))', t);
  end loop;
  foreach t in array array['english_levels','english_sections','english_units','english_unit_lessons','game_types'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "estrutura publica" on public.%I for select using (true)', t);
    execute format('create policy "admin edita" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
  -- progresso: cada aluno só lê e grava o que é dele; admin pode consultar
  foreach t in array array['game_attempts','game_progress','english_attempts','english_mastery','english_reviews','english_progress'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "meu progresso" on public.%I for select using (user_id = auth.uid() or public.is_admin())', t);
    execute format('create policy "gravo o meu" on public.%I for insert with check (user_id = auth.uid())', t);
  end loop;
  foreach t in array array['english_mastery','english_progress'] loop
    execute format('create policy "atualizo o meu" on public.%I for update using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
  end loop;
end $$;
alter table public.game_answers enable row level security;
create policy "conteudo oficial" on public.game_answers for select using (exists (select 1 from public.game_questions q join public.lessons l on l.id = q.lesson_id where q.id = question_id and (l.status = 'published' or public.can_admin())));

grant select on public.english_levels, public.english_sections, public.english_units, public.english_unit_lessons, public.english_lessons, public.english_topics,
  public.english_grammar, public.english_vocabulary, public.english_phrases, public.english_audio, public.english_reading, public.english_listening,
  public.english_speaking, public.english_writing, public.game_types, public.games, public.game_words, public.game_pairs, public.game_sequences,
  public.game_questions, public.game_answers, public.english_exercises, public.english_exercise_options, public.english_hints, public.english_games,
  public.english_game_items, public.english_sources, public.english_content_versions to anon, authenticated;
grant select, insert on public.game_attempts, public.english_attempts, public.english_reviews to authenticated;
grant select on public.game_progress to authenticated;
grant select, insert, update on public.english_mastery, public.english_progress to authenticated;

-- conquistas novas (a tabela de conquistas guarda o catálogo)
insert into public.achievements (id, title, description, icon) values
  ('primeiro-jogo','Aprender brincando','Concluiu seu primeiro jogo com pelo menos 60% de acerto.','🎮'),
  ('jogo-perfeito','Jogada perfeita','Concluiu um jogo difícil sem erros e sem dicas.','🎯'),
  ('jogos-variados','Jogador curioso','Concluiu 4 tipos diferentes de jogo.','🧩'),
  ('revisou-jogando','Revisão divertida','Jogou 3 conteúdos diferentes que já tinha estudado.','🔁'),
  ('ingles-nivel','Ponto de partida','Fez o teste de nivelamento de Inglês.','🧭'),
  ('ingles-unidade','Unidade dominada','Passou na avaliação de domínio de uma unidade de Inglês.','🇬🇧'),
  ('ingles-palavras','50 palavras em inglês','Praticou e acertou 50 palavras diferentes.','📚')
on conflict (id) do nothing;
