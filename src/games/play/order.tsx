import { useMemo, useState } from 'react'
import { GripVertical } from 'lucide-react'
import { shuffle } from '../../lib/text'
import { byDifficulty, gameSequences } from '../content'
import { ConfirmButton, GameShell, PRAISE, poseFor, type GameApi } from '../GameShell'
import type { GameProps } from './choice'

/** embaralha garantindo que não comece já na ordem certa */
function scramble<T>(items: T[]): T[] {
  if (items.length < 2) return items
  let s = shuffle(items)
  for (let t = 0; t < 10 && s.every((x, i) => x === items[i]); t++) s = shuffle(items)
  return s
}

export function OrderGame(p: GameProps) {
  const rounds = useMemo(() => byDifficulty(gameSequences(p.lesson), p.difficulty, 3), [p.lesson, p.difficulty])
  const [r, setR] = useState(0)
  const seq = rounds[r]
  const [order, setOrder] = useState<string[]>(() => scramble(seq?.items ?? []))
  const [pool, setPool] = useState<string[]>(() => scramble(seq?.items ?? []))
  const [built, setBuilt] = useState<string[]>([])
  const [sel, setSel] = useState<number | null>(null)
  const [checked, setChecked] = useState<boolean[] | null>(null)
  const [tries, setTries] = useState(0)
  const [solved, setSolved] = useState(false)
  if (!seq) return null
  const words = !!seq.words

  const reset = (next: number) => {
    const s = rounds[next]
    setR(next); setOrder(scramble(s.items)); setPool(scramble(s.items)); setBuilt([]); setSel(null); setChecked(null); setTries(0); setSolved(false)
  }

  const tapItem = (i: number, api: GameApi) => {
    if (solved) return
    setChecked(null)
    if (sel === null) { setSel(i); return }
    if (sel !== i) {
      const o = [...order];
      [o[sel], o[i]] = [o[i], o[sel]]
      setOrder(o)
      api.move()
    }
    setSel(null)
  }

  const confirm = (api: GameApi) => {
    const attempt = words ? built : order
    const marks = attempt.map((x, i) => x === seq.items[i])
    setChecked(marks)
    setTries(tries + 1)
    api.move()
    if (marks.every(Boolean) && attempt.length === seq.items.length) {
      if (tries === 0) api.hit(true, { key: seq.key, label: seq.label })
      setSolved(true)
      api.say(`${PRAISE[seq.difficulty]}\n${seq.explanation}`, poseFor(seq.difficulty))
    } else {
      if (tries === 0) api.hit(false, { key: seq.key, label: seq.label })
      const ok = marks.filter(Boolean).length
      api.say(tries >= 1 ? `Quase lá! ${ok} de ${seq.items.length} estão no lugar certo (em verde). Troque os outros.` : 'Quase lá! Os itens em verde já estão no lugar certo. Coloque os outros na ordem correta.', 'look')
    }
  }

  const hint = (lv: 1 | 2 | 3) => {
    if (lv === 1) return words ? 'Em inglês, a ordem mais comum é: sujeito + verbo + complemento.' : 'Pense no que precisa acontecer antes de cada etapa.'
    if (lv === 2) return `O primeiro item é: “${seq.items[0]}”.`
    return `Os dois últimos são: “${seq.items.at(-2)}” e “${seq.items.at(-1)}”.`
  }

  const nextRound = (api: GameApi) => (r + 1 >= rounds.length ? api.done(rounds.length) : (reset(r + 1), api.say('Mais uma sequência!', 'smile')))

  return (
    <GameShell {...p} progress={[r + 1, rounds.length]} hint={hint}>
      {(api) => (
        <div key={r} className="animate-rise">
          <p className="text-lg font-medium">{seq.prompt}</p>
          {words ? (
            <>
              <div className="mt-4 flex min-h-16 flex-wrap gap-2 rounded-2xl border-2 border-dashed border-white/20 p-2">
                {built.length === 0 && <span className="self-center px-1 text-sm text-offwhite/50">Toque nas palavras abaixo para montar a frase</span>}
                {built.map((w, i) => (
                  <button key={`${w}${i}`} onClick={() => { if (solved) return; setBuilt(built.filter((_, k) => k !== i)); setPool([...pool, w]); setChecked(null) }}
                    className={`rounded-xl px-3 py-2 text-[15px] font-semibold ${checked ? (checked[i] ? 'bg-sucesso/30' : 'bg-laranja/30') : 'bg-offwhite text-grafite'}`}>{w}</button>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {pool.map((w, i) => (
                  <button key={`${w}${i}`} onClick={() => { setPool(pool.filter((_, k) => k !== i)); setBuilt([...built, w]); api.move(); setChecked(null) }}
                    className="rounded-xl border border-white/20 bg-grafite px-3 py-2 text-[15px] font-semibold hover:border-laranja/60">{w}</button>
                ))}
              </div>
            </>
          ) : (
            <ol className="mt-4 grid gap-2">
              {order.map((it, i) => (
                <li key={it}>
                  <button onClick={() => tapItem(i, api)}
                    className={`flex min-h-13 w-full items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-left text-[15px] transition ${sel === i ? 'border-laranja bg-laranja/15' : checked ? (checked[i] ? 'border-sucesso bg-sucesso/15' : 'border-laranja/40 bg-grafite') : 'border-white/10 bg-grafite hover:border-laranja/50'}`}>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${sel === i ? 'bg-laranja text-white' : 'bg-white/10'}`}>{i + 1}</span>
                    <span className="flex-1">{it}</span>
                    <GripVertical size={18} className="text-offwhite/40" aria-hidden />
                  </button>
                </li>
              ))}
            </ol>
          )}
          {solved
            ? <ConfirmButton onClick={() => nextRound(api)}>{r + 1 >= rounds.length ? 'Ver resultado' : 'Continuar'}</ConfirmButton>
            : <ConfirmButton onClick={() => confirm(api)} disabled={words && pool.length > 0}>Confirmar</ConfirmButton>}
        </div>
      )}
    </GameShell>
  )
}
