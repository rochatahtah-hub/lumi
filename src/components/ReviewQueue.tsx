/**
 * ReviewQueue — "Hora de revisar"
 * Mostra conteúdos prioritários para revisão com razão e urgência
 */

import React from 'react'
import type { ReviewItem } from '../types/learning'

interface ReviewQueueProps {
  items: ReviewItem[]
  onReview: (reviewId: string, lessonId: string) => void
  isLoading?: boolean
}

const reasonConfig: Record<string, { icon: string; color: string; description: string }> = {
  low_mastery: {
    icon: '📉',
    color: 'text-red-600',
    description: 'Domínio baixo',
  },
  time_since_review: {
    icon: '⏰',
    color: 'text-yellow-600',
    description: 'Faz tempo desde a última revisão',
  },
  high_error_rate: {
    icon: '❌',
    color: 'text-orange-600',
    description: 'Você teve erros recentemente',
  },
  skill_weak: {
    icon: '💪',
    color: 'text-purple-600',
    description: 'Habilidade associada está fraca',
  },
  recent_failure: {
    icon: '⚡',
    color: 'text-red-700',
    description: 'Falha na última tentativa',
  },
}

export function ReviewQueue({ items, onReview, isLoading }: ReviewQueueProps) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Carregando fila de revisão...</p>
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <p className="text-lg font-semibold text-green-700">✅ Tudo em dia!</p>
        <p className="mt-2 text-sm text-green-600">Você não tem conteúdos para revisar no momento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🧠 Hora de Revisar</h2>
        <p className="mt-1 text-sm text-gray-500">Você tem {items.length} conteúdo(s) para revisar</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const config = reasonConfig[item.reason as keyof typeof reasonConfig] || reasonConfig.low_mastery
          const urgencyPercent = item.urgency_score

          // Cor da urgência
          let urgencyColor = 'bg-green-100 border-green-300'
          if (urgencyPercent > 75) urgencyColor = 'bg-red-100 border-red-300'
          else if (urgencyPercent > 50) urgencyColor = 'bg-orange-100 border-orange-300'
          else if (urgencyPercent > 25) urgencyColor = 'bg-yellow-100 border-yellow-300'

          return (
            <div key={item.id} className={`rounded-lg border-2 ${urgencyColor} p-4 transition hover:shadow-md`}>
              <div className="flex items-start justify-between gap-4">
                {/* Conteúdo + Razão */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.title || item.lesson_id}</h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg">{config.icon}</span>
                    <span className={`text-sm font-medium ${config.color}`}>{config.description}</span>
                  </div>

                  {/* Stats contextuais */}
                  <div className="mt-3 space-y-1 text-xs text-gray-600">
                    {item.current_mastery_percent !== undefined && (
                      <p>Domínio atual: <strong>{item.current_mastery_percent}%</strong></p>
                    )}
                    {item.days_since_last_review !== undefined && (
                      <p>Últimas revisão: <strong>{item.days_since_last_review} dias atrás</strong></p>
                    )}
                    {item.error_rate_percent !== undefined && (
                      <p>Taxa de erro: <strong>{item.error_rate_percent}%</strong></p>
                    )}
                  </div>
                </div>

                {/* Urgência + Botão */}
                <div className="flex flex-col items-end gap-3">
                  {/* Medidor de urgência */}
                  <div className="w-24">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">Urgência</span>
                      <span className={`text-xs font-bold ${urgencyPercent > 75 ? 'text-red-600' : 'text-orange-600'}`}>
                        {urgencyPercent}/100
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-300">
                      <div
                        className={`h-full ${
                          urgencyPercent > 75
                            ? 'bg-red-500'
                            : urgencyPercent > 50
                              ? 'bg-orange-500'
                              : 'bg-yellow-500'
                        } transition-all`}
                        style={{ width: `${urgencyPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <button
                    onClick={() => onReview(item.id, item.lesson_id)}
                    className="rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-95"
                  >
                    Revisar agora
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Dica */}
      <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-700 border border-blue-200">
        💡 Revisar regularmente ajuda a fixar o aprendizado. Quanto maior a urgência, mais importante é revisar!
      </div>
    </div>
  )
}
