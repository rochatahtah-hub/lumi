import { supabase } from './supabase'
import { BASE_LESSONS } from '../content/index'
import type { ExamPrepForm, ExamQuestion, ExamResult, ContentPerformance, StudentAnswer } from '../types/exam-prep'
import type { Lesson, Question } from '../types'
import { registerQuestionNotFound } from './questions-not-found'

export class ExamPrepService {
  static async generateExamQuestions(form: ExamPrepForm): Promise<ExamQuestion[]> {
    // Coletar questões reais das lições relacionadas aos conteúdos
    const allQuestions: ExamQuestion[] = []

    for (const content of form.contents) {
      const lesson = this.findLessonByContent(content, form.subject, form.gradeLevel)
      if (lesson?.questions?.length) {
        const converted = lesson.questions.map((q, idx) =>
          this.convertLessonQuestionToExamQuestion(q, lesson, content, idx)
        )
        allQuestions.push(...converted)
      } else {
        await registerQuestionNotFound(content, form)
      }
    }

    // Se não houver questões suficientes, usar fallback
    if (allQuestions.length === 0) {
      return this.generateFallbackQuestions(form)
    }

    // Distribuir por dificuldade: 20 questões (7 fáceis, 8 médias, 5 difíceis)
    const byDifficulty = {
      easy: allQuestions.filter(q => q.difficulty === 'easy'),
      medium: allQuestions.filter(q => q.difficulty === 'medium'),
      hard: allQuestions.filter(q => q.difficulty === 'hard')
    }

    const selected: ExamQuestion[] = []
    selected.push(...this.shuffleArray(byDifficulty.easy).slice(0, 7))
    selected.push(...this.shuffleArray(byDifficulty.medium).slice(0, 8))
    selected.push(...this.shuffleArray(byDifficulty.hard).slice(0, 5))

    return selected
  }

  private static convertLessonQuestionToExamQuestion(
    q: Question,
    lesson: Lesson,
    skillRef: string,
    idx: number
  ): ExamQuestion {
    const diffMap = { 1: 'easy', 2: 'medium', 3: 'hard' } as const

    let options: string[] | undefined = undefined
    let correctAnswer: string = ''

    if (q.type === 'mc') {
      options = q.options
      correctAnswer = q.options[q.answer] || q.options[0]
    } else if (q.type === 'tf') {
      options = ['Verdadeiro', 'Falso']
      correctAnswer = q.answer ? 'Verdadeiro' : 'Falso'
    } else if (q.type === 'fill') {
      options = q.answers
      correctAnswer = q.answers[0] || ''
    } else if (q.type === 'match') {
      correctAnswer = q.pairs.map(p => `${p[0]} → ${p[1]}`).join(' · ')
    } else if (q.type === 'order') {
      correctAnswer = q.items.join(' → ')
    } else if (q.type === 'open') {
      correctAnswer = q.modelAnswer
    }

    return {
      id: `${lesson.id}_q${idx}_${Date.now()}`,
      type: this.mapQuestionType(q.type),
      difficulty: diffMap[q.difficulty],
      content: q.prompt,
      subject: lesson.subject || 'Não especificado',
      gradeLevel: lesson.grade || 'Fundamental',
      skillReference: skillRef,
      options,
      correctAnswer,
      explanation: q.explanation
    }
  }

  private static mapQuestionType(type: Question['type']): ExamQuestion['type'] {
    const map: Record<Question['type'], ExamQuestion['type']> = {
      'mc': 'multiple-choice',
      'tf': 'true-false',
      'fill': 'complete',
      'match': 'association',
      'open': 'open',
      'order': 'interpretation'
    }
    return map[type]
  }

  private static generateFallbackQuestions(form: ExamPrepForm): ExamQuestion[] {
    // Se não houver conteúdo na Base Oficial
    const q: ExamQuestion = {
      id: `fallback_${Date.now()}`,
      type: 'open',
      difficulty: 'medium',
      content: `Questão sobre ${form.contents.join(', ')} em ${form.subject}`,
      subject: form.subject,
      gradeLevel: form.gradeLevel,
      skillReference: form.contents[0] || 'não especificado',
      correctAnswer: 'Resposta não disponível. Consulte o material didático.',
      explanation: 'Este conteúdo precisa ser adicionado à Base Oficial. Favor contactar administração.'
    }
    return [q]
  }

  private static shuffleArray<T>(arr: T[]): T[] {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  private static findLessonByContent(content: string, subject: string, gradeLevel: string): Lesson | undefined {
    const contentLower = content.toLowerCase()
    const normalize = (str: string) => str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    const normalizedSubject = normalize(subject)
    const normalizedContent = normalize(content)

    const found = BASE_LESSONS.find(lesson => {
      const titleMatch = lesson.title.toLowerCase().includes(contentLower)
      const summaryMatch = lesson.summary?.toLowerCase().includes(contentLower)
      const aliasMatch = (lesson as any).aliases?.some((alias: string) =>
        alias.toLowerCase().includes(contentLower) ||
        normalize(alias).includes(normalizedContent)
      )
      const lessonSubjectNorm = normalize(lesson.subject || '')
      const subjectMatch = lessonSubjectNorm.includes(normalizedSubject)

      const contentMatched = titleMatch || summaryMatch || aliasMatch
      return contentMatched && subjectMatch
    })

    return found
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
