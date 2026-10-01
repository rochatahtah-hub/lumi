// Área de Idiomas: exige conta (o progresso de cada idioma fica ligado a ela). A área escolar continua sem login.
// Mostra só os métodos de entrada que estão ATIVOS no Supabase (consulta /auth/v1/settings): Google e celular
// aparecem sozinhos quando forem habilitados no painel; o e-mail usa a tela de conta que já existe.
import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Mail, Smartphone } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cloudEnabled, supabase } from '../lib/supabase'
import { useLumi } from '../lib/store'
import { Button, Card, Page, TopBar } from './ui'

type Providers = { google: boolean; phone: boolean; email: boolean }
let cached: Promise<Providers> | undefined

function loadProviders(): Promise<Providers> {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
  if (!url || !key) return Promise.resolve({ google: false, phone: false, email: false })
  cached ??= fetch(`${url}/auth/v1/settings`, { headers: { apikey: key } })
    .then((r) => r.json())
    .then((j: { external?: Record<string, boolean> }) => ({ google: !!j.external?.google, phone: !!j.external?.phone, email: j.external?.email !== false }))
    .catch(() => ({ google: false, phone: false, email: true }))
  return cached
}

export function RequireAccount({ children }: { children: ReactNode }) {
  const userId = useLumi((s) => s.profile.userId)
  // sem nuvem configurada (instalação local/desenvolvimento) não há como entrar: a área funciona no aparelho
  if (userId || !cloudEnabled) return <>{children}</>
  return <LoginGate />
}

function LoginGate() {
  const { pathname } = useLocation()
  const [prov, setProv] = useState<Providers | null>(null)
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  useEffect(() => { void loadProviders().then(setProv) }, [])

  const google = async () => {
    setMsg(null)
    const { error } = await supabase!.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${location.origin}${pathname}` } })
    if (error) setMsg('Não foi possível abrir o login do Google agora.')
  }
  /** aceita (47) 99999-9999 e similares; o padrão é Brasil (+55) */
  const e164 = (v: string) => { const d = v.replace(/\D/g, ''); return d.startsWith('55') && d.length >= 12 ? `+${d}` : `+55${d}` }
  const sendCode = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true); setMsg(null)
    const { error } = await supabase!.auth.signInWithOtp({ phone: e164(phone) })
    setBusy(false)
    if (error) setMsg('Não consegui enviar o código. Confira o número.')
    else setSent(true)
  }
  const verify = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true); setMsg(null)
    const { error } = await supabase!.auth.verifyOtp({ phone: e164(phone), token: code.trim(), type: 'sms' })
    setBusy(false)
    if (error) setMsg('Código incorreto ou expirado.')
  }

  return (
    <>
      <TopBar title="🌎 Idiomas" />
      <Page>
        <img src={new URL('../assets/idiomas-login.png', import.meta.url).href} alt="Entre para estudar idiomas" className="w-full rounded-3xl shadow-lg" />
        {!prov ? (
          <p className="mt-5 text-center text-sm text-cinza-texto">Carregando…</p>
        ) : (
          <div className="mt-5 grid gap-3">
            {prov.google && (
              <Button onClick={() => void google()} className="w-full">
                <span aria-hidden className="grid h-6 w-6 place-items-center rounded-full bg-white text-sm font-bold text-grafite">G</span> Entrar com Google
              </Button>
            )}
            {prov.phone && (
              <Card>
                <p className="flex items-center gap-2 font-semibold"><Smartphone size={18} className="text-laranja" /> Entrar com celular</p>
                {!sent ? (
                  <form onSubmit={sendCode} className="mt-3 grid gap-2">
                    <label className="text-sm text-cinza-texto" htmlFor="tel">Número com DDD</label>
                    <input id="tel" type="tel" inputMode="tel" autoComplete="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(47) 99999-9999" className="min-h-13 rounded-2xl border-2 border-cinza bg-white px-4 outline-none focus:border-laranja" />
                    <Button type="submit" disabled={busy}>Receber código por SMS</Button>
                  </form>
                ) : (
                  <form onSubmit={verify} className="mt-3 grid gap-2">
                    <label className="text-sm text-cinza-texto" htmlFor="otp">Código recebido por SMS</label>
                    <input id="otp" inputMode="numeric" autoComplete="one-time-code" required value={code} onChange={(e) => setCode(e.target.value)} className="min-h-13 rounded-2xl border-2 border-cinza bg-white px-4 text-center text-lg tracking-widest outline-none focus:border-laranja" />
                    <Button type="submit" disabled={busy}>Entrar</Button>
                    <button type="button" onClick={() => { setSent(false); setCode('') }} className="min-h-11 text-sm font-semibold text-laranja-escuro">Trocar número</button>
                  </form>
                )}
              </Card>
            )}
            {prov.email && (
              <Link to={`/conta?volta=${encodeURIComponent(pathname)}`} className="flex min-h-13 items-center justify-center gap-2 rounded-2xl border-2 border-cinza bg-white px-4 font-semibold hover:border-laranja">
                <Mail size={18} className="text-laranja" /> Entrar ou criar conta com e-mail
              </Link>
            )}
            {msg && <p role="alert" className="text-center text-sm font-medium text-erro">{msg}</p>}
          </div>
        )}
      </Page>
    </>
  )
}
