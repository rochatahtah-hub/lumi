/**
 * AchievementsPanel — Mostra conquistas ganhas e próximas
 * Visualização gamificada do progresso
 */

import React from 'react'
import type { Achievement } from '../types/learning'

interface AchievementsPanelProps {
  achievements: Achievement[]
  nextAchievements?: Array<{
    title: string
    description: string
    icon: string
    progress: number
    points: number
  }>
  totalPoints?: number
  isLoading?: boolean
}

export function AchievementsPanel({
  achievements = [],
  nextAchievements = [],
  totalPoints = 0,
  isLoading,
}: AchievementsPanelProps) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Carregando conquistas...</p>
      </div>
    )
  }

  const recentAchievements = achievements.slice(0, 6)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">🏆 Suas Conquistas</h2>
        <p className="mt-2 text-3xl font-bold text-orange-500">{totalPoints} pontos</p>
        <p className="text-sm text-gray-600">{achievements.length} conquista(s) ganhas</p>
      </div>

      {/* Conquistas Recentes */}
      {recentAchievements.length > 0 && (
        <div>
          <h3 className="mb-4 font-semibold text-gray-800">🌟 Recentes</h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="animate-bounce-in group rounded-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 p-4 text-center transition hover:border-orange-400 hover:shadow-lg"
              >
                <div className="text-4xl">{achievement.icon}</div>
                <h4 className="mt-2 font-semibold text-gray-800">{achievement.title}</h4>
                <p className="mt-1 text-xs text-gray-600">{achievement.description}</p>
                <p className="mt-2 text-xs font-bold text-orange-600">
                  ⭐ {Math.round((Math.random() * 30 + 40))} pts
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximas Conquistas (Roadmap) */}
      {nextAchievements.length > 0 && (
        <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
          <h3 className="mb-4 font-semibold text-blue-900">🎯 Próximas Conquistas</h3>

          <div className="space-y-4">
            {nextAchievements.map((achievement, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-semibold text-blue-900">{achievement.title}</p>
                      <p className="text-xs text-blue-700">{achievement.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-600">{achievement.points} pts</span>
                </div>

                {/* Progress bar */}
                <div className="mx-6 space-y-1">
                  <div className="flex justify-between text-xs text-blue-700">
                    <span>Progresso</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-blue-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado Vazio */}
      {achievements.length === 0 && nextAchievements.length === 0 && (
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <p className="text-lg font-semibold text-gray-700">🚀 Comece a estudar!</p>
          <p className="mt-2 text-sm text-gray-600">
            Ganhe conquistas conforme pratica. Primeiro passo: comece uma aula. 📚
          </p>
        </div>
      )}

      {/* Dica */}
      <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
        <p className="text-sm font-semibold text-yellow-900">💡 Dica</p>
        <p className="mt-2 text-sm text-yellow-800">
          As conquistas refletem aprendizado real. Quanto mais você estuda e domina conteúdos, mais
          desbloqueará! 🎉
        </p>
      </div>
    </div>
  )
}
