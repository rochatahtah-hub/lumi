import { currentStreak, getState, setState, type LumiState } from './store'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  check: (s: LumiState) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'primeira-aula', title: 'Primeira aula concluída', description: 'Terminou sua primeira atividade.', icon: '🎓', check: (s) => s.history.length >= 1 },
  { id: 'dez-questoes', title: '10 questões respondidas', description: 'Respondeu 10 questões.', icon: '✏️', check: (s) => s.questionsAnswered >= 10 },
  { id: 'cinquenta-questoes', title: '50 questões respondidas', description: 'Respondeu 50 questões.', icon: '📝', check: (s) => s.questionsAnswered >= 50 },
  { id: 'nota-maxima', title: 'Nota máxima', description: 'Acertou todas as questões de uma atividade.', icon: '⭐', check: (s) => s.history.some((h) => h.total >= 5 && h.correct === h.total) },
  { id: 'sem-dicas', title: 'Por conta própria', description: 'Concluiu uma atividade sem usar dicas.', icon: '💪', check: (s) => s.history.some((h) => h.total >= 5 && h.hintsUsed === 0) },
  { id: 'tres-dias', title: '3 dias estudando', description: 'Estudou 3 dias seguidos.', icon: '🔥', check: (s) => currentStreak(s.studyDays) >= 3 },
  { id: 'cinco-dias', title: '5 dias estudando', description: 'Estudou 5 dias seguidos.', icon: '🔥', check: (s) => currentStreak(s.studyDays) >= 5 },
  { id: 'explorador', title: 'Explorador', description: 'Estudou 3 matérias diferentes.', icon: '🧭', check: (s) => new Set(Object.values(s.lessons).map((l) => l.subject)).size >= 3 },
  { id: 'cinco-conteudos', title: '5 conteúdos concluídos', description: 'Concluiu 5 assuntos diferentes.', icon: '📚', check: (s) => Object.keys(s.lessons).length >= 5 },
  { id: 'revisao', title: 'Revisão em dia', description: 'Fez sua primeira revisão.', icon: '🔄', check: (s) => s.reviewsDone >= 1 },
  { id: 'meu-conteudo', title: 'Meu próprio material', description: 'Estudou um conteúdo que você colou.', icon: '📄', check: (s) => s.pastedStudied >= 1 },
]

/** avalia e grava conquistas novas; devolve as que acabaram de ser desbloqueadas */
export function evaluateAchievements(): Achievement[] {
  const s = getState()
  const unlocked = ACHIEVEMENTS.filter((a) => !s.achievements[a.id] && a.check(s))
  if (unlocked.length) {
    const now = new Date().toISOString()
    setState((st) => ({ ...st, achievements: { ...st.achievements, ...Object.fromEntries(unlocked.map((a) => [a.id, now])) } }))
  }
  return unlocked
}
