// Motor do Curso de Inglês: domínio, trilha (liberado/bloqueado), perguntas equivalentes, avaliação de unidade,
// revisão inteligente, nivelamento, perfil das 6 habilidades e o "English Mode" das instruções.
import type { CourseLevel, CourseSection, CourseUnit } from '../content/english/course'
import { LANGUAGES, LANG_IDS, langOfSubject, type LangId } from '../content/languages'
import { CEFR_LEVELS, type Block, type CefrLevel, type EnglishSkill, type Lesson, type MCItem, type Question } from '../types'
import { allLessons, getLesson, registerVirtualLessons } from './repo'
import { getState, placementOf, weakSkills, type LumiState } from './store'
import { shuffle } from './text'

// ─────────────────────────── trilhas (todos os idiomas) ───────────────────────────
export type LangUnit = CourseUnit & { level: CefrLevel; section: CourseSection; lang: LangId }
let unitCache: LangUnit[] | undefined
export const allUnits = (): LangUnit[] => (unitCache ??= LANG_IDS.flatMap((lang) => LANGUAGES[lang].course.flatMap((lv) => lv.sections.flatMap((section) => section.units.map((u) => ({ ...u, level: lv.id, section, lang }))))))
export const unitById = (id: string) => allUnits().find((u) => u.id === id)
export const unitOfLesson = (lessonId: string) => allUnits().find((u) => u.lessons.some((l) => l.id === lessonId))
/** idioma de uma aula (pela matéria) */
export const langOfLesson = (l: Pick<Lesson, 'subject'> | undefined): LangId | undefined => langOfSubject(l?.subject)?.id

// ─────────────────────────── domínio ───────────────────────────
export type MasteryState = 'NOT_STARTED' | 'LEARNING' | 'PRACTICING' | 'REVIEW' | 'MASTERED'
export const STATE_LABEL: Record<MasteryState, string> = {
  NOT_STARTED: 'Não iniciado', LEARNING: 'Aprendendo', PRACTICING: 'Praticando', REVIEW: 'Revisar', MASTERED: 'Dominado',
}
/** nota mínima para a próxima aula abrir e para a unidade valer como concluída */
export const PASS_LESSON = 60
export const PASS_UNIT = 70

const DAY = 864e5
const daysSince = (iso?: string) => (iso ? (Date.now() - new Date(iso).getTime()) / DAY : Infinity)
const latest = (dates: (string | undefined)[]) => dates.filter((d): d is string => !!d).sort().at(-1)
const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)

export interface LessonMastery {
  lessonId: string
  mastery: number
  state: MasteryState
  attempts: number
  right: number
  wrong: number
  lastAt?: string
  reviews: number
  /** habilidades desta aula com erros recorrentes */
  weak: string[]
  best: number
  completed: boolean
  ms: number
}

/**
 * Domínio 0–100 de um conteúdo = nota dos exercícios (50%) + acertos por habilidade (20%) + jogos (15%) + atividades
 * de reading/listening/speaking/writing (15%), redistribuindo o peso do que o aluno ainda não fez.
 * Sem praticar por mais de 14 dias, o domínio cai aos poucos (até −20) e o conteúdo volta para a revisão.
 */
export function lessonMastery(s: LumiState, lessonId: string): LessonMastery {
  const stat = s.lessons[lessonId]
  const skills = Object.values(s.skills).filter((k) => k.lessonId === lessonId)
  const right = skills.reduce((a, k) => a + k.right, 0)
  const wrong = skills.reduce((a, k) => a + k.wrong, 0)
  const games = s.games.filter((g) => g.lessonId === lessonId)
  const doneGames = games.filter((g) => g.completed).slice(0, 5)
  const acts = s.english.activities.filter((a) => a.lessonId === lessonId).slice(0, 6)
  const sessions = s.history.filter((h) => h.lessonId === lessonId || h.attempts.some((a) => a.skillKey.startsWith(`${lessonId}:`)))
  const reviews = sessions.filter((h) => h.mode === 'revisao').length
  const lastAt = latest([stat?.lastAt, games[0]?.finishedAt, acts[0]?.at, ...skills.map((k) => k.lastAt)])
  const ms = games.reduce((a, g) => a + g.ms, 0) + sessions.reduce((a, h) => a + Math.max(0, new Date(h.finishedAt).getTime() - new Date(h.startedAt).getTime()), 0)
  const weak = weakSkills(s).filter((k) => k.lessonId === lessonId).map((k) => k.label)
  const base = { lessonId, attempts: sessions.length + games.length + acts.length, right, wrong, lastAt, reviews, weak, best: stat?.best ?? 0, completed: (stat?.best ?? 0) >= PASS_LESSON, ms }

  const parts: [number, number][] = []
  if (stat) parts.push([stat.best, 0.5])
  if (right + wrong) parts.push([(100 * right) / (right + wrong), 0.2])
  if (doneGames.length) parts.push([avg(doneGames.map((g) => (100 * g.correct) / Math.max(1, g.correct + g.wrong))), 0.15])
  if (acts.length) parts.push([avg(acts.map((a) => (100 * a.correct) / Math.max(1, a.total))), 0.15])
  if (!parts.length) return { ...base, mastery: 0, state: s.english.views[lessonId] ? 'LEARNING' : 'NOT_STARTED' }

  const raw = parts.reduce((a, [v, w]) => a + v * w, 0) / parts.reduce((a, [, w]) => a + w, 0)
  const decay = Math.max(0, Math.min(20, daysSince(lastAt) - 14))
  const mastery = Math.round(Math.max(0, Math.min(100, raw - decay)))
  const practiced = !!stat || doneGames.length > 0
  const practices = (stat?.sessions ?? 0) + doneGames.length + reviews
  let state: MasteryState
  if (!practiced) state = 'LEARNING'
  else if (weak.length || (base.best >= 70 && daysSince(lastAt) > 10 && mastery < 85)) state = 'REVIEW'
  else if (mastery >= 85 && practices >= 2) state = 'MASTERED'
  else state = 'PRACTICING'
  return { ...base, mastery, state }
}

// ─────────────────────────── trilha ───────────────────────────
export type TrailMark = 'done' | 'current' | 'open' | 'locked' | 'review' | 'mastered' | 'planned'
export const MARK: Record<TrailMark, { icon: string; label: string }> = {
  done: { icon: '✓', label: 'Concluído' }, current: { icon: '●', label: 'Atual' }, open: { icon: '○', label: 'Liberado' },
  locked: { icon: '🔒', label: 'Bloqueado' }, review: { icon: '↻', label: 'Revisar' }, mastered: { icon: '★', label: 'Dominado' },
  planned: { icon: '…', label: 'Em produção' },
}

export interface TrailLesson { id: string; title: string; available: boolean; mark: TrailMark; m?: LessonMastery; /** a aula anterior ficou abaixo da nota mínima */ reviewFirst?: string }
export interface TrailUnit {
  unit: CourseUnit
  level: CefrLevel
  sectionTitle: string
  unlocked: boolean
  lessons: TrailLesson[]
  available: number
  completed: number
  mastery: number
  testUnlocked: boolean
  test?: { best: number; last: number; tries: number }
  passed: boolean
  /** unidade sem nenhuma aula pronta ainda: aparece, mas não trava a trilha */
  planned: boolean
}
export interface Trail { lang: LangId; levels: { level: CourseLevel; units: TrailUnit[]; pct: number }[]; current?: { unitId: string; lessonId?: string }; level: CefrLevel }

export function buildTrail(s: LumiState = getState(), lang: LangId = 'en'): Trail {
  const course = LANGUAGES[lang].course
  const placement = placementOf(s, lang)
  const exists = new Set(allLessons().map((l) => l.id))
  const placed = placement ? CEFR_LEVELS.indexOf(placement.level) : -1
  let prevPassed = true
  let current: Trail['current']
  const levels = course.map((lv, li) => {
    const units = lv.sections.flatMap((sec) => sec.units.map((unit, ui) => {
      const lessons: TrailLesson[] = unit.lessons.map((l) => ({ id: l.id, title: l.title, available: exists.has(l.id), mark: 'planned' as TrailMark }))
      const avail = lessons.filter((l) => l.available)
      const planned = avail.length === 0
      const firstOfLevel = ui === 0 && sec === lv.sections[0]
      const unlocked = prevPassed || li < placed || (li === placed && firstOfLevel)
      const test = s.english.unitTests[unit.id]
      let prevDone = true
      let prevTitle = ''
      for (const l of lessons) {
        if (!l.available) continue
        l.m = lessonMastery(s, l.id)
        const open = unlocked && prevDone
        if (!open) {
          l.mark = 'locked'
          if (unlocked && prevTitle && s.lessons[lessons.find((x) => x.title === prevTitle)!.id]) l.reviewFirst = prevTitle
        } else if (l.m.state === 'MASTERED') l.mark = 'mastered'
        else if (l.m.state === 'REVIEW') l.mark = 'review'
        else if (l.m.completed) l.mark = 'done'
        else l.mark = 'open'
        prevDone = l.m.completed
        prevTitle = l.title
      }
      const completed = avail.filter((l) => l.m!.completed).length
      const testUnlocked = unlocked && !planned && completed === avail.length
      const passed = planned || (test?.best ?? 0) >= PASS_UNIT
      if (!current && unlocked && !planned) {
        const next = lessons.find((l) => l.mark === 'open' || l.mark === 'review' || (l.available && l.mark === 'locked' && !!l.reviewFirst))
        if (next && next.mark === 'open') { next.mark = 'current'; current = { unitId: unit.id, lessonId: next.id } }
        else if (!passed) current = { unitId: unit.id, lessonId: next?.reviewFirst ? lessons.find((x) => x.title === next.reviewFirst)?.id : next?.id }
      }
      prevPassed = passed && (unlocked || planned)
      return {
        unit, level: lv.id, sectionTitle: sec.title, unlocked, lessons, available: avail.length, completed,
        mastery: Math.round(avg(avail.map((l) => l.m!.mastery))), testUnlocked, test, passed, planned,
      }
    }))
    const real = units.filter((u) => !u.planned)
    const pct = real.length ? Math.round((100 * real.filter((u) => u.passed).length) / real.length) : 0
    return { level: lv, units, pct }
  })
  const curUnit = current && allUnits().find((u) => u.id === current!.unitId)
  const level = curUnit?.level ?? placement?.level ?? 'A1'
  return { lang, levels, current, level }
}

// ─────────────────────────── English Mode ───────────────────────────
/**
 * Quanto mais avançado, mais inglês nas instruções: A1 português + inglês de apoio; A2 inglês + português;
 * B1 inglês com português pequeno; B2 e C1 só inglês.
 */
export function bilingual(level: CefrLevel, pt: string, en: string): { main: string; sub?: string } {
  switch (level) {
    case 'A1': return { main: pt, sub: en }
    case 'A2': return { main: en, sub: pt }
    case 'B1': return { main: en, sub: pt }
    default: return { main: en }
  }
}
export const studentEnglishLevel = (s: LumiState = getState()): CefrLevel => s.profile.englishLevel ?? buildTrail(s).level

// ─────────────────────────── perguntas equivalentes ───────────────────────────
const POS_PT: Record<string, string> = {
  noun: 'substantivo', verb: 'verbo', adjective: 'adjetivo', adverb: 'advérbio', pronoun: 'pronome', preposition: 'preposição', phrase: 'expressão',
  'phrasal verb': 'phrasal verb', idiom: 'expressão idiomática', conjunction: 'conjunção', determiner: 'determinante', number: 'número', interjection: 'interjeição',
}

const langLessons = (lang: LangId = 'en') => allLessons().filter((l) => l.subject === LANGUAGES[lang].subject && l.english)

function mcQuestion(id: string, skill: string, prompt: string, options: string[], answer: number, difficulty: 1 | 2 | 3, hints: [string, string, string], explanation: string): Question {
  return { id, type: 'mc', skill, prompt, options, answer, difficulty, hints, explanation }
}

/** mistura a resposta certa com 3 distratores e devolve as opções + o índice certo */
function withDistractors(right: string, pool: string[]): { options: string[]; answer: number } | null {
  const others = shuffle([...new Set(pool.filter((p) => p.toLowerCase() !== right.toLowerCase()))]).slice(0, 3)
  if (others.length < 2) return null
  const options = shuffle([right, ...others])
  return { options, answer: options.indexOf(right) }
}

/**
 * Cria perguntas NOVAS sobre o mesmo conceito a partir da base da aula (vocabulário, frases para completar,
 * diálogos e leitura) — assim a avaliação e a revisão não repetem só as mesmas questões.
 */
export function equivalentQuestions(lesson: Lesson, max = 4, prefix = 'eq'): Question[] {
  const lang = langOfLesson(lesson) ?? 'en'
  const L = LANGUAGES[lang]
  const out: Question[] = []
  const vocab = lesson.english?.vocabulary ?? []
  const sameLevel = langLessons(lang).filter((l) => l.english?.cefr === lesson.english?.cefr).flatMap((l) => l.english?.vocabulary ?? [])
  const pool = [...vocab, ...sameLevel]
  const skill = `${lesson.id}:vocab`
  shuffle(vocab).forEach((e, i) => {
    const kind = i % 3
    const hints: [string, string, string] = [`Pense no exemplo: “${e.example}”`, `É ${POS_PT[e.pos] ?? 'uma palavra'} ligado a ${e.topic ?? lesson.title}.`, `Começa com “${(kind === 1 ? e.word : e.translation).slice(0, 2)}…”.`]
    const expl = `“${e.word}” = ${e.translation}. Ex.: ${e.example}`
    if (kind === 0) {
      const d = withDistractors(e.translation, pool.map((p) => p.translation))
      if (d) out.push(mcQuestion(`${prefix}-v${i}`, skill, `${L.ui.whatMeans(e.word)} · O que significa “${e.word}”?`, d.options, d.answer, e.difficulty, hints, expl))
    } else if (kind === 1) {
      const d = withDistractors(e.word, pool.map((p) => p.word))
      if (d) out.push(mcQuestion(`${prefix}-v${i}`, skill, `Como se diz “${e.translation}” em ${L.name.toLowerCase()}?`, d.options, d.answer, e.difficulty, hints, expl))
    } else {
      const re = new RegExp(`\\b${e.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      const d = withDistractors(e.word, pool.map((p) => p.word))
      if (re.test(e.example) && d) out.push(mcQuestion(`${prefix}-v${i}`, skill, `Complete: ${e.example.replace(re, '_____')}`, d.options, d.answer, Math.min(3, e.difficulty + 1) as 1 | 2 | 3, hints, expl))
    }
  })
  const gSkill = lesson.blocks[0]?.skill ? `${lesson.id}:${lesson.blocks[0].skill}` : skill
  ;(lesson.games?.blanks ?? []).forEach((b, i) => out.push(mcQuestion(`${prefix}-b${i}`, gSkill, `Complete: ${b.sentence}`, b.options, b.answer, b.difficulty,
    ['Leia a frase inteira antes de escolher.', `Lembre da regra de “${lesson.title}”.`, 'Elimine as opções que não combinam com o resto da frase.'], b.explanation)))
  ;(lesson.games?.dialogues ?? []).forEach((d, i) => out.push(mcQuestion(`${prefix}-d${i}`, gSkill,
    `${d.title} — complete o diálogo:\n${d.lines.map((l, j) => `${l.who}: ${j === d.gap ? '_____' : l.text}`).join('\n')}`, d.options, d.answer, d.difficulty,
    ['Leia a fala antes e a fala depois da lacuna.', 'A resposta precisa combinar com a pergunta ou comentário anterior.', 'Pense no que uma pessoa diria naturalmente nessa situação.'], d.explanation)))
  const rd = lesson.english?.reading
  if (rd) rd.questions.forEach((q, i) => out.push(fromMCItem(`${prefix}-r${i}`, `${lesson.id}:reading`, q, `📖 ${rd.title}\n${rd.text}\n\n${q.prompt}`)))
  return shuffle(out).slice(0, max)
}

const fromMCItem = (id: string, skill: string, q: MCItem, prompt = q.prompt): Question =>
  mcQuestion(id, skill, prompt, q.options, q.answer, q.difficulty, ['Volte ao texto e procure a parte que fala disso.', 'Preste atenção nas palavras que se repetem na pergunta e no texto.', 'Descarte as opções que o texto não diz.'], q.explanation)

/** questões originais da aula com ids/habilidades prefixados para a aula montada */
const prefixed = (l: Lesson, qs: Question[]) => qs.map((q) => ({ ...q, id: `${l.id}:${q.id}`, skill: q.skill.includes(':') ? q.skill : `${l.id}:${q.skill}` }) as Question)

function virtualLesson(id: string, title: string, sources: Lesson[], questions: Question[], summary: string, intro: string, lang: LangId = 'en'): Lesson {
  const skills: Record<string, string> = {}
  const blocks: Block[] = []
  for (const l of sources) {
    for (const [k, v] of Object.entries(l.skills)) skills[`${l.id}:${k}`] = `${v} (${l.title})`
    skills[`${l.id}:vocab`] = `Vocabulário: ${l.title}`
    skills[`${l.id}:reading`] = `Leitura: ${l.title}`
    for (const b of l.blocks) blocks.push({ ...b, id: `${l.id}:${b.id}`, skill: b.skill ? `${l.id}:${b.skill}` : undefined })
  }
  return {
    id, subject: LANGUAGES[lang].subject, title, levels: ['fund1', 'fund2', 'medio'], grade: '', aliases: [], summary, intro,
    blocks, questions, skills, review: sources.map((l) => l.title), origin: 'base',
  }
}

/** avaliação de domínio da unidade: mistura vocabulário, gramática, leitura e contexto com perguntas equivalentes */
export function buildUnitTest(unitId: string): Lesson | undefined {
  const unit = unitById(unitId)
  if (!unit) return undefined
  const lessons = unit.lessons.map((l) => getLesson(l.id)).filter((l): l is Lesson => !!l)
  if (!lessons.length) return undefined
  const per = Math.max(2, Math.ceil(10 / lessons.length))
  let qs: Question[] = []
  for (const l of lessons) {
    const eq = equivalentQuestions(l, per - 1, `av-${l.id}`)
    const hard = shuffle(l.questions.filter((q) => q.difficulty >= 2 && q.type !== 'open')).slice(0, Math.max(1, per - eq.length))
    qs.push(...eq, ...prefixed(l, hard))
  }
  qs = shuffle(qs).slice(0, 10)
  return virtualLesson(`avaliacao-${unitId}`, `Avaliação: ${unit.title}`, lessons, qs,
    `Avaliação de domínio da unidade “${unit.title}”.`, `Objetivo da unidade: ${unit.objective}`, unit.lang)
}

export interface ReviewPick { lesson: Lesson; reason: string; m: LessonMastery }

/** o que revisar agora: erros recorrentes, baixo domínio e conteúdos estudados há algum tempo */
export function reviewPicks(s: LumiState = getState(), max = 3, lang: LangId = 'en'): ReviewPick[] {
  const picks: (ReviewPick & { score: number })[] = []
  for (const l of langLessons(lang)) {
    const m = lessonMastery(s, l.id)
    if (m.state === 'NOT_STARTED' || m.state === 'LEARNING') continue
    const days = daysSince(m.lastAt)
    let score = 0
    let reason = ''
    if (m.weak.length) { score += 50 + m.weak.length * 5; reason = `Você errou mais em: ${m.weak.slice(0, 2).join(', ')}` }
    if (m.mastery < 70) { score += 70 - m.mastery; reason ||= `Domínio de ${m.mastery}% — dá para melhorar` }
    if (days > 7) { score += Math.min(30, days); reason ||= `Você estudou há ${Math.round(days)} dias` }
    if (m.state === 'REVIEW') score += 20
    if (score > 0) picks.push({ lesson: l, reason: reason || 'Precisa de reforço', m, score })
  }
  return picks.sort((a, b) => b.score - a.score).slice(0, max)
}

/** revisão de Inglês com perguntas NOVAS do mesmo conceito (não repete as que o aluno errou) */
/** id da revisão montada (Inglês mantém os ids antigos) */
export const reviewId = (lang: LangId = 'en', unitId?: string) =>
  lang === 'en' ? (unitId ? `revisao-ingles-${unitId}` : 'revisao-ingles') : unitId ? `revisao-idioma-${lang}-${unitId}` : `revisao-idioma-${lang}`

export function buildEnglishReview(unitId?: string, lang: LangId = unitId ? unitById(unitId)?.lang ?? 'en' : 'en'): Lesson | undefined {
  const s = getState()
  const picks = unitReviewPicks(s, unitId, lang)
  if (!picks.length) return undefined
  const missed = new Set(s.history.flatMap((h) => h.attempts.filter((a) => !a.firstCorrect).map((a) => a.questionId)))
  let qs: Question[] = []
  for (const { lesson: l, m } of picks) {
    const weakKeys = new Set(Object.values(s.skills).filter((k) => k.lessonId === l.id && m.weak.includes(k.label)).map((k) => k.key.split(':')[1]))
    const originals = l.questions.filter((q) => q.type !== 'open' && !missed.has(`${l.id}:${q.id}`) && (!weakKeys.size || weakKeys.has(q.skill)))
    qs.push(...equivalentQuestions(l, 3, `rv-${l.id}`), ...prefixed(l, shuffle(originals).slice(0, 2)))
  }
  qs = shuffle(qs).slice(0, 8)
  if (qs.length < 3) return undefined
  return virtualLesson(reviewId(lang, unitId), unitId ? `Revisão: ${unitById(unitId)?.title ?? 'unidade'}` : `Hora de revisar: ${LANGUAGES[lang].name}`, picks.map((p) => p.lesson), qs,
    `Revisão de: ${picks.map((p) => p.lesson.title).join(', ')}.`, 'Perguntas novas sobre o que você já estudou.', lang)
}

/** revisão geral (o que mais precisa) ou revisão de uma unidade (todas as aulas já estudadas dela) */
export function unitReviewPicks(s: LumiState, unitId?: string, lang: LangId = 'en'): ReviewPick[] {
  if (!unitId) return reviewPicks(s, 3, lang)
  const unit = unitById(unitId)
  return (unit?.lessons ?? []).map((x) => getLesson(x.id)).filter((l): l is Lesson => !!l)
    .map((l) => ({ lesson: l, m: lessonMastery(s, l.id), reason: 'Aula desta unidade' }))
    .filter((p) => p.m.state !== 'NOT_STARTED')
}

registerVirtualLessons((id) => {
  if (id.startsWith('avaliacao-')) return buildUnitTest(id.slice('avaliacao-'.length))
  if (id === 'revisao-ingles') return buildEnglishReview()
  if (id.startsWith('revisao-ingles-')) return buildEnglishReview(id.slice('revisao-ingles-'.length), 'en')
  const m = /^revisao-idioma-([a-z]{2})(?:-(.+))?$/.exec(id)
  if (m && m[1] in LANGUAGES) return buildEnglishReview(m[2], m[1] as LangId)
  return undefined
})

// ─────────────────────────── nivelamento ───────────────────────────
/**
 * Estimativa (não é certificação): o nível estimado é o mais alto em que o aluno respondeu
 * pelo menos 2 perguntas e acertou 60% ou mais — contanto que os níveis abaixo também tenham ido bem.
 */
export function estimateLevel(answers: { level: CefrLevel; right: boolean }[]): CefrLevel {
  let est: CefrLevel = 'A1'
  for (const lv of CEFR_LEVELS) {
    const mine = answers.filter((a) => a.level === lv)
    if (mine.length < 2) break
    if (mine.filter((a) => a.right).length / mine.length < 0.6) break
    est = lv
  }
  return est
}

// ─────────────────────────── painel de Inglês ───────────────────────────
export const SKILL_INFO: Record<EnglishSkill, { label: string; icon: string }> = {
  reading: { label: 'Reading', icon: '📖' }, writing: { label: 'Writing', icon: '✍️' }, listening: { label: 'Listening', icon: '🎧' },
  speaking: { label: 'Speaking', icon: '🗣️' }, vocabulary: { label: 'Vocabulary', icon: '📚' }, grammar: { label: 'Grammar', icon: '🔤' },
}
const GAME_SKILL: Record<string, EnglishSkill> = {
  memoria: 'vocabulary', ligue: 'vocabulary', caca: 'vocabulary', quebra: 'vocabulary',
  quiz: 'grammar', complete: 'grammar', ordem: 'grammar', dialogo: 'grammar', mapa: 'vocabulary',
  listening: 'listening', reading: 'reading',
}
/** prefixos das habilidades nas aulas de Inglês: v_ vocabulário, r_ leitura, l_ escuta, s_/p_ fala e pronúncia, w_ escrita */
export function areaOfSkill(key: string): EnglishSkill {
  const k = key.split(':')[1] ?? key
  if (k === 'vocab' || k.startsWith('v_')) return 'vocabulary'
  if (k === 'reading' || k.startsWith('r_')) return 'reading'
  if (k.startsWith('l_')) return 'listening'
  if (k.startsWith('s_') || k.startsWith('p_')) return 'speaking'
  if (k.startsWith('w_')) return 'writing'
  return 'grammar'
}

export function skillProfile(s: LumiState = getState(), lang: LangId = 'en'): Record<EnglishSkill, { pct: number | null; n: number }> {
  const ids = new Set(langLessons(lang).map((l) => l.id))
  const acc: Record<EnglishSkill, [number, number]> = { reading: [0, 0], writing: [0, 0], listening: [0, 0], speaking: [0, 0], vocabulary: [0, 0], grammar: [0, 0] }
  for (const k of Object.values(s.skills)) if (ids.has(k.lessonId)) { const a = acc[areaOfSkill(k.key)]; a[0] += k.right; a[1] += k.right + k.wrong }
  for (const a of s.english.activities) if (ids.has(a.lessonId)) { const sk: EnglishSkill = a.kind === 'desafio' ? 'writing' : a.kind; acc[sk][0] += a.correct; acc[sk][1] += a.total }
  for (const g of s.games) if (ids.has(g.lessonId)) { const a = acc[GAME_SKILL[g.game] ?? 'vocabulary']; a[0] += g.correct; a[1] += g.correct + g.wrong }
  return Object.fromEntries(Object.entries(acc).map(([k, [r, n]]) => [k, { pct: n ? Math.round((100 * r) / n) : null, n }])) as Record<EnglishSkill, { pct: number | null; n: number }>
}

export function wordsLearned(s: LumiState = getState(), lang: LangId = 'en'): number {
  const words = new Set<string>()
  for (const l of langLessons(lang)) if ((s.lessons[l.id]?.best ?? 0) >= PASS_LESSON) for (const v of l.english?.vocabulary ?? []) words.add(v.word.toLowerCase())
  const mine = new Set(langLessons(lang).flatMap((l) => (l.english?.vocabulary ?? []).map((v) => v.word.toLowerCase())))
  for (const [w, v] of Object.entries(s.english.vocab)) if (v.right > v.wrong && mine.has(w.toLowerCase())) words.add(w.toLowerCase())
  return words.size
}

/** recomendações curtas do painel ("Você está tendo dificuldade com… / Você já domina…") */
export function englishTips(s: LumiState = getState(), lang: LangId = 'en'): { text: string; to: string; cta: string }[] {
  const tips: { text: string; to: string; cta: string }[] = []
  const pick = reviewPicks(s, 1, lang)[0]
  if (pick) tips.push({ text: `Você está tendo dificuldade com ${pick.lesson.title}. Vamos praticar um pouco?`, to: `/idiomas/${lang}/revisar`, cta: 'Praticar' })
  const trail = buildTrail(s, lang)
  const mastered = trail.levels.flatMap((l) => l.units).flatMap((u) => u.lessons).find((l) => l.mark === 'mastered')
  if (mastered && trail.current?.lessonId) tips.push({ text: `Você já domina ${mastered.title}. Que tal avançar?`, to: `/estudar?lesson=${trail.current.lessonId}`, cta: 'Avançar' })
  return tips
}
