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
import { UPGRADES, applyUpgrade } from './lessons/acervo-upgrades'
import { angulos, areaPerimetro, estatistica, expressoesAlgebricas, mmcMdc, numerosDecimais, numerosInteiros, potenciacao, probabilidade, razaoProporcao, regraDeTres, sistemasEquacoes } from './lessons/mat-fund2'
import { acentuacao, classesGramaticais, concordancia, crase, ortografiaDuvidas, pontuacao, pronomes } from './lessons/por-gramatica'
import { coesaoCoerencia, figurasLinguagem, funcoesLinguagem, interpretacaoTexto, periodoComposto, semantica, variacaoLinguistica } from './lessons/por-texto'
import { combinatoria, funcao2grau, geometriaEspacial, juros, logaritmo, progressoes, trigonometria } from './lessons/mat-medio'
import { comparatives, future, pastContinuous, presentContinuous, simplePast } from './lessons/ingles-a2'
import { collocations, conditionals, falseFriends, phrasalVerbs, presentPerfect } from './lessons/ingles-b1'
import { advancedConditionals, idioms, passive, readingBetweenLines, reportedSpeech } from './lessons/ingles-b2c1'

/** Base de conhecimento embutida: funciona offline e sem backend. É também o conteúdo do seed do banco. */
export const BASE_LESSONS: Lesson[] = [
  sistemaDecimal, adicaoSubtracao, multiplicacao, divisao, formasGeometricas, medidas, sistemaMonetario,
  // Matemática · Fundamental II
  numerosInteiros, potenciacao, mmcMdc, fracoes, numerosDecimais, razaoProporcao, regraDeTres, porcentagem,
  angulos, areaPerimetro, expressoesAlgebricas, equacao1grau, sistemasEquacoes, estatistica, probabilidade, pitagoras,
  // Matemática · Ensino Médio
  equacao2grau, funcao1grau, funcao2grau, progressoes, trigonometria, logaritmo, combinatoria, geometriaEspacial, juros,
  // Português
  acentuacao, ortografiaDuvidas, substantivoAdjetivo, classesGramaticais, verbos, pronomes, sujeitoPredicado, pontuacao, concordancia, crase, periodoComposto,
  semantica, figurasLinguagem, tiposTextuais, interpretacaoTexto, coesaoCoerencia, variacaoLinguistica, funcoesLinguagem,
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
].map((l) => applyUpgrade({ ...LESSON_META[l.id], ...l, ...ENGLISH_EXTRA[l.id], ...(GAME_EXTRA[l.id] ? { games: { ...l.games, ...GAME_EXTRA[l.id] } } : {}) }, UPGRADES[l.id]))
  .map((l) => ({ ...l, origin: 'base' as const, status: 'published' as const }))
