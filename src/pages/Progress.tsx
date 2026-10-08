import { BookCheck, ChevronRight, Flame, PencilLine, RotateCcw, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, Page, ProgressBar } from '../components/ui'
import { SubjectIcon } from '../components/SubjectIcon'
import { subjectById } from '../content/subjects'
import { currentStreak, subjectProgress, useLumi, weakSkills } from '../lib/store'
import { GAMES } from '../games/registry'
import { buildTrail, wordsLearned } from '../lib/english'
import { ErrorBoundary } from '../components/ErrorBoundary'

function ProgressPageInner() {
  try {
    const s = useLumi((st) => st)

    if (!s) return <ErrorFallback message="Carregando dados..." />

    // Garantir dados default para safety
    const safeState = {
      ...s,
      lessons: s.lessons || {},
      english: s.english || { placement: undefined, placements: {}, views: {}, unitTests: {}, activities: [], vocab: {} },
      games: s.games || [],
      history: s.history || [],
      studyDays: s.studyDays || [],
    }

    // Calcular antes de qualquer condicional
    const hasNoProgress = !safeState.points && !Object.keys(safeState.lessons).length && !safeState.questionsAnswered && !safeState.studyDays?.length

    if (hasNoProgress) {
      // Se NENHUM dado, mostrar estado vazio apropriado
      return (
      <div className="min-h-dvh">
        <header className="safe-top bg-grafite pb-6 text-offwhite">
          <div className="mx-auto max-w-2xl px-4">
            <h1 className="pt-2 text-2xl font-bold">📊 Meu progresso</h1>
          </div>
        </header>
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
          <p className="text-6xl mb-4">🌱</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Nenhum progresso registrado</h2>
          <p className="text-center text-gray-600 mb-6 max-w-md">Comece a estudar e seu progresso aparecerá aqui! Cada aula que você completa será registrada.</p>
          <Link to="/" className="px-6 py-3 bg-laranja text-white rounded-2xl font-semibold hover:bg-laranja-escuro transition">
            Começar a estudar
          </Link>
        </div>
      </div>
    )
  }

  let bySubject: any[] = []
  let weak: any[] = []
  let streak: number = 0
  let accuracy: number = 0
  let englishLevel: string = 'A1'
  let wordsCount: number = 0
  let unitsCount: number = 0

  try {
    bySubject = subjectProgress(safeState) || []
    weak = weakSkills(safeState)?.slice(0, 4) || []
    streak = currentStreak(safeState.studyDays || [])
    accuracy = safeState.questionsAnswered ? Math.round((safeState.correctAnswers / safeState.questionsAnswered) * 100) : 0
    englishLevel = buildTrail(safeState)?.level || 'A1'
    wordsCount = wordsLearned(safeState) ?? 0
    unitsCount = Object.values(safeState.english?.unitTests || {}).filter((t) => t?.best >= 70).length
  } catch (err) {
    console.error('Erro ao calcular stats:', err)
  }

  return (
    <div className="min-h-dvh">
      <header className="safe-top bg-grafite pb-6 text-offwhite">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="pt-2 text-2xl font-bold">📊 Meu progresso</h1>
          <p className="text-offwhite/80">Tudo fica salvo neste aparelho{safeState.profile?.userId ? ' e na sua conta' : ''}.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={<Star size={18} className="text-laranja-claro" />} value={safeState.points || 0} label="pontos" />
            <Stat icon={<Flame size={18} className="text-laranja" />} value={streak} label={streak === 1 ? 'dia seguido' : 'dias seguidos'} />
            <Stat icon={<BookCheck size={18} className="text-laranja-claro" />} value={Object.keys(safeState.lessons || {}).length} label="conteúdos concluídos" />
            <Stat icon={<PencilLine size={18} className="text-laranja-claro" />} value={safeState.questionsAnswered || 0} label={`questões · ${accuracy}% de acerto`} />
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

        <GamesCard />

        {(safeState.english?.placement || Object.keys(safeState.english?.views || {}).length > 0) && (
          <Link to="/idiomas/aprendizado" className="mt-4 flex items-center gap-3 rounded-3xl border border-cinza bg-white p-4 hover:border-laranja">
            <span className="text-3xl" aria-hidden>🌎</span>
            <span className="flex-1"><span className="block font-semibold">Idiomas · Inglês {englishLevel}</span><span className="block text-sm text-cinza-texto">{wordsCount} palavras aprendidas · {unitsCount} unidades dominadas</span></span>
            <ChevronRight size={18} className="text-cinza-texto" />
          </Link>
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

        {(safeState.history || []).length > 0 && (
          <Card className="mt-4">
            <h2 className="font-semibold">Histórico recente</h2>
            <ul className="mt-3 divide-y divide-cinza">
              {(safeState.history || []).slice(0, 8).map((h) => (
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
  } catch (err) {
    console.error('Erro em ProgressPage:', err)
    return <ErrorFallback message={`Erro ao carregar progresso: ${err}`} />
  }
}

function ErrorFallback({ message }: { message: string }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-grafite text-offwhite p-4">
      <p className="text-5xl mb-4">⚠️</p>
      <h1 className="text-2xl font-bold mb-2">Algo deu errado</h1>
      <p className="text-offwhite/70 mb-6">{message}</p>
      <Link to="/" className="px-4 py-2 bg-laranja text-white rounded-lg font-semibold hover:bg-laranja-escuro transition">
        Voltar ao início
      </Link>
      <details className="mt-6 text-xs text-offwhite/50 max-w-md">
        <summary>Detalhes técnicos</summary>
        <p>Se o problema persistir, tente limpar o cache (Ctrl+Shift+Del) ou use navegador privado.</p>
      </details>
    </div>
  )
}

export default function ProgressPage() {
  return (
    <ErrorBoundary>
      <ProgressPageInner />
    </ErrorBoundary>
  )
}

/** jogos realizados/concluídos, acertos, erros, tempo e por tipo de jogo */
function GamesCard() {
  const games = useLumi((st) => st.games) || []

  try {
    if (!games || !games.length) return null

    const done = (games || []).filter((g) => g?.completed) || []
    const right = (games || []).reduce((a, g) => a + (g?.correct || 0), 0)
    const wrong = (games || []).reduce((a, g) => a + (g?.wrong || 0), 0)
    const mins = Math.round((games || []).reduce((a, g) => a + (g?.ms || 0), 0) / 60000)
    const byType = (GAMES || []).map((t) => ({ t, n: (games || []).filter((g) => g?.game === t.id).length })).filter((x) => x.n > 0)

    return (
      <Card className="mt-4">
        <div className="flex items-center justify-between"><h2 className="font-semibold">🎮 Jogos</h2><Link to="/jogos" className="text-sm font-semibold text-laranja">jogar</Link></div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
          <div className="rounded-2xl bg-offwhite p-2"><p className="text-lg font-bold">{done.length}</p><p className="text-xs text-cinza-texto">concluídos</p></div>
          <div className="rounded-2xl bg-offwhite p-2"><p className="text-lg font-bold">{right + wrong ? Math.round((100 * right) / (right + wrong)) : 0}%</p><p className="text-xs text-cinza-texto">de acerto</p></div>
          <div className="rounded-2xl bg-offwhite p-2"><p className="text-lg font-bold">{mins} min</p><p className="text-xs text-cinza-texto">jogando</p></div>
        </div>
        {byType.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-1.5 text-xs">{byType.map(({ t, n }) => <span key={t.id} className="rounded-full bg-laranja-suave px-2 py-1 text-laranja-escuro">{t.emoji} {t.name}: {n}</span>)}</p>
        )}
      </Card>
    )
  } catch (err) {
    console.error('Erro em GamesCard:', err)
    return null
  }
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value?: number; label: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <div className="flex items-center gap-1.5 text-xl font-bold">{icon}{value ?? 0}</div>
      <p className="text-xs text-offwhite/75">{label}</p>
    </div>
  )
}
