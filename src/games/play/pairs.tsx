import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { LumiMark } from '../../components/ui'
import { canSpeak, speak } from '../../lib/speech'
import { shuffle } from '../../lib/text'
import { byDifficulty, gamePairs, type PairItem } from '../content'
import { GameShell, type GameApi } from '../GameShell'
import type { GameProps } from './choice'

// ─────────────────────────── Jogo da Memória ───────────────────────────
interface CardT { id: number; pair: number; side: 'a' | 'b'; text: string; speak?: boolean }

export function MemoryGame(p: GameProps) {
  const pairs = useMemo(() => byDifficulty(gamePairs(p.lesson), p.difficulty, { 1: 4, 2: 6, 3: 8 }[p.difficulty]), [p.lesson, p.difficulty])
  const cards = useMemo<CardT[]>(() => shuffle(pairs.flatMap((pr, i) => [
    { id: i * 2, pair: i, side: 'a' as const, text: pr.a, speak: pr.speak },
    { id: i * 2 + 1, pair: i, side: 'b' as const, text: pr.b },
  ])), [pairs])
  const [open, setOpen] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [peek, setPeek] = useState(false)
  const busy = useRef(false)
  const apiRef = useRef<GameApi | null>(null)
  // terminou (inclusive pela dica 3, que revela um par): encerra a partida
  useEffect(() => {
    if (pairs.length && matched.length === pairs.length) { const t = setTimeout(() => apiRef.current?.done(pairs.length), 700); return () => clearTimeout(t) }
  }, [matched, pairs.length])

  const flip = (c: CardT, api: GameApi) => {
    if (busy.current || open.includes(c.id) || matched.includes(c.pair)) return
    if (c.speak && canSpeak) void speak(c.text)
    const now = [...open, c.id]
    setOpen(now)
    if (now.length < 2) return
    api.move()
    const [x, y] = now.map((id) => cards.find((k) => k.id === id)!)
    if (x.pair === y.pair) {
      const pr = pairs[x.pair]
      api.hit(true, { key: pr.key, label: pr.label, word: pr.speak ? pr.a : undefined })
      const m = [...matched, x.pair]
      setMatched(m)
      setOpen([])
      api.say(`Isso aí! Você encontrou um par! 🎉\n${pr.a} = ${pr.b}`, 'smile')
    } else {
      busy.current = true
      setTimeout(() => { setOpen([]); busy.current = false }, 950)
    }
  }

  const hint = (lv: 1 | 2 | 3) => {
    if (lv === 1) return pairs.some((x) => x.speak) ? 'As cartas com 🔊 são as palavras em inglês; as outras trazem o significado.' : 'Cada termo tem um par com o seu significado. Guarde a posição das cartas que você já viu.'
    if (lv === 2) { setPeek(true); setTimeout(() => setPeek(false), 1300); return 'Olhe bem: vou mostrar todas as cartas por um instante!' }
    const left = pairs.findIndex((_, i) => !matched.includes(i))
    if (left >= 0) setMatched((m) => [...m, left])
    return left >= 0 ? `Encontrei um par para você: ${pairs[left].a} = ${pairs[left].b}.` : undefined
  }

  const cols = cards.length <= 8 ? 'grid-cols-4 sm:grid-cols-4' : cards.length <= 12 ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4'
  return (
    <GameShell {...p} progress={[matched.length, pairs.length]} hint={hint}>
      {(api) => {
        apiRef.current = api
        return (
          <div className={`grid ${cols} gap-2`}>
            {cards.map((c) => {
              const up = peek || open.includes(c.id) || matched.includes(c.pair)
              const done = matched.includes(c.pair)
              return (
                <button key={c.id} onClick={() => flip(c, api)} aria-label={up ? c.text : 'Carta virada'}
                  className={`relative grid aspect-[4/5] place-items-center rounded-2xl border p-1.5 text-center text-[13px] font-semibold leading-tight transition sm:text-sm ${up
                    ? c.side === 'a' ? 'border-laranja/60 bg-laranja-suave text-grafite' : 'border-sky-300/60 bg-sky-100 text-grafite'
                    : 'border-white/10 bg-grafite hover:border-laranja/50'} ${done ? 'opacity-80 ring-2 ring-sucesso/60' : ''}`}>
                  {up ? (
                    <span className="flex flex-col items-center gap-1">{c.text}{c.speak && <Volume2 size={16} className="text-laranja" aria-hidden />}</span>
                  ) : <span className="opacity-80"><LumiMark size={30} pageColor="#F8FAFC" /></span>}
                </button>
              )
            })}
          </div>
        )
      }}
    </GameShell>
  )
}

// ─────────────────────────── Ligue os Pares ───────────────────────────
export function MatchGame(p: GameProps) {
  const pairs = useMemo(() => byDifficulty(gamePairs(p.lesson), p.difficulty, { 1: 4, 2: 5, 3: 6 }[p.difficulty]), [p.lesson, p.difficulty])
  const right = useMemo(() => shuffle(pairs.map((_, i) => i)), [pairs])
  const [sel, setSel] = useState<number | null>(null)
  const [links, setLinks] = useState<number[]>([])
  const [shake, setShake] = useState<number | null>(null)
  const missed = useRef(new Set<number>())
  const box = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([])

  useLayoutEffect(() => {
    const draw = () => {
      const root = box.current
      if (!root) return
      const r0 = root.getBoundingClientRect()
      setLines(links.map((i) => {
        const a = root.querySelector(`[data-l="${i}"]`)?.getBoundingClientRect()
        const b = root.querySelector(`[data-r="${i}"]`)?.getBoundingClientRect()
        return a && b ? { x1: a.right - r0.left, y1: a.top + a.height / 2 - r0.top, x2: b.left - r0.left, y2: b.top + b.height / 2 - r0.top } : { x1: 0, y1: 0, x2: 0, y2: 0 }
      }))
    }
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [links])

  const pick = (ri: number, api: GameApi) => {
    if (sel === null || links.includes(ri) || links.includes(sel)) return
    api.move()
    const pr = pairs[sel]
    if (ri === sel) {
      if (!missed.current.has(sel)) api.hit(true, { key: pr.key, label: pr.label, word: pr.speak ? pr.a : undefined })
      const l = [...links, sel]
      setLinks(l)
      setSel(null)
      api.say(l.length === pairs.length ? `Muito bem! Você acertou ${pairs.length - missed.current.size} de ${pairs.length} de primeira! ⭐` : 'Isso! Par ligado. 🔗', 'smile')
      if (l.length === pairs.length) setTimeout(() => api.done(pairs.length), 900)
    } else {
      if (!missed.current.has(sel)) { missed.current.add(sel); api.hit(false, { key: pr.key, label: pr.label, word: pr.speak ? pr.a : undefined }) }
      setShake(ri)
      setTimeout(() => setShake(null), 450)
      api.say(`Ainda não. Dica: o par de “${pr.a}” começa com “${pr.b.slice(0, Math.min(3, pr.b.length))}…”.`, 'look')
    }
  }

  const hint = (lv: 1 | 2 | 3) => {
    const i = sel ?? pairs.findIndex((_, k) => !links.includes(k))
    if (i < 0) return undefined
    const pr: PairItem = pairs[i]
    if (lv === 1) return 'Comece pelos itens de que você tem mais certeza; os que sobrarem ficam mais fáceis.'
    if (lv === 2) return `O par de “${pr.a}” tem ${pr.b.split(/\s+/).length} palavra(s) e começa com “${pr.b[0]}”.`
    setSel(i)
    return `O par de “${pr.a}” é “${pr.b}”. Toque nele para ligar.`
  }

  return (
    <GameShell {...p} progress={[links.length, pairs.length]} hint={hint}>
      {(api) => (
        <div ref={box} className="relative grid grid-cols-2 gap-x-8 gap-y-2 sm:gap-x-14">
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            {lines.map((l, k) => <path key={k} d={`M${l.x1},${l.y1} C${(l.x1 + l.x2) / 2},${l.y1} ${(l.x1 + l.x2) / 2},${l.y2} ${l.x2},${l.y2}`} stroke="#FF8A1F" strokeWidth="2.5" fill="none" style={{ filter: 'drop-shadow(0 0 4px rgba(255,138,31,.7))' }} />)}
          </svg>
          <div className="grid gap-2">
            {pairs.map((pr, i) => (
              <button key={i} data-l={i} onClick={() => { if (!links.includes(i)) { setSel(i); if (pr.speak && canSpeak) void speak(pr.a) } }}
                className={`relative min-h-12 rounded-2xl px-3 py-2 text-left text-sm font-semibold transition ${links.includes(i) ? 'bg-white/90 text-grafite' : sel === i ? 'bg-laranja text-white shadow-[0_0_16px_rgba(255,138,31,.5)]' : 'bg-offwhite text-grafite'}`}>
                {pr.a}
                <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-laranja bg-grafite" />
              </button>
            ))}
          </div>
          <div className="grid gap-2">
            {right.map((i) => (
              <button key={i} data-r={i} onClick={() => pick(i, api)} disabled={links.includes(i)}
                className={`relative min-h-12 rounded-2xl border-2 px-3 py-2 text-left text-sm transition ${links.includes(i) ? 'border-laranja/70 bg-laranja/10' : 'border-white/15 bg-grafite hover:border-laranja/60'} ${shake === i ? 'lumi-shake border-erro/70' : ''}`}>
                <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-laranja bg-grafite" />
                {pairs[i].b}
              </button>
            ))}
          </div>
        </div>
      )}
    </GameShell>
  )
}
