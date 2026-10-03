import React, { useState, useEffect } from 'react'
import ExamPrepFormComponent from '../components/ExamPrepForm'
import ExamSimulator from '../components/ExamSimulator'
import ExamResults from '../components/ExamResults'
import { ExamPrepService } from '../lib/exam-prep-service'
import type { ExamPrepForm, ExamQuestion, ExamResult, StudentAnswer } from '../types/exam-prep'
import { getState } from '../lib/store'

type PageState = 'form' | 'exam' | 'results'

export default function ExamPrepPage() {
  const [userId, setUserId] = useState<string>('')
  const [pageState, setPageState] = useState<PageState>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [examResult, setExamResult] = useState<ExamResult | null>(null)
  const [currentForm, setCurrentForm] = useState<ExamPrepForm | null>(null)

  // Obter userId do estado global (localStorage)
  useEffect(() => {
    const profile = getState().profile
    setUserId(profile.userId || `user_${Date.now()}`)
  }, [])

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
    if (!currentForm || !userId) return

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
      userId,
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
    if (!examResult) return

    switch (type) {
      case 'review-errors': {
        // Mostrar erros e redirecionar para estudar conteúdos com erro
        const wrongAnswers = examResult.answers.filter(a => !a.isCorrect)
        const contentsWithErrors = new Set<string>()

        wrongAnswers.forEach(answer => {
          const question = questions.find(q => q.id === answer.questionId)
          if (question?.skillReference) {
            contentsWithErrors.add(question.skillReference)
          }
        })

        if (contentsWithErrors.size > 0) {
          const query = Array.from(contentsWithErrors).join(',')
          window.location.href = `/estudar?retry=${encodeURIComponent(query)}`
        }
        break
      }

      case 'study-difficulties': {
        // Trilha de revisão para conteúdos com <70% acerto
        const weakContents = examResult.contentAnalysis
          .filter(c => c.percentage < 70)
          .map(c => c.content)

        if (weakContents.length > 0) {
          const query = weakContents.join(',')
          window.location.href = `/estudar?urgencia=revisao&conteudos=${encodeURIComponent(query)}`
        }
        break
      }

      case 'new-test': {
        // Novo teste com mesmo formulário
        setPageState('form')
        setQuestions([])
        setExamResult(null)
        break
      }

      case 'play-games': {
        // Filtrar jogos para conteúdos com dificuldade (<70%)
        const gamesContents = examResult.contentAnalysis
          .filter(c => c.percentage < 70)
          .map(c => c.content)

        if (gamesContents.length > 0) {
          const query = gamesContents.join(',')
          window.location.href = `/jogos?filter=${encodeURIComponent(query)}`
        } else {
          // Se nenhum conteúdo com dificuldade, abrir jogos gerais da matéria
          window.location.href = `/jogos?subject=${encodeURIComponent(examResult.subject)}`
        }
        break
      }
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
