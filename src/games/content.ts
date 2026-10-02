// Montadores dos jogos: tudo sai da Base Oficial (exercícios da aula + material de jogo cadastrado na aula).
// Nenhum jogo inventa conteúdo — se a aula não tem material suficiente, o jogo simplesmente não aparece para ela.
import type { GameBlank, GameDialogue, GameSequence, GameWord, Lesson, MCItem } from '../types'
import { normalize, shuffle } from '../lib/text'
import type { GameId } from './registry'

type D = 1 | 2 | 3
/** chave de habilidade (lessonId:skill) para o acerto/erro alimentar a revisão */
type Keyed = { key?: string; label?: string }

/** escolhe `n` itens priorizando a dificuldade pedida (depois as vizinhas) */
export function byDifficulty<T extends { difficulty: D }>(items: T[], d: D, n: number): T[] {
  return shuffle(items).sort((a, b) => Math.abs(a.difficulty - d) - Math.abs(b.difficulty - d) || (a.difficulty > d ? 1 : -1)).slice(0, n)
}

const skillKey = (l: Lesson, skill: string) => (skill.includes(':') ? skill : `${l.id}:${skill}`)
const skillLabel = (l: Lesson, skill: string) => l.skills[skill] ?? skill

export interface PairItem extends Keyed { a: string; b: string; difficulty: D; speak?: boolean }
export function gamePairs(l: Lesson): PairItem[] {
  const out: PairItem[] = [...(l.games?.pairs ?? []).map((p) => ({ ...p }))]
  for (const q of l.questions) if (q.type === 'match') for (const [a, b] of q.pairs) out.push({ a, b, difficulty: q.difficulty, key: skillKey(l, q.skill), label: skillLabel(l, q.skill) })
  for (const v of l.english?.vocabulary ?? []) out.push({ a: v.word, b: v.translation, difficulty: v.difficulty, speak: true, key: `${l.id}:vocab`, label: `Vocabulário: ${l.title}` })
  // sem repetir o mesmo termo (o jogo ficaria ambíguo)
  const seenA = new Set<string>(), seenB = new Set<string>()
  return out.filter((p) => {
    const a = normalize(p.a), b = normalize(p.b)
    if (seenA.has(a) || seenB.has(b) || a === b) return false
    seenA.add(a); seenB.add(b)
    return p.a.length <= 60 && p.b.length <= 60
  })
}

/** palavras do caça-palavras: sem acento, sem espaço, de 3 a 12 letras */
export const gridWord = (w: string) => normalize(w).toUpperCase().replace(/[^A-Z]/g, '')
export function gameWords(l: Lesson): GameWord[] {
  const out: GameWord[] = [...(l.games?.words ?? [])]
  // palavras compostas entram juntas na grade (give up → GIVEUP), como é comum em caça-palavras
  for (const v of l.english?.vocabulary ?? []) out.push({ word: v.word, clue: v.translation, difficulty: v.difficulty })
  const seen = new Set<string>()
  return out.filter((w) => {
    const g = gridWord(w.word)
    if (g.length < 3 || g.length > 12 || seen.has(g)) return false
    seen.add(g)
    return true
  })
}

export type SequenceItem = GameSequence & Keyed
export function gameSequences(l: Lesson): SequenceItem[] {
  const out: SequenceItem[] = [...(l.games?.sequences ?? [])]
  for (const q of l.questions) if (q.type === 'order') out.push({ prompt: q.prompt, items: q.items, difficulty: q.difficulty, explanation: q.explanation, key: skillKey(l, q.skill), label: skillLabel(l, q.skill) })
  return out.filter((s) => s.items.length >= 3)
}

export type BlankItem = GameBlank & Keyed & { hints?: [string, string, string] }
const BLANK = /_{2,}/
export function gameBlanks(l: Lesson): BlankItem[] {
  const out: BlankItem[] = [...(l.games?.blanks ?? [])]
  for (const q of l.questions) if (q.type === 'mc' && BLANK.test(q.prompt)) out.push({ sentence: q.prompt.replace(/^complete(\s+a\s+frase)?\s*:\s*/i, ''), options: q.options, answer: q.answer, explanation: q.explanation, difficulty: q.difficulty, hints: q.hints, key: skillKey(l, q.skill), label: skillLabel(l, q.skill) })
  return out
}

export interface QuizItem extends MCItem, Keyed { hints?: [string, string, string] }
export function gameQuiz(l: Lesson): QuizItem[] {
  const out: QuizItem[] = []
  for (const q of l.questions) {
    if (q.type === 'mc' && !BLANK.test(q.prompt)) out.push({ prompt: q.prompt, options: q.options, answer: q.answer, explanation: q.explanation, difficulty: q.difficulty, hints: q.hints, key: skillKey(l, q.skill), label: skillLabel(l, q.skill) })
    if (q.type === 'tf') out.push({ prompt: q.prompt, options: ['Verdadeiro', 'Falso'], answer: q.answer ? 0 : 1, explanation: q.explanation, difficulty: q.difficulty, hints: q.hints, key: skillKey(l, q.skill), label: skillLabel(l, q.skill) })
  }
  return out
}

export const gameDialogues = (l: Lesson): GameDialogue[] => l.games?.dialogues ?? []

/** quantos itens cada jogo precisa para valer a pena jogar */
const MIN: Record<GameId, (l: Lesson) => boolean> = {
  quebra: (l) => l.blocks.length >= 2,
  caca: (l) => gameWords(l).length >= 4,
  memoria: (l) => gamePairs(l).length >= 4,
  ligue: (l) => gamePairs(l).length >= 4,
  ordem: (l) => gameSequences(l).length >= 1,
  complete: (l) => gameBlanks(l).length >= 3,
  quiz: (l) => gameQuiz(l).length >= 5,
  mapa: (l) => (l.games?.map?.targets.length ?? 0) >= 3,
  dialogo: (l) => gameDialogues(l).length >= 2,
  listening: (l) => !!l.english?.listening?.questions.length,
  reading: (l) => !!l.english?.reading?.questions.length,
}

export function availableGames(l: Lesson): GameId[] {
  return (Object.keys(MIN) as GameId[]).filter((g) => MIN[g](l))
}
export const hasGame = (l: Lesson, g: GameId) => MIN[g]?.(l) ?? false
