/**
 * LUMI Learning Path System — Types
 * Phase 1: Adaptive Learning with Mastery Tracking
 */

export type ContentState = 'not_started' | 'learning' | 'practicing' | 'review' | 'mastered'
export type ErrorType = 'conceptual' | 'calculation' | 'reading' | 'careless' | 'unknown'
export type ReviewReason = 'low_mastery' | 'time_since_review' | 'high_error_rate' | 'skill_weak' | 'recent_failure'
export type RecommendationType = 'next_lesson' | 'review' | 'retry' | 'advance' | 'challenge'
export type AchievementType =
  | 'first_lesson' | 'content_mastered' | 'skill_mastered'
  | 'streak_3' | 'streak_7' | 'streak_30'
  | 'all_reviewed' | '10_contents' | '50_contents' | '100_contents'

// ─────────────────────────────────────────────────────────────
// LEARNING PATH
// ─────────────────────────────────────────────────────────────

export interface LearningPath {
  id: string
  user_id: string
  created_at: string
  updated_at: string

  // Progresso geral
  total_lessons_started: number
  total_lessons_completed: number
  overall_mastery_percent: number // média ponderada
  current_streak_days: number
  last_activity_at?: string
}

// ─────────────────────────────────────────────────────────────
// CONTENT MASTERY — Domínio por aula
// ─────────────────────────────────────────────────────────────

export interface ContentMastery {
  id: string
  user_id: string
  lesson_id: string // id da aula
  subject: string
  grade?: string

  // Estado
  state: ContentState
  mastery_percent: number // 0-100

  // Tentativas
  attempts_total: number
  attempts_correct: number
  attempts_incorrect: number
  last_attempt_at?: string
  first_started_at: string

  // Confiança
  confidence_score: number // 0.0-1.0
  average_time_seconds?: number

  // Revisão
  needs_review: boolean
  review_urgency: number // 1-10
  last_reviewed_at?: string
  reviews_done: number

  created_at: string
  updated_at: string
}

// ─────────────────────────────────────────────────────────────
// SKILL MASTERY — Domínio por habilidade (conceito)
// ─────────────────────────────────────────────────────────────

export interface SkillMastery {
  id: string
  user_id: string
  skill_id: string // ex: 'g_vel'
  skill_name: string // ex: 'Velocidade média'
  subject?: string

  // Domínio
  mastery_percent: number
  confidence_score: number

  // Histórico
  attempts_total: number
  attempts_correct: number
  related_lessons: number // quantas aulas tocam essa skill

  created_at: string
  updated_at: string
}

// ─────────────────────────────────────────────────────────────
// REVIEW QUEUE — Fila inteligente de revisão
// ─────────────────────────────────────────────────────────────

export interface ReviewItem {
  id: string
  user_id: string
  lesson_id: string
  subject: string
  title: string

  // Por que revisar
  reason: ReviewReason
  urgency_score: number // 0-100

  // Agendamento
  scheduled_for: string
  completed_at?: string

  // Contexto
  current_mastery_percent?: number
  days_since_last_review?: number
  error_rate_percent?: number

  created_at: string
  updated_at: string
}

// ─────────────────────────────────────────────────────────────
// LEARNING DIAGNOSTICS — Análise de erros
// ─────────────────────────────────────────────────────────────

export interface LearningDiagnostic {
  id: string
  user_id: string
  lesson_id: string
  skill_id?: string
  question_id?: string

  // Erro
  error_type: ErrorType
  error_description?: string
  attempts_on_this_question: number

  // Contexto
  difficulty: 1 | 2 | 3
  user_answer?: string
  correct_answer?: string

  recorded_at: string
  updated_at: string
}

// ─────────────────────────────────────────────────────────────
// RECOMMENDATIONS — Próximos passos sugeridos
// ─────────────────────────────────────────────────────────────

export interface Recommendation {
  id: string
  user_id: string

  type: RecommendationType
  lesson_id?: string // conteúdo recomendado
  reason: string
  priority: number // 1-10

  relevance_score: number // 0.0-1.0
  created_at: string
  viewed_at?: string
  acted_upon_at?: string
}

// ─────────────────────────────────────────────────────────────
// QUESTION ATTEMPTS — Registro de cada tentativa
// ─────────────────────────────────────────────────────────────

export interface QuestionAttempt {
  id: string
  user_id: string
  lesson_id: string
  question_id: string

  // Resposta
  user_answer?: string
  correct_answer?: string
  is_correct: boolean
  time_seconds?: number

  // Contexto
  attempt_number: number
  difficulty_rating?: number // 1-5 (como o aluno achou difícil)

  attempted_at: string
}

// ─────────────────────────────────────────────────────────────
// ACHIEVEMENTS — Conquistas
// ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string
  user_id: string

  achievement_type: AchievementType
  title: string
  description?: string
  icon: string // emoji

  earned_at: string
}

// ─────────────────────────────────────────────────────────────
// VIEW MODELS — Para o frontend
// ─────────────────────────────────────────────────────────────

/** Card de conteúdo na trilha */
export interface TrailCard {
  lessonId: string
  title: string
  subject: string
  state: ContentState
  masteryPercent: number
  urgency: number // 0-10 para revisão
  nextAction: string // "Começar" | "Continuar" | "Revisar" | "Dominado"
}

/** Item na fila de revisão com contexto */
export interface ReviewPickCard {
  lesson: ReviewItem
  masteryBefore: number
  reason: string
  estimatedTimeMinutes: number
}

/** Diagnóstico visual para o painel */
export interface DiagnosticSummary {
  subject: string
  skillsStrong: string[] // habilidades dominadas
  skillsWeak: string[] // habilidades fracas
  recommendation: string // recomendação textual
  actsToTake: {
    type: 'continue_lesson' | 'review_skill' | 'retry_question' | 'practice_more'
    lesson?: string
    skill?: string
  }[]
}

/** Estado geral da trilha para a Home */
export interface PathSnapshot {
  overall_mastery: number
  streak_days: number
  contents_started: number
  contents_mastered: number
  to_review: ReviewItem[] // top 3 mais urgentes
  recommended: Recommendation[] // top 3
  achievements_recent: Achievement[] // últimas 3
}
