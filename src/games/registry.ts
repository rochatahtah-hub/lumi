// Catálogo dos jogos do LUMI. Para criar um jogo novo: registrar aqui, escrever o montador em content.ts
// e o componente em src/games/play/ — as telas (área de jogos, recomendações, progresso) já o reconhecem.
export type GameId = 'quebra' | 'caca' | 'memoria' | 'ligue' | 'ordem' | 'complete' | 'quiz' | 'mapa' | 'dialogo' | 'listening' | 'reading'

export interface GameType {
  id: GameId
  name: string
  emoji: string
  desc: string
  /** instrução curta em português e em inglês (English Mode) */
  howPt: string
  howEn: string
  /** jogo especial da trilha de Inglês */
  english?: boolean
}

export const GAMES: GameType[] = [
  { id: 'quebra', name: 'Quebra-cabeça', emoji: '🧩', desc: 'Monte a imagem e aprenda com os detalhes.', howPt: 'Toque numa peça e depois no lugar dela.', howEn: 'Tap a piece, then tap where it goes.' },
  { id: 'caca', name: 'Caça-palavras', emoji: '🔎', desc: 'Encontre as palavras relacionadas ao conteúdo.', howPt: 'Toque na primeira e na última letra da palavra.', howEn: 'Tap the first and the last letter of a word.' },
  { id: 'memoria', name: 'Jogo da Memória', emoji: '🧠', desc: 'Encontre os pares de palavras e significados.', howPt: 'Vire duas cartas e encontre os pares.', howEn: 'Flip two cards and find the matching pairs.' },
  { id: 'ligue', name: 'Ligue os Pares', emoji: '🔗', desc: 'Relacione cada item ao seu significado.', howPt: 'Toque num item da esquerda e depois no par dele.', howEn: 'Tap an item on the left, then its match.' },
  { id: 'ordem', name: 'Ordene a Sequência', emoji: '🔢', desc: 'Coloque frases ou acontecimentos na ordem correta.', howPt: 'Toque em dois itens para trocá-los de lugar.', howEn: 'Tap two items to swap them.' },
  { id: 'complete', name: 'Complete a Frase', emoji: '✏️', desc: 'Preencha o espaço com a palavra correta.', howPt: 'Escolha a opção que completa a frase.', howEn: 'Choose the option that completes the sentence.' },
  { id: 'quiz', name: 'Quiz Relâmpago', emoji: '🎯', desc: 'Responda perguntas rápidas e teste o que sabe.', howPt: 'Escolha a resposta e confirme.', howEn: 'Choose an answer and confirm.' },
  { id: 'mapa', name: 'Mapa Interativo', emoji: '🗺️', desc: 'Identifique países, estados e regiões no mapa.', howPt: 'Encontre no mapa o lugar pedido.', howEn: 'Find the place on the map.' },
  { id: 'dialogo', name: 'Complete o Diálogo', emoji: '💬', desc: 'Escolha a fala que completa a conversa.', howPt: 'Leia a conversa e escolha a fala que falta.', howEn: 'Read the conversation and choose the missing line.', english: true },
  { id: 'listening', name: 'Listening Challenge', emoji: '🎧', desc: 'Ouça e responda.', howPt: 'Ouça o áudio e responda.', howEn: 'Listen and answer.', english: true },
  { id: 'reading', name: 'Reading Challenge', emoji: '📖', desc: 'Leia um texto e responda.', howPt: 'Leia o texto e responda.', howEn: 'Read the text and answer.', english: true },
]

export const gameById = (id: string) => GAMES.find((g) => g.id === id)
export const DIFFICULTY_LABEL: Record<1 | 2 | 3, string> = { 1: 'Fácil', 2: 'Médio', 3: 'Difícil' }
