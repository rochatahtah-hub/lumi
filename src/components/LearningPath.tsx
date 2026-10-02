/**
 * LearningPath — Visualizar trilha de aprendizado do aluno
 * Mostra conteúdos com estado visual, barra de progresso, e próximos passos
 */

import React from 'react'
import type { ContentMastery } from '../types/learning'

interface LearningPathProps {
  masteryList: ContentMastery[]
  onSelectLesson: (lessonId: string) => void
  isLoading?: boolean
}

const stateConfig = {
  not_started: { color: 'bg-blue-100', textColor: 'text-blue-700', icon: '🔵', label: 'Não iniciado' },
  learning: { color: 'bg-yellow-100', textColor: 'text-yellow-700', icon: '🟡', label: 'Aprendendo' },
  practicing: { color: 'bg-orange-100', textColor: 'text-orange-700', icon: '🟠', label: 'Praticando' },
  review: { color: 'bg-red-100', textColor: 'text-red-700', icon: '🔴', label: 'Revisar' },
  mastered: { color: 'bg-green-100', textColor: 'text-green-700', icon: '✅', label: 'Dominado' },
}

export function LearningPath({ masteryList, onSelectLesson, isLoading }: LearningPathProps) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Carregando trilha de aprendizado...</p>
      </div>
    )
  }

  if (!masteryList || masteryList.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Nenhum conteúdo iniciado ainda. Comece a aprender! 📚</p>
      </div>
    )
  }

  // Agrupar por matéria
  const bySubject = masteryList.reduce(
    (acc, item) => {
      if (!acc[item.subject]) acc[item.subject] = []
      acc[item.subject].push(item)
      return acc
    },
    {} as Record<string, ContentMastery[]>
  )

  return (
    <div className="space-y-8 p-6">
      {Object.entries(bySubject).map(([subject, items]) => (
        <div key={subject}>
          <h3 className="mb-4 text-lg font-semibold capitalize text-gray-800">📚 {subject}</h3>

          <div className="space-y-3">
            {items.map((item) => {
              const config = stateConfig[item.state as keyof typeof stateConfig]

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectLesson(item.lesson_id)}
                  className={`cursor-pointer rounded-lg border-2 border-gray-200 p-4 transition hover:border-orange-500 hover:bg-orange-50 ${config.color}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xl">{config.icon}</span>
                        <span className="font-medium text-gray-800">Lição {item.lesson_id}</span>
                        <span className={`text-xs font-semibold ${config.textColor}`}>{config.label}</span>
                      </div>

                      {/* Barra de progresso */}
                      <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-300">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all"
                          style={{ width: `${item.mastery_percent}%` }}
                        />
                      </div>

                      {/* Stats */}
                      <div className="flex gap-4 text-xs text-gray-600">
                        <span>{item.mastery_percent}% domínio</span>
                        <span>{item.attempts_total} tentativas</span>
                        {item.needs_review && <span className="text-red-600 font-semibold">⚠️ Revisar</span>}
                      </div>
                    </div>

                    {/* Ação */}
                    <div className="ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectLesson(item.lesson_id)
                        }}
                        className="rounded bg-orange-500 px-3 py-1 text-xs font-semibold text-white hover:bg-orange-600"
                      >
                        {item.state === 'not_started' && 'Começar'}
                        {item.state === 'learning' && 'Continuar'}
                        {item.state === 'practicing' && 'Praticar'}
                        {item.state === 'review' && 'Revisar'}
                        {item.state === 'mastered' && 'Revisitar'}
                      </button>
                    </div>
                  </div>

                  {/* Mensagem contextual */}
                  {item.state === 'mastered' && (
                    <p className="mt-2 text-xs text-green-700">🎉 Você dominou este conteúdo!</p>
                  )}
                  {item.needs_review && item.state !== 'mastered' && (
                    <p className="mt-2 text-xs text-red-600">Você está tendo dificuldade. Vamos revisar?</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
