import { useState } from 'react'
import { ChevronRight, Download, FileText, GraduationCap, LayoutDashboard, RotateCcw, Shield, Smartphone, Trash2, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card, LumiMark, Page } from '../components/ui'
import { LEVELS } from '../content/subjects'
import { exportData, resetAll, useLumi } from '../lib/store'
import { installMode, isStandalone, requestInvite, useInstallState } from '../lib/install'

export default function MorePage() {
  const level = useLumi((s) => s.profile.level)
  const userId = useLumi((s) => s.profile.userId)
  const [confirmReset, setConfirmReset] = useState(false)
  useInstallState()

  const download = () => {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `lumi-meus-dados-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <div className="min-h-dvh">
      <header className="safe-top bg-grafite pb-6 text-offwhite">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 pt-2">
          <LumiMark size={40} pageColor="#F8FAFC" />
          <div><h1 className="text-2xl font-bold">Mais</h1><p className="text-sm text-offwhite/80">LUMI — Aprender ficou mais simples.</p></div>
        </div>
      </header>
      <Page>
        <Card className="p-0">
          <Row to="/nivel" icon={<GraduationCap size={20} />} title="Minha série" subtitle={LEVELS.find((l) => l.id === level)?.label ?? 'Não informada'} />
          <Row to="/colar" icon={<FileText size={20} />} title="Tenho um conteúdo para estudar" subtitle="Cole ou digite o que você recebeu na escola" />
          <Row to="/revisar" icon={<RotateCcw size={20} />} title="Revisar meus estudos" subtitle="Revisão curta dos pontos que você errou" />
          <Row to="/conta" icon={<UserRound size={20} />} title={userId ? 'Minha conta' : 'Salvar meu progresso'} subtitle={userId ? 'Progresso sincronizado na nuvem' : 'Opcional — crie uma conta gratuita'} last />
        </Card>

        {!isStandalone() && (
          <Card className="mt-4">
            <div className="flex items-start gap-3">
              <Smartphone size={22} className="mt-0.5 text-laranja" />
              <div className="flex-1">
                <p className="font-semibold">📱 Instalar o LUMI</p>
                {installMode() !== 'none' ? (
                  <>
                    <p className="text-sm text-cinza-texto">Coloque o LUMI na tela inicial e abra como um aplicativo.</p>
                    <Button className="mt-3" onClick={requestInvite}><Download size={18} /> Instalar o LUMI</Button>
                  </>
                ) : (
                  <p className="text-sm text-cinza-texto">Este navegador não oferece instalação direta. No celular, abra o LUMI pelo Chrome (Android) ou Safari (iPhone) para instalar.</p>
                )}
              </div>
            </div>
          </Card>
        )}

        <Card className="mt-4 p-0">
          <Row to="/privacidade" icon={<Shield size={20} />} title="Privacidade" subtitle="O que o LUMI guarda e o que não guarda" />
          <button onClick={download} className="flex w-full items-center gap-3 border-b border-cinza px-5 py-4 text-left hover:bg-offwhite">
            <Download size={20} className="text-grafite-3" />
            <span className="flex-1"><span className="block font-medium">Baixar meus dados</span><span className="block text-sm text-cinza-texto">Arquivo com todo o seu histórico</span></span>
          </button>
          {!confirmReset ? (
            <button onClick={() => setConfirmReset(true)} className="flex w-full items-center gap-3 px-5 py-4 text-left text-erro hover:bg-erro-suave">
              <Trash2 size={20} /><span className="font-medium">Apagar meus dados deste aparelho</span>
            </button>
          ) : (
            <div className="px-5 py-4">
              <p className="text-sm">Isso apaga progresso, pontos e conquistas <b>deste aparelho</b>. Não dá para desfazer.</p>
              <div className="mt-3 flex gap-2">
                <Button variant="ghost" onClick={() => setConfirmReset(false)}>Cancelar</Button>
                <Button className="!bg-erro" onClick={() => { resetAll(); setConfirmReset(false) }}>Apagar</Button>
              </div>
            </div>
          )}
        </Card>

        <Link to="/admin" className="mt-6 flex items-center justify-center gap-2 text-sm text-cinza-texto hover:text-grafite"><LayoutDashboard size={16} /> Área administrativa</Link>
      </Page>
    </div>
  )
}

function Row({ to, icon, title, subtitle, last }: { to: string; icon: React.ReactNode; title: string; subtitle: string; last?: boolean }) {
  return (
    <Link to={to} className={`flex items-center gap-3 px-5 py-4 hover:bg-offwhite ${last ? '' : 'border-b border-cinza'}`}>
      <span className="text-grafite-3">{icon}</span>
      <span className="flex-1"><span className="block font-medium">{title}</span><span className="block text-sm text-cinza-texto">{subtitle}</span></span>
      <ChevronRight size={18} className="text-cinza-texto" />
    </Link>
  )
}
