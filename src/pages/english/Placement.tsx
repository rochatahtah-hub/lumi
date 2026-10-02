import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { MASCOT } from '../../assets/lumi'
import { Button, Card, Page, ProgressBar, TopBar } from '../../components/ui'
import { langById } from '../../content/languages'
import type { PlacementItem } from '../../content/english/placement'
import { estimateLevel } from '../../lib/english'
import { recordPlacement } from '../../lib/store'
import { shuffle } from '../../lib/text'
import { CEFR_LEVELS, type CefrLevel } from '../../types'

const MAX_QUESTIONS = 12

/**
 * Nivelamento adaptativo: começa no A2; acertou → sobe um nível, errou → desce.
 * Para em 12 perguntas (ou quando acabam as do nível). O resultado é uma ESTIMATIVA do LUMI.
 */
export default function Placement() {
  const L = langById(useParams().lang)
  if (!L) return <Navigate to="/idiomas" replace />
  return <PlacementTest key={L.id} langId={L.id} />
}

function PlacementTest({ langId }: { langId: NonNullable<ReturnType<typeof langById>>['id'] }) {
  const L = langById(langId)!
  const home = `/idiomas/${L.id}`
  const nav = useNavigate()
  const bank = useMemo(() => Object.fromEntries(CEFR_LEVELS.map((lv) => [lv, shuffle(L.placement.filter((q) => q.level === lv))])) as Record<CefrLevel, PlacementItem[]>, [L])
  const [started, setStarted] = useState(false)
  const [lvl, setLvl] = useState(1)
  const [asked, setAsked] = useState<{ item: PlacementItem; right: boolean }[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [result, setResult] = useState<CefrLevel | null>(null)

  const usedIn = (lv: CefrLevel) => asked.filter((a) => a.item.level === lv).length
  const current = bank[CEFR_LEVELS[lvl]][usedIn(CEFR_LEVELS[lvl])]

  const answer = (val: number | null = picked) => {
    if (val === null || !current) return
    const right = val === current.answer
    const next = [...asked, { item: current, right }]
    setAsked(next)
    setPicked(null)
    let nl = Math.max(0, Math.min(CEFR_LEVELS.length - 1, lvl + (right ? 1 : -1)))
    // nível sem perguntas sobrando: tenta o vizinho
    const left = (i: number) => bank[CEFR_LEVELS[i]].length - next.filter((a) => a.item.level === CEFR_LEVELS[i]).length
    if (!left(nl)) nl = [nl - 1, nl + 1, lvl].find((i) => i >= 0 && i < CEFR_LEVELS.length && left(i) > 0) ?? -1
    if (next.length >= MAX_QUESTIONS || nl < 0) {
      const est = estimateLevel(next.map((a) => ({ level: a.item.level, right: a.right })))
      recordPlacement(est, next.filter((a) => a.right).length, next.length, L.id)
      setResult(est)
    } else setLvl(nl)
  }

  if (result) {
    const info = L.course.find((c) => c.id === result)!
    const prev = CEFR_LEVELS[CEFR_LEVELS.indexOf(result) - 1]
    return (
      <>
        <TopBar title="Teste de nivelamento" />
        <Page>
          <div className="rounded-3xl bg-grafite p-6 text-center text-offwhite">
            <img src={MASCOT.reactions.medium} alt="LUMI comemorando" className="mx-auto h-36 w-auto" />
            <p className="mt-3 text-sm text-offwhite/70">Seu nível estimado pelo LUMI é</p>
            <p className="text-5xl font-bold text-laranja">{result}</p>
            <p className="mt-1 font-semibold">{info.title}</p>
            <p className="mt-3 text-sm text-offwhite/80">{info.can}</p>
          </div>
          <p className="mt-4 text-center text-sm text-cinza-texto">Isto é uma estimativa para escolher o seu ponto de partida — não é uma certificação oficial. Você acertou {asked.filter((a) => a.right).length} de {asked.length}.</p>
          <Button className="mt-5 w-full" onClick={() => nav(home, { replace: true })}>Começar no {result} <ChevronRight size={18} /></Button>
          {prev && (
            <Button variant="outline" className="mt-3 w-full" onClick={() => { recordPlacement(prev, asked.filter((a) => a.right).length, asked.length, L.id); nav(home, { replace: true }) }}>Fazer revisão do {prev}</Button>
          )}
        </Page>
      </>
    )
  }

  if (!started) {
    return (
      <>
        <TopBar title={`${L.flag} Teste de nivelamento`} />
        <Page>
          <Card className="text-center">
            <img src={MASCOT.peek.look} alt="" aria-hidden className="mx-auto h-28 w-auto" />
            <h1 className="mt-2 text-2xl font-bold">Descubra por onde começar</h1>
            <p className="mt-2 text-cinza-texto">São até {MAX_QUESTIONS} perguntas rápidas. Elas ficam mais difíceis quando você acerta e mais fáceis quando erra. Não vale chutar: se não souber, tudo bem — é assim que o LUMI encontra o seu nível.</p>
            <Button className="mt-5 w-full" onClick={() => setStarted(true)}>Começar</Button>
            <button onClick={() => { recordPlacement('A1', 0, 0, L.id); nav(home, { replace: true }) }} className="mt-3 min-h-11 text-sm font-semibold text-laranja-escuro">Nunca estudei {L.name.toLowerCase()} — começar do A1</button>
          </Card>
        </Page>
      </>
    )
  }

  return (
    <>
      <TopBar title="Teste de nivelamento" right={`${asked.length + 1}/${MAX_QUESTIONS}`} />
      <Page>
        <ProgressBar value={(asked.length / MAX_QUESTIONS) * 100} className="mb-5" />
        {current && (
          <div key={asked.length} className="animate-rise">
            <p className="text-sm text-cinza-texto">Escolha a resposta correta · {L.ui.chooseAnswer}</p>
            <h2 className="mt-2 text-xl font-semibold">{current.prompt}</h2>
            <div className="mt-5 grid gap-3">
              {current.options.map((o, i) => (
                <button key={o} onClick={() => setPicked(i)} className={`min-h-14 rounded-2xl border-2 px-4 py-3 text-left font-medium ${picked === i ? 'border-laranja bg-laranja-suave' : 'border-cinza bg-white hover:border-laranja/60'}`}>{o}</button>
              ))}
            </div>
            <Button className="mt-6 w-full" disabled={picked === null} onClick={() => answer()}>Responder</Button>
            <button onClick={() => answer(-1)} className="mt-2 w-full text-sm text-cinza-texto">Não sei</button>
          </div>
        )}
      </Page>
    </>
  )
}
