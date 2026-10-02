// Teste de nivelamento do LUMI (perguntas originais). Resultado = estimativa, nunca certificação.
import type { CefrLevel, MCItem } from '../../types'

export interface PlacementItem extends MCItem { level: CefrLevel }

export const PLACEMENT: PlacementItem[] = [
  // A1
  { level: 'A1', difficulty: 1, prompt: 'Choose the correct sentence.', options: ['She are my sister.', 'She is my sister.', 'She am my sister.', 'She be my sister.'], answer: 1, explanation: 'Com she, o verbo to be é "is".' },
  { level: 'A1', difficulty: 1, prompt: '— Where are you from? — ______', options: ['I\'m fine, thanks.', 'I\'m from Brazil.', 'I\'m 12.', 'I\'m a student.'], answer: 1, explanation: '"Where are you from?" pergunta a origem: "I\'m from Brazil."' },
  { level: 'A1', difficulty: 1, prompt: 'There ______ two books on the table.', options: ['is', 'are', 'be', 'has'], answer: 1, explanation: 'Com plural (two books), usamos "there are".' },
  { level: 'A1', difficulty: 1, prompt: 'My brother ______ soccer every Saturday.', options: ['play', 'plays', 'playing', 'is play'], answer: 1, explanation: 'Rotina com he/she/it no simple present: plays.' },
  // A2
  { level: 'A2', difficulty: 2, prompt: 'Yesterday we ______ to the beach.', options: ['go', 'goes', 'went', 'gone'], answer: 2, explanation: '"Yesterday" pede o simple past: went (passado irregular de go).' },
  { level: 'A2', difficulty: 2, prompt: 'Look! The baby ______.', options: ['sleeps', 'is sleeping', 'slept', 'sleep'], answer: 1, explanation: '"Look!" indica algo acontecendo agora: present continuous.' },
  { level: 'A2', difficulty: 2, prompt: 'This test is ______ than the last one.', options: ['more easy', 'easyer', 'easier', 'most easy'], answer: 2, explanation: 'Adjetivo curto terminado em -y: easy → easier.' },
  { level: 'A2', difficulty: 2, prompt: 'I\'ve bought the tickets. We ______ visit the museum tomorrow.', options: ['are going to', 'going', 'goes to', 'will to'], answer: 0, explanation: 'Plano já decidido (os ingressos estão comprados): going to.' },
  // B1
  { level: 'B1', difficulty: 2, prompt: 'I ______ in this city since 2019.', options: ['live', 'lived', 'have lived', 'am living'], answer: 2, explanation: '"Since 2019" + situação que continua até hoje: present perfect.' },
  { level: 'B1', difficulty: 3, prompt: 'If I ______ more free time, I would learn to play the guitar.', options: ['have', 'had', 'will have', 'would have'], answer: 1, explanation: 'Second conditional (situação imaginária): if + past, would + verbo.' },
  { level: 'B1', difficulty: 2, prompt: 'Choose the best meaning: "Don\'t give up! You\'re almost there."', options: ['Não desista', 'Não entregue', 'Não suba', 'Não devolva'], answer: 0, explanation: '"Give up" é um phrasal verb que significa desistir.' },
  { level: 'B1', difficulty: 3, prompt: '"Actually, I prefer tea." — "Actually" here means:', options: ['atualmente', 'na verdade', 'rapidamente', 'finalmente'], answer: 1, explanation: '"Actually" é falso cognato: significa "na verdade", não "atualmente".' },
  // B2
  { level: 'B2', difficulty: 3, prompt: 'The new bridge ______ next year.', options: ['will build', 'will be built', 'is building', 'builds'], answer: 1, explanation: 'Quem constrói não importa: voz passiva no futuro, will be built.' },
  { level: 'B2', difficulty: 3, prompt: 'She said, "I am tired." → She said that she ______ tired.', options: ['is', 'was', 'has been', 'be'], answer: 1, explanation: 'No reported speech, o presente recua para o passado: am → was.' },
  { level: 'B2', difficulty: 3, prompt: '"This exam was a piece of cake." The speaker thinks the exam was:', options: ['very easy', 'very long', 'delicious', 'unfair'], answer: 0, explanation: '"A piece of cake" é uma expressão idiomática para algo muito fácil.' },
  { level: 'B2', difficulty: 3, prompt: 'He ______ have left already — his car isn\'t here.', options: ['must', 'should', 'can\'t', 'would'], answer: 0, explanation: 'Dedução forte sobre o passado a partir de uma evidência: must have + particípio.' },
  // C1
  { level: 'C1', difficulty: 3, prompt: 'If she had taken the job, she ______ in London now.', options: ['would live', 'would be living', 'will live', 'had lived'], answer: 1, explanation: 'Mixed conditional: passado imaginário (had taken) com resultado no presente (would be living now).' },
  { level: 'C1', difficulty: 3, prompt: 'Choose the correct inversion: "______ had I arrived when the phone rang."', options: ['Hardly', 'Never', 'Only', 'Seldom'], answer: 0, explanation: '"Hardly had I… when…" = mal eu tinha… quando… (inversão com hardly).' },
  { level: 'C1', difficulty: 3, prompt: '"Oh, great. Another meeting that could have been an email." The tone is:', options: ['enthusiastic', 'ironic', 'neutral', 'grateful'], answer: 1, explanation: 'O "great" é dito com o sentido contrário: tom irônico.' },
  { level: 'C1', difficulty: 3, prompt: 'Which sentence is the most appropriate for an academic essay?', options: ['Lots of people think it\'s kinda bad.', 'It is widely argued that the policy has adverse effects.', 'Everybody knows this is terrible, right?', 'The policy is super bad, no doubt.'], answer: 1, explanation: 'Registro acadêmico: impessoal ("It is widely argued"), vocabulário preciso ("adverse effects") e sem gírias.' },
]
