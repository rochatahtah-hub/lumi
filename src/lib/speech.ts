// Áudio do curso de Inglês: voz sintetizada pelo próprio aparelho (Web Speech API) lendo roteiros ORIGINAIS do LUMI.
// Nada de áudio de terceiros. Quando existir um arquivo licenciado (audioUrl), ele tem prioridade.
// Reconhecimento de fala (speaking): só onde o navegador oferece; sem ele, o aluno faz a autoavaliação.

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

/** idioma padrão da voz: a tela de idioma define (en-US, es-ES, fr-FR, it-IT) */
let defaultLocale = 'en-US'
export const setSpeechLocale = (locale: string) => { defaultLocale = locale }

function voiceFor(locale: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices()
  const base = locale.slice(0, 2)
  return voices.find((v) => v.lang.replace('_', '-') === locale && /google|samantha|microsoft|natural/i.test(v.name))
    ?? voices.find((v) => v.lang.replace('_', '-') === locale) ?? voices.find((v) => v.lang.startsWith(base))
}

/** fala um texto (ou vários, em sequência) e resolve quando termina */
export function speak(text: string | string[], opts: { rate?: number; lang?: string } = {}): Promise<void> {
  if (!canSpeak) return Promise.resolve()
  const parts = (Array.isArray(text) ? text : [text]).map((t) => t.replace(/^[A-Z][a-z]*:\s*/, '')) // "Ana: Hi!" → "Hi!"
  window.speechSynthesis.cancel()
  return new Promise((resolve) => {
    let left = parts.length
    for (const p of parts) {
      const u = new SpeechSynthesisUtterance(p)
      u.lang = opts.lang ?? defaultLocale
      u.rate = opts.rate ?? 0.95
      const v = voiceFor(u.lang)
      if (v) u.voice = v
      u.onend = u.onerror = () => { if (--left === 0) resolve() }
      window.speechSynthesis.speak(u)
    }
  })
}

export const stopSpeaking = () => canSpeak && window.speechSynthesis.cancel()

type Recognition = { lang: string; interimResults: boolean; maxAlternatives: number; start(): void; stop(): void; onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null; onerror: (() => void) | null; onend: (() => void) | null }
const RecognitionCtor = typeof window !== 'undefined'
  ? ((window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }).SpeechRecognition
    ?? (window as unknown as { webkitSpeechRecognition?: new () => Recognition }).webkitSpeechRecognition)
  : undefined
export const canListen = !!RecognitionCtor

/** escuta o aluno no idioma da aula e devolve o que foi reconhecido ('' se não entendeu) */
export function listen(timeoutMs = 9000, lang = defaultLocale): Promise<string> {
  if (!RecognitionCtor) return Promise.resolve('')
  return new Promise((resolve) => {
    const r = new RecognitionCtor()
    r.lang = lang
    r.interimResults = false
    r.maxAlternatives = 1
    let text = ''
    const t = setTimeout(() => r.stop(), timeoutMs)
    r.onresult = (e) => { text = Array.from(e.results).map((x) => x[0]?.transcript ?? '').join(' ') }
    r.onerror = () => { clearTimeout(t); resolve(text) }
    r.onend = () => { clearTimeout(t); resolve(text) }
    r.start()
  })
}
