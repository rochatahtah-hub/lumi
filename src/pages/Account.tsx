import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, CloudOff } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Card, Page, TopBar } from '../components/ui'
import { cloudEnabled, supabase } from '../lib/supabase'
import { setProfile, useLumi } from '../lib/store'
import { pullAndMerge } from '../lib/sync'

export default function AccountPage() {
  const userId = useLumi((s) => s.profile.userId)
  const nickname = useLumi((s) => s.profile.nickname)
  const [mode, setMode] = useState<'signup' | 'login' | 'reset'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [nick, setNick] = useState(nickname ?? '')
  const [accountEmail, setAccountEmail] = useState<string | null>(null)
  const [recovery, setRecovery] = useState(false)
  const nav = useNavigate()
  // volta = para onde ir depois de entrar (ex.: a área de Idiomas, que exige conta)
  const volta = useSearchParams()[0].get('volta')
  const back = volta && volta.startsWith('/') && !volta.startsWith('//') ? volta : null

  useEffect(() => {
    if (!supabase) return
    const { data } = supabase.auth.onAuthStateChange((event) => { if (event === 'PASSWORD_RECOVERY') setRecovery(true) })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!supabase || !userId) return
    void supabase.auth.getUser().then(({ data }) => setAccountEmail(data.user?.email ?? null))
  }, [userId])

  if (!cloudEnabled || !supabase) {
    return (
      <>
        <TopBar title="Minha conta" />
        <Page>
          <Card>
            <CloudOff className="text-cinza-texto" />
            <p className="mt-2 font-semibold">Seu progresso está salvo neste aparelho</p>
            <p className="mt-1 text-cinza-texto">A sincronização na nuvem ainda não está ativada nesta instalação do LUMI. Tudo continua funcionando normalmente sem conta.</p>
          </Card>
        </Page>
      </>
    )
  }
  const sb = supabase

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    try {
      if (mode === 'reset') {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/conta` })
        setMsg(error ? { ok: false, text: 'Não consegui enviar o e-mail agora.' } : { ok: true, text: 'Se o e-mail tiver conta, enviamos um link para criar uma nova senha.' })
        return
      }
      const { data, error } = mode === 'signup' ? await sb.auth.signUp({ email, password }) : await sb.auth.signInWithPassword({ email, password })
      if (error) {
        setMsg({ ok: false, text: error.message.includes('Invalid login') ? 'E-mail ou senha incorretos.' : error.message.includes('already') ? 'Esse e-mail já tem conta. Toque em "Já tenho conta".' : 'Não foi possível concluir. Confira os dados.' })
        return
      }
      if (data.user && data.session) {
        await pullAndMerge(data.user.id)
        setMsg({ ok: true, text: 'Pronto! Seu progresso agora fica salvo na nuvem.' })
        if (back) nav(back, { replace: true })
      } else {
        setMsg({ ok: true, text: 'Enviamos um e-mail de confirmação. Depois de confirmar, entre com seu e-mail e senha.' })
        setMode('login')
      }
    } finally {
      setBusy(false)
    }
  }

  if (recovery) {
    return (
      <>
        <TopBar title="Nova senha" />
        <Page>
          <form className="grid gap-3" onSubmit={async (e) => {
            e.preventDefault()
            const { error } = await sb.auth.updateUser({ password })
            setMsg(error ? { ok: false, text: 'Não foi possível trocar a senha.' } : { ok: true, text: 'Senha alterada!' })
            if (!error) setRecovery(false)
          }}>
            <input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nova senha (mínimo 8 caracteres)" className="min-h-13 rounded-2xl border-2 border-cinza bg-white px-4 outline-none focus:border-laranja" />
            {msg && <p className="rounded-2xl bg-erro-suave p-3 text-sm">{msg.text}</p>}
            <Button>Salvar nova senha</Button>
          </form>
        </Page>
      </>
    )
  }

  if (userId) {
    return (
      <>
        <TopBar title="Minha conta" />
        <Page>
          <Card>
            <CheckCircle2 className="text-sucesso" />
            <p className="mt-2 font-semibold">Progresso sincronizado</p>
            <p className="text-sm text-cinza-texto">{accountEmail ?? 'Conta conectada'}</p>
          </Card>
          <Card className="mt-4">
            <label className="font-semibold" htmlFor="nick">Como quer ser chamado(a)? <span className="font-normal text-cinza-texto">(opcional)</span></label>
            <p className="text-sm text-cinza-texto">Só um apelido. Não use seu nome completo.</p>
            <div className="mt-3 flex gap-2">
              <input id="nick" value={nick} onChange={(e) => setNick(e.target.value.slice(0, 20))} className="min-h-12 flex-1 rounded-2xl border-2 border-cinza px-4 outline-none focus:border-laranja" />
              <Button onClick={() => setProfile({ nickname: nick.trim() || undefined })}>Salvar</Button>
            </div>
          </Card>
          <Button variant="ghost" className="mt-4 w-full" onClick={async () => { await sb.auth.signOut(); setProfile({ userId: undefined }) }}>Sair da conta</Button>
          <p className="mt-2 text-center text-xs text-cinza-texto">Ao sair, o progresso continua neste aparelho.</p>
        </Page>
      </>
    )
  }

  return (
    <>
      <TopBar title="Salvar meu progresso" />
      <Page>
        <h1 className="text-xl font-semibold">{mode === 'signup' ? 'Criar conta gratuita' : mode === 'login' ? 'Entrar' : 'Recuperar senha'}</h1>
        <p className="mt-1 text-cinza-texto">Com conta, seu histórico fica salvo na nuvem. Pedimos só um e-mail e uma senha — nada de CPF, telefone ou endereço.</p>
        <p className="mt-2 rounded-2xl bg-laranja-suave p-3 text-sm">Tem menos de 18 anos? Peça para seu responsável criar a conta com o e-mail dele.</p>
        <form onSubmit={submit} className="mt-5 grid gap-3">
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="min-h-13 rounded-2xl border-2 border-cinza bg-white px-4 outline-none focus:border-laranja" />
          {mode !== 'reset' && (
            <input type="password" required minLength={8} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha (mínimo 8 caracteres)" className="min-h-13 rounded-2xl border-2 border-cinza bg-white px-4 outline-none focus:border-laranja" />
          )}
          {msg && <p className={`rounded-2xl p-3 text-sm ${msg.ok ? 'bg-sucesso-suave' : 'bg-erro-suave'}`} role="status">{msg.text}</p>}
          <Button disabled={busy}>{busy ? 'Aguarde…' : mode === 'signup' ? 'Criar conta' : mode === 'login' ? 'Entrar' : 'Enviar link'}</Button>
        </form>
        <div className="mt-4 flex flex-col items-center gap-2 text-sm">
          {mode !== 'login' && <button className="font-semibold text-laranja" onClick={() => setMode('login')}>Já tenho conta</button>}
          {mode !== 'signup' && <button className="font-semibold text-laranja" onClick={() => setMode('signup')}>Criar conta nova</button>}
          {mode === 'login' && <button className="text-cinza-texto" onClick={() => setMode('reset')}>Esqueci minha senha</button>}
          <Link to="/privacidade" className="text-cinza-texto underline">Como cuidamos dos seus dados</Link>
        </div>
      </Page>
    </>
  )
}
