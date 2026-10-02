/**
 * HistoryPanel — Histórico detalhado de atividades
 * Timeline de estudos, simulados, conquistas
 */

import React, { useState } from 'react'
import type { ProgressSnapshot, SimulationSession } from '../types/learning'

interface HistoryEvent {
  type: 'lesson' | 'simulation' | 'achievement' | 'goal' | 'milestone'
  date: string
  title: string
  icon: string
  description: string
  metadata?: Record<string, any>
}

interface HistoryPanelProps {
  events: HistoryEvent[]
  snapshots?: ProgressSnapshot[]
  isLoading?: boolean
}

export function HistoryPanel({ events = [], snapshots = [], isLoading }: HistoryPanelProps) {
  const [filter, setFilter] = useState<'all' | 'lessons' | 'simulations' | 'achievements'>('all')

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Carregando histórico...</p>
      </div>
    )
  }

  const filteredEvents = events.filter((e) => {
    if (filter === 'all') return true
    if (filter === 'lessons') return e.type === 'lesson'
    if (filter === 'simulations') return e.type === 'simulation'
    if (filter === 'achievements') return ['achievement', 'goal', 'milestone'].includes(e.type)
    return true
  })

  // Agrupar por data
  const eventsByDate = new Map<string, HistoryEvent[]>()
  filteredEvents.forEach((e) => {
    const date = e.date.split('T')[0]
    if (!eventsByDate.has(date)) {
      eventsByDate.set(date, [])
    }
    eventsByDate.get(date)!.push(e)
  })

  const sortedDates = Array.from(eventsByDate.keys()).sort().reverse()

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">📖 Seu Histórico</h2>
        <p className="mt-1 text-sm text-gray-600">Acompanhe todas as atividades</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto">
        {(['all', 'lessons', 'simulations', 'achievements'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition ${
              filter === f
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f === 'all' && '📚 Tudo'}
            {f === 'lessons' && '📖 Aulas'}
            {f === 'simulations' && '🧪 Simulados'}
            {f === 'achievements' && '🏆 Conquistas'}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {sortedDates.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-6 text-center">
          <p className="text-gray-600">Nenhuma atividade neste período</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDates.map((date) => {
            const dayEvents = eventsByDate.get(date) || []
            const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })

            return (
              <div key={date} className="space-y-3">
                {/* Data */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="px-4 text-sm font-semibold text-gray-700 capitalize">{formattedDate}</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* Eventos do dia */}
                <div className="space-y-2">
                  {dayEvents.map((event, i) => {
                    const bgColor =
                      event.type === 'lesson'
                        ? 'bg-blue-50 border-blue-200'
                        : event.type === 'simulation'
                          ? 'bg-purple-50 border-purple-200'
                          : 'bg-green-50 border-green-200'

                    return (
                      <div
                        key={i}
                        className={`rounded-lg border-2 ${bgColor} p-4 flex gap-4 hover:shadow-md transition`}
                      >
                        {/* Ícone */}
                        <div className="text-2xl flex-shrink-0">{event.icon}</div>

                        {/* Conteúdo */}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{event.title}</h4>
                          <p className="mt-1 text-sm text-gray-600">{event.description}</p>

                          {/* Metadata */}
                          {event.metadata && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {Object.entries(event.metadata).map(([key, value]) => (
                                <span
                                  key={key}
                                  className="inline-block rounded bg-white px-2 py-1 text-xs font-semibold text-gray-700 border border-gray-200"
                                >
                                  {key}: <strong>{value}</strong>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Hora */}
                        <div className="text-xs text-gray-500 flex-shrink-0 text-right">
                          {new Date(event.date).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Estatísticas do Período */}
      {snapshots.length > 0 && (
        <div className="rounded-lg bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">📊 Estatísticas do Período</h3>

          <div className="grid gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-xs text-gray-600 uppercase">Dias Ativos</p>
              <p className="mt-2 text-2xl font-bold text-orange-600">{snapshots.length}</p>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-600 uppercase">Melhoria</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                +{snapshots.length > 0
                  ? Math.max(0, snapshots[snapshots.length - 1].overall_mastery - snapshots[0].overall_mastery)
                  : 0}%
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-600 uppercase">Média de Acurácia</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {snapshots.length > 0
                  ? Math.round(
                      snapshots.reduce((a, s) => a + s.accuracy_percent, 0) / snapshots.length
                    )
                  : 0}%
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-600 uppercase">Total de Questões</p>
              <p className="mt-2 text-2xl font-bold text-purple-600">
                {snapshots.length > 0
                  ? snapshots.reduce((a, s) => a + s.total_attempts, 0)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
