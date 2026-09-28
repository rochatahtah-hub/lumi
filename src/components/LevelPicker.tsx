import { useState } from 'react'
import { LEVELS, levelFromAge } from '../content/subjects'
import type { LevelId } from '../types'
import { Button } from './ui'

/** "Para eu adaptar a explicação: qual é sua idade ou série?" — só pede o necessário, nada de dados pessoais */
export function LevelPicker({ onPick, current }: { onPick: (level: LevelId, age?: number) => void; current?: LevelId }) {
  const [other, setOther] = useState(false)
  const [age, setAge] = useState('')
  const ageNum = Number(age)
  const validAge = Number.isInteger(ageNum) && ageNum >= 5 && ageNum <= 99

  return (
    <div className="animate-rise">
      <p className="text-cinza-texto">Para eu adaptar a explicação:</p>
      <h2 className="mt-1 text-xl font-semibold">Qual é sua idade ou série?</h2>
      <div className="mt-5 grid gap-3">
        {LEVELS.map((l) => (
          <button
            key={l.id}
            onClick={() => onPick(l.id)}
            className={`flex min-h-16 items-center justify-between rounded-2xl border-2 bg-white px-5 text-left transition hover:border-laranja ${current === l.id ? 'border-laranja' : 'border-cinza'}`}
          >
            <span>
              <span className="block font-semibold">{l.label}</span>
              <span className="block text-sm text-cinza-texto">{l.hint}</span>
            </span>
            {current === l.id && <span className="text-sm font-medium text-laranja">atual</span>}
          </button>
        ))}
        <button onClick={() => setOther((v) => !v)} className="flex min-h-16 items-center rounded-2xl border-2 border-cinza bg-white px-5 text-left font-semibold hover:border-laranja">
          Outra / prefiro dizer minha idade
        </button>
        {other && (
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (validAge) onPick(levelFromAge(ageNum), ageNum)
            }}
          >
            <input
              type="number" inputMode="numeric" min={5} max={99} value={age} onChange={(e) => setAge(e.target.value)} placeholder="Sua idade"
              className="min-h-12 flex-1 rounded-2xl border-2 border-cinza bg-white px-4 outline-none focus:border-laranja" aria-label="Sua idade" autoFocus
            />
            <Button disabled={!validAge}>Continuar</Button>
          </form>
        )}
      </div>
      <p className="mt-4 text-xs text-cinza-texto">Usamos isso só para ajustar a linguagem e os exercícios. Você pode mudar quando quiser em "Mais".</p>
    </div>
  )
}
