-- LUMI LEARNING SYSTEM — Ultra-simples (sem UUID, sem constraints complexas)

CREATE TABLE IF NOT EXISTS learning_paths (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  grade_id TEXT,
  progress_percent FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content_mastery (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  mastery_percent FLOAT DEFAULT 0,
  state TEXT DEFAULT 'not_started',
  attempts INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skill_mastery (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  skill_id TEXT NOT NULL,
  skill_name TEXT,
  mastery_percent FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS review_queue (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  urgency INT DEFAULT 0,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_diagnostics (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  skill_id TEXT NOT NULL,
  error_type TEXT,
  error_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recommendations (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  skill_id TEXT NOT NULL,
  reason TEXT,
  priority TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS question_attempts (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  is_correct BOOLEAN,
  error_type TEXT,
  time_seconds INT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  achievement_type TEXT NOT NULL,
  points INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
