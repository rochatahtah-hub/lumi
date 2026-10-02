-- ============================================================
-- LUMI LEARNING PATH SYSTEM — Schema for Adaptive Learning
-- Phase 1: Core Mastery, Review Queue, Diagnostics
-- ============================================================

-- 1. LEARNING PATHS — Trilha de aprendizado por usuário
-- Uma trilha por usuário
CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_lessons_started INTEGER DEFAULT 0,
  total_lessons_completed INTEGER DEFAULT 0,
  overall_mastery_percent INTEGER DEFAULT 0, -- média ponderada de todos os conteúdos
  current_streak_days INTEGER DEFAULT 0, -- dias consecutivos estudando
  last_activity_at TIMESTAMP WITH TIME ZONE
);

-- 2. CONTENT MASTERY — Domínio por conteúdo (aula)
-- Uma linha por (usuário, conteúdo)
CREATE TABLE IF NOT EXISTS content_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id VARCHAR NOT NULL, -- id da aula (ex: 'fis-1med-cinemática')
  subject VARCHAR NOT NULL, -- subject da aula (ex: 'fisica')
  grade VARCHAR, -- série (ex: '1º Ensino Médio')

  -- Estado de aprendizado
  state VARCHAR DEFAULT 'not_started', -- not_started | learning | practicing | review | mastered
  mastery_percent INTEGER DEFAULT 0, -- 0-100

  -- Histórico de tentativas
  attempts_total INTEGER DEFAULT 0,
  attempts_correct INTEGER DEFAULT 0,
  attempts_incorrect INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMP WITH TIME ZONE,
  first_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Pontuação e confiança
  confidence_score DECIMAL(3, 2) DEFAULT 0.0, -- 0.0 a 1.0 (calibração de domínio)
  average_time_seconds INTEGER, -- tempo médio para completar

  -- Rastreamento de revisão
  needs_review BOOLEAN DEFAULT FALSE,
  review_urgency INTEGER DEFAULT 0, -- 1-10 (calculado pelo algoritmo)
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  reviews_done INTEGER DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, lesson_id)
);

-- 3. SKILL MASTERY — Domínio por habilidade (conceito)
-- Uma linha por (usuário, habilidade)
CREATE TABLE IF NOT EXISTS skill_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id VARCHAR NOT NULL, -- ex: 'g_vel' (Velocidade média)
  skill_name VARCHAR NOT NULL, -- ex: 'Velocidade média'
  subject VARCHAR, -- ex: 'fisica'

  -- Domínio
  mastery_percent INTEGER DEFAULT 0,
  confidence_score DECIMAL(3, 2) DEFAULT 0.0,

  -- Histórico
  attempts_total INTEGER DEFAULT 0,
  attempts_correct INTEGER DEFAULT 0,
  related_lessons INTEGER DEFAULT 0, -- quantas aulas tocam essa habilidade

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, skill_id)
);

-- 4. REVIEW QUEUE — Fila de revisão inteligente
-- Conteúdos agendados para revisar, com urgência calculada
CREATE TABLE IF NOT EXISTS review_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id VARCHAR NOT NULL,
  subject VARCHAR NOT NULL,
  title VARCHAR NOT NULL,

  -- Razão da revisão
  reason VARCHAR, -- 'low_mastery' | 'time_since_review' | 'high_error_rate' | 'skill_weak' | 'recent_failure'

  -- Urgência (0-100)
  urgency_score INTEGER DEFAULT 50,

  -- Agendamento
  scheduled_for TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Dados de contexto
  current_mastery_percent INTEGER,
  days_since_last_review INTEGER,
  error_rate_percent INTEGER, -- % de respostas erradas nas últimas tentativas

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. LEARNING DIAGNOSTICS — Análise de erros e dificuldades
-- Padrões de erro por usuário
CREATE TABLE IF NOT EXISTS learning_diagnostics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id VARCHAR NOT NULL,
  skill_id VARCHAR, -- habilidade em que o usuário errou
  question_id VARCHAR, -- qual pergunta errou

  -- Erro
  error_type VARCHAR, -- 'conceptual' | 'calculation' | 'reading' | 'careless' | 'unknown'
  error_description TEXT,
  attempts_on_this_question INTEGER DEFAULT 1,

  -- Contexto
  difficulty INTEGER, -- 1 | 2 | 3
  user_answer VARCHAR,
  correct_answer VARCHAR,

  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. RECOMMENDATIONS — Recomendações geradas automaticamente
-- O que o aluno deve fazer a seguir
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Recomendação
  type VARCHAR, -- 'next_lesson' | 'review' | 'retry' | 'advance' | 'challenge'
  lesson_id VARCHAR, -- conteúdo recomendado
  reason VARCHAR, -- por que foi recomendado
  priority INTEGER, -- 1-10

  -- Relevância
  relevance_score DECIMAL(3, 2), -- 0.0-1.0
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  viewed_at TIMESTAMP WITH TIME ZONE,
  acted_upon_at TIMESTAMP WITH TIME ZONE
);

-- 7. QUESTION ATTEMPTS — Registro detalha de cada tentativa de resposta
-- Necessário para diagnóstico fino
CREATE TABLE IF NOT EXISTS question_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id VARCHAR NOT NULL,
  question_id VARCHAR NOT NULL,

  -- Resposta
  user_answer VARCHAR,
  correct_answer VARCHAR,
  is_correct BOOLEAN,
  time_seconds INTEGER, -- tempo em segundos para responder

  -- Contexto
  attempt_number INTEGER, -- 1ª, 2ª tentativa, etc.
  difficulty_rating INTEGER, -- quanto o usuário achou difícil (1-5)

  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. ACHIEVEMENTS — Conquistas do aluno
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Conquista
  achievement_type VARCHAR, -- 'first_lesson' | 'content_mastered' | 'streak_3' | 'streak_7' | 'all_reviewed' | etc
  title VARCHAR,
  description TEXT,
  icon VARCHAR, -- emoji ou ícone

  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_diagnostics ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- RLS: Usuários só veem seus próprios dados
CREATE POLICY "learning_paths_user_access" ON learning_paths
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "content_mastery_user_access" ON content_mastery
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "skill_mastery_user_access" ON skill_mastery
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "review_queue_user_access" ON review_queue
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "learning_diagnostics_user_access" ON learning_diagnostics
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "recommendations_user_access" ON recommendations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "question_attempts_user_access" ON question_attempts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "achievements_user_access" ON achievements
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- ÍNDICES para Performance
-- ============================================================

CREATE INDEX idx_learning_paths_user ON learning_paths(user_id);
CREATE INDEX idx_content_mastery_user_lesson ON content_mastery(user_id, lesson_id);
CREATE INDEX idx_content_mastery_needs_review ON content_mastery(user_id, needs_review) WHERE needs_review = TRUE;
CREATE INDEX idx_skill_mastery_user ON skill_mastery(user_id);
CREATE INDEX idx_review_queue_user ON review_queue(user_id, completed_at);
CREATE INDEX idx_review_queue_urgency ON review_queue(user_id, urgency_score DESC);
CREATE INDEX idx_question_attempts_user_lesson ON question_attempts(user_id, lesson_id);
CREATE INDEX idx_achievements_user ON achievements(user_id);
