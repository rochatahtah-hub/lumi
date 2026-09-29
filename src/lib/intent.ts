import type { ReexplainMode } from '../types'
import { normalize } from './text'

/**
 * Pedidos de reformulação dentro da pergunta ("não entendi velocidade média", "me dá um exemplo").
 * Devolve a reformulação pedida e o restante da frase (o assunto, se houver).
 */
const PATTERNS: [RegExp, ReexplainMode][] = [
  [/\b(passo a passo|passo-a-passo|etapa por etapa|como (eu )?faco (essa|a) conta|como resolvo|como faco na prova|na prova)\b/, 'passos'],
  [/\b(me (da|de|mostra|mostre) (um |uns )?exemplos?|com exemplos?|um exemplo|exemplo pratico|exemplos?)\b/, 'exemplo'],
  [/\b(de outro jeito|de outra forma|de outra maneira|explica de novo|explique de novo|outra explicacao)\b/, 'exemplo'],
  [/\b(nao entendi|nao consegui entender|nao to entendendo|nao estou entendendo|nao sei (fazer|nada)|pode simplificar|simplifica|mais facil|mais simples|jeito facil|bem facil|como se eu fosse (iniciante|crianca)|para leigo|pra leigo|explica facil|to perdid[oa]|estou perdid[oa])\b/, 'simples'],
]

export function detectIntent(query: string): { mode?: ReexplainMode; rest: string } {
  let q = normalize(query)
  let mode: ReexplainMode | undefined
  for (const [re, m] of PATTERNS) {
    if (re.test(q)) {
      mode ??= m
      q = q.replace(re, ' ')
    }
  }
  const rest = q.replace(/\b(me|explica|explique|explicar|pode|poderia|por favor|pfv|sobre|de|do|da|o|a|isso|essa|esse|materia|conteudo|assunto)\b/g, ' ').replace(/[?!.,;:]+/g, ' ').replace(/\s+/g, ' ').trim()
  return { mode, rest }
}
