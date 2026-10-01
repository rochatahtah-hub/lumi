import { BarChart3, ChevronRight, MessagesSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MASCOT } from '../../assets/lumi'
import { Page, ProgressBar, TopBar } from '../../components/ui'
import { LANG_IDS, LANGUAGES, type LangId } from '../../content/languages'
import { buildTrail } from '../../lib/english'
import { getLesson } from '../../lib/repo'
import { getState, placementOf, useLumi, type LumiState } from '../../lib/store'

/** o aluno já começou este idioma? (fez o nivelamento ou abriu alguma aula) */
export function langStarted(s: LumiState, lang: LangId): boolean {
  if (placementOf(s, lang)) return true
  const subject = LANGUAGES[lang].subject
  return Object.keys(s.english.views).some((id) => getLesson(id)?.subject === subject)
}

/** última aula aberta do idioma */
export function lastLessonOf(s: LumiState, lang: LangId) {
  const subject = LANGUAGES[lang].subject
  const id = Object.entries(s.english.views).filter(([lid]) => getLesson(lid)?.subject === subject).sort((a, b) => b[1].localeCompare(a[1]))[0]?.[0]
  return id ? getLesson(id) : undefined
}

/** 🌎 Idiomas: escolher o idioma e continuar de onde parou */
export default function Languages() {
  useLumi((s) => s.updatedAt)
  const s = getState()
  const order = [...LANG_IDS].sort((a, b) => (a === s.english.lastLang ? -1 : b === s.english.lastLang ? 1 : 0))

  return (
    <>
      <TopBar title="🌎 Idiomas" />
      <Page>
        <section className="relative overflow-hidden rounded-3xl bg-grafite p-5 text-offwhite">
          <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-laranja/25 blur-2xl" />
          <img src={MASCOT.peek.smile} alt="" aria-hidden className="absolute -bottom-1 right-2 h-24 w-auto select-none" draggable={false} />
          <h1 className="text-2xl font-bold">Idiomas</h1>
          <p className="mt-1 max-w-[70%] text-sm text-offwhite/80">Escolha um idioma para começar a aprender.</p>
        </section>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {order.map((id) => {
            const L = LANGUAGES[id]
            const started = langStarted(s, id)
            const trail = buildTrail(s, id)
            const pct = trail.levels.find((l) => l.level.id === trail.level)?.pct ?? 0
            const last = lastLessonOf(s, id)
            return (
              <Link key={id} to={`/idiomas/${id}`} className="block rounded-3xl border border-cinza bg-white p-4 transition hover:border-laranja">
                <div className="flex items-center gap-3">
                  <span className="text-4xl" aria-hidden>{L.flag}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-bold">{L.name}</p>
                    <p className="text-xs text-cinza-texto">{L.focus.join(' · ')}</p>
                  </div>
                  {started && <span className="rounded-full bg-laranja-suave px-2.5 py-1 text-sm font-bold text-laranja-escuro">{trail.level}</span>}
                </div>
                {started ? (
                  <>
                    <div className="mt-3 flex justify-between text-xs text-cinza-texto"><span>Progresso no {trail.level}</span><span>{pct}%</span></div>
                    <ProgressBar value={pct} className="mt-1" />
                    {last && <p className="mt-2 truncate text-xs text-cinza-texto">Última aula: <b className="text-grafite">{last.title}</b></p>}
                  </>
                ) : (
                  <p className="mt-3 text-sm text-cinza-texto">{L.tagline}</p>
                )}
                <span className="mt-3 inline-flex min-h-11 items-center gap-1 rounded-2xl bg-laranja px-4 font-semibold text-white">{started ? 'Continuar' : 'Começar'} <ChevronRight size={18} /></span>
              </Link>
            )
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link to="/idiomas/conversacao" className="flex items-center gap-3 rounded-3xl bg-grafite p-4 text-offwhite">
            <MessagesSquare className="text-laranja" /> <span className="flex-1"><span className="block font-semibold">💬 Conversação</span><span className="block text-sm text-offwhite/75">Pratique situações reais</span></span> <ChevronRight className="text-laranja" />
          </Link>
          <Link to="/idiomas/aprendizado" className="flex items-center gap-3 rounded-3xl border border-cinza bg-white p-4 hover:border-laranja">
            <BarChart3 className="text-laranja" /> <span className="flex-1"><span className="block font-semibold">Meu aprendizado</span><span className="block text-sm text-cinza-texto">Habilidades e progresso por idioma</span></span> <ChevronRight className="text-cinza-texto" />
          </Link>
        </div>
        <p className="mt-6 text-center text-xs text-cinza-texto">Os níveis A1–C1 seguem o Quadro Europeu Comum de Referência (CEFR) como referência pedagógica. O LUMI não emite certificação oficial.</p>
      </Page>
    </>
  )
}
