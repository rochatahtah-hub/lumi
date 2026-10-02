/**
 * Mascot Reactions — LUMI como companheiro de estudos
 * Reações visuais + mensagens motivadoras baseadas em desempenho
 */

export type ReactionType = 'easy' | 'medium' | 'hard' | 'correct' | 'incorrect' | 'excellent' | 'struggling' | 'encouraging'

export interface MascotReaction {
  emotion: ReactionType
  message: string
  animation: string // CSS animation class
  duration: number // milliseconds
}

/**
 * Reações pré-definidas do mascote
 * Baseadas em desempenho e contexto
 */
const reactions: Record<ReactionType, MascotReaction> = {
  // Questão fácil respondida
  easy: {
    emotion: 'easy',
    message: '😊 Isso é fácil para você!',
    animation: 'animate-bounce',
    duration: 2000,
  },

  // Questão média
  medium: {
    emotion: 'medium',
    message: '🤔 Uma boa pergunta!',
    animation: 'animate-pulse',
    duration: 2500,
  },

  // Questão difícil
  hard: {
    emotion: 'hard',
    message: '💪 Isso é desafiador! Vamos lá.',
    animation: 'animate-bounce',
    duration: 3000,
  },

  // Resposta correta
  correct: {
    emotion: 'correct',
    message: '✨ Muito bem! Você acertou! ⭐',
    animation: 'animate-bounce-celebrate',
    duration: 2500,
  },

  // Resposta incorreta (primeira)
  incorrect: {
    emotion: 'incorrect',
    message: '😅 Quase! Tenta de novo.',
    animation: 'animate-shake',
    duration: 2000,
  },

  // Resposta excelente (questão difícil acertada)
  excellent: {
    emotion: 'excellent',
    message: '🎉 Uau! Essa era difícil! Parabéns! 🏆',
    animation: 'animate-bounce-celebrate',
    duration: 3000,
  },

  // Múltiplos erros na mesma questão
  struggling: {
    emotion: 'struggling',
    message: '🤝 Isso é normal. Vamos revisar esse conceito?',
    animation: 'animate-pulse',
    duration: 3500,
  },

  // Encorajamento geral
  encouraging: {
    emotion: 'encouraging',
    message: '🌟 Você está indo bem! Continue! 💪',
    animation: 'animate-bounce',
    duration: 2500,
  },
}

/**
 * Selecionar reação apropriada baseado em contexto
 */
export function getMascotReaction(context: {
  isCorrect: boolean
  difficulty: 1 | 2 | 3
  tries: number
  hintsUsed: number
  masteryPercent?: number
  consecutiveErrors?: number
}): MascotReaction {
  // Resposta correta
  if (context.isCorrect) {
    // Questão difícil acertada na primeira → excelente
    if (context.difficulty >= 2 && context.tries === 1) {
      return reactions.excellent
    }
    // Questão fácil acertada
    if (context.difficulty === 1) {
      return reactions.easy
    }
    // Questão média acertada
    return reactions.correct
  }

  // Resposta incorreta
  if (!context.isCorrect) {
    // Múltiplos erros → encorajamento
    if (context.consecutiveErrors && context.consecutiveErrors >= 2) {
      return reactions.struggling
    }
    // Primeira tentativa errada
    return reactions.incorrect
  }

  return reactions.encouraging
}

/**
 * Mensagens de motivação por situação
 */
export const motivationalMessages = {
  start: [
    '👋 Vamos descobrir isso juntos?',
    '🚀 Bora começar!',
    '📚 Pronto para aprender?',
  ],
  midway: [
    '⚡ Você está na metade!',
    '🔥 Ritmo forte!',
    '💪 Continue assim!',
  ],
  complete: [
    '🎉 Aula concluída! Que tal revisar rápido?',
    '✅ Excelente trabalho!',
    '🏁 Você conseguiu!',
  ],
  review: [
    '🧠 Vamos revisar isso?',
    '🔄 Que tal reforçar esse conteúdo?',
    '📖 Revisão é importante!',
  ],
  struggle: [
    '💭 Esse conteúdo merece mais atenção.',
    '🤔 Vamos tentar de outro jeito?',
    '🌱 Aprender leva tempo. Você está no caminho certo!',
  ],
}

/**
 * Reação contextual para início de aula
 */
export function getStartReaction(): MascotReaction {
  const msg = motivationalMessages.start[Math.floor(Math.random() * motivationalMessages.start.length)]
  return {
    emotion: 'encouraging',
    message: msg,
    animation: 'animate-bounce',
    duration: 3000,
  }
}

/**
 * Reação contextual para conclusão de aula
 */
export function getCompleteReaction(masteryPercent: number): MascotReaction {
  const msg = motivationalMessages.complete[Math.floor(Math.random() * motivationalMessages.complete.length)]
  const duration = masteryPercent >= 80 ? 3500 : 2500

  return {
    emotion: 'excellent',
    message: msg,
    animation: 'animate-bounce-celebrate',
    duration,
  }
}

/**
 * Reação para conteúdo dominado
 */
export function getMasteredReaction(): MascotReaction {
  return {
    emotion: 'excellent',
    message: '👑 Você dominou esse conteúdo! Fantástico!',
    animation: 'animate-bounce-celebrate',
    duration: 3500,
  }
}

/**
 * Reação para necessidade de revisão
 */
export function getReviewReaction(): MascotReaction {
  const msg = motivationalMessages.review[Math.floor(Math.random() * motivationalMessages.review.length)]
  return {
    emotion: 'encouraging',
    message: msg,
    animation: 'animate-pulse',
    duration: 3000,
  }
}

export default {
  getMascotReaction,
  getStartReaction,
  getCompleteReaction,
  getMasteredReaction,
  getReviewReaction,
}
