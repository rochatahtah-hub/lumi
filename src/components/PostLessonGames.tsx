import { Link } from 'react-router-dom'
import type { Lesson } from '../types'
import { GAMES } from '../games/registry'

export function PostLessonGames({ lesson }: { lesson: Lesson }) {
  const availableGames = GAMES.filter(g => (lesson.games as any)?.[g.id] || g.id === 'quiz')

  if (availableGames.length === 0) return null

  return (
    <div className="mt-6 space-y-3 p-4 rounded-2xl bg-laranja/10 border border-laranja/30">
      <div className="flex items-center gap-2">
        <span className="text-xl">🎮</span>
        <p className="font-semibold text-offwhite">Quer revisar brincando?</p>
      </div>
      <p className="text-xs text-offwhite/70 mb-3">Escolha um jogo para consolidar o aprendizado:</p>

      <div className="grid grid-cols-2 gap-2">
        {availableGames.slice(0, 4).map(game => (
          <Link
            key={game.id}
            to={`/jogar/${game.id}?aula=${lesson.id}`}
            className="p-3 rounded-lg bg-laranja/20 border border-laranja/40 hover:bg-laranja/30 transition text-center text-sm font-semibold text-offwhite"
          >
            <p className="text-lg mb-1">{game.emoji}</p>
            <p className="text-xs">{game.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
