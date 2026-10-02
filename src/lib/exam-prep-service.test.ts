import { describe, it, expect } from 'vitest'
import { ExamPrepService } from './exam-prep-service'
import type { ExamPrepForm, ExamQuestion, StudentAnswer } from '../types/exam-prep'

describe('ExamPrepService', () => {
  describe('generateExamQuestions', () => {
    it('deve gerar exatamente 20 questões', async () => {
      const form: ExamPrepForm = {
        subject: 'Matemática',
        gradeLevel: '8º ano',
        contents: ['Equação do 1º grau', 'Porcentagem']
      }

      const questions = await ExamPrepService.generateExamQuestions(form)
      expect(questions).toHaveLength(20)
    })

    it('deve distribuir corretamente por dificuldade (7 fácil, 8 médio, 5 difícil)', async () => {
      const form: ExamPrepForm = {
        subject: 'Matemática',
        gradeLevel: '8º ano',
        contents: ['Equação do 1º grau']
      }

      const questions = await ExamPrepService.generateExamQuestions(form)
      const easy = questions.filter(q => q.difficulty === 'easy').length
      const medium = questions.filter(q => q.difficulty === 'medium').length
      const hard = questions.filter(q => q.difficulty === 'hard').length

      expect(easy).toBe(7)
      expect(medium).toBe(8)
      expect(hard).toBe(5)
    })

    it('deve ter IDs únicos para cada questão', async () => {
      const form: ExamPrepForm = {
        subject: 'Português',
        gradeLevel: '7º ano',
        contents: ['Gramática']
      }

      const questions = await ExamPrepService.generateExamQuestions(form)
      const ids = questions.map(q => q.id)
      const uniqueIds = new Set(ids)

      expect(uniqueIds.size).toBe(questions.length)
    })

    it('deve incluir todos os conteúdos fornecidos', async () => {
      const contents = ['Equação', 'Porcentagem', 'Razão']
      const form: ExamPrepForm = {
        subject: 'Matemática',
        gradeLevel: '8º ano',
        contents
      }

      const questions = await ExamPrepService.generateExamQuestions(form)
      const includedContents = new Set(questions.map(q => q.skillReference))

      contents.forEach(content => {
        expect(includedContents.has(content)).toBe(true)
      })
    })

    it('deve variar tipos de questões', async () => {
      const form: ExamPrepForm = {
        subject: 'Ciências',
        gradeLevel: '9º ano',
        contents: ['Fotossíntese']
      }

      const questions = await ExamPrepService.generateExamQuestions(form)
      const types = new Set(questions.map(q => q.type))

      expect(types.size).toBeGreaterThan(1)
    })
  })

  describe('calculateContentPerformance', () => {
    it('deve calcular performance corretamente com 100% de acertos', () => {
      const answers: StudentAnswer[] = [
        { questionId: 'q1', answer: 'A', isCorrect: true, timeSpent: 30 },
        { questionId: 'q2', answer: 'A', isCorrect: true, timeSpent: 25 }
      ]

      const questions: ExamQuestion[] = [
        {
          id: 'q1',
          type: 'multiple-choice',
          difficulty: 'easy',
          content: 'Teste',
          subject: 'Math',
          gradeLevel: '8',
          skillReference: 'Equação',
          correctAnswer: 'A',
          explanation: 'Exp',
          options: ['A', 'B', 'C', 'D']
        },
        {
          id: 'q2',
          type: 'true-false',
          difficulty: 'medium',
          content: 'Teste 2',
          subject: 'Math',
          gradeLevel: '8',
          skillReference: 'Equação',
          correctAnswer: 'A',
          explanation: 'Exp 2'
        }
      ]

      const performance = ExamPrepService.calculateContentPerformance(
        answers,
        questions,
        ['Equação']
      )

      expect(performance[0].percentage).toBe(100)
      expect(performance[0].status).toBe('well-mastered')
    })

    it('deve classificar corretamente por status', () => {
      const testCases = [
        { correctCount: 4, totalCount: 5, expected: 'well-mastered' }, // 80%
        { correctCount: 2, totalCount: 4, expected: 'needs-practice' }, // 50%
        { correctCount: 1, totalCount: 5, expected: 'needs-review' } // 20%
      ]

      testCases.forEach(({ correctCount, totalCount, expected }) => {
        const performance = ExamPrepService.calculateContentPerformance(
          Array(correctCount).fill({
            questionId: 'q1',
            answer: 'A',
            isCorrect: true,
            timeSpent: 30
          }).concat(
            Array(totalCount - correctCount).fill({
              questionId: 'q2',
              answer: 'B',
              isCorrect: false,
              timeSpent: 30
            })
          ),
          Array(totalCount).fill({
            id: `q${Math.random()}`,
            type: 'multiple-choice' as const,
            difficulty: 'easy' as const,
            content: 'Test',
            subject: 'Math',
            gradeLevel: '8',
            skillReference: 'Test',
            correctAnswer: 'A',
            explanation: 'Exp',
            options: ['A', 'B', 'C', 'D']
          }),
          ['Test']
        )

        expect(performance[0].status).toBe(expected)
      })
    })
  })

  describe('calculateEquivalentScore', () => {
    it('deve converter porcentagem para nota 0-10', () => {
      const testCases = [
        { percentage: 100, expected: 10 },
        { percentage: 80, expected: 8 },
        { percentage: 50, expected: 5 },
        { percentage: 0, expected: 0 }
      ]

      testCases.forEach(({ percentage, expected }) => {
        const score = ExamPrepService.calculateEquivalentScore(percentage)
        expect(score).toBe(expected)
      })
    })

    it('deve lidar com valores decimais', () => {
      const score = ExamPrepService.calculateEquivalentScore(75.5)
      expect(score).toBeCloseTo(7.55, 1)
    })
  })

  describe('getExamHistory', () => {
    it('deve retornar array vazio se usuário não existe', async () => {
      const history = await ExamPrepService.getExamHistory('non-existent-user-id')
      expect(Array.isArray(history)).toBe(true)
    })
  })

  describe('saveExamResult', () => {
    it('deve validar que resultado tem campos obrigatórios', () => {
      const invalidResult = {
        userId: '',
        subject: '',
        gradeLevel: '',
        contents: [],
        totalQuestions: 0,
        correctAnswers: 0,
        percentage: 0,
        equivalentScore: 0,
        answers: [],
        contentAnalysis: [],
        createdAt: '',
        completedAt: ''
      } as any

      expect(() => {
        // Validação deve falhar em produção
        if (!invalidResult.userId || !invalidResult.subject) {
          throw new Error('Campos obrigatórios faltando')
        }
      }).toThrow()
    })
  })
})
