import { ChevronRight } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { MASCOT } from '../assets/lumi'
import { LumiMark } from '../components/ui'
import { availableGames, hasGame } from '../games/content'
import { subjectById } from '../content/subjects'
import { recommendedGames } from '../games/recommend'
import { GAMES, gameById } from '../games/registry'
import { allLessons, getLesson } from '../lib/repo'
import { useLumi } from '../lib/store'

/** 🎮 Jogos do LUMI — mesma estética da referência: fundo grafite, cards arredondados, detalhes em laranja */
export default function GamesPage() {
  const [params] = useSearchParams()
  const lesson = params.get('aula') ? getLesson(params.get('aula')!) : undefined
  const materia = params.get('materia')
  const ofSubject = materia ? allLessons().filter((l) => l.subject === materia && l.origin !== 'colado' && availableGames(l).length > 0) : []
  useLumi((s) => s.games.length)
  const recs = recommendedGames()

  return (
    <div className="relative min-h-dvh overflow-hidden bg-grafite pb-28 text-offwhite">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-laranja/20 blur-3xl" />
      <div className="safe-top relative mx-auto max-w-2xl px-4">
        <header className="flex items-center gap-3 pt-2">
          <LumiMark size={38} pageColor="#F8FAFC" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold leading-tight">Jogos Educativos do <span className="text-laranja">LUMI</span></h1>
            <p className="text-sm text-offwhite/75">Aprender também pode ser divertido!</p>
          </div>
          <img src={MASCOT.peek.wave} alt="" aria-hidden className="h-20 w-auto select-none drop-shadow-[0_6px_12px_rgba(0,0,0,.5)]" draggable={false} />
        </header>
        <p className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-offwhite/85">Jogos feitos com base no conteúdo que você estuda.</p>

        {lesson && (
          <section className="mt-6">
            <h2 className="font-semibold">Jogos de “{lesson.title}”</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {GAMES.filter((g) => hasGame(lesson, g.id)).map((g) => <GameCard key={g.id} to={`/jogos/${g.id}/${lesson.id}`} emoji={g.emoji} name={g.name} desc={g.desc} />)}
            </div>
          </section>
        )}

        {ofSubject.length > 0 && (
          <section className="mt-6">
            <h2 className="font-semibold">Jogos de {subjectById(materia!)?.name}</h2>
            <div className="mt-3 grid gap-2">
              {ofSubject.map((l) => (
                <div key={l.id} className="rounded-2xl border border-white/10 bg-grafite-2 p-3">
                  <p className="text-sm font-semibold">{l.title}{l.english ? <span className="ml-2 text-xs text-laranja-claro">{l.english.cefr}</span> : null}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">{availableGames(l).map((g) => <Link key={g} to={`/jogos/${g}/${l.id}`} className="rounded-full bg-white/10 px-2.5 py-1 text-xs hover:bg-laranja/30">{gameById(g)!.emoji} {gameById(g)!.name}</Link>)}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {recs.length > 0 && (
          <section className="mt-6">
            <h2 className="font-semibold">Jogos recomendados para você</h2>
            <div className="-mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
              {recs.map((r) => {
                const g = gameById(r.game)!
                return (
                  <Link key={r.lesson.id} to={`/jogos/${r.game}/${r.lesson.id}`} className="min-w-[210px] snap-start rounded-3xl border border-white/10 bg-grafite-2 p-4 transition hover:border-laranja/60">
                    <p className="text-2xl">{g.emoji}</p>
                    <p className="mt-1 font-semibold leading-tight">{g.name}</p>
                    <p className="mt-0.5 truncate text-sm text-offwhite/80">{r.lesson.title}</p>
                    <p className="mt-2 text-xs text-laranja-claro">{r.reason}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <section className="mt-6">
          <h2 className="font-semibold">Todos os jogos</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {GAMES.filter((g) => !g.english).map((g) => <GameCard key={g.id} to={`/jogos/${g.id}`} emoji={g.emoji} name={g.name} desc={g.desc} />)}
          </div>
          <h2 className="mt-6 font-semibold">🇬🇧 Especiais de Inglês</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {GAMES.filter((g) => g.english).map((g) => <GameCard key={g.id} to={`/jogos/${g.id}`} emoji={g.emoji} name={g.name} desc={g.desc} />)}
          </div>
        </section>
      </div>
    </div>
  )
}

function GameCard({ to, emoji, name, desc }: { to: string; emoji: string; name: string; desc: string }) {
  return (
    <Link to={to} className="group flex flex-col rounded-3xl border border-white/10 bg-grafite-2 p-4 shadow-[0_0_30px_rgba(255,138,31,.05)] transition hover:border-laranja/60">
      <span className="text-3xl" aria-hidden>{emoji}</span>
      <span className="mt-2 font-semibold leading-tight">{name}</span>
      <span className="mt-1 flex-1 text-xs leading-snug text-offwhite/70">{desc}</span>
      <ChevronRight size={18} className="mt-2 self-end text-laranja transition group-hover:translate-x-0.5" />
    </Link>
  )
}

