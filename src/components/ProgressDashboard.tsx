/**
 * ProgressDashboard — Painel de progresso completo
 * Histórico, gráficos, badges, milestones
 */

import React, { useState } from 'react'
import type { ProgressSnapshot, Badge, Milestone } from '../lib/progress-analytics'

interface ProgressDashboardProps {
  history: ProgressSnapshot[]
  badges: Badge[]
  milestones: Milestone[]
  currentStats: {
    overall_mastery: number
    contents_mastered: number
    streak_days: number
    total_attempts: number
  }
  isLoading?: boolean
}

export function ProgressDashboard({
  history,
  badges,
  milestones,
  currentStats,
  isLoading,
}: ProgressDashboardProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('month')

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Carregando progresso...</p>
      </div>
    )
  }

  const filteredHistory = history.slice(-30)
  const trend = filteredHistory.length > 0 && filteredHistory[filteredHistory.length - 1].overall_mastery > filteredHistory[0].overall_mastery
    ? '📈 Melhorando'
    : '📉 Precisa trabalhar'

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">📊 Seu Progresso</h2>
        <p className="mt-1 text-sm text-gray-600">Acompanhe sua evolução ao longo do tempo</p>
      </div>

      {/* Stats Principais */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 p-4 text-white">
          <p className="text-xs font-semibold uppercase opacity-90">Domínio Geral</p>
          <p className="mt-2 text-3xl font-bold">{currentStats.overall_mastery}%</p>
          <p className="mt-1 text-xs opacity-75">{trend}</p>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-green-400 to-green-500 p-4 text-white">
          <p className="text-xs font-semibold uppercase opacity-90">Conteúdos Dominados</p>
          <p className="mt-2 text-3xl font-bold">{currentStats.contents_mastered}</p>
          <p className="mt-1 text-xs opacity-75">✨ Nível master</p>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-red-400 to-red-500 p-4 text-white">
          <p className="text-xs font-semibold uppercase opacity-90">Streak de Dias</p>
          <p className="mt-2 text-3xl font-bold">🔥 {currentStats.streak_days}</p>
          <p className="mt-1 text-xs opacity-75">Continue!</p>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 p-4 text-white">
          <p className="text-xs font-semibold uppercase opacity-90">Questões</p>
          <p className="mt-2 text-3xl font-bold">{currentStats.total_attempts}</p>
          <p className="mt-1 text-xs opacity-75">Respondidas</p>
        </div>
      </div>

      {/* Gráfico de Progresso */}
      <div className="rounded-lg bg-white border-2 border-gray-200 p-6">
        <h3 className="mb-4 font-semibold text-gray-800">📈 Evolução de Domínio</h3>

        <div className="flex gap-3 mb-4">
          {(['week', 'month', 'all'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs font-semibold rounded transition ${
                timeframe === tf
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tf === 'week' && '1 semana'}
              {tf === 'month' && '1 mês'}
              {tf === 'all' && 'Tudo'}
            </button>
          ))}
        </div>

        {/* Mini Gráfico (texto) */}
        <div className="space-y-2">
          {filteredHistory.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum histórico ainda. Comece a estudar!</p>
          ) : (
            <>
              {/* Linha de progresso */}
              <div className="flex items-end gap-1 h-20">
                {filteredHistory.slice(-14).map((snap, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-orange-400 to-orange-500 rounded-t transition hover:opacity-80"
                    style={{
                      height: `${(snap.overall_mastery / 100) * 100}%`,
                      minHeight: '4px',
                    }}
                    title={`${snap.date}: ${snap.overall_mastery}%`}
                  />
                ))}
              </div>

              {/* Stats do período */}
              <div className="mt-4 grid gap-2 sm:grid-cols-3 text-xs">
                <div className="rounded bg-blue-50 p-2">
                  <p className="text-gray-600">Máximo</p>
                  <p className="text-lg font-bold text-blue-600">
                    {Math.max(...filteredHistory.map((h) => h.overall_mastery))}%
                  </p>
                </div>
                <div className="rounded bg-gray-50 p-2">
                  <p className="text-gray-600">Média</p>
                  <p className="text-lg font-bold text-gray-600">
                    {Math.round(
                      filteredHistory.reduce((a, h) => a + h.overall_mastery, 0) / filteredHistory.length
                    )}%
                  </p>
                </div>
                <div className="rounded bg-orange-50 p-2">
                  <p className="text-gray-600">Mínimo</p>
                  <p className="text-lg font-bold text-orange-600">
                    {Math.min(...filteredHistory.map((h) => h.overall_mastery))}%
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="rounded-lg bg-white border-2 border-gray-200 p-6">
          <h3 className="mb-4 font-semibold text-gray-800">🏅 Badges Desbloqueados</h3>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {badges.map((badge) => (
              <div key={badge.id} className="rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 p-4 text-center">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="font-semibold text-gray-800">{badge.title}</p>
                <p className="mt-1 text-xs text-gray-600">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestones */}
      {milestones.length > 0 && (
        <div className="rounded-lg bg-white border-2 border-gray-200 p-6">
          <h3 className="mb-4 font-semibold text-gray-800">🎯 Próximos Milestones</h3>

          <div className="space-y-4">
            {milestones.map((milestone, i) => (
              <div key={i} className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{milestone.icon}</span>
                    <span className="font-semibold text-gray-800">{milestone.name}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{milestone.progress_percent}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-blue-200">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all"
                    style={{ width: `${milestone.progress_percent}%` }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-gray-600">
                  <span>
                    {milestone.current} / {milestone.target}
                  </span>
                  {milestone.daysToReach && (
                    <span>~{milestone.daysToReach} dias para atingir</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dica Final */}
      <div className="rounded-lg bg-green-50 border border-green-200 p-4">
        <p className="text-sm font-semibold text-green-900">💡 Dica</p>
        <p className="mt-2 text-sm text-green-800">
          Seu progresso é baseado em aprendizado real. Continue estudando e revisando para atingir novos milestones!
        </p>
      </div>
    </div>
  )
}
