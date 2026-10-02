-- Tabela de Resultados de Preparação para Prova
CREATE TABLE IF NOT EXISTS exam_prep_results (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  contents JSONB NOT NULL DEFAULT '[]',
  total_questions INT NOT NULL,
  correct_answers INT NOT NULL,
  percentage FLOAT NOT NULL,
  equivalent_score FLOAT NOT NULL,
  content_analysis JSONB NOT NULL DEFAULT '{}',
  exam_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Respostas em Preparação para Prova
CREATE TABLE IF NOT EXISTS exam_prep_answers (
  id BIGSERIAL PRIMARY KEY,
  exam_result_id BIGSERIAL REFERENCES exam_prep_results(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_exam_prep_results_user_id ON exam_prep_results(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_prep_results_created_at ON exam_prep_results(created_at);
CREATE INDEX IF NOT EXISTS idx_exam_prep_results_subject ON exam_prep_results(subject);
CREATE INDEX IF NOT EXISTS idx_exam_prep_answers_exam_result_id ON exam_prep_answers(exam_result_id);

-- Row Level Security (RLS)
ALTER TABLE exam_prep_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_prep_answers ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para exam_prep_results
CREATE POLICY "Usuários podem ver seus próprios resultados"
  ON exam_prep_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seus próprios resultados"
  ON exam_prep_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios resultados"
  ON exam_prep_results FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Políticas RLS para exam_prep_answers (através do resultado)
CREATE POLICY "Usuários podem ver respostas de seus próprios resultados"
  ON exam_prep_answers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM exam_prep_results
      WHERE exam_prep_results.id = exam_prep_answers.exam_result_id
      AND exam_prep_results.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem inserir respostas em seus resultados"
  ON exam_prep_answers FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM exam_prep_results
      WHERE exam_prep_results.id = exam_prep_answers.exam_result_id
      AND exam_prep_results.user_id = auth.uid()
    )
  );

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_exam_prep_results_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
DROP TRIGGER IF EXISTS trigger_exam_prep_results_updated_at ON exam_prep_results;
CREATE TRIGGER trigger_exam_prep_results_updated_at
BEFORE UPDATE ON exam_prep_results
FOR EACH ROW
EXECUTE FUNCTION update_exam_prep_results_updated_at();
