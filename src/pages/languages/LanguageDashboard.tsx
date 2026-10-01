import { ChevronRight, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, Page, ProgressBar, TopBar } from '../../components/ui'
import { LANG_IDS, LANGUAGES, type LangId } from '../../content/languages'
import { SKILL_INFO, buildTrail, englishTips, reviewPicks, skillProfile, wordsLearned } from '../../lib/english'
import { currentStreak, getState, useLumi, type LumiState } from '../../lib/store'
import type { EnglishSkill } from '../../types'
import { langStarted } from './Languages'

const ORDER: EnglishSkill[] = ['reading', 'writing', 'listening', 'speaking', 'grammar', 'vocabulary']

/** recomendações ligadas ao desempenho real: o que vai bem e o que praticar */
function recommendations(s: LumiState, lang: LangId): { text: string; to: string }[] {
  const prof = skillProfile(s, lang)
  const known = ORDER.filter((k) => prof[k].pct !== null && prof[k].n >= 3)
  const out: { text: string; to: string }[] = []
  const best = [...known].sort((a, b) => prof[b].pct! - prof[a].pct!)[0]
  if (best && prof[best].pct! >= 75) out.push({ text: `Você está evoluindo bem em ${SKILL_INFO[best].label}.`, to: `/idiomas/${lang}` })
  const never = ORDER.find((k) => prof[k].pct === null)
  if (never) out.push({ text: `Que tal praticar ${SKILL_INFO[never].label}?`, to: never === 'speaking' ? '/idiomas/conversacao' : `/idiomas/${lang}` })
  for (const t of englishTips(s, lang)) out.push({ text: t.text, to: t.to })
  return out.slice(0, 3)
}

/** “Meu aprendizado”: painel de todos os idiomas estudados */
export default function LanguageDashboard() {
  useLumi((s) => s.updatedAt)
  const s = getState()
  const started = LANG_IDS.filter((id) => langStarted(s, id))

  return (
    <>
      <TopBar title="Meu aprendizado" />
      <Page>
        <div className="flex items-center gap-2 rounded-2xl bg-laranja-suave p-3 text-sm"><Flame size={18} className="text-laranja" /> <b>{currentStreak(s.studyDays)}</b> dias seguidos de estudo</div>
        {!started.length && (
          <Card className="mt-4 text-center">
            <p className="text-4xl">🌎</p>
            <p className="mt-2 font-semibold">Você ainda não começou nenhum idioma</p>
            <Link to="/idiomas" className="mt-3 inline-block font-semibold text-laranja">Escolher um idioma</Link>
          </Card>
        )}
        {started.map((id) => {
          const L = LANGUAGES[id]
          const trail = buildTrail(s, id)
          const prof = skillProfile(s, id)
          const units = trail.levels.flatMap((l) => l.units).filter((u) => !u.planned)
          const lessons = units.flatMap((u) => u.lessons).filter((l) => l.available)
          const modules = trail.levels.flatMap((l) => {
            const bySection = new Map<string, boolean>()
            for (const u of l.units.filter((x) => !x.planned)) bySection.set(u.sectionTitle, (bySection.get(u.sectionTitle) ?? true) && u.passed)
            return [...bySection.values()]
          })
          const grammarDone = lessons.filter((l) => l.m?.state === 'MASTERED').length
          const pct = trail.levels.find((l) => l.level.id === trail.level)?.pct ?? 0
          return (
            <Card key={id} className="mt-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl" aria-hidden>{L.flag}</span>
                <div className="flex-1"><p className="text-lg font-bold">{L.name}</p><p className="text-sm text-cinza-texto">Nível {trail.level} · {pct}%</p></div>
                <Link to={`/idiomas/${id}`} className="inline-flex min-h-11 items-center rounded-2xl bg-laranja px-3 text-sm font-semibold text-white">Continuar <ChevronRight size={16} /></Link>
              </div>
              <ProgressBar value={pct} className="mt-3" />
              <div className="mt-4 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
                <Mini v={`${modules.filter(Boolean).length}/${modules.length}`} l="Módulos concluídos" />
                <Mini v={`${lessons.filter((l) => l.m?.completed).length}/${lessons.length}`} l="Aulas concluídas" />
                <Mini v={`${wordsLearned(s, id)}`} l="Palavras estudadas" />
                <Mini v={`${grammarDone}`} l="Conteúdos dominados" />
              </div>
              <div className="mt-4 grid gap-2">
                {ORDER.map((k) => (
                  <div key={k}>
                    <div className="flex justify-between text-sm"><span>{SKILL_INFO[k].icon} {SKILL_INFO[k].label}</span><span className="text-cinza-texto">{prof[k].pct === null ? '—' : `${prof[k].pct}%`}</span></div>
                    <ProgressBar value={prof[k].pct ?? 0} className="mt-1" />
                  </div>
                ))}
              </div>
              {reviewPicks(s, 3, id).length > 0 && <Link to={`/idiomas/${id}/revisar`} className="mt-4 block rounded-2xl bg-laranja-suave p-3 text-sm font-semibold text-laranja-escuro">🔄 {reviewPicks(s, 3, id).length} conteúdo(s) para revisar →</Link>}
              {recommendations(s, id).map((r) => <Link key={r.text} to={r.to} className="mt-2 block text-sm text-grafite underline-offset-2 hover:underline">💡 {r.text}</Link>)}
            </Card>
          )
        })}
      </Page>
    </>
  )
}

const Mini = ({ v, l }: { v: string; l: string }) => <div className="rounded-2xl border border-cinza p-2"><p className="text-lg font-bold">{v}</p><p className="text-[11px] leading-tight text-cinza-texto">{l}</p></div>
