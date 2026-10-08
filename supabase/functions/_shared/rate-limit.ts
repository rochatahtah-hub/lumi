// 🔐 RATE LIMITING - Proteção contra DOS
// Implementação em-memory com limpeza periódica

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Limpar entradas expiradas a cada 5 minutos
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  windowMs: number // janela de tempo em ms (ex: 60000 = 1 min)
  maxRequests: number // máximo de requisições por janela
  keyGenerator?: (req: Request) => string // como gerar chave (IP, user, etc)
}

export function checkRateLimit(req: Request, config: RateLimitConfig): { allowed: boolean; remaining: number; retryAfter: number } {
  const defaultKeyGenerator = (req: Request) => {
    // Tentar pegar IP do header (se atrás de proxy)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
               req.headers.get('cf-connecting-ip') ||
               req.headers.get('x-real-ip') ||
               'unknown'
    return ip
  }

  const key = config.keyGenerator ? config.keyGenerator(req) : defaultKeyGenerator(req)
  const now = Date.now()

  let entry = rateLimitMap.get(key)

  // Se entrada não existe ou expirou, criar nova
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 1,
      resetAt: now + config.windowMs,
    }
    rateLimitMap.set(key, entry)
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      retryAfter: 0,
    }
  }

  // Incrementar contador
  entry.count++
  const allowed = entry.count <= config.maxRequests
  const remaining = Math.max(0, config.maxRequests - entry.count)
  const retryAfter = Math.ceil((entry.resetAt - now) / 1000)

  return {
    allowed,
    remaining,
    retryAfter,
  }
}

export function rateLimitResponse(retryAfter: number, message = 'Rate limit exceeded') {
  return new Response(
    JSON.stringify({ error: message, retryAfter }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
      },
    }
  )
}
