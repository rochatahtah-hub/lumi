// Assets oficiais do mascote LUMI — ÚNICO lugar onde as imagens são referenciadas.
// Para trocar uma pose, substitua o arquivo .webp com o mesmo nome (ou gere com scripts/mascot-*.cjs).
import peekGrip from './lumi-peek-grip.webp'
import peekHead from './lumi-peek-head.webp'
import peekLook from './lumi-peek-look.webp'
import peekWave from './lumi-peek-wave.webp'
import peekKiss from './lumi-peek-kiss.webp'
import peekSmile from './lumi-peek-smile.webp'
import easy from './lumi-easy.webp'
import medium from './lumi-medium.webp'
import hard from './lumi-hard.webp'

export type MascotReaction = 'easy' | 'medium' | 'hard'
/** poses da Home: cada imagem termina na linha em que o card começa (o resto do corpo fica atrás dele) */
export type PeekPose = 'grip' | 'head' | 'look' | 'wave' | 'kiss' | 'smile'

export const MASCOT = {
  peek: { grip: peekGrip, head: peekHead, look: peekLook, wave: peekWave, kiss: peekKiss, smile: peekSmile } satisfies Record<PeekPose, string>,
  reactions: { easy, medium, hard } satisfies Record<MascotReaction, string>,
}

/** a dificuldade vem do cadastro do exercício: 1 = fácil · 2 = média · 3 = difícil */
export const reactionFor = (difficulty: 1 | 2 | 3): MascotReaction => (difficulty === 3 ? 'hard' : difficulty === 2 ? 'medium' : 'easy')
