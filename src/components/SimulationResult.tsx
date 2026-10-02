/**
 * SimulationResult — Resultado de simulado
 * Mostra acurácia, performance por skill, recomendações
 */

import React from 'react'
import type { SimulationResult } from '../lib/simulations'

interface SimulationResultProps {
  result: SimulationResult
  examDate?: string
  onRetry?: () => void
  isLoading?: boolean
}

export function SimulationResult({ result, examDate, onRetry, isLoading }: SimulationResultProps) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Processando resultado...</p>
      </div>
    )
  }

  const isGoodPerformance = result.accuracy_percent >= 70
  const timeMinutes = Math.floor(result.time_seconds / 60)
  const timeSeconds = result.time_seconds % 60

  return (
    <div className="space-y-6 p-6">
      {/* Header com score */}
      <div
        className={`rounded-lg p-8 text-center text-white ${
          isGoodPerformance ? 'bg-gradient-to-br from-green-400 to-green-500' : 'bg-gradient-to-br from-orange-400 to-orange-500'
        }`}
      >
        <p className="text-lg font-semibold opacity-90">Seu Resultado</p>
        <div className="mt-4 text-6xl font-bold">{result.accuracy_percent}%</div>
        <p className="mt-2 text-sm opacity-90">
          {result.correct_answers} de {result.total_questions} questões corretas
        </p>

        {isGoodPerformance && (
          <p className="mt-4 text-lg font-semibold">🎉 Excelente desempenho!</p>
        )}
        {!isGoodPerformance && (
          <p className="mt-4 text-lg font-semibold">💪 Continue estudando!</p>
        )}
      </div>

      {/* Tempo */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm font-semibold text-blue-900">⏱️ Tempo gasto</p>
        <p className="mt-2 text-2xl font-bold text-blue-600">
          {timeMinutes}m {timeSeconds}s
        </p>
        <p className="mt-1 text-xs text-blue-700">
          Média: {Math.round(result.time_seconds / result.total_questions)}s por questão
        </p>
      </div>

      {/* Performance por Habilidade */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">📊 Performance por Habilidade</h3>

        {result.skills_performance.map((skill) => (
          <div key={skill.skill_id} className="rounded-lg bg-gray-50 p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">{skill.skill_name}</span>
              <span
                className={`text-sm font-bold ${
                  skill.accuracy_percent >= 80 ? 'text-green-600' : skill.accuracy_percent >= 60 ? 'text-orange-600' : 'text-red-600'
                }`}
              >
                {skill.accuracy_percent}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-300">
              <div
                className={`h-full transition-all ${
                  skill.accuracy_percent >= 80
                    ? 'bg-green-500'
                    : skill.accuracy_percent >= 60
                      ? 'bg-orange-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${skill.accuracy_percent}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-gray-600">
              {skill.questions_attempted} questões | Dificuldade média: {skill.difficulty_average}/3
            </p>
          </div>
        ))}
      </div>

      {/* Forças e Fraquezas */}
      <div className="grid gap-4 sm:grid-cols-2">
        {result.strong_areas.length > 0 && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <h4 className="font-semibold text-green-900">✅ Seus Pontos Fortes</h4>
            <ul className="mt-2 space-y-1">
              {result.strong_areas.map((area) => (
                <li key={area} className="text-sm text-green-700">
                  • {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result.weak_areas.length > 0 && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
            <h4 className="font-semibold text-orange-900">🔄 Áreas de Melhoria</h4>
            <ul className="mt-2 space-y-1">
              {result.weak_areas.map((area) => (
                <li key={area} className="text-sm text-orange-700">
                  • {area}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recomendações */}
      {result.recommendations.length > 0 && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
          <h4 className="font-semibold text-blue-900">💡 Recomendações</h4>
          <ul className="mt-2 space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-blue-700">
                {i + 1}. {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Estimativa de Nota */}
      {result.estimated_grade && (
        <div className="rounded-lg bg-purple-50 border border-purple-200 p-4">
          <p className="text-sm font-semibold text-purple-900">🎓 Estimativa de Nota na Prova Real</p>
          <p className="mt-2 text-2xl font-bold text-purple-600">{result.estimated_grade}</p>
          <p className="mt-1 text-xs text-purple-700">Baseado em sua performance atual</p>
        </div>
      )}

      {/* Botões de Ação */}
      <div className="flex gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex-1 rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            🔄 Tentar Novamente
          </button>
        )}
        <button
          onClick={() => window.location.href = '/revisar'}
          className="flex-1 rounded-lg border-2 border-orange-500 px-4 py-3 font-semibold text-orange-500 transition hover:bg-orange-50"
        >
          📚 Revisar Agora
        </button>
      </div>
    </div>
  )
}
