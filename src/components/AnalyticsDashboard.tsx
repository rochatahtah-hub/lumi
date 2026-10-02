/**
 * AnalyticsDashboard — Painel de Analytics em Tempo Real
 * Visualiza métricas agregadas do LUMI
 * Adminonly (interno)
 */

import React, { useEffect, useState } from 'react'
import type { ProgressSnapshot } from '../lib/progress-analytics'

interface AnalyticsMetrics {
  total_users: number
  total_attempts: number
  average_mastery: number
  average_accuracy: number
  most_studied_skill: string
  most_difficult_skill: string
  daily_active_users: number
  weekly_retention: number
  avg_session_duration: number
  total_achievements_earned: number
}

interface AnalyticsDashboardProps {
  isLoading?: boolean
}

export function AnalyticsDashboard({ isLoading }: AnalyticsDashboardProps) {
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    total_users: 0,
    total_attempts: 0,
    average_mastery: 0,
    average_accuracy: 0,
    most_studied_skill: '',
    most_difficult_skill: '',
    daily_active_users: 0,
    weekly_retention: 0,
    avg_session_duration: 0,
    total_achievements_earned: 0,
  })

  useEffect(() => {
    // Em produção: buscar do Supabase
    // Por enquanto: dados mock
    loadMetrics()
  }, [])

  const loadMetrics = async () => {
    // Mock data — em produção, integrar com Supabase
    setMetrics({
      total_users: 342,
      total_attempts: 8943,
      average_mastery: 58,
      average_accuracy: 62,
      most_studied_skill: 'Biologia',
      most_difficult_skill: 'Dinâmica',
      daily_active_users: 87,
      weekly_retention: 78,
      avg_session_duration: 24,
      total_achievements_earned: 1240,
    })
  }

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Carregando analytics...</div>
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">📊 Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">Métricas agregadas do LUMI em tempo real</p>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
        {/* Total Users */}
        <div className="rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 p-4 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase opacity-90">Usuários Ativos</p>
          <p className="mt-3 text-3xl font-bold">{metrics.total_users}</p>
          <p className="mt-1 text-xs opacity-75">+15% este mês</p>
        </div>

        {/* Total Attempts */}
        <div className="rounded-lg bg-gradient-to-br from-purple-400 to-purple-500 p-4 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase opacity-90">Questões Respondidas</p>
          <p className="mt-3 text-3xl font-bold">{metrics.total_attempts.toLocaleString()}</p>
          <p className="mt-1 text-xs opacity-75">+23% comparado a semana</p>
        </div>

        {/* Average Mastery */}
        <div className="rounded-lg bg-gradient-to-br from-green-400 to-green-500 p-4 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase opacity-90">Domínio Médio</p>
          <p className="mt-3 text-3xl font-bold">{metrics.average_mastery}%</p>
          <p className="mt-1 text-xs opacity-75">+8 pontos este mês</p>
        </div>

        {/* Accuracy */}
        <div className="rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 p-4 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase opacity-90">Acurácia Média</p>
          <p className="mt-3 text-3xl font-bold">{metrics.average_accuracy}%</p>
          <p className="mt-1 text-xs opacity-75">Tendência estável</p>
        </div>

        {/* Achievements */}
        <div className="rounded-lg bg-gradient-to-br from-pink-400 to-pink-500 p-4 text-white shadow-lg">
          <p className="text-xs font-semibold uppercase opacity-90">Conquistas</p>
          <p className="mt-3 text-3xl font-bold">{metrics.total_achievements_earned}</p>
          <p className="mt-1 text-xs opacity-75">Desbloqueadas total</p>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Engagement Metrics */}
        <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Engajamento</h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-semibold text-gray-700">Usuários Ativos Diários</p>
                <p className="text-sm font-bold text-blue-600">{metrics.daily_active_users}</p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(metrics.daily_active_users / metrics.total_users) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-semibold text-gray-700">Taxa de Retenção Semanal</p>
                <p className="text-sm font-bold text-green-600">{metrics.weekly_retention}%</p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full bg-green-500" style={{ width: `${metrics.weekly_retention}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-semibold text-gray-700">Duração Média de Sessão</p>
                <p className="text-sm font-bold text-purple-600">{metrics.avg_session_duration} min</p>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${Math.min((metrics.avg_session_duration / 60) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="mt-4 rounded-lg bg-blue-50 p-3 border border-blue-200">
            <p className="text-xs font-semibold text-blue-900">💡 Insight</p>
            <p className="mt-1 text-xs text-blue-800">
              Taxa de retenção está {metrics.weekly_retention > 75 ? 'acima' : 'abaixo'} da meta. Continue investindo em engajamento.
            </p>
          </div>
        </div>

        {/* Learning Metrics */}
        <div className="rounded-lg bg-white p-6 shadow-lg border-2 border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Aprendizado</h3>

          <div className="space-y-3">
            {/* Skills */}
            <div className="rounded-lg bg-gray-50 p-3 border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Habilidades Mais Estudadas</p>
              <div className="flex items-center gap-2">
                <div className="text-2xl">📊</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{metrics.most_studied_skill}</p>
                  <p className="text-xs text-gray-600">Mais focada pelos alunos</p>
                </div>
              </div>
            </div>

            {/* Difficulties */}
            <div className="rounded-lg bg-orange-50 p-3 border border-orange-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Habilidades Mais Difíceis</p>
              <div className="flex items-center gap-2">
                <div className="text-2xl">⚠️</div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{metrics.most_difficult_skill}</p>
                  <p className="text-xs text-gray-600">Menor domínio entre alunos</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-lg bg-green-50 p-3 border border-green-200">
              <p className="text-xs font-semibold text-green-900">💡 Recomendação</p>
              <p className="mt-1 text-xs text-green-800">
                Criar mais conteúdo de {metrics.most_difficult_skill} para ajudar alunos com essa habilidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="rounded-lg bg-white shadow-lg border-2 border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">📊 Análise Detalhada</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Métrica</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Valor</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Tendência</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-gray-800">Total de Usuários</td>
                <td className="px-6 py-3 text-gray-600">{metrics.total_users}</td>
                <td className="px-6 py-3">
                  <span className="text-green-600 font-semibold">↑ +15%</span>
                </td>
                <td className="px-6 py-3">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Saudável
                  </span>
                </td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-gray-800">Domínio Médio</td>
                <td className="px-6 py-3 text-gray-600">{metrics.average_mastery}%</td>
                <td className="px-6 py-3">
                  <span className="text-green-600 font-semibold">↑ +8%</span>
                </td>
                <td className="px-6 py-3">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Melhorando
                  </span>
                </td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-gray-800">Taxa de Retenção</td>
                <td className="px-6 py-3 text-gray-600">{metrics.weekly_retention}%</td>
                <td className="px-6 py-3">
                  <span className="text-green-600 font-semibold">↑ +3%</span>
                </td>
                <td className="px-6 py-3">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Excelente
                  </span>
                </td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-gray-800">Acurácia Média</td>
                <td className="px-6 py-3 text-gray-600">{metrics.average_accuracy}%</td>
                <td className="px-6 py-3">
                  <span className="text-gray-600 font-semibold">→ Estável</span>
                </td>
                <td className="px-6 py-3">
                  <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                    Normal
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold text-gray-800">Atividade Diária</td>
                <td className="px-6 py-3 text-gray-600">{metrics.daily_active_users} users</td>
                <td className="px-6 py-3">
                  <span className="text-green-600 font-semibold">↑ +25%</span>
                </td>
                <td className="px-6 py-3">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Crescendo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-2 border-blue-200">
        <p className="text-sm font-semibold text-gray-700">📊 Dashboard em Tempo Real</p>
        <p className="mt-2 text-sm text-gray-600">
          Dados atualizados a cada 5 minutos. Use este painel para monitorar a saúde do LUMI e identificar oportunidades de melhoria.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600">
            Exportar Relatório
          </button>
          <button className="rounded-lg border-2 border-blue-500 px-4 py-2 text-sm font-semibold text-blue-500 transition hover:bg-blue-50">
            Atualizar Agora
          </button>
        </div>
      </div>
    </div>
  )
}
