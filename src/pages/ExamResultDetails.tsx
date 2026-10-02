import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Download } from 'lucide-react'
import { ExamPrepService } from '../lib/exam-prep-service'
import type { ExamResult } from '../types/exam-prep'

export default function ExamResultDetailsPage() {
  const { resultId } = useParams()
  const nav = useNavigate()
  const [result, setResult] = useState<ExamResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadResult()
  }, [resultId])

  const loadResult = async () => {
    if (!resultId) return

    setIsLoading(true)
    try {
      const data = await ExamPrepService.getExamResultById(resultId)
      setResult(data)
    } catch (error) {
      console.error('Erro ao carregar resultado:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    if (!result) return

    // Simular download de PDF (implementar depois com biblioteca)
    alert('Download de PDF será disponibilizado em breve!')
  }

  const getAnswerStatusColor = (isCorrect: boolean) => {
    return isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
  }

  const getAnswerStatusIcon = (isCorrect: boolean) => {
    return isCorrect ? '✓ Correto' : '✗ Incorreto'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-600">Carregando resultado...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Resultado não encontrado</p>
          <button
            onClick={() => nav('/preparacao-prova/historico')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Voltar ao Histórico
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b sticky top-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => nav('/preparacao-prova/historico')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ChevronLeft size={20} />
            Voltar
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{result.subject} — {result.gradeLevel}</h1>
              <p className="text-gray-600 text-sm mt-1">📅 {formatDate(result.createdAt)}</p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Download size={18} />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Score Principal */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 mb-8 text-white">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-5xl font-bold">{result.correctAnswers}/{result.totalQuestions}</div>
              <div className="text-sm opacity-90 mt-1">Acertos</div>
            </div>
            <div>
              <div className="text-5xl font-bold">{Math.round(result.percentage)}%</div>
              <div className="text-sm opacity-90 mt-1">Aproveitamento</div>
            </div>
            <div>
              <div className="text-5xl font-bold">{result.equivalentScore.toFixed(1)}</div>
              <div className="text-sm opacity-90 mt-1">Nota (0-10)</div>
            </div>
          </div>
        </div>

        {/* Análise por Conteúdo */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Análise de Conteúdos</h2>
          <div className="space-y-3">
            {result.contentAnalysis.map((content) => {
              const getColor = (status: string) => {
                switch (status) {
                  case 'well-mastered':
                    return 'border-green-200 bg-green-50'
                  case 'needs-practice':
                    return 'border-yellow-200 bg-yellow-50'
                  case 'needs-review':
                    return 'border-red-200 bg-red-50'
                  default:
                    return 'border-gray-200 bg-gray-50'
                }
              }

              const getStatusIcon = (status: string) => {
                switch (status) {
                  case 'well-mastered':
                    return '🟢'
                  case 'needs-practice':
                    return '🟡'
                  case 'needs-review':
                    return '🔴'
                  default:
                    return '⚪'
                }
              }

              return (
                <div key={content.content} className={`border-2 rounded-lg p-4 ${getColor(content.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-800">
                      {getStatusIcon(content.status)} {content.content}
                    </div>
                    <div className="text-sm font-bold text-gray-600">
                      {content.correctCount}/{content.totalCount}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
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
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">
                      {content.percentage >= 80
                        ? '🟢 Bem dominado'
                        : content.percentage >= 60
                        ? '🟡 Precisa de mais prática'
                        : '🔴 Precisa de revisão'}
                    </span>
                    <span className="font-semibold text-gray-800">{Math.round(content.percentage)}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Todas as Respostas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Suas Respostas</h2>
          <div className="space-y-3">
            {result.answers.map((answer, idx) => (
              <div
                key={`${answer.questionId}-${idx}`}
                className={`border-2 rounded-lg p-4 ${getAnswerStatusColor(answer.isCorrect)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Questão {idx + 1}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">ID: {answer.questionId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    answer.isCorrect
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}>
                    {getAnswerStatusIcon(answer.isCorrect)}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  <p><strong>Sua resposta:</strong> {answer.answer}</p>
                  <p className="text-xs text-gray-600 mt-1">⏱️ Tempo: {answer.timeSpent}s</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => nav('/preparacao-prova')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            📝 Fazer Novo Teste
          </button>
          <button
            onClick={() => nav('/preparacao-prova/historico')}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
          >
            📊 Ver Histórico
          </button>
        </div>
      </div>
    </div>
  )
}
