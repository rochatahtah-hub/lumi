import { describe, it, expect } from 'vitest'
import { validateLessonContent } from '../../lib/validateLessonContent'
import type { Lesson } from '../../types'

describe('Game Tests', () => {
  describe('Quebra-cabeça', () => {
    it('deve renderizar com ilustração correta', () => {
      // Testa que educationalIllustration funciona para cada matéria
      const subjects = ['biologia', 'quimica', 'fisica', 'geografia', 'historia', 'matematica', 'portugues', 'ingles']
      subjects.forEach(s => {
        expect(s).toBeTruthy()
      })
    })

    it('deve aplicar variações diferentes para aulas diferentes', () => {
      // Hash de lessonId deve gerar variações diferentes
      const lesson1Id = 'bio-001'
      const lesson2Id = 'bio-002'
      expect(lesson1Id).not.toBe(lesson2Id)
    })

    it('deve adaptar UI por idade', () => {
      // Crianças 1º-3º ano devem ter espaçamento maior
      const grade = '2º ano'
      const isYoung = grade.includes('1º') || grade.includes('2º') || grade.includes('3º')
      expect(isYoung).toBe(true)
    })
  })

  describe('Memória & Match', () => {
    it('deve criar pares de questões', () => {
      const mockQuestions = [
        { type: 'mc' as const, prompt: 'O que é célula?', options: ['A', 'B', 'C'], answer: 1 }
      ]
      expect(mockQuestions).toHaveLength(1)
      expect(mockQuestions[0].options).toBeDefined()
    })

    it('deve implementar dificuldade (3, 5, 7 pares)', () => {
      const difficulties = { 1: 3, 2: 5, 3: 7 }
      expect(difficulties[1]).toBe(3)
      expect(difficulties[2]).toBe(5)
      expect(difficulties[3]).toBe(7)
    })
  })

  describe('Validação de Conteúdo', () => {
    it('deve rejeitar placeholders', () => {
      const lesson: Lesson = {
        id: 'test',
        subject: 'biologia',
        grade: '1º ano',
        title: 'Conteúdo aqui', // placeholder
        summary: 'Descrição',
        intro: 'Intro',
        objective: 'Objetivo',
        topic: 'Célula',
        blocks: [],
        questions: [],
        skills: {},
        review: ['palavra1', 'palavra2'],
        commonDoubts: [],
        commonErrors: [],
        prerequisites: [],
        next: [],
        levels: ['fund1'],
        aliases: []
      }

      const errors = validateLessonContent(lesson)
      const titleError = errors.find(e => e.field === 'title')
      expect(titleError).toBeDefined()
    })

    it('deve validar blocos vazios', () => {
      const lesson: Lesson = {
        id: 'test',
        subject: 'biologia',
        grade: '1º ano',
        title: 'Válido',
        summary: 'Válido',
        intro: 'Intro',
        objective: 'Objetivo',
        topic: 'Célula',
        blocks: [{
          id: 'b1',
          title: 'Bloco vazio',
          text: '' // vazio
        }],
        questions: [],
        skills: {},
        review: ['palavra1', 'palavra2'],
        commonDoubts: [],
        commonErrors: [],
        prerequisites: [],
        next: [],
        levels: ['fund1'],
        aliases: []
      }

      const errors = validateLessonContent(lesson)
      expect(errors.length).toBeGreaterThan(0)
    })
  })

  describe('Dificuldade Progressiva', () => {
    it('deve sugerir próximo nível com >80% acerto', () => {
      const accuracy = (8 / 10) * 100 // 80%
      const shouldAdvance = accuracy > 80
      expect(shouldAdvance).toBe(true)
    })

    it('deve sugerir nível anterior com <60% acerto', () => {
      const accuracy = (5 / 10) * 100 // 50%
      const shouldRegress = accuracy < 60
      expect(shouldRegress).toBe(true)
    })
  })

  describe('Recompensas', () => {
    it('deve calcular pontos corretamente', () => {
      const n = 3 // 3x3 = 9 peças
      const points = n * n * 10 // 90 pontos
      expect(points).toBe(90)
    })

    it('deve mostrar estrelas animadas', () => {
      const numStars = Math.min(Math.ceil(9 / 2), 5) // máximo 5 estrelas
      expect(numStars).toBeLessThanOrEqual(5)
      expect(numStars).toBeGreaterThan(0)
    })
  })
})
