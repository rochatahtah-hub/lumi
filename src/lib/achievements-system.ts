/**
 * Achievements System — Conquistas e Recompensas
 * Valoriza aprendizado contínuo, não apenas tempo de uso
 */

import { supabase } from './supabase'
import type { Achievement, AchievementType } from '../types/learning'

interface AchievementDefinition {
  id: AchievementType
  title: string
  description: string
  icon: string
  condition: (stats: UserStats) => boolean
  points: number
}

interface UserStats {
  total_lessons_started: number
  total_lessons_completed: number
  overall_mastery_percent: number
  current_streak_days: number
  contents_mastered: number
  total_correct_answers: number
  total_attempts: number
  unique_skills_mastered: number
}

/**
 * Catálogo de todas as conquistas disponíveis
 * Valida progresso real, não apenas tempo
 */
const ACHIEVEMENTS: AchievementDefinition[] = [
  // Começar
  {
    id: 'first_lesson',
    title: 'Primeiro Passo',
    description: 'Iniciou sua primeira aula',
    icon: '🚀',
    condition: (s) => s.total_lessons_started >= 1,
    points: 10,
  },

  // Praticar
  {
    id: 'content_mastered',
    title: 'Mestre do Conhecimento',
    description: 'Dominou um conteúdo (≥95%)',
    icon: '🏆',
    condition: (s) => s.contents_mastered >= 1,
    points: 50,
  },

  // Sequências
  {
    id: 'streak_3',
    title: 'Em Ritmo! 🔥',
    description: '3 dias de estudo consecutivo',
    icon: '🔥',
    condition: (s) => s.current_streak_days >= 3,
    points: 25,
  },

  {
    id: 'streak_7',
    title: 'Semana Produtiva!',
    description: '7 dias de estudo consecutivo',
    icon: '🔥🔥',
    condition: (s) => s.current_streak_days >= 7,
    points: 75,
  },

  {
    id: 'streak_30',
    title: 'Estudante Dedicado',
    description: '30 dias de estudo consecutivo',
    icon: '🔥🔥🔥',
    condition: (s) => s.current_streak_days >= 30,
    points: 200,
  },

  // Quantidade
  {
    id: '10_contents',
    title: 'Explorador',
    description: 'Iniciou 10 conteúdos diferentes',
    icon: '🧭',
    condition: (s) => s.total_lessons_started >= 10,
    points: 60,
  },

  {
    id: '50_contents',
    title: 'Pesquisador',
    description: 'Iniciou 50 conteúdos',
    icon: '🔬',
    condition: (s) => s.total_lessons_started >= 50,
    points: 150,
  },

  {
    id: '100_contents',
    title: 'Enciclopédia Viva',
    description: 'Iniciou 100 conteúdos',
    icon: '📚',
    condition: (s) => s.total_lessons_started >= 100,
    points: 300,
  },

  // Revisão
  {
    id: 'all_reviewed',
    title: 'Revisão Impecável',
    description: 'Revisou todos os conteúdos fracos',
    icon: '✅',
    condition: (s) => s.overall_mastery_percent >= 80,
    points: 100,
  },

  // Habilidades
  {
    id: 'skill_mastered',
    title: 'Especialista',
    description: 'Dominou 5 habilidades diferentes',
    icon: '⭐',
    condition: (s) => s.unique_skills_mastered >= 5,
    points: 80,
  },

  // Precisão
  {
    id: 'high_accuracy',
    title: 'Praticamente Perfeito',
    description: '90% de precisão nas respostas',
    icon: '💯',
    condition: (s) => {
      if (s.total_attempts === 0) return false
      const accuracy = s.total_correct_answers / s.total_attempts
      return accuracy >= 0.9
    },
    points: 120,
  },

  // Milestones
  {
    id: 'halfway_mastery',
    title: 'No Caminho Certo',
    description: '50% de domínio geral',
    icon: '🎯',
    condition: (s) => s.overall_mastery_percent >= 50,
    points: 40,
  },

  {
    id: 'expert_level',
    title: 'Nível Expert',
    description: '75% de domínio geral',
    icon: '🥇',
    condition: (s) => s.overall_mastery_percent >= 75,
    points: 120,
  },

  {
    id: 'mastery_level',
    title: 'Domínio Total',
    description: '90% de domínio geral',
    icon: '👑',
    condition: (s) => s.overall_mastery_percent >= 90,
    points: 250,
  },
]

/**
 * Avaliar estatísticas do usuário e retornar novas conquistas
 */
export async function evaluateAchievements(userId: string, stats: UserStats): Promise<Achievement[]> {
  if (!supabase) return []

  try {
    // Buscar conquistas já obtidas
    const { data: existing } = await supabase
      .from('achievements')
      .select('achievement_type')
      .eq('user_id', userId)

    const existingIds = new Set(existing?.map((a) => a.achievement_type) ?? [])

    // Verificar quais novas conquistas foram ganhas
    const newAchievements: Achievement[] = []

    for (const def of ACHIEVEMENTS) {
      // Se já tem essa conquista, pula
      if (existingIds.has(def.id)) continue

      // Se a condição é verdadeira, adicionar
      if (def.condition(stats)) {
        newAchievements.push({
          id: crypto.randomUUID(),
          user_id: userId,
          achievement_type: def.id,
          title: def.title,
          description: def.description,
          icon: def.icon,
          earned_at: new Date().toISOString(),
        })
      }
    }

    // Salvar novas conquistas
    if (newAchievements.length > 0) {
      await supabase.from('achievements').insert(newAchievements)
    }

    return newAchievements
  } catch (e) {
    console.error('Erro em evaluateAchievements:', e)
    return []
  }
}

/**
 * Buscar todas as conquistas do usuário
 */
export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  if (!supabase) return []

  try {
    const { data } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })

    return data || []
  } catch (e) {
    console.error('Erro em getUserAchievements:', e)
    return []
  }
}

/**
 * Buscar conquistas recentes (últimas 3)
 */
export async function getRecentAchievements(userId: string, limit = 3): Promise<Achievement[]> {
  if (!supabase) return []

  try {
    const { data } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })
      .limit(limit)

    return data || []
  } catch (e) {
    console.error('Erro em getRecentAchievements:', e)
    return []
  }
}

/**
 * Contar pontos totais do usuário (somatório de pontos por conquista)
 */
export function calculateTotalPoints(achievements: Achievement[]): number {
  const achievementMap = new Map(ACHIEVEMENTS.map((a) => [a.id, a.points]))

  return achievements.reduce((total, achievement) => {
    const points = achievementMap.get(achievement.achievement_type) ?? 0
    return total + points
  }, 0)
}

/**
 * Próximas conquistas possíveis (roadmap para o usuário)
 */
export function getNextAchievements(userStats: UserStats, earnedIds: AchievementType[], limit = 3) {
  const notEarned = ACHIEVEMENTS.filter((a) => !earnedIds.includes(a.id))

  // Ordenar por quanto falta para ganhar (mais próximas primeiro)
  const withProgress = notEarned.map((def) => {
    // Estimativa simples do progresso (0.0-1.0)
    let progress = 0

    if (def.id.includes('content') || def.id.includes('lesson')) {
      progress = Math.min(1, userStats.total_lessons_started / parseInt(def.id) || 0.5)
    } else if (def.id.includes('streak')) {
      const daysNeeded = parseInt(def.id) || 7
      progress = Math.min(1, userStats.current_streak_days / daysNeeded)
    } else if (def.id.includes('mastery')) {
      progress = userStats.overall_mastery_percent / 100
    } else {
      progress = 0.3 // padrão
    }

    return { def, progress }
  })

  return withProgress.sort((a, b) => b.progress - a.progress).slice(0, limit).map((x) => ({
    title: x.def.title,
    description: x.def.description,
    icon: x.def.icon,
    progress: Math.round(x.progress * 100),
    points: x.def.points,
  }))
}

export default {
  evaluateAchievements,
  getUserAchievements,
  getRecentAchievements,
  calculateTotalPoints,
  getNextAchievements,
}
