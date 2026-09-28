import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/** símbolo LUMI: livro aberto + sol nascendo (mesmo desenho do ícone do app) */
export function LumiMark({ size = 40, pageColor = 'currentColor' }: { size?: number; pageColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <g stroke="#FF8A1F" strokeWidth="6" strokeLinecap="round">
        <line x1="50" y1="8" x2="50" y2="20" />
        <line x1="24" y1="18" x2="31" y2="27" />
        <line x1="76" y1="18" x2="69" y2="27" />
        <line x1="10" y1="38" x2="21" y2="41" />
        <line x1="90" y1="38" x2="79" y2="41" />
      </g>
      <path d="M30 52a20 20 0 0 1 40 0z" fill="#FF8A1F" />
      <path d="M47 90V60C39 51 27 47 12 47v30c15 0 27 4 35 13z" fill="#FF8A1F" />
      <path d="M53 90V60c8-9 20-13 35-13v30c-15 0-27 4-35 13z" fill={pageColor} />
    </svg>
  )
}

export function LumiLogo({ dark = true, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <LumiMark size={compact ? 36 : 52} pageColor={dark ? '#F8FAFC' : '#1B2430'} />
      <span className={`mt-1 font-bold tracking-tight ${compact ? 'text-2xl' : 'text-4xl'} ${dark ? 'text-offwhite' : 'text-grafite'}`}>
        LUM<span className="relative inline-block">ı<span className="absolute left-1/2 top-[0.12em] h-[0.19em] w-[0.19em] -translate-x-1/2 rounded-full bg-laranja" /></span>
      </span>
      {!compact && <span className={`text-sm ${dark ? 'text-offwhite/80' : 'text-cinza-texto'}`}>Aprender ficou mais simples.</span>}
    </div>
  )
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: 'bg-laranja text-white hover:bg-laranja-escuro shadow-sm shadow-laranja/30',
    secondary: 'bg-grafite text-offwhite hover:bg-grafite-2',
    outline: 'border-2 border-laranja text-laranja-escuro bg-white hover:bg-laranja-suave',
    ghost: 'text-grafite hover:bg-cinza/60',
  }
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-cinza bg-white p-5 shadow-sm ${className}`}>{children}</div>
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-cinza ${className}`} role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-gradient-to-r from-laranja to-laranja-claro transition-all duration-500" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}

/** cabeçalho das telas internas: voltar · título · contador (como "Matemática 4/10" da referência) */
export function TopBar({ title, right, onBack, close }: { title: string; right?: ReactNode; onBack?: () => void; close?: boolean }) {
  const nav = useNavigate()
  const back = onBack ?? (() => (history.length > 1 ? nav(-1) : nav('/')))
  return (
    <header className="safe-top sticky top-0 z-20 border-b border-cinza/70 bg-offwhite/95 pb-3 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-2 px-2">
      <button onClick={back} className="grid h-11 w-11 place-items-center rounded-full hover:bg-cinza/60" aria-label={close ? 'Fechar' : 'Voltar'}>
        {close ? <X size={22} /> : <ArrowLeft size={22} />}
      </button>
      <h1 className="flex-1 truncate text-lg font-semibold">{title}</h1>
      {right && <div className="pr-2 text-sm font-medium text-cinza-texto">{right}</div>}
      </div>
    </header>
  )
}

export function Spinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center" role="status">
      <div className="animate-pulse"><LumiMark size={64} pageColor="#1B2430" /></div>
      <p className="max-w-xs text-cinza-texto">{label}</p>
    </div>
  )
}

export function Page({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <main className={`mx-auto w-full max-w-2xl px-4 pb-28 pt-4 ${className}`}>{children}</main>
}
