import type { Lesson } from '../types'

export interface SearchIndex {
  id: string
  subject: string
  title: string
  summary: string
  aliases: string[]
  grade: string
  keywords: string[]
}

export function buildSearchIndex(lessons: Lesson[]): SearchIndex[] {
  return lessons.map((lesson) => {
    const keywords = [
      lesson.title.toLowerCase(),
      lesson.summary.toLowerCase(),
      ...(lesson.aliases || []).map((a) => a.toLowerCase()),
      lesson.subject.toLowerCase(),
      ...(lesson.blocks || []).map((b) => b.title.toLowerCase()),
      ...(lesson.topic ? [lesson.topic.toLowerCase()] : []),
      ...(lesson.subtopic ? [lesson.subtopic.toLowerCase()] : []),
    ]

    return {
      id: lesson.id,
      subject: lesson.subject,
      title: lesson.title,
      summary: lesson.summary,
      aliases: lesson.aliases || [],
      grade: lesson.grade,
      keywords: [...new Set(keywords)],
    }
  })
}

export function smartSearch(
  query: string,
  index: SearchIndex[],
  limit = 10
): SearchIndex[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const terms = q.split(/\s+/)

  const scored = index
    .map((item) => {
      let score = 0

      // Exact title match: +100
      if (item.title.toLowerCase() === q) score += 100

      // Title contains query: +50
      if (item.title.toLowerCase().includes(q)) score += 50

      // Alias match: +80
      if (item.aliases.some((a) => a.toLowerCase() === q)) score += 80

      // Each term match in keywords: +10
      terms.forEach((term) => {
        if (item.keywords.some((k) => k.includes(term))) score += 10
      })

      // Subject match: +5
      if (item.subject.includes(q)) score += 5

      return { item, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return scored.map((r) => r.item)
}

export function suggestTopics(lessons: Lesson[]): { subject: string; count: number }[] {
  const subjects: Record<string, number> = {}

  lessons.forEach((lesson) => {
    subjects[lesson.subject] = (subjects[lesson.subject] || 0) + 1
  })

  return Object.entries(subjects)
    .map(([subject, count]) => ({ subject, count }))
    .sort((a, b) => b.count - a.count)
}

export function recommendNext(currentId: string, lessons: Lesson[]): Lesson[] {
  const current = lessons.find((l) => l.id === currentId)
  if (!current) return []

  // Recomenda próximas baseado em: mesmo subject, próximo grade, ou next field
  const candidates = lessons.filter((l) => {
    if (l.id === currentId) return false
    if (current.next?.includes(l.id)) return true
    if (l.subject === current.subject) return true
    return false
  })

  return candidates.slice(0, 5)
}
