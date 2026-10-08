import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lesson } from '../../types'
import { shuffle } from '../../lib/text'
import { GameShell, type GameApi } from '../GameShell'
import type { GameProps } from './choice'
import { loadMap, regionsOf } from './map'

// Encaixe automático: distância máxima (em pixels) para snap
const SNAP_DISTANCE = 45

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
function wrap(text: string, max: number, lines = 3): string[] {
  const out: string[] = []
  let cur = ''
  for (const w of text.split(/\s+/)) {
    if ((cur + ' ' + w).trim().length > max) { out.push(cur.trim()); cur = w } else cur += ' ' + w
  }
  if (cur.trim()) out.push(cur.trim())
  if (out.length > lines) { out.length = lines; out[lines - 1] += '…' }
  return out
}
const toUrl = (svg: string) => `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`

/** cartaz do conteúdo: título + vocabulário (Inglês) ou pontos-chave da revisão, no visual do LUMI */
export function posterSvg(l: Lesson): string {
  const vocab = (l.english?.vocabulary ?? []).slice(0, 4).map((v) => [v.word, v.translation])
  const items = vocab.length >= 3 ? vocab : l.review.slice(0, 4).map((r) => [r, ''])
  const title = wrap(l.title, 22, 2)
  const cards = items.map(([a, b], k) => {
    const y = 250 + k * 84
    const lines = wrap(a, b ? 24 : 40, b ? 1 : 2)
    return `<rect x="50" y="${y}" width="500" height="70" rx="18" fill="#252F3D" stroke="#FF8A1F" stroke-opacity=".45"/>
      <circle cx="84" cy="${y + 35}" r="13" fill="#FF8A1F"/><text x="84" y="${y + 41}" font-size="16" font-weight="700" text-anchor="middle" fill="#fff">${k + 1}</text>
      ${lines.map((t, j) => `<text x="110" y="${y + (lines.length > 1 ? 30 + j * 24 : 43)}" font-size="${b ? 24 : 19}" font-weight="700" fill="#F8FAFC">${esc(t)}</text>`).join('')}
      ${b ? `<text x="530" y="${y + 43}" font-size="19" text-anchor="end" fill="#FFB347">${esc(b)}</text>` : ''}`
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" font-family="Poppins, Arial, sans-serif">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B2430"/><stop offset="1" stop-color="#2E3B4E"/></linearGradient>
    <radialGradient id="s" cx=".85" cy=".1" r=".5"><stop offset="0" stop-color="#FF8A1F" stop-opacity=".45"/><stop offset="1" stop-color="#FF8A1F" stop-opacity="0"/></radialGradient></defs>
    <rect width="600" height="600" fill="url(#g)"/><rect width="600" height="600" fill="url(#s)"/>
    <g stroke="#FF8A1F" stroke-width="6" stroke-linecap="round" transform="translate(470 40) scale(.9)"><line x1="50" y1="8" x2="50" y2="20"/><line x1="24" y1="18" x2="31" y2="27"/><line x1="76" y1="18" x2="69" y2="27"/></g>
    <path d="M500 88a20 20 0 0 1 36 0z" fill="#FF8A1F"/>
    <text x="50" y="80" font-size="20" font-weight="600" fill="#FFB347">LUMI · ${esc(l.english?.cefr ?? l.grade ?? '')}</text>
    ${title.map((t, i) => `<text x="50" y="${140 + i * 50}" font-size="42" font-weight="800" fill="#F8FAFC">${esc(t)}</text>`).join('')}
    ${cards}
  </svg>`
}

async function mapSvg(l: Lesson): Promise<{ svg: string; ratio: string }> {
  const m = l.games!.map!
  const data = await loadMap(m.map)
  const lit = new Set(m.targets.slice(0, 6).flatMap((t) => regionsOf(m, t)))
  const [, , w, h] = data.viewBox.split(' ')
  return { ratio: `${w} / ${h}`, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${data.viewBox}"><rect width="100%" height="100%" fill="#16202b"/>${data.regions.map((r) => `<path d="${r.d}" fill="${lit.has(r.id) ? '#FF8A1F' : '#3A4A5E'}" stroke="#16202b" stroke-width=".7"/>`).join('')}</svg>` }
}

export function PuzzleGame(p: GameProps) {
  // Dificuldade inteligente: fácil tem menos peças
  const n = { 1: 2, 2: 3, 3: 4 }[p.difficulty]
  const [img, setImg] = useState<string | null>(null)
  const [ratio, setRatio] = useState('1 / 1')
  useEffect(() => {
    if (p.lesson.games?.map) void mapSvg(p.lesson).then((m) => { setImg(toUrl(m.svg)); setRatio(m.ratio) })
    else setImg(toUrl(posterSvg(p.lesson)))
  }, [p.lesson])
  const tray = useMemo(() => shuffle(Array.from({ length: n * n }, (_, i) => i)), [n])
  const [placed, setPlaced] = useState<(number | null)[]>(() => Array(n * n).fill(null))
  const [sel, setSel] = useState<number | null>(null)
  const [draggedPiece, setDraggedPiece] = useState<{ k: number; x: number; y: number } | null>(null)
  const [ghost, setGhost] = useState(false)
  const [bad, setBad] = useState<number | null>(null)
  const [useDragMode, setUseDragMode] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const done = placed.every((x) => x !== null)
  const apiRef = useRef<GameApi | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (done) { const t = setTimeout(() => apiRef.current?.done(n * n), 2000); return () => clearTimeout(t) } }, [done, n])

  const piece = (k: number) => ({ backgroundImage: img ?? undefined, backgroundSize: `${n * 100}% ${n * 100}%`, backgroundPosition: `${((k % n) / (n - 1)) * 100}% ${(Math.floor(k / n) / (n - 1)) * 100}%` })

  const drop = (slot: number, api: GameApi) => {
    if (sel === null || placed[slot] !== null) return
    api.move()
    if (sel === slot) {
      api.hit(true)
      const pl = [...placed]; pl[slot] = sel
      setPlaced(pl); setSel(null)
      const left = pl.filter((x) => x === null).length
      // Mensagens contextuais
      if (left === 0) {
        api.say('🎉 Perfeito! Você montou tudo!', 'medium')
      } else if (left <= 2) {
        api.say('Quase lá! Só faltam ' + left + '! 🎯', 'smile')
      } else {
        api.say('Excelente! Peça encaixada. 🧩', 'smile')
      }
    } else {
      api.hit(false)
      setBad(slot); setTimeout(() => setBad(null), 450)
      api.say('Essa peça não combina aqui. Veja as bordas! ❌', 'look')
    }
  }

  const handleDragStart = (e: React.DragEvent, k: number) => {
    if (!useDragMode) return
    e.dataTransfer!.effectAllowed = 'move'
    setDraggedPiece({ k, x: e.clientX, y: e.clientY })
  }

  const handleDragOver = (e: React.DragEvent) => {
    if (!useDragMode) return
    e.preventDefault()
    e.dataTransfer!.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, slot: number, api: GameApi) => {
    if (!useDragMode || !draggedPiece) return
    e.preventDefault()
    setDraggedPiece(null)
    drop(slot, api)
  }

  const hint = (lv: 1 | 2 | 3) => {
    if (lv === 1) return 'Comece pelos cantos! Eles têm um lado reto.'
    if (lv === 2) { setShowPreview(true); setTimeout(() => setShowPreview(false), 3000); return 'Olha só! A imagem apareceu.' }
    const k = placed.findIndex((x) => x === null)
    if (k >= 0) { const pl = [...placed]; pl[k] = k; setPlaced(pl) }
    return 'Pronto! Coloquei uma peça. 😉'
  }

  const totalPieces = n * n
  const placedCount = placed.filter((x) => x !== null).length
  const progressPercent = (placedCount / totalPieces) * 100

  return (
    <GameShell {...p} progress={[placedCount, totalPieces]} hint={hint}>
      {(api) => { apiRef.current = api; return !img ? <p className="py-10 text-center text-sm text-offwhite/60">Preparando…</p> : (
        <div className="space-y-4">
          {/* Barra de progresso */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs text-offwhite/70">
              <span>Progresso</span>
              <span>{placedCount} de {totalPieces}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-laranja to-orange-400 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Botões de controle */}
          <div className="flex gap-2 flex-wrap justify-center">
            <button onClick={() => { setShowPreview(true); setTimeout(() => setShowPreview(false), 2500) }} className="text-xs px-3 py-1 rounded-full border border-white/20 hover:bg-laranja/30 transition font-semibold text-offwhite/90">
              👀 Ver Imagem (3s)
            </button>
            {p.difficulty > 1 && (
              <button onClick={() => setUseDragMode(!useDragMode)} className="text-xs px-3 py-1 rounded-full border border-white/20 hover:bg-laranja/20 transition font-semibold text-offwhite/90">
                {useDragMode ? '✋ Toque' : '🖱️ Arrasto'}
              </button>
            )}
          </div>
          {/* Instrução */}
          <p className="text-xs text-center text-offwhite/60">{useDragMode ? '⬆️ Arrasta a peça para encaixar' : '👉 Toque na peça depois no lugar'}</p>

          {/* Tabuleiro */}
          <div ref={boardRef} className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-laranja/30 bg-white/5" style={{ aspectRatio: ratio }}>
            {/* Preview/Ghost image */}
            {(showPreview || done) && (
              <div className="absolute inset-0 transition-opacity" style={{ backgroundImage: img, backgroundSize: '100% 100%', opacity: done ? 1 : 0.25 }} />
            )}

            {/* Grid de slots */}
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
              {placed.map((k, slot) => (
                <button
                  key={slot}
                  onClick={() => !useDragMode && drop(slot, api)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, slot, api)}
                  aria-label={`Espaço ${slot + 1}`}
                  className={`border-2 transition-all ${k === null ? `border-white/20 ${sel !== null && useDragMode ? 'bg-laranja/20 shadow-[inset_0_0_8px_rgba(255,138,31,0.3)]' : 'bg-white/5'}` : 'border-laranja/60 shadow-[inset_0_0_10px_rgba(255,138,31,0.2)]'} ${bad === slot ? 'bg-erro/40 scale-95 border-erro' : ''}`}
                  style={k !== null && !done ? piece(k) : undefined}
                />
              ))}
            </div>
          </div>

          {/* Tray de peças */}
          {!done && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center px-2">
                <p className="text-xs text-offwhite/60 font-semibold">🧩 Peças ({tray.filter((k) => !placed.includes(k)).length})</p>
                <p className="text-xs text-offwhite/50">{placedCount} de {totalPieces}</p>
              </div>
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(n + 1, 5)}, minmax(0, 1fr))` }}>
                {tray.filter((k) => !placed.includes(k)).map((k) => (
                  <button
                    key={k}
                    draggable={useDragMode}
                    onDragStart={(e) => handleDragStart(e, k)}
                    onClick={() => !useDragMode && setSel(sel === k ? null : k)}
                    aria-label="Peça"
                    style={{ ...piece(k), aspectRatio: ratio }}
                    className={`rounded-lg border-2 transition transform cursor-grab active:cursor-grabbing ${
                      sel === k && !useDragMode ? 'scale-110 border-laranja shadow-[0_0_14px_rgba(255,138,31,.6)] ring-2 ring-laranja/40' : 'border-white/30 hover:scale-105 hover:border-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Comemoração */}
          {done && (
            <div className="text-center space-y-3 py-6 px-4 rounded-2xl bg-gradient-to-br from-laranja/20 to-orange-400/10 border border-laranja/30">
              <p className="text-3xl animate-bounce">🎉</p>
              <div>
                <p className="text-lg font-bold text-laranja">Perfeito! Você montou tudo!</p>
                <p className="text-xs text-offwhite/70 mt-1">{p.lesson.summary}</p>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-offwhite/80 font-semibold mb-2">📚 Pergunta rápida:</p>
                <p className="text-sm text-offwhite">{p.lesson.blocks?.[0]?.title || 'Parabéns por completar!'}</p>
              </div>
              <p className="text-lg pt-2">⭐ +{n * n * 10} pontos</p>
            </div>
          )}
        </div>
      ) }}
    </GameShell>
  )
}
