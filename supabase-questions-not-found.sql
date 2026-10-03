-- LUMI — Tabela de Perguntas Não Encontradas
-- Rastreia conteúdos que não têm cobertura na Base Oficial
-- Execute em Supabase > SQL Editor

CREATE TABLE IF NOT EXISTS questions_not_found (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  probable_topic TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  ai_response TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'approved')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_questions_not_found_status ON questions_not_found(status);
CREATE INDEX idx_questions_not_found_subject ON questions_not_found(subject);
CREATE INDEX idx_questions_not_found_grade ON questions_not_found(grade_level);
CREATE INDEX idx_questions_not_found_timestamp ON questions_not_found(timestamp DESC);

-- RLS: Apenas admin pode ver/editar
ALTER TABLE questions_not_found ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin only - select" ON questions_not_found
  FOR SELECT USING (auth.jwt() ->> 'email' = 'admin@lumiensina.app.br');

CREATE POLICY "Admin only - insert" ON questions_not_found
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin only - update" ON questions_not_found
  FOR UPDATE USING (auth.jwt() ->> 'email' = 'admin@lumiensina.app.br');

CREATE POLICY "Admin only - delete" ON questions_not_found
  FOR DELETE USING (auth.jwt() ->> 'email' = 'admin@lumiensina.app.br');
