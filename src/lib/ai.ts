import type { Block, Lesson, LevelId, ReexplainMode, SubjectId } from '../types'
import { getState } from './store'
import { supabase } from './supabase'
import { validateLesson } from './validate'

export const aiEnabled = !!supabase

export class AiError extends Error {
  readonly code: 'unavailable' | 'limit' | 'invalid' | 'blocked' | 'network'
  constructor(message: string, code: AiError['code']) {
    super(message)
    this.code = code
  }
}

async function call<T>(body: Record<string, unknown>): Promise<T> {
  if (!supabase) throw new AiError('O professor digital não está conectado neste aparelho.', 'unavailable')
  const { data, error } = await supabase.functions.invoke('lumi-ai', { body: { ...body, installId: getState().installId } })
  if (error) {
    let code: AiError['code'] = 'network'
    let msg = 'Não consegui falar com o professor digital agora. Tente de novo em instantes.'
    try {
      const ctx = (error as { context?: Response }).context
      const j = ctx ? await ctx.json() : null
      if (j?.code === 'limit' || j?.code === 'blocked' || j?.code === 'unavailable') {
        code = j.code
        msg = j.message
      }
    } catch {
      /* resposta sem corpo JSON */
    }
    throw new AiError(msg, code)
  }
  return data as T
}

export type AiLessonResult = { kind: 'base'; lessonId: string } | { kind: 'lesson'; lesson: Lesson }

/**
 * Só é chamada quando a base local não encontrou o assunto. O servidor ainda confere a base oficial;
 * se não houver, a IA pesquisa e o conteúdo volta marcado como "em revisão".
 */
export async function aiLesson(input: { topic: string; subject?: SubjectId; level?: LevelId; age?: number }): Promise<AiLessonResult> {
  const data = await call<{ lesson?: unknown; baseLessonId?: string; unreviewed?: boolean }>({ action: 'lesson', ...input })
  if (data?.baseLessonId) return { kind: 'base', lessonId: data.baseLessonId }
  const lesson = validateLesson(data?.lesson, { id: `ia-${Date.now()}`, subject: input.subject, level: input.level, origin: 'ia' })
  if (!lesson) throw new AiError('A aula veio incompleta. Tente descrever o assunto de outro jeito.', 'invalid')
  return { kind: 'lesson', lesson: { ...lesson, unreviewed: data?.unreviewed !== false } }
}

/** busca full-text na base oficial (PostgreSQL) — segundo passo, depois da busca local */
export async function cloudSearch(query: string, subject?: SubjectId): Promise<{ id: string; score: number } | null> {
  if (!supabase) return null
  const { data, error } = await supabase.rpc('lumi_search', { p_query: query, p_subject: subject ?? null, p_limit: 1 })
  if (error || !Array.isArray(data) || !data[0]) return null
  return { id: data[0].id, score: data[0].score }
}

export async function aiPasted(input: { content: string; level?: LevelId; age?: number }): Promise<Lesson> {
  const data = await call<{ lesson: unknown }>({ action: 'pasted', ...input })
  const lesson = validateLesson(data?.lesson, { id: `colado-${Date.now()}`, level: input.level, origin: 'colado' })
  if (!lesson) throw new AiError('Não consegui transformar esse material em aula. Tente colar um trecho mais completo.', 'invalid')
  return lesson
}

export async function aiReexplain(input: { lessonTitle: string; block: Block; mode: ReexplainMode; level?: LevelId }): Promise<string> {
  const data = await call<{ text: string }>({
    action: 'reexplain', lessonTitle: input.lessonTitle, title: input.block.title, text: input.block.text, example: input.block.example, mode: input.mode, level: input.level,
  })
  if (!data?.text || typeof data.text !== 'string') throw new AiError('Não consegui reformular agora.', 'invalid')
  return data.text.slice(0, 1500)
}

/** reformulação sem IA: usa as variações escritas na base; se não houver, recombina o bloco */
export function localReexplain(block: Block, mode: ReexplainMode): string {
  const v = block.variants?.[mode]
  if (v) return v
  const first = block.text.split(/(?<=[.!?])\s/)[0]
  switch (mode) {
    case 'simples':
      return `Em poucas palavras: ${first}`
    case 'exemplo':
      return block.example ? `Veja um exemplo: ${block.example}` : `Tente pensar num exemplo do seu dia a dia para esta ideia: ${first}`
    case 'outra':
      return `Vamos por outro caminho. A ideia principal é esta: ${first} Leia de novo devagar e tente explicar para alguém com suas palavras.`
    case 'passos':
      return block.text.split(/(?<=[.!?])\s/).map((f, i) => `${i + 1}. ${f}`).join('\n')
    case 'detalhado':
      return `${block.text}${block.example ? ` Exemplo: ${block.example}` : ''}`
  }
}
