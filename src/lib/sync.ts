import { getState, replaceState, subscribe, type LumiState } from './store'
import { supabase } from './supabase'

/** junta o progresso local com o da nuvem sem perder nada nem contar em dobro */
export function mergeStates(local: LumiState, remote: LumiState): LumiState {
  const lessons = { ...remote.lessons }
  for (const [id, l] of Object.entries(local.lessons)) {
    const r = lessons[id]
    lessons[id] = !r ? l : { ...l, sessions: Math.max(l.sessions, r.sessions), best: Math.max(l.best, r.best), ...(r.lastAt > l.lastAt ? { last: r.last, lastAt: r.lastAt } : {}) }
  }
  const skills = { ...remote.skills }
  for (const [k, s] of Object.entries(local.skills)) {
    const r = skills[k]
    skills[k] = !r ? s : { ...s, right: Math.max(s.right, r.right), wrong: Math.max(s.wrong, r.wrong), lastAt: s.lastAt > r.lastAt ? s.lastAt : r.lastAt }
  }
  const history = [...new Map([...remote.history, ...local.history].map((h) => [h.id, h])).values()].sort((a, b) => b.finishedAt.localeCompare(a.finishedAt)).slice(0, 200)
  return {
    ...local,
    profile: { ...remote.profile, ...local.profile },
    points: Math.max(local.points, remote.points),
    questionsAnswered: Math.max(local.questionsAnswered, remote.questionsAnswered),
    correctAnswers: Math.max(local.correctAnswers, remote.correctAnswers),
    reviewsDone: Math.max(local.reviewsDone, remote.reviewsDone),
    pastedStudied: Math.max(local.pastedStudied, remote.pastedStudied),
    studyDays: [...new Set([...local.studyDays, ...remote.studyDays])].sort(),
    achievements: { ...remote.achievements, ...local.achievements },
    customLessons: { ...remote.customLessons, ...local.customLessons },
    lessons, skills, history,
  }
}

export async function pullAndMerge(userId: string) {
  if (!supabase) return
  const { data } = await supabase.from('progress_snapshots').select('data').eq('user_id', userId).maybeSingle()
  const local = { ...getState(), profile: { ...getState().profile, userId } }
  const merged = data?.data ? mergeStates(local, { ...local, ...(data.data as LumiState) }) : local
  replaceState(merged)
  await pushSnapshot()
}

let timer: ReturnType<typeof setTimeout> | undefined
export async function pushSnapshot() {
  const s = getState()
  if (!supabase || !s.profile.userId) return
  // o instalador e o próprio userId ficam de fora do snapshot
  const { installId: _i, ...data } = s
  void _i
  await supabase.from('progress_snapshots').upsert({ user_id: s.profile.userId, data, updated_at: new Date().toISOString() })
}

/** sincroniza alguns segundos depois de qualquer mudança, só para quem tem conta */
export function startAutoSync() {
  return subscribe(() => {
    if (!getState().profile.userId) return
    clearTimeout(timer)
    timer = setTimeout(() => void pushSnapshot(), 4000)
  })
}
