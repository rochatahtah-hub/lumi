import { supabase } from './supabase'
import { BASE_LESSONS } from '../content/index'
import type { ExamPrepForm, ExamQuestion, ExamResult, ContentPerformance, StudentAnswer } from '../types/exam-prep'
import type { Lesson } from '../types'
import { registerQuestionNotFound } from './questions-not-found'

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

    // Distribuição de dificuldade: 20 questões (7 fáceis, 8 médias, 5 difíceis)
    const totalQuestions = 20
    const distributionByDifficulty = { easy: 7, medium: 8, hard: 5 }

    let questionIndex = 0
    for (const difficulty of difficulties) {
      const count = distributionByDifficulty[difficulty]
      for (let i = 0; i < count; i++) {
        const contentIndex = i % form.contents.length
        const content = form.contents[contentIndex]
        const typeIndex = questionIndex % questionTypes.length
        const type = questionTypes[typeIndex]

        // Buscar lição na Base Oficial que combina com o conteúdo
        const matchedLesson = this.findLessonByContent(content, form.subject, form.gradeLevel)

        if (!matchedLesson) {
          // Registrar no audit quando não encontrar
          await registerQuestionNotFound(content, form)
        }

        const question = matchedLesson
          ? this.generateQuestionFromLesson(matchedLesson, content, difficulty, type, questionIndex)
          : this.generateFallbackQuestion(content, form.subject, form.gradeLevel, difficulty, type, questionIndex)

        questions.push(question)
        questionIndex++
      }
    }

    return questions
  }

  private static findLessonByContent(content: string, subject: string, gradeLevel: string): Lesson | undefined {
    const contentLower = content.toLowerCase()

    return BASE_LESSONS.find(lesson => {
      const titleMatch = lesson.title.toLowerCase().includes(contentLower)
      const summaryMatch = lesson.summary?.toLowerCase().includes(contentLower)
      const subjectMatch = lesson.subject?.toLowerCase().includes(subject.toLowerCase())

      return (titleMatch || summaryMatch) && subjectMatch
    })
  }

  private static generateQuestionFromLesson(
    lesson: Lesson,
    content: string,
    difficulty: 'easy' | 'medium' | 'hard',
    type: ExamQuestion['type'],
    index: number
  ): ExamQuestion {
    // Extrair conteúdo da lição
    const blockExample = lesson.blocks?.[0]?.example || lesson.blocks?.[0]?.text || ''
    const blockText = lesson.blocks?.[0]?.text || ''
    const explanation = lesson.summary || blockText || `Conceito importante: ${content}`
    const examples = lesson.blocks?.map(b => b.example || b.text).filter(Boolean) || []

    const baseQuestion = {
      id: `exam_q_${Date.now()}_${index}`,
      type,
      difficulty,
      subject: lesson.subject || 'Não especificado',
      gradeLevel: lesson.grade || 'Fundamental',
      skillReference: content
    }

    // Variar tipo de questão
    if (type === 'multiple-choice' || type === 'association') {
      const correctOption = examples[Math.floor(Math.random() * examples.length)] || content
      return {
        ...baseQuestion,
        content: `Qual é a definição ou exemplo correto para "${content}"?`,
        options: [
          correctOption,
          `Conceito relacionado a ${content}`,
          `Ideia incorreta sobre ${content}`,
          `Aplicação errada de ${content}`
        ],
        correctAnswer: correctOption,
        explanation
      }
    } else if (type === 'true-false') {
      return {
        ...baseQuestion,
        content: `Verdadeiro ou Falso: ${examples[0] || content}`,
        correctAnswer: 'Verdadeiro',
        explanation
      }
    } else if (type === 'complete') {
      return {
        ...baseQuestion,
        content: `Complete: "${content}" é um conceito que significa __________.`,
        correctAnswer: explanation.substring(0, 50),
        explanation
      }
    } else if (type === 'interpretation') {
      return {
        ...baseQuestion,
        content: `Com base no conceito de ${content}, qual é a interpretação correta? ${examples[0] || ''}`,
        correctAnswer: `A interpretação correta envolve entender ${content} como ${explanation}`,
        explanation
      }
    } else if (type === 'problem-situation') {
      return {
        ...baseQuestion,
        content: `Situação-problema: Um aluno está estudando ${content}. Qual seria a abordagem correta?`,
        correctAnswer: `Estudar ${content} requer compreender ${explanation}`,
        explanation
      }
    } else {
      // open question
      return {
        ...baseQuestion,
        content: `Explique o conceito de ${content} e como ele se aplica.`,
        correctAnswer: explanation,
        explanation
      }
    }
  }

  private static generateFallbackQuestion(
    content: string,
    subject: string,
    gradeLevel: string,
    difficulty: 'easy' | 'medium' | 'hard',
    type: ExamQuestion['type'],
    index: number
  ): ExamQuestion {
    // Fallback quando não encontrar na Base Oficial
    const difficultyLabel = difficulty === 'easy' ? 'básico' : difficulty === 'medium' ? 'intermediário' : 'avançado'

    // Definir correctAnswer baseado no tipo de questão
    let correctAnswer: string
    if (type === 'multiple-choice' || type === 'association') {
      correctAnswer = 'Opção A'
    } else if (type === 'true-false') {
      correctAnswer = 'Verdadeiro'
    } else {
      // Para tipos open, complete, interpretation, problem-situation
      correctAnswer = `Uma resposta correta sobre ${content}`
    }

    return {
      id: `exam_q_${Date.now()}_${index}`,
      type,
      difficulty,
      content: `Questão sobre ${content} (nível ${difficultyLabel})`,
      subject,
      gradeLevel,
      skillReference: content,
      options: type === 'multiple-choice' || type === 'association'
        ? ['Opção A', 'Opção B', 'Opção C', 'Opção D']
        : undefined,
      correctAnswer,
      explanation: `Este conceito se refere a ${content}. Para dominar este tema, estude a lição correspondente.`
    }
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
