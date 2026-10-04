import React, { useState, useEffect } from 'react'
import type { ExamQuestion, StudentAnswer } from '../types/exam-prep'

interface ExamSimulatorProps {
  questions: ExamQuestion[]
  onComplete: (answers: StudentAnswer[]) => void
}

export default function ExamSimulator({ questions, onComplete }: ExamSimulatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<StudentAnswer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [startTime, setStartTime] = useState<number>(Date.now())

  useEffect(() => {
    setStartTime(Date.now())
  }, [currentIndex])

  const currentQuestion = questions[currentIndex]

  // Guard: se não houver questão atual, mostrar erro
  if (!currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">Erro: Questão não encontrada</p>
          <p className="text-gray-600 mb-4">índice: {currentIndex}, total: {questions.length}</p>
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            ← Voltar
          </button>
        </div>
      </div>
    )
  }
  const isLastQuestion = currentIndex === questions.length - 1
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = () => {
    if (!selectedAnswer) return

    const timeSpent = Math.floor((Date.now() - startTime) / 1000)
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    const newAnswer: StudentAnswer = {
      questionId: currentQuestion.id,
      answer: selectedAnswer,
      isCorrect,
      timeSpent
    }

    setAnswers([...answers, newAnswer])
    setSelectedAnswer('')

    if (isLastQuestion) {
      onComplete([...answers, newAnswer])
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Barra de Progresso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Pergunta {currentIndex + 1} de {questions.length}</h2>
            <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Questão */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {currentQuestion.difficulty === 'easy' && <span className="text-green-600">🟢 Fácil</span>}
            {currentQuestion.difficulty === 'medium' && <span className="text-yellow-600">🟡 Médio</span>}
            {currentQuestion.difficulty === 'hard' && <span className="text-red-600">🔴 Difícil</span>}
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.content}</h3>

          {/* Opções */}
          <div>
            {(currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'association') && currentQuestion.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition min-h-20 flex items-center ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="mr-3 flex-shrink-0 w-5 h-5"
                    />
                    <span className="text-sm sm:text-base font-medium text-gray-800 break-words">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'true-false' && (
              <>
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedAnswer === 'Verdadeiro'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="answer"
                    value="Verdadeiro"
                    checked={selectedAnswer === 'Verdadeiro'}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="mr-3"
                  />
                  ✓ Verdadeiro
                </label>
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                  selectedAnswer === 'Falso'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="answer"
                    value="Falso"
                    checked={selectedAnswer === 'Falso'}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="mr-3"
                  />
                  ✗ Falso
                </label>
              </>
            )}

            {(currentQuestion.type === 'complete' || currentQuestion.type === 'open' || currentQuestion.type === 'interpretation') && (
              <textarea
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="Digite sua resposta aqui..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                rows={4}
              />
            )}

            {!currentQuestion.options && (currentQuestion.type !== 'complete' && currentQuestion.type !== 'open' && currentQuestion.type !== 'interpretation') && (
              <div className="bg-red-50 p-4 rounded-lg text-red-700">
                ⚠️ Tipo de questão não suportado: {currentQuestion.type}
              </div>
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-4">
          {currentIndex > 0 && (
            <button
              onClick={() => {
                setCurrentIndex(currentIndex - 1)
                const previousAnswer = answers.find(a => a.questionId === questions[currentIndex - 1].id)
                setSelectedAnswer(previousAnswer?.answer || '')
              }}
              className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              ← Anterior
            </button>
          )}

          <button
            onClick={handleAnswer}
            disabled={!selectedAnswer}
            className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {isLastQuestion ? '✓ Finalizar Teste' : 'Próxima →'}
          </button>
        </div>
      </div>
    </div>
  )
}
