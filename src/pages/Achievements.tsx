import { Lock } from 'lucide-react'
import { Page } from '../components/ui'
import { ACHIEVEMENTS } from '../lib/achievements'
import { currentStreak, useLumi } from '../lib/store'

export default function AchievementsPage() {
  const unlocked = useLumi((s) => s.achievements)
  const points = useLumi((s) => s.points)
  const streak = useLumi((s) => currentStreak(s.studyDays))
  const done = useLumi((s) => Object.keys(s.lessons).length)
  const count = Object.keys(unlocked).length

  return (
    <div className="min-h-dvh">
      <header className="safe-top bg-grafite pb-6 text-offwhite">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="pt-2 text-2xl font-bold">🏆 Conquistas</h1>
          <p className="text-offwhite/80">{count} de {ACHIEVEMENTS.length} desbloqueadas</p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white/10 p-3"><p className="text-xl font-bold">⭐ {points}</p><p className="text-xs text-offwhite/75">pontos</p></div>
            <div className="rounded-2xl bg-white/10 p-3"><p className="text-xl font-bold">🔥 {streak}</p><p className="text-xs text-offwhite/75">sequência</p></div>
            <div className="rounded-2xl bg-white/10 p-3"><p className="text-xl font-bold">📚 {done}</p><p className="text-xs text-offwhite/75">concluídos</p></div>
          </div>
        </div>
      </header>
      <Page>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ACHIEVEMENTS.map((a) => {
            const at = unlocked[a.id]
            return (
              <div key={a.id} className={`rounded-3xl border p-4 ${at ? 'border-laranja/40 bg-white shadow-sm' : 'border-cinza bg-offwhite'}`}>
                <div className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${at ? 'bg-laranja-suave' : 'bg-cinza/60 grayscale'}`}>
                  {at ? a.icon : <Lock size={20} className="text-cinza-texto" />}
                </div>
                <p className={`mt-3 text-sm font-semibold ${at ? '' : 'text-cinza-texto'}`}>{a.title}</p>
                <p className="mt-0.5 text-xs text-cinza-texto">{at ? new Date(at).toLocaleDateString('pt-BR') : a.description}</p>
              </div>
            )
          })}
        </div>
      </Page>
    </div>
  )
}
