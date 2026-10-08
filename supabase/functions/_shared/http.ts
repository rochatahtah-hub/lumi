// 🔐 CORS restritivo - apenas domínios conhecidos
const ALLOWED_ORIGINS = [
  'https://lumiensina.app.br',
  'https://www.lumiensina.app.br',
  'http://localhost:5173', // desenvolvimento local
]

export const cors = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') ?? ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400', // cache CORS preflight por 24h
}

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
}

export const fail = (code: string, message: string, status = 400) => json({ code, message }, status)
