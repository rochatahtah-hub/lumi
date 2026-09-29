import { useState, type FormEvent } from 'react'
import { BookOpen, ChevronRight, FileText, Flame, RotateCcw, Search, Star } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { LumiLogo } from '../components/ui'
import { MascotWalker } from '../components/mascot/MascotWalker'
import { SubjectIcon } from '../components/SubjectIcon'
import { HOME_SUBJECTS, subjectById } from '../content/subjects'
import { currentStreak, useLumi, weakSkills } from '../lib/store'
import { getLesson } from '../lib/repo'

const EXAMPLES = ['Frações', 'Equação do 2º grau', 'Fotossíntese', 'Revolução Francesa', 'Gramática', 'Inglês']

export default function Home() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const points = useLumi((s) => s.points)
  const streak = useLumi((s) => currentStreak(s.studyDays))
  const lastSession = useLumi((s) => s.history.find((h) => h.mode === 'aula'))
  const hasWeak = useLumi((s) => weakSkills(s).length > 0)
  const nickname = useLumi((s) => s.profile.nickname)

  const go = (topic: string) => topic.trim() && nav(`/estudar?q=${encodeURIComponent(topic.trim())}`)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    go(q)
  }
  const last = lastSession && getLesson(lastSession.lessonId)

  return (
    <div className="relative min-h-dvh overflow-hidden bg-grafite pb-28 text-offwhite">
      {/* círculos laranja nas bordas, como na tela da referência */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-24 h-48 w-48 rounded-full bg-laranja/25 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-4 h-48 w-48 rounded-full bg-laranja/20 blur-2xl" />

      <div className="safe-top relative mx-auto max-w-2xl px-4">
        <div className="flex items-center justify-end gap-3 pt-1 text-sm text-offwhite/80">
          {streak > 0 && <span className="flex items-center gap-1" title="Dias seguidos estudando"><Flame size={16} className="text-laranja" /> {streak}</span>}
          <span className="flex items-center gap-1" title="Pontos"><Star size={16} className="text-laranja-claro" /> {points}</span>
        </div>

        <div className="pt-2"><LumiLogo /></div>

        <section className="mt-8">
          <h1 className="text-2xl font-bold">Olá{nickname ? `, ${nickname}` : ''}! 👋</h1>
          <p className="text-lg text-offwhite/90">O que você quer aprender hoje?</p>
          <form onSubmit={submit} className="mt-4" role="search">
            <label className="flex items-center gap-3 rounded-2xl bg-white px-4 text-grafite shadow-lg focus-within:ring-4 focus-within:ring-laranja/40">
              <Search size={20} className="shrink-0 text-cinza-texto" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Digite uma matéria ou assunto..."
                className="min-h-14 w-full bg-transparent text-base outline-none placeholder:text-cinza-texto"
                enterKeyHint="go"
                aria-label="Digite uma matéria ou assunto"
                maxLength={200}
              />
              {q.trim() && <button className="rounded-xl bg-laranja px-3 py-2 text-sm font-semibold text-white">Estudar</button>}
            </label>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button key={ex} onClick={() => go(ex)} className="rounded-full border border-offwhite/20 bg-white/5 px-3 py-1.5 text-sm text-offwhite/90 hover:bg-white/15">
                {ex}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-semibold">Escolha uma matéria</h2>
          {/* faixa do mascote: ele passa por trás da 1ª fileira de cards (os cards ficam na frente) */}
          <div className="relative h-14 sm:h-[72px] lg:h-[84px]"><MascotWalker /></div>
          <div className="relative z-10 grid grid-cols-3 gap-3">
            {HOME_SUBJECTS.map((id) => {
              const s = subjectById(id)!
              return (
                <Link key={id} to={`/materia/${id}`} className="flex min-h-24 flex-col justify-between gap-2 rounded-2xl bg-white p-3 text-grafite shadow-sm transition hover:-translate-y-0.5 active:scale-[.98]">
                  <SubjectIcon id={id} />
                  <span className="text-sm font-medium leading-tight">{s.name}</span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="mt-4 space-y-3">
          {last && (
            <Link to={`/aula/${last.id}`} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-grafite">
              <BookOpen size={20} className="text-laranja" />
              <span className="flex-1"><span className="block text-sm font-medium">Continuar estudando</span><span className="block text-xs text-cinza-texto">{last.title}</span></span>
              <ChevronRight size={20} />
            </Link>
          )}
          <Link to="/colar" className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-grafite">
            <FileText size={20} className="text-laranja" />
            <span className="flex-1 text-sm font-medium">📄 Tenho um conteúdo para estudar</span>
            <ChevronRight size={20} />
          </Link>
          {hasWeak && (
            <Link to="/revisar" className="flex items-center gap-3 rounded-2xl bg-laranja px-4 py-3.5 text-white">
              <RotateCcw size={20} />
              <span className="flex-1 text-sm font-semibold">Revisar meus estudos</span>
              <ChevronRight size={20} />
            </Link>
          )}
        </section>
      </div>
    </div>
  )
}
