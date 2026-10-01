import { ArrowRight, Lightbulb } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button, Card, Page, TopBar } from '../../components/ui'
import { localReexplain } from '../../lib/ai'
import { STATE_LABEL, buildEnglishReview, reviewId, unitReviewPicks } from '../../lib/english'
import { langById } from '../../content/languages'
import { resetVirtualLesson } from '../../lib/repo'
import { getState } from '../../lib/store'

/** "Hora de revisar": escolhe o que precisa de reforço e monta perguntas NOVAS do mesmo conceito */
export default function EnglishReview() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const lang = langById(useParams().lang)?.id ?? 'en'
  const unitId = params.get('unidade') ?? undefined
  const picks = unitReviewPicks(getState(), unitId, lang)
  const id = reviewId(lang, unitId)

  if (!picks.length || !buildEnglishReview(unitId, lang)) {
    return (
      <>
        <TopBar title="Hora de revisar" />
        <Page>
          <Card className="text-center">
            <p className="text-4xl">✨</p>
            <h2 className="mt-2 text-xl font-semibold">Nada para revisar agora</h2>
            <p className="mt-2 text-cinza-texto">Quando você errar alguma parte, ficar um tempo sem estudar um conteúdo ou tiver domínio baixo, ele aparece aqui.</p>
            <Link to={`/idiomas/${lang}`} className="mt-5 inline-block font-semibold text-laranja">Voltar à trilha</Link>
          </Card>
        </Page>
      </>
    )
  }

  const start = () => {
    resetVirtualLesson(id) // perguntas novas a cada revisão
    nav(`/aula/${id}/exercicios`)
  }
  return (
    <>
      <TopBar title="🔄 Hora de revisar" />
      <Page>
        <h1 className="text-2xl font-bold">Vamos revisar?</h1>
        <p className="mt-1 text-cinza-texto">Perguntas novas sobre o que você já estudou — nada de repetir exatamente as mesmas.</p>
        <div className="mt-5 space-y-3">
          {picks.map(({ lesson, reason, m }) => (
            <Card key={lesson.id}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold">{lesson.title}</p>
                <span className="rounded-full bg-laranja-suave px-2 py-0.5 text-xs font-semibold text-laranja-escuro">{STATE_LABEL[m.state]} · {m.mastery}%</span>
              </div>
              <p className="mt-1 text-sm text-cinza-texto">{reason}</p>
              {lesson.blocks[0] && (
                <p className="mt-3 flex gap-2 rounded-2xl bg-laranja-suave p-3 text-sm"><Lightbulb size={18} className="shrink-0 text-laranja" /> {localReexplain(lesson.blocks[0], 'simples')}</p>
              )}
            </Card>
          ))}
        </div>
        <Button className="mt-6 w-full" onClick={start}>Começar revisão <ArrowRight size={18} /></Button>
      </Page>
    </>
  )
}
