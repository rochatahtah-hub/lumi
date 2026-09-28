// Único ponto do backend que conversa com um provedor de IA.
// Primário: Google Gemini (GEMINI_API_KEY). Reserva: Anthropic Claude (ANTHROPIC_API_KEY), se configurada.
// As chaves ficam só nos secrets das Edge Functions — nunca no frontend.

export interface AiRequest {
  system: string
  user: string
  json?: boolean
  /** pesquisa na web (Google Search grounding) — devolve as fontes consultadas */
  search?: boolean
  maxTokens?: number
  temperature?: number
}

export class ProviderError extends Error {}

export interface AiResult { text: string; sources: { title: string; url: string }[]; provider: string }

async function gemini(req: AiRequest, key: string): Promise<AiResult> {
  const model = Deno.env.get('GEMINI_MODEL') ?? 'gemini-3.6-flash'
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: req.system }] },
      contents: [{ role: 'user', parts: [{ text: req.user }] }],
      generationConfig: {
        temperature: req.temperature ?? 0.5,
        maxOutputTokens: req.maxTokens ?? 8192,
        // com pesquisa ativa a API não aceita resposta forçada em JSON; o prompt pede JSON e o texto é interpretado
        ...(req.json && !req.search ? { responseMimeType: 'application/json' } : {}),
      },
      ...(req.search ? { tools: [{ google_search: {} }] } : {}),
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_LOW_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
      ],
    }),
  })
  if (!res.ok) {
    const detail = (await res.text()).slice(0, 300)
    // pesquisa na web indisponível (cota/plano): responde sem pesquisa — sem fontes externas, o painel sinaliza isso
    if (req.search && (res.status === 429 || res.status === 400 || res.status === 403)) {
      console.warn('google_search indisponível, seguindo sem pesquisa:', res.status, detail)
      const r = await gemini({ ...req, search: false }, key)
      return { ...r, provider: `${r.provider} (sem pesquisa na web)` }
    }
    throw new ProviderError(`gemini ${res.status}: ${detail}`)
  }
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.filter((p: { thought?: boolean }) => !p.thought).map((p: { text?: string }) => p.text ?? '').join('') ?? ''
  if (!text) throw new ProviderError(`gemini sem conteúdo (${data?.candidates?.[0]?.finishReason ?? data?.promptFeedback?.blockReason ?? '?'})`)
  const chunks = data?.candidates?.[0]?.groundingMetadata?.groundingChunks ?? []
  const sources = chunks
    .map((c: { web?: { uri?: string; title?: string } }) => ({ title: c.web?.title ?? '', url: c.web?.uri ?? '' }))
    .filter((x: { url: string }) => x.url)
  return { text, sources, provider: `gemini:${model}` }
}

async function claude(req: AiRequest, key: string): Promise<AiResult> {
  const model = Deno.env.get('ANTHROPIC_MODEL') ?? 'claude-haiku-4-5'
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model,
      max_tokens: req.maxTokens ?? 8192,
      temperature: req.temperature ?? 0.5,
      system: req.system + (req.json ? '\n\nResponda somente com o JSON, sem texto antes ou depois.' : ''),
      messages: [{ role: 'user', content: req.user }],
    }),
  })
  if (!res.ok) throw new ProviderError(`anthropic ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  const text = (data?.content ?? []).filter((c: { type: string }) => c.type === 'text').map((c: { text: string }) => c.text).join('')
  // provedor reserva: sem pesquisa na web, portanto sem fontes externas registradas
  return { text, sources: [], provider: `anthropic:${model}` }
}

export function aiConfigured() {
  return !!(Deno.env.get('GEMINI_API_KEY') || Deno.env.get('ANTHROPIC_API_KEY'))
}

/** tenta o provedor primário e cai para o reserva em caso de falha */
export async function complete(req: AiRequest): Promise<AiResult> {
  const errors: string[] = []
  const g = Deno.env.get('GEMINI_API_KEY')
  const a = Deno.env.get('ANTHROPIC_API_KEY')
  if (g) {
    try { return await gemini(req, g) } catch (e) { errors.push(String(e)) }
  }
  if (a) {
    try { return await claude(req, a) } catch (e) { errors.push(String(e)) }
  }
  throw new ProviderError(errors.join(' | ') || 'nenhum provedor de IA configurado')
}

export function parseJson<T = unknown>(text: string): T {
  const clean = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '')
  const start = clean.search(/[[{]/)
  return JSON.parse(start > 0 ? clean.slice(start) : clean) as T
}
