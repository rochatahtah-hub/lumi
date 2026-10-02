/**
 * StudyGoalsPanel — Mostra metas e objetivos de estudo
 * Motiva o aluno a manter consistência
 */

import React from 'react'
import type { StudyGoal } from '../lib/study-goals'
import { getGoalProgress, getGoalMotivation } from '../lib/study-goals'

interface StudyGoalsPanelProps {
  goals: StudyGoal[]
  onCompleteGoal?: (goalId: string) => void
  isLoading?: boolean
}

const goalIcons: Record<string, string> = {
  daily_lessons: '📚',
  weekly_mastery: '🏆',
  skill_focus: '⭐',
  review_target: '🧠',
  custom: '🎯',
}

const frequencyLabel: Record<string, string> = {
  daily: 'Diário',
  weekly: 'Semanal',
  monthly: 'Mensal',
}

export function StudyGoalsPanel({ goals = [], onCompleteGoal, isLoading }: StudyGoalsPanelProps) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Carregando metas...</p>
      </div>
    )
  }

  if (goals.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-gray-600">Nenhuma meta ativa no momento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">🎯 Suas Metas</h2>
        <p className="mt-1 text-sm text-gray-600">{goals.length} meta(s) ativa(s)</p>
      </div>

      {/* Metas */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = getGoalProgress(goal)
          const motivation = getGoalMotivation(goal)
          const icon = goalIcons[goal.type] || '🎯'
          const isCompleted = progress === 100

          return (
            <div
              key={goal.id}
              className={`rounded-lg border-2 p-4 transition ${
                isCompleted
                  ? 'border-green-300 bg-green-50'
                  : 'border-blue-200 bg-blue-50 hover:border-blue-400'
              }`}
            >
              <div className="space-y-3">
                {/* Título + Meta */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800">{goal.title}</h3>
                        <p className="text-xs text-gray-600">{goal.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Frequência */}
                  <span className="inline-block rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
                    {frequencyLabel[goal.frequency]}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-gray-700">
                      {goal.current} / {goal.target}
                    </div>
                    <div className="text-sm font-bold text-blue-600">{progress}%</div>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-blue-200">
                    <div
                      className={`h-full transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-r from-green-400 to-green-500'
                          : 'bg-gradient-to-r from-blue-400 to-blue-600'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Motivação + Botão */}
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-700">{motivation}</p>

                  {isCompleted && (
                    <button
                      onClick={() => onCompleteGoal?.(goal.id)}
                      className="rounded bg-green-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-green-600"
                    >
                      ✅ Concluída
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Estatísticas */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-100 p-3 text-center">
          <p className="text-xs font-semibold text-blue-700 uppercase">Metas Ativas</p>
          <p className="mt-1 text-2xl font-bold text-blue-900">{goals.length}</p>
        </div>

        <div className="rounded-lg bg-green-100 p-3 text-center">
          <p className="text-xs font-semibold text-green-700 uppercase">Completadas</p>
          <p className="mt-1 text-2xl font-bold text-green-900">
            {goals.filter((g) => getGoalProgress(g) === 100).length}
          </p>
        </div>

        <div className="rounded-lg bg-orange-100 p-3 text-center">
          <p className="text-xs font-semibold text-orange-700 uppercase">Progresso Médio</p>
          <p className="mt-1 text-2xl font-bold text-orange-900">
            {Math.round(goals.reduce((acc, g) => acc + getGoalProgress(g), 0) / goals.length)}%
          </p>
        </div>
      </div>

      {/* Dica */}
      <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
        <p className="text-sm font-semibold text-yellow-900">💡 Dica</p>
        <p className="mt-2 text-sm text-yellow-800">
          Manter consistência é mais importante que intensidade. Um pouquinho todo dia supera muito uma vez por semana!
          🎯
        </p>
      </div>
    </div>
  )
}
