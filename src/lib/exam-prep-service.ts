import { supabase } from './supabase'
import type { ExamPrepForm, ExamQuestion, ExamResult, ContentPerformance, StudentAnswer } from '../types/exam-prep'

export class ExamPrepService {
  static async generateExamQuestions(form: ExamPrepForm): Promise<ExamQuestion[]> {
    const questions: ExamQuestion[] = []
    const difficulties = ['easy', 'medium', 'hard'] as const
    const questionTypes = [
      'multiple-choice',
      'true-false',
      'complete',
      'association',
      'interpretation',
      'problem-situation'
    ] as const

    // Tentar buscar questões oficiais do LUMI (se disponível)
    let officialQuestions: any[] = []
    if (supabase) {
      try {
        const { data } = await supabase
          .from('questions')
          .select('*')
          .eq('subject', form.subject)
          .eq('grade_level', form.gradeLevel)
          .limit(50)

        officialQuestions = data || []
      } catch (error) {
        console.warn('Não conseguiu buscar questões oficiais, usando geração automática')
      }
    }

    // Montar simulado com distribuição de dificuldade
    // 20 questões total: 7 fáceis, 8 médias, 5 difíceis
    const totalQuestions = 20
    const distributionByDifficulty = { easy: 7, medium: 8, hard: 5 }

    let questionIndex = 0
    for (const difficulty of difficulties) {
      const count = distributionByDifficulty[difficulty]
      for (let i = 0; i < count; i++) {
        const contentIndex = i % form.contents.length
        const content = form.contents[contentIndex]

        const question: ExamQuestion = {
          id: `exam_q_${Date.now()}_${questionIndex}`,
          type: questionTypes[questionIndex % questionTypes.length],
          difficulty,
          content: `Questão ${questionIndex + 1} sobre ${content} (nível ${difficulty})`,
          subject: form.subject,
          gradeLevel: form.gradeLevel,
          skillReference: content,
          options: ['multiple-choice', 'association'].includes(questionTypes[questionIndex % questionTypes.length])
            ? ['Opção A', 'Opção B', 'Opção C', 'Opção D']
            : undefined,
          correctAnswer: 'Opção A',
          explanation: `Explicação detalhada da questão sobre ${content}. Este é um conceito importante para dominar ${content} no ${form.gradeLevel}.`
        }
        questions.push(question)
        questionIndex++
      }
    }

    return questions
  }

  static async saveExamResult(result: ExamResult): Promise<string | null> {
    if (!supabase) {
      console.warn('Supabase não configurado, resultado não será salvo')
      return null
    }

    try {
      // Inserir resultado principal
      const { data: resultData, error: resultError } = await supabase
        .from('exam_prep_results')
        .insert([{
          user_id: result.userId,
          subject: result.subject,
          grade_level: result.gradeLevel,
          contents: result.contents,
          total_questions: result.totalQuestions,
          correct_answers: result.correctAnswers,
          percentage: result.percentage,
          equivalent_score: result.equivalentScore,
          content_analysis: result.contentAnalysis,
          exam_date: new Date().toISOString(),
          created_at: result.createdAt,
          completed_at: result.completedAt
        }])
        .select('id')
        .single()

      if (resultError) throw resultError

      const examResultId = resultData?.id

      // Inserir respostas individuais
      if (examResultId && result.answers.length > 0) {
        const answersToInsert = result.answers.map(answer => ({
          exam_result_id: examResultId,
          question_id: answer.questionId,
          answer: answer.answer,
          is_correct: answer.isCorrect,
          time_spent: answer.timeSpent
        }))

        const { error: answersError } = await supabase
          .from('exam_prep_answers')
          .insert(answersToInsert)

        if (answersError) {
          console.warn('Erro ao salvar respostas individuais:', answersError)
        }
      }

      return examResultId
    } catch (error) {
      console.error('Erro ao salvar resultado do teste:', error)
      throw error
    }
  }

  static async getExamHistory(userId: string): Promise<ExamResult[]> {
    if (!supabase) return []

    try {
      const { data, error } = await supabase
        .from('exam_prep_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return data?.map(row => ({
        id: `${row.id}`,
        userId: row.user_id,
        subject: row.subject,
        gradeLevel: row.grade_level,
        contents: row.contents || [],
        totalQuestions: row.total_questions,
        correctAnswers: row.correct_answers,
        percentage: row.percentage,
        equivalentScore: row.equivalent_score,
        answers: [],
        contentAnalysis: row.content_analysis || [],
        createdAt: row.created_at,
        completedAt: row.completed_at
      })) || []
    } catch (error) {
      console.error('Erro ao buscar histórico:', error)
      return []
    }
  }

  static async getExamResultById(resultId: string): Promise<ExamResult | null> {
    if (!supabase) return null

    try {
      const { data, error } = await supabase
        .from('exam_prep_results')
        .select('*')
        .eq('id', resultId)
        .single()

      if (error) throw error
      if (!data) return null

      // Buscar respostas
      const { data: answers, error: answersError } = await supabase
        .from('exam_prep_answers')
        .select('*')
        .eq('exam_result_id', resultId)

      if (answersError) console.warn('Erro ao buscar respostas:', answersError)

      return {
        id: `${data.id}`,
        userId: data.user_id,
        subject: data.subject,
        gradeLevel: data.grade_level,
        contents: data.contents || [],
        totalQuestions: data.total_questions,
        correctAnswers: data.correct_answers,
        percentage: data.percentage,
        equivalentScore: data.equivalent_score,
        answers: answers?.map(a => ({
          questionId: a.question_id,
          answer: a.answer,
          isCorrect: a.is_correct,
          timeSpent: a.time_spent || 0
        })) || [],
        contentAnalysis: data.content_analysis || [],
        createdAt: data.created_at,
        completedAt: data.completed_at
      }
    } catch (error) {
      console.error('Erro ao buscar resultado:', error)
      return null
    }
  }

  static calculateContentPerformance(
    answers: StudentAnswer[],
    questions: ExamQuestion[],
    contents: string[]
  ): ContentPerformance[] {
    const performance: ContentPerformance[] = []

    contents.forEach(content => {
      const relatedQuestions = questions.filter(q => q.skillReference === content)
      const relatedAnswers = answers.filter(a => {
        const question = questions.find(q => q.id === a.questionId)
        return question?.skillReference === content
      })

      const correctCount = relatedAnswers.filter(a => a.isCorrect).length
      const totalCount = relatedQuestions.length
      const percentage = totalCount > 0 ? (correctCount / totalCount) * 100 : 0

      let status: 'well-mastered' | 'needs-practice' | 'needs-review'
      if (percentage >= 80) status = 'well-mastered'
      else if (percentage >= 60) status = 'needs-practice'
      else status = 'needs-review'

      performance.push({
        content,
        skill: content,
        correctCount,
        totalCount,
        percentage,
        status
      })
    })

    return performance
  }

  static calculateEquivalentScore(percentage: number): number {
    return (percentage / 100) * 10
  }
}
