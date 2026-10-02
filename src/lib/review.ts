import type { Block, Lesson, Question } from '../types'
import { getLesson } from './repo'
import { weakSkills, type LumiState } from './store'
import { shuffle } from './text'

/**
 * Monta uma revisão curta a partir dos erros anteriores:
 * pega as habilidades mais fracas, traz de volta o bloco que as explica
 * e seleciona as questões dessas habilidades (priorizando as mais fáceis).
 */
export function buildReviewLesson(state: LumiState, onlyLessonId?: string): Lesson | undefined {
  const weak = weakSkills(state).filter((k) => !onlyLessonId || k.lessonId === onlyLessonId).slice(0, 3)
  if (!weak.length) return undefined

  const blocks: Block[] = []
  const questions: Question[] = []
  const skills: Record<string, string> = {}
  for (const w of weak) {
    const src = getLesson(w.lessonId)
    if (!src) continue
    const skill = w.key.slice(w.lessonId.length + 1)
    skills[w.key] = w.label
    const block = src.blocks.find((b) => b.skill === skill)
    if (block) blocks.push({ ...block, id: `${w.lessonId}:${block.id}`, skill: w.key })
    const qs = src.questions.filter((q) => q.skill === skill).sort((a, b) => a.difficulty - b.difficulty).slice(0, 4)
    for (const q of qs) questions.push({ ...q, id: `${w.lessonId}:${q.id}`, skill: w.key })
  }
  if (questions.length < 2) return undefined

  const first = getLesson(weak[0].lessonId)
  return {
    id: 'revisao',
    subject: first?.subject ?? 'portugues',
    title: onlyLessonId && first ? `Revisão: ${first.title}` : 'Revisão dos meus estudos',
    levels: ['fund1', 'fund2', 'medio'],
    grade: '',
    aliases: [],
    summary: `Você teve dificuldade em: ${weak.map((w) => w.label).join(', ')}.`,
    intro: 'Vamos revisar com calma.',
    blocks,
    questions: shuffle(questions).slice(0, 8),
    skills,
    review: weak.map((w) => w.label),
  }
}
