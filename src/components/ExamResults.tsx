import React from 'react'
import type { ExamResult } from '../types/exam-prep'

interface ExamResultsProps {
  result: ExamResult
  onRecommendationClick: (type: 'review-errors' | 'study-difficulties' | 'new-test' | 'play-games') => void
}

export default function ExamResults({ result, onRecommendationClick }: ExamResultsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'well-mastered':
        return 'text-green-600'
      case 'needs-practice':
        return 'text-yellow-600'
      case 'needs-review':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'well-mastered':
        return '🟢'
      case 'needs-practice':
        return '🟡'
      case 'needs-review':
        return '🟠'
      default:
        return '⚪'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'well-mastered':
        return 'Bem dominado'
      case 'needs-practice':
        return 'Precisa de mais prática'
      case 'needs-review':
        return 'Precisa de revisão'
      default:
        return 'Não avaliado'
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Cabeçalho */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">🎯 Resultado do seu teste</h1>

        {/* Score Principal */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 mb-8 text-center text-white">
          <div className="text-6xl font-bold mb-2">{result.correctAnswers}/{result.totalQuestions}</div>
          <div className="text-2xl font-semibold mb-4">acertos</div>
          <div className="flex justify-center gap-8">
            <div>
              <div className="text-4xl font-bold">{Math.round(result.percentage)}%</div>
              <div className="text-sm opacity-90">de aproveitamento</div>
            </div>
            <div>
              <div className="text-4xl font-bold">{result.equivalentScore.toFixed(1)}</div>
              <div className="text-sm opacity-90">em uma escala de 10</div>
            </div>
          </div>
        </div>

        {/* Aviso Importante */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-yellow-800 mb-2">Aviso Importante</h3>
              <p className="text-yellow-700 text-sm leading-relaxed">
                Este teste é apenas uma referência sobre o seu domínio dos conteúdos estudados. As questões da sua prova escolar podem ser diferentes das questões apresentadas pelo LUMI, além de poderem abordar outros conteúdos ou níveis de dificuldade. O resultado deste teste <strong>não garante a nota que você terá na prova</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Análise por Conteúdo */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Análise de Conteúdos</h2>
          <div className="space-y-3">
            {result.contentAnalysis.map((content) => (
              <div key={content.content} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">
                    {getStatusIcon(content.status)} {content.content}
                  </span>
                  <span className="text-sm font-bold text-gray-600">
                    {content.correctCount}/{content.totalCount}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      content.status === 'well-mastered'
                        ? 'bg-green-500'
                        : content.status === 'needs-practice'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${content.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm font-semibold ${getStatusColor(content.status)}`}>
                    {getStatusLabel(content.status)}
                  </span>
                  <span className="text-sm text-gray-600">{Math.round(content.percentage)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recomendações */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Quer melhorar seu resultado?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onRecommendationClick('review-errors')}
              className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-100 transition text-left"
            >
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-bold text-gray-800 mb-1">Revisar meus erros</h3>
              <p className="text-sm text-gray-600">Veja os conceitos relacionados às questões erradas</p>
            </button>

            <button
              onClick={() => onRecommendationClick('study-difficulties')}
              className="p-6 bg-green-50 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-100 transition text-left"
            >
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-bold text-gray-800 mb-1">Estudar o que tive dificuldade</h3>
              <p className="text-sm text-gray-600">Trilha de revisão dos conteúdos com menor domínio</p>
            </button>

            <button
              onClick={() => onRecommendationClick('new-test')}
              className="p-6 bg-purple-50 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-100 transition text-left"
            >
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-gray-800 mb-1">Fazer outro teste</h3>
              <p className="text-sm text-gray-600">Novo conjunto de questões sem repetir as anteriores</p>
            </button>

            <button
              onClick={() => onRecommendationClick('play-games')}
              className="p-6 bg-orange-50 border-2 border-orange-200 rounded-lg hover:border-orange-500 hover:bg-orange-100 transition text-left"
            >
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="font-bold text-gray-800 mb-1">Revisar jogando</h3>
              <p className="text-sm text-gray-600">Jogos dos conteúdos onde teve dificuldade</p>
            </button>
          </div>
        </div>

        {/* Botão Voltar */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Voltar à Home
          </button>
        </div>
      </div>
    </div>
  )
}
