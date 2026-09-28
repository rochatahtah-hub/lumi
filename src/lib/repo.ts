import { useEffect, useState } from 'react'
import { BASE_LESSONS } from '../content'
import type { Lesson } from '../types'
import { getState, useLumi } from './store'
import { supabase } from './supabase'
import { validateLesson } from './validate'

const CLOUD_KEY = 'lumi:cloud-lessons'

function readCloudCache(): Lesson[] {
  try {
    return JSON.parse(localStorage.getItem(CLOUD_KEY) ?? '[]') as Lesson[]
  } catch {
    return []
  }
}

let cloud: Lesson[] = readCloudCache()
let fetched = false
const listeners = new Set<() => void>()

/** baixa aulas publicadas na nuvem (revisadas no painel admin) e guarda para uso offline */
export async function refreshCloudLessons(force = false) {
  if (!supabase || (fetched && !force)) return
  fetched = true
  const { data, error } = await supabase.rpc('published_lessons')
  if (error || !Array.isArray(data)) return
  cloud = data
    .map((row: { id: string; content: unknown }) => validateLesson(row.content, { id: row.id, origin: 'nuvem' }))
    .filter((l): l is Lesson => !!l)
  try {
    localStorage.setItem(CLOUD_KEY, JSON.stringify(cloud))
  } catch {
    /* sem espaço: segue só em memória */
  }
  listeners.forEach((l) => l())
}

export function allLessons(): Lesson[] {
  const byId = new Map<string, Lesson>()
  for (const l of BASE_LESSONS) byId.set(l.id, l)
  for (const l of cloud) byId.set(l.id, l) // versão revisada na nuvem substitui a embutida de mesmo id
  for (const l of Object.values(getState().customLessons)) byId.set(l.id, l)
  return [...byId.values()]
}

export function getLesson(id: string): Lesson | undefined {
  return allLessons().find((l) => l.id === id)
}

export function useAllLessons(): Lesson[] {
  useLumi((s) => s.customLessons)
  const [, force] = useState(0)
  useEffect(() => {
    const l = () => force((n) => n + 1)
    listeners.add(l)
    void refreshCloudLessons()
    return () => {
      listeners.delete(l)
    }
  }, [])
  return allLessons()
}
