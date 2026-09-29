import { SOURCE_KINDS, type Block, type Lesson, type LevelId, type Question, type Source, type SubjectId } from '../types'
import { SUBJECTS } from '../content/subjects'

const str = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const LEVELS: LevelId[] = ['fund1', 'fund2', 'medio']

/**
 * Valida e sanitiza uma aula vinda da IA ou da nuvem. Nunca confia no formato:
 * descarta questões quebradas e recusa aulas sem conteúdo mínimo.
 */
export function validateLesson(raw: unknown, fallback: { id: string; subject?: SubjectId; level?: LevelId; origin: Lesson['origin'] }): Lesson | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const subject = (SUBJECTS.find((s) => s.id === r.subject)?.id ?? fallback.subject ?? 'portugues') as SubjectId
  const skills: Record<string, string> = {}
  if (r.skills && typeof r.skills === 'object') for (const [k, v] of Object.entries(r.skills as object)) if (str(v)) skills[str(k, 40)] = str(v, 80)

  const blocks: Block[] = (Array.isArray(r.blocks) ? r.blocks : []).slice(0, 8).map((b: Record<string, unknown>, i: number) => ({
    id: `b${i + 1}`, title: str(b?.title, 120), text: str(b?.text, 1500), example: str(b?.example, 600) || undefined, skill: str(b?.skill, 40) || undefined,
  })).filter((b) => b.title && b.text)

  const questions: Question[] = []
  for (const [i, q] of (Array.isArray(r.questions) ? r.questions : []).slice(0, 15).entries()) {
    const parsed = validateQuestion(q, `q${i + 1}`)
    if (parsed) questions.push(parsed)
  }
  for (const q of questions) if (!skills[q.skill]) skills[q.skill] = q.skill
  if (!blocks.length || questions.length < 3) return null

  const levels = (Array.isArray(r.levels) ? r.levels : []).filter((l): l is LevelId => LEVELS.includes(l as LevelId))
  return {
    id: fallback.id,
    subject,
    title: str(r.title, 120) || 'Aula',
    levels: levels.length ? levels : fallback.level ? [fallback.level] : ['fund2'],
    grade: str(r.grade, 60),
    aliases: (Array.isArray(r.aliases) ? r.aliases : []).map((a) => str(a, 60)).filter(Boolean).slice(0, 20),
    topic: str(r.topic, 120) || undefined,
    subtopic: str(r.subtopic, 120) || undefined,
    relatedQuestions: (Array.isArray(r.relatedQuestions) ? r.relatedQuestions : []).map((x) => str(x, 200)).filter(Boolean).slice(0, 10),
    summary: str(r.summary, 400),
    intro: str(r.intro, 600) || 'Vamos entender juntos.',
    blocks, questions, skills,
    review: (Array.isArray(r.review) ? r.review : []).map((x) => str(x, 200)).filter(Boolean).slice(0, 8),
    sources: (Array.isArray(r.sources) ? r.sources : []).map((s: Record<string, unknown>) => ({ title: str(s?.title, 200), url: str(s?.url, 500) || undefined, author: str(s?.author, 120) || undefined, accessedAt: str(s?.accessedAt, 10) || undefined, kind: (SOURCE_KINDS.includes(s?.kind as Source['kind']) ? s.kind : 'site') as Source['kind'] })).filter((s) => s.title).slice(0, 12),
    origin: fallback.origin,
    ...extras(r),
  }
}

export function validateQuestion(q: unknown, id: string): Question | null {
  if (!q || typeof q !== 'object') return null
  const r = q as Record<string, unknown>
  const hintsRaw = Array.isArray(r.hints) ? r.hints.map((h) => str(h, 400)).filter(Boolean) : []
  while (hintsRaw.length < 3) hintsRaw.push(hintsRaw[hintsRaw.length - 1] ?? 'Releia a explicação com calma.')
  const base = {
    id: str(r.id, 40) || id,
    difficulty: ([1, 2, 3].includes(Number(r.difficulty)) ? Number(r.difficulty) : 2) as 1 | 2 | 3,
    skill: str(r.skill, 40) || 'geral',
    hints: hintsRaw.slice(0, 3) as [string, string, string],
    explanation: str(r.explanation, 800) || 'Revise o bloco da aula relacionado a esta questão.',
  }
  const prompt = str(r.prompt, 600)
  if (!prompt) return null
  switch (r.type) {
    case 'mc': {
      const options = (Array.isArray(r.options) ? r.options : []).map((o) => str(o, 200)).filter(Boolean)
      const answer = Number(r.answer)
      if (options.length < 2 || options.length > 6 || !Number.isInteger(answer) || answer < 0 || answer >= options.length) return null
      if (new Set(options).size !== options.length) return null
      return { ...base, type: 'mc', prompt, options, answer }
    }
    case 'tf':
      if (typeof r.answer !== 'boolean') return null
      return { ...base, type: 'tf', prompt, answer: r.answer }
    case 'fill': {
      const answers = (Array.isArray(r.answers) ? r.answers : []).map((a) => str(a, 80)).filter(Boolean)
      return answers.length ? { ...base, type: 'fill', prompt, answers } : null
    }
    case 'match': {
      const pairs = (Array.isArray(r.pairs) ? r.pairs : []).filter((p): p is [string, string] => Array.isArray(p) && !!str(p[0]) && !!str(p[1])).map(([a, b]) => [str(a, 120), str(b, 120)] as [string, string]).slice(0, 5)
      const rights = new Set(pairs.map((p) => p[1]))
      return pairs.length >= 2 && rights.size === pairs.length ? { ...base, type: 'match', prompt, pairs } : null
    }
    case 'order': {
      const items = (Array.isArray(r.items) ? r.items : []).map((x) => str(x, 200)).filter(Boolean).slice(0, 8)
      return items.length >= 3 && new Set(items).size === items.length ? { ...base, type: 'order', prompt, items } : null
    }
    case 'open': {
      const keywords = (Array.isArray(r.keywords) ? r.keywords : []).map((k) => str(k, 40)).filter(Boolean)
      const modelAnswer = str(r.modelAnswer, 800)
      return modelAnswer && keywords.length ? { ...base, type: 'open', prompt, modelAnswer, keywords } : null
    }
    default:
      return null
  }
}

/** campos do acervo (opcionais): preservados quando vêm do banco ou do editor */
function extras(r: Record<string, unknown>): Partial<Lesson> {
  const arr = (x: unknown, max = 200, n = 150) => (Array.isArray(x) ? x.map((y) => str(y, max)).filter(Boolean).slice(0, n) : undefined)
  const out: Partial<Lesson> = {}
  if (str(r.objective)) out.objective = str(r.objective, 600)
  if (arr(r.prerequisites, 80)) out.prerequisites = arr(r.prerequisites, 80, 10)
  if (arr(r.next, 80)) out.next = arr(r.next, 80, 10)
  if (arr(r.equivalentQuestions)) out.equivalentQuestions = arr(r.equivalentQuestions, 200, 200)
  if (arr(r.commonErrors, 400)) out.commonErrors = arr(r.commonErrors, 400, 20)
  if (Array.isArray(r.commonDoubts)) out.commonDoubts = (r.commonDoubts as Record<string, unknown>[]).map((d) => ({ q: str(d?.q, 300), a: str(d?.a, 1200) })).filter((d) => d.q && d.a).slice(0, 20)
  if (Array.isArray(r.formulas)) out.formulas = (r.formulas as Record<string, unknown>[]).map((f) => ({
    name: str(f?.name, 120), expression: str(f?.expression, 200), conditions: str(f?.conditions, 400) || undefined,
    variables: (Array.isArray(f?.variables) ? (f.variables as Record<string, unknown>[]) : []).map((x) => ({ symbol: str(x?.symbol, 20), meaning: str(x?.meaning, 200), unit: str(x?.unit, 40) || undefined })).filter((x) => x.symbol),
  })).filter((f) => f.name && f.expression).slice(0, 12)
  if (r.history && typeof r.history === 'object') {
    const h = r.history as Record<string, unknown>
    out.history = {
      period: str(h.period, 200),
      timeline: (Array.isArray(h.timeline) ? (h.timeline as Record<string, unknown>[]) : []).map((t) => ({ date: str(t?.date, 60), event: str(t?.event, 400) })).filter((t) => t.date && t.event).slice(0, 30),
      people: Array.isArray(h.people) ? (h.people as Record<string, unknown>[]).map((p) => ({ name: str(p?.name, 120), role: str(p?.role, 300) })).filter((p) => p.name).slice(0, 20) : undefined,
      causes: arr(h.causes, 400, 15), consequences: arr(h.consequences, 400, 15), interpretations: arr(h.interpretations, 600, 10), place: str(h.place, 200) || undefined,
    }
  }
  if (str(r.enem)) out.enem = str(r.enem, 400)
  if (['draft', 'in_review', 'published', 'archived'].includes(String(r.status))) out.status = r.status as Lesson['status']
  if (Number.isInteger(r.version)) out.version = r.version as number
  if (str(r.createdAt, 40)) out.createdAt = str(r.createdAt, 40)
  if (str(r.reviewedAt, 40)) out.reviewedAt = str(r.reviewedAt, 40)
  return out
}
