/**
 * PathSnapshot — Resumo da trilha na Home
 * Mostra: progresso geral, streak, items para revisar, recomendações
 */

import React from 'react'
import type { ReviewItem, Recommendation } from '../types/learning'

interface PathSnapshotProps {
  overall_mastery: number
  streak_days: number
  contents_started: number
  contents_mastered: number
  to_review: ReviewItem[]
  recommended: Recommendation[]
  onStartLesson?: (lessonId: string) => void
  onReview?: (reviewId: string) => void
  isLoading?: boolean
}

export function PathSnapshot({
  overall_mastery = 0,
  streak_days = 0,
  contents_started = 0,
  contents_mastered = 0,
  to_review = [],
  recommended = [],
  onStartLesson,
  onReview,
  isLoading,
}: PathSnapshotProps) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Carregando seu progresso...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Progresso Geral */}
      <div className="rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">📈 Seu Progresso</h2>
          <span className="text-4xl font-bold">{overall_mastery}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/30">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${overall_mastery}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-white/90">Domínio geral de conteúdos</p>
      </div>

      {/* Streak + Estatísticas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-center">
          <p className="text-3xl font-bold text-red-600">🔥 {streak_days}</p>
          <p className="mt-2 text-sm font-semibold text-red-700">dias de sequência</p>
          <p className="mt-1 text-xs text-red-600">Continue assim! 💪</p>
        </div>

        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{contents_started}</p>
          <p className="mt-2 text-sm font-semibold text-blue-700">conteúdos iniciados</p>
          <p className="mt-1 text-xs text-blue-600">Você está avançando!</p>
        </div>

        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">✅ {contents_mastered}</p>
          <p className="mt-2 text-sm font-semibold text-green-700">conteúdos dominados</p>
          <p className="mt-1 text-xs text-green-600">Excelente! 🎉</p>
        </div>
      </div>

      {/* Hora de Revisar */}
      {to_review.length > 0 && (
        <div className="rounded-lg bg-orange-50 border-l-4 border-orange-500 p-4">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-orange-900">
            <span>🧠</span> Hora de revisar ({to_review.length})
          </h3>

          <div className="space-y-2">
            {to_review.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-2 rounded bg-orange-100 p-2 text-sm">
                <span className="text-orange-700">
                  <strong>{item.title || item.lesson_id}</strong>
                  <br />
                  <span className="text-xs text-orange-600">Urgência: {item.urgency_score}/100</span>
                </span>
                <button
                  onClick={() => onReview?.(item.id)}
                  className="whitespace-nowrap rounded bg-orange-500 px-3 py-1 text-xs font-semibold text-white hover:bg-orange-600"
                >
                  Revisar
                </button>
              </div>
            ))}
          </div>

          {to_review.length > 3 && (
            <p className="mt-2 text-xs text-orange-600">+ {to_review.length - 3} mais conteúdos para revisar</p>
          )}
        </div>
      )}

      {/* Recomendações */}
      {recommended.length > 0 && (
        <div className="rounded-lg bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-blue-900">
            <span>🎯</span> Recomendado para você
          </h3>

          <div className="space-y-2">
            {recommended.slice(0, 3).map((rec) => (
              <div key={rec.id} className="flex items-center justify-between gap-2 rounded bg-blue-100 p-2 text-sm">
                <span className="text-blue-700">
                  <strong>{rec.reason}</strong>
                  <br />
                  <span className="text-xs text-blue-600">Relevância: {Math.round(rec.relevance_score * 100)}%</span>
                </span>
                <button
                  onClick={() => rec.lesson_id && onStartLesson?.(rec.lesson_id)}
                  className="whitespace-nowrap rounded bg-blue-500 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-600"
                >
                  Começar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado Vazio */}
      {to_review.length === 0 && recommended.length === 0 && (
        <div className="rounded-lg bg-green-50 p-6 text-center border border-green-200">
          <p className="text-lg font-semibold text-green-700">✨ Tudo em dia!</p>
          <p className="mt-2 text-sm text-green-600">Você não tem conteúdos para revisar. Aproveite para aprender algo novo! 📚</p>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => onStartLesson?.('')}
        className="w-full rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-3 font-semibold text-white transition hover:from-orange-500 hover:to-orange-600 active:scale-95"
      >
        Ver Trilha Completa →
      </button>
    </div>
  )
}
