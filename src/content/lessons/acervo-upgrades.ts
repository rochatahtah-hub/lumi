// Atualização das aulas do formato antigo para o formato completo do acervo, SEM reescrever o que já estava bom:
// acrescenta objetivo, trilha (pré-requisito → próximo), reformulações que faltavam, perguntas equivalentes,
// dúvidas e erros comuns, fórmulas, fontes institucionais e material de jogo. O banco guarda a versão anterior.
import type { Block, Formula, HistoryInfo, Lesson, LessonGames, Source } from '../../types'
import { eqsPt, formula, SRC } from '../dsl'

export interface AcervoUpgrade {
  objective: string
  prerequisites?: string[]
  next?: string[]
  equivalentQuestions: string[]
  commonErrors?: string[]
  commonDoubts?: { q: string; a: string }[]
  formulas?: Formula[]
  /** reformulações que faltavam, por id de bloco (b1, b2…) */
  variants?: Record<string, NonNullable<Block['variants']>>
  /** fontes institucionais a acrescentar (as da aula continuam) */
  sources?: Source[]
  games?: LessonGames
  history?: HistoryInfo
  enem?: string
}

export function applyUpgrade(l: Lesson, u?: AcervoUpgrade): Lesson {
  if (!u) return l
  const titles = new Set((l.sources ?? []).map((s) => s.title))
  return {
    ...l,
    objective: u.objective,
    prerequisites: u.prerequisites ?? l.prerequisites,
    next: u.next ?? l.next,
    equivalentQuestions: u.equivalentQuestions,
    commonErrors: u.commonErrors ?? l.commonErrors,
    commonDoubts: u.commonDoubts ?? l.commonDoubts,
    formulas: u.formulas ?? l.formulas,
    enem: u.enem ?? l.enem,
    blocks: l.blocks.map((b) => ({ ...b, variants: { ...b.variants, ...u.variants?.[b.id] } })),
    sources: [...(u.sources ?? []).filter((s) => !titles.has(s.title)), ...(l.sources ?? [])],
    games: u.games ? { ...l.games, ...u.games } : l.games,
    history: u.history ?? l.history,
    reviewedAt: '2026-09-30',
  }
}

const MAT_EF = [SRC.bncc('Matemática — Anos Finais'), SRC.obmep()]
const MAT_EM = [SRC.bncc('Matemática e suas Tecnologias — Ensino Médio'), SRC.obmep()]

export const UPGRADES: Record<string, AcervoUpgrade> = {
  // ───────────── LOTE 1 · MATEMÁTICA ─────────────
  'mat-fracoes': {
    objective: 'Representar partes de um todo com frações, ler frações, reconhecer frações equivalentes e simplificá-las até a forma irredutível.',
    prerequisites: ['mat-mmc-mdc', 'mat-divisao'], next: ['mat-numeros-decimais', 'mat-razao-proporcao'],
    variants: {
      b1: { passos: '1. Veja em quantas partes IGUAIS o todo foi dividido: esse é o denominador (embaixo).\n2. Conte quantas partes foram pegas: esse é o numerador (em cima).\n3. Escreva numerador / denominador.', compara: 'Fração é parecida com uma divisão: 3/4 é o mesmo que 3 ÷ 4. Por isso a pizza dividida em 4 pedaços, com 3 comidos, dá 3/4.' },
      b2: { passos: '1. Leia o numerador normalmente (um, dois, três…).\n2. Veja o denominador: 2 = meio, 3 = terço, 4 = quarto… 10 = décimo.\n3. Se for maior que 10, leia o número e acrescente "avos": 3/15 = três quinze avos.', compara: 'É como os ordinais: terço, quarto, quinto lembram terceiro, quarto, quinto. Só o 2 (meio) e o "avos" fogem da regra.' },
      b3: { passos: '1. Escolha um número (2, 3, 4…).\n2. Multiplique o numerador por ele.\n3. Multiplique o denominador pelo MESMO número.\n4. A nova fração é equivalente à original.', compara: 'É como trocar uma nota de R$ 10 por duas de R$ 5: o valor é o mesmo, só muda a forma de escrever. 1/2 e 2/4 são o mesmo "valor".' },
      b4: { passos: '1. Ache um número que divida o numerador e o denominador ao mesmo tempo.\n2. Divida os dois por ele.\n3. Repita até não haver divisor comum além de 1.\n4. Atalho: divida direto pelo MDC.', compara: 'Simplificar é o caminho contrário de achar equivalentes: em vez de multiplicar, dividimos em cima e embaixo pelo mesmo número.' },
    },
    equivalentQuestions: ['o que é fração', 'o que é numerador e denominador', 'como ler fração', 'como se lê 3/10', 'o que significa avos', 'o que são frações equivalentes', 'como achar fração equivalente', 'como simplificar fração', 'o que é fração irredutível', 'como saber se duas frações são iguais', '1/2 é igual a 2/4', 'metade em fração', 'como representar parte de uma pizza em fração', 'fração de um todo', 'como simplificar 12/18', 'para que serve a fração', 'fração é divisão', 'me explica fração', 'exercícios de fração', 'dúvida sobre fração', 'fração própria e imprópria', 'como dividir em partes iguais'],
    commonErrors: ['Trocar numerador e denominador.', 'Multiplicar só o numerador ao buscar equivalentes.', 'Simplificar dividindo em cima e embaixo por números diferentes.', 'Esquecer que as partes precisam ser iguais.'],
    sources: MAT_EF,
    games: {
      words: [{ word: 'numerador', clue: 'número de cima', difficulty: 1 }, { word: 'denominador', clue: 'número de baixo', difficulty: 1 }, { word: 'metade', clue: '1/2', difficulty: 1 }, { word: 'terço', clue: '1/3', difficulty: 1 }, { word: 'quarto', clue: '1/4', difficulty: 1 }, { word: 'décimo', clue: '1/10', difficulty: 2 }, { word: 'avos', clue: 'usado acima de 10', difficulty: 2 }],
      pairs: [{ a: '1/2', b: '50% (metade)', difficulty: 1 }, { a: '4/8', b: 'quatro oitavos', difficulty: 1 }, { a: '6/8', b: '3/4', difficulty: 2 }, { a: '12/18', b: '2/3', difficulty: 3 }, { a: '3/10', b: 'três décimos', difficulty: 2 }],
      sequences: [{ prompt: 'Ordene as frações da MENOR para a MAIOR.', items: ['1/4', '1/3', '1/2', '3/4'], difficulty: 2, explanation: '1/4 = 0,25 · 1/3 ≈ 0,33 · 1/2 = 0,5 · 3/4 = 0,75.' }],
    },
  },
  'mat-porcentagem': {
    objective: 'Entender porcentagem como fração de denominador 100, calcular x% de um valor, descobrir quantos por cento uma parte representa e aplicar descontos e aumentos.',
    prerequisites: ['mat-regra-de-tres', 'mat-fracoes'], next: ['mat-juros'],
    formulas: [
      formula('Porcentagem de um valor', 'p% de V = p × V ÷ 100', [['p', 'taxa (em %)'], ['V', 'valor total']]),
      formula('Quantos por cento', 'p = (parte ÷ todo) × 100', [['parte', 'quantidade considerada'], ['todo', 'total']]),
      formula('Desconto e aumento', 'desconto: V × (1 − p/100) · aumento: V × (1 + p/100)', [['V', 'valor original'], ['p', 'taxa em %']]),
    ],
    variants: {
      b1: { passos: '1. Leia o número antes do %.\n2. Coloque esse número sobre 100.\n3. 30% = 30/100 = 0,30.', compara: 'Porcentagem é uma fração com denominador fixo: sempre 100. 1/2 = 50/100 = 50%.' },
      b2: { passos: '1. 10%: divida o valor por 10.\n2. 5%: metade dos 10%.\n3. 20%, 30%…: multiplique os 10%.\n4. 50%: metade · 25%: metade da metade.', compara: 'Assim como no troco usamos notas de 10 e 5, na porcentagem montamos qualquer taxa com "pedaços" de 10% e 5%.' },
      b3: { passos: '1. Multiplique o valor pela taxa.\n2. Divida por 100.\nPara achar a taxa: 1. Divida a parte pelo todo. 2. Multiplique por 100.', compara: 'Achar 20% de 50 é como achar 20/100 de 50 — a mesma conta que fazemos com frações.' },
      b4: { passos: '1. Calcule a porcentagem do preço.\n2. Desconto: subtraia do preço. Aumento: some.\n3. Atalho: desconto de 20% = pagar 80% do preço (× 0,8).', compara: 'Desconto de 10% seguido de aumento de 10% NÃO volta ao preço original: o aumento é calculado sobre um valor menor.' },
    },
    equivalentQuestions: ['o que é porcentagem', 'como calcular porcentagem', 'como calcular 10 por cento', 'como fazer 20% de 50', 'como calcular desconto', 'como calcular aumento de preço', 'quantos por cento é', 'como transformar fração em porcentagem', 'porcentagem na calculadora', 'como calcular 15%', 'o que significa por cento', 'como saber quanto vou pagar com desconto', 'porcentagem de um número', 'regra de três porcentagem', 'como calcular 50%', 'como calcular 25%', 'porcentagem em decimal', 'desconto de 10% quanto fica', 'aumento de 5% no salário', 'exercícios de porcentagem', 'me explica porcentagem'],
    commonErrors: ['Somar taxas de descontos sucessivos (10% + 10% não é 20%).', 'Dividir por 10 em vez de por 100.', 'Calcular o aumento sobre o valor errado.'],
    commonDoubts: [{ q: 'Dois descontos de 10% dão 20%?', a: 'Não. O segundo desconto é sobre o preço já reduzido: 100 → 90 → 81, ou seja, 19% no total.' }],
    sources: MAT_EF, enem: 'Porcentagem aparece em quase toda prova: descontos, juros, gráficos e variação percentual.',
    games: {
      pairs: [{ a: '50%', b: 'metade', difficulty: 1 }, { a: '25%', b: 'um quarto', difficulty: 1 }, { a: '10%', b: 'dividir por 10', difficulty: 1 }, { a: '100%', b: 'o todo', difficulty: 1 }, { a: '75%', b: 'três quartos', difficulty: 2 }],
    },
  },
  'mat-equacao-1-grau': {
    objective: 'Resolver equações do 1º grau usando operações inversas e traduzir problemas do cotidiano em equações.',
    prerequisites: ['mat-expressoes-algebricas', 'mat-numeros-inteiros'], next: ['mat-sistemas-equacoes', 'mat-equacao-2-grau'],
    formulas: [formula('Equação do 1º grau', 'ax + b = 0 → x = −b ÷ a', [['a', 'número que multiplica x (a ≠ 0)'], ['b', 'termo sem x'], ['x', 'incógnita']])],
    variants: {
      b1: { simples: 'Equação é uma conta com um número escondido (x). Resolver é descobrir esse número.', exemplo: 'Se x + 5 = 12, qual número somado a 5 dá 12? É o 7.', passos: '1. Veja a igualdade.\n2. Identifique o x.\n3. Descubra o valor de x que deixa os dois lados iguais.\n4. Confira substituindo.', compara: 'É como uma balança equilibrada: os dois pratos têm o mesmo peso, e o x é uma caixa com peso desconhecido.' },
      b2: { simples: 'Para "desfazer" uma soma, subtraia. Para desfazer uma multiplicação, divida.', exemplo: 'Em 3x = 18, o 3 multiplica o x. Desfazemos dividindo: x = 18 ÷ 3 = 6.', passos: '1. Veja qual operação está "grudada" no x.\n2. Faça a operação contrária nos DOIS lados.\n3. Repita até o x ficar sozinho.', compara: 'É como tirar a roupa na ordem inversa de vestir: primeiro o casaco (o último que você colocou).' },
      b3: { simples: 'Junte os números de um lado e os x do outro; depois divida.', exemplo: '2x + 3 = 11 → 2x = 11 − 3 → 2x = 8 → x = 4.', passos: '1. Passe os números sem x para o outro lado (trocando a operação).\n2. Junte os termos com x.\n3. Divida pelo número que multiplica o x.\n4. Substitua para conferir.', compara: '“Passar para o outro lado trocando o sinal” é só um atalho para “fazer a mesma operação nos dois lados”.' },
      b4: { simples: 'Chame o que não sabe de x e escreva a frase com números.', exemplo: '“O dobro de um número mais 4 é 20” → 2x + 4 = 20 → x = 8.', passos: '1. Leia o problema e ache o que se quer descobrir (x).\n2. Traduza cada parte: dobro = 2x, triplo = 3x, metade = x/2.\n3. Monte a equação e resolva.\n4. Responda com a unidade (anos, reais…).', compara: 'Traduzir um problema é como traduzir uma frase para outra língua: “o dobro de” vira “2 ×”.' },
    },
    equivalentQuestions: ['o que é equação do primeiro grau', 'como resolver equação', 'como achar o valor de x', 'como isolar o x', 'passar para o outro lado troca o sinal', 'o que é incógnita', 'como resolver 2x + 3 = 11', 'equação com x dos dois lados', 'como montar equação de problema', 'o que é o dobro de um número em equação', 'como conferir a resposta de uma equação', 'equação do 1 grau exemplos', 'resolver equação passo a passo', 'o que é raiz da equação', 'equação com fração', 'me explica equação', 'exercícios de equação de primeiro grau', 'para que serve equação', 'dúvida sobre equação', 'como descobrir um número desconhecido'],
    commonErrors: ['Trocar o sinal ao passar um termo que multiplica (em vez de dividir).', 'Fazer a operação só de um lado.', 'Esquecer de conferir substituindo o valor encontrado.'],
    sources: MAT_EF,
  },
  'mat-equacao-2-grau': {
    objective: 'Identificar os coeficientes de uma equação do 2º grau, calcular o discriminante, aplicar a fórmula de Bhaskara e resolver equações incompletas por caminhos mais curtos.',
    prerequisites: ['mat-equacao-1-grau', 'mat-potenciacao-radiciacao'], next: ['mat-funcao-2-grau'],
    formulas: [
      formula('Discriminante', 'Δ = b² − 4ac', [['a', 'coeficiente de x²'], ['b', 'coeficiente de x'], ['c', 'termo independente']]),
      formula('Fórmula de Bhaskara', 'x = (−b ± √Δ) ÷ 2a', [['Δ', 'discriminante'], ['a, b', 'coeficientes']], 'Só há raízes reais se Δ ≥ 0.'),
    ],
    variants: {
      b1: { passos: '1. Passe tudo para um lado, deixando = 0.\n2. Organize: termo com x², termo com x, número sozinho.\n3. Leia a, b e c (com os sinais!).', compara: 'Na equação do 1º grau o maior expoente de x é 1; na do 2º grau é 2 (x²). Por isso ela pode ter até duas soluções.' },
      b2: { passos: '1. Eleve b ao quadrado.\n2. Calcule 4 × a × c.\n3. Subtraia: Δ = b² − 4ac.\n4. Leia o sinal: positivo (2 raízes), zero (1), negativo (nenhuma real).', compara: 'O delta funciona como um “detector”: antes de fazer a conta toda, ele avisa quantas respostas existem.' },
      b3: { passos: '1. Calcule Δ.\n2. Tire a raiz de Δ.\n3. x₁ = (−b + √Δ) ÷ 2a.\n4. x₂ = (−b − √Δ) ÷ 2a.\n5. Confira substituindo.', compara: 'O “±” é como dois caminhos a partir do mesmo ponto: um somando a raiz, outro subtraindo.' },
      b4: { passos: 'Se c = 0: 1. Coloque x em evidência: x(ax + b) = 0. 2. x = 0 ou ax + b = 0.\nSe b = 0: 1. Isole x². 2. Tire a raiz (±).', compara: 'Nas incompletas, Bhaskara também funciona — o atalho só economiza tempo.' },
    },
    equivalentQuestions: ['o que é equação do segundo grau', 'como usar a fórmula de bhaskara', 'como calcular delta', 'o que significa delta negativo', 'como achar as raízes da equação', 'quais são os coeficientes a b e c', 'equação incompleta do segundo grau', 'como resolver x² = 9', 'como resolver x² - 5x + 6 = 0', 'quantas raízes tem uma equação do segundo grau', 'delta igual a zero', 'fórmula de bhaskara passo a passo', 'como resolver equação com x ao quadrado', 'soma e produto das raízes', 'x ao quadrado equação', 'me explica bhaskara', 'exercícios de equação do segundo grau', 'dúvida sobre bhaskara', 'por que delta negativo não tem raiz', 'raiz de equação quadrática'],
    commonErrors: ['Esquecer o sinal de b ao calcular −b.', 'Errar b² quando b é negativo (−3)² = 9.', 'Dividir só a raiz por 2a, e não o numerador inteiro.'],
    sources: MAT_EM, enem: 'Problemas de área, lucro máximo e movimento recaem em equações do 2º grau.',
  },
  'mat-teorema-pitagoras': {
    objective: 'Identificar hipotenusa e catetos, aplicar a relação a² = b² + c² para calcular lados de triângulos retângulos e resolver problemas de distância.',
    prerequisites: ['mat-potenciacao-radiciacao', 'mat-angulos'], next: ['mat-trigonometria-triangulo'],
    formulas: [formula('Teorema de Pitágoras', 'a² = b² + c²', [['a', 'hipotenusa (lado oposto ao ângulo reto)'], ['b, c', 'catetos']], 'Vale apenas para triângulos retângulos.')],
    variants: {
      b1: { simples: 'Triângulo retângulo tem um canto de 90°. O lado mais comprido, de frente para esse canto, é a hipotenusa; os outros dois são catetos.', exemplo: 'Uma escada apoiada na parede forma um triângulo retângulo com o chão e a parede: a escada é a hipotenusa.', passos: '1. Encontre o ângulo de 90° (o “cantinho” quadrado).\n2. O lado à frente dele é a hipotenusa.\n3. Os dois lados que formam o ângulo reto são os catetos.', compara: 'A hipotenusa é sempre o maior lado, assim como a diagonal de um retângulo é maior que os lados.' },
      b2: { simples: 'Hipotenusa ao quadrado = soma dos quadrados dos catetos: a² = b² + c².', exemplo: 'No triângulo de lados 3, 4 e 5: 5² = 25 e 3² + 4² = 9 + 16 = 25.', passos: '1. Eleve a hipotenusa ao quadrado.\n2. Eleve cada cateto ao quadrado e some.\n3. Os dois resultados são iguais.', compara: 'Imagine quadrados desenhados sobre cada lado: a área do quadrado da hipotenusa é igual à soma das áreas dos outros dois.' },
      b3: { simples: 'Para a hipotenusa: some os quadrados e tire a raiz. Para um cateto: subtraia os quadrados e tire a raiz.', exemplo: 'Catetos 6 e 8: hipotenusa = √(36 + 64) = √100 = 10.', passos: 'Hipotenusa: 1. b² + c². 2. Tire a raiz.\nCateto: 1. a² − (outro cateto)². 2. Tire a raiz.', compara: 'Para a hipotenusa você SOMA; para um cateto você SUBTRAI — porque a hipotenusa é o maior lado.' },
      b4: { simples: 'Sempre que houver uma diagonal ou uma distância “inclinada” formando um canto de 90°, Pitágoras ajuda.', exemplo: 'Uma escada de 5 m com o pé a 3 m da parede alcança √(25 − 9) = 4 m de altura.', passos: '1. Desenhe a situação.\n2. Encontre o triângulo retângulo escondido.\n3. Identifique o que é hipotenusa.\n4. Aplique o teorema.', compara: 'A diagonal de uma TV de “50 polegadas” é a hipotenusa do triângulo formado pela largura e pela altura da tela.' },
    },
    equivalentQuestions: ['o que é teorema de pitágoras', 'como calcular a hipotenusa', 'como calcular o cateto', 'o que é hipotenusa', 'o que são catetos', 'fórmula de pitágoras', 'a² = b² + c²', 'triângulo 3 4 5', 'como calcular diagonal', 'para que serve pitágoras', 'pitágoras vale para qualquer triângulo', 'como saber se o triângulo é retângulo', 'altura da escada na parede', 'como calcular distância com pitágoras', 'triângulo retângulo exemplos', 'me explica pitágoras', 'exercícios de pitágoras', 'dúvida sobre pitágoras', 'diagonal do quadrado', 'teorema de pitágoras passo a passo'],
    commonErrors: ['Aplicar o teorema em triângulos que não são retângulos.', 'Somar os quadrados para achar um cateto (é subtrair).', 'Esquecer de tirar a raiz no final.'],
    sources: MAT_EF,
  },
  'mat-funcao-1-grau': {
    objective: 'Reconhecer a função afim f(x) = ax + b, interpretar os coeficientes, calcular a raiz e analisar o gráfico (reta crescente ou decrescente).',
    prerequisites: ['mat-equacao-1-grau'], next: ['mat-funcao-2-grau', 'mat-progressoes'],
    formulas: [formula('Função afim', 'f(x) = ax + b · raiz: x = −b ÷ a', [['a', 'coeficiente angular (taxa de variação)'], ['b', 'coeficiente linear (valor quando x = 0)']], 'a ≠ 0')],
    variants: {
      b1: { simples: 'Função do 1º grau é uma regra do tipo “multiplica x por um número e soma outro”: f(x) = ax + b.', exemplo: 'Se f(x) = 2x + 1, então f(3) = 2 · 3 + 1 = 7.', passos: '1. Escolha um valor para x.\n2. Multiplique por a.\n3. Some b.\n4. O resultado é f(x).', compara: 'Uma função é como uma máquina: você coloca x, ela aplica a regra (× a, + b) e devolve um único resultado.' },
      b2: { simples: 'a diz quanto a função sobe (ou desce) a cada passo de x; b é o valor quando x = 0.', exemplo: 'Táxi: R$ 5 de bandeirada + R$ 3 por km → f(x) = 3x + 5 (a = 3, b = 5).', passos: '1. a é o número que multiplica x: quanto f(x) muda quando x aumenta 1.\n2. b é o número sozinho: o valor inicial, quando x = 0.', compara: 'Numa corrida de táxi, b é a bandeirada (valor inicial) e a é o preço por quilômetro.' },
      b3: { simples: 'Raiz é o x que faz a função valer zero.', exemplo: 'f(x) = 2x − 6: 2x − 6 = 0 → x = 3. A reta corta o eixo x em 3.', passos: '1. Iguale a função a zero: ax + b = 0.\n2. Resolva a equação.\n3. x = −b ÷ a é a raiz.', compara: 'Achar a raiz da função é resolver uma equação do 1º grau: é o mesmo cálculo com outro nome.' },
      b4: { simples: 'O gráfico é uma reta. a positivo: sobe. a negativo: desce.', exemplo: 'f(x) = −x + 4 começa em 4 no eixo y e desce, cortando o eixo x em 4.', passos: '1. Calcule dois pontos (por exemplo, x = 0 e x = 1).\n2. Marque no plano cartesiano.\n3. Trace a reta.\n4. a > 0 sobe; a < 0 desce.', compara: 'Se a é positivo, é como subir uma rampa; se negativo, como descer.' },
    },
    equivalentQuestions: ['o que é função do primeiro grau', 'o que é função afim', 'como calcular f(x)', 'o que é coeficiente angular', 'o que é coeficiente linear', 'como achar a raiz da função', 'zero da função', 'gráfico de função do primeiro grau', 'função crescente ou decrescente', 'como montar a lei da função', 'f(x) = 2x + 3', 'para que serve função', 'função do táxi bandeirada', 'como desenhar o gráfico da função', 'onde a reta corta o eixo y', 'me explica função afim', 'exercícios de função do primeiro grau', 'dúvida sobre função', 'diferença entre equação e função', 'taxa de variação'],
    commonErrors: ['Confundir a (inclinação) com b (ponto de partida).', 'Achar que a raiz é o valor de b.', 'Trocar crescente por decrescente pelo sinal de b.'],
    sources: MAT_EM, enem: 'Tarifas, planos de celular e gráficos de consumo são modelados por funções afins.',
  },

  // ───────────── LOTE 2 · PORTUGUÊS ─────────────
  'por-substantivo-adjetivo': {
    objective: 'Reconhecer substantivos (comuns e próprios) e adjetivos em frases e fazer a concordância entre eles em gênero e número.',
    next: ['por-classes-gramaticais', 'por-concordancia'],
    variants: {
      b1: { passos: '1. Leia a frase.\n2. Procure as palavras que dão nome a algo (pessoa, lugar, objeto, sentimento).\n3. Teste: dá para colocar “o” ou “a” antes? Então é substantivo.', compara: 'Substantivo é como a etiqueta de uma caixa: diz O QUE é. O adjetivo diz COMO é.' },
      b2: { passos: '1. O nome serve para qualquer ser daquele tipo? Comum (cidade).\n2. Nomeia um ser único? Próprio (Recife).\n3. Próprio sempre com letra maiúscula.', compara: '“Cachorro” é comum (qualquer cachorro); “Rex” é próprio (aquele cachorro).' },
      b3: { passos: '1. Encontre o substantivo.\n2. Pergunte: como ele é?\n3. A palavra que responde é o adjetivo.', compara: 'Se o substantivo é o nome, o adjetivo é a descrição — como numa ficha: nome e características.' },
      b4: { passos: '1. Veja o gênero do substantivo (masculino/feminino).\n2. Veja o número (singular/plural).\n3. Ajuste o adjetivo: menina alta, meninos altos.', compara: 'É como vestir uma roupa do mesmo tamanho: o adjetivo se ajusta ao substantivo.' },
    },
    equivalentQuestions: ['o que é substantivo', 'o que é adjetivo', 'diferença entre substantivo e adjetivo', 'o que é substantivo próprio', 'o que é substantivo comum', 'exemplos de substantivos', 'exemplos de adjetivos', 'como achar o adjetivo na frase', 'nome próprio tem letra maiúscula', 'concordância do adjetivo', 'substantivo abstrato', 'substantivo concreto', 'palavra que dá nome', 'palavra que dá qualidade', 'classe gramatical substantivo', 'me explica substantivo', 'exercícios de substantivo e adjetivo', 'dúvida sobre adjetivo', 'adjetivo no plural', 'como identificar substantivo'],
    commonErrors: ['Escrever nomes próprios com minúscula.', 'Não concordar o adjetivo com o substantivo (as casa bonito).', 'Confundir substantivo abstrato com adjetivo (felicidade × feliz).'],
    sources: [SRC.bncc('Língua Portuguesa — Anos Iniciais e Finais')],
  },
  'por-verbos': {
    objective: 'Reconhecer verbos, identificar tempos (presente, pretérito, futuro) e modos (indicativo, subjuntivo, imperativo) e conjugar o verbo de acordo com a pessoa.',
    prerequisites: ['por-substantivo-adjetivo'], next: ['por-sujeito-predicado', 'por-concordancia'],
    variants: {
      b1: { exemplo: 'Em “Ontem choveu e eu fiquei em casa estudando”, os verbos são choveu (fenômeno), fiquei (estado) e estudando (ação).', passos: '1. Procure palavras que mostram ação, estado ou fenômeno.\n2. Teste: dá para mudar o tempo (estudo, estudei, estudarei)? Então é verbo.', compara: 'Substantivo nomeia; verbo mostra o que acontece. “Corrida” é substantivo; “correr” é verbo.' },
      b2: { exemplo: '“Hoje eu leio, ontem li, amanhã lerei” — o mesmo verbo nos três tempos.', passos: '1. Pergunte: quando acontece?\n2. Agora → presente. Já aconteceu → pretérito. Vai acontecer → futuro.', compara: 'Os tempos verbais são uma linha do tempo: passado à esquerda, presente no meio, futuro à direita.' },
      b3: { simples: 'Indicativo = certeza. Subjuntivo = dúvida ou desejo. Imperativo = ordem ou pedido.', exemplo: '“Ele estuda” (certeza) · “Talvez ele estude” (dúvida) · “Estude!” (ordem).', passos: '1. Afirma algo com certeza? Indicativo.\n2. Expressa dúvida, desejo ou hipótese (talvez, que, se)? Subjuntivo.\n3. Dá ordem ou faz pedido? Imperativo.', compara: 'É como o tom de voz: firme (indicativo), sonhador (subjuntivo) ou mandão (imperativo).' },
      b4: { exemplo: '“Eu jogo, nós jogamos, eles jogam” — a terminação muda com a pessoa.', passos: '1. Veja quem faz a ação (eu, tu, ele, nós, vós, eles).\n2. Ajuste a terminação do verbo.\n3. Confira: “nós cantamos”, “eles cantam”.', compara: 'A terminação do verbo é como um crachá: mostra quem age, mesmo sem o pronome (“Cantamos” = nós).' },
    },
    equivalentQuestions: ['o que é verbo', 'quais são os tempos verbais', 'o que é pretérito', 'o que é modo subjuntivo', 'o que é modo imperativo', 'o que é modo indicativo', 'como conjugar um verbo', 'exemplos de verbos de ação', 'verbos de estado', 'verbo de fenômeno da natureza', 'diferença entre pretérito perfeito e imperfeito', 'futuro do presente', 'como saber o tempo do verbo', 'conjugação do verbo cantar', 'o que é verbo no infinitivo', 'me explica verbo', 'exercícios de verbos', 'dúvida sobre verbos', 'tempos e modos verbais', 'verbo concorda com o sujeito'],
    commonErrors: ['Confundir pretérito perfeito (estudei) com imperfeito (estudava).', 'Usar o indicativo onde se pede subjuntivo (espero que ele vem).', 'Não concordar o verbo com a pessoa.'],
    sources: [SRC.bncc('Língua Portuguesa — Anos Iniciais e Finais')],
  },
  'por-sujeito-predicado': {
    objective: 'Identificar sujeito e predicado, classificar o sujeito (simples, composto, oculto, indeterminado) e reconhecer orações sem sujeito.',
    prerequisites: ['por-verbos'], next: ['por-concordancia', 'por-periodo-composto'],
    variants: {
      b1: { simples: 'Sujeito é de quem se fala. Predicado é o que se fala dele.', exemplo: '“A professora explicou a matéria”: sujeito = a professora; predicado = explicou a matéria.', passos: '1. Encontre o verbo.\n2. Veja de quem ou do que se fala: é o sujeito.\n3. O resto da oração, com o verbo, é o predicado.', compara: 'Como numa notícia: o sujeito é de quem se fala; o predicado é a novidade sobre ele.' },
      b2: { simples: 'Pergunte “quem?” ou “o quê?” para o verbo. A resposta é o sujeito.', exemplo: '“Chegaram os convidados.” Quem chegou? Os convidados — o sujeito pode vir depois do verbo.', passos: '1. Ache o verbo.\n2. Pergunte “quem?”/“o quê?” + verbo.\n3. A resposta é o sujeito.\n4. Confira a concordância (chegaram × os convidados).', compara: 'O sujeito nem sempre vem no começo: a pergunta funciona em qualquer posição.' },
      b3: { simples: 'Simples: um núcleo. Composto: dois ou mais. Oculto: está no verbo. Indeterminado: não se sabe quem.', exemplo: '“Estudamos muito” (oculto: nós) · “Roubaram meu lápis” (indeterminado).', passos: '1. Conte os núcleos do sujeito.\n2. Nenhum aparece, mas o verbo indica? Oculto.\n3. Verbo na 3ª do plural sem referência, ou com “se”? Indeterminado.', compara: 'Oculto: dá para descobrir quem é pela terminação do verbo. Indeterminado: não dá.' },
      b4: { simples: 'Algumas orações não têm sujeito: chuva, vento, “haver” de existir e tempo decorrido.', exemplo: '“Choveu ontem.” · “Há muitos alunos na sala.” · “Faz dois anos que me mudei.”', passos: '1. Verbo de fenômeno da natureza? Sem sujeito.\n2. “Haver” = existir? Sem sujeito (singular).\n3. “Fazer/haver” indicando tempo? Sem sujeito.', compara: 'Por isso é “Há muitos alunos” e não “Hão”: sem sujeito, o verbo não tem com quem concordar.' },
    },
    equivalentQuestions: ['o que é sujeito', 'o que é predicado', 'como achar o sujeito da oração', 'tipos de sujeito', 'o que é sujeito oculto', 'o que é sujeito indeterminado', 'o que é sujeito composto', 'oração sem sujeito', 'por que é há e não hão', 'sujeito depois do verbo', 'núcleo do sujeito', 'pergunta quem para o verbo', 'sujeito simples exemplo', 'choveu tem sujeito', 'diferença entre sujeito oculto e indeterminado', 'me explica sujeito e predicado', 'exercícios de sujeito', 'dúvida sobre sujeito', 'análise sintática sujeito', 'termos essenciais da oração'],
    commonErrors: ['Achar que o sujeito sempre vem no início.', 'Confundir sujeito oculto com indeterminado.', 'Flexionar “haver” (existir) no plural: hão, houveram.'],
    sources: [SRC.bncc('Língua Portuguesa — Anos Finais')],
  },
  'por-tipos-generos-textuais': {
    objective: 'Diferenciar tipo textual (modo de organização) de gênero textual (formato social), reconhecer os principais tipos e gêneros e ler com atenção à finalidade do texto.',
    next: ['por-interpretacao-texto', 'por-funcoes-linguagem'],
    variants: {
      b1: { simples: 'Tipo é o “jeito” do texto: narrar, descrever, argumentar, expor ou instruir.', exemplo: 'Um conto narra; um folheto turístico descreve; um artigo de opinião argumenta; um verbete expõe; uma receita instrui.', passos: '1. Pergunte: o texto conta, mostra como é, defende uma ideia, explica ou ensina a fazer?\n2. A resposta indica o tipo.', compara: 'Os tipos são as ferramentas do texto; o gênero é o produto pronto que usa essas ferramentas.' },
      b2: { simples: 'Gênero é o formato do texto no dia a dia: notícia, receita, carta, meme, bula…', exemplo: 'Uma notícia tem manchete, lide e fatos; uma receita tem ingredientes e modo de preparo.', passos: '1. Observe o formato (título, partes, linguagem).\n2. Pense onde ele circula.\n3. Pense para que ele serve: essa é a função social.', compara: 'Gênero é como um tipo de roupa (uniforme, fantasia, pijama): cada um tem formato e uso próprios.' },
      b3: { simples: 'Tipos são poucos; gêneros são muitos. Um gênero pode misturar tipos.', exemplo: 'Na receita (gênero) predomina o tipo injuntivo (instruções), mas há descrição dos ingredientes.', passos: '1. Identifique o gênero.\n2. Veja qual tipo predomina.\n3. Note os outros tipos que aparecem.', compara: 'Como um prato com vários ingredientes: um gênero tem vários tipos, mas um costuma predominar.' },
      b4: { simples: 'Para entender um texto: qual o gênero, quem fala, para quem e para quê.', exemplo: 'Num anúncio, a finalidade é convencer; por isso há imperativos (“Compre já!”).', passos: '1. Identifique o gênero.\n2. Descubra autor, público e finalidade.\n3. Ache a ideia principal de cada parágrafo.\n4. Separe fatos de opiniões.', compara: 'Ler sabendo o gênero é como ver um filme sabendo se é comédia ou suspense: você entende as intenções.' },
    },
    equivalentQuestions: ['o que é tipo textual', 'o que é gênero textual', 'diferença entre tipo e gênero textual', 'quais são os tipos textuais', 'exemplos de gêneros textuais', 'texto narrativo', 'texto descritivo', 'texto dissertativo argumentativo', 'texto injuntivo', 'texto expositivo', 'notícia é tipo ou gênero', 'receita é que tipo de texto', 'função social do texto', 'como identificar o gênero de um texto', 'gêneros digitais', 'me explica gêneros textuais', 'exercícios de tipos textuais', 'dúvida sobre gênero textual', 'crônica é gênero', 'o que é texto instrucional'],
    commonErrors: ['Chamar gênero de tipo (ex.: “o tipo notícia”).', 'Achar que cada gênero tem um só tipo.', 'Ignorar a finalidade do texto na interpretação.'],
    sources: [SRC.bncc('Língua Portuguesa — Anos Finais')], enem: 'Gêneros e funções sociais dos textos estão em quase todas as questões de Linguagens.',
  },

  // ───────────── LOTE 3 · CIÊNCIAS ─────────────
  'cie-fotossintese': {
    objective: 'Explicar a fotossíntese como produção de alimento pela planta a partir de água, gás carbônico e luz, identificar seus produtos (glicose e oxigênio) e sua importância para a vida na Terra.',
    prerequisites: ['cie-plantas'], next: ['bio-cadeias-alimentares'],
    variants: {
      b1: { passos: '1. Separe a palavra: “foto” (luz) + “síntese” (produção).\n2. Lembre que quem faz é a planta (e as algas).\n3. Conclua: é produzir alimento usando luz.', compara: 'Nós precisamos comer para ter energia; a planta “cozinha” o próprio alimento usando a luz do Sol como fogão.' },
      b2: { passos: '1. Água: entra pelas raízes.\n2. Gás carbônico: entra pelos estômatos das folhas.\n3. Luz: captada pela clorofila, nos cloroplastos.', compara: 'É como uma receita: água e gás carbônico são os ingredientes; a luz é a energia do forno; a clorofila é o cozinheiro.' },
      b3: { passos: '1. Escreva o que entra: gás carbônico + água + luz.\n2. Escreva o que sai: glicose + oxigênio.\n3. A glicose fica com a planta; o oxigênio vai para o ar.', compara: 'Na nossa respiração é o contrário: usamos glicose e oxigênio e liberamos gás carbônico e água.' },
      b4: { passos: '1. Pense no oxigênio que respiramos: grande parte vem da fotossíntese.\n2. Pense na comida: toda cadeia alimentar começa num produtor.\n3. Conclua: sem fotossíntese, quase não haveria vida.', compara: 'As plantas são como a “usina” da vida: produzem a energia que passa para herbívoros, carnívoros e decompositores.' },
    },
    equivalentQuestions: eqsPt(['fotossíntese'], ['como as plantas se alimentam', 'o que a planta precisa para fazer fotossíntese', 'o que é clorofila', 'o que são estômatos', 'o que a fotossíntese produz', 'equação da fotossíntese', 'fotossíntese libera oxigênio', 'onde acontece a fotossíntese', 'o que é cloroplasto', 'planta faz fotossíntese à noite']),
    commonErrors: ['Achar que a planta tira o alimento pronto do solo.', 'Trocar os produtos: a fotossíntese libera oxigênio, não gás carbônico.', 'Pensar que as plantas não respiram.'],
    sources: [SRC.bncc('Ciências — Anos Finais'), SRC.autoral()],
    games: { words: [{ word: 'clorofila', clue: 'pigmento verde que capta a luz', difficulty: 1 }, { word: 'glicose', clue: 'açúcar produzido pela planta', difficulty: 2 }, { word: 'oxigênio', clue: 'gás liberado na fotossíntese', difficulty: 1 }, { word: 'estômatos', clue: 'aberturas das folhas por onde entra o gás carbônico', difficulty: 3 }, { word: 'luz', clue: 'fonte de energia da fotossíntese', difficulty: 1 }, { word: 'raízes', clue: 'absorvem a água do solo', difficulty: 1 }, { word: 'cloroplasto', clue: 'organela onde ocorre a fotossíntese', difficulty: 3 }] },
  },
  'cie-sistema-solar': {
    objective: 'Descrever o Sol como estrela central, nomear os oito planetas em ordem, diferenciar planetas rochosos de gasosos e relacionar rotação e translação ao dia, à noite e ao ano.',
    next: ['cie-lua-fases', 'cie-estacoes-ano'],
    variants: {
      b1: { passos: '1. Lembre: o Sol é uma estrela.\n2. Estrela produz luz e calor próprios.\n3. Tudo no Sistema Solar gira ao redor dele.', compara: 'A Lua e os planetas não brilham sozinhos: refletem a luz do Sol, como um espelho refletindo uma lanterna.' },
      b2: { passos: '1. Decore a ordem com uma frase: “Minha Vó Tem Muitas Joias, Só Usa No Natal”.\n2. Cada inicial é um planeta: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano, Netuno.', compara: 'A Terra é o 3º planeta: nem perto demais (quente como Vênus) nem longe demais (gelada como Marte).' },
      b3: { passos: '1. Os 4 primeiros (mais perto do Sol): rochosos, pequenos, superfície sólida.\n2. Os 4 últimos: gigantes gasosos, enormes, com anéis e muitas luas.', compara: 'Rochosos são como bolas de gude; gasosos, como balões gigantes.' },
      b4: { passos: '1. Rotação: a Terra gira em torno de si mesma (≈24 h) → dia e noite.\n2. Translação: volta ao redor do Sol (≈365 dias) → um ano.', compara: 'É como uma bailarina que gira sobre si mesma (rotação) enquanto dá voltas pelo palco (translação).' },
    },
    equivalentQuestions: eqsPt(['sistema solar', 'planetas'], ['quais são os planetas do sistema solar', 'ordem dos planetas', 'qual o maior planeta', 'qual o planeta mais perto do sol', 'o sol é uma estrela', 'o que é rotação', 'o que é translação', 'por que existe dia e noite', 'planetas rochosos e gasosos', 'plutão é planeta']),
    commonErrors: ['Achar que o Sol gira em torno da Terra.', 'Confundir rotação (dia) com translação (ano).', 'Dizer que Plutão ainda é um dos oito planetas (é planeta-anão desde 2006).'],
    sources: [SRC.bncc('Ciências — Anos Iniciais e Finais'), SRC.web('Solar System Exploration', 'https://science.nasa.gov/solar-system/', 'NASA', 'instituicao'), SRC.autoral()],
  },
  'cie-ciclo-da-agua': {
    objective: 'Descrever as etapas do ciclo da água (evaporação, transpiração, condensação, precipitação, infiltração e escoamento), relacionando-as às mudanças de estado físico e ao calor do Sol.',
    prerequisites: ['cie-estados-materia'], next: ['cie-preservacao-ambiente'],
    variants: {
      b1: { exemplo: 'Roupa molhada no varal seca ao sol: a água dela evaporou e foi para o ar.', passos: '1. O Sol aquece a água de mares, rios e lagos.\n2. Ela passa de líquida para vapor (evaporação).\n3. As plantas também soltam vapor pelas folhas (transpiração).', compara: 'Evaporação é a água “subindo invisível”: você não vê o vapor, mas ele está no ar.' },
      b2: { exemplo: 'Um copo de água gelada fica “suado” por fora: o vapor do ar esfriou e virou gotinhas.', passos: '1. O vapor sobe e encontra ar frio.\n2. Esfria e volta a ser líquido (condensação).\n3. As gotinhas se juntam e formam nuvens.', compara: 'A tampa da panela fervendo fica cheia de gotas: é uma “mini-nuvem” na cozinha.' },
      b3: { exemplo: 'Em dias de temporal, pedras de gelo podem cair: é o granizo, outra forma de precipitação.', passos: '1. As gotas das nuvens crescem.\n2. Ficam pesadas demais.\n3. Caem como chuva, neve ou granizo (precipitação).', compara: 'A nuvem é como uma esponja: quando fica encharcada demais, a água cai.' },
      b4: { exemplo: 'Depois da chuva, parte da água some no chão de terra (infiltra) e outra corre pela rua até o bueiro (escoa).', passos: '1. Parte da chuva infiltra no solo → água subterrânea.\n2. Parte escoa pela superfície → rios, lagos e mares.\n3. O Sol evapora de novo e o ciclo recomeça.', compara: 'O ciclo é como uma roda-gigante: a água sobe, desce e volta a subir, sem começo nem fim.' },
    },
    equivalentQuestions: eqsPt(['ciclo da água', 'evaporação', 'condensação'], ['etapas do ciclo da água', 'como se formam as nuvens', 'o que é precipitação', 'como se forma a chuva', 'o que é infiltração', 'o que é lençol freático', 'o que é transpiração das plantas', 'o que é escoamento', 'por que o copo gelado sua', 'o que é granizo']),
    commonErrors: ['Achar que as nuvens são feitas de vapor (são gotinhas de água líquida ou gelo).', 'Confundir evaporação com condensação.', 'Esquecer a transpiração das plantas.'],
    sources: [SRC.bncc('Ciências — Anos Iniciais e Finais'), SRC.autoral()],
    games: { words: [{ word: 'evaporação', clue: 'água líquida vira vapor', difficulty: 1 }, { word: 'nuvem', clue: 'formada por gotinhas de água', difficulty: 1 }, { word: 'chuva', clue: 'forma mais comum de precipitação', difficulty: 1 }, { word: 'granizo', clue: 'pedrinhas de gelo que caem das nuvens', difficulty: 2 }, { word: 'vapor', clue: 'água no estado gasoso', difficulty: 1 }, { word: 'infiltração', clue: 'água entrando no solo', difficulty: 2 }, { word: 'condensação', clue: 'vapor esfria e vira líquido', difficulty: 2 }], sequences: [{ prompt: 'Coloque as etapas do ciclo da água em ordem.', difficulty: 1, items: ['Evaporação da água dos rios e mares', 'Condensação do vapor em nuvens', 'Precipitação (chuva)', 'Infiltração e escoamento'], explanation: 'Evaporação → condensação → precipitação → infiltração/escoamento, e recomeça.' }] },
  },
  'cie-sistema-digestorio': {
    objective: 'Descrever o caminho do alimento pelo tubo digestório, a função de cada órgão (boca, esôfago, estômago, intestinos) e dos órgãos anexos (fígado e pâncreas) na digestão e na absorção dos nutrientes.',
    prerequisites: ['cie-alimentacao-nutrientes'], next: ['cie-sistema-respiratorio', 'cie-sistema-circulatorio'],
    variants: {
      b1: { simples: 'Digerir é quebrar a comida em pedacinhos tão pequenos que entram no sangue.', exemplo: 'Um pão vira, no fim da digestão, glicose — que o sangue leva para as células como energia.', passos: '1. O alimento é triturado (digestão mecânica).\n2. Enzimas o quebram em nutrientes (digestão química).\n3. Os nutrientes são absorvidos pelo sangue.', compara: 'É como desmontar um brinquedo de encaixar em pecinhas para usá-las em outra construção.' },
      b2: { simples: 'A boca mastiga, o esôfago leva e o estômago “amassa” com ácido.', exemplo: 'Mastigar bem um pão faz ele ficar docinho: a saliva começa a transformar o amido em açúcar.', passos: '1. Boca: dentes trituram, saliva começa a digerir o amido.\n2. Esôfago: tubo que leva o alimento ao estômago.\n3. Estômago: suco gástrico ácido digere proteínas.', compara: 'O estômago funciona como um liquidificador com ácido: mistura e quebra o alimento.' },
      b3: { simples: 'O delgado absorve os nutrientes; o grosso absorve água e forma as fezes.', exemplo: 'O intestino delgado de um adulto tem cerca de 6 a 7 metros, dobrado dentro da barriga.', passos: '1. Intestino delgado: termina a digestão e absorve os nutrientes.\n2. Intestino grosso: absorve a água.\n3. O que sobra forma as fezes, eliminadas pelo ânus.', compara: 'O delgado é a “entrega” (distribui os nutrientes ao sangue); o grosso é a “secadora” (retira a água).' },
      b4: { simples: 'Fígado e pâncreas não recebem comida, mas mandam sucos que ajudam a digerir.', exemplo: 'Depois de uma refeição gordurosa, a vesícula libera bile para ajudar a digerir a gordura.', passos: '1. Fígado: produz a bile (gorduras), guardada na vesícula.\n2. Pâncreas: produz o suco pancreático com enzimas.\n3. Os dois sucos atuam no intestino delgado.', compara: 'A bile age sobre a gordura como o detergente no prato: separa em gotinhas menores.' },
    },
    equivalentQuestions: eqsPt(['sistema digestório', 'digestão'], ['órgãos do sistema digestório', 'caminho do alimento no corpo', 'função do estômago', 'função do intestino delgado', 'função do intestino grosso', 'o que é bile', 'função do fígado na digestão', 'função do pâncreas', 'o que é suco gástrico', 'o que faz a saliva']),
    commonErrors: ['Achar que a digestão acontece só no estômago.', 'Pensar que fígado e pâncreas fazem parte do caminho do alimento.', 'Confundir intestino delgado (nutrientes) com grosso (água).'],
    sources: [SRC.bncc('Ciências — Anos Finais'), SRC.autoral()],
    games: { words: [{ word: 'estômago', clue: 'órgão com suco gástrico ácido', difficulty: 1 }, { word: 'esôfago', clue: 'tubo que liga a boca ao estômago', difficulty: 2 }, { word: 'saliva', clue: 'começa a digerir o amido', difficulty: 1 }, { word: 'fígado', clue: 'produz a bile', difficulty: 1 }, { word: 'pâncreas', clue: 'produz o suco pancreático', difficulty: 2 }, { word: 'intestino', clue: 'delgado e grosso', difficulty: 1 }, { word: 'bile', clue: 'ajuda a digerir gorduras', difficulty: 2 }], sequences: [{ prompt: 'Coloque o caminho do alimento em ordem.', difficulty: 1, items: ['Boca', 'Faringe', 'Esôfago', 'Estômago', 'Intestino delgado', 'Intestino grosso'], explanation: 'Boca → faringe → esôfago → estômago → intestino delgado → intestino grosso.' }] },
  },

  // ───────────── LOTE 4 · HISTÓRIA ─────────────
  'his-revolucao-francesa': {
    objective: 'Explicar as causas da Revolução Francesa (crise do Antigo Regime e sociedade de ordens), seus marcos (Estados Gerais, Bastilha, Declaração dos Direitos), suas fases até Napoleão e seu legado para a Idade Contemporânea.',
    prerequisites: ['his-iluminismo-absolutismo'], next: ['his-revolucao-industrial', 'his-independencia-brasil'],
    variants: {
      b1: { passos: '1. Identifique quem governava: um rei absolutista.\n2. Liste os três estados e quem pagava impostos.\n3. Some a crise econômica e a fome.\n4. Conclua: a maioria estava insatisfeita.', compara: 'Imagine uma escola em que só uma turma paga a cantina de todas e não pode votar nas regras: cedo ou tarde, haveria revolta.' },
      b2: { passos: '1. Rei convoca os Estados Gerais (maio de 1789).\n2. Terceiro Estado forma a Assembleia Nacional.\n3. Povo toma a Bastilha (14/07/1789).', compara: 'A Bastilha era mais símbolo que prisão cheia: derrubá-la foi como derrubar a estátua do poder do rei.' },
      b3: { passos: '1. Leia o lema: liberdade, igualdade, fraternidade.\n2. Relacione à Declaração de 1789: todos nascem livres e iguais em direitos.\n3. Perceba a ruptura com os privilégios de nascimento.', compara: 'Antes, o que valia era a família em que você nascia; a Declaração passou a dizer que a lei vale igual para todos (embora, na prática, mulheres e escravizados tenham ficado de fora).' },
      b4: { passos: '1. Monarquia constitucional (1789–1792).\n2. Convenção/República e Terror (1792–1795).\n3. Diretório (1795–1799).\n4. Golpe de Napoleão (18 Brumário, 1799).', compara: 'As fases são como um pêndulo: começa moderada, radicaliza no Terror e volta para um governo mais conservador.' },
      b5: { passos: '1. Fim do Antigo Regime na França.\n2. Difusão das ideias de cidadania e direitos.\n3. Inspiração para outras revoluções.\n4. Marco do início da Idade Contemporânea (1789).', compara: 'Muitos direitos que hoje parecem óbvios, como igualdade perante a lei, ganharam força a partir daqui.' },
    },
    equivalentQuestions: eqsPt(['Revolução Francesa'], ['causas da revolução francesa', 'o que foi a queda da bastilha', 'o que eram os três estados', 'o que foi o terror', 'quem foi robespierre', 'o que foi a declaração dos direitos do homem e do cidadão', 'lema liberdade igualdade fraternidade', 'fases da revolução francesa', 'como napoleão chegou ao poder', 'o que era o antigo regime']),
    commonErrors: ['Achar que o Terceiro Estado era só a burguesia (incluía camponeses e trabalhadores).', 'Confundir as fases da revolução.', 'Achar que a Declaração garantiu direitos a todos na prática (mulheres e escravizados ficaram de fora).'],
    sources: [SRC.bncc('História — Anos Finais'), SRC.autoral()],
    history: {
      period: '1789–1799', place: 'França',
      timeline: [{ date: 'maio de 1789', event: 'Convocação dos Estados Gerais' }, { date: '14 de julho de 1789', event: 'Queda da Bastilha' }, { date: 'agosto de 1789', event: 'Declaração dos Direitos do Homem e do Cidadão' }, { date: '1792', event: 'Proclamação da República' }, { date: '1793', event: 'Execução de Luís XVI; início do Terror' }, { date: '1799', event: 'Golpe do 18 Brumário: Napoleão chega ao poder' }],
      people: [{ name: 'Luís XVI', role: 'rei da França, executado em 1793' }, { name: 'Maximilien de Robespierre', role: 'líder jacobino no período do Terror' }, { name: 'Napoleão Bonaparte', role: 'general que tomou o poder em 1799' }],
      causes: ['Crise financeira do Estado francês', 'Privilégios do clero e da nobreza', 'Fome e alta dos preços do pão', 'Difusão das ideias iluministas'],
      consequences: ['Fim do Antigo Regime na França', 'Difusão dos ideais de cidadania e direitos', 'Inspiração para revoluções e independências na América'],
      interpretations: ['Historiadores de tradição marxista a interpretam como revolução burguesa; outras correntes destacam fatores políticos e culturais, como a nova linguagem dos direitos.'],
    },
  },
  'his-brasil-colonia': {
    objective: 'Descrever a ocupação portuguesa do território que viria a ser o Brasil (pau-brasil, capitanias hereditárias e governo-geral), reconhecer a presença indígena anterior e a centralidade do açúcar e da escravidão na economia colonial.',
    prerequisites: ['his-grandes-navegacoes', 'his-povos-indigenas'], next: ['his-escravidao-abolicao', 'his-independencia-brasil'],
    variants: {
      b1: { simples: 'Em 1500 os portugueses chegaram a uma terra que já tinha milhões de indígenas e começaram tirando pau-brasil.', exemplo: 'O pau-brasil era trocado com indígenas por objetos (escambo) e levado para a Europa como corante vermelho.', passos: '1. Data: abril de 1500.\n2. Quem: esquadra de Cabral.\n3. Onde: litoral da atual Bahia.\n4. Primeira riqueza explorada: pau-brasil.', compara: 'Dizer que o Brasil foi “descoberto” apaga os povos que já viviam aqui há milhares de anos; historiadores preferem “chegada dos portugueses”.' },
      b2: { simples: 'Portugal dividiu a terra em faixas e entregou cada uma a um donatário.', exemplo: 'Pernambuco, de Duarte Coelho, e São Vicente, de Martim Afonso, foram capitanias que prosperaram com o açúcar.', passos: '1. Ano: 1534.\n2. Território dividido em faixas.\n3. Donatários deviam povoar e defender por conta própria.\n4. A maioria fracassou por falta de recursos e conflitos.', compara: 'Era como um dono de terras que entrega lotes a gerentes para administrarem com o próprio dinheiro: poucos conseguiram.' },
      b3: { simples: 'Portugal criou um governo central e Salvador virou a primeira capital.', exemplo: 'Com Tomé de Sousa vieram os primeiros jesuítas, liderados por Manuel da Nóbrega.', passos: '1. Problema: capitanias isoladas e fracas.\n2. Solução: governo-geral (1549).\n3. Primeiro governador: Tomé de Sousa.\n4. Fundou Salvador, capital até 1763.', compara: 'O governo-geral foi como colocar um coordenador para todos os gerentes: as capitanias continuaram, mas sob um comando central.' },
      b4: { simples: 'O açúcar era a grande riqueza, produzido com trabalho escravizado de africanos e indígenas.', exemplo: 'Um engenho tinha canaviais, a moenda, a casa-grande do senhor e a senzala dos escravizados.', passos: '1. Produto principal: açúcar.\n2. Região: litoral do Nordeste.\n3. Mão de obra: africanos escravizados (e indígenas).\n4. Destino: mercado europeu.', compara: 'A colônia funcionava para enriquecer a metrópole: produzia o que a Europa queria comprar, com trabalho forçado.' },
    },
    equivalentQuestions: eqsPt(['Brasil Colônia'], ['chegada dos portugueses ao brasil', 'quem foi pedro álvares cabral', 'o que eram as capitanias hereditárias', 'o que foi o governo geral', 'primeira capital do brasil', 'quem foi tomé de sousa', 'ciclo do pau-brasil', 'economia açucareira', 'o que eram os engenhos', 'escravidão no brasil colônia']),
    commonErrors: ['Dizer que a terra estava vazia em 1500.', 'Achar que o governo-geral acabou com as capitanias.', 'Esquecer que indígenas também foram escravizados.'],
    sources: [SRC.bncc('História — Anos Finais'), SRC.autoral()],
    history: {
      period: '1500–1822', place: 'América portuguesa',
      timeline: [{ date: 'abril de 1500', event: 'Chegada da esquadra de Pedro Álvares Cabral' }, { date: '1532', event: 'Fundação da vila de São Vicente' }, { date: '1534', event: 'Criação das capitanias hereditárias' }, { date: '1549', event: 'Governo-geral de Tomé de Sousa e fundação de Salvador' }, { date: '1763', event: 'Capital transferida para o Rio de Janeiro' }],
      people: [{ name: 'Pedro Álvares Cabral', role: 'comandante da esquadra de 1500' }, { name: 'Tomé de Sousa', role: 'primeiro governador-geral' }, { name: 'Manuel da Nóbrega', role: 'líder dos primeiros jesuítas' }],
      causes: ['Expansão marítima portuguesa', 'Busca de riquezas e rotas comerciais', 'Necessidade de defender o território de outros europeus'],
      consequences: ['Ocupação do território e violência contra os povos indígenas', 'Economia açucareira baseada na escravidão africana', 'Formação de uma sociedade profundamente desigual'],
    },
    games: {
      words: [{ word: 'Cabral', clue: 'comandou a esquadra de 1500', difficulty: 1 }, { word: 'capitanias', clue: 'faixas de terra hereditárias', difficulty: 2 }, { word: 'Salvador', clue: 'primeira capital', difficulty: 1 }, { word: 'engenho', clue: 'onde se produzia o açúcar', difficulty: 1 }, { word: 'donatário', clue: 'recebia uma capitania', difficulty: 3 }, { word: 'açúcar', clue: 'principal produto colonial', difficulty: 1 }, { word: 'paubrasil', clue: 'árvore do corante vermelho (sem hífen)', difficulty: 2 }],
      sequences: [{ prompt: 'Coloque os acontecimentos do início da colonização em ordem.', difficulty: 2, items: ['Chegada da esquadra de Cabral (1500)', 'Exploração do pau-brasil', 'Criação das capitanias hereditárias (1534)', 'Criação do governo-geral e fundação de Salvador (1549)'], explanation: '1500 → pau-brasil → 1534 capitanias → 1549 governo-geral.' }],
      map: { map: 'brasil', prompt: 'Lugares importantes no início da colonização (divisão atual dos estados).', targets: [{ id: 'BA', label: 'Bahia', clue: 'onde a esquadra de Cabral chegou e onde foi fundada Salvador', difficulty: 1 }, { id: 'PE', label: 'Pernambuco', clue: 'capitania de Duarte Coelho, grande produtora de açúcar', difficulty: 2 }, { id: 'SP', label: 'São Paulo', clue: 'onde ficava a vila de São Vicente, fundada em 1532', difficulty: 2 }, { id: 'RJ', label: 'Rio de Janeiro', clue: 'cidade fundada em 1565 que viraria capital em 1763', difficulty: 3 }] },
    },
  },
  'his-independencia-brasil': {
    objective: 'Relacionar a vinda da família real (1808) ao processo de independência, identificar os marcos de 1822 (Dia do Fico e 7 de Setembro) e reconhecer as guerras de independência e o reconhecimento por Portugal em 1825.',
    prerequisites: ['his-brasil-colonia', 'his-revolucao-francesa'], next: ['his-brasil-imperio'],
    variants: {
      b1: { simples: 'A família real veio ao Brasil em 1808 fugindo de Napoleão, e o Brasil ganhou importância.', exemplo: 'A abertura dos portos às nações amigas (1808) permitiu o comércio direto com outros países, sobretudo a Inglaterra.', passos: '1. Causa: invasão de Portugal por Napoleão.\n2. 1808: corte chega ao Rio de Janeiro.\n3. Mudanças: portos abertos, Banco do Brasil, imprensa.\n4. 1815: Reino Unido a Portugal e Algarves.', compara: 'É como se a sede de uma empresa se mudasse para a filial: a filial passa a ser tratada como central.' },
      b2: { simples: 'Portugal mandou Dom Pedro voltar, e ele decidiu ficar no Brasil.', exemplo: '“Se é para o bem de todos e felicidade geral da nação, diga ao povo que fico” — frase atribuída a Dom Pedro em 9/01/1822.', passos: '1. 1821: Dom João VI volta a Portugal.\n2. Cortes exigem a volta de Dom Pedro e querem recolonizar o Brasil.\n3. 9/01/1822: Dom Pedro decide ficar.', compara: 'Ficar foi como recusar a ordem de voltar para casa: um sinal claro de rompimento.' },
      b3: { simples: 'No dia 7 de setembro de 1822, Dom Pedro declarou o Brasil independente.', exemplo: 'O episódio ficou conhecido como o “Grito do Ipiranga”, em São Paulo.', passos: '1. Data: 7/09/1822.\n2. Local: margens do Ipiranga (SP).\n3. Dezembro de 1822: Dom Pedro I coroado imperador.\n4. Forma de governo: monarquia.', compara: 'Diferente de vizinhos que viraram repúblicas, o Brasil se tornou independente mantendo um imperador da própria família real portuguesa.' },
      b4: { simples: 'A independência não foi pacífica: houve guerras, e Portugal só reconheceu em 1825.', exemplo: 'Em 2 de julho de 1823 as tropas portuguesas deixaram Salvador; a data é feriado na Bahia.', passos: '1. Resistência portuguesa na Bahia, Maranhão, Piauí, Pará e Cisplatina.\n2. Vitórias brasileiras até 1823–1824.\n3. 1825: Tratado de reconhecimento, com indenização paga a Portugal.', compara: 'O 7 de setembro foi a declaração; as guerras e o tratado de 1825 foram o que tornou a independência real.' },
    },
    equivalentQuestions: eqsPt(['Independência do Brasil'], ['por que a família real veio para o brasil', 'o que foi o dia do fico', 'o que aconteceu em 7 de setembro de 1822', 'grito do ipiranga', 'quem proclamou a independência', 'independência da bahia 2 de julho', 'quando portugal reconheceu a independência', 'abertura dos portos 1808', 'primeiro imperador do brasil', 'o brasil virou república na independência']),
    commonErrors: ['Achar que a independência foi pacífica e instantânea.', 'Achar que o Brasil virou república em 1822 (virou monarquia).', 'Confundir 1808 (chegada da corte) com 1822 (independência).'],
    sources: [SRC.bncc('História — Anos Finais'), SRC.autoral()],
    history: {
      period: '1808–1825', place: 'Brasil',
      timeline: [{ date: '1808', event: 'Chegada da família real ao Rio de Janeiro e abertura dos portos' }, { date: '1815', event: 'Brasil elevado a Reino Unido a Portugal e Algarves' }, { date: '1821', event: 'Retorno de Dom João VI a Portugal' }, { date: '9 de janeiro de 1822', event: 'Dia do Fico' }, { date: '7 de setembro de 1822', event: 'Proclamação da Independência' }, { date: '2 de julho de 1823', event: 'Independência da Bahia' }, { date: '1825', event: 'Reconhecimento por Portugal' }],
      people: [{ name: 'Dom João VI', role: 'rei de Portugal que trouxe a corte ao Brasil' }, { name: 'Dom Pedro I', role: 'príncipe regente que proclamou a independência' }, { name: 'Maria Leopoldina', role: 'imperatriz que apoiou a ruptura com Portugal' }, { name: 'José Bonifácio', role: 'ministro e articulador político da independência' }],
      causes: ['Vinda da corte e maior autonomia do Brasil', 'Tentativa das Cortes de Lisboa de recolonizar o Brasil', 'Interesses das elites locais'],
      consequences: ['Brasil independente como monarquia', 'Manutenção da escravidão e da estrutura agrária', 'Dívida assumida com o reconhecimento'],
      interpretations: ['Parte dos historiadores destaca o caráter negociado e elitista da independência; outros ressaltam as guerras e a participação popular nas províncias.'],
    },
    games: {
      words: [{ word: 'Ipiranga', clue: 'riacho do 7 de setembro', difficulty: 1 }, { word: 'Fico', clue: 'dia em que Dom Pedro decidiu ficar', difficulty: 1 }, { word: 'imperador', clue: 'título de Dom Pedro I', difficulty: 2 }, { word: 'Napoleão', clue: 'invadiu Portugal em 1807', difficulty: 2 }, { word: 'monarquia', clue: 'forma de governo após 1822', difficulty: 2 }, { word: 'Leopoldina', clue: 'imperatriz que apoiou a independência', difficulty: 3 }],
      sequences: [{ prompt: 'Coloque os fatos da Independência em ordem.', difficulty: 2, items: ['Chegada da família real ao Rio (1808)', 'Brasil elevado a Reino Unido (1815)', 'Dia do Fico (9 de janeiro de 1822)', 'Proclamação da Independência (7 de setembro de 1822)', 'Independência da Bahia (2 de julho de 1823)', 'Reconhecimento por Portugal (1825)'], explanation: '1808 → 1815 → jan/1822 → set/1822 → jul/1823 → 1825.' }],
      map: { map: 'brasil', prompt: 'Lugares ligados à Independência (divisão atual dos estados).', targets: [{ id: 'SP', label: 'São Paulo', clue: 'onde fica o riacho Ipiranga', difficulty: 1 }, { id: 'RJ', label: 'Rio de Janeiro', clue: 'sede da corte a partir de 1808', difficulty: 1 }, { id: 'BA', label: 'Bahia', clue: 'onde a luta terminou em 2 de julho de 1823', difficulty: 2 }, { id: 'MA', label: 'Maranhão', clue: 'província que resistiu e só aderiu em 1823', difficulty: 3 }] },
    },
  },
  'his-segunda-guerra': {
    objective: 'Relacionar a crise do pós-Primeira Guerra à ascensão de regimes totalitários, identificar Eixo e Aliados, reconhecer o Holocausto e os principais marcos do conflito (1939–1945) e a participação brasileira com a FEB.',
    prerequisites: ['his-primeira-guerra', 'his-era-vargas'], next: ['his-guerra-fria'],
    variants: {
      b1: { simples: 'Crise e ressentimento depois da Primeira Guerra ajudaram ditadores como Hitler a chegar ao poder; a guerra começou em 1939.', exemplo: 'O Tratado de Versalhes (1919) impôs perdas e indenizações à Alemanha, e a crise de 1929 piorou o desemprego.', passos: '1. Pós-1918: Tratado de Versalhes e ressentimento alemão.\n2. 1929: crise econômica mundial.\n3. Ascensão do fascismo (Itália) e do nazismo (Alemanha).\n4. 1º/09/1939: Alemanha invade a Polônia.', compara: 'Crise econômica e medo abriram espaço para líderes que prometiam soluções fáceis e culpavam grupos inteiros pelos problemas.' },
      b2: { simples: 'De um lado o Eixo (Alemanha, Itália, Japão); do outro os Aliados (Reino Unido, França, URSS, EUA…).', exemplo: 'Os EUA entraram na guerra depois do ataque japonês a Pearl Harbor, em dezembro de 1941.', passos: '1. Eixo: Alemanha, Itália e Japão.\n2. Aliados: Reino Unido, França, depois URSS (1941) e EUA (1941).\n3. Brasil: Aliados a partir de 1942.', compara: 'A URSS começou com um pacto de não agressão com a Alemanha (1939) e mudou de lado quando foi invadida em 1941.' },
      b3: { simples: 'O nazismo matou cerca de 6 milhões de judeus no Holocausto; a guerra terminou em 1945.', exemplo: 'Auschwitz, na Polônia ocupada, foi o maior campo de extermínio nazista.', passos: '1. Holocausto: perseguição e extermínio de judeus, ciganos e outros grupos.\n2. 1943: derrota alemã em Stalingrado.\n3. 06/1944: Dia D.\n4. 05/1945: rendição alemã; 08–09/1945: bombas atômicas e rendição japonesa.', compara: 'O Holocausto mostra até onde o ódio organizado pelo Estado pode chegar; por isso é lembrado para que nunca se repita.' },
      b4: { simples: 'O Brasil entrou na guerra em 1942 e mandou a FEB lutar na Itália.', exemplo: 'O símbolo da FEB era uma cobra fumando: diziam que era “mais fácil uma cobra fumar” do que o Brasil ir à guerra.', passos: '1. 1942: navios brasileiros afundados por submarinos do Eixo.\n2. Brasil declara guerra ao Eixo.\n3. 1944: FEB embarca para a Itália.\n4. 21/02/1945: vitória em Monte Castelo.', compara: 'Havia uma contradição: o Brasil lutava contra ditaduras na Europa vivendo sob a ditadura do Estado Novo de Vargas.' },
    },
    equivalentQuestions: eqsPt(['Segunda Guerra Mundial'], ['causas da segunda guerra', 'quem eram os países do eixo', 'quem eram os aliados', 'o que foi o holocausto', 'o que foi o dia d', 'quando começou a segunda guerra', 'quando terminou a segunda guerra', 'o que foi a feb', 'monte castelo', 'bombas de hiroshima e nagasaki']),
    commonErrors: ['Achar que a URSS esteve sempre ao lado dos Aliados (houve o pacto de 1939).', 'Esquecer que o Holocausto também atingiu ciganos, pessoas com deficiência e outros grupos.', 'Achar que a guerra terminou na Europa e no Pacífico ao mesmo tempo.'],
    sources: [SRC.bncc('História — Anos Finais'), SRC.web('Enciclopédia do Holocausto', 'https://encyclopedia.ushmm.org/pt', 'Museu Memorial do Holocausto dos Estados Unidos (USHMM)', 'instituicao'), SRC.autoral()],
    history: {
      period: '1939–1945', place: 'Europa, Ásia, África e oceanos',
      timeline: [{ date: '1º de setembro de 1939', event: 'Alemanha invade a Polônia' }, { date: 'junho de 1941', event: 'Alemanha invade a União Soviética' }, { date: 'dezembro de 1941', event: 'Ataque japonês a Pearl Harbor; EUA entram na guerra' }, { date: '1942', event: 'Brasil declara guerra ao Eixo' }, { date: 'fevereiro de 1943', event: 'Derrota alemã em Stalingrado' }, { date: '6 de junho de 1944', event: 'Dia D na Normandia' }, { date: '8 de maio de 1945', event: 'Rendição da Alemanha' }, { date: '2 de setembro de 1945', event: 'Rendição formal do Japão' }],
      people: [{ name: 'Adolf Hitler', role: 'ditador nazista da Alemanha' }, { name: 'Benito Mussolini', role: 'ditador fascista da Itália' }, { name: 'Winston Churchill', role: 'primeiro-ministro do Reino Unido' }, { name: 'Franklin D. Roosevelt', role: 'presidente dos EUA' }, { name: 'Josef Stalin', role: 'líder da União Soviética' }],
      causes: ['Ressentimentos do Tratado de Versalhes', 'Crise econômica de 1929', 'Ascensão de regimes totalitários e expansionistas'],
      consequences: ['Dezenas de milhões de mortos e o Holocausto', 'Criação da ONU (1945)', 'Início da Guerra Fria entre EUA e URSS'],
    },
  },
}
