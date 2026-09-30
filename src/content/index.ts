import type { Lesson } from '../types'
import { LESSON_META } from './meta'
import { equacao2grau, fracoes, porcentagem } from './lessons/matematica'
import { equacao1grau, funcao1grau, pitagoras } from './lessons/matematica2'
import { adicaoSubtracao, divisao, formasGeometricas, medidas, multiplicacao, sistemaDecimal, sistemaMonetario } from './lessons/mat-fund1'
import { celula, fotossintese, sistemaSolar } from './lessons/ciencias'
import { cadeiasAlimentares, cicloAgua, sistemaDigestorio } from './lessons/ciencias2'
import { coordenadas, revolucaoFrancesa } from './lessons/humanas'
import { biomas, brasilColonia, independenciaBrasil, regioesBrasil, segundaGuerra } from './lessons/humanas2'
import { substantivoAdjetivo, verbToBe } from './lessons/linguagens'
import { cores, simplePresent, sujeitoPredicado, tiposTextuais, verbos } from './lessons/linguagens2'
import { atomoTabela, leisDeNewton } from './lessons/natureza-medio'
import { genetica, ligacoesQuimicas, velocidadeMedia } from './lessons/natureza2'
import { filosofiaGrega, modernismo, sociologiaClassicos } from './lessons/humanidades'
import { alphabetNumbers, canDirections, countries, family, greetings, thereIs, thisThat, timeDays } from './lessons/ingles-a1'
import { ENGLISH_EXTRA } from './lessons/ingles-legado'
import { GAME_EXTRA } from './lessons/jogos-extra'
import { comparatives, future, pastContinuous, presentContinuous, simplePast } from './lessons/ingles-a2'
import { collocations, conditionals, falseFriends, phrasalVerbs, presentPerfect } from './lessons/ingles-b1'
import { advancedConditionals, idioms, passive, readingBetweenLines, reportedSpeech } from './lessons/ingles-b2c1'

/** Base de conhecimento embutida: funciona offline e sem backend. É também o conteúdo do seed do banco. */
export const BASE_LESSONS: Lesson[] = [
  sistemaDecimal, adicaoSubtracao, multiplicacao, divisao, formasGeometricas, medidas, sistemaMonetario,
  fracoes, porcentagem, equacao1grau, equacao2grau, pitagoras, funcao1grau,
  substantivoAdjetivo, verbos, sujeitoPredicado, tiposTextuais,
  fotossintese, sistemaSolar, cicloAgua, sistemaDigestorio,
  revolucaoFrancesa, brasilColonia, independenciaBrasil, segundaGuerra,
  coordenadas, biomas, regioesBrasil,
  verbToBe, simplePresent,
  // Curso de Inglês — A1
  greetings, alphabetNumbers, countries, family, thisThat, timeDays, thereIs, canDirections,
  // A2
  presentContinuous, simplePast, pastContinuous, future, comparatives,
  // B1
  presentPerfect, conditionals, phrasalVerbs, falseFriends, collocations,
  // B2 e C1
  passive, reportedSpeech, idioms, advancedConditionals, readingBetweenLines,
  leisDeNewton, velocidadeMedia,
  atomoTabela, ligacoesQuimicas,
  celula, cadeiasAlimentares, genetica,
  modernismo, filosofiaGrega, sociologiaClassicos,
  cores,
].map((l) => ({ ...LESSON_META[l.id], ...l, ...ENGLISH_EXTRA[l.id], ...(GAME_EXTRA[l.id] ? { games: { ...l.games, ...GAME_EXTRA[l.id] } } : {}), origin: 'base' as const, status: 'published' as const }))
