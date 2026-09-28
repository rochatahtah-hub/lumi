import { Home, NotebookPen, RotateCcw, X } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Page, ProgressBar } from '../components/ui'
import { ACHIEVEMENTS } from '../lib/achievements'
import { cloudEnabled } from '../lib/supabase'
import { setState, useLumi } from '../lib/store'
import type { ResultState } from './Quiz'

export default function ResultPage() {
  const nav = useNavigate()
  const r = useLocation().state as ResultState | null
  const sessions = useLumi((s) => s.history.length)
  const dismissed = useLumi((s) => s.loginPromptDismissedAt)
  const syncedUser = useLumi((s) => s.profile.userId)
  if (!r) return <Navigate to="/" replace />

  const pct = r.total ? Math.round((r.correct / r.total) * 100) : 0
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
          <h1 className="mt-3 text-2xl font-bold">🎉 Atividade concluída!</h1>
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
