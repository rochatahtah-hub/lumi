/**
 * Simulations — Simulados e avaliações
 * Preparação para provas reais
 */

import { supabase } from './supabase'
import type { Question, Lesson } from '../types'

export type SimulationMode = 'subject' | 'grade' | 'skills' | 'mixed'
export type SimulationDifficulty = 'easy' | 'medium' | 'hard' | 'adaptive'

export interface SimulationSession {
  id: string
  user_id: string
  mode: SimulationMode
  difficulty: SimulationDifficulty
  subject?: string
  grade?: string
  skills?: string[]
  target_questions?: number
  started_at: string
  completed_at?: string
  result?: SimulationResult
}

export interface SimulationResult {
  total_questions: number
  correct_answers: number
  accuracy_percent: number
  time_seconds: number
  skills_performance: SkillPerformance[]
  recommendations: string[]
  strong_areas: string[]
  weak_areas: string[]
  estimated_grade?: string
}

export interface SkillPerformance {
  skill_id: string
  skill_name: string
  accuracy_percent: number
  questions_attempted: number
  difficulty_average: number
}

/**
 * Criar sessão de simulado
 */
export async function createSimulation(
  userId: string,
  mode: SimulationMode,
  difficulty: SimulationDifficulty,
  options?: {
    subject?: string
    grade?: string
    skills?: string[]
    target_questions?: number
  }
): Promise<SimulationSession | null> {
  if (!supabase) return null

  try {
    const { data, error } = await supabase
      .from('simulation_sessions')
      .insert({
        user_id: userId,
        mode,
        difficulty,
        subject: options?.subject,
        grade: options?.grade,
        skills: options?.skills,
        target_questions: options?.target_questions || 20,
        started_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar simulado:', error)
      return null
    }

    return data
  } catch (e) {
    console.error('Erro em createSimulation:', e)
    return null
  }
}

/**
 * Gerar questões para o simulado
 * Filtra e ordena questões por modo/dificuldade
 */
export function generateSimulationQuestions(
  allQuestions: Question[],
  mode: SimulationMode,
  difficulty: SimulationDifficulty,
  options?: {
    subject?: string
    skills?: string[]
    count?: number
  }
): Question[] {
  let filtered = [...allQuestions]

  // Filtro por skill
  if (options?.skills && options.skills.length > 0) {
    filtered = filtered.filter((q) => options.skills?.includes(q.skill))
  }

  // Ordenar por dificuldade
  if (difficulty !== 'adaptive') {
    const difficultyMap = { easy: 1, medium: 2, hard: 3 }
    const targetDiff = difficultyMap[difficulty]

    filtered.sort((a, b) => {
      const diffA = Math.abs(a.difficulty - targetDiff)
      const diffB = Math.abs(b.difficulty - targetDiff)
      return diffA - diffB
    })
  } else {
    // Adaptive: misturar dificuldades
    filtered.sort(() => Math.random() - 0.5)
  }

  // Limitar quantidade
  const count = options?.count || 20
  return filtered.slice(0, count)
}

/**
 * Completar simulado e calcular resultado
 */
export async function completeSimulation(
  simulationId: string,
  answers: Array<{
    questionId: string
    isCorrect: boolean
    skillId: string
    difficulty: number
    timeSeconds: number
  }>,
  totalTimeSeconds: number
): Promise<SimulationResult | null> {
  if (!supabase) return null

  try {
    // Calcular acurácia
    const correct = answers.filter((a) => a.isCorrect).length
    const total = answers.length
    const accuracy = Math.round((correct / total) * 100)

    // Calcular performance por skill
    const skillMap = new Map<string, { correct: number; total: number; difficulties: number[] }>()

    for (const answer of answers) {
      const current = skillMap.get(answer.skillId) || { correct: 0, total: 0, difficulties: [] }
      current.total++
      if (answer.isCorrect) current.correct++
      current.difficulties.push(answer.difficulty)
      skillMap.set(answer.skillId, current)
    }

    const skills_performance: SkillPerformance[] = Array.from(skillMap.entries()).map(
      ([skillId, data]) => ({
        skill_id: skillId,
        skill_name: skillId, // será preenchido com nome real
        accuracy_percent: Math.round((data.correct / data.total) * 100),
        questions_attempted: data.total,
        difficulty_average: Math.round(data.difficulties.reduce((a, b) => a + b, 0) / data.difficulties.length),
      })
    )

    // Identificar áreas fortes e fracas
    const strong_areas = skills_performance.filter((s) => s.accuracy_percent >= 80).map((s) => s.skill_id)
    const weak_areas = skills_performance.filter((s) => s.accuracy_percent < 60).map((s) => s.skill_id)

    // Estimativa de grade (0-10)
    let estimated_grade: string | undefined
    if (accuracy >= 90) estimated_grade = '10'
    else if (accuracy >= 80) estimated_grade = '8-9'
    else if (accuracy >= 70) estimated_grade = '7-8'
    else if (accuracy >= 60) estimated_grade = '6-7'
    else estimated_grade = '<6'

    // Recomendações
    const recommendations: string[] = []
    if (weak_areas.length > 0) {
      recommendations.push(`Revisar: ${weak_areas.join(', ')}`)
    }
    if (accuracy < 70) {
      recommendations.push('Você está abaixo da meta. Recomendamos mais prática antes da prova real.')
    }
    if (strong_areas.length > 3) {
      recommendations.push('Excelente! Você domina a maioria dos conteúdos. Continue assim!')
    }

    const result: SimulationResult = {
      total_questions: total,
      correct_answers: correct,
      accuracy_percent: accuracy,
      time_seconds: totalTimeSeconds,
      skills_performance,
      recommendations,
      strong_areas,
      weak_areas,
      estimated_grade,
    }

    // Salvar resultado
    await supabase
      .from('simulation_sessions')
      .update({
        completed_at: new Date().toISOString(),
        result,
      })
      .eq('id', simulationId)

    return result
  } catch (e) {
    console.error('Erro em completeSimulation:', e)
    return null
  }
}

/**
 * Buscar histórico de simulados do usuário
 */
export async function getSimulationHistory(userId: string, limit = 10): Promise<SimulationSession[]> {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('simulation_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('completed_at', 'NOT NULL')
      .order('completed_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Erro ao buscar histórico:', error)
      return []
    }

    return data || []
  } catch (e) {
    console.error('Erro em getSimulationHistory:', e)
    return []
  }
}

/**
 * Comparar performance em simulados
 */
export function compareSimulations(
  simulations: SimulationSession[]
): {
  trend: 'improving' | 'declining' | 'stable'
  averageAccuracy: number
  latestAccuracy: number
  improvement: number
} {
  if (simulations.length === 0) {
    return { trend: 'stable', averageAccuracy: 0, latestAccuracy: 0, improvement: 0 }
  }

  const accuracies = simulations.map((s) => s.result?.accuracy_percent || 0).filter((a) => a > 0)

  const averageAccuracy = Math.round(accuracies.reduce((a, b) => a + b, 0) / accuracies.length)
  const latestAccuracy = accuracies[0] || 0
  const firstAccuracy = accuracies[accuracies.length - 1] || latestAccuracy

  const improvement = latestAccuracy - firstAccuracy

  let trend: 'improving' | 'declining' | 'stable' = 'stable'
  if (improvement > 5) trend = 'improving'
  else if (improvement < -5) trend = 'declining'

  return { trend, averageAccuracy, latestAccuracy, improvement }
}

export default {
  createSimulation,
  generateSimulationQuestions,
  completeSimulation,
  getSimulationHistory,
  compareSimulations,
}
