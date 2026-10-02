import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import ExamHistoryCard from '../components/ExamHistoryCard'
import { ExamPrepService } from '../lib/exam-prep-service'
import type { ExamResult } from '../types/exam-prep'
import { useAuth } from '../lib/auth'

export default function ExamHistoryPage() {
  const nav = useNavigate()
  const { user } = useAuth()
  const [history, setHistory] = useState<ExamResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'subject'>('all')
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  useEffect(() => {
    loadHistory()
  }, [user])

  const loadHistory = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      const results = await ExamPrepService.getExamHistory(user?.id || '')
      setHistory(results)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredHistory = selectedSubject
    ? history.filter(h => h.subject === selectedSubject)
    : history

  const subjects = Array.from(new Set(history.map(h => h.subject)))
  const averagePercentage = history.length > 0
    ? Math.round(history.reduce((sum, h) => sum + h.percentage, 0) / history.length)
    : 0

  const handleViewDetails = (result: ExamResult) => {
    // Armazenar resultado atual em sessão para visualizar detalhes
    sessionStorage.setItem('selectedExamResult', JSON.stringify(result))
    nav(`/preparacao-prova/resultado/${result.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <button
            onClick={() => nav('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ChevronLeft size={20} />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-gray-800">📊 Minhas Preparações para Provas</h1>
          <p className="text-gray-600 mt-1">Veja seu histórico de simulados</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Carregando histórico...</p>
          </div>
        )}

        {!isLoading && history.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-2xl mb-2">📝</p>
            <p className="text-gray-600">Você ainda não fez nenhum teste.</p>
            <button
              onClick={() => nav('/preparacao-prova')}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Começar um teste
            </button>
          </div>
        )}

        {!isLoading && history.length > 0 && (
          <>
            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <div className="text-2xl font-bold text-blue-600">{history.length}</div>
                <div className="text-sm text-gray-600">testes realizados</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <div className="text-2xl font-bold text-green-600">{averagePercentage}%</div>
                <div className="text-sm text-gray-600">média geral</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <div className="text-2xl font-bold text-purple-600">{subjects.length}</div>
                <div className="text-sm text-gray-600">matérias</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                <div className="text-2xl font-bold text-orange-600">
                  {(history.reduce((sum, h) => sum + h.equivalentScore, 0) / history.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">nota média</div>
              </div>
            </div>

            {/* Filtro por Matéria */}
            {subjects.length > 1 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Filtrar por matéria:</h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      selectedSubject === null
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    Todas
                  </button>
                  {subjects.map(subject => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        selectedSubject === subject
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lista de Testes */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedSubject ? `${selectedSubject} (${filteredHistory.length})` : `Todos os testes (${filteredHistory.length})`}
              </h2>
              {filteredHistory.length === 0 ? (
                <p className="text-center py-8 text-gray-600">Nenhum teste encontrado para esta matéria.</p>
              ) : (
                filteredHistory.map(result => (
                  <ExamHistoryCard
                    key={result.id}
                    result={result}
                    onClick={() => handleViewDetails(result)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
