import { useEffect, useState } from 'react'
import { MASCOT, type PeekPose } from '../../assets/lumi'

/** 'ears' = só as orelhas/topo da cabeça pela fresta entre as fileiras de cards */
type Act = PeekPose | 'ears'
export type Appearance = { card: number; act: Act; place: 'l' | 'c' | 'r'; flip: boolean; ms: number; key: number; still?: boolean }

/** poses da 1ª fileira (há espaço acima dela) — cada uma com seu gesto */
const TOP_ACTS: Act[] = ['grip', 'look', 'wave', 'kiss', 'smile', 'head']
const ACT_MS: Record<Act, number> = { grip: 5600, look: 5800, wave: 5000, kiss: 5400, smile: 4600, head: 4200, ears: 2600 }
/** olhos (em % da imagem) nas poses em que ele pisca: [esquerdo x, direito x, y, largura, altura] */
const EYES: Partial<Record<Act, [number, number, number, number, number]>> = {
  look: [52.2, 82.1, 43.4, 12.5, 16.5],
  grip: [44.2, 65.9, 43.5, 8.6, 14.8],
}

const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

/**
 * Diretor das aparições: um mascote por vez, em cards diferentes, com pausas variadas.
 * Com "reduzir movimento": uma única pose parada (mãos na borda do card do meio), sem animação.
 */
export function usePeekDirector(cards: number, cols = 3): Appearance | null {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [app, setApp] = useState<Appearance | null>(null)

  useEffect(() => {
    if (reduced) return
    const timers: number[] = []
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms))
    let key = 0
    let lastCard = -1
    let lastAct: Act | null = null
    const next = () => {
      if (document.hidden) return later(next, 2000) // aba escondida: não gasta nada
      const top = Math.random() < 0.72 || cards <= cols
      const pool = Array.from({ length: cards }, (_, i) => i).filter((i) => (top ? i < cols : i >= cols) && i !== lastCard)
      const card = pick(pool)
      const act = top ? pick(TOP_ACTS.filter((a) => a !== lastAct)) : 'ears'
      lastCard = card
      lastAct = act
      const ms = ACT_MS[act]
      setApp({ card, act, place: pick(['l', 'c', 'r'] as const), flip: Math.random() < 0.5, ms, key: ++key })
      later(() => { setApp(null); later(next, 1600 + Math.random() * 2600) }, ms)
    }
    later(next, 900)
    return () => timers.forEach(clearTimeout)
  }, [reduced, cards, cols])

  // só em desenvolvimento: ?mascote=kiss&card=2 fixa uma pose parada, para conferir o visual
  if (import.meta.env.DEV) {
    const q = new URLSearchParams(window.location.search)
    const act = q.get('mascote') as Act | null
    if (act) return { card: Number(q.get('card') ?? 1), act, place: (q.get('lado') as 'l' | 'c' | 'r') ?? 'c', flip: q.has('espelho'), ms: 0, key: 0, still: true }
  }
  return reduced ? { card: 1, act: 'grip', place: 'c', flip: false, ms: 0, key: 0, still: true } : app
}

/**
 * O LUMI atrás de um card: a fatia acima da borda superior do card é a "janela" (o card, na frente, esconde o resto).
 * Sem cliques (pointer-events: none) e sem cobrir nada do card — fica sempre fora dele.
 */
export function CardPeek({ app, row }: { app: Appearance; row: number }) {
  const { act } = app
  const eyes = EYES[act]
  const handsOnEdge = act === 'grip' || act === 'head'
  const timing = app.still ? undefined : { animationDuration: `${app.ms}ms` }
  return (
    <>
      <div aria-hidden className={`lumi-peek-slot ${row === 0 ? 'is-top' : 'is-gap'}`}>
        <div key={app.key} className={`lumi-peek lumi-peek-${app.place} ${act === 'ears' ? 'is-ears' : ''} ${app.still ? 'is-still' : ''}`} style={timing}>
          <div className={`lumi-peek-act act-${act}`} style={{ ...timing, scale: app.flip ? '-1 1' : undefined }}>
            <img src={MASCOT.peek[act === 'ears' ? 'head' : act]} alt="" draggable={false} className="lumi-peek-img" />
            {eyes && !app.still && [eyes[0], eyes[1]].map((x) => (
              <span key={x} className="lumi-peek-lid" style={{ left: `${x}%`, top: `${eyes[2]}%`, width: `${eyes[3]}%`, height: `${eyes[4]}%`, ...timing }} />
            ))}
            {act === 'kiss' && [0, 1].map((i) => (
              <svg key={i} viewBox="0 0 24 24" className={`lumi-peek-heart h${i}`} style={timing}>
                <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 5 6.4 5c2 0 3.4 1.1 4.1 2.3h3C14.2 6.1 15.6 5 17.6 5 21 5 23.1 8.4 21.6 11.8 19.5 16.4 12 21 12 21z" fill="currentColor" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      {/* sombra de contato das mãos sobre a borda do card */}
      {handsOnEdge && <span aria-hidden key={`s${app.key}`} className={`lumi-peek-contact lumi-peek-${app.place} ${app.still ? 'is-still' : ''}`} style={timing} />}
    </>
  )
}
