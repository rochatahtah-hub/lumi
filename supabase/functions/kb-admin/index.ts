// Atualização da base (somente administradores ou o agendamento mensal).
// • research: pesquisa um assunto novo com a IA (web + fontes confiáveis) e registra para revisão.
// • scheduled: rotina mensal — pesquisa as perguntas mais feitas que o LUMI não encontrou.
// Nada é publicado automaticamente: tudo vai para "Conteúdos encontrados pela IA".
import { createClient } from 'npm:@supabase/supabase-js@2'
import { aiConfigured } from '../_shared/ai.ts'
import { cors, fail, json } from '../_shared/http.ts'
import { Blocked, researchAndRegister } from '../_shared/research.ts'

const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return fail('method', 'Use POST.', 405)
  if (!aiConfigured()) return fail('unavailable', 'IA não configurada (GEMINI_API_KEY ou ANTHROPIC_API_KEY).', 503)

  const cronSecret = Deno.env.get('CRON_SECRET')
  const isCron = !!cronSecret && req.headers.get('x-cron-secret') === cronSecret
  if (!isCron) {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    const { data } = token ? await db.auth.getUser(token) : { data: { user: null } }
    if (!data.user) return fail('auth', 'Faça login.', 401)
    const { data: profile } = await db.from('profiles').select('role').eq('id', data.user.id).maybeSingle()
    if (profile?.role !== 'admin') return fail('forbidden', 'Acesso restrito a administradores.', 403)
  }

  const body = await req.json().catch(() => ({})) as Record<string, unknown>
  try {
    if (body.action === 'research') {
      const topic = String(body.topic ?? '').trim()
      if (topic.length < 3) return fail('invalid', 'Digite o assunto.')
      const r = await researchAndRegister(db, { question: topic, subject: body.subject ? String(body.subject) : undefined, level: body.stage ? String(body.stage) : undefined, notes: String(body.notes ?? ''), origin: 'admin' })
      return json({ id: r.id })
    }
    if (body.action === 'scheduled') {
      if (!isCron) return fail('forbidden', 'Somente o agendamento.', 403)
      return json(await scheduled())
    }
    return fail('invalid', 'Ação desconhecida.')
  } catch (e) {
    if (e instanceof Blocked) return fail('blocked', e.message, 422)
    console.error('kb-admin', body.action, e)
    return fail('error', e instanceof Error ? e.message : 'Erro inesperado.', 500)
  }
})

async function scheduled() {
  const perRun = Number(Deno.env.get('RESEARCH_TOPICS_PER_RUN') ?? '5')
  const since = new Date(Date.now() - 31 * 86400_000).toISOString()
  const { data: reqs } = await db.from('topic_requests').select('topic, normalized, subject_id, level').gte('created_at', since)
    .is('ai_content_id', null).is('resolved_lesson_id', null).limit(1000)
  const counts = new Map<string, { n: number; topic: string; subject?: string; level?: string }>()
  for (const r of reqs ?? []) {
    const c = counts.get(r.normalized) ?? { n: 0, topic: r.topic, subject: r.subject_id ?? undefined, level: r.level ?? undefined }
    counts.set(r.normalized, { ...c, n: c.n + 1 })
  }
  const results = []
  for (const [norm, c] of [...counts].sort((a, b) => b[1].n - a[1].n).slice(0, perRun)) {
    try {
      const r = await researchAndRegister(db, { question: c.topic, subject: c.subject, level: c.level, origin: 'rotina' })
      if (r.id) await db.from('topic_requests').update({ ai_content_id: r.id }).eq('normalized', norm).is('ai_content_id', null)
      results.push({ topic: c.topic, asked: c.n, id: r.id })
    } catch (e) {
      results.push({ topic: c.topic, asked: c.n, error: String(e) })
    }
  }
  return { researched: results }
}
