import { useState } from 'react'
import { ArrowRight, ChevronRight, ClipboardPaste, Lightbulb } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Page, Spinner, TopBar } from '../components/ui'
import { subjectById } from '../content/subjects'
import { aiEnabled, aiPasted, AiError } from '../lib/ai'
import { findLessons } from '../lib/matcher'
import { studyPastedLocally } from '../lib/pasted'
import { allLessons } from '../lib/repo'
import { saveCustomLesson, useLumi } from '../lib/store'
import type { Lesson } from '../types'

const MAX = 8000

/** "📄 Tenho um conteúdo para estudar" — só texto digitado ou colado (sem câmera, sem foto) */
export default function PastePage() {
  const nav = useNavigate()
  const level = useLumi((s) => s.profile.level)
  const age = useLumi((s) => s.profile.age)
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ lesson: Lesson; related?: Lesson; detectedSubject?: string } | null>(null)

  const pasteFromClipboard = async () => {
    try {
      const t = await navigator.clipboard.readText()
      if (t) setText((prev) => (prev ? `${prev}\n\n${t}` : t).slice(0, MAX))
    } catch {
      setError('Não consegui acessar a área de transferência. Toque no campo e use "Colar".')
    }
  }

  const organize = async () => {
    setError(null)
    setBusy(true)
    const lessons = allLessons()
    try {
      if (aiEnabled) {
        try {
          const lesson = await aiPasted({ content: text, level, age })
          const related = findLessons(lesson.title + ' ' + text.slice(0, 1500), lessons).find((m) => m.lesson.origin !== 'colado')?.lesson
          saveCustomLesson(lesson)
          setResult({ lesson, related, detectedSubject: lesson.subject })
          return
        } catch (e) {
          // conteúdo bloqueado não cai no modo local; os demais erros, sim
          if (e instanceof AiError && e.code === 'blocked') return setError(e.message)
        }
      }
      const r = studyPastedLocally(text, lessons, level)
      if ('error' in r) return setError(r.error)
      saveCustomLesson(r.lesson)
      setResult(r)
    } finally {
      setBusy(false)
    }
  }

  if (busy) return <><TopBar title="Meu conteúdo" /><Page><Spinner label="Lendo seu material e organizando em partes…" /></Page></>

  if (result) {
    const { lesson, related, detectedSubject } = result
    return (
      <>
        <TopBar title="Meu conteúdo" onBack={() => setResult(null)} />
        <Page>
          <div className="animate-rise">
            <p className="text-sm font-semibold uppercase tracking-wide text-laranja">{(detectedSubject && subjectById(detectedSubject)?.name) || 'Seu material'}</p>
            <h1 className="mt-1 text-2xl font-bold">{lesson.title}</h1>
            <Card className="mt-4">
              <p className="font-semibold">Resumo</p>
              <p className="mt-2 leading-relaxed text-grafite-3">{lesson.summary}</p>
            </Card>
            <Card className="mt-3">
              <p className="font-semibold">Organizei em {lesson.blocks.length} partes</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-grafite-3">{lesson.blocks.map((b) => <li key={b.id}>{b.title}</li>)}</ol>
              <p className="mt-3 text-sm text-cinza-texto">✏️ {lesson.questions.length} exercícios criados a partir do seu material</p>
            </Card>
            {related && (
              <Link to={`/aula/${related.id}`} className="mt-3 flex items-center gap-3 rounded-2xl bg-laranja-suave p-4">
                <Lightbulb size={20} className="text-laranja" />
                <span className="flex-1 text-sm">Também tenho uma aula pronta sobre <b>{related.title}</b></span>
                <ChevronRight size={18} />
              </Link>
            )}
            <Button className="mt-6 w-full" onClick={() => nav(`/aula/${lesson.id}`)}>Estudar este conteúdo <ArrowRight size={18} /></Button>
          </div>
        </Page>
      </>
    )
  }

  return (
    <>
      <TopBar title="📄 Tenho um conteúdo" />
      <Page>
        <h1 className="text-xl font-semibold">Cole ou digite o conteúdo que você quer estudar</h1>
        <p className="mt-1 text-cinza-texto">Pode ser um texto do livro, anotações do caderno ou uma questão. Eu identifico o assunto, organizo, resumo e crio exercícios.</p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX))}
          rows={10}
          placeholder="Ex.: A fotossíntese é o processo pelo qual as plantas…"
          className="mt-4 w-full rounded-2xl border-2 border-cinza bg-white p-4 text-base leading-relaxed outline-none focus:border-laranja"
          onFocus={(e) => setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)}
        />
        <div className="mt-1 flex items-center justify-between text-xs text-cinza-texto">
          <button onClick={pasteFromClipboard} className="flex items-center gap-1 font-medium text-laranja-escuro"><ClipboardPaste size={14} /> Colar</button>
          <span>{text.length}/{MAX}</span>
        </div>
        {error && <p className="mt-3 rounded-2xl bg-erro-suave p-3 text-sm" role="alert">{error}</p>}
        <Button className="mt-5 w-full" disabled={text.trim().length < 40} onClick={organize}>Organizar e estudar</Button>
        <p className="mt-3 text-center text-xs text-cinza-texto">Não inclua nomes, telefones ou dados pessoais no texto.</p>
      </Page>
    </>
  )
}
