/**
 * LUMI v3.0 — Seed Data
 * Dados iniciais para testes e demonstração
 *
 * USAGE:
 * 1. Copiar este arquivo
 * 2. Colar em Supabase → SQL Editor → New Query
 * 3. Executar
 *
 * IMPORTANTE:
 * - Ele criar dados de TESTE apenas
 * - Remover antes de ir para PRODUÇÃO REAL
 * - Usar user_id = 'test-user-123' para testes locais
 */

-- ===== LIMPEZA =====
DELETE FROM achievements WHERE user_id = 'test-user-123';
DELETE FROM question_attempts WHERE user_id = 'test-user-123';
DELETE FROM recommendations WHERE user_id = 'test-user-123';
DELETE FROM learning_diagnostics WHERE user_id = 'test-user-123';
DELETE FROM review_queue WHERE user_id = 'test-user-123';
DELETE FROM skill_mastery WHERE user_id = 'test-user-123';
DELETE FROM content_mastery WHERE user_id = 'test-user-123';
DELETE FROM learning_paths WHERE user_id = 'test-user-123';

-- ===== LEARNING PATHS =====
INSERT INTO learning_paths (user_id, grade_id, progress_percent, created_at) VALUES
('test-user-123', 'grade-1-medio', 35, NOW()),
('test-user-123', 'grade-2-medio', 0, NOW()),
('test-user-123', 'grade-3-medio', 0, NOW());

-- ===== CONTENT MASTERY =====
INSERT INTO content_mastery (user_id, lesson_id, mastery_percent, state, attempts, correct_attempts, last_attempted_at, created_at) VALUES
-- Física: Cinemática (dominando)
('test-user-123', 'fis-1med-cinemática', 65, 'practicing', 8, 5, NOW() - INTERVAL '2 days', NOW() - INTERVAL '30 days'),
-- Física: Dinâmica (aprendendo)
('test-user-123', 'fis-1med-dinâmica', 45, 'learning', 6, 3, NOW() - INTERVAL '4 days', NOW() - INTERVAL '20 days'),
-- Física: Energia (não iniciado)
('test-user-123', 'fis-1med-energia', 0, 'not_started', 0, 0, NULL, NOW()),
-- Química: Átomos (revisão)
('test-user-123', 'qui-1med-átomos', 55, 'review', 12, 7, NOW() - INTERVAL '7 days', NOW() - INTERVAL '15 days'),
-- Química: Ligações (aprendendo)
('test-user-123', 'qui-1med-ligações', 35, 'learning', 4, 1, NOW() - INTERVAL '3 days', NOW() - INTERVAL '25 days'),
-- Biologia: Célula (dominado)
('test-user-123', 'bio-1med-célula', 85, 'mastered', 20, 17, NOW() - INTERVAL '1 day', NOW() - INTERVAL '45 days'),
-- Biologia: Mitose (dominado)
('test-user-123', 'bio-1med-mitose', 78, 'mastered', 18, 14, NOW() - INTERVAL '2 days', NOW() - INTERVAL '40 days');

-- ===== SKILL MASTERY =====
INSERT INTO skill_mastery (user_id, skill_id, skill_name, mastery_percent, total_attempts, created_at) VALUES
('test-user-123', 'fis-cinemática', 'Cinemática', 65, 8, NOW()),
('test-user-123', 'fis-dinâmica', 'Dinâmica', 45, 6, NOW()),
('test-user-123', 'fis-energia', 'Energia', 0, 0, NOW()),
('test-user-123', 'qui-átomos', 'Estrutura Atômica', 55, 12, NOW()),
('test-user-123', 'qui-ligações', 'Ligações Químicas', 35, 4, NOW()),
('test-user-123', 'bio-célula', 'Célula', 85, 20, NOW()),
('test-user-123', 'bio-mitose', 'Mitose', 78, 18, NOW());

-- ===== REVIEW QUEUE =====
INSERT INTO review_queue (user_id, lesson_id, urgency, reason, mastery_percent, days_since_review, error_rate, created_at) VALUES
-- Dinâmica (urgência alta: baixo domínio + erros)
('test-user-123', 'fis-1med-dinâmica', 72, 'low_mastery', 45, 4, 45, NOW()),
-- Átomos (urgência média: revisão atrasada)
('test-user-123', 'qui-1med-átomos', 58, 'time_since_review', 55, 7, 30, NOW()),
-- Ligações (urgência média-alta: muitos erros)
('test-user-123', 'qui-1med-ligações', 65, 'high_error_rate', 35, 3, 60, NOW()),
-- Cinemática (urgência baixa: vai bem)
('test-user-123', 'fis-1med-cinemática', 28, 'scheduled_review', 65, 2, 15, NOW());

-- ===== QUESTION ATTEMPTS =====
INSERT INTO question_attempts (user_id, lesson_id, question_id, is_correct, error_type, time_seconds, hints_used, created_at) VALUES
-- Cinemática (8 tentativas: 5 corretas, 3 erradas)
('test-user-123', 'fis-1med-cinemática', 'q1', true, NULL, 45, 0, NOW() - INTERVAL '30 days'),
('test-user-123', 'fis-1med-cinemática', 'q2', true, NULL, 32, 1, NOW() - INTERVAL '30 days'),
('test-user-123', 'fis-1med-cinemática', 'q3', false, 'calculation', 120, 2, NOW() - INTERVAL '28 days'),
('test-user-123', 'fis-1med-cinemática', 'q4', true, NULL, 28, 0, NOW() - INTERVAL '25 days'),
('test-user-123', 'fis-1med-cinemática', 'q5', false, 'conceptual', 180, 3, NOW() - INTERVAL '20 days'),
('test-user-123', 'fis-1med-cinemática', 'q6', true, NULL, 35, 0, NOW() - INTERVAL '15 days'),
('test-user-123', 'fis-1med-cinemática', 'q7', true, NULL, 40, 1, NOW() - INTERVAL '10 days'),
('test-user-123', 'fis-1med-cinemática', 'q8', false, 'careless', 25, 0, NOW() - INTERVAL '2 days'),

-- Dinâmica (6 tentativas: 3 corretas, 3 erradas)
('test-user-123', 'fis-1med-dinâmica', 'q1', true, NULL, 50, 1, NOW() - INTERVAL '20 days'),
('test-user-123', 'fis-1med-dinâmica', 'q2', false, 'conceptual', 200, 3, NOW() - INTERVAL '18 days'),
('test-user-123', 'fis-1med-dinâmica', 'q3', false, 'conceptual', 180, 2, NOW() - INTERVAL '15 days'),
('test-user-123', 'fis-1med-dinâmica', 'q4', true, NULL, 55, 0, NOW() - INTERVAL '10 days'),
('test-user-123', 'fis-1med-dinâmica', 'q5', false, 'calculation', 150, 2, NOW() - INTERVAL '6 days'),
('test-user-123', 'fis-1med-dinâmica', 'q6', true, NULL, 60, 1, NOW() - INTERVAL '4 days'),

-- Átomos (12 tentativas: 7 corretas, 5 erradas)
('test-user-123', 'qui-1med-átomos', 'q1', true, NULL, 40, 0, NOW() - INTERVAL '15 days'),
('test-user-123', 'qui-1med-átomos', 'q2', true, NULL, 35, 0, NOW() - INTERVAL '15 days'),
('test-user-123', 'qui-1med-átomos', 'q3', false, 'conceptual', 160, 2, NOW() - INTERVAL '14 days'),
('test-user-123', 'qui-1med-átomos', 'q4', true, NULL, 38, 0, NOW() - INTERVAL '12 days'),
('test-user-123', 'qui-1med-átomos', 'q5', true, NULL, 42, 1, NOW() - INTERVAL '10 days'),
('test-user-123', 'qui-1med-átomos', 'q6', false, 'reading', 90, 1, NOW() - INTERVAL '8 days'),
('test-user-123', 'qui-1med-átomos', 'q7', true, NULL, 39, 0, NOW() - INTERVAL '7 days'),
('test-user-123', 'qui-1med-átomos', 'q8', false, 'careless', 30, 0, NOW() - INTERVAL '7 days'),
('test-user-123', 'qui-1med-átomos', 'q9', true, NULL, 44, 0, NOW() - INTERVAL '5 days'),
('test-user-123', 'qui-1med-átomos', 'q10', false, 'conceptual', 170, 3, NOW() - INTERVAL '4 days'),
('test-user-123', 'qui-1med-átomos', 'q11', true, NULL, 36, 0, NOW() - INTERVAL '3 days'),
('test-user-123', 'qui-1med-átomos', 'q12', false, 'calculation', 110, 1, NOW() - INTERVAL '7 days'),

-- Ligações (4 tentativas: 1 correta, 3 erradas)
('test-user-123', 'qui-1med-ligações', 'q1', false, 'conceptual', 240, 3, NOW() - INTERVAL '25 days'),
('test-user-123', 'qui-1med-ligações', 'q2', false, 'conceptual', 200, 2, NOW() - INTERVAL '20 days'),
('test-user-123', 'qui-1med-ligações', 'q3', true, NULL, 85, 2, NOW() - INTERVAL '10 days'),
('test-user-123', 'qui-1med-ligações', 'q4', false, 'reading', 120, 1, NOW() - INTERVAL '3 days'),

-- Célula (20 tentativas: 17 corretas, 3 erradas)
('test-user-123', 'bio-1med-célula', 'q1', true, NULL, 30, 0, NOW() - INTERVAL '45 days'),
('test-user-123', 'bio-1med-célula', 'q2', true, NULL, 32, 0, NOW() - INTERVAL '44 days'),
('test-user-123', 'bio-1med-célula', 'q3', true, NULL, 28, 0, NOW() - INTERVAL '42 days'),
('test-user-123', 'bio-1med-célula', 'q4', false, 'reading', 100, 1, NOW() - INTERVAL '40 days'),
('test-user-123', 'bio-1med-célula', 'q5', true, NULL, 31, 0, NOW() - INTERVAL '38 days'),
('test-user-123', 'bio-1med-célula', 'q6', true, NULL, 29, 0, NOW() - INTERVAL '35 days'),
('test-user-123', 'bio-1med-célula', 'q7', true, NULL, 33, 0, NOW() - INTERVAL '32 days'),
('test-user-123', 'bio-1med-célula', 'q8', true, NULL, 27, 0, NOW() - INTERVAL '30 days'),
('test-user-123', 'bio-1med-célula', 'q9', false, 'careless', 40, 0, NOW() - INTERVAL '25 days'),
('test-user-123', 'bio-1med-célula', 'q10', true, NULL, 28, 0, NOW() - INTERVAL '20 days'),
('test-user-123', 'bio-1med-célula', 'q11', true, NULL, 31, 0, NOW() - INTERVAL '18 days'),
('test-user-123', 'bio-1med-célula', 'q12', true, NULL, 29, 0, NOW() - INTERVAL '15 days'),
('test-user-123', 'bio-1med-célula', 'q13', true, NULL, 32, 0, NOW() - INTERVAL '12 days'),
('test-user-123', 'bio-1med-célula', 'q14', false, 'conceptual', 150, 2, NOW() - INTERVAL '10 days'),
('test-user-123', 'bio-1med-célula', 'q15', true, NULL, 30, 0, NOW() - INTERVAL '8 days'),
('test-user-123', 'bio-1med-célula', 'q16', true, NULL, 28, 0, NOW() - INTERVAL '5 days'),
('test-user-123', 'bio-1med-célula', 'q17', true, NULL, 31, 0, NOW() - INTERVAL '3 days'),
('test-user-123', 'bio-1med-célula', 'q18', true, NULL, 29, 0, NOW() - INTERVAL '1 day'),
('test-user-123', 'bio-1med-célula', 'q19', false, 'careless', 35, 0, NOW() - INTERVAL '1 day'),
('test-user-123', 'bio-1med-célula', 'q20', true, NULL, 30, 0, NOW());

-- ===== LEARNING DIAGNOSTICS =====
INSERT INTO learning_diagnostics (user_id, skill_id, error_type, error_count, last_error_date, created_at) VALUES
('test-user-123', 'fis-dinâmica', 'conceptual', 3, NOW() - INTERVAL '4 days', NOW()),
('test-user-123', 'fis-dinâmica', 'calculation', 1, NOW() - INTERVAL '6 days', NOW()),
('test-user-123', 'qui-ligações', 'conceptual', 3, NOW() - INTERVAL '3 days', NOW()),
('test-user-123', 'qui-átomos', 'conceptual', 2, NOW() - INTERVAL '4 days', NOW()),
('test-user-123', 'qui-átomos', 'calculation', 1, NOW() - INTERVAL '7 days', NOW()),
('test-user-123', 'qui-átomos', 'reading', 1, NOW() - INTERVAL '7 days', NOW()),
('test-user-123', 'bio-célula', 'reading', 1, NOW() - INTERVAL '25 days', NOW()),
('test-user-123', 'bio-célula', 'careless', 2, NOW() - INTERVAL '1 day', NOW());

-- ===== RECOMMENDATIONS =====
INSERT INTO recommendations (user_id, skill_id, reason, content_id, priority, created_at) VALUES
('test-user-123', 'fis-dinâmica', 'low_mastery', 'fis-1med-dinâmica', 'high', NOW()),
('test-user-123', 'qui-ligações', 'high_error_rate', 'qui-1med-ligações', 'high', NOW()),
('test-user-123', 'qui-átomos', 'time_since_review', 'qui-1med-átomos', 'medium', NOW()),
('test-user-123', 'fis-cinemática', 'consolidate_knowledge', 'fis-1med-cinemática', 'low', NOW()),
('test-user-123', 'fis-energia', 'next_content', 'fis-1med-energia', 'medium', NOW());

-- ===== ACHIEVEMENTS =====
INSERT INTO achievements (user_id, achievement_type, points, unlocked_at, created_at) VALUES
('test-user-123', 'first_lesson', 10, NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
('test-user-123', 'streak_7', 50, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('test-user-123', 'content_mastered', 50, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
('test-user-123', 'high_accuracy', 80, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days');

-- ===== SUMMARY =====
-- Total Stats:
-- - Conteúdos iniciados: 7
-- - Conteúdos dominados: 2
-- - Domínio geral: ~57% (1+2 mastery % / 7 conteúdos)
-- - Total de tentativas: 68
-- - Acurácia geral: ~62%
-- - Dias ativos: 45
-- - Streak atual: 5 dias
-- - Pontos: 190

-- Profile de aluno: Intermediário
-- - Força: Biologia (dominada)
-- - Fraqueza: Dinâmica (aprendendo com dificuldade)
-- - Padrão: Estuda regularly, cai em erros conceituais

SELECT
  COUNT(*) as total_attempts,
  COUNT(CASE WHEN is_correct THEN 1 END) as correct,
  ROUND(COUNT(CASE WHEN is_correct THEN 1 END) * 100.0 / COUNT(*), 1) as accuracy_percent
FROM question_attempts
WHERE user_id = 'test-user-123';

-- Dados prontos para testes!
