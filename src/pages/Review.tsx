import { useMemo } from 'react'
import { ArrowRight, Lightbulb } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Card, Page, TopBar } from '../components/ui'
import { localReexplain } from '../lib/ai'
import { buildReviewLesson } from '../lib/review'
import { getState } from '../lib/store'

export default function ReviewPage() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const of = params.get('de') ?? undefined
  const review = useMemo(() => buildReviewLesson(getState(), of), [of])

  if (!review) {
    return (
      <>
        <TopBar title="Revisar" />
        <Page>
          <Card className="text-center">
            <p className="text-4xl">✨</p>
            <h2 className="mt-2 text-xl font-semibold">Nada para revisar por enquanto</h2>
            <p className="mt-2 text-cinza-texto">Quando você errar alguma parte de uma atividade, eu guardo aqui e preparo uma revisão curta para você.</p>
            <Link to="/" className="mt-5 inline-block font-semibold text-laranja">Estudar algo novo</Link>
          </Card>
        </Page>
      </>
    )
  }

  return (
    <>
      <TopBar title="🔄 Revisar meus estudos" />
      <Page>
        <div className="animate-rise">
          <p className="text-lg">{review.summary}</p>
          <h2 className="mt-1 text-2xl font-bold">Vamos revisar?</h2>
          <div className="mt-5 space-y-4">
            {review.blocks.map((b) => (
              <Card key={b.id}>
                <p className="text-sm font-semibold text-laranja-escuro">{review.skills[b.skill ?? ''] ?? b.title}</p>
                <h3 className="mt-1 text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 leading-relaxed">{localReexplain(b, 'simples')}</p>
                {b.example && (
                  <p className="mt-3 flex gap-2 rounded-2xl bg-laranja-suave p-3 text-sm"><Lightbulb size={18} className="shrink-0 text-laranja" /> {b.example}</p>
                )}
              </Card>
            ))}
          </div>
          <Button className="mt-6 w-full" onClick={() => nav(`/aula/revisao/exercicios${of ? `?de=${of}` : ''}`)}>
            Começar revisão ({review.questions.length} questões) <ArrowRight size={18} />
          </Button>
        </div>
      </Page>
    </>
  )
}
