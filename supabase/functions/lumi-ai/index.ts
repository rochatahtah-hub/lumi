// Professor digital do LUMI. Regra central: a BASE PRÓPRIA responde primeiro.
// A IA só é acionada para lacunas — e tudo que ela pesquisa fica registrado para revisão administrativa.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { aiConfigured, complete, parseJson } from '../_shared/ai.ts'
import { cors, fail, json } from '../_shared/http.ts'
import { pastedPrompt, reexplainPrompt } from '../_shared/prompts.ts'
import { Blocked, researchAndRegister } from '../_shared/research.ts'

const LEVELS = ['fund1', 'fund2', 'medio']
const MODES = ['simples', 'exemplo', 'outra', 'detalhado']
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const DAILY_LIMIT = Number(Deno.env.get('AI_DAILY_LIMIT') ?? '40')
const BASE_MATCH = Number(Deno.env.get('BASE_MATCH_SCORE') ?? '70')

const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return fail('method', 'Use POST.', 405)

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return fail('invalid', 'Pedido inválido.')
  }
  const action = String(body.action ?? '')
  const level = LEVELS.includes(String(body.level)) ? String(body.level) : undefined
  const age = Number.isInteger(body.age) && (body.age as number) >= 5 && (body.age as number) <= 99 ? (body.age as number) : undefined
  const subject = typeof body.subject === 'string' ? body.subject.slice(0, 30) : undefined

  try {
    if (action === 'lesson') {
      const question = String(body.topic ?? '').trim()
      if (question.length < 2 || question.length > 300) return fail('invalid', 'Digite o assunto que você quer estudar.')

      // 1) base oficial (busca full-text + semelhança)
      const { data: found } = await db.rpc('lumi_search', { p_query: question, p_subject: subject ?? null, p_limit: 1 })
      if (found?.[0] && found[0].score >= BASE_MATCH) return json({ baseLessonId: found[0].id })

      // 2) conteúdo já pesquisado pela IA, ainda em revisão: reaproveita sem nova chamada
      const { data: pending } = await db.rpc('ai_found_match', { p_query: question, p_subject: subject ?? null })
      if (pending?.[0]) {
        await db.from('ai_found_contents').update({ times_served: pending[0].times_served + 1 }).eq('id', pending[0].id)
        await logMiss(question, subject, level, pending[0].id, pending[0].topic)
        return json({ lesson: pending[0].content, unreviewed: true })
      }

      // 3) lacuna: a IA pesquisa, o aluno recebe e o conteúdo vai para revisão
      const limited = await overLimit(req, body)
      if (limited) return limited
      if (!aiConfigured()) {
        await logMiss(question, subject, level)
        return fail('unavailable', 'Ainda não tenho esse conteúdo na base. Anotei sua pergunta para ele ser adicionado.', 503)
      }
      const r = await researchAndRegister(db, { question, subject, level, age, origin: 'aluno' })
      await logMiss(question, r.subject ?? subject, level, r.id, String((r.content as Record<string, unknown>).subtopic ?? (r.content as Record<string, unknown>).title ?? ''))
      return json({ lesson: r.content, unreviewed: true })
    }

    if (action === 'pasted') {
      const limited = await overLimit(req, body)
      if (limited) return limited
      if (!aiConfigured()) return fail('unavailable', 'O professor digital ainda não foi configurado.', 503)
      const content = String(body.content ?? '').trim()
      if (content.length < 40) return fail('invalid', 'Cole um trecho um pouco maior.')
      if (content.length > 8000) return fail('invalid', 'O texto é muito grande. Cole até 8.000 caracteres por vez.')
      const out = await complete({ ...pastedPrompt(content, level, age), json: true, temperature: 0.3 })
      const lesson = parseJson<Record<string, unknown>>(out.text)
      if (lesson.blocked) return fail('blocked', String(lesson.message ?? 'Vamos estudar um conteúdo da escola?'), 422)
      if (!Array.isArray(lesson.blocks) || !Array.isArray(lesson.questions)) return fail('invalid', 'A aula veio incompleta. Tente de novo.', 502)
      delete lesson.sources
      return json({ lesson: { ...lesson, sources: [{ title: 'Material enviado pelo aluno', kind: 'autoral' }] } })
    }

    if (action === 'reexplain') {
      const limited = await overLimit(req, body)
      if (limited) return limited
      if (!aiConfigured()) return fail('unavailable', 'O professor digital ainda não foi configurado.', 503)
      const mode = MODES.includes(String(body.mode)) ? String(body.mode) : 'outra'
      const text = String(body.text ?? '').slice(0, 1500)
      if (!text) return fail('invalid', 'Trecho vazio.')
      const p = reexplainPrompt({ lessonTitle: String(body.lessonTitle ?? '').slice(0, 120), title: String(body.title ?? '').slice(0, 120), text, example: body.example ? String(body.example) : undefined, mode, level })
      const out = parseJson<{ text?: string; blocked?: boolean; message?: string }>((await complete({ ...p, json: true, temperature: 0.7, maxTokens: 800 })).text)
      if (out.blocked) return fail('blocked', out.message ?? 'Vamos focar no conteúdo da aula?', 422)
      if (!out.text) return fail('invalid', 'Não consegui reformular agora.', 502)
      return json({ text: out.text.slice(0, 1500) })
    }
    return fail('invalid', 'Ação desconhecida.')
  } catch (e) {
    if (e instanceof Blocked) return fail('blocked', e.message, 422)
    console.error('lumi-ai', action, e)
    return fail('network', 'O professor digital está indisponível agora. Tente de novo em instantes.', 502)
  }
})

/** "Perguntas que o LUMI não encontrou" */
async function logMiss(question: string, subject?: string | null, level?: string, aiContentId?: string, possibleTopic?: string) {
  await db.from('topic_requests').insert({ topic: question.slice(0, 200), subject_id: subject ?? null, level: level ?? null, ai_content_id: aiContentId ?? null, possible_topic: possibleTopic?.slice(0, 200) || null })
}

/** limite diário por conta (se logado) ou por aparelho */
async function overLimit(req: Request, body: Record<string, unknown>) {
  let bucket = UUID.test(String(body.installId ?? '')) ? `install:${body.installId}` : null
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (token) {
    const { data } = await db.auth.getUser(token)
    if (data.user) bucket = `user:${data.user.id}`
  }
  if (!bucket) return fail('invalid', 'Aparelho não identificado.')
  const { data: allowed, error } = await db.rpc('ai_bump', { p_bucket: bucket, p_limit: DAILY_LIMIT })
  if (error) console.error('ai_bump', error)
  if (allowed === false) return fail('limit', 'Você já estudou bastante com o professor digital hoje! As aulas da base e seus conteúdos continuam disponíveis. Volte amanhã para pesquisar assuntos novos.', 429)
  return null
}
