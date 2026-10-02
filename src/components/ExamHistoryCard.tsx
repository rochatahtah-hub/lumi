import React from 'react'
import { ChevronRight } from 'lucide-react'
import type { ExamResult } from '../types/exam-prep'

interface ExamHistoryCardProps {
  result: ExamResult
  onClick?: () => void
}

export default function ExamHistoryCard({ result, onClick }: ExamHistoryCardProps) {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 border-green-300'
    if (percentage >= 60) return 'bg-yellow-100 border-yellow-300'
    return 'bg-red-100 border-red-300'
  }

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 80) return '🟢'
    if (percentage >= 60) return '🟡'
    return '🔴'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  }

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg p-4 border-2 transition hover:shadow-md ${getStatusColor(
        result.percentage
      )}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Cabeçalho */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{getStatusBadge(result.percentage)}</span>
            <h3 className="font-semibold text-gray-800 truncate">{result.subject}</h3>
            <span className="text-sm text-gray-600">— {result.gradeLevel}</span>
          </div>

          {/* Score e Porcentagem */}
          <div className="flex items-center gap-4 mb-2">
            <div>
              <div className="text-xl font-bold text-gray-800">
                {result.correctAnswers}/{result.totalQuestions}
              </div>
              <div className="text-xs text-gray-600">acertos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{Math.round(result.percentage)}%</div>
              <div className="text-xs text-gray-600">aproveitamento</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{result.equivalentScore.toFixed(1)}</div>
              <div className="text-xs text-gray-600">nota (0-10)</div>
            </div>
          </div>

          {/* Conteúdos */}
          {result.contents.length > 0 && (
            <div className="text-xs text-gray-600 mb-2">
              📚 {result.contents.slice(0, 2).join(', ')}
              {result.contents.length > 2 && ` +${result.contents.length - 2}`}
            </div>
          )}

          {/* Data */}
          <div className="text-xs text-gray-500">📅 {formatDate(result.createdAt)}</div>
        </div>

        {/* Ícone de navegação */}
        <ChevronRight size={20} className="shrink-0 text-gray-400" />
      </div>
    </button>
  )
}
