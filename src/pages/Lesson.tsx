import { useState } from 'react'
import { ArrowRight, CircleHelp, Lightbulb } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Page, ProgressBar, TopBar } from '../components/ui'
import { LEVELS, subjectById } from '../content/subjects'
import { aiEnabled, aiReexplain, localReexplain } from '../lib/ai'
import { getLesson } from '../lib/repo'
import { useLumi } from '../lib/store'
import type { Block, LevelId, ReexplainMode } from '../types'

const MODES: { id: ReexplainMode; label: string; emoji: string }[] = [
  { id: 'simples', label: 'Mais simples', emoji: '🧒' },
  { id: 'exemplo', label: 'Com exemplo', emoji: '💡' },
  { id: 'outra', label: 'De outra maneira', emoji: '🔄' },
  { id: 'detalhado', label: 'Mais detalhado', emoji: '📚' },
]

/** texto principal do bloco adaptado à série: no 1º ao 5º ano, começa pela versão simples quando existir */
function adaptedText(block: Block, level?: LevelId) {
  if (level === 'fund1' && block.variants?.simples) return block.variants.simples
  return block.text
}

export default function LessonPage() {
  const { id = '' } = useParams()
  const nav = useNavigate()
  const lesson = getLesson(id)
  const level = useLumi((s) => s.profile.level)
  const [step, setStep] = useState(-1) // -1 = introdução
  const [askMode, setAskMode] = useState(false)
  const [alt, setAlt] = useState<{ mode: ReexplainMode; text: string; used: ReexplainMode[] } | null>(null)
  const [loadingAlt, setLoadingAlt] = useState(false)

  if (!lesson) {
    return (
      <>
        <TopBar title="Aula" />
        <Page><Card><p>Não encontrei essa aula neste aparelho.</p><Link className="mt-3 inline-block font-semibold text-laranja" to="/">Voltar ao início</Link></Card></Page>
      </>
    )
  }

  const subject = subjectById(lesson.subject)
  const block = step >= 0 ? lesson.blocks[step] : undefined
  const levelMismatch = !!level && !lesson.levels.includes(level)
  const levelLabel = LEVELS.find((l) => l.id === level)?.label

  const reexplain = async (mode: ReexplainMode) => {
    if (!block) return
    setAskMode(false)
    setLoadingAlt(true)
    let text = localReexplain(block, mode)
    // no 1º ao 5º ano a versão simples já é o texto principal — repetir não ajuda
    const shownAsMain = level === 'fund1' && mode === 'simples' && !!block.variants?.simples
    if (shownAsMain) text = block.example ? `Vamos com calma, uma ideia de cada vez. Pense assim: ${block.example}` : localReexplain(block, 'outra')
    // a variação escrita na base tem prioridade; a IA entra quando não há uma pronta ou o aluno já viu essa
    const alreadyUsed = alt?.used.includes(mode) || shownAsMain
    if (aiEnabled && (!block.variants?.[mode] || alreadyUsed)) {
      try {
        text = await aiReexplain({ lessonTitle: lesson.title, block, mode, level })
      } catch {
        /* segue com a versão local */
      }
    }
    setAlt({ mode, text, used: [...(alt?.used ?? []), mode] })
    setLoadingAlt(false)
  }

  const next = () => {
    setAlt(null)
    setAskMode(false)
    if (step + 1 < lesson.blocks.length) {
      setStep(step + 1)
      window.scrollTo({ top: 0 })
    } else nav(`/aula/${lesson.id}/exercicios`)
  }

  return (
    <>
      <TopBar title={subject?.name ?? 'Aula'} right={step >= 0 ? `${step + 1}/${lesson.blocks.length}` : undefined} />
      <Page>
        {step >= 0 && <ProgressBar value={((step + 1) / lesson.blocks.length) * 100} className="mb-5" />}

        {step === -1 && (
          <div className="animate-rise">
            <p className="text-sm font-medium uppercase tracking-wide text-laranja">{subject?.name}</p>
            <h1 className="mt-1 text-3xl font-bold">{lesson.title}</h1>
            <p className="mt-3 text-lg text-grafite-3">{lesson.intro}</p>
            {lesson.summary && <p className="mt-3 text-cinza-texto">{lesson.summary}</p>}

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

            <Card className="mt-6">
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

            {!!lesson.sources?.length && (
              <details className="mt-4 rounded-2xl border border-cinza bg-white p-4 text-sm">
                <summary className="cursor-pointer font-medium">📚 Fontes deste conteúdo</summary>
                <ul className="mt-2 space-y-1 text-cinza-texto">
                  {lesson.sources.map((src, i) => (
                    <li key={i}>• {src.url ? <a href={src.url} target="_blank" rel="noreferrer noopener" className="underline hover:text-grafite">{src.title}</a> : src.title}</li>
                  ))}
                </ul>
              </details>
            )}

            <div className="mt-6 flex items-center gap-3 text-sm text-cinza-texto">
              <span>📖 {lesson.blocks.length} partes curtas</span>
              <span>✏️ {Math.min(10, lesson.questions.length)} exercícios</span>
            </div>
            <Button className="mt-6 w-full" onClick={() => setStep(0)}>Vamos entender juntos <ArrowRight size={18} /></Button>
            <button onClick={() => nav(`/aula/${lesson.id}/exercicios`)} className="mt-3 w-full py-2 text-sm font-medium text-cinza-texto hover:text-grafite">Já sei o conteúdo, quero praticar</button>
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
                <p className="mb-1 text-sm font-semibold text-laranja-escuro">{MODES.find((m) => m.id === alt.mode)?.emoji} {MODES.find((m) => m.id === alt.mode)?.label}</p>
                <p className="leading-relaxed">{alt.text}</p>
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

            <div className="mt-8 grid gap-3">
              <Button onClick={next}>{step + 1 < lesson.blocks.length ? 'Entendi, continuar' : 'Hora de praticar!'} <ArrowRight size={18} /></Button>
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
