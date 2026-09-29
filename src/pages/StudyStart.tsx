import { useEffect, useRef, useState } from 'react'
import { ChevronRight, FileText, Search } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LevelPicker } from '../components/LevelPicker'
import { Button, Card, Page, Spinner, TopBar } from '../components/ui'
import { SUBJECTS, subjectById } from '../content/subjects'
import { aiEnabled, aiLesson, AiError, cloudSearch } from '../lib/ai'
import { findLessons, terms, type Match } from '../lib/matcher'
import { detectIntent } from '../lib/intent'
import { allLessons, getLesson, refreshCloudLessons } from '../lib/repo'
import { getState, saveCustomLesson, setProfile, useLumi } from '../lib/store'
import { cloudEnabled } from '../lib/supabase'
import { logTopicRequest } from '../lib/telemetry'
import { normalize } from '../lib/text'
import type { SubjectId } from '../types'

type Phase = { kind: 'level' } | { kind: 'resolving' } | { kind: 'researching' } | { kind: 'choices'; matches: Match[] } | { kind: 'missing'; error?: string }

/** pontuação mínima para considerar que a base local respondeu a pergunta */
const LOCAL_MATCH = 60
const CLOUD_MATCH = 70

/**
 * Fluxo obrigatório: pergunta → base própria (neste aparelho) → base oficial na nuvem (busca full-text)
 * → só então a IA pesquisa (e o conteúdo fica registrado para revisão).
 */
export default function StudyStart() {
  const [params] = useSearchParams()
  const nav = useNavigate()
  const profile = useLumi((s) => s.profile)
  const q = (params.get('q') ?? '').trim()
  const lessonParam = params.get('lesson')
  const subject = (params.get('materia') ?? undefined) as SubjectId | undefined
  const [phase, setPhase] = useState<Phase>(profile.level ? { kind: 'resolving' } : { kind: 'level' })
  const started = useRef(false)

  const openBaseLesson = async (id: string) => {
    if (!getLesson(id)) await refreshCloudLessons(true)
    nav(`/aula/${id}`, { replace: true })
  }

  const research = async () => {
    setPhase({ kind: 'researching' })
    try {
      const r = await aiLesson({ topic: q, subject, level: profile.level, age: profile.age })
      if (r.kind === 'base') return void openBaseLesson(r.lessonId)
      saveCustomLesson(r.lesson)
      nav(`/aula/${r.lesson.id}`, { replace: true })
    } catch (e) {
      setPhase({ kind: 'missing', error: e instanceof AiError ? e.message : 'Algo deu errado ao pesquisar o assunto.' })
    }
  }

  useEffect(() => {
    if (phase.kind !== 'resolving' || started.current) return
    started.current = true
    void (async () => {
      if (lessonParam) return nav(`/aula/${lessonParam}`, { replace: true })
      if (!q) return nav('/', { replace: true })

      // digitou só o nome da matéria → abre a matéria
      const asSubject = SUBJECTS.find((s) => normalize(s.name) === normalize(q))
      if (asSubject && !subject) return nav(`/materia/${asSubject.id}`, { replace: true })

      // "não entendi", "me dá um exemplo", "explica de outro jeito"…
      const intent = detectIntent(q)
      const modo = intent.mode ? `?modo=${intent.mode}` : ''
      const last = getState().lastLessonId
      if (intent.mode && terms(intent.rest).length === 0) {
        if (last && getLesson(last)) return nav(`/aula/${last}${modo}`, { replace: true })
        return setPhase({ kind: 'missing', error: 'Me conta qual assunto você quer que eu explique de outro jeito — por exemplo: "não entendi frações".' })
      }
      const query = intent.mode ? intent.rest : q

      // 1) base própria neste aparelho (inclui as aulas oficiais já baixadas da nuvem)
      const local = findLessons(query, allLessons().filter((l) => l.origin !== 'colado'), subject)
      if (local[0] && local[0].score >= LOCAL_MATCH) return nav(`/aula/${local[0].lesson.id}${modo}`, { replace: true })

      // 2) base oficial na nuvem (PostgreSQL full-text)
      const cloud = await cloudSearch(query, subject)
      if (cloud && cloud.score >= CLOUD_MATCH) return openBaseLesson(cloud.id)

      if (local.length) return setPhase({ kind: 'choices', matches: local.slice(0, 4) })
      // 3) lacuna: a IA pesquisa (o servidor registra a pergunta e o conteúdo para revisão)
      if (aiEnabled) return research()
      if (cloudEnabled) void logTopicRequest(q, subject)
      setPhase({ kind: 'missing' })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase.kind])

  return (
    <>
      <TopBar title={q || 'Estudar'} />
      <Page>
        {phase.kind === 'level' && (
          <LevelPicker
            onPick={(level, age) => {
              setProfile({ level, age })
              setPhase({ kind: 'resolving' })
            }}
          />
        )}
        {phase.kind === 'resolving' && <Spinner label="Procurando na base do LUMI…" />}
        {phase.kind === 'researching' && <Spinner label={`Ainda não tenho "${q}" na minha base. Estou pesquisando em fontes confiáveis e preparando a aula para você…`} />}

        {phase.kind === 'choices' && (
          <div className="animate-rise space-y-3">
            <h2 className="text-xl font-semibold">Você quis dizer…</h2>
            {phase.matches.map(({ lesson }) => (
              <Link key={lesson.id} to={`/aula/${lesson.id}`} replace className="flex items-center gap-3 rounded-2xl border border-cinza bg-white p-4 hover:border-laranja">
                <span className="flex-1">
                  <span className="block font-semibold">{lesson.title}</span>
                  <span className="block text-sm text-cinza-texto">{subjectById(lesson.subject)?.name}{lesson.subtopic && lesson.subtopic !== lesson.title ? ` · ${lesson.subtopic}` : ''}</span>
                </span>
                <ChevronRight size={20} />
              </Link>
            ))}
            {aiEnabled && (
              <Button variant="outline" className="w-full" onClick={research}>
                <Search size={18} /> Não é isso — pesquisar "{q}"
              </Button>
            )}
          </div>
        )}

        {phase.kind === 'missing' && (
          <div className="animate-rise space-y-4">
            <Card>
              <h2 className="text-lg font-semibold">Ainda não tenho uma aula sobre "{q}"</h2>
              <p className="mt-2 text-cinza-texto">
                {phase.error ?? `${cloudEnabled ? 'Anotei sua pergunta para esse assunto entrar na base. ' : ''}Enquanto isso, você pode colar o conteúdo que recebeu na escola que eu organizo e crio exercícios.`}
              </p>
              <div className="mt-4 grid gap-2">
                <Button onClick={() => nav('/colar')}><FileText size={18} /> Tenho um conteúdo para estudar</Button>
                {aiEnabled && phase.error && <Button variant="outline" onClick={research}>Tentar de novo</Button>}
              </div>
            </Card>
            <h3 className="font-semibold">Aulas da base que você pode gostar</h3>
            <div className="space-y-2">
              {allLessons().filter((l) => (!subject || l.subject === subject) && l.origin !== 'colado' && !l.unreviewed).slice(0, 5).map((l) => (
                <Link key={l.id} to={`/aula/${l.id}`} className="flex items-center justify-between rounded-2xl border border-cinza bg-white p-4 hover:border-laranja">
                  <span><span className="block font-medium">{l.title}</span><span className="text-sm text-cinza-texto">{subjectById(l.subject)?.name}</span></span>
                  <ChevronRight size={20} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </Page>
    </>
  )
}
