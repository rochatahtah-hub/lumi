import { Home, NotebookPen, RotateCcw, X } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Page, ProgressBar } from '../components/ui'
import { ACHIEVEMENTS } from '../lib/achievements'
import { cloudEnabled } from '../lib/supabase'
import { setState, useLumi } from '../lib/store'
import type { ResultState } from './Quiz'
import { getLesson } from '../lib/repo'
import { gamesForLesson } from '../games/recommend'
import { gameById } from '../games/registry'
import { unitById } from '../content/english/course'

export default function ResultPage() {
  const nav = useNavigate()
  const r = useLocation().state as ResultState | null
  const sessions = useLumi((s) => s.history.length)
  const dismissed = useLumi((s) => s.loginPromptDismissedAt)
  const syncedUser = useLumi((s) => s.profile.userId)
  if (!r) return <Navigate to="/" replace />
  // trilha: pré-requisito → conteúdo atual → próximo conteúdo
  const nextLessons = (getLesson(r.lessonId)?.next ?? []).map((id) => getLesson(id)).filter((l) => !!l)

  const pct = r.total ? Math.round((r.correct / r.total) * 100) : 0
  const lessonNow = getLesson(r.lessonId)
  const games = r.mode === 'aula' && lessonNow ? gamesForLesson(lessonNow) : []
  const unit = r.unitId ? unitById(r.unitId) : undefined
  const unlocked = ACHIEVEMENTS.filter((a) => r.newAchievements.includes(a.id))
  const offerLogin = cloudEnabled && sessions >= 2 && !dismissed && !syncedUser
  const headline = pct >= 80 ? 'Mandou muito bem!' : pct >= 50 ? 'Bom trabalho!' : 'Cada erro é um passo do aprendizado.'

  return (
    <div className="min-h-dvh bg-offwhite">
      <div className="safe-top mx-auto flex max-w-2xl justify-end px-3">
        <button onClick={() => nav('/')} className="grid h-11 w-11 place-items-center rounded-full hover:bg-cinza/60" aria-label="Fechar"><X size={22} /></button>
      </div>
      <Page className="pt-0">
        <div className="text-center">
          <div className="animate-pop text-7xl">⭐</div>
          <h1 className="mt-3 text-2xl font-bold">🎉 {r.mode === 'avaliacao' ? 'Avaliação concluída!' : 'Atividade concluída!'}</h1>
          <p className="text-cinza-texto">{headline}</p>
        </div>

        <Card className="mt-6">
          <p className="text-sm text-cinza-texto">Seu desempenho · {r.title}</p>
          <div className="mt-1 flex items-end justify-between">
            <p className="text-2xl font-bold">{r.correct} de {r.total}</p>
            <p className="text-2xl font-bold text-laranja">{pct}%</p>
          </div>
          <ProgressBar value={pct} className="mt-2" />
          <p className="mt-2 text-sm text-cinza-texto">{pct}% de aproveitamento · +{r.pointsEarned} pontos</p>
        </Card>

        {r.good.length > 0 && (
          <Card className="mt-4">
            <p className="font-semibold">Você foi bem em:</p>
            <ul className="mt-2 space-y-1">{r.good.map((g) => <li key={g} className="text-sucesso">✓ <span className="text-grafite">{g}</span></li>)}</ul>
          </Card>
        )}
        {r.toReview.length > 0 && (
          <Card className="mt-4">
            <p className="font-semibold">Vamos revisar:</p>
            <ul className="mt-2 space-y-1">{r.toReview.map((g) => <li key={g}>• {g}</li>)}</ul>
          </Card>
        )}

        {unlocked.length > 0 && (
          <Card className="mt-4 border-laranja/40 bg-laranja-suave">
            <p className="font-semibold">🏆 Nova conquista!</p>
            {unlocked.map((a) => <p key={a.id} className="mt-1">{a.icon} {a.title}</p>)}
          </Card>
        )}

        {unit && (
          <Card className={`mt-4 ${r.passed ? 'border-sucesso/40 bg-sucesso-suave' : 'border-laranja/40 bg-laranja-suave'}`}>
            <p className="font-semibold">{r.passed ? '★ Unidade dominada!' : 'Vamos revisar este conteúdo antes de continuar.'}</p>
            <p className="mt-1 text-sm">{r.passed ? `Você passou na avaliação de “${unit.title}”. A próxima unidade está liberada.` : `Para liberar a próxima unidade, é preciso 70% na avaliação de “${unit.title}”. Uma revisão rápida ajuda muito.`}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {!r.passed && <Button onClick={() => nav(`/ingles/revisar?unidade=${unit.id}`)}><RotateCcw size={18} /> Revisar a unidade</Button>}
              <Button variant="outline" onClick={() => nav(`/ingles/unidade/${unit.id}`)}>Ver unidade</Button>
            </div>
          </Card>
        )}

        {games.length > 0 && (
          <Card className="mt-4 overflow-hidden bg-grafite text-offwhite">
            <p className="font-semibold">Você terminou essa aula! 🎉</p>
            <p className="text-sm text-offwhite/80">Quer revisar brincando?</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {games.map((g) => (
                <button key={g} onClick={() => nav(`/jogos/${g}/${r.lessonId}`)} className="flex min-h-12 items-center gap-2 rounded-2xl border border-white/15 px-3 text-left text-sm font-semibold hover:border-laranja">
                  <span className="text-xl">{gameById(g)!.emoji}</span>{gameById(g)!.name}
                </button>
              ))}
            </div>
          </Card>
        )}

        {nextLessons.length > 0 && (
          <Card className="mt-4">
            <p className="font-semibold">➡️ Próximo passo recomendado</p>
            <div className="mt-2 grid gap-2">
              {nextLessons.map((l) => (
                <button key={l.id} onClick={() => nav(`/aula/${l.id}`)} className="flex items-center justify-between rounded-2xl bg-laranja-suave px-4 py-3 text-left font-medium hover:bg-laranja/20">
                  {l.title} <span aria-hidden>→</span>
                </button>
              ))}
            </div>
          </Card>
        )}

        <div className="mt-6 grid gap-3">
          {r.toReview.length > 0 && <Button onClick={() => nav(r.mode === 'aula' ? `/revisar?de=${r.lessonId}` : '/revisar')}><RotateCcw size={18} /> Revisar</Button>}
          {r.mode === 'aula' && <Button variant={r.toReview.length ? 'outline' : 'primary'} onClick={() => nav(`/aula/${r.lessonId}/exercicios`, { replace: true })}><NotebookPen size={18} /> Mais exercícios</Button>}
          <Button variant="ghost" onClick={() => nav('/')}><Home size={18} /> Início</Button>
        </div>

        {offerLogin && (
          <Card className="mt-6">
            <p className="font-semibold">Quer salvar seu progresso?</p>
            <p className="mt-1 text-sm text-cinza-texto">Com uma conta gratuita, seu histórico fica guardado na nuvem e aparece em outros aparelhos. É opcional.</p>
            <div className="mt-3 flex gap-2">
              <Button className="flex-1" onClick={() => nav('/conta')}>Criar conta gratuita</Button>
              <Button variant="ghost" onClick={() => setState((s) => ({ ...s, loginPromptDismissedAt: new Date().toISOString() }))}>Agora não</Button>
            </div>
          </Card>
        )}
      </Page>
    </div>
  )
}
