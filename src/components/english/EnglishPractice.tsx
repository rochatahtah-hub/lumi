import { useRef, useState, type ReactNode } from 'react'
import { Check, Mic, Volume2, X } from 'lucide-react'
import type { Lesson, MCItem } from '../../types'
import { AudioPlayer } from '../../games/play/choice'
import { bilingual, studentEnglishLevel } from '../../lib/english'
import { canListen, canSpeak, listen, speak } from '../../lib/speech'
import { recordEnglishActivity } from '../../lib/store'
import { normalize } from '../../lib/text'
import { MASCOT } from '../../assets/lumi'

/** título das seções no English Mode: mais inglês conforme o nível do aluno */
function H({ s, icon, pt, en }: { s: string; icon: string; pt: string; en: string }) {
  const t = s === 'ingles' ? bilingual(studentEnglishLevel(), pt, en) : { main: pt, sub: undefined }
  return (
    <h3 className="text-lg font-bold">
      {icon} {t.main}
      {t.sub && <span className="ml-2 text-sm font-medium text-cinza-texto">{t.sub}</span>}
    </h3>
  )
}

const Section = ({ children }: { children: ReactNode }) => <section className="rounded-3xl border border-cinza bg-white p-5 shadow-sm">{children}</section>

export const SpeakButton = ({ text, label }: { text: string; label?: string }) =>
  canSpeak ? (
    <button onClick={() => void speak(text)} className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-full bg-laranja-suave text-laranja-escuro hover:bg-laranja/20" aria-label={label ?? `Ouvir: ${text}`}>
      <Volume2 size={17} />
    </button>
  ) : null

/** vocabulário completo da aula: palavra, tradução, definição, exemplo, pronúncia, classe e relações */
export function VocabularyList({ lesson }: { lesson: Lesson }) {
  const v = lesson.english?.vocabulary ?? []
  if (!v.length) return null
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {v.map((e) => (
        <div key={e.word} className="rounded-2xl bg-offwhite p-3 ring-1 ring-cinza">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <p className="text-lg font-bold">{e.word} <span className="text-xs font-medium text-cinza-texto">({e.pos})</span></p>
              <p className="font-medium text-laranja-escuro">{e.translation}</p>
            </div>
            <SpeakButton text={e.word} />
          </div>
          {e.pronunciation && <p className="text-xs text-cinza-texto">pronúncia aproximada: /{e.pronunciation}/</p>}
          <p className="mt-1 text-sm italic text-grafite-3">{e.definition}</p>
          <p className="mt-1 flex items-center gap-1 text-sm">“{e.example}” <SpeakButton text={e.example} label="Ouvir o exemplo" /></p>
          {[['sinônimos', e.synonyms], ['antônimos', e.antonyms], ['combinações', e.collocations], ['relacionadas', e.related]].filter(([, x]) => (x as string[] | undefined)?.length).map(([k, x]) => (
            <p key={k as string} className="mt-1 text-xs text-cinza-texto"><b>{k as string}:</b> {(x as string[]).join(', ')}</p>
          ))}
        </div>
      ))}
    </div>
  )
}

const Row = ({ label, items }: { label: string; items: string[] }) => (
  <div className="mt-3">
    <p className="text-sm font-semibold">{label}</p>
    <ul className="mt-1 space-y-1">{items.map((x) => <li key={x} className="flex items-center gap-2 rounded-xl bg-offwhite px-3 py-1.5 text-[15px]">{x} <SpeakButton text={x} /></li>)}</ul>
  </div>
)

export function GrammarBox({ lesson }: { lesson: Lesson }) {
  const g = lesson.english?.grammar
  if (!g) return null
  return (
    <div>
      <p className="font-semibold">{g.name}</p>
      <p className="mt-1 text-grafite-3"><b>Quando usar:</b> {g.when}</p>
      <p className="mt-2 rounded-xl bg-grafite px-3 py-2 font-mono text-sm text-offwhite">{g.structure}</p>
      <Row label="✅ Afirmativa" items={g.affirmative} />
      <Row label="❌ Negativa" items={g.negative} />
      <Row label="❓ Interrogativa" items={g.interrogative} />
      {g.compare && <p className="mt-3 rounded-xl bg-laranja-suave p-3 text-sm"><b>⚖️ Comparando:</b> {g.compare}</p>}
      {g.context && <p className="mt-2 text-sm text-grafite-3"><b>Na vida real:</b> {g.context}</p>}
    </div>
  )
}

/** perguntas de múltipla escolha com correção imediata (reading e listening) */
function InlineMC({ items, onDone }: { items: MCItem[]; onDone: (correct: number, total: number) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => items.map(() => null))
  const reported = useRef(false)
  const pick = (qi: number, oi: number) => {
    if (answers[qi] !== null) return
    const a = [...answers]; a[qi] = oi
    setAnswers(a)
    if (a.every((x) => x !== null) && !reported.current) {
      reported.current = true
      onDone(a.filter((x, i) => x === items[i].answer).length, items.length)
    }
  }
  return (
    <div className="mt-4 space-y-5">
      {items.map((q, qi) => {
        const a = answers[qi]
        return (
          <div key={qi}>
            <p className="font-semibold">{qi + 1}. {q.prompt}</p>
            <div className="mt-2 grid gap-2">
              {q.options.map((o, oi) => {
                const st = a === null ? '' : oi === q.answer ? 'border-sucesso bg-sucesso-suave' : oi === a ? 'border-erro/50 bg-erro-suave' : 'opacity-60'
                return <button key={oi} disabled={a !== null} onClick={() => pick(qi, oi)} className={`flex min-h-12 items-center gap-2 rounded-2xl border-2 border-cinza px-3 py-2 text-left ${st} ${a === null ? 'hover:border-laranja/60' : ''}`}>
                  {a !== null && oi === q.answer && <Check size={16} className="text-sucesso" />}{a === oi && oi !== q.answer && <X size={16} className="text-erro" />}{o}
                </button>
              })}
            </div>
            {a !== null && <p className={`mt-2 rounded-xl p-3 text-sm ${a === q.answer ? 'bg-sucesso-suave' : 'bg-laranja-suave'}`}>{a === q.answer ? '🎉 Você acertou! ' : `A resposta certa é “${q.options[q.answer]}”. `}{q.explanation}</p>}
          </div>
        )
      })}
    </div>
  )
}

/** conta palavras-chave usadas (aceita variações: plural, -ed, -ing…) */
function keywordHits(text: string, keywords: string[]) {
  const words = normalize(text).split(/[^a-z']+/).filter(Boolean)
  return keywords.filter((k) => {
    const nk = normalize(k)
    if (nk.includes(' ')) return normalize(text).includes(nk)
    const root = nk.length > 4 ? nk.slice(0, nk.length - 1) : nk
    return words.some((w) => w === nk || (root.length >= 4 && w.startsWith(root)))
  })
}

export function EnglishPractice({ lesson }: { lesson: Lesson }) {
  const e = lesson.english
  const [said, setSaid] = useState<{ text: string; hits: string[] } | null>(null)
  const [listening, setListening] = useState(false)
  const [text, setText] = useState('')
  const [writeCheck, setWriteCheck] = useState<{ words: number; hits: string[] } | null>(null)
  const [challengeDone, setChallengeDone] = useState(false)
  if (!e) return null

  const trySpeak = async () => {
    if (!e.speaking) return
    setListening(true)
    const t = await listen()
    setListening(false)
    const hits = keywordHits(t, e.speaking.expected)
    setSaid({ text: t, hits })
    if (t) recordEnglishActivity({ lessonId: lesson.id, kind: 'speaking', correct: hits.length, total: e.speaking.expected.length })
  }
  const checkWriting = () => {
    if (!e.writing) return
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const hits = keywordHits(text, e.writing.keywords)
    setWriteCheck({ words, hits })
    recordEnglishActivity({ lessonId: lesson.id, kind: 'writing', correct: hits.length + (words >= e.writing.minWords ? 1 : 0), total: e.writing.keywords.length + 1 })
  }

  return (
    <div className="space-y-4">
      {!!e.vocabulary?.length && <Section><H s={lesson.subject} icon="📚" pt="Vocabulário" en="Vocabulary" /><div className="mt-3"><VocabularyList lesson={lesson} /></div></Section>}
      {e.grammar && <Section><H s={lesson.subject} icon="🔤" pt="Gramática" en="Grammar" /><div className="mt-3"><GrammarBox lesson={lesson} /></div></Section>}

      {e.reading && (
        <Section>
          <H s={lesson.subject} icon="📖" pt="Leia e responda" en="Read and answer" />
          <p className="mt-2 text-sm text-cinza-texto">{e.reading.title} · {e.reading.genre}</p>
          <p className="mt-2 whitespace-pre-line rounded-2xl bg-offwhite p-4 leading-relaxed">{e.reading.text}</p>
          <InlineMC items={e.reading.questions} onDone={(c, t) => recordEnglishActivity({ lessonId: lesson.id, kind: 'reading', correct: c, total: t })} />
        </Section>
      )}

      {e.listening && (
        <Section>
          <H s={lesson.subject} icon="🎧" pt="Ouça e responda" en="Listen and answer" />
          <p className="mt-2 text-sm text-cinza-texto">{e.listening.title}</p>
          <div className="mt-3 rounded-2xl bg-grafite p-3 text-offwhite"><AudioPlayer script={e.listening.script} rate={e.listening.rate} audioUrl={e.listening.audioUrl} /></div>
          <InlineMC items={e.listening.questions} onDone={(c, t) => recordEnglishActivity({ lessonId: lesson.id, kind: 'listening', correct: c, total: t })} />
        </Section>
      )}

      {e.speaking && (
        <Section>
          <H s={lesson.subject} icon="🗣️" pt="Fale" en="Speaking" />
          <p className="mt-2"><b>Situação:</b> {e.speaking.situation}</p>
          <p className="mt-2 text-sm"><b>Vocabulário:</b> {e.speaking.vocabulary.join(' · ')}</p>
          <ul className="mt-2 space-y-1">{e.speaking.phrases.map((p) => <li key={p} className="flex items-center gap-2 rounded-xl bg-offwhite px-3 py-1.5">{p} <SpeakButton text={p} /></li>)}</ul>
          <p className="mt-3 flex items-center gap-2 rounded-xl bg-laranja-suave p-3 text-sm"><span className="flex-1"><b>Exemplo:</b> {e.speaking.example}</span><SpeakButton text={e.speaking.example} /></p>
          <p className="mt-3 font-semibold">🎯 Desafio: {e.speaking.challenge}</p>
          {canListen ? (
            <button onClick={() => void trySpeak()} disabled={listening} className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-laranja px-4 font-semibold text-white disabled:opacity-60"><Mic size={18} /> {listening ? 'Ouvindo… fale agora' : 'Falar'}</button>
          ) : <p className="mt-3 text-sm text-cinza-texto">Fale em voz alta e compare com o exemplo. (Este navegador não oferece reconhecimento de voz.)</p>}
          {said && (
            <div className="mt-3 rounded-2xl bg-offwhite p-3 text-sm">
              <p><b>O LUMI entendeu:</b> {said.text || '(não consegui ouvir — tente de novo mais perto do microfone)'}</p>
              {said.text && <p className="mt-1">Você usou {said.hits.length} de {e.speaking.expected.length} palavras esperadas{said.hits.length ? `: ${said.hits.join(', ')}` : ''}.</p>}
            </div>
          )}
        </Section>
      )}

      {e.writing && (
        <Section>
          <H s={lesson.subject} icon="✍️" pt="Escreva" en="Writing" />
          <p className="mt-2">{e.writing.prompt}</p>
          <p className="mt-2 text-sm text-cinza-texto">Mínimo de {e.writing.minWords} palavras. Critérios: {e.writing.criteria.join(' · ')}</p>
          <textarea value={text} onChange={(ev) => setText(ev.target.value)} rows={5} maxLength={2000} className="mt-3 w-full rounded-2xl border-2 border-cinza p-3 outline-none focus:border-laranja" placeholder="Write here…" />
          <button onClick={checkWriting} disabled={!text.trim()} className="mt-2 min-h-12 rounded-2xl bg-laranja px-5 font-semibold text-white disabled:opacity-50">Corrigir</button>
          {writeCheck && (
            <div className="mt-3 space-y-1 rounded-2xl bg-offwhite p-3 text-sm">
              <p>{writeCheck.words >= e.writing.minWords ? '✅' : '⚠️'} {writeCheck.words} palavras (mínimo {e.writing.minWords})</p>
              <p>{writeCheck.hits.length ? '✅' : '⚠️'} Palavras-chave usadas: {writeCheck.hits.length ? writeCheck.hits.join(', ') : 'nenhuma ainda'} (de {e.writing.keywords.join(', ')})</p>
              <p className="pt-2 font-semibold">Confira também os critérios: {e.writing.criteria.join(' · ')}</p>
              <p className="pt-2"><b>Um exemplo de resposta:</b> {e.writing.model}</p>
            </div>
          )}
        </Section>
      )}

      {e.challenge && (
        <Section>
          <div className="flex items-center gap-3">
            <img src={MASCOT.peek.look} alt="" aria-hidden className="h-16 w-auto" />
            <div className="flex-1"><H s={lesson.subject} icon="🏁" pt="Mini desafio" en="Mini challenge" /><p className="mt-1">{e.challenge}</p></div>
          </div>
          <button onClick={() => { if (!challengeDone) recordEnglishActivity({ lessonId: lesson.id, kind: 'desafio', correct: 1, total: 1 }); setChallengeDone(true) }} className={`mt-3 min-h-11 rounded-2xl px-4 text-sm font-semibold ${challengeDone ? 'bg-sucesso-suave text-sucesso' : 'border-2 border-laranja text-laranja-escuro'}`}>{challengeDone ? '✓ Desafio feito!' : 'Fiz o desafio'}</button>
        </Section>
      )}
      {!!e.tips?.length && (
        <Section><H s={lesson.subject} icon="💡" pt="Dicas" en="Tips" /><ul className="mt-2 list-disc space-y-1 pl-5 text-grafite-3">{e.tips.map((t) => <li key={t}>{t}</li>)}</ul></Section>
      )}
    </div>
  )
}
