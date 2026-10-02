/**
 * LUMI Learning API — Funções para interagir com o sistema de mastery
 * Todas as queries assumem que o usuário está autenticado
 */

import { supabase } from './supabase'
import type { ContentMastery, SkillMastery, ReviewItem, Recommendation, QuestionAttempt, LearningDiagnostic } from '../types/learning'

// ─────────────────────────────────────────────────────────────
// CONTENT MASTERY
// ─────────────────────────────────────────────────────────────

/** Registrar tentativa de questão e atualizar mastery */
export async function recordAttempt(
  userId: string,
  lessonId: string,
  subject: string,
  questionId: string,
  skillId: string,
  isCorrect: boolean,
  timeSeconds?: number,
  difficultyRating?: number
) {
  if (!supabase) return null

  try {
    // 1. Registrar tentativa individual
    const { error: attemptError } = await supabase.from('question_attempts').insert({
      user_id: userId,
      lesson_id: lessonId,
      question_id: questionId,
      is_correct: isCorrect,
      time_seconds: timeSeconds,
      difficulty_rating: difficultyRating,
      attempt_number: 1, // TODO: calcular número real
      user_answer: '', // será preenchido pelo frontend
      correct_answer: '', // será preenchido pelo frontend
    })

    if (attemptError) console.error('Erro ao registrar tentativa:', attemptError)

    // 2. Atualizar mastery do conteúdo
    const mastery = await updateContentMastery(userId, lessonId, subject, isCorrect, timeSeconds)

    // 3. Atualizar mastery da habilidade
    if (mastery && skillId) {
      await updateSkillMastery(userId, skillId, isCorrect)
    }

    // 4. Recalcular review queue se necessário
    if (!isCorrect) {
      await maybeAddToReviewQueue(userId, lessonId, subject, 'high_error_rate')
    }

    return mastery
  } catch (e) {
    console.error('Erro em recordAttempt:', e)
    return null
  }
}

/** Atualizar domínio de um conteúdo após tentativa */
async function updateContentMastery(
  userId: string,
  lessonId: string,
  subject: string,
  isCorrect: boolean,
  timeSeconds?: number
) {
  if (!supabase) return null

  try {
    // Buscar mastery atual
    const { data: current, error: fetchError } = await supabase
      .from('content_mastery')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Erro ao buscar mastery:', fetchError)
      return null
    }

    // Calcular novo domínio
    const attempts_total = (current?.attempts_total || 0) + 1
    const attempts_correct = (current?.attempts_correct || 0) + (isCorrect ? 1 : 0)
    const mastery_percent = Math.round((attempts_correct / attempts_total) * 100)
    const confidence_score = calculateConfidence(attempts_correct, attempts_total)

    // Determinar novo estado
    const state = determineState(mastery_percent, attempts_total)

    // Upsert
    const { data, error } = await supabase
      .from('content_mastery')
      .upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          subject,
          attempts_total,
          attempts_correct,
          attempts_incorrect: attempts_total - attempts_correct,
          mastery_percent,
          confidence_score,
          state,
          last_attempt_at: new Date().toISOString(),
          average_time_seconds: timeSeconds ? Math.round((current?.average_time_seconds || 0 + timeSeconds) / 2) : undefined,
          needs_review: mastery_percent < 70 && attempts_total >= 3,
          first_started_at: current?.first_started_at || new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      )
      .select()
      .single()

    if (error) {
      console.error('Erro ao atualizar mastery:', error)
      return null
    }

    return data
  } catch (e) {
    console.error('Erro em updateContentMastery:', e)
    return null
  }
}

/** Atualizar domínio de uma habilidade */
async function updateSkillMastery(userId: string, skillId: string, isCorrect: boolean) {
  if (!supabase) return null

  try {
    const { data: current } = await supabase
      .from('skill_mastery')
      .select('*')
      .eq('user_id', userId)
      .eq('skill_id', skillId)
      .single()

    const attempts_total = (current?.attempts_total || 0) + 1
    const attempts_correct = (current?.attempts_correct || 0) + (isCorrect ? 1 : 0)
    const mastery_percent = Math.round((attempts_correct / attempts_total) * 100)

    await supabase
      .from('skill_mastery')
      .upsert(
        {
          user_id: userId,
          skill_id: skillId,
          skill_name: current?.skill_name || skillId,
          attempts_total,
          attempts_correct,
          mastery_percent,
          confidence_score: calculateConfidence(attempts_correct, attempts_total),
        },
        { onConflict: 'user_id,skill_id' }
      )
  } catch (e) {
    console.error('Erro em updateSkillMastery:', e)
  }
}

// ─────────────────────────────────────────────────────────────
// REVIEW QUEUE
// ─────────────────────────────────────────────────────────────

/** Adicionar conteúdo à fila de revisão se atender critérios */
async function maybeAddToReviewQueue(
  userId: string,
  lessonId: string,
  subject: string,
  reason: 'low_mastery' | 'time_since_review' | 'high_error_rate'
) {
  if (!supabase) return

  try {
    const { data: mastery } = await supabase
      .from('content_mastery')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single()

    if (!mastery) return

    // Calcular urgência
    const urgency = calculateReviewUrgency(mastery, reason)

    // Verificar se já existe na fila
    const { data: existing } = await supabase
      .from('review_queue')
      .select('id')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .is('completed_at', null)
      .single()

    if (!existing) {
      // Adicionar à fila
      await supabase.from('review_queue').insert({
        user_id: userId,
        lesson_id: lessonId,
        subject,
        title: '', // será preenchido pelo frontend
        reason,
        urgency_score: urgency,
        scheduled_for: new Date().toISOString(),
        current_mastery_percent: mastery.mastery_percent,
        error_rate_percent: mastery.attempts_incorrect > 0 ? Math.round((mastery.attempts_incorrect / mastery.attempts_total) * 100) : 0,
      })
    }
  } catch (e) {
    console.error('Erro em maybeAddToReviewQueue:', e)
  }
}

/** Buscar itens para revisar ordenados por urgência */
export async function getReviewQueue(userId: string, limit = 5) {
  if (!supabase) return []

  try {
    const { data, error } = await supabase
      .from('review_queue')
      .select('*')
      .eq('user_id', userId)
      .is('completed_at', null)
      .order('urgency_score', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Erro ao buscar review queue:', error)
      return []
    }

    return data as ReviewItem[]
  } catch (e) {
    console.error('Erro em getReviewQueue:', e)
    return []
  }
}

/** Marcar revisão como completa */
export async function completeReview(reviewId: string) {
  if (!supabase) return

  try {
    await supabase
      .from('review_queue')
      .update({ completed_at: new Date().toISOString() })
      .eq('id', reviewId)
  } catch (e) {
    console.error('Erro em completeReview:', e)
  }
}

// ─────────────────────────────────────────────────────────────
// LEARNING DIAGNOSTICS
// ─────────────────────────────────────────────────────────────

/** Registrar erro para análise */
export async function recordError(
  userId: string,
  lessonId: string,
  questionId: string,
  skillId: string,
  errorType: 'conceptual' | 'calculation' | 'reading' | 'careless' | 'unknown',
  userAnswer?: string,
  correctAnswer?: string
) {
  if (!supabase) return

  try {
    await supabase.from('learning_diagnostics').insert({
      user_id: userId,
      lesson_id: lessonId,
      question_id: questionId,
      skill_id: skillId,
      error_type: errorType,
      user_answer: userAnswer,
      correct_answer: correctAnswer,
      attempts_on_this_question: 1,
      difficulty: 1, // será atualizado
    })
  } catch (e) {
    console.error('Erro em recordError:', e)
  }
}

/** Gerar diagnóstico de fraquezas e forças */
export async function generateDiagnostic(userId: string, subject?: string) {
  if (!supabase) return null

  try {
    // Buscar erros recentes
    let query = supabase
      .from('learning_diagnostics')
      .select('*')
      .eq('user_id', userId)
      .gte('recorded_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // últimos 7 dias

    if (subject) {
      // Filtrar por matéria através de join com lesson_id
      // Por enquanto, buscar todas
    }

    const { data: errors } = await query

    if (!errors || errors.length === 0) {
      return null
    }

    // Contar erros por skill
    const skillErrors: Record<string, number> = {}
    errors.forEach((e) => {
      if (e.skill_id) {
        skillErrors[e.skill_id] = (skillErrors[e.skill_id] || 0) + 1
      }
    })

    // Encontrar skills fracas
    const weakSkills = Object.entries(skillErrors)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([skillId]) => skillId)

    return {
      weakSkills,
      totalErrors: errors.length,
      errorTypes: errors.reduce(
        (acc, e) => {
          acc[e.error_type] = (acc[e.error_type] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      ),
    }
  } catch (e) {
    console.error('Erro em generateDiagnostic:', e)
    return null
  }
}

// ─────────────────────────────────────────────────────────────
// ALGORITHMS & HELPERS
// ─────────────────────────────────────────────────────────────

/** Calcular confiança (0.0-1.0) baseado em tentativas */
function calculateConfidence(correct: number, total: number): number {
  if (total < 3) return 0.3 // confiança baixa com poucas tentativas
  if (total < 5) return 0.5
  if (total < 10) return Math.min(0.8, correct / total)
  return Math.min(1.0, correct / total) // máximo com muitas tentativas
}

/** Determinar estado de aprendizado */
function determineState(masteryPercent: number, attemptsTotal: number): string {
  if (attemptsTotal === 0) return 'not_started'
  if (masteryPercent < 50) return 'learning'
  if (masteryPercent < 80) return 'practicing'
  if (masteryPercent < 95) return 'review'
  return 'mastered'
}

/** Calcular urgência de revisão (0-100) */
function calculateReviewUrgency(
  mastery: ContentMastery,
  reason: 'low_mastery' | 'time_since_review' | 'high_error_rate'
): number {
  let score = 50

  // Baixo domínio = muito urgente
  if (mastery.mastery_percent < 60) score += 30
  else if (mastery.mastery_percent < 75) score += 15

  // Muito tempo sem revisar = urgente
  if (mastery.last_reviewed_at) {
    const daysSinceReview = Math.floor(
      (Date.now() - new Date(mastery.last_reviewed_at).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (daysSinceReview > 7) score += 20
    else if (daysSinceReview > 3) score += 10
  }

  // Taxa de erro alta = urgente
  if (mastery.attempts_total > 0) {
    const errorRate = mastery.attempts_incorrect / mastery.attempts_total
    if (errorRate > 0.4) score += 15
  }

  return Math.min(100, score)
}

export default {
  recordAttempt,
  getReviewQueue,
  completeReview,
  recordError,
  generateDiagnostic,
}
