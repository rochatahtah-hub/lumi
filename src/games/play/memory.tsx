import { useEffect, useRef, useState } from 'react'
import type { Lesson } from '../../types'
import { shuffle } from '../../lib/text'
import { GameShell, type GameApi } from '../GameShell'
import type { GameProps } from './choice'

interface Card {
  id: number
  front: string
  back: string
  matched: boolean
}

export function MemoryGame(p: GameProps) {
  const difficulty = { 1: 4, 2: 6, 3: 8 }[p.difficulty] || 4
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const apiRef = useRef<GameApi | null>(null)

  useEffect(() => {
    const pairs = p.lesson.questions?.slice(0, difficulty) || []
    const cardList: Card[] = []
    pairs.forEach((q, idx) => {
      const back = q.type === 'mc' ? (q.options?.[q.answer] || q.prompt) : q.prompt
      cardList.push({ id: idx * 2, front: '?', back: q.prompt, matched: false })
      cardList.push({ id: idx * 2 + 1, front: '?', back, matched: false })
    })
    setCards(shuffle(cardList))
  }, [p.lesson, difficulty])

  const handleFlip = (idx: number, api: GameApi) => {
    if (flipped.includes(idx) || cards[idx].matched) return
    const newFlipped = [...flipped, idx]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [a, b] = newFlipped
        if (cards[a].back === cards[b].back) {
          api.hit(true)
          api.say('✅ Par encontrado!', 'smile')
          const newCards = cards.map((c, i) => i === a || i === b ? { ...c, matched: true } : c)
          setCards(newCards)
          const newMatches = matches + 1
          setMatches(newMatches)
          if (newMatches === difficulty) {
            setTimeout(() => api.say(`🎉 Todos os pares! +${difficulty * 50} pontos!`, 'medium'), 500)
          }
        } else {
          api.hit(false)
          api.say('❌ Não combina. Tente novamente!', 'look')
          setMistakes(mistakes + 1)
        }
        setFlipped([])
      }, 800)
    }
  }

  const done = matches === difficulty

  return (
    <GameShell {...p} progress={[matches, difficulty]}>
      {(api) => {
        apiRef.current = api
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-offwhite/70">
              <span>Pares encontrados: {matches}/{difficulty}</span>
              <span>Erros: {mistakes}</span>
            </div>

            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.ceil(difficulty * 2 / 3)}, 1fr)` }}>
              {cards.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFlip(idx, api)}
                  disabled={card.matched || flipped.includes(idx)}
                  className={`aspect-square rounded-lg font-bold text-sm transition-all transform ${
                    card.matched
                      ? 'bg-verde/30 border border-verde/50 scale-95'
                      : flipped.includes(idx)
                        ? 'bg-laranja/60 text-offwhite border-2 border-laranja'
                        : 'bg-white/10 border-2 border-white/30 hover:scale-105 hover:border-laranja/50'
                  }`}
                >
                  {flipped.includes(idx) || card.matched ? card.back.slice(0, 15) : '?'}
                </button>
              ))}
            </div>

            {done && (
              <div className="text-center space-y-3 py-4 px-4 rounded-2xl bg-gradient-to-br from-verde/30 to-green-400/20 border-2 border-verde/50">
                <p className="text-4xl animate-bounce">🎊</p>
                <div>
                  <p className="text-lg font-bold text-verde">Excelente memória!</p>
                  <p className="text-xs text-offwhite/70">⭐ +{difficulty * 50} pontos!</p>
                </div>
              </div>
            )}
          </div>
        )
      }}
    </GameShell>
  )
}
