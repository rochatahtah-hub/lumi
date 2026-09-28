import { BookCheck, ChevronRight, Flame, PencilLine, RotateCcw, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, Page, ProgressBar } from '../components/ui'
import { SubjectIcon } from '../components/SubjectIcon'
import { subjectById } from '../content/subjects'
import { currentStreak, subjectProgress, useLumi, weakSkills } from '../lib/store'

export default function ProgressPage() {
  const s = useLumi((st) => st)
  const bySubject = subjectProgress(s)
  const weak = weakSkills(s).slice(0, 4)
  const streak = currentStreak(s.studyDays)
  const accuracy = s.questionsAnswered ? Math.round((s.correctAnswers / s.questionsAnswered) * 100) : 0

  return (
    <div className="min-h-dvh">
      <header className="safe-top bg-grafite pb-6 text-offwhite">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="pt-2 text-2xl font-bold">📊 Meu progresso</h1>
          <p className="text-offwhite/80">Tudo fica salvo neste aparelho{s.profile.userId ? ' e na sua conta' : ''}.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={<Star size={18} className="text-laranja-claro" />} value={s.points} label="pontos" />
            <Stat icon={<Flame size={18} className="text-laranja" />} value={streak} label={streak === 1 ? 'dia seguido' : 'dias seguidos'} />
            <Stat icon={<BookCheck size={18} className="text-laranja-claro" />} value={Object.keys(s.lessons).length} label="conteúdos concluídos" />
            <Stat icon={<PencilLine size={18} className="text-laranja-claro" />} value={s.questionsAnswered} label={`questões · ${accuracy}% de acerto`} />
          </div>
        </div>
      </header>
      <Page>
        {bySubject.length === 0 ? (
          <Card className="text-center">
            <p className="text-4xl">🌱</p>
            <p className="mt-2 font-semibold">Seu progresso aparece aqui</p>
            <p className="mt-1 text-cinza-texto">Conclua sua primeira atividade para ver como você está em cada matéria.</p>
            <Link to="/" className="mt-4 inline-block font-semibold text-laranja">Começar a estudar</Link>
          </Card>
        ) : (
          <Card>
            <h2 className="font-semibold">Por matéria</h2>
            <div className="mt-4 space-y-4">
              {bySubject.map((p) => (
                <div key={p.subject} className="flex items-center gap-3">
                  <SubjectIcon id={p.subject} box={36} size={18} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm"><span className="font-medium">{subjectById(p.subject)?.name}</span><span className="font-semibold">{p.pct}%</span></div>
                    <ProgressBar value={p.pct} className="mt-1" />
                    <p className="mt-0.5 text-xs text-cinza-texto">{p.lessons} {p.lessons === 1 ? 'assunto' : 'assuntos'}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {weak.length > 0 && (
          <Card className="mt-4">
            <h2 className="font-semibold">Pontos para reforçar</h2>
            <ul className="mt-3 space-y-2">
              {weak.map((w) => (
                <li key={w.key} className="flex justify-between text-sm"><span>{w.label}</span><span className="text-cinza-texto">{w.wrong} {w.wrong === 1 ? 'erro' : 'erros'}</span></li>
              ))}
            </ul>
            <Link to="/revisar" className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-laranja py-3 font-semibold text-white"><RotateCcw size={18} /> Revisar agora</Link>
          </Card>
        )}

        {s.history.length > 0 && (
          <Card className="mt-4">
            <h2 className="font-semibold">Histórico recente</h2>
            <ul className="mt-3 divide-y divide-cinza">
              {s.history.slice(0, 8).map((h) => (
                <li key={h.id}>
                  <Link to={h.mode === 'aula' ? `/aula/${h.lessonId}` : '/revisar'} className="flex items-center gap-3 py-3">
                    <SubjectIcon id={h.subject} box={32} size={16} />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{h.mode === 'revisao' ? '🔄 ' : ''}{h.title}</span>
                      <span className="block text-xs text-cinza-texto">{new Date(h.finishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} · {h.correct} de {h.total}</span>
                    </span>
                    <ChevronRight size={18} className="text-cinza-texto" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </Page>
    </div>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <div className="flex items-center gap-1.5 text-xl font-bold">{icon}{value}</div>
      <p className="text-xs text-offwhite/75">{label}</p>
    </div>
  )
}
