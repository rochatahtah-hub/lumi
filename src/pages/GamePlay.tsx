import { setSpeechLocale } from '../lib/speech'
import { localeOfSubject } from '../content/languages'
import { useState, type ComponentType } from 'react'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { SubjectIcon } from '../components/SubjectIcon'
import { subjectById } from '../content/subjects'
import { hasGame } from '../games/content'
import { DIFFICULTY_LABEL, gameById, type GameId } from '../games/registry'
import { CompleteGame, DialogueGame, ListeningGame, QuizGame, ReadingGame, type GameProps } from '../games/play/choice'
import { MapGame } from '../games/play/map'
import { OrderGame } from '../games/play/order'
import { MatchGame, MemoryGame } from '../games/play/pairs'
import { PuzzleGame } from '../games/play/puzzle'
import { WordSearchGame } from '../games/play/wordsearch'
import { getLesson, useAllLessons } from '../lib/repo'
import { useLumi } from '../lib/store'
import type { Lesson, SubjectId } from '../types'

const PLAY: Record<GameId, ComponentType<GameProps>> = {
  quebra: PuzzleGame, caca: WordSearchGame, memoria: MemoryGame, ligue: MatchGame, ordem: OrderGame, complete: CompleteGame,
  quiz: QuizGame, mapa: MapGame, dialogo: DialogueGame, listening: ListeningGame, reading: ReadingGame,
}

/** dificuldade sugerida: a do nível do aluno (1º–5º fácil · 6º–9º médio · Médio difícil) */
function defaultDifficulty(level?: string): 1 | 2 | 3 {
  return level === 'fund1' ? 1 : level === 'medio' ? 3 : 2
}

export default function GamePlayPage() {
  const { game = '', lessonId } = useParams()
  const g = gameById(game)
  if (!g) return <Missing text="Jogo não encontrado." />
  if (!lessonId) return <Lobby gameId={g.id} />
  return <Play gameId={g.id} lessonId={lessonId} />
}

function Play({ gameId, lessonId }: { gameId: GameId; lessonId: string }) {
  const [params] = useSearchParams()
  const level = useLumi((s) => s.profile.level)
  const [round, setRound] = useState(0)
  const lesson = getLesson(lessonId)
  if (lesson) setSpeechLocale(localeOfSubject(lesson.subject))
  const g = gameById(gameId)!
  if (!lesson) return <Missing text="Não encontrei esse conteúdo neste aparelho." />
  if (!hasGame(lesson, gameId)) return <Missing text={`“${lesson.title}” ainda não tem material suficiente para ${g.name}. Experimente outro jogo deste conteúdo.`} to={`/jogos?aula=${lesson.id}`} />
  const d = (Number(params.get('d')) || defaultDifficulty(level)) as 1 | 2 | 3
  const Game = PLAY[gameId]
  // "Jogar de novo": remonta o jogo (novas palavras, cartas e ordem)
  return <Game key={`${lessonId}-${d}-${round}`} lesson={lesson} difficulty={d} game={g} onRestart={() => setRound((r) => r + 1)} />
}

function Lobby({ gameId }: { gameId: GameId }) {
  const nav = useNavigate()
  const g = gameById(gameId)!
  const level = useLumi((s) => s.profile.level)
  const studied = useLumi((s) => s.lessons)
  const [d, setD] = useState<1 | 2 | 3>(defaultDifficulty(level))
  const lessons = useAllLessons().filter((l) => l.origin !== 'colado' && hasGame(l, gameId))
  // primeiro o que o aluno já estudou, depois o resto, agrupado por matéria
  const sorted = [...lessons].sort((a, b) => Number(!!studied[b.id]) - Number(!!studied[a.id]) || a.subject.localeCompare(b.subject))
  const bySubject = new Map<SubjectId, Lesson[]>()
  for (const l of sorted) bySubject.set(l.subject, [...(bySubject.get(l.subject) ?? []), l])

  return (
    <div className="min-h-dvh bg-grafite pb-28 text-offwhite">
      <header className="safe-top mx-auto flex max-w-2xl items-center gap-2 px-3">
        <button onClick={() => nav('/jogos')} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 hover:bg-white/10" aria-label="Voltar"><ArrowLeft size={20} /></button>
        <h1 className="flex-1 text-lg font-semibold">{g.emoji} {g.name}</h1>
      </header>
      <main className="mx-auto max-w-2xl px-4">
        <p className="mt-2 text-offwhite/80">{g.desc}</p>
        <p className="mt-5 text-sm font-semibold">Dificuldade</p>
        <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
          {([1, 2, 3] as const).map((x) => (
            <button key={x} role="radio" aria-checked={d === x} onClick={() => setD(x)} className={`min-h-11 rounded-2xl border-2 text-sm font-semibold ${d === x ? 'border-laranja bg-laranja/15 text-laranja-claro' : 'border-white/15'}`}>{DIFFICULTY_LABEL[x]}</button>
          ))}
        </div>
        <p className="mt-6 text-sm font-semibold">Escolha o conteúdo</p>
        {lessons.length === 0 && <p className="mt-3 rounded-2xl bg-white/5 p-4 text-sm text-offwhite/80">Ainda não há conteúdos da base com material para este jogo.</p>}
        {[...bySubject].map(([sid, ls]) => (
          <div key={sid} className="mt-4">
            <p className="mb-2 flex items-center gap-2 text-sm text-offwhite/70"><SubjectIcon id={sid} box={26} size={15} /> {subjectById(sid)?.name}</p>
            <div className="grid gap-2">
              {ls.map((l) => (
                <Link key={l.id} to={`/jogos/${gameId}/${l.id}?d=${d}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-grafite-2 px-4 py-3 hover:border-laranja/60">
                  <span className="flex-1"><span className="block font-medium">{l.title}</span><span className="text-xs text-offwhite/60">{l.english ? `Inglês ${l.english.cefr}` : l.grade}{studied[l.id] ? ' · já estudado' : ''}</span></span>
                  <ChevronRight size={18} className="text-laranja" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

function Missing({ text, to = '/jogos' }: { text: string; to?: string }) {
  return (
    <div className="grid min-h-dvh place-items-center bg-grafite p-6 text-center text-offwhite">
      <div><p className="text-4xl">🎮</p><p className="mt-3 max-w-sm">{text}</p><Link to={to} className="mt-4 inline-block font-semibold text-laranja">Ver jogos</Link></div>
    </div>
  )
}
