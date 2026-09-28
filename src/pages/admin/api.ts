import { BASE_LESSONS } from '../../content'
import { getState } from '../../lib/store'
import { supabase } from '../../lib/supabase'
import type { Lesson } from '../../types'

export type LessonStatus = 'draft' | 'in_review' | 'published' | 'archived'
export interface LessonRow { id: string; title: string; subject_id: string; status: LessonStatus; origin: string; version: number; updated_at: string }
export interface Dashboard {
  students: number; students_30d: number; accounts: number; sessions: number; sessions_7d: number; attempts: number
  subjects: number; topics: number; lessons: number; lessons_published: number; questions: number; pending_research: number; unanswered_30d?: number
  most_accessed: { lesson_ref: string; subject_id: string; sessions: number; avg_pct: number }[]
  highest_error: { question_ref: string; skill: string; attempts: number; error_pct: number }[]
  requested_topics: { topic: string; requests: number }[]
  sessions_by_day: { day: string; sessions: number }[]
}
export interface AiFound {
  id: string; question: string; topic: string; subject_id: string | null; level: string | null; content: Lesson
  sources: { title: string; url: string }[]; provider: string | null; origin: 'aluno' | 'admin' | 'rotina'
  status: 'pending' | 'approved' | 'rejected'; times_served: number; lesson_id: string | null; review_notes: string | null
  reviewed_at: string | null; created_at: string
}
export interface Unanswered { question: string; times: number; first_at: string; last_at: string; subject_id: string | null; possible_topic: string | null; has_ai_content: boolean; resolved: boolean }
export interface KbStats { new_lessons: number; reviewed_lessons: number; corrections: number; new_questions: number; ai_found: number; ai_approved: number; ai_pending: number; unanswered: number; published_total: number; questions_total: number }
export interface KbStatus { last_update: string | null; next_update: string; current_period_start: string; current: KbStats; history: { id: number; period_start: string; closed_at: string; notes: string | null; summary: KbStats }[] }

/** sem backend, o painel abre em modo de visualização com a base embutida e os dados deste aparelho */
export const localMode = !supabase

const sb = () => {
  if (!supabase) throw new Error('Backend não configurado.')
  return supabase
}

export async function isAdmin(): Promise<boolean> {
  const { data } = await sb().rpc('is_admin')
  return data === true
}

export async function dashboard(): Promise<Dashboard> {
  if (localMode) {
    const s = getState()
    const byLesson = new Map<string, { subject: string; n: number; pct: number[] }>()
    const byQ = new Map<string, { skill: string; n: number; wrong: number }>()
    for (const h of s.history) {
      const e = byLesson.get(h.lessonId) ?? { subject: h.subject, n: 0, pct: [] }
      e.n++
      e.pct.push(h.total ? (h.correct / h.total) * 100 : 0)
      byLesson.set(h.lessonId, e)
      for (const a of h.attempts) {
        const q = byQ.get(a.questionId) ?? { skill: a.skillKey, n: 0, wrong: 0 }
        q.n++
        if (!a.firstCorrect) q.wrong++
        byQ.set(a.questionId, q)
      }
    }
    return {
      students: s.history.length ? 1 : 0, students_30d: s.history.length ? 1 : 0, accounts: 0, sessions: s.history.length,
      sessions_7d: s.history.filter((h) => Date.now() - Date.parse(h.finishedAt) < 7 * 86400_000).length,
      attempts: s.questionsAnswered, subjects: 13, topics: BASE_LESSONS.length, lessons: BASE_LESSONS.length, lessons_published: BASE_LESSONS.length,
      questions: BASE_LESSONS.reduce((a, l) => a + l.questions.length, 0), pending_research: 0,
      most_accessed: [...byLesson].map(([lesson_ref, e]) => ({ lesson_ref, subject_id: e.subject, sessions: e.n, avg_pct: Math.round(e.pct.reduce((a, b) => a + b, 0) / e.n) })).sort((a, b) => b.sessions - a.sessions).slice(0, 10),
      highest_error: [...byQ].filter(([, q]) => q.n >= 1).map(([question_ref, q]) => ({ question_ref, skill: q.skill, attempts: q.n, error_pct: Math.round((q.wrong / q.n) * 100) })).sort((a, b) => b.error_pct - a.error_pct).slice(0, 10),
      requested_topics: [], sessions_by_day: [],
    }
  }
  const { data, error } = await sb().rpc('admin_dashboard')
  if (error) throw error
  return data as Dashboard
}

export async function listLessons(): Promise<LessonRow[]> {
  if (localMode) return BASE_LESSONS.map((l) => ({ id: l.id, title: l.title, subject_id: l.subject, status: 'published', origin: 'base', version: 1, updated_at: '' }))
  const { data, error } = await sb().from('lessons').select('id,title,subject_id,status,origin,version,updated_at').order('updated_at', { ascending: false })
  if (error) throw error
  return data as LessonRow[]
}

export async function loadLesson(id: string): Promise<(Lesson & { status?: LessonStatus; version?: number }) | null> {
  if (localMode) return BASE_LESSONS.find((l) => l.id === id) ?? null
  const { data, error } = await sb().rpc('lesson_json', { p_id: id })
  if (error) throw error
  return data
}

export async function saveLesson(lesson: Lesson, status?: LessonStatus) {
  const { error } = await sb().rpc('admin_save_lesson', { p: lesson, p_status: status ?? null })
  if (error) throw error
}

export async function setLessonStatus(id: string, status: LessonStatus) {
  const { error } = await sb().rpc('admin_set_lesson_status', { p_id: id, p_status: status })
  if (error) throw error
}

export async function lessonVersions(id: string) {
  if (localMode) return []
  const { data } = await sb().rpc('admin_lesson_history', { p_id: id })
  return (data ?? []) as { version: number; saved_at: string; saved_by_email: string; content: Lesson }[]
}

export async function listAiFound(status: AiFound['status']): Promise<AiFound[]> {
  if (localMode) return []
  const { data, error } = await sb().from('ai_found_contents').select('*').eq('status', status).order('created_at', { ascending: false }).limit(200)
  if (error) throw error
  return data as AiFound[]
}

export async function getAiFound(id: string): Promise<AiFound | null> {
  if (localMode) return null
  const { data } = await sb().from('ai_found_contents').select('*').eq('id', id).maybeSingle()
  return data as AiFound | null
}

export async function promoteAiFound(id: string, lesson: Lesson): Promise<string> {
  const { data, error } = await sb().rpc('admin_promote_ai_content', { p_id: id, p_lesson: lesson })
  if (error) throw error
  return data as string
}

export async function rejectAiFound(id: string, notes: string) {
  const { error } = await sb().rpc('admin_reject_ai_content', { p_id: id, p_notes: notes })
  if (error) throw error
}

export async function unanswered(days = 90): Promise<Unanswered[]> {
  if (localMode) return []
  const { data, error } = await sb().rpc('admin_unanswered', { p_days: days })
  if (error) throw error
  return data as Unanswered[]
}

export async function kbStatus(): Promise<KbStatus | null> {
  if (localMode) return null
  const { data, error } = await sb().rpc('admin_kb_update_status')
  if (error) throw error
  return data as KbStatus
}

export async function closeKbCycle(notes: string) {
  const { error } = await sb().rpc('admin_close_kb_cycle', { p_notes: notes })
  if (error) throw error
}

export async function kb<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await sb().functions.invoke('kb-admin', { body })
  if (error) {
    const ctx = (error as { context?: Response }).context
    const j = ctx ? await ctx.json().catch(() => null) : null
    throw new Error(j?.message ?? 'Falha ao chamar a rotina de pesquisa.')
  }
  return data as T
}

export async function listSources() {
  if (localMode) {
    const map = new Map<string, { id: string; title: string; url: string | null; kind: string; trust: string }>()
    for (const l of BASE_LESSONS) for (const s of l.sources ?? []) map.set(s.title, { id: s.title, title: s.title, url: s.url ?? null, kind: s.kind, trust: 'ok' })
    return [...map.values()]
  }
  const { data } = await sb().from('sources').select('id,title,url,kind,trust').order('created_at', { ascending: false })
  return (data ?? []) as { id: string; title: string; url: string | null; kind: string; trust: string }[]
}

export async function setSourceTrust(id: string, trust: string) {
  await sb().from('sources').update({ trust }).eq('id', id)
}

export async function listChannels() {
  if (localMode) return []
  const { data } = await sb().from('trusted_channels').select('*').order('name')
  return (data ?? []) as { id: string; name: string; youtube_channel_id: string | null; subjects: string[]; note: string | null; active: boolean }[]
}

export async function upsertChannel(c: { id?: string; name: string; subjects: string[]; active: boolean; note?: string }) {
  const { error } = await sb().from('trusted_channels').upsert(c)
  if (error) throw error
}
