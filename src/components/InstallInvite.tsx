import { Share, SquarePlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clearJustInstalled, dismissInvite, installMode, promptInstall, useInstallState, wasJustInstalled } from '../lib/install'
import { Button, LumiMark } from './ui'

/**
 * Convite para instalar o LUMI no celular — pensado para crianças: uma explicação curta,
 * um botão grande e a instalação oficial do navegador (sem APK, sem baixar arquivo).
 */
export function InstallInvite({ open, onClose }: { open: boolean; onClose: () => void }) {
  useInstallState()
  const nav = useNavigate()
  const mode = installMode()
  const installed = wasJustInstalled()

  if (installed) {
    return (
      <Sheet>
        <p className="text-5xl">🎉</p>
        <h2 className="mt-2 text-2xl font-bold">Pronto!</h2>
        <p className="mt-2 text-cinza-texto">O LUMI foi instalado no seu celular. Agora você pode acessar seus estudos direto pela tela inicial.</p>
        <Button className="mt-6 w-full" onClick={() => { clearJustInstalled(); onClose(); nav('/') }}>Começar a estudar</Button>
      </Sheet>
    )
  }
  if (!open || mode === 'none') return null

  const later = () => { dismissInvite(); onClose() }

  return (
    <Sheet onBackdrop={later}>
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-grafite"><LumiMark size={44} pageColor="#F8FAFC" /></div>
      <h2 className="mt-4 text-xl font-bold">📱 Quer ter o LUMI no seu celular?</h2>
      <p className="mt-2 text-cinza-texto">Instale o LUMI para acessar seus estudos de forma rápida e fácil.</p>

      {mode === 'ios' && (
        <ol className="mt-5 space-y-3 text-left">
          <li className="flex items-center gap-3 rounded-2xl bg-offwhite p-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#007AFF] shadow-sm"><Share size={22} /></span>
            <span>1. Toque no botão <b>Compartilhar</b>, na barra do Safari.</span>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-offwhite p-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white shadow-sm"><SquarePlus size={22} /></span>
            <span>2. Escolha <b>Adicionar à Tela de Início</b> e toque em <b>Adicionar</b>.</span>
          </li>
        </ol>
      )}

      <p className="mt-5 rounded-2xl bg-sucesso-suave p-3 text-left text-sm">
        🔒 <b>É seguro instalar o LUMI.</b> A instalação adiciona o LUMI à tela inicial do seu celular para você acessar seus estudos com mais facilidade.
      </p>

      <div className="mt-5 grid gap-2">
        {mode === 'prompt' && <Button onClick={async () => { const r = await promptInstall(); if (r !== 'accepted') later() }}>📲 Instalar LUMI</Button>}
        {mode === 'ios' && <Button onClick={later}>Entendi</Button>}
        <Button variant="ghost" onClick={later}>Continuar pelo navegador</Button>
      </div>
    </Sheet>
  )
}

function Sheet({ children, onBackdrop }: { children: React.ReactNode; onBackdrop?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-grafite/60 sm:items-center" role="dialog" aria-modal="true" onClick={onBackdrop}>
      <div className="safe-bottom w-full max-w-md animate-rise rounded-t-3xl bg-white px-6 pt-6 text-center sm:rounded-3xl sm:pb-6" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
