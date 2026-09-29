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

/** Base de conhecimento embutida: funciona offline e sem backend. É também o conteúdo do seed do banco. */
export const BASE_LESSONS: Lesson[] = [
  sistemaDecimal, adicaoSubtracao, multiplicacao, divisao, formasGeometricas, medidas, sistemaMonetario,
  fracoes, porcentagem, equacao1grau, equacao2grau, pitagoras, funcao1grau,
  substantivoAdjetivo, verbos, sujeitoPredicado, tiposTextuais,
  fotossintese, sistemaSolar, cicloAgua, sistemaDigestorio,
  revolucaoFrancesa, brasilColonia, independenciaBrasil, segundaGuerra,
  coordenadas, biomas, regioesBrasil,
  verbToBe, simplePresent,
  leisDeNewton, velocidadeMedia,
  atomoTabela, ligacoesQuimicas,
  celula, cadeiasAlimentares, genetica,
  modernismo, filosofiaGrega, sociologiaClassicos,
  cores,
].map((l) => ({ ...LESSON_META[l.id], ...l, origin: 'base' as const, status: 'published' as const }))
