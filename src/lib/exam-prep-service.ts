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
      'interpretation',
      'problem-situation'
    ] as const

    // Buscar questões oficiais relacionadas aos conteúdos
    const { data: officialQuestions } = await supabase
      .from('questions')
      .select('*')
      .filter('subject', 'eq', form.subject)
      .filter('grade_level', 'eq', form.gradeLevel)

    // Agrupar por conteúdo e dificuldade
    const questionsByContent: Record<string, ExamQuestion[]> = {}
    form.contents.forEach(content => {
      questionsByContent[content] = []
    })

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
          id: `q_${Date.now()}_${questionIndex}`,
          type: questionTypes[i % questionTypes.length],
          difficulty,
          content: `Questão sobre ${content}`,
          subject: form.subject,
          gradeLevel: form.gradeLevel,
          skillReference: content,
          options: difficulty === 'multiple-choice' ? [
            'Opção A',
            'Opção B',
            'Opção C',
            'Opção D'
          ] : undefined,
          correctAnswer: 'Opção A',
          explanation: `Explicação da questão sobre ${content} (nível ${difficulty})`
        }
        questions.push(question)
        questionIndex++
      }
    }

    return questions
  }

  static async saveExamResult(result: ExamResult): Promise<void> {
    // Salvar resultado no Supabase
    const { error } = await supabase
      .from('exam_prep_results')
      .insert([{
        user_id: result.userId,
        subject: result.subject,
        grade_level: result.gradeLevel,
        total_questions: result.totalQuestions,
        correct_answers: result.correctAnswers,
        percentage: result.percentage,
        equivalent_score: result.equivalentScore,
        content_analysis: result.contentAnalysis,
        created_at: result.createdAt,
        completed_at: result.completedAt
      }])

    if (error) throw error
  }

  static async getExamHistory(userId: string): Promise<ExamResult[]> {
    const { data, error } = await supabase
      .from('exam_prep_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
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
