/**
 * Study Goals — Metas e objetivos de estudo
 * Ajuda o aluno a manter foco e acompanhar progresso
 */

import { supabase } from './supabase'

export type GoalType = 'daily_lessons' | 'weekly_mastery' | 'skill_focus' | 'review_target' | 'custom'
export type GoalFrequency = 'daily' | 'weekly' | 'monthly'

export interface StudyGoal {
  id: string
  user_id: string
  type: GoalType
  title: string
  description: string
  target: number // 1 aula, 80% domínio, 5 skills, etc
  current: number // progresso atual
  frequency: GoalFrequency
  deadline?: string // ISO date
  status: 'active' | 'completed' | 'abandoned'
  created_at: string
  updated_at: string
}

/**
 * Metas pré-definidas que são criadas automaticamente
 */
const defaultGoals = [
  {
    type: 'daily_lessons' as GoalType,
    title: '📚 Aula do Dia',
    description: 'Comece uma nova aula hoje',
    target: 1,
    frequency: 'daily' as GoalFrequency,
  },
  {
    type: 'weekly_mastery' as GoalType,
    title: '🏆 Semana Produtiva',
    description: 'Domine 1 conteúdo essa semana',
    target: 1,
    frequency: 'weekly' as GoalFrequency,
  },
  {
    type: 'review_target' as GoalType,
    title: '🧠 Revisão Prioritária',
    description: 'Revise todos os conteúdos na fila',
    target: 3,
    frequency: 'weekly' as GoalFrequency,
  },
]

/**
 * Criar metas padrão para novo usuário
 */
export async function createDefaultGoals(userId: string): Promise<StudyGoal[]> {
  if (!supabase) return []

  try {
    const goals: Omit<StudyGoal, 'id' | 'current'>[] = defaultGoals.map((g) => ({
      user_id: userId,
      ...g,
      current: 0,
      status: 'active' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))

    const { data, error } = await supabase.from('study_goals').insert(goals).select()

    if (error) {
      console.error('Erro ao criar metas padrão:', error)
      return []
    }

    return data || []
  } catch (e) {
    console.error('Erro em createDefaultGoals:', e)
    return []
  }
}

/**
 * Buscar metas ativas do usuário
 */
export async function getActiveGoals(userId: string): Promise<StudyGoal[]> {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('study_goals')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('frequency', { ascending: false })

    if (error) {
      console.error('Erro ao buscar metas:', error)
      return []
    }

    return data || []
  } catch (e) {
    console.error('Erro em getActiveGoals:', e)
    return []
  }
}

/**
 * Atualizar progresso de uma meta
 */
export async function updateGoalProgress(goalId: string, newCurrent: number): Promise<StudyGoal | null> {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('study_goals')
      .update({ current: newCurrent, updated_at: new Date().toISOString() })
      .eq('id', goalId)
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar meta:', error)
      return null
    }

    return data
  } catch (e) {
    console.error('Erro em updateGoalProgress:', e)
    return null
  }
}

/**
 * Completar uma meta
 */
export async function completeGoal(goalId: string): Promise<StudyGoal | null> {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('study_goals')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', goalId)
      .select()
      .single()

    if (error) {
      console.error('Erro ao completar meta:', error)
      return null
    }

    return data
  } catch (e) {
    console.error('Erro em completeGoal:', e)
    return null
  }
}

/**
 * Calcular progresso da meta em %
 */
export function getGoalProgress(goal: StudyGoal): number {
  if (goal.target === 0) return 0
  return Math.min(100, Math.round((goal.current / goal.target) * 100))
}

/**
 * Mensagem motivadora baseada no progresso
 */
export function getGoalMotivation(goal: StudyGoal): string {
  const progress = getGoalProgress(goal)

  if (progress === 0) {
    return `Comece agora! ${goal.target} ${goal.type === 'daily_lessons' ? 'aula(s)' : 'item(ns)'} para atingir.`
  }
  if (progress < 50) {
    return `Você está indo bem! Faltam ${goal.target - goal.current} para completar.`
  }
  if (progress < 100) {
    return `Quase lá! Mais ${goal.target - goal.current} para atingir a meta!`
  }
  return '🎉 Meta atingida! Que tal criar uma nova?'
}

export default {
  createDefaultGoals,
  getActiveGoals,
  updateGoalProgress,
  completeGoal,
  getGoalProgress,
  getGoalMotivation,
}
