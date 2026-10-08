import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { Spinner } from './components/ui'
import { RequireAccount } from './components/RequireAccount'
import Home from './pages/Home'
import SubjectPage from './pages/Subject'
import StudyStart from './pages/StudyStart'
import LessonPage from './pages/Lesson'
import QuizPage from './pages/Quiz'
import ResultPage from './pages/Result'
import ProgressPage from './pages/Progress'
import AchievementsPage from './pages/Achievements'
import MorePage from './pages/More'
import PastePage from './pages/Paste'
import ReviewPage from './pages/Review'
import AccountPage from './pages/Account'
import PrivacyPage from './pages/Privacy'
import LevelPage from './pages/Level'
import { supabase } from './lib/supabase'
import { getState, setProfile } from './lib/store'
import { pullAndMerge, startAutoSync } from './lib/sync'
import { refreshCloudLessons } from './lib/repo'
import { InstallInvite } from './components/InstallInvite'
import { NotificationRequest } from './components/NotificationRequest'
import './lib/english' // registra a avaliação de unidade e a revisão de Inglês (montadas na hora)
import { closeInvite, inviteRequested, shouldInvite, useInstallState } from './lib/install'

const Admin = lazy(() => import('./pages/admin/Admin'))
// jogos e curso de Inglês carregam só quando abertos (a Home continua leve)
const GamesPage = lazy(() => import('./pages/Games'))
const GamePlayPage = lazy(() => import('./pages/GamePlay'))
const EnglishHome = lazy(() => import('./pages/english/EnglishHome'))
const EnglishUnit = lazy(() => import('./pages/english/EnglishUnit'))
const EnglishReview = lazy(() => import('./pages/english/EnglishReview'))
const Placement = lazy(() => import('./pages/english/Placement'))
const Languages = lazy(() => import('./pages/languages/Languages'))
const LanguageDashboard = lazy(() => import('./pages/languages/LanguageDashboard'))
const Conversation = lazy(() => import('./pages/languages/Conversation'))

/** endereços antigos do curso de Inglês → área de Idiomas */
function LegacyEnglish() {
  const { pathname, search } = useLocation()
  return <Navigate to={pathname.replace(/^\/ingles/, '/idiomas/en') + search} replace />
}
const Lang = ({ children }: { children: React.ReactNode }) => <RequireAccount><Lazy>{children}</Lazy></RequireAccount>

/** a navegação inferior só aparece nas telas "de casa" — nas aulas, a atenção fica no conteúdo */
const NAV_ROUTES = ['/', '/jogos', '/progresso', '/conquistas', '/mais']

export default function App() {
  const { pathname } = useLocation()
  useInstallState()
  const [autoInvite, setAutoInvite] = useState(false)

  // primeiro acesso pelo celular: convite para instalar (uma vez; se recusar, só volta depois de alguns dias)
  useEffect(() => {
    if (pathname !== '/' || !shouldInvite()) return
    const t = setTimeout(() => setAutoInvite(shouldInvite()), 1500)
    return () => clearTimeout(t)
  }, [pathname])

  // conta é opcional: se existir sessão, mantém o userId local em dia e sincroniza em segundo plano
  useEffect(() => {
    const stop = startAutoSync()
    // aulas oficiais novas/revisadas ficam guardadas no aparelho (funciona offline)
    void refreshCloudLessons()
    if (!supabase) return stop
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const uid = session?.user.id
      if (uid && uid !== getState().profile.userId) void pullAndMerge(uid)
      if (event === 'SIGNED_OUT') setProfile({ userId: undefined })
    })
    return () => { stop(); data.subscription.unsubscribe() }
  }, [])
  return (
    <div className="min-h-dvh">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materia/:id" element={<SubjectPage />} />
        <Route path="/estudar" element={<StudyStart />} />
        <Route path="/nivel" element={<LevelPage />} />
        <Route path="/aula/:id" element={<LessonPage />} />
        <Route path="/aula/:id/exercicios" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/progresso" element={<ProgressPage />} />
        <Route path="/conquistas" element={<AchievementsPage />} />
        <Route path="/mais" element={<MorePage />} />
        <Route path="/colar" element={<PastePage />} />
        <Route path="/revisar" element={<ReviewPage />} />
        <Route path="/conta" element={<AccountPage />} />
        <Route path="/privacidade" element={<PrivacyPage />} />
        <Route path="/jogos" element={<Lazy><GamesPage /></Lazy>} />
        <Route path="/jogos/:game" element={<Lazy><GamePlayPage /></Lazy>} />
        <Route path="/jogos/:game/:lessonId" element={<Lazy><GamePlayPage /></Lazy>} />
        <Route path="/idiomas" element={<Lang><Languages /></Lang>} />
        <Route path="/idiomas/conversacao" element={<Lang><Conversation /></Lang>} />
        <Route path="/idiomas/aprendizado" element={<Lang><LanguageDashboard /></Lang>} />
        <Route path="/idiomas/:lang" element={<Lang><EnglishHome /></Lang>} />
        <Route path="/idiomas/:lang/nivelamento" element={<Lang><Placement /></Lang>} />
        <Route path="/idiomas/:lang/unidade/:id" element={<Lang><EnglishUnit /></Lang>} />
        <Route path="/idiomas/:lang/revisar" element={<Lang><EnglishReview /></Lang>} />
        <Route path="/ingles/*" element={<LegacyEnglish />} />
        <Route path="/admin/*" element={<Suspense fallback={<Spinner label="Carregando painel…" />}><Admin /></Suspense>} />
        <Route path="*" element={<Home />} />
      </Routes>
      {NAV_ROUTES.includes(pathname) && <BottomNav />}
      <InstallInvite open={autoInvite || inviteRequested()} onClose={() => { setAutoInvite(false); closeInvite() }} />
      <NotificationRequest />
    </div>
  )
}

const Lazy = ({ children }: { children: React.ReactNode }) => <Suspense fallback={<Spinner label="Carregando…" />}>{children}</Suspense>
