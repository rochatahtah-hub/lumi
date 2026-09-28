import type { Lesson } from '../../types'

const BNCC = { title: 'Base Nacional Comum Curricular (BNCC) — Ciências da Natureza e suas Tecnologias', url: 'http://basenacionalcomum.mec.gov.br/', kind: 'curriculo' } as const
const AUTORAL = { title: 'Conteúdo autoral LUMI', kind: 'autoral' } as const

export const leisDeNewton: Lesson = {
  id: 'fis-leis-de-newton',
  subject: 'fisica',
  title: 'Leis de Newton',
  levels: ['fund2', 'medio'],
  grade: '9º ano e 1ª série',
  aliases: ['leis de newton', 'inercia', 'principio fundamental da dinamica', 'f = m a', 'forca', 'acao e reacao', 'dinamica', 'newton'],
  summary: 'Entenda as três leis que explicam como as forças mudam o movimento dos corpos.',
  intro: 'Por que você vai para a frente quando o ônibus freia? Isaac Newton explicou isso com três leis. Vamos a elas.',
  skills: { inercia: '1ª lei — Inércia', fundamental: '2ª lei — F = m · a', acao_reacao: '3ª lei — Ação e reação', unidades: 'Unidades de medida' },
  blocks: [
    {
      id: 'b1', skill: 'inercia', title: '1ª lei: Inércia',
      text: 'Um corpo tende a manter seu estado: se está parado, continua parado; se está em movimento retilíneo e uniforme, continua assim — a não ser que uma força resultante atue sobre ele.',
      example: 'Quando o ônibus freia de repente, seu corpo "quer" continuar em movimento e é jogado para a frente.',
      variants: {
        simples: 'As coisas são "preguiçosas" para mudar: o que está parado quer ficar parado, e o que está andando quer continuar andando.',
        exemplo: 'Puxe rápido uma toalha de baixo de um copo: o copo tende a ficar no lugar. É a inércia.',
        outra: 'Para mudar o movimento de algo — acelerar, frear ou fazer uma curva — é preciso uma força. Sem força resultante, nada muda.',
        detalhado: 'Inércia é a tendência de um corpo resistir a mudanças na sua velocidade (vetorial). Força resultante nula implica velocidade constante: repouso ou MRU. Quanto maior a massa, maior a inércia.',
      },
    },
    {
      id: 'b2', skill: 'fundamental', title: '2ª lei: F = m · a',
      text: 'A força resultante sobre um corpo é igual à sua massa vezes a aceleração: F = m · a. Com a mesma força, quem tem mais massa acelera menos.',
      example: 'Empurrar um carrinho de supermercado vazio é fácil; cheio, a mesma força gera uma aceleração bem menor.',
      variants: {
        simples: 'Força = massa × aceleração. Mais força → mais aceleração. Mais massa → menos aceleração.',
        exemplo: 'Uma força de 20 N empurra uma caixa de 4 kg: a = F ÷ m = 20 ÷ 4 = 5 m/s².',
        outra: 'Pense na fórmula como uma balança: se a massa dobra e a força é a mesma, a aceleração cai pela metade.',
        detalhado: 'A 2ª lei é vetorial: a aceleração tem a mesma direção e sentido da força resultante. Para calcular a aceleração a partir da variação de velocidade: a = Δv ÷ Δt. Ex.: um carro de 1000 kg vai de 0 a 20 m/s em 10 s → a = 2 m/s² → F = 2000 N.',
      },
    },
    {
      id: 'b3', skill: 'acao_reacao', title: '3ª lei: Ação e reação',
      text: 'Toda ação tem uma reação de mesma intensidade, mesma direção e sentido oposto. As duas forças atuam em corpos diferentes, por isso não se anulam.',
      example: 'Ao nadar, você empurra a água para trás, e a água empurra você para a frente.',
      variants: {
        simples: 'Se você empurra algo, esse algo empurra você de volta com a mesma força.',
        exemplo: 'Um foguete empurra os gases para baixo; os gases empurram o foguete para cima.',
        outra: 'Forças sempre vêm em pares. Se A empurra B, B empurra A. Uma força nunca aparece sozinha.',
        detalhado: 'O par ação-reação atua em corpos diferentes; por isso não faz sentido "somá-los" para dizer que se anulam. Já forças que se equilibram (como peso e normal num livro sobre a mesa) atuam no mesmo corpo e não são par ação-reação.',
      },
    },
    {
      id: 'b4', skill: 'unidades', title: 'Unidades de medida',
      text: 'No Sistema Internacional: força em newton (N), massa em quilograma (kg) e aceleração em metros por segundo ao quadrado (m/s²). 1 N = 1 kg · m/s².',
      example: 'Segurar uma maçã de 100 g exige, aproximadamente, uma força de 1 N.',
      variants: {
        simples: 'Força se mede em newton (N). Massa em kg. Aceleração em m/s².',
        exemplo: 'Se a massa está em gramas, converta para kg antes: 500 g = 0,5 kg.',
        outra: 'O "newton" é uma homenagem a Isaac Newton. 1 N é a força que acelera 1 kg a 1 m/s².',
        detalhado: 'Não confunda massa (kg, quantidade de matéria) com peso (força, em N). Peso P = m · g, com g ≈ 10 m/s² na Terra: uma pessoa de 50 kg pesa cerca de 500 N.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'inercia', prompt: 'Quando o ônibus freia, os passageiros são "jogados" para a frente. Isso é explicado pela:', options: ['Inércia', 'Ação e reação', 'Gravidade', 'Eletricidade'], answer: 0, hints: ['O corpo "quer" continuar como estava.', 'É a 1ª lei.', 'Começa com "I".'], explanation: 'Pela inércia, o corpo tende a manter o movimento que tinha.' },
    { id: 'q2', type: 'mc', difficulty: 1, skill: 'fundamental', prompt: 'Qual é a fórmula da 2ª lei de Newton?', options: ['F = m + a', 'F = m · a', 'F = m ÷ a', 'F = a − m'], answer: 1, hints: ['Relaciona força, massa e aceleração.', 'Envolve multiplicação.', 'Massa vezes aceleração.'], explanation: 'F = m · a.' },
    { id: 'q3', type: 'tf', difficulty: 1, skill: 'acao_reacao', prompt: 'As forças de ação e reação atuam no mesmo corpo e, por isso, se anulam.', answer: false, hints: ['Pense no nadador e na água.', 'Uma força está no nadador, outra na água.', 'São corpos diferentes.'], explanation: 'Falso. Ação e reação atuam em corpos diferentes e não se anulam.' },
    { id: 'q4', type: 'fill', difficulty: 2, skill: 'fundamental', prompt: 'Um corpo de 2 kg tem aceleração de 3 m/s². Qual é a força resultante, em newtons?', answers: ['6', '6 n'], hints: ['Use F = m · a.', 'm = 2, a = 3.', '2 × 3.'], explanation: 'F = 2 · 3 = 6 N.' },
    { id: 'q5', type: 'mc', difficulty: 2, skill: 'fundamental', prompt: 'Uma força de 20 N age sobre uma massa de 4 kg. Qual é a aceleração?', options: ['80 m/s²', '5 m/s²', '16 m/s²', '24 m/s²'], answer: 1, hints: ['Isole a aceleração: a = F ÷ m.', '20 ÷ 4.', 'Quanto é 20 dividido por 4?'], explanation: 'a = 20 ÷ 4 = 5 m/s².' },
    { id: 'q6', type: 'match', difficulty: 2, skill: 'unidades', prompt: 'Ligue cada item à descrição.', pairs: [['1ª lei', 'Inércia'], ['2ª lei', 'F = m · a'], ['3ª lei', 'Ação e reação'], ['Newton (N)', 'Unidade de força']], hints: ['A 1ª fala de "preguiça" para mudar.', 'A 2ª tem uma fórmula.', 'A 3ª fala de pares de forças.'], explanation: '1ª → inércia; 2ª → F = m·a; 3ª → ação e reação; N → unidade de força.' },
    { id: 'q7', type: 'mc', difficulty: 2, skill: 'acao_reacao', prompt: 'Ao nadar, a pessoa empurra a água para trás. O que acontece?', options: ['A água fica parada', 'A água empurra a pessoa para a frente', 'A pessoa afunda', 'Nada, as forças se anulam'], answer: 1, hints: ['Toda ação tem uma reação.', 'A reação tem sentido oposto.', 'Oposto de "para trás"?'], explanation: 'Pela 3ª lei, a água empurra a pessoa para a frente.' },
    { id: 'q8', type: 'tf', difficulty: 2, skill: 'inercia', prompt: 'Um corpo em movimento retilíneo uniforme pode ter força resultante nula.', answer: true, hints: ['O que a 1ª lei diz sobre MRU?', 'Sem força, o movimento se mantém.', 'MRU = velocidade constante.'], explanation: 'Verdadeiro. Com resultante nula, o corpo fica parado ou em MRU.' },
    { id: 'q9', type: 'mc', difficulty: 3, skill: 'fundamental', prompt: 'A mesma força age sobre dois blocos, de 2 kg e de 4 kg. O que se pode dizer das acelerações?', options: ['São iguais', 'A do bloco de 2 kg é o dobro', 'A do bloco de 4 kg é o dobro', 'Nenhum acelera'], answer: 1, hints: ['a = F ÷ m.', 'Mesma força, massas diferentes.', 'Metade da massa → ?'], explanation: 'Com metade da massa, o bloco de 2 kg acelera o dobro.' },
    { id: 'q10', type: 'fill', difficulty: 3, skill: 'unidades', prompt: 'A unidade de força no Sistema Internacional é o ________.', answers: ['newton', 'n'], hints: ['Homenageia um cientista.', 'O mesmo das três leis.', 'Símbolo: N.'], explanation: 'O newton (N).' },
    { id: 'q11', type: 'mc', difficulty: 3, skill: 'fundamental', prompt: 'Um carro de 1000 kg vai de 0 a 20 m/s em 10 s. Qual é a força resultante média?', options: ['200 N', '2000 N', '20000 N', '100 N'], answer: 1, hints: ['Calcule a aceleração primeiro.', 'a = Δv ÷ Δt = 20 ÷ 10.', 'F = 1000 × 2.'], explanation: 'a = 2 m/s² → F = 1000 · 2 = 2000 N.' },
    { id: 'q12', type: 'open', difficulty: 3, skill: 'inercia', prompt: 'Use a 1ª lei de Newton para explicar por que devemos usar o cinto de segurança.', modelAnswer: 'Pela inércia, numa freada brusca o corpo tende a continuar em movimento para a frente. O cinto aplica uma força que segura o corpo e impede que ele seja lançado contra o painel ou o para-brisa.', keywords: ['inercia', 'movimento', 'continuar', 'frente', 'freada', 'forca'], hints: ['O que acontece com o corpo numa freada?', 'Ele tende a continuar…', 'Quem "segura" o corpo?'], explanation: 'O corpo tende a seguir em frente por inércia; o cinto aplica a força que o segura.' },
  ],
  review: ['1ª lei: inércia — sem força resultante, nada muda', '2ª lei: F = m · a', '3ª lei: ação e reação em corpos diferentes', 'Força em newton (N) · massa em kg · aceleração em m/s²'],
  sources: [BNCC, AUTORAL],
}

export const atomoTabela: Lesson = {
  id: 'qui-atomo-tabela',
  subject: 'quimica',
  title: 'Átomo e tabela periódica',
  levels: ['fund2', 'medio'],
  grade: '9º ano e 1ª série',
  aliases: ['atomo', 'tabela periodica', 'protons', 'eletrons', 'neutrons', 'numero atomico', 'numero de massa', 'elementos quimicos', 'familias', 'periodos', 'gases nobres'],
  summary: 'Conheça as partes do átomo, número atômico, número de massa e como a tabela periódica é organizada.',
  intro: 'Tudo o que existe é feito de átomos. E a tabela periódica é o "mapa" que organiza todos os tipos de átomo.',
  skills: { estrutura: 'Estrutura do átomo', numeros: 'Número atômico e de massa', tabela: 'Organização da tabela', classificacao: 'Metais, ametais e gases nobres' },
  blocks: [
    {
      id: 'b1', skill: 'estrutura', title: 'As partes do átomo',
      text: 'O átomo tem um núcleo, com prótons (carga positiva) e nêutrons (sem carga), e uma região ao redor chamada eletrosfera, onde ficam os elétrons (carga negativa).',
      example: 'Quase toda a massa do átomo está no núcleo, mesmo ele sendo muito pequeno em comparação ao átomo inteiro.',
      variants: {
        simples: 'No centro (núcleo): prótons (+) e nêutrons (sem carga). Em volta: elétrons (−).',
        exemplo: 'Se o núcleo fosse do tamanho de uma formiga no meio de um estádio, o átomo inteiro seria o estádio — quase tudo é espaço vazio.',
        outra: 'Um jeito de lembrar: Próton = Positivo. Nêutron = Neutro. Elétron = o que sobra, negativo.',
        detalhado: 'Prótons e nêutrons têm massas parecidas; o elétron tem massa cerca de 1836 vezes menor que a do próton. Por isso a massa se concentra no núcleo. O modelo atual descreve os elétrons em orbitais, regiões de maior probabilidade de encontrá-los.',
      },
    },
    {
      id: 'b2', skill: 'numeros', title: 'Número atômico (Z) e de massa (A)',
      text: 'O número atômico (Z) é a quantidade de prótons e identifica o elemento. O número de massa (A) é a soma de prótons e nêutrons: A = Z + N. Num átomo neutro, o número de elétrons é igual ao de prótons.',
      example: 'O sódio tem Z = 11 e, em geral, 12 nêutrons: A = 11 + 12 = 23.',
      variants: {
        simples: 'Z = número de prótons. A = prótons + nêutrons. Átomo neutro: elétrons = prótons.',
        exemplo: 'O cloro tem A = 35 e Z = 17. Nêutrons: N = 35 − 17 = 18.',
        outra: 'Z é como o "RG" do elemento: todo átomo com 6 prótons é carbono, sempre. Já A pode mudar, porque o número de nêutrons pode variar.',
        detalhado: 'Átomos de um mesmo elemento com números de massa diferentes são isótopos (ex.: carbono-12 e carbono-14). Quando um átomo ganha ou perde elétrons, vira um íon: cátion (+, perdeu elétrons) ou ânion (−, ganhou elétrons).',
      },
    },
    {
      id: 'b3', skill: 'tabela', title: 'Como a tabela é organizada',
      text: 'Os elementos estão em ordem crescente de número atômico. As linhas horizontais são os períodos (7 no total) e as colunas verticais são os grupos ou famílias (18 no total). Elementos da mesma família têm propriedades químicas parecidas.',
      example: 'Lítio, sódio e potássio estão na mesma família (grupo 1) e reagem de forma parecida com a água.',
      variants: {
        simples: 'Linha deitada = período. Coluna em pé = família. Quem está na mesma coluna se parece.',
        exemplo: 'Hélio, neônio e argônio estão na mesma coluna (grupo 18): todos são gases que quase não reagem.',
        outra: 'Pense num prédio: cada andar é um período, e cada coluna de apartamentos "empilhados" é uma família com características em comum.',
        detalhado: 'O período indica o número de camadas eletrônicas; nos elementos representativos, o grupo se relaciona com o número de elétrons na camada de valência — por isso a semelhança química dentro da família.',
      },
    },
    {
      id: 'b4', skill: 'classificacao', title: 'Metais, ametais e gases nobres',
      text: 'A maioria dos elementos é metal (bons condutores de calor e eletricidade, brilhantes). Os ametais ficam à direita da tabela. Os gases nobres (grupo 18), como hélio e neônio, são muito estáveis e quase não reagem.',
      example: 'Ferro, cobre e alumínio são metais. Oxigênio e carbono são ametais. Hélio é gás nobre.',
      variants: {
        simples: 'Metais: brilham e conduzem eletricidade (ferro, cobre). Ametais: do lado direito (oxigênio). Gases nobres: última coluna, quase não reagem.',
        exemplo: 'O fio de cobre conduz eletricidade porque o cobre é metal. O hélio enche balões e não pega fogo porque é gás nobre.',
        outra: 'Olhe a tabela como um mapa: a maior parte do território (esquerda e centro) é dos metais; o cantinho da direita é dos ametais; a última coluna é dos gases nobres.',
        detalhado: 'O hidrogênio fica no grupo 1, mas não é metal. Existem ainda os semimetais (ou metaloides), como silício e germânio, com propriedades intermediárias. A estabilidade dos gases nobres está ligada à camada de valência completa.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'estrutura', prompt: 'Qual partícula do átomo tem carga negativa?', options: ['Próton', 'Nêutron', 'Elétron', 'Núcleo'], answer: 2, hints: ['Próton = positivo.', 'Nêutron = neutro.', 'Sobrou qual?'], explanation: 'O elétron tem carga negativa.' },
    { id: 'q2', type: 'mc', difficulty: 1, skill: 'numeros', prompt: 'O número atômico (Z) indica a quantidade de:', options: ['Nêutrons', 'Prótons', 'Elétrons + nêutrons', 'Camadas'], answer: 1, hints: ['É o "RG" do elemento.', 'Fica no núcleo e tem carga positiva.', 'Pró…'], explanation: 'Z é o número de prótons.' },
    { id: 'q3', type: 'tf', difficulty: 1, skill: 'tabela', prompt: 'As linhas horizontais da tabela periódica se chamam períodos.', answer: true, hints: ['Linha deitada ou coluna em pé?', 'Colunas são famílias.', 'Então as linhas são…'], explanation: 'Verdadeiro. São 7 períodos.' },
    { id: 'q4', type: 'fill', difficulty: 2, skill: 'numeros', prompt: 'Um átomo tem Z = 11 e 12 nêutrons. Qual é o número de massa (A)?', answers: ['23'], hints: ['A = Z + N.', 'Z = 11, N = 12.', '11 + 12.'], explanation: 'A = 11 + 12 = 23 (é o sódio).' },
    { id: 'q5', type: 'mc', difficulty: 2, skill: 'tabela', prompt: 'As colunas verticais da tabela periódica são chamadas de:', options: ['Períodos', 'Grupos ou famílias', 'Camadas', 'Séries'], answer: 1, hints: ['As linhas são períodos.', 'Quem está na mesma coluna "se parece".', 'Como parentes.'], explanation: 'Grupos ou famílias (são 18).' },
    { id: 'q6', type: 'match', difficulty: 2, skill: 'estrutura', prompt: 'Ligue cada parte à sua característica.', pairs: [['Próton', 'Carga positiva, no núcleo'], ['Nêutron', 'Sem carga, no núcleo'], ['Elétron', 'Carga negativa, na eletrosfera'], ['Núcleo', 'Concentra quase toda a massa']], hints: ['Próton = Positivo.', 'Nêutron = Neutro.', 'Os elétrons ficam em volta.'], explanation: 'Próton (+, núcleo), nêutron (0, núcleo), elétron (−, eletrosfera), núcleo (massa).' },
    { id: 'q7', type: 'mc', difficulty: 2, skill: 'classificacao', prompt: 'Qual destes elementos é um gás nobre?', options: ['Oxigênio', 'Sódio', 'Hélio', 'Ferro'], answer: 2, hints: ['Gases nobres quase não reagem.', 'Ficam na última coluna.', 'É usado para encher balões.'], explanation: 'O hélio (He) é um gás nobre.' },
    { id: 'q8', type: 'tf', difficulty: 2, skill: 'numeros', prompt: 'Em um átomo neutro, o número de elétrons é igual ao número de prótons.', answer: true, hints: ['Neutro = cargas se equilibram.', 'Prótons são +, elétrons são −.', 'Quantidades iguais se anulam.'], explanation: 'Verdadeiro. As cargas positivas e negativas se equilibram.' },
    { id: 'q9', type: 'fill', difficulty: 3, skill: 'numeros', prompt: 'Um átomo tem A = 35 e Z = 17. Quantos nêutrons ele tem?', answers: ['18'], hints: ['A = Z + N.', 'Isole o N: N = A − Z.', '35 − 17.'], explanation: 'N = 35 − 17 = 18 (é o cloro-35).' },
    { id: 'q10', type: 'mc', difficulty: 3, skill: 'tabela', prompt: 'Os elementos da tabela periódica atual estão organizados em ordem crescente de:', options: ['Massa', 'Número atômico', 'Nêutrons', 'Descoberta'], answer: 1, hints: ['É o "RG" do elemento.', 'É o número de prótons.', 'É o Z.'], explanation: 'Em ordem crescente de número atômico (Z).' },
    { id: 'q11', type: 'mc', difficulty: 3, skill: 'tabela', prompt: 'Por que os elementos de uma mesma família têm propriedades químicas parecidas?', options: ['Porque têm a mesma massa', 'Porque têm o mesmo número de elétrons na camada de valência', 'Porque foram descobertos juntos', 'Porque têm o mesmo número de nêutrons'], answer: 1, hints: ['Reações químicas envolvem elétrons.', 'Principalmente os da última camada.', 'Essa camada se chama valência.'], explanation: 'Mesma família → mesmo número de elétrons de valência → comportamento químico parecido.' },
    { id: 'q12', type: 'tf', difficulty: 3, skill: 'classificacao', prompt: 'A maioria dos elementos da tabela periódica é metal.', answer: true, hints: ['Olhe para a esquerda e o centro da tabela.', 'Ferro, cobre, ouro, alumínio…', 'Os ametais ficam num canto.'], explanation: 'Verdadeiro. Os metais são a grande maioria.' },
  ],
  review: ['Núcleo: prótons (+) e nêutrons (0) · Eletrosfera: elétrons (−)', 'Z = prótons · A = Z + N', 'Períodos = linhas (7) · Famílias = colunas (18)', 'Maioria metais · Gases nobres no grupo 18'],
  sources: [BNCC, AUTORAL],
}
