import { ChevronRight, ClipboardCheck, Lock, RotateCcw } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MASCOT } from '../../assets/lumi'
import { Button, Card, Page, ProgressBar, TopBar } from '../../components/ui'
import { gamesForLesson } from '../../games/recommend'
import { gameById } from '../../games/registry'
import { MARK, PASS_UNIT, STATE_LABEL, buildTrail, unitById } from '../../lib/english'
import { getLesson, resetVirtualLesson } from '../../lib/repo'
import { getState, useLumi } from '../../lib/store'

export default function EnglishUnit() {
  const { id = '' } = useParams()
  const lang = unitById(id)?.lang ?? 'en'
  const nav = useNavigate()
  useLumi((s) => s.updatedAt)
  const u = buildTrail(getState(), lang).levels.flatMap((l) => l.units).find((x) => x.unit.id === id)
  if (!u) return <><TopBar title="Unidade" /><Page><Card>Unidade não encontrada.</Card></Page></>

  const startTest = () => {
    resetVirtualLesson(`avaliacao-${id}`) // cada avaliação sorteia perguntas novas
    nav(`/aula/avaliacao-${id}/exercicios`)
  }
  const firstGame = u.lessons.filter((l) => l.available && l.m?.completed).map((l) => getLesson(l.id)).find(Boolean)

  return (
    <>
      <TopBar title={`${u.level} · ${u.unit.title}`} />
      <Page>
        <p className="text-sm font-semibold text-laranja-escuro">{u.sectionTitle}</p>
        <h1 className="mt-1 text-2xl font-bold">{u.unit.title}</h1>
        <p className="text-cinza-texto">{u.unit.subtitle}</p>
        <Card className="mt-4 bg-laranja-suave">
          <p className="text-sm font-semibold text-laranja-escuro">🎯 Objetivo da unidade</p>
          <p className="mt-1">{u.unit.objective}</p>
        </Card>

        {!u.unlocked && (
          <Card className="mt-4 flex gap-3">
            <Lock className="shrink-0 text-cinza-texto" />
            <p className="text-sm">Esta unidade abre quando você passar na avaliação da unidade anterior (ou pelo teste de nivelamento). <Link to={`/idiomas/${lang}`} className="font-semibold text-laranja">Ver trilha</Link></p>
          </Card>
        )}

        <h2 className="mb-3 mt-6 font-semibold">Aulas</h2>
        <div className="space-y-3">
          {u.lessons.map((l, i) => {
            const open = l.available && l.mark !== 'locked'
            const inner = (
              <div className={`flex items-center gap-3 rounded-2xl border bg-white p-4 ${open ? 'border-cinza hover:border-laranja' : 'border-cinza/60 opacity-75'}`}>
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ${l.mark === 'current' ? 'bg-laranja text-white' : l.mark === 'mastered' ? 'bg-sucesso text-white' : l.mark === 'done' ? 'bg-sucesso-suave text-sucesso' : l.mark === 'review' ? 'bg-laranja-suave text-laranja-escuro' : 'bg-cinza/70 text-cinza-texto'}`}>{l.mark === 'open' ? i + 1 : MARK[l.mark].icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{l.title}</p>
                  <p className="text-xs text-cinza-texto">{!l.available ? 'Em produção' : l.m ? `${STATE_LABEL[l.m.state]} · domínio ${l.m.mastery}%` : ''}</p>
                  {l.reviewFirst && <p className="mt-1 text-xs font-medium text-laranja-escuro">Vamos revisar “{l.reviewFirst}” antes de continuar.</p>}
                </div>
                {open && <ChevronRight size={18} className="text-cinza-texto" />}
              </div>
            )
            return open ? <Link key={l.id} to={`/estudar?lesson=${l.id}`}>{inner}</Link> : <div key={l.id}>{inner}</div>
          })}
        </div>

        {u.unlocked && !u.planned && (
          <>
            <h2 className="mb-3 mt-7 font-semibold">Revisão e domínio</h2>
            <Card>
              <div className="flex items-center justify-between text-sm"><span>Domínio da unidade</span><b>{u.mastery}%</b></div>
              <ProgressBar value={u.mastery} className="mt-2" />
              {u.test && <p className="mt-3 text-sm">Melhor nota na avaliação: <b className={u.test.best >= PASS_UNIT ? 'text-sucesso' : 'text-laranja-escuro'}>{u.test.best}%</b> ({u.test.tries} {u.test.tries === 1 ? 'tentativa' : 'tentativas'})</p>}
              <div className="mt-4 grid gap-2">
                <Button variant="outline" onClick={() => nav(`/idiomas/${lang}/revisar?unidade=${id}`)}><RotateCcw size={18} /> Revisão da unidade</Button>
                <Button onClick={startTest} disabled={!u.testUnlocked}><ClipboardCheck size={18} /> {u.passed ? 'Refazer avaliação de domínio' : 'Avaliação de domínio'}</Button>
                {!u.testUnlocked && <p className="text-center text-xs text-cinza-texto">A avaliação abre quando você concluir todas as aulas desta unidade com pelo menos 60%.</p>}
              </div>
            </Card>
            {u.passed && (
              <div className="mt-4 flex items-center gap-3 rounded-3xl bg-grafite p-4 text-offwhite">
                <img src={MASCOT.reactions.medium} alt="" aria-hidden className="h-20 w-auto" />
                <p className="flex-1 font-semibold">Unidade dominada! A próxima já está liberada. 🎉</p>
              </div>
            )}
            {firstGame && (
              <Card className="mt-4">
                <p className="font-semibold">Quer revisar brincando?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {gamesForLesson(firstGame).map((g) => <Link key={g} to={`/jogos/${g}/${firstGame.id}`} className="rounded-full bg-laranja-suave px-3 py-1.5 text-sm font-medium text-laranja-escuro">{gameById(g)!.emoji} {gameById(g)!.name}</Link>)}
                </div>
              </Card>
            )}
          </>
        )}
      </Page>
    </>
  )
}
