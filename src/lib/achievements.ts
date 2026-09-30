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
  { id: 'primeiro-jogo', title: 'Aprender brincando', description: 'Concluiu seu primeiro jogo com pelo menos 60% de acerto.', icon: '🎮', check: (s) => s.games.some((g) => g.completed && g.correct / Math.max(1, g.correct + g.wrong) >= 0.6) },
  { id: 'jogo-perfeito', title: 'Jogada perfeita', description: 'Concluiu um jogo difícil sem erros e sem dicas.', icon: '🎯', check: (s) => s.games.some((g) => g.completed && g.difficulty === 3 && g.wrong === 0 && g.hints === 0 && g.correct >= 4) },
  { id: 'jogos-variados', title: 'Jogador curioso', description: 'Concluiu 4 tipos diferentes de jogo.', icon: '🧩', check: (s) => new Set(s.games.filter((g) => g.completed).map((g) => g.game)).size >= 4 },
  { id: 'revisou-jogando', title: 'Revisão divertida', description: 'Jogou 3 conteúdos diferentes que já tinha estudado.', icon: '🔁', check: (s) => new Set(s.games.filter((g) => g.completed && s.lessons[g.lessonId]).map((g) => g.lessonId)).size >= 3 },
  { id: 'ingles-nivel', title: 'Ponto de partida', description: 'Fez o teste de nivelamento de Inglês.', icon: '🧭', check: (s) => !!s.english.placement && s.english.placement.total > 0 },
  { id: 'ingles-unidade', title: 'Unidade dominada', description: 'Passou na avaliação de domínio de uma unidade de Inglês.', icon: '🇬🇧', check: (s) => Object.values(s.english.unitTests).some((t) => t.best >= 70) },
  { id: 'ingles-palavras', title: '50 palavras em inglês', description: 'Praticou e acertou 50 palavras diferentes.', icon: '📚', check: (s) => Object.values(s.english.vocab).filter((v) => v.right > v.wrong).length >= 50 },
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
