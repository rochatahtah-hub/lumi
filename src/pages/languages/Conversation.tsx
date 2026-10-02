import { useMemo, useState } from 'react'
import { ChevronRight, Volume2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card, Page, TopBar } from '../../components/ui'
import { LANG_IDS, LANGUAGES, type LangId } from '../../content/languages'
import { allLessons } from '../../lib/repo'
import { canSpeak, setSpeechLocale, speak } from '../../lib/speech'
import { CEFR_LEVELS, type CefrLevel, type Lesson } from '../../types'

interface Situation { lesson: Lesson; context: string; level: CefrLevel; vocabulary: string[]; phrases: string[]; dialogue?: { who: string; text: string }[]; example?: string; challenge?: string }

/** situações de conversa = aulas da Base Oficial com prática de fala e/ou diálogo (nada é gerado na hora) */
function situationsOf(lang: LangId): Situation[] {
  const subject = LANGUAGES[lang].subject
  return allLessons().filter((l) => l.subject === subject && l.english && (l.english.speaking || l.games?.dialogues?.length)).map((l) => {
    const sp = l.english!.speaking
    const dl = l.games?.dialogues?.[0]
    return {
      lesson: l, level: l.english!.cefr, context: sp?.situation ?? dl?.title ?? l.title,
      vocabulary: sp?.vocabulary ?? (l.english!.vocabulary ?? []).slice(0, 6).map((v) => v.word),
      phrases: sp?.phrases ?? [], dialogue: dl ? dl.lines.map((x, i) => (i === dl.gap ? { ...x, text: dl.options[dl.answer] } : x)) : undefined,
      example: sp?.example, challenge: sp?.challenge,
    }
  }).sort((a, b) => CEFR_LEVELS.indexOf(a.level) - CEFR_LEVELS.indexOf(b.level))
}

/** 💬 Conversação: escolher idioma, nível e situação; ver contexto, objetivo, vocabulário, frases, diálogo e praticar */
export default function Conversation() {
  const [params, setParams] = useSearchParams()
  const lang = (LANG_IDS as string[]).includes(params.get('idioma') ?? '') ? (params.get('idioma') as LangId) : 'en'
  const [level, setLevel] = useState<CefrLevel | 'todos'>('todos')
  const [open, setOpen] = useState<string | null>(null)
  const all = useMemo(() => situationsOf(lang), [lang])
  const list = level === 'todos' ? all : all.filter((x) => x.level === level)
  const L = LANGUAGES[lang]
  setSpeechLocale(L.locale)

  return (
    <>
      <TopBar title="💬 Conversação" />
      <Page>
        <p className="text-cinza-texto">Escolha o idioma, o nível e uma situação para praticar.</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Idioma">
          {LANG_IDS.map((id) => (
            <button key={id} role="tab" aria-selected={id === lang} onClick={() => { setParams({ idioma: id }); setOpen(null) }} className={`min-h-11 shrink-0 rounded-2xl px-4 font-semibold ${id === lang ? 'bg-laranja text-white' : 'border border-cinza bg-white'}`}>{LANGUAGES[id].flag} {LANGUAGES[id].name}</button>
          ))}
        </div>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Nível">
          {(['todos', ...CEFR_LEVELS] as const).map((lv) => (
            <button key={lv} role="tab" aria-selected={lv === level} onClick={() => setLevel(lv)} className={`min-h-10 shrink-0 rounded-xl px-3 text-sm font-bold ${lv === level ? 'bg-grafite text-offwhite' : 'bg-cinza/60 text-cinza-texto'}`}>{lv === 'todos' ? 'Todos' : lv}</button>
          ))}
        </div>

        {!list.length && (
          <Card className="mt-4 text-center">
            <p className="text-3xl">🗣️</p>
            <p className="mt-2 font-semibold">Ainda não há situações de {L.name.toLowerCase()} {level === 'todos' ? '' : `no ${level} `}na Base Oficial</p>
            <p className="mt-1 text-sm text-cinza-texto">As situações aparecem aqui conforme as aulas desse nível são publicadas.</p>
          </Card>
        )}

        <div className="mt-4 space-y-3">
          {list.map((x) => {
            const isOpen = open === x.lesson.id
            return (
              <Card key={x.lesson.id}>
                <button onClick={() => setOpen(isOpen ? null : x.lesson.id)} aria-expanded={isOpen} className="flex w-full items-start gap-3 text-left">
                  <span className="rounded-lg bg-laranja-suave px-2 py-1 text-xs font-bold text-laranja-escuro">{x.level}</span>
                  <span className="flex-1"><span className="block font-semibold">{x.context}</span><span className="block text-sm text-cinza-texto">{x.lesson.title}</span></span>
                  <ChevronRight size={18} className={`mt-1 text-cinza-texto transition ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="mt-4 space-y-3 text-sm">
                    {x.lesson.objective && <p><b>🎯 Objetivo:</b> {x.lesson.objective}</p>}
                    {!!x.vocabulary.length && <div><b>📚 Vocabulário útil</b><div className="mt-1 flex flex-wrap gap-1.5">{x.vocabulary.map((v) => <span key={v} className="rounded-full bg-offwhite px-2.5 py-1 ring-1 ring-cinza">{v}</span>)}</div></div>}
                    {!!x.phrases.length && (
                      <div><b>💡 Frases de apoio</b>
                        <ul className="mt-1 space-y-1">{x.phrases.map((p) => <li key={p} className="flex items-center gap-2">{canSpeak && <button onClick={() => void speak(p)} aria-label={`Ouvir: ${p}`} className="text-laranja"><Volume2 size={16} /></button>}{p}</li>)}</ul>
                      </div>
                    )}
                    {x.dialogue && (
                      <div className="rounded-2xl bg-offwhite p-3">
                        <div className="flex items-center justify-between"><b>💬 Diálogo</b>{canSpeak && <button onClick={() => void speak(x.dialogue!.map((d) => d.text))} className="inline-flex items-center gap-1 font-semibold text-laranja-escuro"><Volume2 size={16} /> Ouvir</button>}</div>
                        <ul className="mt-2 space-y-1">{x.dialogue.map((d, i) => <li key={i}><b>{d.who}:</b> {d.text}</li>)}</ul>
                      </div>
                    )}
                    {x.example && <p><b>Exemplo de resposta:</b> {x.example}</p>}
                    {x.challenge && <p><b>Desafio:</b> {x.challenge}</p>}
                    <Link to={`/estudar?lesson=${x.lesson.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-laranja px-4 font-semibold text-white">Praticar esta situação <ChevronRight size={18} /></Link>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </Page>
    </>
  )
}
