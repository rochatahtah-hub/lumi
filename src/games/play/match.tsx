import { useEffect, useRef, useState } from 'react'
import type { Lesson } from '../../types'
import { shuffle } from '../../lib/text'
import { GameShell, type GameApi } from '../GameShell'
import type { GameProps } from './choice'

interface Pair {
  id: number
  left: string
  right: string
  matched: boolean
}

export function MatchGame(p: GameProps) {
  const difficulty = { 1: 3, 2: 5, 3: 7 }[p.difficulty] || 3
  const [pairs, setPairs] = useState<Pair[]>([])
  const [selected, setSelected] = useState<{ side: 'left' | 'right'; id: number } | null>(null)
  const [matches, setMatches] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const apiRef = useRef<GameApi | null>(null)

  useEffect(() => {
    const questions = p.lesson.questions?.slice(0, difficulty) || []
    const pairList: Pair[] = questions.map((q, idx) => {
      const right = q.type === 'mc' ? (q.options?.[q.answer] || q.prompt) : q.prompt
      return { id: idx, left: q.prompt, right, matched: false }
    })

    setPairs(shuffle(pairList))
  }, [p.lesson, difficulty])

  const handleSelect = (side: 'left' | 'right', id: number, api: GameApi) => {
    if (pairs[id].matched) return

    if (!selected) {
      setSelected({ side, id })
      return
    }

    if (selected.side === side) {
      setSelected({ side, id })
      return
    }

    // Verificar se é par correto
    if (selected.id === id && selected.side !== side) {
      api.hit(true)
      api.say('✅ Correto! Par encontrado!', 'smile')
      const newPairs = pairs.map((p) => p.id === id ? { ...p, matched: true } : p)
      setPairs(newPairs)
      const newMatches = matches + 1
      setMatches(newMatches)
      if (newMatches === difficulty) {
        setTimeout(() => api.say(`🎉 Todos os pares! +${difficulty * 60} pontos!`, 'medium'), 500)
      }
    } else {
      api.hit(false)
      api.say('❌ Não combina. Tente novamente!', 'look')
      setMistakes(mistakes + 1)
    }
    setSelected(null)
  }

  const done = matches === difficulty
  const leftPairs = pairs.filter((p) => !p.matched)
  const rightPairs = shuffle([...pairs.filter((p) => !p.matched)])

  return (
    <GameShell {...p} progress={[matches, difficulty]}>
      {(api) => {
        apiRef.current = api
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-offwhite/70">
              <span>Pares: {matches}/{difficulty}</span>
              <span>Erros: {mistakes}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Lado esquerdo */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-offwhite/60">Conceitos</p>
                {pairs.map((pair, idx) => (
                  !pair.matched && (
                    <button
                      key={`left-${idx}`}
                      onClick={() => handleSelect('left', pair.id, api)}
                      className={`w-full p-2 rounded-lg text-xs font-medium text-center transition-all ${
                        selected?.side === 'left' && selected?.id === pair.id
                          ? 'bg-laranja/70 text-white border-2 border-laranja ring-2 ring-laranja/40'
                          : 'bg-white/10 text-offwhite hover:bg-white/20 border border-white/30'
                      }`}
                    >
                      {pair.left.slice(0, 25)}
                    </button>
                  )
                ))}
              </div>

              {/* Lado direito */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-offwhite/60">Definições</p>
                {rightPairs.map((pair, idx) => (
                  !pair.matched && (
                    <button
                      key={`right-${idx}`}
                      onClick={() => handleSelect('right', pair.id, api)}
                      className={`w-full p-2 rounded-lg text-xs font-medium text-center transition-all ${
                        selected?.side === 'right' && selected?.id === pair.id
                          ? 'bg-verde/70 text-white border-2 border-verde ring-2 ring-verde/40'
                          : 'bg-white/10 text-offwhite hover:bg-white/20 border border-white/30'
                      }`}
                    >
                      {pair.right.slice(0, 25)}
                    </button>
                  )
                ))}
              </div>
            </div>

            {done && (
              <div className="text-center space-y-3 py-4 px-4 rounded-2xl bg-gradient-to-br from-azul/30 to-blue-400/20 border-2 border-azul/50">
                <p className="text-4xl animate-bounce">🎊</p>
                <div>
                  <p className="text-lg font-bold text-azul">Excelente associação!</p>
                  <p className="text-xs text-offwhite/70">⭐ +{difficulty * 60} pontos!</p>
                </div>
              </div>
            )}
          </div>
        )
      }}
    </GameShell>
  )
}
