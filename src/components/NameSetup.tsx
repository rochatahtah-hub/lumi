import { useState, type FormEvent } from 'react'
import { MASCOT } from '../assets/lumi'
import { setPreferredName, useLumi } from '../lib/store'
import { Button, Card, Page, TopBar } from './ui'

interface NameSetupProps {
  onComplete?: () => void
}

/** Modal de escolha de nome logo após o login (se preferred_name não existir) */
export function NameSetup({ onComplete }: NameSetupProps) {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setPreferredName(name.trim())
    setSubmitted(true)
    setTimeout(() => onComplete?.(), 500)
  }

  if (submitted) return null

  return (
    <>
      <TopBar title="Bem-vindo! 💛" />
      <Page>
        <Card className="text-center">
          <img src={MASCOT.peek.wave} alt="" aria-hidden className="mx-auto h-28 w-auto" />
          <h1 className="mt-4 text-2xl font-bold">Como você gostaria de ser chamado? 💛</h1>
          <p className="mt-2 text-sm text-cinza-texto">Escolha o nome que o LUMI vai usar para falar com você nas saudações personalizadas.</p>

          <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite como quer ser chamado…"
              autoFocus
              maxLength={30}
              className="min-h-13 rounded-2xl border-2 border-cinza bg-white px-4 text-center outline-none focus:border-laranja"
            />
            <p className="text-xs text-cinza-texto">
              Exemplos: Ana, Bia, João, Ju, Dudu
            </p>
            <Button type="submit" className="w-full">
              Pronto! Chamar de {name || '…'}
            </Button>
          </form>

          <p className="mt-4 text-xs text-cinza-texto">Você pode mudar isso depois em Minha conta.</p>
        </Card>
      </Page>
    </>
  )
}

/** Hook para verificar se precisa de setup de nome */
export function useShouldSetupName(): boolean {
  const profile = useLumi((s) => s.profile)
  // Precisa de setup se tiver userId (logado) mas não tiver preferred_name
  return !!profile.userId && !profile.preferred_name
}
