// Assets oficiais do mascote LUMI — ÚNICO lugar onde as imagens são referenciadas.
// Para trocar uma pose, substitua o arquivo .webp com o mesmo nome (ou gere com scripts/mascot-assets.cjs).
import walkSprite from './lumi-walk-sprite.webp'
import easy from './lumi-easy.webp'
import medium from './lumi-medium.webp'
import hard from './lumi-hard.webp'

export type MascotReaction = 'easy' | 'medium' | 'hard'

export const MASCOT = {
  home: { sprite: walkSprite }, // 7 quadros 250×416: 4 de passada + 3 de tchau
  reactions: { easy, medium, hard } satisfies Record<MascotReaction, string>,
}

/** a dificuldade vem do cadastro do exercício: 1 = fácil · 2 = média · 3 = difícil */
export const reactionFor = (difficulty: 1 | 2 | 3): MascotReaction => (difficulty === 3 ? 'hard' : difficulty === 2 ? 'medium' : 'easy')
