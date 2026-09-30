// Recomendação de jogos: considera o que o aluno estudou por último, as habilidades com mais erros,
// a trilha de Inglês e o que ele já jogou hoje (para variar).
import type { Lesson, SubjectId } from '../types'
import { buildTrail } from '../lib/english'
import { allLessons, getLesson } from '../lib/repo'
import { getState, weakSkills, type LumiState } from '../lib/store'
import { availableGames } from './content'
import type { GameId } from './registry'

const PRIORITY: Partial<Record<SubjectId, GameId[]>> = {
  ingles: ['memoria', 'quiz', 'complete', 'caca', 'ligue', 'dialogo', 'ordem', 'listening', 'reading', 'mapa', 'quebra'],
  historia: ['caca', 'memoria', 'ordem', 'quiz', 'mapa', 'ligue', 'quebra', 'complete'],
  geografia: ['mapa', 'quiz', 'memoria', 'caca', 'ligue', 'quebra', 'ordem', 'complete'],
  matematica: ['quiz', 'complete', 'ordem', 'ligue', 'memoria', 'quebra', 'caca'],
}
const DEFAULT: GameId[] = ['quiz', 'memoria', 'ligue', 'complete', 'caca', 'ordem', 'mapa', 'quebra', 'dialogo', 'listening', 'reading']

/** jogos que fazem sentido para esta aula, na ordem mais útil para a matéria */
export function gamesForLesson(l: Lesson, max = 4): GameId[] {
  const avail = new Set(availableGames(l))
  return (PRIORITY[l.subject] ?? DEFAULT).filter((g) => avail.has(g)).slice(0, max)
}

export interface Recommendation { lesson: Lesson; game: GameId; reason: string }

export function recommendedGames(s: LumiState = getState(), max = 6): Recommendation[] {
  const out: Recommendation[] = []
  const used = new Set<string>()
  const playedToday = new Set(s.games.filter((g) => Date.now() - new Date(g.finishedAt).getTime() < 864e5).map((g) => `${g.lessonId}:${g.game}`))
  const add = (l: Lesson | undefined, reason: string) => {
    if (!l || used.has(l.id) || out.length >= max) return
    const game = gamesForLesson(l, 8).find((g) => !playedToday.has(`${l.id}:${g}`)) ?? gamesForLesson(l, 1)[0]
    if (!game) return
    used.add(l.id)
    out.push({ lesson: l, game, reason })
  }
  for (const w of weakSkills(s).slice(0, 3)) add(getLesson(w.lessonId), `Para reforçar: ${w.label}`)
  for (const h of s.history.filter((h) => h.mode === 'aula').slice(0, 8)) add(getLesson(h.lessonId), 'Você estudou recentemente')
  const cur = buildTrail(s).current?.lessonId
  if (cur) add(getLesson(cur), 'Da sua trilha de Inglês')
  // sem histórico ainda: sugestões variadas da base
  for (const l of allLessons().filter((x) => x.origin === 'base' || x.origin === 'nuvem')) {
    if (out.length >= Math.min(max, 4)) break
    if (['ingles', 'historia', 'geografia', 'ciencias'].includes(l.subject)) add(l, 'Para começar')
  }
  return out
}
