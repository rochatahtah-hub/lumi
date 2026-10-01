import { setSpeechLocale } from '../lib/speech'
import { localeOfSubject } from '../content/languages'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight, CircleHelp, Lightbulb } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button, Card, Page, ProgressBar, TopBar } from '../components/ui'
import { LEVELS, subjectById } from '../content/subjects'
import { aiEnabled, aiReexplain, localReexplain } from '../lib/ai'
import { getLesson } from '../lib/repo'
import { getState, markLessonViewed, setState, useLumi } from '../lib/store'
import { EnglishPractice, GrammarBox, VocabularyList } from '../components/english/EnglishPractice'
import { unitOfLesson } from '../lib/english'
import { langOfSubject } from '../content/languages'
import type { Block, LevelId, ReexplainMode } from '../types'

/** as reformulações da base: muito simples, exemplo do cotidiano, passo a passo, comparando (+ detalhada) */
const MODES: { id: ReexplainMode; label: string; emoji: string }[] = [
  { id: 'simples', label: 'Mais simples', emoji: '🧒' },
  { id: 'exemplo', label: 'Com exemplo', emoji: '💡' },
  { id: 'passos', label: 'Passo a passo', emoji: '🪜' },
  { id: 'compara', label: 'Comparando', emoji: '⚖️' },
  { id: 'detalhado', label: 'Mais detalhado', emoji: '📚' },
]
const isMode = (m: string | null): m is ReexplainMode => !!m && ['simples', 'exemplo', 'passos', 'compara', 'outra', 'detalhado'].includes(m)

/** texto principal do bloco adaptado à série: no 1º ao 5º ano, começa pela versão simples quando existir */
function adaptedText(block: Block, level?: LevelId) {
  if (level === 'fund1' && block.variants?.simples) return block.variants.simples
  return block.text
}

export default function LessonPage() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const nav = useNavigate()
  const lesson = getLesson(id)
  if (lesson) setSpeechLocale(localeOfSubject(lesson.subject))
  const level = useLumi((s) => s.profile.level)
  const startMode = params.get('modo')
  const [step, setStep] = useState(isMode(startMode) ? 0 : -1) // -1 = introdução
  const [askMode, setAskMode] = useState(false)
  const [alt, setAlt] = useState<{ mode: ReexplainMode; text: string; used: ReexplainMode[] } | null>(null)
  const [loadingAlt, setLoadingAlt] = useState(false)
  const autoRan = useRef(false)

  const block = lesson && step >= 0 ? lesson.blocks[step] : undefined

  const reexplain = async (mode: ReexplainMode) => {
    if (!block || !lesson) return
    setAskMode(false)
    setLoadingAlt(true)
    let text = localReexplain(block, mode)
    // no 1º ao 5º ano a versão simples já é o texto principal — repetir não ajuda
    const shownAsMain = level === 'fund1' && mode === 'simples' && !!block.variants?.simples
    if (shownAsMain) text = block.variants?.exemplo ?? block.example ?? localReexplain(block, 'passos')
    // a reformulação da base tem prioridade; a IA só entra quando não há uma pronta ou o aluno já viu essa
    const alreadyUsed = alt?.used.includes(mode) || shownAsMain
    if (aiEnabled && (!block.variants?.[mode] || alreadyUsed) && mode !== 'passos' && mode !== 'compara') {
      try {
        text = await aiReexplain({ lessonTitle: lesson.title, block, mode, level })
      } catch {
        /* segue com a versão da base */
      }
    }
    setAlt({ mode, text, used: [...(alt?.used ?? []), mode] })
    setLoadingAlt(false)
  }

  useEffect(() => {
    if (lesson && lesson.origin !== 'colado' && getState().lastLessonId !== lesson.id) setState((s) => ({ ...s, lastLessonId: lesson.id }))
    if (lesson?.english) markLessonViewed(lesson.id)
  }, [lesson])

  // veio de "não entendi…", "me dá um exemplo…": já abre a reformulação pedida
  useEffect(() => {
    if (autoRan.current || !isMode(startMode) || !block) return
    autoRan.current = true
    void reexplain(startMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block])

  if (!lesson) {
    return (
      <>
        <TopBar title="Aula" />
        <Page><Card><p>Não encontrei essa aula neste aparelho.</p><Link className="mt-3 inline-block font-semibold text-laranja" to="/">Voltar ao início</Link></Card></Page>
      </>
    )
  }

  const subject = subjectById(lesson.subject)
  const levelMismatch = !!level && !lesson.levels.includes(level)
  const levelLabel = LEVELS.find((l) => l.id === level)?.label
  const prereqs = (lesson.prerequisites ?? []).map((pid) => getLesson(pid)).filter((x) => !!x)

  // Inglês: depois dos blocos vem a etapa de prática (vocabulário, gramática, reading, listening, speaking, writing)
  const steps = lesson.blocks.length + (lesson.english ? 1 : 0)
  const practice = !!lesson.english && step === lesson.blocks.length
  const unit = lesson.english ? unitOfLesson(lesson.id) : undefined
  const next = () => {
    setAlt(null)
    setAskMode(false)
    if (step + 1 < steps) {
      setStep(step + 1)
      window.scrollTo({ top: 0 })
    } else nav(`/aula/${lesson.id}/exercicios`)
  }

  return (
    <>
      <TopBar title={subject?.name ?? 'Aula'} right={step >= 0 ? `${step + 1}/${steps}` : undefined} />
      <Page>
        {step >= 0 && <ProgressBar value={((step + 1) / steps) * 100} className="mb-5" />}

        {step === -1 && (
          <div className="animate-rise">
            <p className="text-sm font-medium uppercase tracking-wide text-laranja">{subject?.name}{lesson.subtopic && lesson.subtopic !== lesson.title ? ` · ${lesson.topic ?? ''}` : ''}</p>
            <h1 className="mt-1 text-3xl font-bold">{lesson.title}</h1>
            <p className="mt-3 text-lg text-grafite-3">{lesson.intro}</p>
            {lesson.summary && <p className="mt-3 text-cinza-texto">{lesson.summary}</p>}
            {lesson.enem && <p className="mt-3 inline-block rounded-full bg-grafite px-3 py-1 text-xs font-medium text-offwhite">🎯 ENEM: {lesson.enem}</p>}
            {lesson.english && (
              <Link to={unit ? `/idiomas/${unit.lang}/unidade/${unit.id}` : `/idiomas/${langOfSubject(lesson.subject)?.id ?? 'en'}`} className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full bg-laranja-suave px-3 py-1 text-xs font-semibold text-laranja-escuro">
                {langOfSubject(lesson.subject)?.flag ?? '🌎'} {lesson.english.cefr}{unit ? ` · ${unit.title}` : ''} · ver trilha
              </Link>
            )}

            {lesson.unreviewed && (
              <div className="mt-4 flex gap-3 rounded-2xl bg-laranja-suave p-4 text-sm" role="note">
                <span className="text-lg">🔎</span>
                <p>
                  Este assunto ainda não estava na base do LUMI, então o professor digital
                  {lesson.sources?.some((s) => s.kind === 'site' && s.url) ? ' pesquisou em fontes confiáveis e preparou este conteúdo' : ' preparou este conteúdo'} para você.
                  A equipe do LUMI vai revisá-lo.
                </p>
              </div>
            )}

            {lesson.objective && (
              <Card className="mt-5">
                <p className="text-sm font-semibold text-laranja-escuro">🎯 Ao final você vai saber</p>
                <p className="mt-1">{lesson.objective}</p>
              </Card>
            )}

            {prereqs.length > 0 && (
              <p className="mt-4 text-sm text-cinza-texto">
                Antes, é bom saber: {prereqs.map((p, i) => <span key={p.id}>{i > 0 && ', '}<Link to={`/aula/${p.id}`} className="font-medium text-laranja-escuro underline">{p.title}</Link></span>)}
              </p>
            )}

            <Card className="mt-4">
              <p className="text-sm text-cinza-texto">Explicação para</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{levelLabel ?? 'Qualquer série'}</p>
                <Link to="/nivel" className="text-sm font-semibold text-laranja">trocar</Link>
              </div>
              {levelMismatch && (
                <div className="mt-3 rounded-2xl bg-laranja-suave p-3 text-sm text-grafite">
                  Este conteúdo costuma ser estudado no {lesson.grade || 'outro nível'}. Vou explicar do jeito mais claro possível — use o "Não entendi" sempre que precisar.
                </div>
              )}
            </Card>

            <div className="mt-6 flex items-center gap-3 text-sm text-cinza-texto">
              <span>📖 {lesson.blocks.length} partes curtas</span>
              {lesson.english && <span>🎧 prática de {(langOfSubject(lesson.subject)?.name ?? 'idioma').toLowerCase()}</span>}
              <span>✏️ {Math.min(10, lesson.questions.length)} exercícios</span>
            </div>
            <Button className="mt-4 w-full" onClick={() => setStep(0)}>Vamos entender juntos <ArrowRight size={18} /></Button>
            <button onClick={() => nav(`/aula/${lesson.id}/exercicios`)} className="mt-3 w-full py-2 text-sm font-medium text-cinza-texto hover:text-grafite">Já sei o conteúdo, quero praticar</button>

            <div className="mt-6 space-y-3">
              <Reference lesson={lesson} />
              {!!lesson.sources?.length && (
                <Details title="📚 Fontes deste conteúdo">
                  <ul className="space-y-1 text-cinza-texto">
                    {lesson.sources.map((src, i) => (
                      <li key={i}>• {src.url ? <a href={src.url} target="_blank" rel="noreferrer noopener" className="underline hover:text-grafite">{src.title}</a> : src.title}{src.author ? ` — ${src.author}` : ''}{src.accessedAt ? ` (acesso em ${new Date(src.accessedAt + 'T12:00').toLocaleDateString('pt-BR')})` : ''}</li>
                    ))}
                  </ul>
                </Details>
              )}
            </div>
          </div>
        )}

        {practice && (
          <div className="animate-rise">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-laranja">Pratique · Practice</h2>
            <h1 className="mt-1 mb-4 text-2xl font-bold">{lesson.title}</h1>
            <EnglishPractice lesson={lesson} />
            <Button className="mt-6 w-full" onClick={next}>Hora dos exercícios! <ArrowRight size={18} /></Button>
          </div>
        )}

        {block && (
          <div key={block.id} className="animate-rise">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-laranja">{step === 0 ? 'Vamos entender' : lesson.title}</h2>
            <h1 className="mt-1 text-2xl font-bold">{block.title}</h1>
            <p className="mt-4 text-lg leading-relaxed">{adaptedText(block, level)}</p>

            {block.example && (
              <div className="mt-5 flex gap-3 rounded-2xl bg-laranja-suave p-4">
                <Lightbulb size={22} className="mt-0.5 shrink-0 text-laranja" />
                <p className="leading-relaxed"><span className="font-semibold">Exemplo: </span>{block.example}</p>
              </div>
            )}

            {loadingAlt && <p className="mt-5 animate-pulse text-cinza-texto">Pensando em outro jeito de explicar…</p>}
            {alt && !loadingAlt && (
              <div className="mt-5 animate-rise rounded-2xl border-2 border-laranja/40 bg-white p-4" aria-live="polite">
                <p className="mb-1 text-sm font-semibold text-laranja-escuro">{MODES.find((m) => m.id === alt.mode)?.emoji} {MODES.find((m) => m.id === alt.mode)?.label ?? 'De outra maneira'}</p>
                <p className="whitespace-pre-line leading-relaxed">{alt.text}</p>
              </div>
            )}

            {askMode && (
              <div className="mt-5 animate-rise">
                <p className="mb-3 font-semibold">Como você quer que eu explique?</p>
                <div className="grid grid-cols-2 gap-3">
                  {MODES.map((m) => (
                    <button key={m.id} onClick={() => reexplain(m.id)} className="flex min-h-16 flex-col items-start justify-center rounded-2xl border-2 border-cinza bg-white px-4 text-left hover:border-laranja">
                      <span className="text-xl">{m.emoji}</span>
                      <span className="text-sm font-semibold">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step + 1 === lesson.blocks.length && !!lesson.commonErrors?.length && (
              <Card className="mt-5 border-erro/30">
                <p className="font-semibold">⚠️ Cuidado com estes erros comuns</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-grafite-3">{lesson.commonErrors.map((e) => <li key={e}>{e}</li>)}</ul>
              </Card>
            )}

            <div className="mt-8 grid gap-3">
              <Button onClick={next}>{step + 1 < steps ? 'Entendi, continuar' : 'Hora de praticar!'} <ArrowRight size={18} /></Button>
              {!askMode && (
                <Button variant="ghost" onClick={() => setAskMode(true)}><CircleHelp size={18} /> Não entendi</Button>
              )}
            </div>
          </div>
        )}
      </Page>
    </>
  )
}

function Details({ title, children, open }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="rounded-2xl border border-cinza bg-white p-4 text-sm">
      <summary className="cursor-pointer font-medium">{title}</summary>
      <div className="mt-3">{children}</div>
    </details>
  )
}

/** material de consulta: fórmulas, linha do tempo, dúvidas e erros comuns */
function Reference({ lesson }: { lesson: NonNullable<ReturnType<typeof getLesson>> }) {
  const h = lesson.history
  return (
    <>
      {!!lesson.english?.vocabulary?.length && <Details title="📚 Vocabulário da aula"><VocabularyList lesson={lesson} /></Details>}
      {lesson.english?.grammar && <Details title="🔤 Gramática"><GrammarBox lesson={lesson} /></Details>}
      {!!lesson.formulas?.length && (
        <Details title="📐 Fórmulas">
          <div className="space-y-4">
            {lesson.formulas.map((f) => (
              <div key={f.name}>
                <p className="font-semibold">{f.name}</p>
                <p className="mt-1 rounded-xl bg-offwhite px-3 py-2 font-mono text-base">{f.expression}</p>
                <ul className="mt-2 space-y-0.5 text-grafite-3">{f.variables.map((v) => <li key={v.symbol}><b className="font-mono">{v.symbol}</b> = {v.meaning}{v.unit ? ` (${v.unit})` : ''}</li>)}</ul>
                {f.conditions && <p className="mt-1 text-xs text-cinza-texto">Quando usar: {f.conditions}</p>}
              </div>
            ))}
          </div>
        </Details>
      )}
      {h && (
        <Details title={`🕰️ Linha do tempo · ${h.period}`}>
          {h.place && <p className="mb-2 text-cinza-texto">📍 {h.place}</p>}
          <ol className="relative space-y-3 border-l-2 border-laranja/40 pl-4">
            {h.timeline.map((t) => (
              <li key={t.date + t.event}><span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-laranja" /><p className="font-semibold">{t.date}</p><p className="text-grafite-3">{t.event}</p></li>
            ))}
          </ol>
          {!!h.people?.length && (<><p className="mt-4 font-semibold">Personagens</p><ul className="mt-1 space-y-0.5 text-grafite-3">{h.people.map((p) => <li key={p.name}><b>{p.name}</b> — {p.role}</li>)}</ul></>)}
          {!!h.causes?.length && (<><p className="mt-4 font-semibold">Causas</p><ul className="mt-1 list-disc pl-5 text-grafite-3">{h.causes.map((c) => <li key={c}>{c}</li>)}</ul></>)}
          {!!h.consequences?.length && (<><p className="mt-4 font-semibold">Consequências</p><ul className="mt-1 list-disc pl-5 text-grafite-3">{h.consequences.map((c) => <li key={c}>{c}</li>)}</ul></>)}
          {!!h.interpretations?.length && (<><p className="mt-4 font-semibold">Diferentes interpretações</p><ul className="mt-1 list-disc pl-5 text-grafite-3">{h.interpretations.map((c) => <li key={c}>{c}</li>)}</ul></>)}
        </Details>
      )}
      {!!lesson.commonDoubts?.length && (
        <Details title="❓ Dúvidas comuns">
          <div className="space-y-3">{lesson.commonDoubts.map((d) => <div key={d.q}><p className="font-semibold">{d.q}</p><p className="text-grafite-3">{d.a}</p></div>)}</div>
        </Details>
      )}
      {!!lesson.commonErrors?.length && (
        <Details title="⚠️ Erros comuns">
          <ul className="list-disc space-y-1 pl-5 text-grafite-3">{lesson.commonErrors.map((e) => <li key={e}>{e}</li>)}</ul>
        </Details>
      )}
    </>
  )
}
