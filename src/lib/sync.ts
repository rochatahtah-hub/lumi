import { freshEnglish, getState, replaceState, subscribe, type LumiState } from './store'
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
  const le = { ...freshEnglish(), ...local.english }, re = { ...freshEnglish(), ...remote.english }
  const unitTests = { ...re.unitTests }
  for (const [id, t] of Object.entries(le.unitTests)) {
    const r = unitTests[id]
    unitTests[id] = !r ? t : { best: Math.max(t.best, r.best), last: t.at > r.at ? t.last : r.last, at: t.at > r.at ? t.at : r.at, tries: Math.max(t.tries, r.tries) }
  }
  const vocab = { ...re.vocab }
  for (const [w, v] of Object.entries(le.vocab)) {
    const r = vocab[w]
    vocab[w] = !r ? v : { right: Math.max(v.right, r.right), wrong: Math.max(v.wrong, r.wrong), lastAt: v.lastAt > r.lastAt ? v.lastAt : r.lastAt }
  }
  const views = { ...re.views }
  for (const [id, at] of Object.entries(le.views)) if (!views[id] || at > views[id]) views[id] = at
  const byId = <T extends { id: string }>(a: T[], b: T[]) => [...new Map([...a, ...b].map((x) => [x.id, x])).values()]
  const english = {
    placement: [le.placement, re.placement].filter((x) => !!x).sort((a, b) => b!.at.localeCompare(a!.at))[0],
    unitTests, vocab, views,
    activities: byId(re.activities, le.activities).sort((a, b) => b.at.localeCompare(a.at)).slice(0, 400),
  }
  const games = byId(remote.games ?? [], local.games ?? []).sort((a, b) => b.finishedAt.localeCompare(a.finishedAt)).slice(0, 300)
  return {
    ...local,
    games, english,
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
  void pushCourseData().catch(() => { /* o snapshot já garante o progresso; o espelho tenta de novo na próxima vez */ })
}

/** sincroniza alguns segundos depois de qualquer mudança, só para quem tem conta */
export function startAutoSync() {
  return subscribe(() => {
    if (!getState().profile.userId) return
    clearTimeout(timer)
    timer = setTimeout(() => void pushSnapshot(), 4000)
  })
}

/**
 * Espelha o progresso do curso e dos jogos nas tabelas próprias (relatórios e painel).
 * Inserções repetidas são ignoradas pelo banco (mesmo id), então pode rodar a cada sincronização.
 */
export async function pushCourseData() {
  const s = getState()
  const uid = s.profile.userId
  if (!supabase || !uid) return
  const { buildTrail, lessonMastery, wordsLearned } = await import('./english')
  const { allLessons } = await import('./repo')
  const games = s.games.slice(0, 50).map((g) => ({
    id: g.id, user_id: uid, lesson_id: g.lessonId, game_type: g.game, subject_id: g.subject, difficulty: g.difficulty, correct: g.correct, wrong: g.wrong,
    hints: g.hints, moves: g.moves, total: g.total, ms: Math.min(g.ms, 2_000_000_000), completed: g.completed, created_at: g.finishedAt,
  }))
  const acts = s.english.activities.slice(0, 50).map((a) => ({ id: a.id, user_id: uid, lesson_id: a.lessonId, kind: a.kind, correct: a.correct, total: a.total, created_at: a.at }))
  const mastery = allLessons().filter((l) => l.english).map((l) => ({ l, m: lessonMastery(s, l.id) })).filter(({ m }) => m.state !== 'NOT_STARTED').map(({ l, m }) => ({
    user_id: uid, lesson_id: l.id, mastery: m.mastery, state: m.state, attempts: m.attempts, right_answers: m.right, wrong_answers: m.wrong, reviews: m.reviews,
    error_skills: m.weak, time_ms: m.ms, last_at: m.lastAt ?? null, updated_at: new Date().toISOString(),
  }))
  await Promise.allSettled([
    games.length ? supabase.from('game_attempts').upsert(games, { onConflict: 'id', ignoreDuplicates: true }) : null,
    acts.length ? supabase.from('english_attempts').upsert(acts, { onConflict: 'id', ignoreDuplicates: true }) : null,
    mastery.length ? supabase.from('english_mastery').upsert(mastery, { onConflict: 'user_id,lesson_id' }) : null,
    supabase.from('english_progress').upsert({
      user_id: uid, level: buildTrail(s).level, placement: s.english.placement ?? null, words_learned: wordsLearned(s), updated_at: new Date().toISOString(),
      units_passed: Object.entries(s.english.unitTests).filter(([, t]) => t.best >= 70).map(([id]) => id),
    }, { onConflict: 'user_id' }),
  ])
}
