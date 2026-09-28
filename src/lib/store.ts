import { useSyncExternalStore } from 'react'
import type { LevelId, Lesson, Question, SubjectId } from '../types'
import { todayKey } from './text'

export interface LessonStat {
  lessonId: string
  subject: SubjectId
  title: string
  sessions: number
  best: number // 0–100
  last: number // 0–100
  lastAt: string
  completed: boolean
}

export interface SkillStat {
  key: string // `${lessonId}:${skill}`
  lessonId: string
  subject: SubjectId
  label: string
  right: number
  wrong: number
  lastAt: string
}

export interface SessionRecord {
  id: string
  lessonId: string
  title: string
  subject: SubjectId
  level?: LevelId
  mode: 'aula' | 'revisao'
  startedAt: string
  finishedAt: string
  correct: number
  total: number
  hintsUsed: number
  attempts: { questionId: string; skillKey: string; firstCorrect: boolean; tries: number; hints: number }[]
  synced?: boolean
}

export interface LumiState {
  version: 1
  installId: string
  createdAt: string
  profile: { level?: LevelId; age?: number; nickname?: string; userId?: string }
  points: number
  questionsAnswered: number
  correctAnswers: number
  studyDays: string[]
  lessons: Record<string, LessonStat>
  skills: Record<string, SkillStat>
  history: SessionRecord[]
  achievements: Record<string, string>
  customLessons: Record<string, Lesson>
  reviewsDone: number
  pastedStudied: number
  loginPromptDismissedAt?: string
  updatedAt: string
}

const KEY = 'lumi:v1'
const MAX_HISTORY = 200

function fresh(): LumiState {
  const now = new Date().toISOString()
  return {
    version: 1, installId: crypto.randomUUID(), createdAt: now, profile: {}, points: 0, questionsAnswered: 0, correctAnswers: 0,
    studyDays: [], lessons: {}, skills: {}, history: [], achievements: {}, customLessons: {}, reviewsDone: 0, pastedStudied: 0, updatedAt: now,
  }
}

function load(): LumiState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return fresh()
    const parsed = JSON.parse(raw) as LumiState
    return { ...fresh(), ...parsed }
  } catch {
    return fresh()
  }
}

let state: LumiState = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* armazenamento cheio ou bloqueado: o app segue funcionando em memória */
  }
}

export function getState() {
  return state
}

export function setState(update: (s: LumiState) => LumiState) {
  state = { ...update(state), updatedAt: new Date().toISOString() }
  persist()
  listeners.forEach((l) => l())
}

export function replaceState(next: LumiState) {
  state = next
  persist()
  listeners.forEach((l) => l())
}

export function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useLumi<T>(selector: (s: LumiState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(state))
}

export function setProfile(p: Partial<LumiState['profile']>) {
  setState((s) => ({ ...s, profile: { ...s.profile, ...p } }))
}

export function saveCustomLesson(lesson: Lesson) {
  setState((s) => ({ ...s, customLessons: { ...s.customLessons, [lesson.id]: lesson } }))
}

export const skillKey = (lesson: Lesson, q: Question) => (q.skill.includes(':') ? q.skill : `${lesson.id}:${q.skill}`)

export const POINTS = { firstTry: 10, withHints: 6, afterRetry: 3, lessonBonus: 20 }

export function recordSession(lesson: Lesson, rec: Omit<SessionRecord, 'id'>, skillLabels: Record<string, { label: string; lessonId: string; subject: SubjectId }>) {
  setState((s) => {
    const pct = rec.total ? Math.round((rec.correct / rec.total) * 100) : 0
    const now = rec.finishedAt
    const lessons = { ...s.lessons }
    if (rec.mode === 'aula') {
      const prev = lessons[lesson.id]
      lessons[lesson.id] = {
        lessonId: lesson.id, subject: lesson.subject, title: lesson.title,
        sessions: (prev?.sessions ?? 0) + 1, best: Math.max(prev?.best ?? 0, pct), last: pct, lastAt: now, completed: true,
      }
    }
    const skills = { ...s.skills }
    for (const a of rec.attempts) {
      const meta = skillLabels[a.skillKey]
      if (!meta) continue
      const prev = skills[a.skillKey] ?? { key: a.skillKey, lessonId: meta.lessonId, subject: meta.subject, label: meta.label, right: 0, wrong: 0, lastAt: now }
      skills[a.skillKey] = { ...prev, right: prev.right + (a.firstCorrect ? 1 : 0), wrong: prev.wrong + (a.firstCorrect ? 0 : 1), lastAt: now }
    }
    let points = s.points + POINTS.lessonBonus
    for (const a of rec.attempts) points += a.firstCorrect ? (a.hints ? POINTS.withHints : POINTS.firstTry) : a.tries > 1 ? POINTS.afterRetry : 0
    const today = todayKey()
    return {
      ...s,
      lessons, skills, points,
      questionsAnswered: s.questionsAnswered + rec.attempts.length,
      correctAnswers: s.correctAnswers + rec.correct,
      studyDays: s.studyDays.includes(today) ? s.studyDays : [...s.studyDays, today],
      history: [{ ...rec, id: crypto.randomUUID() }, ...s.history].slice(0, MAX_HISTORY),
      reviewsDone: s.reviewsDone + (rec.mode === 'revisao' ? 1 : 0),
      pastedStudied: s.pastedStudied + (lesson.origin === 'colado' ? 1 : 0),
    }
  })
}

/** dias seguidos estudando, contando até hoje (ou até ontem, se ainda não estudou hoje) */
export function currentStreak(days: string[]): number {
  const set = new Set(days)
  const d = new Date()
  if (!set.has(todayKey(d))) d.setDate(d.getDate() - 1)
  let n = 0
  while (set.has(todayKey(d))) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}

export function subjectProgress(s: LumiState): { subject: SubjectId; pct: number; lessons: number }[] {
  const by = new Map<SubjectId, number[]>()
  for (const l of Object.values(s.lessons)) {
    by.set(l.subject, [...(by.get(l.subject) ?? []), l.best])
  }
  return [...by.entries()]
    .map(([subject, arr]) => ({ subject, lessons: arr.length, pct: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) }))
    .sort((a, b) => b.pct - a.pct)
}

/** habilidades em que o aluno errou mais do que deveria — alimentam a revisão */
export function weakSkills(s: LumiState): SkillStat[] {
  return Object.values(s.skills)
    .filter((k) => k.wrong >= 1 && k.wrong / (k.right + k.wrong) >= 0.4)
    .sort((a, b) => b.wrong / (b.right + b.wrong) - a.wrong / (a.right + a.wrong) || b.wrong - a.wrong)
}

export function exportData(): string {
  return JSON.stringify(state, null, 2)
}

export function resetAll() {
  replaceState(fresh())
}
