/**
 * Progress Analytics — Análise de evolução e histórico
 * Gráficos, tendências, comparações
 */

import { supabase } from './supabase'
import type { ContentMastery, SkillMastery } from '../types/learning'

export interface ProgressSnapshot {
  date: string
  overall_mastery: number
  contents_mastered: number
  streak_days: number
  total_attempts: number
  accuracy_percent: number
}

export interface SkillEvolution {
  skill_id: string
  skill_name: string
  history: Array<{
    date: string
    mastery_percent: number
  }>
  trend: 'improving' | 'declining' | 'stable'
  improvement: number // % de melhoria
}

export interface MasteryTrend {
  period: 'week' | 'month' | 'all'
  averageMastery: number
  highestMastery: number
  lowestMastery: number
  trajectory: 'up' | 'down' | 'flat'
}

/**
 * Salvar snapshot do progresso (chamado diariamente)
 */
export async function captureProgressSnapshot(
  userId: string,
  stats: {
    overall_mastery: number
    contents_mastered: number
    streak_days: number
    total_attempts: number
    correct_attempts: number
  }
): Promise<ProgressSnapshot | null> {
  if (!supabase) return null

  try {
    const snapshot: ProgressSnapshot = {
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      overall_mastery: stats.overall_mastery,
      contents_mastered: stats.contents_mastered,
      streak_days: stats.streak_days,
      total_attempts: stats.total_attempts,
      accuracy_percent: stats.total_attempts > 0
        ? Math.round((stats.correct_attempts / stats.total_attempts) * 100)
        : 0,
    }

    // Salvar em tabela de histórico (que será criada no schema)
    const { data, error } = await supabase
      .from('progress_history')
      .insert({
        user_id: userId,
        ...snapshot,
      })
      .select()
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao capturar snapshot:', error)
      return null
    }

    return snapshot
  } catch (e) {
    console.error('Erro em captureProgressSnapshot:', e)
    return null
  }
}

/**
 * Buscar histórico de progresso (últimos N dias)
 */
export async function getProgressHistory(
  userId: string,
  days: number = 30
): Promise<ProgressSnapshot[]> {
  if (!supabase) return []

  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data, error } = await supabase
      .from('progress_history')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true })

    if (error) {
      console.error('Erro ao buscar histórico:', error)
      return []
    }

    return data || []
  } catch (e) {
    console.error('Erro em getProgressHistory:', e)
    return []
  }
}

/**
 * Calcular tendência de mastéry
 */
export function calculateMasteryTrend(history: ProgressSnapshot[]): MasteryTrend {
  if (history.length === 0) {
    return {
      period: 'all',
      averageMastery: 0,
      highestMastery: 0,
      lowestMastery: 0,
      trajectory: 'flat',
    }
  }

  const mastery = history.map((h) => h.overall_mastery)
  const average = Math.round(mastery.reduce((a, b) => a + b, 0) / mastery.length)
  const highest = Math.max(...mastery)
  const lowest = Math.min(...mastery)

  // Trajetória: comparar primeira metade com segunda metade
  const midpoint = Math.floor(history.length / 2)
  const firstHalf = mastery.slice(0, midpoint).reduce((a, b) => a + b, 0) / midpoint
  const secondHalf = mastery.slice(midpoint).reduce((a, b) => a + b, 0) / (history.length - midpoint)
  const trajectory: 'up' | 'down' | 'flat' =
    secondHalf > firstHalf + 5 ? 'up' : secondHalf < firstHalf - 5 ? 'down' : 'flat'

  return {
    period: history.length > 60 ? 'all' : history.length > 7 ? 'month' : 'week',
    averageMastery: average,
    highestMastery: highest,
    lowestMastery: lowest,
    trajectory,
  }
}

/**
 * Calcular evolução por skill
 */
export function calculateSkillEvolution(
  skills: SkillMastery[],
  history: ProgressSnapshot[]
): SkillEvolution[] {
  const skillMap = new Map<string, { name: string; current: number }>()

  skills.forEach((s) => {
    skillMap.set(s.skill_id, { name: s.skill_name, current: s.mastery_percent })
  })

  // Simular histórico de skills (em produção, viria do banco)
  // Por enquanto, usar tendência dos últimos 7 dias
  const recent = history.slice(-7)
  const avgRecent = recent.length > 0
    ? recent.reduce((a, b) => a + b.overall_mastery, 0) / recent.length
    : 0
  const avgOld = history.length > 7
    ? history.slice(0, -7).reduce((a, b) => a + b.overall_mastery, 0) / (history.length - 7)
    : avgRecent

  const evolution: SkillEvolution[] = Array.from(skillMap.entries()).map(([id, data]) => ({
    skill_id: id,
    skill_name: data.name,
    history: recent.map((h) => ({
      date: h.date,
      mastery_percent: data.current, // Simplificado: usar valor atual
    })),
    trend: data.current > avgOld + 5 ? 'improving' : data.current < avgOld - 5 ? 'declining' : 'stable',
    improvement: data.current - avgOld,
  }))

  return evolution
}

/**
 * Gerar badge baseado em progresso
 */
export interface Badge {
  id: string
  title: string
  icon: string
  description: string
  unlockedAt?: string
}

export function generateBadges(stats: {
  overall_mastery: number
  contents_mastered: number
  streak_days: number
  total_attempts: number
}): Badge[] {
  const badges: Badge[] = []

  // Masterpiece (90% mastery)
  if (stats.overall_mastery >= 90) {
    badges.push({
      id: 'masterpiece',
      title: 'Obra-Prima',
      icon: '👑',
      description: 'Atingiu 90% de domínio geral',
    })
  }

  // Expert (75% mastery)
  if (stats.overall_mastery >= 75) {
    badges.push({
      id: 'expert',
      title: 'Expert',
      icon: '🥇',
      description: 'Atingiu 75% de domínio',
    })
  }

  // Prolific (20+ conteúdos dominados)
  if (stats.contents_mastered >= 20) {
    badges.push({
      id: 'prolific',
      title: 'Prolífico',
      icon: '📚',
      description: 'Dominou 20+ conteúdos',
    })
  }

  // Persistent (30+ dia streak)
  if (stats.streak_days >= 30) {
    badges.push({
      id: 'persistent',
      title: 'Persistente',
      icon: '🔥🔥🔥',
      description: '30 dias de estudo consecutivo',
    })
  }

  // Industrious (1000+ tentativas)
  if (stats.total_attempts >= 1000) {
    badges.push({
      id: 'industrious',
      title: 'Trabalhador',
      icon: '⚙️',
      description: 'Respondeu 1000+ questões',
    })
  }

  return badges
}

/**
 * Calcular milestone próximo
 */
export interface Milestone {
  name: string
  icon: string
  target: number
  current: number
  progress_percent: number
  daysToReach?: number
}

export function getNextMilestones(stats: {
  overall_mastery: number
  contents_mastered: number
  streak_days: number
  total_attempts: number
}, history: ProgressSnapshot[] = []): Milestone[] {
  const milestones: Milestone[] = []

  // Próximo milestone de mastery
  const masteryTargets = [50, 60, 70, 80, 90, 100]
  const nextMastery = masteryTargets.find((t) => t > stats.overall_mastery)
  if (nextMastery) {
    const trend = history.length > 0
      ? (history[history.length - 1].overall_mastery - history[0].overall_mastery) / history.length
      : 1
    const daysNeeded = trend > 0 ? Math.ceil((nextMastery - stats.overall_mastery) / trend) : undefined

    milestones.push({
      name: `${nextMastery}% Mastery`,
      icon: '📈',
      target: nextMastery,
      current: stats.overall_mastery,
      progress_percent: Math.round((stats.overall_mastery / nextMastery) * 100),
      daysToReach: daysNeeded,
    })
  }

  // Próximo milestone de conteúdos dominados
  const contentTargets = [5, 10, 20, 50, 100]
  const nextContent = contentTargets.find((t) => t > stats.contents_mastered)
  if (nextContent) {
    milestones.push({
      name: `${nextContent} Conteúdos Dominados`,
      icon: '🏆',
      target: nextContent,
      current: stats.contents_mastered,
      progress_percent: Math.round((stats.contents_mastered / nextContent) * 100),
    })
  }

  // Próximo streak
  const streakTargets = [7, 14, 30, 60, 100]
  const nextStreak = streakTargets.find((t) => t > stats.streak_days)
  if (nextStreak) {
    milestones.push({
      name: `${nextStreak} Dias de Streak`,
      icon: '🔥',
      target: nextStreak,
      current: stats.streak_days,
      progress_percent: Math.round((stats.streak_days / nextStreak) * 100),
    })
  }

  return milestones
}

export default {
  captureProgressSnapshot,
  getProgressHistory,
  calculateMasteryTrend,
  calculateSkillEvolution,
  generateBadges,
  getNextMilestones,
}
