/**
 * Learning Integration — Hook que conecta o sistema de mastery com o Quiz
 * Registra tentativas e atualiza domínio conforme o aluno responde questões
 */

import { recordAttempt, recordError } from './learning-api'
import type { Question, Lesson } from '../types'

/**
 * Registrar uma resposta de questão e atualizar mastery
 * Chamado após cada resposta no Quiz
 *
 * @param userId ID do usuário autenticado
 * @param lesson Aula em que a questão está
 * @param question Questão respondida
 * @param isCorrect Se respondeu corretamente
 * @param timeSeconds Tempo gasto em segundos
 * @param userAnswer Resposta do usuário (para diagnóstico)
 * @param tries Número de tentativas para acertar
 * @param hintsUsed Quantidade de dicas usadas
 */
export async function registerQuestionAttempt(
  userId: string | undefined,
  lesson: Lesson,
  question: Question,
  isCorrect: boolean,
  timeSeconds?: number,
  userAnswer?: string,
  tries: number = 1,
  hintsUsed: number = 0
) {
  if (!userId) {
    console.warn('registerQuestionAttempt: sem userId, skipping learning tracking')
    return
  }

  try {
    // 1. Calcular dificuldade percebida
    // Quanto mais tentativas e dicas, mais difícil o aluno achou
    const difficultyRating = Math.min(5, Math.max(1, question.difficulty + (tries > 1 ? 1 : 0) + (hintsUsed > 0 ? 0.5 : 0)))

    // 2. Registrar tentativa e atualizar mastery
    const mastery = await recordAttempt(
      userId,
      lesson.id,
      lesson.subject,
      question.id,
      question.skill,
      isCorrect,
      timeSeconds,
      Math.round(difficultyRating)
    )

    // 3. Se errou, registrar como erro para diagnóstico
    if (!isCorrect && userAnswer) {
      const correctAnswer = getCorrectAnswer(question)
      const errorType = classifyError(question, userAnswer, correctAnswer, tries)

      await recordError(
        userId,
        lesson.id,
        question.id,
        question.skill,
        errorType,
        userAnswer,
        correctAnswer
      )
    }

    // 4. Retornar estado atualizado para feedback visual
    return {
      mastery,
      shouldShowEncouragement: isCorrect && question.difficulty >= 2,
      shouldPromptReview: mastery?.needs_review && mastery.state === 'review',
      shouldCongratulate: mastery?.state === 'mastered',
    }
  } catch (e) {
    console.error('Erro em registerQuestionAttempt:', e)
    return null
  }
}

/**
 * Hook React para usar no Quiz
 * Integra com learning-api automaticamente
 */
export function useLearningIntegration(userId: string | undefined) {
  return {
    registerAttempt: registerQuestionAttempt,
  }
}

/**
 * Extrair resposta correta de um question
 */
function getCorrectAnswer(question: Question): string {
  switch (question.type) {
    case 'mc':
      return question.options[question.answer]
    case 'tf':
      return question.answer ? 'Verdadeiro' : 'Falso'
    case 'fill':
      return question.answers[0] ?? ''
    case 'match':
      return question.pairs.map(([a, b]) => `${a} → ${b}`).join('; ')
    case 'order':
      return question.items.join(' → ')
    default:
      return ''
  }
}

/**
 * Classificar tipo de erro para diagnóstico
 * 'conceptual' = não entendeu o conceito
 * 'calculation' = erro de cálculo
 * 'reading' = leitura incorreta
 * 'careless' = erro trivial (digitação, atenção)
 * 'unknown' = não conseguimos classificar
 */
function classifyError(
  question: Question,
  userAnswer: string,
  correctAnswer: string,
  tries: number
): 'conceptual' | 'calculation' | 'reading' | 'careless' | 'unknown' {
  // Erro na primeira tentativa = careless (esquecimento/atenção)
  if (tries === 1 && question.difficulty === 1) return 'careless'

  // Múltiplas tentativas na mesma questão = conceitual
  if (tries > 2) return 'conceptual'

  // Resposta muito diferente = conceitual (não entendeu)
  const similarity = stringSimilarity(userAnswer, correctAnswer)
  if (similarity < 0.3) return 'conceptual'

  // Respostas parcialmente iguais = careless ou reading
  if (similarity < 0.7) return 'reading'

  // Números próximos = cálculo
  if (question.type === 'fill' || question.type === 'open') {
    const userNum = parseFloat(userAnswer)
    const correctNum = parseFloat(correctAnswer)
    if (!isNaN(userNum) && !isNaN(correctNum)) {
      const diff = Math.abs(userNum - correctNum)
      if (diff / correctNum < 0.1) return 'calculation'
    }
  }

  return 'unknown'
}

/**
 * Calcular similaridade entre duas strings (0.0-1.0)
 * Simples: usa Levenshtein distance
 */
function stringSimilarity(a: string, b: string): number {
  const s1 = a.toLowerCase().trim()
  const s2 = b.toLowerCase().trim()

  if (s1 === s2) return 1
  if (!s1 || !s2) return 0

  const longer = s1.length > s2.length ? s1 : s2
  const shorter = s1.length > s2.length ? s2 : s1

  const editDistance = getEditDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

/**
 * Levenshtein distance (distância de edição)
 */
function getEditDistance(s1: string, s2: string): number {
  const costs: number[] = []
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j
      } else if (j > 0) {
        let newValue = costs[j - 1]
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
        }
        costs[j - 1] = lastValue
        lastValue = newValue
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }
  return costs[s2.length]
}

export default {
  registerQuestionAttempt,
  useLearningIntegration,
}
