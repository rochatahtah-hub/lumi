import { useMemo, useState } from 'react'
import { byDifficulty, gameWords, gridWord } from '../content'
import { GameShell, type GameApi } from '../GameShell'
import type { GameProps } from './choice'

type Dir = [number, number]
const DIRS: Record<1 | 2 | 3, Dir[]> = {
  1: [[0, 1], [1, 0]], // → ↓
  2: [[0, 1], [1, 0], [1, 1], [-1, 1]], // + diagonais
  3: [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]], // + de trás para frente
}
const SIZE = { 1: 8, 2: 10, 3: 11 } as const
const ALPHA = 'ABCDEFGHIJKLMNOPRSTUVWY' // sem K/Q/X/Z na grade de enchimento: evita falsas palavras chamativas

interface Placed { word: string; show: string; clue: string; cells: number[]; difficulty: 1 | 2 | 3 }

/** monta a grade garantindo que TODAS as palavras listadas estejam lá (as que não couberem ficam de fora da lista) */
function buildGrid(words: { word: string; clue: string; difficulty: 1 | 2 | 3 }[], n: number, dirs: Dir[]) {
  const grid: string[] = Array(n * n).fill('')
  const placed: Placed[] = []
  for (const w of [...words].sort((a, b) => gridWord(b.word).length - gridWord(a.word).length)) {
    const g = gridWord(w.word)
    if (g.length > n) continue
    for (let t = 0; t < 250; t++) {
      const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)]
      const r0 = Math.floor(Math.random() * n), c0 = Math.floor(Math.random() * n)
      const r1 = r0 + dr * (g.length - 1), c1 = c0 + dc * (g.length - 1)
      if (r1 < 0 || r1 >= n || c1 < 0 || c1 >= n) continue
      const cells = [...g].map((_, k) => (r0 + dr * k) * n + (c0 + dc * k))
      if (cells.some((c, k) => grid[c] && grid[c] !== g[k])) continue
      cells.forEach((c, k) => { grid[c] = g[k] })
      placed.push({ word: g, show: w.word, clue: w.clue, cells, difficulty: w.difficulty })
      break
    }
  }
  for (let i = 0; i < grid.length; i++) if (!grid[i]) grid[i] = ALPHA[Math.floor(Math.random() * ALPHA.length)]
  return { grid, placed }
}

export function WordSearchGame(p: GameProps) {
  const n = SIZE[p.difficulty]
  const { grid, placed } = useMemo(() => buildGrid(byDifficulty(gameWords(p.lesson), p.difficulty, { 1: 5, 2: 7, 3: 8 }[p.difficulty]), n, DIRS[p.difficulty]), [p.lesson, p.difficulty, n])
  const [start, setStart] = useState<number | null>(null)
  const [found, setFound] = useState<string[]>([])
  const [flash, setFlash] = useState<number[]>([])
  const [shown, setShown] = useState<number[]>([])

  const line = (a: number, b: number): number[] | null => {
    const [r0, c0, r1, c1] = [Math.floor(a / n), a % n, Math.floor(b / n), b % n]
    const dr = Math.sign(r1 - r0), dc = Math.sign(c1 - c0)
    const len = Math.max(Math.abs(r1 - r0), Math.abs(c1 - c0))
    if (!(r0 === r1 || c0 === c1 || Math.abs(r1 - r0) === Math.abs(c1 - c0))) return null
    return Array.from({ length: len + 1 }, (_, k) => (r0 + dr * k) * n + (c0 + dc * k))
  }

  const tap = (i: number, api: GameApi) => {
    if (start === null) { setStart(i); return }
    if (start === i) { setStart(null); return }
    const cells = line(start, i)
    setStart(null)
    if (!cells) return
    api.move()
    const word = cells.map((c) => grid[c]).join('')
    const hit = placed.find((w) => !found.includes(w.word) && (w.word === word || w.word === [...word].reverse().join('')))
    if (hit) {
      api.hit(true, { word: hit.show })
      const f = [...found, hit.word]
      setFound(f)
      api.say(`Você achou “${hit.show}”! (${hit.clue}) 🎉`, 'smile')
      if (f.length === placed.length) setTimeout(() => api.done(placed.length), 800)
    } else {
      setFlash(cells)
      setTimeout(() => setFlash([]), 500)
      api.say('Essa sequência não forma uma das palavras. Tente outra direção!', 'look')
    }
  }

  const foundCells = new Set(placed.filter((w) => found.includes(w.word)).flatMap((w) => w.cells))
  const hint = (lv: 1 | 2 | 3) => {
    const w = placed.find((x) => !found.includes(x.word))
    if (!w) return undefined
    if (lv === 1) return `Procure uma palavra que significa “${w.clue}”.`
    setShown((s) => [...s, w.cells[0]])
    if (lv === 2) return `A palavra “${w.show}” começa na letra destacada.`
    setShown((s) => [...s, w.cells[1], w.cells[w.cells.length - 1]])
    return `Destaquei o começo e o fim de “${w.show}”.`
  }

  return (
    <GameShell {...p} progress={[found.length, placed.length]} hint={hint}>
      {(api) => (
        <>
          <div className="mx-auto grid max-w-md select-none gap-[3px]" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {grid.map((ch, i) => (
              <button key={i} onClick={() => tap(i, api)} aria-label={`Letra ${ch}`}
                className={`grid aspect-square place-items-center rounded-md text-[13px] font-bold transition sm:text-base ${foundCells.has(i) ? 'bg-laranja/80 text-white' : start === i ? 'bg-laranja text-white' : flash.includes(i) ? 'bg-erro/40' : shown.includes(i) ? 'bg-sky-400/40' : 'bg-white/5 text-offwhite/90 hover:bg-white/15'}`}>
                {ch}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-offwhite/80">Palavras para encontrar:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {placed.map((w) => (
              <span key={w.word} className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${found.includes(w.word) ? 'border-laranja bg-laranja/20 text-laranja-claro line-through' : 'border-white/20'}`}>{w.show}</span>
            ))}
          </div>
        </>
      )}
    </GameShell>
  )
}
