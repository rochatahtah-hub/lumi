/**
 * Exam Prep — "Tenho Prova" feature
 * Prepara aluno rapidamente para uma prova real
 */

import type { ContentMastery, LearningDiagnostic } from '../types/learning'
import type { Lesson } from '../types'

export interface ExamPrepPlan {
  subject: string
  content: string
  examDate: string
  hoursAvailable: number
  urgency: 'critical' | 'high' | 'medium' | 'low'
  generatedAt: string
  phases: ExamPrepPhase[]
  estimatedSuccessRate: number
}

export interface ExamPrepPhase {
  phase: number
  name: string
  description: string
  duration_minutes: number
  activities: ExamActivity[]
  priority: 'critical' | 'high' | 'medium' | 'low'
}

export interface ExamActivity {
  type: 'review' | 'practice' | 'simulate' | 'memorize' | 'rest'
  title: string
  description: string
  content?: string
  duration_minutes: number
  difficulty: 'easy' | 'medium' | 'hard'
}

/**
 * Gerar plano de preparação para prova
 * Algoritmo: prioriza habilidades fracas, testa com simulados, reforça no final
 */
export function generateExamPrepPlan(
  examDate: string,
  subject: string,
  content: string,
  masterData: {
    contentMastery: ContentMastery[]
    diagnostics: LearningDiagnostic[]
    lessons: Lesson[]
  }
): ExamPrepPlan {
  const now = new Date()
  const exam = new Date(examDate)
  const hoursUntilExam = (exam.getTime() - now.getTime()) / (1000 * 60 * 60)
  const minutesAvailable = Math.floor(hoursUntilExam * 60)

  // Determinar urgência
  let urgency: 'critical' | 'high' | 'medium' | 'low' = 'medium'
  if (hoursUntilExam < 2) urgency = 'critical'
  else if (hoursUntilExam < 6) urgency = 'high'
  else if (hoursUntilExam < 24) urgency = 'medium'
  else urgency = 'low'

  // Identificar conteúdos fracos
  const weakContent = masterData.contentMastery
    .filter((c) => c.mastery_percent < 70)
    .sort((a, b) => a.mastery_percent - b.mastery_percent)
    .slice(0, 5)

  // Identificar habilidades fracas
  const weakSkills = new Map<string, number>()
  for (const diag of masterData.diagnostics) {
    if (diag.skill_id) {
      weakSkills.set(diag.skill_id, (weakSkills.get(diag.skill_id) || 0) + 1)
    }
  }

  // Construir planos por urgência
  const phases: ExamPrepPhase[] = []

  if (urgency === 'critical') {
    // Apenas 2 horas: foco máximo em fraquezas
    phases.push({
      phase: 1,
      name: '⚡ Revisão Express',
      description: 'Foco nos conceitos mais fracos (5 minutos cada)',
      duration_minutes: 25,
      priority: 'critical',
      activities: [
        {
          type: 'review',
          title: `Revisar: ${weakContent[0]?.lesson_id || 'Conceitos principais'}`,
          description: 'Apenas os pontos-chave',
          duration_minutes: 5,
          difficulty: 'hard',
        },
        {
          type: 'review',
          title: `Revisar: ${weakContent[1]?.lesson_id || 'Segundo mais fraco'}`,
          description: 'Pontos-chave rapidinho',
          duration_minutes: 5,
          difficulty: 'hard',
        },
        {
          type: 'memorize',
          title: 'Memorizar fórmulas/conceitos-chave',
          description: 'As 3 coisas mais importantes',
          duration_minutes: 15,
          difficulty: 'medium',
        },
      ],
    })

    phases.push({
      phase: 2,
      name: '🎯 Simulado Rápido',
      description: 'Teste você em 10 questões focadas em fraquezas',
      duration_minutes: 20,
      priority: 'critical',
      activities: [
        {
          type: 'simulate',
          title: 'Simulado: 10 questões',
          description: 'Foco nas áreas fracas',
          duration_minutes: 15,
          difficulty: 'hard',
        },
        {
          type: 'review',
          title: 'Revisar erros do simulado',
          description: 'Entender por que errou',
          duration_minutes: 5,
          difficulty: 'hard',
        },
      ],
    })

    phases.push({
      phase: 3,
      name: '🧠 Última Hora',
      description: 'Descanso + respiração + confiança',
      duration_minutes: 15,
      priority: 'medium',
      activities: [
        {
          type: 'rest',
          title: 'Respirar e descansar',
          description: 'Você estudou. Agora confie em você.',
          duration_minutes: 10,
          difficulty: 'easy',
        },
        {
          type: 'memorize',
          title: 'Última revisão mental',
          description: 'Só pense nos conceitos principais',
          duration_minutes: 5,
          difficulty: 'easy',
        },
      ],
    })
  } else if (urgency === 'high') {
    // 6 horas: revisão + prática + simulado

    phases.push({
      phase: 1,
      name: '📚 Revisão Focada',
      description: 'Reler os conteúdos mais fracos',
      duration_minutes: 90,
      priority: 'critical',
      activities: weakContent.slice(0, 3).map((c, i) => ({
        type: 'review' as const,
        title: `Revisar: ${c.lesson_id}`,
        description: `Domínio atual: ${c.mastery_percent}%`,
        duration_minutes: 30,
        difficulty: 'hard' as const,
      })),
    })

    phases.push({
      phase: 2,
      name: '🎯 Prática Intensiva',
      description: 'Responder questões das áreas fracas',
      duration_minutes: 60,
      priority: 'high',
      activities: [
        {
          type: 'practice',
          title: 'Praticar questões difíceis',
          description: '20 questões de alto nível',
          duration_minutes: 60,
          difficulty: 'hard',
        },
      ],
    })

    phases.push({
      phase: 3,
      name: '🧪 Simulado',
      description: 'Teste realista de 30 questões',
      duration_minutes: 40,
      priority: 'high',
      activities: [
        {
          type: 'simulate',
          title: 'Simulado completo',
          description: 'Simule a prova real',
          duration_minutes: 35,
          difficulty: 'medium',
        },
        {
          type: 'review',
          title: 'Revisar e corrigir',
          description: 'Entender os erros',
          duration_minutes: 5,
          difficulty: 'hard',
        },
      ],
    })

    phases.push({
      phase: 4,
      name: '💤 Descanso',
      description: 'Dorme bem. O resto sai da cabeça.',
      duration_minutes: 30,
      priority: 'medium',
      activities: [
        {
          type: 'rest',
          title: 'Repouso e hidratação',
          description: 'Dorme pelo menos 6 horas',
          duration_minutes: 30,
          difficulty: 'easy',
        },
      ],
    })
  } else if (urgency === 'medium') {
    // 24 horas: revisão distribuída

    phases.push({
      phase: 1,
      name: '📖 Revisão Teórica',
      description: 'Reler todos os conteúdos importantes',
      duration_minutes: 120,
      priority: 'high',
      activities: [
        {
          type: 'review',
          title: `Revisar: ${subject} - Conceitos principais`,
          description: 'Resumo completo do material',
          duration_minutes: 120,
          difficulty: 'medium',
        },
      ],
    })

    phases.push({
      phase: 2,
      name: '✏️ Exercícios',
      description: 'Resolver questões de prova anterior',
      duration_minutes: 90,
      priority: 'high',
      activities: [
        {
          type: 'practice',
          title: 'Exercícios variados',
          description: '30 questões de diferentes dificuldades',
          duration_minutes: 90,
          difficulty: 'medium',
        },
      ],
    })

    phases.push({
      phase: 3,
      name: '🧪 Simulado Final',
      description: 'Teste realista completo',
      duration_minutes: 60,
      priority: 'high',
      activities: [
        {
          type: 'simulate',
          title: 'Simulado em condições reais',
          description: 'Simule a prova exatamente como será',
          duration_minutes: 50,
          difficulty: 'medium',
        },
        {
          type: 'review',
          title: 'Análise de desempenho',
          description: 'Veja onde errou',
          duration_minutes: 10,
          difficulty: 'hard',
        },
      ],
    })

    phases.push({
      phase: 4,
      name: '😴 Descanso',
      description: 'Dorme bem antes da prova',
      duration_minutes: 60,
      priority: 'high',
      activities: [
        {
          type: 'rest',
          title: 'Sono e nutrição',
          description: 'Mínimo 8 horas de sono',
          duration_minutes: 60,
          difficulty: 'easy',
        },
      ],
    })
  } else {
    // Low: preparação distribuída ao longo do tempo

    phases.push({
      phase: 1,
      name: '📚 Estudo Regular',
      description: 'Siga o cronograma normal',
      duration_minutes: 180,
      priority: 'medium',
      activities: [
        {
          type: 'review',
          title: `${subject} - Revisão completa`,
          description: 'Estude tudo com calma',
          duration_minutes: 180,
          difficulty: 'medium',
        },
      ],
    })

    phases.push({
      phase: 2,
      name: '🎯 Simulados Progressivos',
      description: 'Faça simulados a cada 2 dias',
      duration_minutes: 120,
      priority: 'medium',
      activities: [
        {
          type: 'simulate',
          title: 'Simulado 1 (Fácil)',
          description: 'Teste suas habilidades básicas',
          duration_minutes: 40,
          difficulty: 'easy',
        },
        {
          type: 'simulate',
          title: 'Simulado 2 (Médio)',
          description: 'Aumente a dificuldade',
          duration_minutes: 40,
          difficulty: 'medium',
        },
        {
          type: 'simulate',
          title: 'Simulado 3 (Difícil)',
          description: 'Teste seu máximo',
          duration_minutes: 40,
          difficulty: 'hard',
        },
      ],
    })
  }

  // Calcular taxa de sucesso estimada
  const avgMastery =
    masterData.contentMastery.reduce((a, b) => a + b.mastery_percent, 0) / masterData.contentMastery.length || 0
  const estimatedSuccessRate = Math.min(95, Math.round(avgMastery * 0.95 + 10)) // base + bonus pela preparação

  return {
    subject,
    content,
    examDate,
    hoursAvailable: hoursUntilExam,
    urgency,
    generatedAt: new Date().toISOString(),
    phases,
    estimatedSuccessRate,
  }
}

export default {
  generateExamPrepPlan,
}
