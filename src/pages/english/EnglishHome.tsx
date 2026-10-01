import { useEffect, useState } from 'react'
import { ChevronRight, Flame, Gamepad2, RotateCcw } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { MASCOT } from '../../assets/lumi'
import { Card, Page, ProgressBar, TopBar } from '../../components/ui'
import { langById } from '../../content/languages'
import { MARK, SKILL_INFO, buildTrail, englishTips, reviewPicks, skillProfile, wordsLearned, type TrailUnit } from '../../lib/english'
import { currentStreak, getState, placementOf, setLastLang, useLumi } from '../../lib/store'
import { CEFR_LEVELS, type CefrLevel, type EnglishSkill } from '../../types'

/** painel de um idioma ("Meu Inglês", "Meu Espanhol"…): nível, próximo passo, revisão, habilidades e a trilha A1 → C1 */
export default function EnglishHome() {
  useLumi((s) => s.updatedAt) // redesenha quando o progresso muda
  const { lang: langParam = 'en' } = useParams()
  const L = langById(langParam)
  if (!L) return <Navigate to="/idiomas" replace />
  return <LanguageHome key={L.id} langId={L.id} />
}

function LanguageHome({ langId }: { langId: NonNullable<ReturnType<typeof langById>>['id'] }) {
  const L = langById(langId)!
  const lang = L.id
  const s = getState()
  useEffect(() => setLastLang(lang), [lang])
  const trail = buildTrail(s, lang)
  const placement = placementOf(s, lang)
  const [tab, setTab] = useState<CefrLevel>(trail.level)
  const skills = skillProfile(s, lang)
  const picks = reviewPicks(s, 3, lang)
  const tips = englishTips(s, lang)
  const all = trail.levels.flatMap((l) => l.units).filter((u) => !u.planned)
  const unitsDone = all.filter((u) => u.passed).length
  const mastered = all.flatMap((u) => u.lessons).filter((l) => l.mark === 'mastered').length
  const lvInfo = L.course.find((c) => c.id === trail.level)!
  const cur = trail.current
  const curLesson = cur && all.find((u) => u.unit.id === cur.unitId)?.lessons.find((l) => l.id === cur.lessonId)

  return (
    <>
      <TopBar title={`${L.flag} Meu ${L.name}`} />
      <Page>
        <section className="relative overflow-hidden rounded-3xl bg-grafite p-5 text-offwhite">
          <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-laranja/25 blur-2xl" />
          <img src={MASCOT.peek.wave} alt="" aria-hidden className="absolute -bottom-1 right-2 h-28 w-auto select-none sm:h-32" draggable={false} />
          <p className="text-sm text-offwhite/70">{placement ? 'Seu nível estimado pelo LUMI' : 'Seu nível atual'}</p>
          <p className="mt-1 text-3xl font-bold">{trail.level} <span className="text-lg font-semibold text-laranja-claro">· {lvInfo.title}</span></p>
          <p className="mt-1 max-w-[70%] text-sm text-offwhite/80">{lvInfo.can}</p>
          <div className="mt-4 max-w-[70%]"><ProgressBar value={trail.levels.find((l) => l.level.id === trail.level)?.pct ?? 0} /></div>
          {!placement && (
            <Link to={`/idiomas/${lang}/nivelamento`} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-2xl bg-laranja px-4 font-semibold text-white">Fazer teste de nivelamento <ChevronRight size={18} /></Link>
          )}
        </section>

        {curLesson && (
          <Link to={`/estudar?lesson=${curLesson.id}`} className="mt-4 flex items-center gap-3 rounded-3xl border-2 border-laranja bg-white p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-laranja text-lg text-white">●</span>
            <span className="flex-1"><span className="block text-xs font-semibold uppercase tracking-wide text-laranja-escuro">O que fazer agora</span><span className="block font-semibold">{curLesson.title}</span></span>
            <ChevronRight className="text-laranja" />
          </Link>
        )}
        {cur && !curLesson && (
          <Link to={`/idiomas/${lang}/unidade/${cur.unitId}`} className="mt-4 flex items-center gap-3 rounded-3xl border-2 border-laranja bg-white p-4">
            <span className="flex-1"><span className="block text-xs font-semibold uppercase tracking-wide text-laranja-escuro">O que fazer agora</span><span className="block font-semibold">Avaliação de domínio da unidade</span></span>
            <ChevronRight className="text-laranja" />
          </Link>
        )}

        {picks.length > 0 && (
          <Card className="mt-4">
            <p className="flex items-center gap-2 font-semibold"><RotateCcw size={18} className="text-laranja" /> Hora de revisar</p>
            <ul className="mt-2 space-y-1 text-sm">{picks.map((p) => <li key={p.lesson.id}>• <b>{p.lesson.title}</b> — <span className="text-cinza-texto">{p.reason}</span></li>)}</ul>
            <Link to={`/idiomas/${lang}/revisar`} className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-2xl bg-laranja px-4 font-semibold text-white">Revisar agora <ChevronRight size={18} /></Link>
          </Card>
        )}
        {tips.map((t) => (
          <Link key={t.text} to={t.to} className="mt-3 flex items-center gap-3 rounded-2xl bg-laranja-suave p-4 text-sm">
            <span className="flex-1">{t.text}</span><span className="font-semibold text-laranja-escuro">{t.cta} →</span>
          </Link>
        ))}

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value={`${unitsDone}/${all.length}`} label="Unidades concluídas" />
          <Stat value={`${mastered}`} label="Conteúdos dominados" />
          <Stat value={`${wordsLearned(s, lang)}`} label="Palavras aprendidas" />
          <Stat value={<span className="inline-flex items-center gap-1"><Flame size={18} className="text-laranja" />{currentStreak(s.studyDays)}</span>} label="Dias seguidos" />
        </div>

        <Card className="mt-4">
          <p className="font-semibold">Suas habilidades</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(Object.keys(SKILL_INFO) as EnglishSkill[]).map((k) => (
              <div key={k}>
                <div className="flex justify-between text-sm"><span>{SKILL_INFO[k].icon} {SKILL_INFO[k].label}</span><span className="text-cinza-texto">{skills[k].pct === null ? 'ainda sem dados' : `${skills[k].pct}%`}</span></div>
                <ProgressBar value={skills[k].pct ?? 0} className="mt-1" />
              </div>
            ))}
          </div>
          {(() => {
            const low = (Object.keys(skills) as EnglishSkill[]).filter((k) => skills[k].pct !== null && skills[k].n >= 3).sort((a, b) => skills[a].pct! - skills[b].pct!)[0]
            return low && skills[low].pct! < 70 ? <p className="mt-3 text-sm text-cinza-texto">Onde revisar: <b className="text-grafite">{SKILL_INFO[low].label}</b>.</p> : null
          })()}
        </Card>

        <Link to={`/jogos?materia=${L.subject}`} className="mt-4 flex items-center gap-3 rounded-3xl bg-grafite p-4 text-offwhite">
          <Gamepad2 className="text-laranja" /> <span className="flex-1 font-semibold">Jogos de {L.name}</span> <ChevronRight className="text-laranja" />
        </Link>

        <h2 className="mt-8 text-xl font-bold">Sua trilha</h2>
        <div className="mt-3 grid grid-cols-5 gap-1 rounded-2xl bg-cinza/60 p-1" role="tablist">
          {CEFR_LEVELS.map((lv) => (
            <button key={lv} role="tab" aria-selected={tab === lv} onClick={() => setTab(lv)} className={`min-h-11 rounded-xl text-sm font-bold ${tab === lv ? 'bg-white text-laranja-escuro shadow-sm' : 'text-cinza-texto'}`}>{lv}</button>
          ))}
        </div>
        <Legend />
        <LevelTrail lang={lang} units={trail.levels.find((l) => l.level.id === tab)!.units} />
      </Page>
    </>
  )
}

const Stat = ({ value, label }: { value: React.ReactNode; label: string }) => (
  <div className="rounded-2xl border border-cinza bg-white p-3 text-center"><p className="text-xl font-bold">{value}</p><p className="text-xs text-cinza-texto">{label}</p></div>
)

function Legend() {
  return (
    <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-cinza-texto">
      {(['done', 'current', 'locked', 'review', 'mastered'] as const).map((m) => <span key={m}>{MARK[m].icon} {MARK[m].label.toLowerCase()}</span>)}
    </p>
  )
}

function LevelTrail({ units, lang }: { units: TrailUnit[]; lang: string }) {
  let section = ''
  return (
    <div className="mt-2">
      {units.map((u) => {
        const header = u.sectionTitle !== section ? (section = u.sectionTitle) : null
        return (
          <div key={u.unit.id}>
            {header && <p className="mb-2 mt-5 text-sm font-semibold uppercase tracking-wide text-cinza-texto">{header}</p>}
            <Link to={`/idiomas/${lang}/unidade/${u.unit.id}`} className={`block rounded-3xl border p-4 transition ${u.unlocked ? 'border-cinza bg-white hover:border-laranja' : 'border-cinza/60 bg-white/60'}`}>
              <div className="flex items-start gap-3">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-lg font-bold ${u.passed && !u.planned ? 'bg-sucesso text-white' : u.unlocked ? 'bg-laranja text-white' : 'bg-cinza text-cinza-texto'}`}>{u.planned ? '…' : u.passed ? '★' : u.unlocked ? '●' : '🔒'}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{u.unit.title}</p>
                  <p className="text-sm text-cinza-texto">{u.unit.subtitle}{u.planned ? ' · em produção' : ` · ${u.completed}/${u.available} aulas`}</p>
                  {!u.planned && u.unlocked && <ProgressBar value={u.available ? (100 * u.completed) / u.available : 0} className="mt-2" />}
                </div>
                <ChevronRight size={18} className="mt-3 text-cinza-texto" />
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {u.lessons.map((l) => (
                  <li key={l.id} title={MARK[l.mark].label} className={`rounded-full px-2.5 py-1 text-xs font-medium ${l.mark === 'current' ? 'bg-laranja text-white' : l.mark === 'mastered' ? 'bg-sucesso-suave text-sucesso' : l.mark === 'done' ? 'bg-sucesso-suave text-grafite' : l.mark === 'review' ? 'bg-laranja-suave text-laranja-escuro' : l.mark === 'planned' ? 'bg-cinza/50 text-cinza-texto' : l.mark === 'locked' ? 'bg-cinza/60 text-cinza-texto' : 'bg-offwhite text-grafite ring-1 ring-cinza'}`}>
                    {MARK[l.mark].icon} {l.title}
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
