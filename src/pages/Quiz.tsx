import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronRight, Lightbulb, X } from 'lucide-react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Page, ProgressBar, TopBar } from '../components/ui'
import { subjectById } from '../content/subjects'
import { evaluateAchievements } from '../lib/achievements'
import { localReexplain } from '../lib/ai'
import { checkAnswer, needsRemediation, nextQuestion, registerAnswer, startQuiz, type Given, type QuizState } from '../lib/quiz'
import { getLesson } from '../lib/repo'
import { buildReviewLesson } from '../lib/review'
import { getState, recordSession, skillKey, useLumi, type SessionRecord } from '../lib/store'
import { logSession } from '../lib/telemetry'
import { shuffle } from '../lib/text'
import type { Lesson, Question } from '../types'

export interface ResultState {
  lessonId: string
  title: string
  subjectName: string
  mode: 'aula' | 'revisao'
  correct: number
  total: number
  good: string[]
  toReview: string[]
  pointsEarned: number
  newAchievements: string[]
}

type Status = 'answering' | 'wrong' | 'correct' | 'revealed'

export default function QuizPage() {
  const { id = '' } = useParams()
  const location = useLocation()
  const reviewOf = new URLSearchParams(location.search).get('de') ?? undefined
  // a revisão é uma aula montada na hora a partir dos erros; fica fixa durante a atividade
  const [lesson] = useState<Lesson | undefined>(() => (id === 'revisao' ? buildReviewLesson(getState(), reviewOf) : getLesson(id)))
  if (!lesson) {
    return (
      <>
        <TopBar title="Exercícios" />
        <Page><Card><p>Não há exercícios para mostrar agora.</p><Link to="/" className="mt-3 inline-block font-semibold text-laranja">Voltar ao início</Link></Card></Page>
      </>
    )
  }
  return <QuizRunner lesson={lesson} mode={id === 'revisao' ? 'revisao' : 'aula'} />
}

function QuizRunner({ lesson, mode }: { lesson: Lesson; mode: 'aula' | 'revisao' }) {
  const nav = useNavigate()
  const level = useLumi((s) => s.profile.level)
  const startedAt = useRef(new Date().toISOString())
  const [quiz, setQuiz] = useState<QuizState>(() => startQuiz(lesson.questions, level, 10))
  const [current, setCurrent] = useState<Question | null>(() => nextQuestion(quiz))
  const [remediation, setRemediation] = useState<string | null>(null)
  const subject = subjectById(lesson.subject)

  const finish = (final: QuizState) => {
    const skillMeta: Record<string, { label: string; lessonId: string; subject: typeof lesson.subject }> = {}
    const attempts = final.log.map((l) => {
      const q = lesson.questions.find((x) => x.id === l.questionId)!
      const key = skillKey(lesson, q)
      const [srcLesson] = key.split(':')
      skillMeta[key] = { label: lesson.skills[q.skill] ?? lesson.skills[key] ?? q.skill, lessonId: srcLesson, subject: getLesson(srcLesson)?.subject ?? lesson.subject }
      return { questionId: l.questionId.includes(":") ? l.questionId : `${lesson.id}:${l.questionId}`, skillKey: key, firstCorrect: l.firstCorrect, tries: l.tries, hints: l.hints }
    })
    const correct = final.log.filter((l) => l.firstCorrect).length
    const rec: Omit<SessionRecord, 'id'> = {
      lessonId: lesson.id, title: lesson.title, subject: lesson.subject, level, mode,
      startedAt: startedAt.current, finishedAt: new Date().toISOString(), correct, total: final.log.length,
      hintsUsed: final.log.reduce((a, l) => a + l.hints, 0), attempts,
    }
    const before = getState().points
    recordSession(lesson, rec, skillMeta)
    const pointsEarned = getState().points - before
    const saved = getState().history[0]
    void logSession(saved)
    const unlocked = evaluateAchievements()

    const bySkill = new Map<string, { right: number; wrong: number }>()
    for (const a of attempts) {
      const s = bySkill.get(a.skillKey) ?? { right: 0, wrong: 0 }
      if (a.firstCorrect) s.right++
      else s.wrong++
      bySkill.set(a.skillKey, s)
    }
    const label = (k: string) => skillMeta[k]?.label ?? k
    const result: ResultState = {
      lessonId: lesson.id, title: lesson.title, subjectName: subject?.name ?? '', mode, correct, total: final.log.length, pointsEarned,
      good: [...bySkill].filter(([, s]) => s.wrong === 0).map(([k]) => label(k)),
      toReview: [...bySkill].filter(([, s]) => s.wrong > 0).map(([k]) => label(k)),
      newAchievements: unlocked.map((a) => a.id),
    }
    nav('/resultado', { replace: true, state: result })
  }

  const onDone = (q: Question, log: { firstCorrect: boolean; tries: number; hints: number; solved: boolean }) => {
    const updated = registerAnswer(quiz, q, { questionId: q.id, skill: q.skill, ...log })
    const weak = needsRemediation(updated)
    const withRem = weak ? { ...updated, remediated: [...updated.remediated, weak] } : updated
    setQuiz(withRem)
    const nxt = nextQuestion(withRem)
    if (!nxt) return finish(withRem)
    setCurrent(nxt)
    if (weak) setRemediation(weak)
    window.scrollTo({ top: 0 })
  }

  const number = quiz.served.length + 1
  const remBlock = remediation ? lesson.blocks.find((b) => b.skill === remediation || `${lesson.id}:${b.skill}` === remediation) : undefined

  return (
    <>
      <TopBar title={mode === 'revisao' ? 'Revisão' : subject?.name ?? 'Exercícios'} right={`${Math.min(number, quiz.total)}/${quiz.total}`} close onBack={() => nav(mode === 'revisao' ? '/' : `/aula/${lesson.id}`)} />
      <Page>
        <ProgressBar value={(quiz.served.length / quiz.total) * 100} className="mb-5" />
        {remediation ? (
          <div className="animate-rise">
            <Card className="border-laranja/40">
              <p className="text-sm font-semibold text-laranja-escuro">Pausa rápida</p>
              <h2 className="mt-1 text-xl font-semibold">Percebi que você está tendo dificuldade nessa parte.</h2>
              <p className="mt-1 text-cinza-texto">Vamos relembrar: <span className="font-medium text-grafite">{lesson.skills[remediation] ?? remediation}</span></p>
              {remBlock && (
                <>
                  <p className="mt-4 text-lg leading-relaxed">{localReexplain(remBlock, 'simples')}</p>
                  {(remBlock.variants?.exemplo || remBlock.example) && (
                    <div className="mt-4 flex gap-3 rounded-2xl bg-laranja-suave p-4">
                      <Lightbulb size={22} className="shrink-0 text-laranja" />
                      <p>{remBlock.variants?.exemplo ?? remBlock.example}</p>
                    </div>
                  )}
                </>
              )}
            </Card>
            <Button className="mt-6 w-full" onClick={() => setRemediation(null)}>Vamos tentar de novo <ChevronRight size={18} /></Button>
          </div>
        ) : (
          current && <QuestionView key={current.id} q={current} number={number} total={quiz.total} onDone={(log) => onDone(current, log)} />
        )}
      </Page>
    </>
  )
}

function QuestionView({ q, number, total, onDone }: { q: Question; number: number; total: number; onDone: (log: { firstCorrect: boolean; tries: number; hints: number; solved: boolean }) => void }) {
  const [status, setStatus] = useState<Status>('answering')
  const [tries, setTries] = useState(0)
  const [hints, setHints] = useState(0)
  const [given, setGiven] = useState<Given | null>(null)
  const [wrongPicks, setWrongPicks] = useState<number[]>([])
  const feedbackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status !== 'answering') feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [status, hints])

  const submit = () => {
    if (!given) return
    if (checkAnswer(q, given)) setStatus('correct')
    else {
      setTries((t) => t + 1)
      setStatus('wrong')
      if (given.kind === 'mc') setWrongPicks((w) => [...w, given.index])
      setGiven(q.type === 'mc' ? null : given)
    }
  }
  const retry = () => setStatus('answering')
  const choose = (g: Given) => {
    setGiven(g)
    if (status === 'wrong') setStatus('answering')
  }
  const finished = status === 'correct' || status === 'revealed'
  const canReveal = !finished && (hints >= 3 || tries >= 2)
  const next = () => onDone({ firstCorrect: status === 'correct' && tries === 0, tries: tries + (status === 'correct' ? 1 : 0), hints, solved: status === 'correct' })

  return (
    <div className="animate-rise">
      <p className="text-sm font-medium text-cinza-texto">Questão {number} de {total}</p>
      <h2 className="mt-2 whitespace-pre-line text-xl font-semibold leading-snug">{q.type === 'tf' ? 'Verdadeiro ou falso?' : q.prompt}</h2>
      {q.type === 'tf' && <p className="mt-3 rounded-2xl bg-white p-4 text-lg ring-1 ring-cinza">"{q.prompt}"</p>}

      <div className="mt-5">
        {q.type === 'mc' && <MultipleChoice q={q} value={given?.kind === 'mc' ? given.index : null} wrongPicks={wrongPicks} status={status} onChange={(index) => choose({ kind: 'mc', index })} />}
        {q.type === 'tf' && <TrueFalse value={given?.kind === 'tf' ? given.value : null} status={status} answer={q.answer} onChange={(value) => choose({ kind: 'tf', value })} />}
        {q.type === 'fill' && <TextAnswer value={given?.kind === 'fill' ? given.text : ''} disabled={finished} onChange={(text) => choose({ kind: 'fill', text })} onEnter={status === 'answering' ? submit : undefined} />}
        {q.type === 'open' && <TextAnswer multiline value={given?.kind === 'open' ? given.text : ''} disabled={finished} onChange={(text) => choose({ kind: 'open', text })} />}
        {q.type === 'order' && <Ordering q={q} disabled={finished} value={given?.kind === 'order' ? given.items : null} onChange={(items) => choose({ kind: 'order', items })} />}
        {q.type === 'match' && <Matching q={q} disabled={finished} value={given?.kind === 'match' ? given.pairs : {}} onChange={(pairs) => choose({ kind: 'match', pairs })} />}
      </div>

      <div ref={feedbackRef} aria-live="polite">
        {hints > 0 && !finished && (
          <div className="mt-5 space-y-2">
            {q.hints.slice(0, hints).map((h, i) => (
              <div key={i} className="animate-rise flex gap-3 rounded-2xl bg-laranja-suave p-4">
                <span className="shrink-0 font-semibold text-laranja-escuro">💡 Dica {i + 1}</span>
                <p>{h}</p>
              </div>
            ))}
          </div>
        )}

        {status === 'wrong' && (
          <div className="mt-5 animate-rise rounded-2xl border-2 border-laranja/40 bg-white p-4">
            <p className="text-lg font-semibold">Quase! Vamos pensar juntos.</p>
            <p className="text-cinza-texto">{hints < 3 ? 'Que tal uma dica antes de tentar de novo?' : 'Releia as dicas com calma e tente mais uma vez.'}</p>
          </div>
        )}

        {status === 'correct' && (
          <div className="mt-5 animate-pop rounded-3xl bg-sucesso-suave p-5 text-center">
            <p className="text-3xl">🎉</p>
            <p className="text-xl font-bold">Parabéns!</p>
            <p className="font-semibold text-sucesso">Você acertou!</p>
            <p className="mt-2 text-grafite-3">{q.explanation}</p>
          </div>
        )}

        {status === 'revealed' && (
          <div className="mt-5 animate-rise rounded-3xl border-2 border-cinza bg-white p-5">
            <p className="font-semibold">Vamos ver juntos a resposta:</p>
            <p className="mt-2 font-semibold text-sucesso">{correctAnswerText(q)}</p>
            <p className="mt-2 text-grafite-3">{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3">
        {status === 'answering' && <Button onClick={submit} disabled={!isComplete(q, given)}>Responder</Button>}
        {status === 'wrong' && <Button onClick={retry}>Tentar de novo</Button>}
        {finished && <Button onClick={next}>{number >= total ? 'Ver resultado' : 'Próxima questão'} <ChevronRight size={18} /></Button>}
        {!finished && hints < 3 && (
          <button onClick={() => setHints((h) => h + 1)} className="mx-auto flex min-h-11 items-center gap-2 rounded-full border-2 border-laranja px-5 text-sm font-semibold text-laranja-escuro hover:bg-laranja-suave">
            <Lightbulb size={16} /> {hints === 0 ? 'Preciso de uma dica' : `Mais uma dica (${hints + 1} de 3)`}
          </button>
        )}
        {canReveal && <Button variant="ghost" onClick={() => setStatus('revealed')}>Ver explicação</Button>}
      </div>
    </div>
  )
}

function isComplete(q: Question, g: Given | null): boolean {
  if (!g) return false
  if (g.kind === 'fill' || g.kind === 'open') return g.text.trim().length > 0
  if (g.kind === 'order') return true
  if (g.kind === 'match') return q.type === 'match' && Object.keys(g.pairs).length === q.pairs.length
  return true
}

function correctAnswerText(q: Question): string {
  switch (q.type) {
    case 'mc': return q.options[q.answer]
    case 'tf': return q.answer ? 'Verdadeiro' : 'Falso'
    case 'fill': return q.answers[0]
    case 'match': return q.pairs.map(([a, b]) => `${a} → ${b}`).join(' · ')
    case 'open': return q.modelAnswer
    case 'order': return q.items.map((x, i) => `${i + 1}. ${x}`).join(' · ')
  }
}

function MultipleChoice({ q, value, wrongPicks, status, onChange }: { q: Extract<Question, { type: 'mc' }>; value: number | null; wrongPicks: number[]; status: Status; onChange: (i: number) => void }) {
  const finished = status === 'correct' || status === 'revealed'
  return (
    <div className="grid gap-3" role="radiogroup">
      {q.options.map((opt, i) => {
        const isAnswer = finished && i === q.answer
        const isWrong = wrongPicks.includes(i)
        const selected = value === i
        return (
          <button
            key={i}
            role="radio"
            aria-checked={selected}
            disabled={finished || isWrong}
            onClick={() => onChange(i)}
            className={`flex min-h-14 items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition ${
              isAnswer ? 'border-sucesso bg-sucesso-suave' : isWrong ? 'border-erro/40 bg-erro-suave text-grafite/60' : selected ? 'border-laranja bg-laranja-suave' : 'border-cinza bg-white hover:border-laranja/60'
            }`}
          >
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${isAnswer ? 'border-sucesso bg-sucesso text-white' : isWrong ? 'border-erro text-erro' : selected ? 'border-laranja bg-laranja text-white' : 'border-cinza'}`}>
              {isAnswer ? <Check size={14} strokeWidth={3} /> : isWrong ? <X size={14} strokeWidth={3} /> : selected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
            </span>
            <span className="flex-1 font-medium">{opt}</span>
          </button>
        )
      })}
    </div>
  )
}

function TrueFalse({ value, status, answer, onChange }: { value: boolean | null; status: Status; answer: boolean; onChange: (v: boolean) => void }) {
  const finished = status === 'correct' || status === 'revealed'
  return (
    <div className="grid grid-cols-2 gap-3">
      {[true, false].map((v) => {
        const isAnswer = finished && v === answer
        const selected = value === v
        return (
          <button key={String(v)} disabled={finished} onClick={() => onChange(v)}
            className={`min-h-16 rounded-2xl border-2 text-lg font-semibold transition ${isAnswer ? 'border-sucesso bg-sucesso-suave' : selected ? 'border-laranja bg-laranja-suave' : 'border-cinza bg-white hover:border-laranja/60'}`}>
            {v ? 'Verdadeiro' : 'Falso'}
          </button>
        )
      })}
    </div>
  )
}

function TextAnswer({ value, onChange, disabled, multiline, onEnter }: { value: string; onChange: (v: string) => void; disabled: boolean; multiline?: boolean; onEnter?: () => void }) {
  const cls = 'w-full rounded-2xl border-2 border-cinza bg-white px-4 py-3 text-lg outline-none focus:border-laranja disabled:bg-offwhite'
  const keepVisible = (e: React.FocusEvent<HTMLElement>) => setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)
  return multiline ? (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} rows={5} maxLength={1500} placeholder="Escreva sua resposta com suas palavras…" className={cls} onFocus={keepVisible} />
  ) : (
    <input value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} maxLength={120} placeholder="Sua resposta" className={`${cls} min-h-14`} onFocus={keepVisible}
      autoCapitalize="off" autoCorrect="off" spellCheck={false} enterKeyHint="done" onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) { e.preventDefault(); onEnter() } }} />
  )
}

/** ordenar: começa embaralhado; o aluno sobe/desce os itens (sem arrastar, funciona bem no celular) */
function Ordering({ q, value, onChange, disabled }: { q: Extract<Question, { type: 'order' }>; value: string[] | null; onChange: (v: string[]) => void; disabled: boolean }) {
  const initial = useMemo(() => {
    let s = shuffle(q.items)
    for (let i = 0; i < 5 && s.every((x, j) => x === q.items[j]); i++) s = shuffle(q.items)
    return s
  }, [q])
  const list = value ?? initial
  useEffect(() => { if (!value) onChange(initial) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= list.length) return
    const next = [...list]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <div>
      <p className="mb-3 text-sm text-cinza-texto">Use as setas para colocar na ordem certa (o primeiro fica em cima).</p>
      <ol className="grid gap-2">
        {list.map((item, i) => (
          <li key={item} className="flex items-center gap-2 rounded-2xl border-2 border-cinza bg-white p-2 pl-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-laranja-suave text-sm font-bold text-laranja-escuro">{i + 1}</span>
            <span className="flex-1 text-sm font-medium">{item}</span>
            <button type="button" disabled={disabled || i === 0} onClick={() => move(i, -1)} aria-label="Subir" className="grid h-10 w-10 place-items-center rounded-xl hover:bg-offwhite disabled:opacity-30">▲</button>
            <button type="button" disabled={disabled || i === list.length - 1} onClick={() => move(i, 1)} aria-label="Descer" className="grid h-10 w-10 place-items-center rounded-xl hover:bg-offwhite disabled:opacity-30">▼</button>
          </li>
        ))}
      </ol>
    </div>
  )
}

const PAIR_COLORS = ['#FF8A1F', '#3B82F6', '#22A06B', '#8B5CF6', '#E5484D']

function Matching({ q, value, onChange, disabled }: { q: Extract<Question, { type: 'match' }>; value: Record<string, string>; onChange: (v: Record<string, string>) => void; disabled: boolean }) {
  const rights = useMemo(() => shuffle(q.pairs.map((p) => p[1])), [q])
  const [active, setActive] = useState<string | null>(null)
  const lefts = q.pairs.map((p) => p[0])
  const colorOf = (left: string) => PAIR_COLORS[lefts.indexOf(left) % PAIR_COLORS.length]
  const leftOfRight = (r: string) => Object.entries(value).find(([, v]) => v === r)?.[0]

  const pickRight = (r: string) => {
    if (!active || disabled) return
    const next = Object.fromEntries(Object.entries(value).filter(([l, v]) => l !== active && v !== r))
    next[active] = r
    onChange(next)
    setActive(lefts.find((l) => !(l in next) && l !== active) ?? null)
  }

  return (
    <div>
      <p className="mb-3 text-sm text-cinza-texto">Toque em um item da esquerda e depois no par dele na direita.</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid content-start gap-3">
          {lefts.map((l) => {
            const paired = l in value
            return (
              <button key={l} disabled={disabled} onClick={() => setActive(l)}
                className={`min-h-14 rounded-2xl border-2 px-3 py-2 text-left text-sm font-semibold transition ${active === l ? 'border-grafite bg-grafite text-white' : 'bg-white'}`}
                style={paired && active !== l ? { borderColor: colorOf(l), boxShadow: `inset 6px 0 0 ${colorOf(l)}` } : undefined}>
                {l}
              </button>
            )
          })}
        </div>
        <div className="grid content-start gap-3">
          {rights.map((r) => {
            const owner = leftOfRight(r)
            return (
              <button key={r} disabled={disabled || !active} onClick={() => pickRight(r)}
                className={`min-h-14 rounded-2xl border-2 px-3 py-2 text-left text-sm transition ${!owner ? 'border-cinza bg-white' : 'bg-white'} ${active && !disabled ? 'hover:border-laranja' : ''}`}
                style={owner ? { borderColor: colorOf(owner), boxShadow: `inset -6px 0 0 ${colorOf(owner)}` } : undefined}>
                {r}
              </button>
            )
          })}
        </div>
      </div>
      {Object.keys(value).length > 0 && !disabled && (
        <button onClick={() => { onChange({}); setActive(null) }} className="mt-3 text-sm font-medium text-cinza-texto underline">Limpar ligações</button>
      )}
    </div>
  )
}
