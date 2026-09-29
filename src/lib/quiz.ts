import type { LevelId, Question } from '../types'
import { normalizeAnswer, normalize, shuffle } from './text'

export interface AnswerLog { questionId: string; skill: string; firstCorrect: boolean; tries: number; hints: number; solved: boolean }

export interface QuizState {
  pool: Question[]
  total: number
  served: string[]
  difficulty: 1 | 2 | 3
  rightStreak: number
  log: AnswerLog[]
  /** habilidades que já receberam mini-revisão no meio da atividade */
  remediated: string[]
  /** fila de habilidades com dificuldade, para priorizar questões de reforço */
  struggling: string[]
}

export function startQuiz(questions: Question[], level: LevelId | undefined, total = 10): QuizState {
  const pool = shuffle(questions)
  return {
    pool, total: Math.min(total, pool.length), served: [], log: [], remediated: [], struggling: [],
    difficulty: level === 'medio' ? 2 : 1, rightStreak: 0,
  }
}

/** escolhe a próxima questão: prioriza reforço de habilidades com dificuldade e depois a dificuldade atual */
export function nextQuestion(s: QuizState): Question | null {
  if (s.served.length >= s.total) return null
  const remaining = s.pool.filter((q) => !s.served.includes(q.id))
  if (!remaining.length) return null
  const target = s.struggling[0]
  if (target) {
    const easy = remaining.filter((q) => q.skill === target).sort((a, b) => a.difficulty - b.difficulty)[0]
    if (easy) return easy
  }
  return [...remaining].sort((a, b) => Math.abs(a.difficulty - s.difficulty) - Math.abs(b.difficulty - s.difficulty))[0]
}

/**
 * Registra a questão concluída e ajusta a dificuldade:
 * 2 acertos seguidos de primeira sem dica → sobe; erro → desce e marca a habilidade para reforço.
 */
export function registerAnswer(s: QuizState, q: Question, log: AnswerLog): QuizState {
  const clean = log.firstCorrect && log.hints === 0
  const rightStreak = clean ? s.rightStreak + 1 : 0
  let difficulty = s.difficulty
  if (rightStreak >= 2 && difficulty < 3) difficulty = (difficulty + 1) as 1 | 2 | 3
  if (!log.firstCorrect && difficulty > 1) difficulty = (difficulty - 1) as 1 | 2 | 3
  let struggling = s.struggling.filter((k) => !(k === q.skill && clean))
  if (!log.firstCorrect && !struggling.includes(q.skill)) struggling = [...struggling, q.skill]
  return { ...s, served: [...s.served, q.id], log: [...s.log, log], difficulty, rightStreak: clean && rightStreak >= 2 ? 0 : rightStreak, struggling }
}

/** duas falhas na mesma habilidade → hora de uma mini-revisão ("Percebi que você está tendo dificuldade…") */
export function needsRemediation(s: QuizState): string | null {
  const counts = new Map<string, number>()
  for (const l of s.log) if (!l.firstCorrect) counts.set(l.skill, (counts.get(l.skill) ?? 0) + 1)
  for (const [skill, n] of counts) if (n >= 2 && !s.remediated.includes(skill)) return skill
  return null
}

export type Given = { kind: 'mc'; index: number } | { kind: 'tf'; value: boolean } | { kind: 'fill'; text: string } | { kind: 'match'; pairs: Record<string, string> } | { kind: 'open'; text: string } | { kind: 'order'; items: string[] }

export function checkAnswer(q: Question, g: Given): boolean {
  switch (q.type) {
    case 'mc': return g.kind === 'mc' && g.index === q.answer
    case 'tf': return g.kind === 'tf' && g.value === q.answer
    case 'fill': return g.kind === 'fill' && q.answers.some((a) => normalizeAnswer(a) === normalizeAnswer(g.text))
    case 'match': return g.kind === 'match' && q.pairs.every(([l, r]) => g.pairs[l] === r)
    case 'open': return g.kind === 'open' && gradeOpen(q.keywords, g.text)
    case 'order': return g.kind === 'order' && g.items.length === q.items.length && g.items.every((x, i) => x === q.items[i])
  }
}

/** correção local de pergunta aberta: resposta com conteúdo mínimo e ao menos 2 ideias-chave (ou 1, se só houver 1-2) */
export function gradeOpen(keywordsList: string[], text: string): boolean {
  const t = normalize(text)
  if (t.split(' ').length < 4) return false
  // compara pelo radical (5 primeiras letras) de cada palavra: "cicatrização" casa com "cicatrizar"
  const radical = (w: string) => w.slice(0, Math.min(5, w.length))
  const words = new Set(t.split(/[^a-z0-9]+/).filter(Boolean).map(radical))
  const has = (k: string) => {
    const n = normalize(k)
    if (t.includes(n)) return true
    const parts = n.split(/[^a-z0-9]+/).filter((w) => w.length > 2)
    return parts.length > 0 && parts.every((w) => words.has(radical(w)))
  }
  const hits = keywordsList.filter(has).length
  return hits >= Math.min(2, keywordsList.length)
}
