// Pesquisa de lacunas da base: a IA pesquisa, o resultado é registrado em "conteúdos encontrados pela IA"
// e só entra na base oficial depois da revisão administrativa.
import type { SupabaseClient } from 'npm:@supabase/supabase-js@2'
import { complete, parseJson } from './ai.ts'
import { adminResearchPrompt, lessonPrompt } from './prompts.ts'

export class Blocked extends Error {}

export interface ResearchInput {
  question: string
  subject?: string
  level?: string
  age?: number
  notes?: string
  origin: 'aluno' | 'admin' | 'rotina'
}

async function priorities(db: SupabaseClient, subject?: string): Promise<string[]> {
  const { data } = await db.from('trusted_channels').select('name, subjects').eq('active', true)
  return (data ?? []).filter((c) => !subject || !c.subjects?.length || c.subjects.includes(subject)).map((c) => c.name).slice(0, 12)
}

export async function researchAndRegister(db: SupabaseClient, input: ResearchInput) {
  const prio = await priorities(db, input.subject)
  const prompt = input.origin === 'aluno'
    ? lessonPrompt(input.question, input.subject, input.level, input.age, prio)
    : adminResearchPrompt({ topic: input.question, notes: input.notes, subject: input.subject, stage: input.level, priorities: prio })
  const result = await complete({ ...prompt, json: true, search: true, temperature: 0.3, maxTokens: 16384 })
  const lesson = parseJson<Record<string, unknown>>(result.text)
  if (lesson.blocked) throw new Blocked(String(lesson.message ?? 'Vamos estudar um conteúdo da escola?'))
  if (!Array.isArray(lesson.blocks) || !Array.isArray(lesson.questions)) throw new Error('aula incompleta')

  // fontes = páginas efetivamente consultadas na pesquisa (não as que o modelo "diz" ter usado)
  const sources = dedupe(result.sources).slice(0, 10)
  delete lesson.sources
  const content = {
    ...lesson,
    sources: [...sources.map((s) => ({ ...s, kind: 'site' })), { title: 'Pesquisado pelo professor digital LUMI — aguardando revisão', kind: 'ia' }],
  }
  const subject = typeof lesson.subject === 'string' ? lesson.subject : input.subject ?? null
  const { data, error } = await db.from('ai_found_contents').insert({
    question: input.question.slice(0, 300),
    topic: String(lesson.subtopic || lesson.title || input.question).slice(0, 200),
    subject_id: subject,
    level: input.level ?? null,
    content,
    sources,
    provider: result.provider,
    origin: input.origin,
  }).select('id').single()
  if (error) console.error('ai_found insert', error)
  return { id: data?.id as string | undefined, content, subject }
}

function dedupe(list: { title: string; url: string }[]) {
  const seen = new Set<string>()
  return list.filter((s) => {
    const k = s.title || s.url
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}
