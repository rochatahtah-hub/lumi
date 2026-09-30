// Atualização das aulas do formato antigo para o formato completo do acervo, SEM reescrever o que já estava bom:
// acrescenta objetivo, trilha (pré-requisito → próximo), reformulações que faltavam, perguntas equivalentes,
// dúvidas e erros comuns, fórmulas, fontes institucionais e material de jogo. O banco guarda a versão anterior.
import type { Block, Formula, Lesson, LessonGames, Source } from '../../types'
import { formula, SRC } from '../dsl'

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
}
