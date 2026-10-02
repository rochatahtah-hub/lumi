/**
 * EXEMPLO: Como integrar os componentes de Learning Path na Home
 *
 * Este arquivo mostra o padrão de integração. Adapte conforme sua estrutura atual.
 */

import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { getReviewQueue, generateDiagnostic } from '../lib/learning-api'
import { PathSnapshot } from './PathSnapshot'
import { LearningPath } from './LearningPath'
import { ReviewQueue } from './ReviewQueue'
import { DiagnosticPanel } from './DiagnosticPanel'

/** Exemplo de Home com Learning Path System */
export function HomeWithLearningPath() {
  const userId = supabase?.auth.user?.()?.id
  const [activeTab, setActiveTab] = useState<'snapshot' | 'path' | 'review' | 'diagnostic'>('snapshot')

  // ─────────────────────────────────────────────────────────────
  // Query: Learning Path (trilha do aluno)
  // ─────────────────────────────────────────────────────────────
  const { data: learningPath } = useQuery(
    ['learning-path', userId],
    async () => {
      if (!supabase || !userId) return null

      const { data } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('user_id', userId)
        .single()

      return data
    },
    { enabled: !!userId }
  )

  // ─────────────────────────────────────────────────────────────
  // Query: Content Mastery (domínio por aula)
  // ─────────────────────────────────────────────────────────────
  const { data: contentMastery = [], isLoading: masteryLoading } = useQuery(
    ['content-mastery', userId],
    async () => {
      if (!supabase || !userId) return []

      const { data } = await supabase
        .from('content_mastery')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      return data || []
    },
    { enabled: !!userId }
  )

  // ─────────────────────────────────────────────────────────────
  // Query: Review Queue (items para revisar)
  // ─────────────────────────────────────────────────────────────
  const { data: reviewQueue = [] } = useQuery(
    ['review-queue', userId],
    async () => {
      if (!userId) return []
      return await getReviewQueue(userId, 3)
    },
    { enabled: !!userId }
  )

  // ─────────────────────────────────────────────────────────────
  // Query: Diagnostic (análise de fraquezas)
  // ─────────────────────────────────────────────────────────────
  const { data: diagnostic } = useQuery(
    ['diagnostic', userId],
    async () => {
      if (!userId) return null
      return await generateDiagnostic(userId)
    },
    { enabled: !!userId }
  )

  // ─────────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────────

  const handleSelectLesson = (lessonId: string) => {
    // Navegar para a aula
    window.location.href = `/lesson/${lessonId}`
  }

  const handleReview = (reviewId: string, lessonId: string) => {
    // Marcar como iniciada + navegar
    handleSelectLesson(lessonId)
  }

  const handleCompleteReview = async (reviewId: string) => {
    // Chamar API para marcar como completa
    // await completeReview(reviewId)
  }

  // ─────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">👋 Bem-vindo ao LUMI!</h1>
          <p className="mt-2 text-gray-600">Vamos continuar sua jornada de aprendizado</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex gap-4 overflow-x-auto">
            {[
              { id: 'snapshot', label: '📊 Resumo' },
              { id: 'path', label: '📚 Trilha' },
              { id: 'review', label: '🧠 Revisar' },
              { id: 'diagnostic', label: '📈 Desempenho' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`border-b-2 px-4 py-4 font-semibold transition ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="mx-auto max-w-4xl py-6">
        {/* Snapshot (Home) */}
        {activeTab === 'snapshot' && (
          <div className="rounded-lg bg-white shadow-md">
            <PathSnapshot
              overall_mastery={learningPath?.overall_mastery_percent || 0}
              streak_days={learningPath?.current_streak_days || 0}
              contents_started={learningPath?.total_lessons_started || 0}
              contents_mastered={learningPath?.total_lessons_completed || 0}
              to_review={reviewQueue}
              recommended={[]} // TODO: buscar recomendações
              onStartLesson={handleSelectLesson}
              onReview={handleReview}
              isLoading={masteryLoading}
            />
          </div>
        )}

        {/* Trilha completa */}
        {activeTab === 'path' && (
          <div className="rounded-lg bg-white shadow-md">
            <LearningPath
              masteryList={contentMastery}
              onSelectLesson={handleSelectLesson}
              isLoading={masteryLoading}
            />
          </div>
        )}

        {/* Fila de revisão */}
        {activeTab === 'review' && (
          <div className="rounded-lg bg-white shadow-md">
            <ReviewQueue
              items={reviewQueue}
              onReview={handleReview}
              isLoading={masteryLoading}
            />
          </div>
        )}

        {/* Desempenho */}
        {activeTab === 'diagnostic' && (
          <div className="rounded-lg bg-white shadow-md">
            <DiagnosticPanel
              skillsStrong={diagnostic?.weakSkills?.slice(0, 3) || []}
              skillsWeak={diagnostic?.weakSkills || []}
              totalErrors={diagnostic?.totalErrors || 0}
              recommendation={`Você teve ${diagnostic?.totalErrors || 0} erros nos últimos 7 dias. Foco em revisar os conceitos fracos.`}
              onTakePath={handleSelectLesson}
              isLoading={masteryLoading}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeWithLearningPath
