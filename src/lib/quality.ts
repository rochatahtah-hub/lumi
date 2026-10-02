import type { Lesson } from '../types'
import { checkAnswer, type Given } from './quiz'
import { normalize } from './text'
import { validateQuestion } from './validate'

export interface QualityReport { ok: boolean; errors: string[]; warnings: string[] }

const BAD_SOURCES = /^(google|youtube|chatgpt|wikipedia)$/i

export function answerOf(q: Lesson['questions'][number]): Given {
  switch (q.type) {
    case 'mc': return { kind: 'mc', index: q.answer }
    case 'tf': return { kind: 'tf', value: q.answer }
    case 'fill': return { kind: 'fill', text: q.answers[0] }
    case 'match': return { kind: 'match', pairs: Object.fromEntries(q.pairs) }
    case 'open': return { kind: 'open', text: q.modelAnswer }
    case 'order': return { kind: 'order', items: q.items }
  }
}

/**
 * Controle de qualidade antes de um conteúdo virar OFICIAL.
 * Erros bloqueiam (o conteúdo fica EM REVISÃO); avisos só orientam a revisão.
 * Verificações de sentido (precisão factual, adequação à série) continuam sendo da revisão humana.
 */
export function qualityCheck(l: Lesson, all: Lesson[] = []): QualityReport {
  const errors: string[] = []
  const warnings: string[] = []
  const need = (cond: unknown, msg: string) => { if (!cond) errors.push(msg) }
  // conteúdo no formato do acervo (com objetivo): exigências completas; conteúdo antigo: viram avisos para atualização
  const acervo = l.origin === 'base' && !!l.objective
  const needAcervo = (cond: unknown, msg: string) => { if (!cond) (acervo ? errors : warnings).push(msg) }

  need(l.title?.trim(), 'título vazio')
  need(l.grade?.trim(), 'ano/série não informado')
  need(l.levels?.length, 'nível escolar não informado')
  need(l.topic?.trim(), 'assunto não informado')
  need(l.subtopic?.trim(), 'subassunto não informado')
  need(l.summary?.trim(), 'resumo vazio')
  need(l.intro?.trim(), 'introdução vazia')
  if (l.origin === 'base') needAcervo(l.objective?.trim(), 'objetivo de aprendizagem vazio (formato antigo)')
  need(l.blocks.length >= 2, 'menos de 2 blocos de explicação')
  need(l.review.length >= 3, 'menos de 3 pontos de revisão')

  for (const b of l.blocks) {
    if (!b.title || !b.text) errors.push(`bloco "${b.title || b.id}" incompleto`)
    if (!b.skill || !l.skills[b.skill]) errors.push(`bloco "${b.title}" sem habilidade cadastrada`)
    if (l.origin === 'base') for (const m of ['simples', 'exemplo', 'passos'] as const) if (!b.variants?.[m]) warnings.push(`bloco "${b.title}" sem reformulação "${m}"`)
  }

  need(l.questions.length >= 8, `só ${l.questions.length} exercícios (mínimo 8)`)
  const prompts = new Set<string>()
  for (const q of l.questions) {
    const label = `exercício ${q.id} ("${q.prompt.slice(0, 40)}…")`
    if (!validateQuestion(q, q.id)) { errors.push(`${label} inválido`); continue }
    if (q.hints.length !== 3 || q.hints.some((h) => !h.trim())) errors.push(`${label} sem 3 dicas`)
    if (!q.explanation.trim()) errors.push(`${label} sem explicação da resposta`)
    if (!l.skills[q.skill]) errors.push(`${label} com habilidade inexistente "${q.skill}"`)
    else if (!l.blocks.some((b) => b.skill === q.skill)) errors.push(`${label}: habilidade sem bloco para revisar`)
    if (!checkAnswer(q, answerOf(q))) errors.push(`${label}: a resposta cadastrada não passa na própria correção`)
    const key = normalize(q.prompt)
    if (prompts.has(key)) errors.push(`${label} repetido`)
    prompts.add(key)
    if (q.type === 'fill' && q.answers.some((a) => a.split(/\s+/).length > 4)) warnings.push(`${label}: resposta de completar muito longa`)
  }
  const types = new Set(l.questions.map((q) => q.type))
  if (types.size < 3) warnings.push('pouca variedade de tipos de exercício')
  const diffs = new Set(l.questions.map((q) => q.difficulty))
  if (diffs.size < 3) warnings.push('exercícios sem as três dificuldades')

  const src = l.sources ?? []
  need(src.length >= 1, 'sem fonte')
  for (const s of src) if (BAD_SOURCES.test(s.title.trim())) errors.push(`fonte genérica "${s.title}"`)
  if (l.origin === 'base') needAcervo(src.some((s) => s.kind !== 'autoral' && (s.url || s.author)), 'nenhuma fonte institucional com link ou autor')

  if (l.origin === 'base') {
    need((l.relatedQuestions?.length ?? 0) >= 3, 'menos de 3 perguntas relacionadas')
    const eq = l.equivalentQuestions ?? []
    needAcervo(eq.length >= 20, `só ${eq.length} perguntas equivalentes (mínimo 20)`)
    const eqNorm = eq.map(normalize)
    if (new Set(eqNorm).size !== eqNorm.length) errors.push('perguntas equivalentes repetidas')
  }
  if (l.subject === 'historia' && l.origin === 'base') {
    if (!l.history) needAcervo(false, 'História sem período e linha do tempo')
    else if (l.history.timeline.length < 3) needAcervo(false, 'linha do tempo com menos de 3 marcos')
  }
  if (['matematica', 'fisica', 'quimica'].includes(l.subject) && !l.formulas?.length) warnings.push('sem fórmulas cadastradas (confirme se o conteúdo não usa fórmula)')
  for (const f of l.formulas ?? []) if (!f.variables.length) errors.push(`fórmula "${f.name}" sem significado das variáveis`)

  // duplicidade com outros conteúdos da base
  const mine = normalize(l.title)
  for (const o of all) {
    if (o.id === l.id) continue
    if (normalize(o.title) === mine) errors.push(`título duplicado com "${o.id}"`)
  }
  for (const id of [...(l.prerequisites ?? []), ...(l.next ?? [])]) if (all.length && !all.some((o) => o.id === id)) warnings.push(`trilha aponta para conteúdo ainda não criado "${id}"`)

  return { ok: errors.length === 0, errors, warnings }
}
