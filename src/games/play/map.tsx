import { useEffect, useMemo, useState } from 'react'
import type { GameMap, MapId, MapTarget } from '../../types'
import { shuffle } from '../../lib/text'
import { byDifficulty } from '../content'
import { ConfirmButton, GameShell, OptionButton, PRAISE, poseFor, type GameApi } from '../GameShell'
import type { GameProps } from './choice'

export interface MapData { viewBox: string; regions: { id: string; name: string; d: string }[] }
const cache = new Map<MapId, MapData>()
/** mapas gerados de dados reais (scripts/build-maps.mjs), carregados só quando o jogo abre */
export async function loadMap(id: MapId): Promise<MapData> {
  if (!cache.has(id)) {
    const mod = await ({
      mundo: () => import('../maps/mundo.json'), europa: () => import('../maps/europa.json'),
      'america-sul': () => import('../maps/america-sul.json'), brasil: () => import('../maps/brasil.json'),
    }[id])()
    cache.set(id, (mod as { default: MapData }).default)
  }
  return cache.get(id)!
}
export function useMap(id?: MapId) {
  const [data, setData] = useState<MapData | null>(id ? cache.get(id) ?? null : null)
  useEffect(() => { if (id) void loadMap(id).then(setData) }, [id])
  return data
}

/** ids das regiões que um alvo representa (um país/estado, ou um grupo, como "Nordeste") */
export const regionsOf = (m: GameMap, t: MapTarget) => m.groups?.[t.id] ?? [t.id]

export function MapGame(p: GameProps) {
  const m = p.lesson.games!.map!
  const data = useMap(m.map)
  const rounds = useMemo(() => byDifficulty(m.targets, p.difficulty, 5), [m, p.difficulty])
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [wrongTap, setWrongTap] = useState<string | null>(null)
  const [missed, setMissed] = useState(false)
  const [solved, setSolved] = useState(false)
  const t = rounds[i]
  const mode = p.difficulty === 1 ? 'options' : 'tap'
  const options = useMemo(() => t && shuffle([t.label, ...shuffle(m.targets.filter((x) => x.id !== t.id).map((x) => x.label)).slice(0, 3)]), [t, m])
  if (!t) return null
  const targetIds = new Set(regionsOf(m, t))
  const ask = mode === 'options' ? 'Que lugar está destacado no mapa?' : p.difficulty === 3 && t.clue ? `Toque no mapa: ${t.clue}` : `Toque no mapa: ${t.label}`

  const right = (api: GameApi) => {
    if (!missed) api.hit(true, { word: p.lesson.subject === 'ingles' ? t.label : undefined })
    setSolved(true)
    api.say(`${PRAISE[t.difficulty]}\nEsse é ${t.label}${t.clue && p.difficulty < 3 ? ` — ${t.clue}` : ''}.`, poseFor(t.difficulty))
  }
  const wrong = (api: GameApi, text: string) => {
    if (!missed) { api.hit(false); setMissed(true) }
    api.say(text, 'look')
  }
  const tapRegion = (id: string, api: GameApi) => {
    if (mode !== 'tap' || solved) return
    api.move()
    if (targetIds.has(id)) return right(api)
    setWrongTap(id)
    setTimeout(() => setWrongTap(null), 900)
    const other = m.targets.find((x) => regionsOf(m, x).includes(id))
    wrong(api, other ? `Esse é ${other.label}. Procure ${t.label}${t.clue ? ` (${t.clue})` : ''}.` : `Ainda não é aí. ${t.clue ? `Dica: ${t.clue}.` : 'Use a dica se precisar.'}`)
  }
  const confirm = (api: GameApi) => {
    if (picked === null || !options) return
    api.move()
    if (options[picked] === t.label) right(api)
    else { wrong(api, `Não é ${options[picked]}. Observe a posição e o formato no mapa.${t.clue ? ` Dica: ${t.clue}.` : ''}`); setPicked(null) }
  }
  const next = (api: GameApi) => {
    if (i + 1 >= rounds.length) return api.done(rounds.length)
    setI(i + 1); setPicked(null); setMissed(false); setSolved(false)
  }
  const hint = (lv: 1 | 2 | 3) => lv === 1 ? (t.clue ?? 'Pense no continente e nos vizinhos desse lugar.') : lv === 2 ? `Tem ${t.label.length} letras e começa com “${t.label[0]}”.` : `A resposta é ${t.label}.`

  return (
    <GameShell {...p} progress={[i + 1, rounds.length]} hint={hint}>
      {(api) => (
        <div className="animate-rise">
          <p className="text-lg font-medium">{m.prompt}</p>
          <p className="mt-1 text-sm font-semibold text-laranja-claro">{ask}</p>
          <div className={`mt-3 ${mode === 'options' ? 'grid gap-3 sm:grid-cols-[1fr_200px]' : ''}`}>
            <div className="overflow-hidden rounded-2xl bg-[#16202b]">
              {!data ? <p className="p-10 text-center text-sm text-offwhite/60">Carregando o mapa…</p> : (
                <svg viewBox={data.viewBox} className="block h-auto w-full" role="img" aria-label="Mapa">
                  {data.regions.map((r) => {
                    const isT = targetIds.has(r.id)
                    const lit = (mode === 'options' && isT) || (solved && isT)
                    return <path key={r.id} d={r.d} onClick={() => tapRegion(r.id, api)}
                      fill={lit ? '#FF8A1F' : wrongTap === r.id ? '#E5484D' : '#3A4A5E'} stroke="#16202b" strokeWidth={0.7}
                      className={mode === 'tap' && !solved ? 'cursor-pointer transition-colors hover:fill-[#56708f]' : ''} style={lit ? { filter: 'drop-shadow(0 0 6px rgba(255,138,31,.8))' } : undefined} />
                  })}
                </svg>
              )}
            </div>
            {mode === 'options' && options && (
              <div className="grid content-start gap-2">
                {options.map((o, k) => <OptionButton key={o} text={o} disabled={solved} state={solved && o === t.label ? 'right' : picked === k ? 'selected' : 'idle'} onClick={() => setPicked(k)} />)}
              </div>
            )}
          </div>
          {solved ? <ConfirmButton onClick={() => next(api)}>{i + 1 >= rounds.length ? 'Ver resultado' : 'Continuar'}</ConfirmButton>
            : mode === 'options' ? <ConfirmButton onClick={() => confirm(api)} disabled={picked === null}>Confirmar</ConfirmButton> : null}
        </div>
      )}
    </GameShell>
  )
}
