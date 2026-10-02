import React, { useState } from 'react'
import ExamPrepFormComponent from '../components/ExamPrepForm'
import ExamSimulator from '../components/ExamSimulator'
import ExamResults from '../components/ExamResults'
import { ExamPrepService } from '../lib/exam-prep-service'
import type { ExamPrepForm, ExamQuestion, ExamResult, StudentAnswer } from '../types/exam-prep'
import { useAuth } from '../lib/auth'

type PageState = 'form' | 'exam' | 'results'

export default function ExamPrepPage() {
  const { user } = useAuth()
  const [pageState, setPageState] = useState<PageState>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [examResult, setExamResult] = useState<ExamResult | null>(null)
  const [currentForm, setCurrentForm] = useState<ExamPrepForm | null>(null)

  const handleFormSubmit = async (form: ExamPrepForm) => {
    setIsLoading(true)
    setCurrentForm(form)

    try {
      // Gerar questões automaticamente
      const generatedQuestions = await ExamPrepService.generateExamQuestions(form)
      setQuestions(generatedQuestions)
      setPageState('exam')
    } catch (error) {
      console.error('Erro ao gerar questões:', error)
      alert('Erro ao preparar o teste. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExamComplete = async (answers: StudentAnswer[]) => {
    if (!currentForm || !user) return

    const correctAnswers = answers.filter(a => a.isCorrect).length
    const percentage = (correctAnswers / answers.length) * 100
    const equivalentScore = ExamPrepService.calculateEquivalentScore(percentage)
    const contentAnalysis = ExamPrepService.calculateContentPerformance(
      answers,
      questions,
      currentForm.contents
    )

    const result: ExamResult = {
      id: `exam_${Date.now()}`,
      userId: user?.id || '',
      subject: currentForm.subject,
      gradeLevel: currentForm.gradeLevel,
      contents: currentForm.contents,
      totalQuestions: answers.length,
      correctAnswers,
      percentage,
      equivalentScore,
      answers,
      contentAnalysis,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    }

    try {
      // Salvar resultado
      await ExamPrepService.saveExamResult(result)
      setExamResult(result)
      setPageState('results')
    } catch (error) {
      console.error('Erro ao salvar resultado:', error)
      alert('Erro ao salvar resultado. Tente novamente.')
    }
  }

  const handleRecommendation = (type: 'review-errors' | 'study-difficulties' | 'new-test' | 'play-games') => {
    switch (type) {
      case 'review-errors':
        // Redirecionar para revisão de erros
        console.log('Abrir revisão de erros')
        break
      case 'study-difficulties':
        // Criar trilha de revisão automática
        console.log('Criar trilha de estudo')
        break
      case 'new-test':
        // Novo teste
        setPageState('form')
        setExamResult(null)
        break
      case 'play-games':
        // Jogos relacionados
        console.log('Abrir jogos')
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {pageState === 'form' && (
        <ExamPrepFormComponent onSubmit={handleFormSubmit} isLoading={isLoading} />
      )}

      {pageState === 'exam' && questions.length > 0 && (
        <ExamSimulator questions={questions} onComplete={handleExamComplete} />
      )}

      {pageState === 'results' && examResult && (
        <ExamResults result={examResult} onRecommendationClick={handleRecommendation} />
      )}
    </div>
  )
}
