import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { BookOpen, CalendarClock, CircleHelp, Database, LayoutDashboard, LogOut, Sparkles } from 'lucide-react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Button, Card, LumiMark, Spinner } from '../../components/ui'
import { supabase } from '../../lib/supabase'
import { subjectById } from '../../content/subjects'
import { getLesson } from '../../lib/repo'
import { dashboard, isAdmin, localMode, type Dashboard } from './api'
import AdminLessons, { AdminLessonEditor } from './Lessons'
import AdminAiFound, { AdminAiReview } from './AiFound'
import { AdminKbUpdate, AdminUnanswered } from './KbPages'
import AdminSources from './Sources'

type Gate = 'loading' | 'login' | 'denied' | 'ok'

export default function Admin() {
  const [gate, setGate] = useState<Gate>('loading')

  useEffect(() => {
    if (!supabase) return
    const check = async () => {
      const { data } = await supabase!.auth.getSession()
      if (!data.session) return setGate('login')
      setGate((await isAdmin()) ? 'ok' : 'denied')
    }
    void check()
    const { data } = supabase.auth.onAuthStateChange(() => void check())
    return () => data.subscription.unsubscribe()
  }, [])

  // sem servidor não há como conferir a senha: o painel não abre
  if (localMode) {
    return <Shell><Card className="mx-auto max-w-sm"><p className="font-semibold">🔒 Área do administrador</p><p className="mt-1 text-sm text-cinza-texto">O painel só abre conectado ao servidor do LUMI, com telefone e senha.</p></Card></Shell>
  }
  if (gate === 'loading') return <Spinner label="Verificando acesso…" />
  if (gate === 'login') return <AdminLogin />
  if (gate === 'denied') {
    return (
      <Shell>
        <Card><p className="font-semibold">Acesso restrito</p><p className="mt-1 text-cinza-texto">Esta conta não tem permissão de administrador.</p>
          <Button variant="ghost" className="mt-3" onClick={() => supabase?.auth.signOut()}>Sair</Button></Card>
      </Shell>
    )
  }
  return (
    <Shell nav>
      {localMode && (
        <div className="mb-4 rounded-2xl bg-laranja-suave p-3 text-sm">
          <b>Modo de visualização local.</b> O backend (Supabase) ainda não está configurado: você vê a base embutida e os dados deste aparelho, sem editar. Veja o README para ativar.
        </div>
      )}
      <Routes>
        <Route index element={<DashboardView />} />
        <Route path="conteudos" element={<AdminLessons />} />
        <Route path="conteudos/:id" element={<AdminLessonEditor />} />
        <Route path="ia" element={<AdminAiFound />} />
        <Route path="ia/:id" element={<AdminAiReview />} />
        <Route path="nao-encontradas" element={<AdminUnanswered />} />
        <Route path="atualizacao" element={<AdminKbUpdate />} />
        <Route path="fontes" element={<AdminSources />} />
      </Routes>
    </Shell>
  )
}

function Shell({ children, nav }: { children: ReactNode; nav?: boolean }) {
  const tabs = [
    { to: '/admin', label: 'Painel', icon: LayoutDashboard, end: true },
    { to: '/admin/conteudos', label: 'Conteúdos', icon: BookOpen },
    { to: '/admin/ia', label: 'Encontrados pela IA', icon: Sparkles },
    { to: '/admin/nao-encontradas', label: 'Não encontradas', icon: CircleHelp },
    { to: '/admin/atualizacao', label: 'Atualização da base', icon: CalendarClock },
    { to: '/admin/fontes', label: 'Fontes', icon: Database },
  ]
  return (
    <div className="min-h-dvh bg-offwhite">
      <header className="safe-top bg-grafite text-offwhite">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 pb-3">
          <LumiMark size={32} pageColor="#F8FAFC" />
          <span className="flex-1 font-semibold">LUMI · Administração</span>
          <NavLink to="/" className="text-sm text-offwhite/80 hover:text-white">Ver app</NavLink>
          {!localMode && <button onClick={() => supabase?.auth.signOut()} aria-label="Sair" className="text-offwhite/80 hover:text-white"><LogOut size={18} /></button>}
        </div>
        {nav && (
          <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-2">
            {tabs.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm ${isActive ? 'border-laranja text-white' : 'border-transparent text-offwhite/70 hover:text-white'}`}>
                <Icon size={16} /> {label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  )
}

/** telefone (com ou sem DDI/DDD/pontuação) → identificador interno da conta de administrador */
function phoneLogin(phone: string): string | null {
  let d = phone.replace(/\D/g, '')
  if (d.length === 10 || d.length === 11) d = '55' + d
  if (d.length < 12 || d.length > 13) return null
  return `${d}@telefone.lumi.invalid`
}

function AdminLogin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setErr('')
    const login = phoneLogin(phone)
    if (!login) return setErr('Digite o telefone com DDD, ex.: (47) 99999-9999.')
    setBusy(true)
    const { error } = await supabase!.auth.signInWithPassword({ email: login, password })
    setBusy(false)
    if (error) setErr('Telefone ou senha incorretos.')
  }
  return (
    <Shell>
      <Card className="mx-auto max-w-sm">
        <h1 className="text-lg font-semibold">🔒 Área do administrador</h1>
        <p className="mt-1 text-sm text-cinza-texto">Acesso restrito. Entre com o telefone e a senha de administrador.</p>
        <form onSubmit={submit} className="mt-4 grid gap-3">
          <input type="tel" inputMode="tel" autoComplete="username" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefone com DDD" className="min-h-12 rounded-2xl border-2 border-cinza px-4 outline-none focus:border-laranja" />
          <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" className="min-h-12 rounded-2xl border-2 border-cinza px-4 outline-none focus:border-laranja" />
          {err && <p className="text-sm text-erro" role="alert">{err}</p>}
          <Button disabled={busy}>{busy ? 'Entrando…' : 'Entrar'}</Button>
        </form>
      </Card>
    </Shell>
  )
}

function DashboardView() {
  const [d, setD] = useState<Dashboard | null>(null)
  const [err, setErr] = useState('')
  useEffect(() => { dashboard().then(setD).catch((e) => setErr(String(e.message ?? e))) }, [])
  if (err) return <Card><p className="text-erro">{err}</p></Card>
  if (!d) return <Spinner label="Carregando números…" />
  const lessonName = (ref: string) => getLesson(ref)?.title ?? ref
  const maxDay = Math.max(1, ...d.sessions_by_day.map((x) => x.sessions))

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Tile label="Alunos (aparelhos)" value={d.students} sub={`${d.students_30d} nos últimos 30 dias`} />
        <Tile label="Sessões de estudo" value={d.sessions} sub={`${d.sessions_7d} nos últimos 7 dias`} />
        <Tile label="Aulas" value={d.lessons} sub={`${d.lessons_published} publicadas`} />
        <Tile label="Exercícios" value={d.questions} sub={`${d.attempts} respostas`} />
        <Tile label="Matérias" value={d.subjects} />
        <Tile label="Assuntos" value={d.topics} />
        <Tile label="Contas criadas" value={d.accounts} />
        <Tile label="Conteúdos da IA" value={d.pending_research} sub="aguardando revisão" />
        {d.unanswered_30d !== undefined && <Tile label="Perguntas não encontradas" value={d.unanswered_30d} sub="nos últimos 30 dias" />}
      </section>

      {d.sessions_by_day.length > 0 && (
        <Card>
          <h2 className="font-semibold">Sessões por dia (14 dias)</h2>
          <div className="mt-4 flex h-32 items-end gap-1" role="img" aria-label="Sessões de estudo por dia">
            {d.sessions_by_day.map((x) => (
              <div key={x.day} className="group relative flex h-full flex-1 items-end">
                <div className="w-full rounded-t bg-laranja" style={{ height: `${(x.sessions / maxDay) * 100}%`, minHeight: 2 }} />
                <span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-grafite px-2 py-1 text-xs text-white group-hover:block">
                  {new Date(x.day + 'T12:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}: {x.sessions}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="font-semibold">Conteúdos mais acessados</h2>
          <Table empty="Ainda sem sessões registradas." head={['Aula', 'Sessões', 'Acerto médio']}
            rows={d.most_accessed.map((r) => [lessonName(r.lesson_ref) + (r.subject_id ? ` · ${subjectById(r.subject_id)?.name ?? ''}` : ''), r.sessions, `${r.avg_pct ?? 0}%`])} />
        </Card>
        <Card>
          <h2 className="font-semibold">Maior índice de erro</h2>
          <p className="text-xs text-cinza-texto">Questões com pelo menos {localMode ? "1 resposta" : "5 respostas"} — candidatas a revisão de texto ou dicas.</p>
          <Table empty="Dados insuficientes ainda." head={['Questão', 'Respostas', 'Erro']}
            rows={d.highest_error.map((r) => [`${lessonName(r.question_ref.split(':')[0])} · ${r.question_ref.split(':').pop()}`, r.attempts, `${r.error_pct}%`])} />
        </Card>
      </div>

      <Card>
        <h2 className="font-semibold">Assuntos pedidos que ainda não existem na base</h2>
        <p className="text-xs text-cinza-texto">A rotina de pesquisa usa esta lista para buscar novos conteúdos.</p>
        <Table empty={localMode ? 'Disponível com o backend configurado.' : 'Nenhum pedido nos últimos 60 dias.'} head={['Assunto', 'Pedidos']} rows={d.requested_topics.map((r) => [r.topic, r.requests])} />
      </Card>
    </div>
  )
}

function Tile({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-cinza-texto">{label}</p>
      <p className="text-2xl font-bold">{value.toLocaleString('pt-BR')}</p>
      {sub && <p className="text-xs text-cinza-texto">{sub}</p>}
    </Card>
  )
}

export function Table({ head, rows, empty }: { head: string[]; rows: (string | number)[][]; empty: string }) {
  if (!rows.length) return <p className="mt-3 text-sm text-cinza-texto">{empty}</p>
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-xs text-cinza-texto">{head.map((h, i) => <th key={h} className={`pb-2 font-medium ${i ? 'text-right' : ''}`}>{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-cinza">
          {rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`py-2 ${j ? 'text-right tabular-nums' : ''}`}>{c}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  )
}
