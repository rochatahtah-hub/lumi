import type { Lesson } from '../types'
import { LESSON_META } from './meta'
import { equacao2grau, fracoes, porcentagem } from './lessons/matematica'
import { equacao1grau, funcao1grau, pitagoras } from './lessons/matematica2'
import { adicaoSubtracao, divisao, formasGeometricas, medidas, multiplicacao, sistemaDecimal, sistemaMonetario } from './lessons/mat-fund1'
import { celula, fotossintese, sistemaSolar } from './lessons/ciencias'
import { cadeiasAlimentares, cicloAgua, sistemaDigestorio } from './lessons/ciencias2'
import { alimentacaoNutrientes, animaisClassificacao, estadosMateria, luaFases, misturasSeparacao, plantas, preservacaoAmbiente, seresVivos } from './lessons/cie-fund1'
import { circuitosEletricos, energiaFontes, estacoesAno, microrganismosVacinas, sistemaCirculatorio, sistemaNervoso, sistemaRespiratorio, terraCamadas } from './lessons/cie-fund2'
import { coordenadas, revolucaoFrancesa } from './lessons/humanas'
import { biomas as biomasOriginal, brasilColonia, independenciaBrasil, regioesBrasil, segundaGuerra } from './lessons/humanas2'
import { imperioRomano, biomas, termologia, reacoesQuimicas, citologia } from './lessons/novas-materias'
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
import { NOVAS_MATERIAS } from './lessons/materias-novas'
import { MATERIAS_EXPANDIDAS } from './lessons/materias-expandidas'
import { MATERIAS_PROFUNDAS } from './lessons/materias-profundas'
import { MATERIAS_FINAIS } from './lessons/materias-finais'
import { HISTORIA_LOTE4 } from './lessons/historia'
import { GEOGRAFIA_LOTE5 } from './lessons/geografia'
import { BIOLOGIA_LOTE6 } from './lessons/biologia'
import { FISICA_LOTE7 } from './lessons/fisica'
import { QUIMICA_LOTE8 } from './lessons/quimica'
import { FILOSOFIA_LOTE9, SOCIOLOGIA_LOTE10, REDACAO_LOTE12, ARTES_LOTE13, EDFISICA_LOTE14, LITERATURA_LOTE15 } from './lessons/outros-lotes'

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
  // Ciências
  estadosMateria, misturasSeparacao, cicloAgua, seresVivos, animaisClassificacao, plantas, fotossintese, microrganismosVacinas,
  alimentacaoNutrientes, sistemaDigestorio, sistemaRespiratorio, sistemaCirculatorio, sistemaNervoso,
  sistemaSolar, luaFases, estacoesAno, terraCamadas, preservacaoAmbiente, energiaFontes, circuitosEletricos,
  revolucaoFrancesa, imperioRomano, brasilColonia, independenciaBrasil, segundaGuerra,
  coordenadas, biomas, biomasOriginal, regioesBrasil,
  termologia, reacoesQuimicas, citologia,
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
  // Novas Matérias — Filosofia, Sociologia, Geografia, Artes, Educação Física
  ...NOVAS_MATERIAS,
  // Matérias Expandidas — Cobertura completa até 190 lições
  ...MATERIAS_EXPANDIDAS,
  // Matérias Profundas — Português e Matemática avançada
  ...MATERIAS_PROFUNDAS,
  // Matérias Finais — Ciências, História, Geografia (complemento até 190 lições)
  ...MATERIAS_FINAIS,
  // Lote 4 (NEW) — História completa Fund I-III Médio
  ...HISTORIA_LOTE4,
  // Lote 5 (NEW) — Geografia completa Fund I-III Médio
  ...GEOGRAFIA_LOTE5,
  // Lote 6 (NEW) — Biologia completa Fund I-III Médio
  ...BIOLOGIA_LOTE6,
  // Lote 7-15 (NEW) — Física, Química, Filosofia, Sociologia, Redação, Artes, Ed Física, Literatura
  ...FISICA_LOTE7,
  ...QUIMICA_LOTE8,
  ...FILOSOFIA_LOTE9,
  ...SOCIOLOGIA_LOTE10,
  ...REDACAO_LOTE12,
  ...ARTES_LOTE13,
  ...EDFISICA_LOTE14,
  ...LITERATURA_LOTE15,
].map((l) => applyUpgrade({ ...LESSON_META[l.id], ...l, ...ENGLISH_EXTRA[l.id], ...(GAME_EXTRA[l.id] ? { games: { ...l.games, ...GAME_EXTRA[l.id] } } : {}) }, UPGRADES[l.id]))
  .map((l) => ({ ...l, origin: 'base' as const, status: 'published' as const }))
