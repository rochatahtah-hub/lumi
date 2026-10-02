import type { SessionRecord } from './store'
import { getState, setState } from './store'
import { supabase } from './supabase'

/**
 * Estatísticas anônimas para o painel admin (conteúdos mais acessados, índice de erro).
 * Só envia: id aleatório do aparelho, aula, matéria, faixa escolar e acertos por questão.
 * Nenhum nome, e-mail ou texto digitado pelo aluno.
 */
export async function logSession(rec: SessionRecord) {
  if (!supabase) return
  const { error } = await supabase.rpc('log_study_session', {
    p_install_id: getState().installId,
    p_lesson_ref: rec.lessonId,
    p_subject: rec.subject,
    p_level: rec.level ?? null,
    p_mode: rec.mode,
    p_correct: rec.correct,
    p_total: rec.total,
    p_hints: rec.hintsUsed,
    p_started_at: rec.startedAt,
    p_finished_at: rec.finishedAt,
    p_attempts: rec.attempts.map((a) => ({ question_ref: a.questionId, skill: a.skillKey, first_correct: a.firstCorrect, tries: a.tries, hints: a.hints })),
  })
  if (!error) setState((s) => ({ ...s, history: s.history.map((h) => (h.id === rec.id ? { ...h, synced: true } : h)) }))
}

/** assuntos pedidos que ainda não existem na base — viram pauta de atualização no painel */
export async function logTopicRequest(topic: string, subject?: string) {
  if (!supabase) return
  await supabase.rpc('log_topic_request', { p_topic: topic.slice(0, 200), p_subject: subject ?? null, p_level: getState().profile.level ?? null })
}
