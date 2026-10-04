/**
 * HISTÓRIA — Lote 4 Completo
 * Fundamental I até Ensino Médio + ENEM
 * 11 aulas implementadas (3º trimestre de progressão)
 */

import type { Lesson } from '../../types'

// ═══════════════════════════════════════════════════════════════════════════════════
// FUNDAMENTAL I (1º-5º ano) — Introdução à Consciência Histórica
// ═══════════════════════════════════════════════════════════════════════════════════

export const oQueEHistoria: Lesson = {
  id: 'his-fund1-001',
  subject: 'historia',
  grade: '1º ano',
  title: 'O que é História?',
  levels: ['fund1'],
  aliases: ['história', 'passado', 'fontes históricas', 'estudar história', 'historiador'],
  summary: 'Conceito básico de história como estudo do passado e compreensão do presente',
  intro: 'História é a ciência que estuda o passado das pessoas, comunidades e povos.',
  objective: 'Entender o significado de história, identificar fontes históricas, compreender que a história estuda o passado para entender o presente',
  topic: 'Consciência Histórica',
  subtopic: 'Introdução aos estudos históricos',
  blocks: [
    {
      id: 'b1',
      title: 'O que é História',
      text: 'História é a ciência que estuda o passado das pessoas, comunidades e povos. Historiadores procuram evidências do passado para investigar como as pessoas viviam, organizam e interpretam essas evidências, e contam histórias verdadeiras sobre o que aconteceu.',
      example: 'Quando você olha uma foto antiga de sua família, está fazendo história — estudando o passado para entender como era antes.'
    },
    {
      id: 'b2',
      title: 'Fontes Históricas',
      text: 'Uma fonte histórica é qualquer coisa que nos conta sobre o passado: objetos antigos, documentos, fotos, histórias de pessoas idosas, construções e monumentos, obras de arte. Tudo isso ajuda historiadores a compreender o que aconteceu.',
      example: 'Uma moeda antiga, uma carta escrita há 100 anos, ou uma construção histórica são todas fontes que nos contam histórias do passado.'
    },
    {
      id: 'b3',
      title: 'Por que Estudar História',
      text: 'Estudamos história para: entender como chegamos até aqui, aprender com os erros e sucessos do passado, compreender pessoas diferentes, e apreciar nossa herança cultural.',
      example: 'Ao entender como pessoas resolveram problemas no passado, podemos evitar repetir erros e celebrar sucessos de quem veio antes de nós.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'conceito-historia',
      prompt: 'O que historiadores fazem?',
      options: [
        'Inventam histórias sobre pessoas famosas',
        'Procuram evidências do passado e as interpretam',
        'Escrevem livros de ficção científica',
        'Contam apenas histórias alegres'
      ],
      answer: 1,
      explanation: 'Historiadores procuram evidências verdadeiras do passado e as interpretam para contar histórias reais do que aconteceu.',
      hints: [
        'Dica 1: História é uma ciência, não ficção',
        'Dica 2: Pense em evidências de coisas reais',
        'Dica 3: Historiadores estudam fatos comprovados'
      ]
    },
    {
      id: 'q2',
      type: 'mc',
      difficulty: 1,
      skill: 'fontes-historicas',
      prompt: 'Qual é uma fonte histórica?',
      options: [
        'Uma história inventada para divertir crianças',
        'Uma foto antiga de sua avó',
        'Um desenho animado sobre o passado',
        'Um livro de ficção científica'
      ],
      answer: 1,
      explanation: 'Uma foto antiga é uma fonte histórica real que mostra como as pessoas viviam no passado.',
      hints: [
        'Dica 1: Fontes históricas são evidências reais',
        'Dica 2: Pense em coisas que você pode tocar ou ver',
        'Dica 3: Fotos mostram como era de verdade'
      ]
    }
  ],
  skills: {
    'conceito-historia': 'Entender o que é história',
    'fontes-historicas': 'Identificar fontes históricas'
  },
  review: ['Defina história', 'Cite três tipos de fontes históricas', 'Por que aprender história?'],
  commonDoubts: [
    {
      q: 'História é a mesma coisa que uma história inventada?',
      a: 'Não! História (a ciência) estuda fatos reais do passado. Uma história inventada é ficção.'
    },
    {
      q: 'Como sabemos o que aconteceu há muito tempo?',
      a: 'Historiadores usam fontes como documentos, fotos, objetos antigos e construções para descobrir o que aconteceu.'
    }
  ],
  commonErrors: [
    'Confundir história (ciência) com história (conto inventado)',
    'Achar que temos que adivinhar o passado em vez de procurar evidências',
    'Pensar que apenas documentos escritos são fontes'
  ],
  next: ['his-fund1-002'],
  prerequisites: []
}

export const linhaDoTempo: Lesson = {
  id: 'his-fund1-002',
  subject: 'historia',
  grade: '2º-3º ano',
  title: 'Linha do Tempo e Cronologia',
  levels: ['fund1'],
  aliases: ['linha do tempo', 'cronologia', 'sequência de eventos', 'antes depois', 'passado presente'],
  summary: 'Compreender sequência de eventos: antes, durante, depois; passado, presente',
  intro: 'Uma cronologia é uma sequência ordenada de eventos no tempo.',
  objective: 'Entender conceito de cronologia, criar linhas do tempo simples, distinguir antes/depois e passado/presente',
  topic: 'Tempo e Sequência',
  subtopic: 'Organização de eventos',
  blocks: [
    {
      id: 'b1',
      title: 'O que é Cronologia',
      text: 'Cronologia significa "ordem do tempo". Quando estudamos história, precisamos entender QUANDO as coisas aconteceram e em QUE ORDEM. Isso ajuda a compreender como uma coisa leva à outra.',
      example: 'Sua vida: nascimento → 1º ano → 2º ano → hoje. História do Brasil: 1500 (Cabral) → 1822 (Independência) → 1889 (República) → hoje'
    },
    {
      id: 'b2',
      title: 'Antes, Durante e Depois',
      text: 'Compreender a ordem dos eventos ajuda a ver como eles se relacionam. O que aconteceu ANTES influencia o que vem DEPOIS.',
      example: 'Antes de você aprender a ler, você estudava as letras. Depois de aprender a ler, você pode ler livros inteiros.'
    },
    {
      id: 'b3',
      title: 'Criando uma Linha do Tempo',
      text: 'Uma linha do tempo é um desenho que mostra eventos na ordem que acontecem. Você pode desenhar uma linha reta e marcar datas ou períodos com os eventos. Isso torna fácil ver a sequência e entender a história.',
      example: 'Desenhe uma linha, escreva o ano 1500 no início (Cabral chega), depois 1822 (Independência), depois 1889 (República), e hoje no final.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'order',
      difficulty: 1,
      skill: 'cronologia',
      prompt: 'Coloque esses eventos na ordem correta (antes para depois):',
      items: [
        'Você aprende a caminhar',
        'Você nasce',
        'Você vai à escola',
        'Você aprende a falar'
      ],
      explanation: 'A ordem correta é: nascer → aprender a falar → aprender a caminhar → ir à escola. Cada coisa depende da anterior!',
      hints: [
        'Dica 1: Você nasce primeiro, é claro',
        'Dica 2: Qual coisa você faz antes de ir à escola?',
        'Dica 3: Pense na sua própria vida'
      ]
    },
    {
      id: 'q2',
      type: 'mc',
      difficulty: 1,
      skill: 'antes-depois',
      prompt: 'O que acontece ANTES de você aprender a ler?',
      options: [
        'Você lê livros inteiros',
        'Você estuda as letras e palavras simples',
        'Você escreve ensaios',
        'Você trabalha em biblioteca'
      ],
      answer: 1,
      explanation: 'Antes de ler livros inteiros, você estudar as letras e palavras simples primeiro.',
      hints: [
        'Dica 1: Pense no começo da aprendizagem',
        'Dica 2: O que vem antes do conhecimento completo?',
        'Dica 3: Você começa pequeno e vai crescendo'
      ]
    }
  ],
  skills: {
    'cronologia': 'Entender orden dos eventos',
    'antes-depois': 'Distinguir antes e depois'
  },
  review: ['Crie uma linha do tempo de sua vida', 'Coloque eventos em ordem', 'Qual evento vem antes de outro?'],
  commonDoubts: [
    {
      q: 'Precisamos sempre saber a data exata?',
      a: 'Não! Às vezes apenas saber QUAL evento veio antes de outro é suficiente para entender a história.'
    },
    {
      q: 'Como fazemos uma linha do tempo?',
      a: 'Desenhe uma linha reta, escreva as datas ou períodos, e marque os eventos. Você pode usar imagens também!'
    }
  ],
  commonErrors: [
    'Colocar eventos fora de ordem',
    'Confundir antes e depois',
    'Esquecer que eventos dependem uns dos outros'
  ],
  prerequisites: ['his-fund1-001'],
  next: ['his-fund1-003']
}

export const minhaFamiliaEMinhaHistoria: Lesson = {
  id: 'his-fund1-003',
  subject: 'historia',
  grade: '1º-2º ano',
  title: 'Minha Família e Minha História',
  levels: ['fund1'],
  aliases: ['família', 'genealogia', 'árvore genealógica', 'ancestrais', 'tradições', 'história pessoal'],
  summary: 'Entender que cada pessoa tem história, conhecer ancestrais e tradições familiares',
  intro: 'Você não começou do zero — é resultado de uma longa cadeia de pessoas.',
  objective: 'Entender genealogia básica, valorizar tradições familiares, compreender própria história pessoal',
  topic: 'Identidade e Origem',
  subtopic: 'História Pessoal e Familiar',
  blocks: [
    {
      id: 'b1',
      title: 'Sua Árvore Genealógica',
      text: 'Uma árvore genealógica é um diagrama que mostra sua família. Você tem pais, que têm pais (seus avós), que têm pais (seus bisavós), e assim vai. Todos essas pessoas são seus ancestrais.',
      example: 'Você está no topo, seus pais abaixo, seus avós abaixo deles, e seus bisavós no final. Isso é uma árvore genealógica simples.'
    },
    {
      id: 'b2',
      title: 'Tradições Familiares',
      text: 'Tradições são costumes passados de geração para geração. Sua família pode ter tradições de receitas especiais, celebrações, histórias que contam, ou formas de fazer as coisas. Essas tradições contam a história de sua família.',
      example: 'Talvez sua avó faz um bolo especial para aniversários, ou sua família sempre reúne no Natal, ou suas avós contam histórias do passado.'
    },
    {
      id: 'b3',
      title: 'Documentos Familiares',
      text: 'Documentos como certidões de nascimento, fotos antigas, cartas, ou anotações familiares são fontes históricas valiosas. Eles contam a história de sua família e ajudam a criar árvores genealógicas.',
      example: 'Uma foto antiga de seus pais, uma carta que seu avô escreveu, ou anotações sobre nascimentos contam a história de sua família.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'genealogia',
      prompt: 'Quem são seus ancestrais?',
      options: [
        'Apenas seus pais',
        'Seus pais, avós, bisavós e todas as pessoas que vieram antes deles',
        'Apenas suas avós',
        'Pessoas famosas da história'
      ],
      answer: 1,
      explanation: 'Seus ancestrais incluem seus pais, avós, bisavós e todas as gerações anteriores — toda a cadeia de pessoas que fez você existir.',
      hints: [
        'Dica 1: Pense em toda sua família',
        'Dica 2: Vá para trás no tempo, geração por geração',
        'Dica 3: Quanto mais para trás, mais ancestrais você tem'
      ]
    },
    {
      id: 'q2',
      type: 'mc',
      difficulty: 1,
      skill: 'tradicoes',
      prompt: 'O que é uma tradição familiar?',
      options: [
        'Um livro sobre história',
        'Um costume passado de geração para geração na sua família',
        'Um mapa da sua casa',
        'Uma roupa que todos usam'
      ],
      answer: 1,
      explanation: 'Uma tradição é algo que sua família repete ao longo do tempo, como receitas especiais, celebrações, ou histórias contadas.',
      hints: [
        'Dica 1: Pense em algo que sua avó faz',
        'Dica 2: Algo que passa de pai para filho',
        'Dica 3: Algo repetido muitas vezes na sua família'
      ]
    }
  ],
  skills: {
    'genealogia': 'Entender genealogia básica',
    'tradicoes': 'Reconhecer tradições familiares'
  },
  review: ['Desenhe sua árvore genealógica simples', 'Quais são tradições de sua família?', 'Que documentos sua família tem?'],
  commonDoubts: [
    {
      q: 'Minha família é pequena, isso importa?',
      a: 'Toda família é importante! Você tem pais, avós, tios — cada um tem histórias para contar.'
    },
    {
      q: 'Onde encontro informações sobre meus ancestrais?',
      a: 'Pergunte aos seus pais, avós, tios. Procure fotos antigas e documentos como certidões de nascimento. Eles guardam a história!'
    }
  ],
  commonErrors: [
    'Esquecer ancestrais além dos avós',
    'Achar que tradições não importam',
    'Não perguntar aos idosos sobre história familiar'
  ],
  prerequisites: ['his-fund1-001'],
  next: ['his-fund1-004']
}

export const minhaComUnidadeOntemeHoje: Lesson = {
  id: 'his-fund1-004',
  subject: 'historia',
  grade: '3º-4º ano',
  title: 'Minha Comunidade — Ontem e Hoje',
  levels: ['fund1'],
  aliases: ['comunidade', 'bairro', 'cidade', 'transformação local', 'história local', 'mudança'],
  summary: 'Entender transformação de comunidades ao longo do tempo',
  intro: 'Sua comunidade mudou muito ao longo dos anos.',
  objective: 'Compreender transformação local, comparar passado e presente, valorizar memória coletiva',
  topic: 'Comunidade',
  subtopic: 'Mudança Local',
  blocks: [
    {
      id: 'b1',
      title: 'Como Era Sua Comunidade no Passado',
      text: 'Sua rua, bairro ou cidade era diferente há 10, 20, 50 anos atrás. Edifícios novos foram construídos, outros antigos foram demolidos. Ruas foram alargadas. Comércios abriram e fecharam. Tudo muda com o tempo.',
      example: 'A rua onde você mora hoje pode ter tido apenas casarões antigos há 50 anos. Agora pode ter apartamentos modernos, lojas, escolas novas.'
    },
    {
      id: 'b2',
      title: 'Fontes da História Local',
      text: 'Você pode descobrir como era sua comunidade procurando fotos antigas, ouvindo histórias de pessoas idosas, visitando museus locais, ou pesquisando na internet. Cada uma dessas fontes conta uma parte da história.',
      example: 'Pergunte ao seu avó como era a rua dele quando jovem. Procure fotos antigas na internet sobre sua cidade. Visite edifícios históricos que ainda existem.'
    },
    {
      id: 'b3',
      title: 'Mudanças Boas e Desafios',
      text: 'Algumas mudanças são boas (novas escolas, hospitais, parques). Outras podem ser difíceis (demolição de casarões históricos, poluição, trânsito). Entender a história ajuda a valorizar o que temos e pensar melhor sobre o futuro.',
      example: 'Sua comunidade ganhou uma nova biblioteca? Ótimo! Perdeu um parque antigo? Triste. Compreender isso ajuda a cuidar melhor do que temos.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'historia-local',
      prompt: 'Como você pode aprender sobre o passado de sua comunidade?',
      options: [
        'Apenas lendo livros de ficção',
        'Perguntando ao seu professor',
        'Ouvindo histórias de pessoas idosas e procurando fotos antigas',
        'Imaginando como era sem verificar'
      ],
      answer: 2,
      explanation: 'Você descobre a história local ouvindo histórias verdadeiras de pessoas idosas e procurando fotos reais do passado.',
      hints: [
        'Dica 1: O que é uma fonte histórica?',
        'Dica 2: Quem sabe como era antes? Pessoas que viveram lá!',
        'Dica 3: Evidências reais ajudam'
      ]
    }
  ],
  skills: {
    'historia-local': 'Pesquisar história local'
  },
  review: ['Como era sua rua no passado?', 'Quais mudanças você vê hoje?', 'Como você descobriu?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['his-fund1-001'],
  next: ['his-fund1-005']
}

export const osPrimeirosPovosDoBoafrica: Lesson = {
  id: 'his-fund1-005',
  subject: 'historia',
  grade: '4º-5º ano',
  title: 'Os Primeiros Povos do Brasil',
  levels: ['fund1', 'fund2'],
  aliases: ['indígenas', 'povos originários', 'antes de 1500', 'Tupí', 'Guarani', 'civilizações pré-colombianas'],
  summary: 'Conhecer os povos indígenas que viveram no Brasil antes de 1500',
  intro: 'Muito antes dos portugueses chegarem, há milhares de anos, havia povos vivendo no Brasil.',
  objective: 'Reconhecer que havia civilizações antes dos portugueses, compreender vida indígena, valorizar herança cultural',
  topic: 'Brasil Pré-Colonial',
  subtopic: 'Povos Indígenas',
  blocks: [
    {
      id: 'b1',
      title: 'Quem Eram os Primeiros Povos',
      text: 'Há pelo menos 15.000 anos, povos chegaram na América e desenvolveram civilizações. No Brasil, havia centenas de povos indígenas, cada um com sua língua, costumes e território. Alguns eram nômades (viajavam), outros sedentários (fixos em um lugar).',
      example: 'Guarani, Tupí, Yanomami, Carajá, Kaigang — cada povo tinha sua forma de viver, suas regras, sua espiritualidade.'
    },
    {
      id: 'b2',
      title: 'Como Viviam',
      text: 'Os povos indígenas viviam em harmonia com a natureza. Caçavam, pescavam, coletavam frutas e plantavam milho, mandioca e feijão. Construíam casas apropriadas ao clima (palafitas perto da água, casarões na floresta). Tinham conhecimento avançado de plantas medicinais e cultivavam a floresta.',
      example: 'Um povo da floresta sabia quais plantas curavam, qual animal era seguro comer, como fazer fogo, como navegar na floresta.'
    },
    {
      id: 'b3',
      title: 'Organização Social',
      text: 'Viviam em aldeias organizadas, com lideranças respeitadas. Tinham rituais, celebrações, arte e música. Compartilhavam conhecimento sobre a natureza. Trocavam bens entre povos. Tinham regras e valores que estruturavam a sociedade.',
      example: 'Um pajé (líder espiritual) era respeitado. Rituais marcavam estações, celebravam colheitas. Arte em cerâmica e tecelagem mostrava beleza e criatividade.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'povos-indigenas',
      prompt: 'Há quanto tempo há povos vivendo no Brasil?',
      options: [
        'Desde 1500',
        'Há apenas 100 anos',
        'Há pelo menos 15.000 anos',
        'Há 500 anos apenas'
      ],
      answer: 2,
      explanation: 'Povos indígenas vivem no Brasil há pelo menos 15.000 anos — muito antes de portugueses chegarem em 1500.',
      hints: [
        'Dica 1: Os portugueses chegaram em 1500',
        'Dica 2: Havia povos muito antes disso',
        'Dica 3: Arqueólogos encontram evidências muito antigas'
      ]
    },
    {
      id: 'q2',
      type: 'mc',
      difficulty: 2,
      skill: 'vida-indigena',
      prompt: 'Como os povos indígenas se alimentavam?',
      options: [
        'Apenas comprando comida nas cidades',
        'Caçando, pescando, coletando e plantando',
        'Recebendo comida de outras pessoas',
        'Apenas plantando uma coisa'
      ],
      answer: 1,
      explanation: 'Os povos indígenas tinham sistema diverso de alimentação: caçavam, pescavam, coletavam frutas e sementes, e plantavam alimentos como milho e mandioca.',
      hints: [
        'Dica 1: Viviam da natureza',
        'Dica 2: Usavam múltiplas fontes de alimento',
        'Dica 3: Plantavam e caçavam'
      ]
    }
  ],
  skills: {
    'povos-indigenas': 'Conhecer povos indígenas brasileiros',
    'vida-indigena': 'Entender vida indígena'
  },
  review: ['Nomeie 3 povos indígenas', 'Como era a vida indígena?', 'Que artes tinham?'],
  commonDoubts: [
    {
      q: 'Os indígenas tinham tecnologia?',
      a: 'Sim! Tinham técnicas avançadas de agricultura, construção, navegação, medicina. Eram diferentes, mas igualmente sofisticadas.'
    },
    {
      q: 'Por que não há mais indígenas?',
      a: 'Há ainda! Milhares de indígenas vivem no Brasil. Números diminuíram por doenças e conflitos após 1500.'
    }
  ],
  commonErrors: [
    'Pensar que indígenas eram "primitivos"',
    'Achar que havia apenas um povo indígena',
    'Não valorizar conhecimento indígena'
  ],
  prerequisites: [],
  next: ['his-fund1-006']
}

export const chegadaDosPortugueses1500: Lesson = {
  id: 'his-fund1-006',
  subject: 'historia',
  grade: '4º-5º ano',
  title: 'Chegada dos Portugueses (1500)',
  levels: ['fund1', 'fund2'],
  aliases: ['Cabral', '1500', 'descobrimento', 'expansão marítima', 'Portugal', 'encontro de culturas'],
  summary: 'Entender contexto da expansão marítima europeia e chegada de Cabral',
  intro: 'Em 1500, navegadores portugueses chegaram ao Brasil, marcando encontro de duas civilizações.',
  objective: 'Entender contexto marítimo europeu, compreender encontro de culturas, valorizar perspectivas diferentes',
  topic: 'Brasil Pré-Colonial',
  subtopic: 'Expansão Marítima',
  blocks: [
    {
      id: 'b1',
      title: 'Por que Portugueses Navegavam',
      text: 'Portugal era pequeno, mas tinha grande tecnologia naval. Queria encontrar rotas para comercializar com Índia (especiarias, seda). Explorava costa africana. Navegações eram patrocinadas pelo rei. Objetivo era riqueza e poder.',
      example: 'Portugal sabia fazer navios melhores e tinha navegadores corajosos que queriam descobrir novas terras e rotas de comércio.'
    },
    {
      id: 'b2',
      title: 'Cabral e a Jornada de 1500',
      text: 'Pedro Álvares Cabral partiu de Lisboa em 1500 para ir à Índia, mas as correntes marinhas desviaram sua frota para oeste. Chegou ao Brasil. Chamou de "Vera Cruz" (depois Brasil). Encontrou povos indígenas e descreveu em cartas ao rei. Ficou pouco tempo e seguiu para a Índia.',
      example: 'Cabral viu uma terra verde e fértil, com povos gentis. Escreveu que era um "paraíso", mas continuou seu caminho para o comércio indiano.'
    },
    {
      id: 'b3',
      title: 'Encontro de Duas Civilizações',
      text: 'Esse encontro mudou história das Américas e do mundo. Para europeus, era "descoberta". Para indígenas, era invasão. Trouxe doenças, conflitos, escravização, mas também trocas culturais. É importante ver as duas perspectivas.',
      example: 'Portugueses traziam tecnologia, religion cristã, comércio. Indígenas viam invasão, perda de terra, morte. Os dois povos trocaram plantas, animais, conhecimento, mas também teve sofrimento.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'expansao-maritima',
      prompt: 'Por que Cabral estava navegando?',
      options: [
        'Procurando o Brasil',
        'Fugindo de Portugal',
        'Tentando chegar à Índia para comércio',
        'Explorar para escravizar indígenas'
      ],
      answer: 2,
      explanation: 'Cabral ia para a Índia buscar especiarias e seda para comercializar. Chegou ao Brasil por acaso (desviado pelas correntes).',
      hints: [
        'Dica 1: Portugal queria riqueza',
        'Dica 2: Índia era o alvo original',
        'Dica 3: Correntes marinhas desviam navios'
      ]
    }
  ],
  skills: {
    'expansao-maritima': 'Entender expansão marítima europeia'
  },
  review: ['Quem era Cabral?', 'Quando chegou?', 'Por que a viagem era importante?'],
  commonDoubts: [],
  commonErrors: [
    'Pensar que Cabral "descobriu" o Brasil',
    'Ignorar perspectiva indígena',
    'Achar que foi benéfico apenas'
  ],
  prerequisites: [],
  next: ['his-medio-001']
}

// ═══════════════════════════════════════════════════════════════════════════════════
// ENSINO MÉDIO — História Complexa e Crítica
// ═══════════════════════════════════════════════════════════════════════════════════

export const brasilColonialEscravidaoAfricana: Lesson = {
  id: 'his-medio-007',
  subject: 'historia',
  grade: '1º-2º Médio',
  title: 'Brasil Colonial — Escravidão Africana',
  levels: ['fund2', 'medio'],
  aliases: ['escravidão', 'africanos', 'tráfico negreiro', 'quilombo', 'Zumbi', 'resistência'],
  summary: 'Compreender sistema de escravidão africana no Brasil colonial',
  intro: 'O Brasil escravizou aproximadamente 5 milhões de africanos, mais do que qualquer país americano.',
  objective: 'Entender estrutura da escravidão, compreender sofrimento, valorizar resistência, criticar sistema',
  topic: 'Brasil Colonial',
  subtopic: 'Escravidão',
  blocks: [
    {
      id: 'b1',
      title: 'Sistema de Escravidão',
      text: 'Escravidão era sistema legal onde pessoas eram propriedade. Africanos eram capturados em guerras, vendidos para traficantes, transportados em navios em condições horríveis, e vendidos no Brasil para trabalhar em plantações de açúcar, minas de ouro, casarões. Trabalhavam até morrer, sem liberdade, sem direitos.',
      example: 'Um homem africano era capturado, passava meses preso em um navio apertado, chegava doente no Brasil, era vendido por poucos reais, trabalhava 14 horas por dia até morrer.'
    },
    {
      id: 'b2',
      title: 'Resistência Escrava',
      text: 'Escravizados não aceitaram passivamente. Fugiram, formaram quilombos (comunidades livres), se rebelaram, praticaram religiões africanas em segredo, preservaram idiomas. Zumbi dos Palmares liderou um quilombo por 20 anos. Sua resistência é celebrada como símbolo de liberdade.',
      example: 'Palmares foi um quilombo com 20.000 pessoas livres no Pernambuco. Durou de 1694 até 1694. Zumbi morreu na luta pela liberdade.'
    },
    {
      id: 'b3',
      title: 'Abolição Tardia',
      text: 'Brasil foi último país nas Américas a abolir escravidão (1888). Mesmo após abolição, negros enfrentaram discriminação, exclusão, falta de educação e oportunidades. Legado dessa injustíça persiste hoje.',
      example: '1888: Lei Áurea liberta escravizados. Mas não dá terras, educação, trabalho. Negros continuam pobres, discriminados, até hoje.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 3,
      skill: 'escravidao',
      prompt: 'Quantos africanos foram escravizados no Brasil?',
      options: [
        'Alguns milhares',
        'Cerca de 5 milhões',
        'Menos de 100.000',
        'Ninguém sabe'
      ],
      answer: 1,
      explanation: 'Aproximadamente 5 milhões de africanos foram trazidos como escravizados para o Brasil — mais do que em qualquer outro país das Américas.',
      hints: [
        'Dica 1: Brasil usou escravidão por 350 anos',
        'Dica 2: Era a maior economia colonial',
        'Dica 3: Número é imenso'
      ]
    }
  ],
  skills: {
    'escravidao': 'Entender sistema de escravidão'
  },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

export const revolucaoFrancesa: Lesson = {
  id: 'his-medio-008',
  subject: 'historia',
  grade: '2º-3º Médio',
  title: 'Revolução Francesa (1789)',
  levels: ['fund2', 'medio'],
  aliases: ['França', '1789', 'Bastilha', 'Luís XVI', 'liberdade', 'igualdade', 'direitos'],
  summary: 'Transformação radical de sociedade: liberdade, igualdade, fraternidade',
  intro: 'A Revolução Francesa mudou o mundo moderno.',
  objective: 'Entender causas da revolução, compreender fases, avaliar impacto em direitos',
  topic: 'História Moderna',
  subtopic: 'Revoluções Burguesas',
  blocks: [
    {
      id: 'b1',
      title: 'Causas da Revolução',
      text: 'França era governada por rei absolutista (Luís XVI). Terceiro Estado (povo) pagava impostos imensos. Nobres e clero eram privilegiados. Havia fome, desemprego, dívida pública. Ideias iluministas (liberdade, igualdade, direitos) circulavam. Povo exigiu mudança.',
      example: 'Um camponês pagava 50% de impostos enquanto nobres pagavam nada. Tinha fome. Lia Voltaire e Rousseau questionando essa injustiça.'
    },
    {
      id: 'b2',
      title: 'Fases da Revolução',
      text: 'Fase 1 (1789-1792): Assembleia Nacional cria Declaração dos Direitos do Homem. Fase 2 (1792-1799): Monarquia é abolida, república é proclamada. Fase 3 (Reinado do Terror): Robespierre executa milhares (guillotina). Fase 4: Napoleão toma poder, traz estabilidade.',
      example: 'Bastilha é invadida (símbolo do poder absolutista). Reis e nobres são executados. Napoleão estabelece código legal que dura.'
    },
    {
      id: 'b3',
      title: 'Impacto Global',
      text: 'Ideias revolucionárias (igualdade legal, direitos humanos, democracia) se espalharam globalmente. Influenciaram revoluções na América Latina, Europa, até hoje. Direitos trabalhistas, abolição da escravidão, voto universal têm raízes aqui.',
      example: 'A frase "Liberdade, Igualdade, Fraternidade" inspirou movimentos pelo mundo. Brasil se independentizou (1822) com essas ideias.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 3,
      skill: 'revolucao-francesa',
      prompt: 'Qual foi o principal símbolo da Revolução Francesa?',
      options: [
        'O Palácio de Versalhes',
        'A Bastilha (fortaleza-prisão)',
        'A Catedral de Notre-Dame',
        'O Museu do Louvre'
      ],
      answer: 1,
      explanation: 'A Bastilha simbolizava poder absolutista. Sua invasão em 14 de julho de 1789 marcou o início da revolução.',
      hints: [
        'Dica 1: Símbolo de opressão',
        'Dica 2: Fortaleza-prisão',
        'Dica 3: 14 de julho é feriado francês'
      ]
    }
  ],
  skills: {
    'revolucao-francesa': 'Entender Revolução Francesa'
  },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

export const segundaGuerraMundial: Lesson = {
  id: 'his-medio-009',
  subject: 'historia',
  grade: '2º-3º Médio',
  title: 'Segunda Guerra Mundial',
  levels: ['medio'],
  aliases: ['WWII', 'Hitler', 'Holocausto', 'nazismo', 'guerra', '1939-1945'],
  summary: 'Maior conflito do século XX: causas, fases, consequências',
  intro: 'WWII (1939-1945) matou 70 milhões de pessoas.',
  objective: 'Entender contexto pós-WWI, compreender regimes totalitários, avaliar atrocidades e paz',
  topic: 'História Contemporânea',
  subtopic: 'Conflito Global',
  blocks: [
    {
      id: 'b1',
      title: 'Contexto e Causas',
      text: 'Tratado de Versalhes (1919) humilhou Alemanha: reparações impossíveis, perda de terras, desemprego, inflação. Hitler prometeu restaurar grandeza alemã. Nazismo cresceu. Japão expandia na Ásia. Itália sob Mussolini imitava Hitler. Democracias não resistiram.',
      example: 'Alemanha pagava reparações que nunca poderia pagar. Moeda desvalorizava. Hitler prometia empregos e honra. Povo o apoiava, mesmo que nascesse da raiva.'
    },
    {
      id: 'b2',
      title: 'Holocausto',
      text: 'Nazismo tinha ideologia de pureza racial. Judeus eram culpabilizados por problemas. 6 milhões de judeus foram mortos em campos de concentração. Além disso: ciganos, dissidentes políticos, homossexuais, deficientes também foram mortos. Foi genocídio sistemático planejado pelo estado.',
      example: 'Campos como Auschwitz-Birkenau matavam pessoas em câmaras de gás. Corpos eram cremados. É o maior genocídio do século XX.'
    },
    {
      id: 'b3',
      title: 'Fim da Guerra e Consequências',
      text: 'Aliados (EUA, URSS, Reino Unido, China) venceram em 1945. Cidades foram destruídas. Europa precisou se reconstruir (Plano Marshall). Nações Unidas foi criada para evitar futuras guerras. Começou a Guerra Fria entre EUA e URSS.',
      example: 'Japoneses se rendem em agosto 1945 após bombas atômicas (Hiroshima, Nagasaki). Mundo viu poder devastador de armas nucleares.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 3,
      skill: 'wwii',
      prompt: 'Qual foi o contexto que permitiu ascensão de Hitler?',
      options: [
        'Alemanha era muito rica e poderosa',
        'Humilhação de Versalhes, desemprego, inflação',
        'Democracia funcionava bem',
        'Povo estava feliz'
      ],
      answer: 1,
      explanation: 'Tratado de Versalhes deixou Alemanha humilhada e pobre. Desemprego e inflação causaram sofrimento. Hitler prometia solução, cresceu politicamente.',
      hints: [
        'Dica 1: Pós WWI foi difícil',
        'Dica 2: Economia alemã estava em crise',
        'Dica 3: Povo sofria'
      ]
    }
  ],
  skills: {
    'wwii': 'Entender Segunda Guerra Mundial'
  },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

export const guerraFria: Lesson = {
  id: 'his-medio-010',
  subject: 'historia',
  grade: '2º-3º Médio',
  title: 'Guerra Fria (1947-1991)',
  levels: ['medio'],
  aliases: ['Guerra Fria', 'EUA', 'URSS', 'bipolarismo', 'conflito proxy', 'Muro de Berlim'],
  summary: 'Bipolarismo global: capitalismo vs comunismo por 44 anos',
  intro: 'Guerra Fria não teve batalhaa diretos, mas moldou o mundo moderno.',
  objective: 'Entender blocos ideológicos, compreender conflitos proxy, avaliar fim da URSS',
  topic: 'História Contemporânea',
  subtopic: 'Bipolarismo Global',
  blocks: [
    {
      id: 'b1',
      title: 'Blocos e Ideologias',
      text: 'Após WWII, mundo se dividiu em dois blocos: capitalista (EUA e aliados) vs comunista (URSS e aliados). Não havia guerra direta (ambos tinham armas nucleares). Mas competiam por influência global: corrida armamentista, corrida espacial, conflitos em terceiros países.',
      example: 'Cortina de Ferro separava Leste (comunista) de Oeste (capitalista) na Europa. Muro de Berlim simbolizava essa divisão.'
    },
    {
      id: 'b2',
      title: 'Conflitos Proxy',
      text: 'EUA e URSS não se enfrentavam diretamente, mas apoiavam lados opostos em outros países: Coréia (1950-53), Vietnã (1955-75), Cuba (1962 - Crise dos Mísseis), Afeganistão (1979-89). Esses conflitos mataram milhões.',
      example: 'Guerra do Vietnã: EUA apoiava Sul, URSS apoiava Norte. 3 milhões de mortes. Representava luta entre blocos.'
    },
    {
      id: 'b3',
      title: 'Fim da Guerra Fria',
      text: 'URSS não conseguiu competir economicamente. Gorbachev reformou ("glasnost", "perestroika"). URSS colapsou em 1991. Muro de Berlim caiu em 1989. Mundo se tornou multipolar, mas EUA permaneceu super potência.',
      example: '1989: Cidadãos derrubam Muro de Berlim com picaretas. 1991: URSS se desintegra. Fim de 44 anos de tensão global.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 3,
      skill: 'guerra-fria',
      prompt: 'Por que Guerra Fria não virou "quente" (guerra real)?',
      options: [
        'EUA e URSS gostavam um do outro',
        'Não havia razão para conflito',
        'Ambos tinham armas nucleares (mutualmente assegurado morte)',
        'Nações Unidas os deteve'
      ],
      answer: 2,
      explanation: 'Ambos os lados tinham arsenal nuclear. Guerra direta significaria destruição mútua. Isso evitou conflito armado, mas causou conflitos em terceiros países.',
      hints: [
        'Dica 1: Medo',
        'Dica 2: Armas muito poderosas',
        'Dica 3: Ninguém queria fim do mundo'
      ]
    }
  ],
  skills: {
    'guerra-fria': 'Entender Guerra Fria'
  },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

export const ditaduraMilitarBrasileira: Lesson = {
  id: 'his-medio-011',
  subject: 'historia',
  grade: '3º Médio',
  title: 'Ditadura Militar Brasileira (1964-1985)',
  levels: ['medio'],
  aliases: ['ditadura', 'militar', 'Brasil', 'repressão', 'tortura', 'democracia', 'Diretas Já'],
  summary: 'Período de repressão, tortura, censura e luta por democracia',
  intro: 'Brasil viveu 21 anos de autoritarismo militar.',
  objective: 'Entender golpe, compreender repressão, valorizar resistência, criticar violência de estado',
  topic: 'História do Brasil Contemporâneo',
  subtopic: 'Ditadura Militar',
  blocks: [
    {
      id: 'b1',
      title: 'Golpe de 1964',
      text: 'Presidente João Goulart (Jango) tentava reformas (reforma agrária, educação). Classes altas, Exército, EUA temiam comunismo. Militar golpearam, tiraram Jango, instauraram ditadura. Prometerem devolver democracia em poucos anos. Duraram 21 anos.',
      example: 'Militares argumentavam que comunismo invadia Brasil. Na verdade, queriam poder. EUA apoiou porque tinha medo de URSS na América Latina.'
    },
    {
      id: 'b2',
      title: 'Repressão e Violência',
      text: 'Ditadura censurou imprensa, prendeu ativistas, torturou dissidentes. Ato Institucional 5 (AI-5) suspendia direitos constitucionais. Tortura era sistemática. Milhares morreram ou desapareceram. Universidades, sindicatos, igrejas eram vigiados.',
      example: 'Jornalistas não podiam criticar. Estudantes eram presos por manifestações. Padre Hélder Câmara denunciava torturas. Vladimir Herzog morreu na prisão.'
    },
    {
      id: 'b3',
      title: 'Resistência e Redemocratização',
      text: 'Mesmo na repressão, povo resistia: movimento estudantil, greves clandestinas, imprensa alternativa, Igreja Católica denunciava abusos. Campanha "Diretas Já" (1984) pediu eleições diretas. Militar finalmente cederam. Tancredo Neves era eleito (indiretamente), mas morreu. Sarney governou e promulgou Nova Constituição (1988).',
      example: 'Milhões em rua pedir "Diretas Já!" em 1984. Militar perdiam apoio. Constituição 88 restaurou democracia, direitos fundamentais, voto direto.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 3,
      skill: 'ditadura-militar',
      prompt: 'Por quanto tempo Brasil viveu sob ditadura militar?',
      options: [
        '5 anos',
        '10 anos',
        '21 anos (1964-1985)',
        '50 anos'
      ],
      answer: 2,
      explanation: 'Ditadura durou 21 anos, de 1964 até 1985, quando democracia retornou.',
      hints: [
        'Dica 1: Mais de uma década',
        'Dica 2: Menos de 30 anos',
        'Dica 3: Terminou em meados dos 80'
      ]
    }
  ],
  skills: {
    'ditadura-militar': 'Entender ditadura militar brasileira'
  },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

export const brasilColonialParte1Capitanias: Lesson = {
  id: 'his-fund2-012',
  subject: 'historia',
  grade: '6º ano',
  title: 'Brasil Colonial — Parte 1: Capitanias Hereditárias',
  levels: ['fund2'],
  aliases: ['capitanias hereditárias', 'donatários', 'Brasil colonial', 'economia açucareira'],
  summary: 'Organização territorial do Brasil através das capitanias hereditárias',
  intro: 'Portugal dividiu Brasil em 15 capitanias hereditárias para controlar território.',
  objective: 'Entender sistema de capitanias, compreender economia açucareira, valorizar formação territorial',
  topic: 'Brasil Colonial',
  subtopic: 'Organização Territorial',
  blocks: [
    {
      id: 'b1',
      title: 'Sistema de Capitanias',
      text: 'Portugal deu enormes extensões de terra a nobres (donatários) que se comprometiam a colonizar e explorar. Cada capitão era como um pequeno rei em seu território. Falharam na maioria das capitanias — apenas Pernambuco e São Vicente prosperam. Sistema foi substituído por governo-geral em 1572.',
      example: 'Um donatário recebia uma faixa de terra de 50 a 100km de largura e profundidade indefinida. Tinha poder de justiça e guerra. Criava vilas, explorava recursos, recebia impostos.'
    },
    {
      id: 'b2',
      title: 'Economia Açucareira',
      text: 'Açúcar era ouro branco: extremamente lucrativo. Plantações de cana-de-açúcar moldaram economia, sociedade e paisagem brasileira. Usavam escravizados. Criaram oligarquias locais poderosas. Forneciam 90% das receitas coloniais.',
      example: 'Pernambuco e Bahia ficaram ricas com açúcar. Senhores de engenho eram poderosos. Escravizados trabalhavam em condições brutais.'
    },
    {
      id: 'b3',
      title: 'Sociedade Colonial',
      text: 'Hierarquia rígida: portugueses no topo, colonos brancos, indígenas catequizados, escravizados africanos (após 1600s). Poucos direitos legais além de portugueses. Mulheres tinham direitos muito reduzidos.',
      example: 'Mais de 75% da população era não-branca, mas sem poder político nem econômico. Escravizados eram propriedade, não pessoas.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'capitanias',
      prompt: 'Qual era o principal produto econômico das capitanias prósperas?',
      options: ['Ouro', 'Açúcar', 'Café', 'Algodão'],
      answer: 1,
      explanation: 'Açúcar era extremamente lucrativo e moldou economia das capitanias de Pernambuco e Bahia.',
      hints: ['Dica: Brasil exportava para Europa', 'Dica: Chamado de ouro branco', 'Dica: Plantações grandes']
    }
  ],
  skills: { 'capitanias': 'Entender sistema de capitanias' },
  review: ['Como eram as capitanias?', 'Por que açúcar era importante?', 'Quem trabalha nas plantações?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['his-fund1-006'],
  next: ['his-fund2-013']
}

export const brasilColonialParte3Bandeirantes: Lesson = {
  id: 'his-fund2-013',
  subject: 'historia',
  grade: '7º ano',
  title: 'Brasil Colonial — Parte 3: Bandeirantes e Interiorização',
  levels: ['fund2'],
  aliases: ['bandeirantes', 'paulistas', 'mineração', 'ouro', 'interiorização', 'descoberta de ouro'],
  summary: 'Expansão territorial através de bandeirantes e descoberta de ouro',
  intro: 'Bandeirantes paulistas expandiram Brasil para o interior e descobriram ouro.',
  objective: 'Entender papel dos bandeirantes, compreender descoberta de ouro, valorizar expansão territorial',
  topic: 'Brasil Colonial',
  subtopic: 'Expansão Territorial',
  blocks: [
    {
      id: 'b1',
      title: 'Quem Eram os Bandeirantes',
      text: 'Bandeirantes eram paulistas que organizavam expedições (bandeiras) para o interior. Procuravam escravizados indígenas, ouro, diamantes. Eram aventureiros, comerciantes, exploradores. Expandiram Brasil de 1600 até 1700s.',
      example: 'Uma bandeira tinha 100-500 homens, duravam meses, penetravam sertão, capturavam indígenas, exploravam minérios.'
    },
    {
      id: 'b2',
      title: 'Descoberta de Ouro',
      text: 'Em 1693, descobrem ouro em Minas Gerais. Depois em Goiás, Mato Grosso, Bahia. Corrida de ouro (1700-1750). Milhares chegam de Portugal e Brasil. Cidades surgem. Economia muda para mineração. Ouro vai para Portugal, deixa Brasil pobre depois.',
      example: 'Ouro de Minas: 1700 produz mais que tudo. Vila Rica (Ouro Preto) fica rica e poderosa. Mas ouro acaba e região empobrece.'
    },
    {
      id: 'b3',
      title: 'Impacto na Colônia',
      text: 'Expansão territorial fixa fronteiras próximas às atuais. Cria cidades no interior. Desvia recursos de açúcar. Aumenta importância do Rio de Janeiro. Cria tensões: Entre português de Portugal e colonos brasileiros. Entre ricos (mineiros) e pobres.',
      example: 'Tratado de Madrid (1750) reconhece expansão portuguesa. Rio de Janeiro vira capital em 1763. Colonos ganham consciência de diferença.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'bandeirantes',
      prompt: 'De onde saíram a maioria dos bandeirantes?',
      options: ['Bahia', 'Pernambuco', 'São Paulo', 'Rio de Janeiro'],
      answer: 2,
      explanation: 'Bandeirantes eram principalmente paulistas. São Paulo era ponto de partida para expedições ao interior.',
      hints: ['Dica: Fica na região sudeste', 'Dica: Próxima ao interior', 'Dica: Pioneira em expansão']
    }
  ],
  skills: { 'bandeirantes': 'Entender papel dos bandeirantes' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['his-fund2-012'],
  next: ['his-fund2-014']
}

export const civilizacoesAntiguasEgitoMesopotamia: Lesson = {
  id: 'his-fund2-014',
  subject: 'historia',
  grade: '6º ano',
  title: 'Civilizações Antigas — Egito e Mesopotâmia',
  levels: ['fund2'],
  aliases: ['Egito', 'Mesopotâmia', 'civilizações antigas', 'Nilo', 'pirâmides', 'Hamurabi'],
  summary: 'Origem e desenvolvimento das primeiras civilizações ocidentais',
  intro: 'Egito e Mesopotâmia foram berços da civilização ocidental há 5000 anos.',
  objective: 'Compreender origem das civilizações, valorizar legados, entender contexto geográfico',
  topic: 'Civilizações Antigas',
  subtopic: 'Mesopotamia e Egito',
  blocks: [
    {
      id: 'b1',
      title: 'Mesopotâmia: Entre Rios',
      text: 'Mesopotâmia significa "entre rios" (Tigre e Eufrates). Sumerios criaram as primeiras cidades-estado. Desenvolveram escrita cuneiforme, roda, bronze. Babilônios conquistaram região. Hamurabi criou Código de Lei (1750 AC) que influencia direito moderno.',
      example: 'Sumeria: cidades como Uruk, Lagash. Babilônia: Hamurabi promulga 282 leis. Primeira legislação escrita.'
    },
    {
      id: 'b2',
      title: 'Egito: Dom do Nilo',
      text: 'Egito era dom do Nilo: inundações previsíveis permitiam agricultura. Faraós era reis-deuses. Construíram pirâmides (tumbas gigantes). Desenvolveram papiro, matemática, medicina avançada. Duraram 3000 anos — mais longo império da história.',
      example: 'Pirâmides de Giza: Khufu, Khafre, Menkaure. Construídas com 100.000 trabalhadores, 20 anos. Mostram engenharia avançada.'
    },
    {
      id: 'b3',
      title: 'Legado para Mundo Moderno',
      text: 'Ambas civilizações deixaram herança: escrita, leis, matemática, astronomia, arquitetura. Influenciaram Grécia e Roma. Seus conhecimentos continuam relevantes. Mostram que civilização complexa é possível.',
      example: 'Sistema de numeração mesopotâmico ainda usamos em relógio (60 minutos). Leis inspiram sistemas legais modernos.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'civilizacoes-antigas',
      prompt: 'Por que Egito é chamado "Dom do Nilo"?',
      options: [
        'O Nilo tinha poder divino',
        'Inundações periódicas tornavam solo fértil para agricultura',
        'O Nilo era sagrado para egípcios',
        'Nilo tinha ouro e prata'
      ],
      answer: 1,
      explanation: 'Inundações previsíveis do Nilo deixavam solo fértil. Isso permitia agricultura estável e excedentes que sustentavam civilização.',
      hints: ['Dica: Relacionado à agricultura', 'Dica: Água + terra fértil', 'Dica: Ciclo anual']
    }
  ],
  skills: { 'civilizacoes-antigas': 'Entender civilizações antigas' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['his-fund2-015']
}

export const greciaAntigaDemocraciaFilosofia: Lesson = {
  id: 'his-fund2-015',
  subject: 'historia',
  grade: '7º ano',
  title: 'Grécia Antiga — Democracia e Filosofia',
  levels: ['fund2'],
  aliases: ['Grécia', 'Atenas', 'democracia', 'Sócrates', 'Platão', 'Aristóteles', 'filosofia'],
  summary: 'Origem da democracia e pensamento racional ocidental',
  intro: 'Grécia inventou democracia e filosofia que moldaram mundo moderno.',
  objective: 'Entender origem da democracia, valorizar pensamento crítico, compreender legado grego',
  topic: 'Civilizações Antigas',
  subtopic: 'Grécia Antiga',
  blocks: [
    {
      id: 'b1',
      title: 'Polis e Democracia Ateniense',
      text: 'Grécia era dividida em cidades-estado (polis). Atenas inventou democracia direta: cidadãos votavam diretamente em assembleia. Não era democracia perfeita (excluía mulheres, escravizados, estrangeiros), mas era inovadora.',
      example: 'Assembleia de Atenas: 6000+ cidadãos votando em Ágora (praça pública). Cada homem adulto tinham direito a voto e fala.'
    },
    {
      id: 'b2',
      title: 'Filósofos Gregos',
      text: 'Sócrates (469-399 AC) questionava tudo, usava diálogo para ensinar. Platão (429-347 AC) escreveu sobre justiça e ideal. Aristóteles (384-322 AC) estudava natureza, lógica, ética. Inventaram filosofia — busca sistemática por verdade através da razão.',
      example: 'Sócrates: "Só sei que nada sei". Platão: "Caverna" (metáfora da realidade). Aristóteles: "Conhecimento vem da observação".'
    },
    {
      id: 'b3',
      title: 'Legado Grego',
      text: 'Democracia ocidental se inspira em Atenas. Filosofia grega é base de pensamento científico. Arte, arquitetura, matemática grega ainda influencia hoje. Mostram que questionar autoridade e pensar racionalmente são caminhos para melhor sociedade.',
      example: 'Universidades modernas vêm da Academia de Platão. Método científico vem de Aristóteles. Democracia vem de Atenas.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'grecia-antiga',
      prompt: 'Qual foi a inovação política de Atenas?',
      options: [
        'Monarquia forte',
        'Oligarquia de nobres',
        'Democracia direta',
        'Ditadura militar'
      ],
      answer: 2,
      explanation: 'Atenas inventou democracia direta onde cidadãos votavam em assembleia. Foi inovação política importante.',
      hints: ['Dica: Sistema onde povo participa', 'Dica: Voto e assembleia', 'Dica: Origem da palavra "democracia"']
    }
  ],
  skills: { 'grecia-antiga': 'Entender Grécia Antiga' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['his-fund2-016']
}

export const imperioRomanoRepublicaImpério: Lesson = {
  id: 'his-fund2-016',
  subject: 'historia',
  grade: '7º ano',
  title: 'Império Romano — República e Império',
  levels: ['fund2'],
  aliases: ['Roma', 'república romana', 'império romano', 'Pax Romana', 'direito romano', 'cristianismo'],
  summary: 'Origem, expansão e queda do Império Romano',
  intro: 'Roma foi maior império da antiguidade e deixou herança duradoura.',
  objective: 'Entender expansão romana, compreender Pax Romana, avaliar legado',
  topic: 'Civilizações Antigas',
  subtopic: 'Roma Antiga',
  blocks: [
    {
      id: 'b1',
      title: 'República Romana',
      text: 'Roma começou como monarquia (753 AC). Tornou-se república (~500 AC) com magistrados eleitos e Senado. Expandiu-se através de guerras: venceu Cartago (rival norte-africana), conquistou Grécia, Egito, Mesopotâmia. Em 100 anos controla Mediterrâneo inteiro.',
      example: 'Guerras Púnicas contra Cartago: Aníbal vs Roma, 3 guerras, Roma vence. Aníbal usa elefantes, Rome tem disciplina militar.'
    },
    {
      id: 'b2',
      title: 'Império e Pax Romana',
      text: 'Augusto (63 AC-14 DC) torna-se primeiro imperador. Restaura paz interna. Pax Romana (27 AC-180 DC): 200 anos de relativa paz, comércio, infraestrutura. Estradas, aquedutos, edifícios públicos. Cristianismo cresce.',
      example: 'Roma constrói 250.000km de estradas. Aquedutos trazem água. Coliseu tem 50.000 assentos. Infraestrutura impressiona até hoje.'
    },
    {
      id: 'b3',
      title: 'Queda e Legado',
      text: 'Império Ocidental cai em 476 DC sob pressão de povos germânicos. Legado: direito (conceitos legais), latim (origem de português, francês, italiano), arquitetura, engenharia, administração. Direito romano influencia sistemas legais modernos.',
      example: 'Conceitos como "inocente até prova contrária" vêm de Roma. Estrutura de governo tem raízes romanas. Idioma português vem do latim.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'roma-antiga',
      prompt: 'Qual foi principal rival de Roma na antiguidade?',
      options: ['Egito', 'Cartago', 'Grécia', 'Pérsia'],
      answer: 1,
      explanation: 'Cartago era rival norte-africana. Três Guerras Púnicas decidiram controle do Mediterrâneo. Roma venceu.',
      hints: ['Dica: Rival comercial', 'Dica: Guerras Púnicas', 'Dica: Aníbal']
    }
  ],
  skills: { 'roma-antiga': 'Entender Roma Antiga' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['his-fund2-017']
}

export const idadeMediaFeudalismoReligiao: Lesson = {
  id: 'his-fund2-017',
  subject: 'historia',
  grade: '7º-8º ano',
  title: 'Idade Média — Feudalismo e Religião',
  levels: ['fund2'],
  aliases: ['Idade Média', 'feudalismo', 'feudo', 'cavaleiro', 'Igreja', 'Cruzadas'],
  summary: 'Estrutura feudal e papel dominante da Igreja Católica',
  intro: 'Idade Média foi período de fragmentação política, poder da Igreja e estrutura feudal.',
  objective: 'Entender feudalismo, compreender papel da Igreja, valorizar diversidade medieval',
  topic: 'Idade Média',
  subtopic: 'Feudalismo',
  blocks: [
    {
      id: 'b1',
      title: 'Sistema Feudal',
      text: 'Feudalismo era sistema de poder baseado em terras. Rei dava terras a nobres (senhores). Nobres juravam lealdade ao rei. Servos (90% população) trabalhavam terra em troca de proteção. Relação hierárquica e recíproca. Não era baseado em dinheiro, mas em serviços.',
      example: 'Um servo plantava e colhia para o senhor. Senhor o protegia de ataques. Senhor devia lealdade ao rei. Castelos eram centros de poder.'
    },
    {
      id: 'b2',
      title: 'Igreja Católica no Poder',
      text: 'Igreja tinha poder enorme: 1/3 de terras europeias. Fornecia educação, saúde, moral, autoridade. Papas coroavam reis. Clero cobrava impostos (dízimo). Monopolizava conhecimento (latim, leitura, escrita). Cultura medieval girava em torno de religião.',
      example: 'Catedral era centro de cidade. Monastérios faziam cópias de livros. Padres ensinavam moral e lei. Excomunhão era punição social máxima.'
    },
    {
      id: 'b3',
      title: 'Cruzadas e Vida Medieval',
      text: 'Cruzadas (1095-1291) foram guerras religiosas pela Terra Santa. Mobilizaram milhões. Levaram morte, riqueza, conhecimento árabe para Europa. Vida medieval tinha aspectos bons (comunidade, arte, fé) e ruins (escravidão, ignorância, violência).',
      example: 'Castelos tinham torres, muralhas, mas pouca higiene. Peste Negra (1347) matou 50M pessoas (1/3 Europa). Arte medieval mostrava beleza e fé.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'idade-media',
      prompt: 'Qual era a base do poder feudal?',
      options: ['Dinheiro', 'Terras (feudos)', 'Religião', 'Tecnologia'],
      answer: 1,
      explanation: 'Feudalismo era baseado em posse de terras. Quem tinha terra tinha poder.',
      hints: ['Dica: Recurso principal da época', 'Dica: Nobres e reis tinham muita', 'Dica: Servos trabalhavam']
    }
  ],
  skills: { 'idade-media': 'Entender Idade Média' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['his-fund2-018']
}

export const renascimentoHumanismo: Lesson = {
  id: 'his-fund2-018',
  subject: 'historia',
  grade: '8º ano',
  title: 'Renascimento e Humanismo (XIV-XVI)',
  levels: ['fund2'],
  summary: 'Transição para modernidade: arte, ciência, humanismo',
  intro: 'Renascimento foi "rebirth" de conhecimento clássico + inovação.',
  objective: 'Entender transição medieval-moderna, valorizar arte e ciência, compreender humanismo',
  topic: 'Renascimento',
  subtopic: 'Artes e Humanismo',
  aliases: ['Renascimento', 'Leonardo da Vinci', 'Michelangelo', 'humanismo', 'perspectiva', 'arte'],
  blocks: [
    {
      id: 'b1',
      title: 'Renascimento Italiano',
      text: 'Começou na Itália (XIV-XV) quando cidades italianas redescobrem textos gregos/romanos. Artistas e pensadores estudam anatomia, perspectiva, proporção. Leonardo da Vinci e Michelangelo representam genialidade. Arte retrata humanidade, não apenas religião.',
      example: 'Mona Lisa: pintura realista de mulher comum. David: escultura de homem nu (tabu medieval). Sistine Chapel: Michelangelo pinta 9000 m² de teto.'
    },
    {
      id: 'b2',
      title: 'Humanismo',
      text: 'Movimento intelectual que colocava humanidade no centro, não apenas Deus. Valorizava razão, educação, beleza, potencial humano. Contrasta com medievalismo que via vida terrena como inferior. Abre caminho para Iluminismo.',
      example: 'Petrarca estuda textos latinos perdidos. Erasmo escreve sobre educação humanista. Foco muda: antes sobre salvação, agora sobre potencial humano.'
    },
    {
      id: 'b3',
      title: 'Impacto na Modernidade',
      text: 'Renascimento conecta Idade Média com modernidade. Enfatiza experimentação (germe de método científico). Valoriza observação de natureza. Criou bases para Iluminismo, Revolução Científica, modernismo.',
      example: 'Método científico: observar + questionar + experimentar. Astronomia copernicana questiona geocentrismo. Anatomia moderna estuda corpo humano.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'renascimento',
      prompt: 'Qual foi grande mudança artística do Renascimento?',
      options: [
        'Mais arte religiosa medieval',
        'Arte retratando humanidade de forma realista',
        'Menos arte em geral',
        'Arte apenas de santos'
      ],
      answer: 1,
      explanation: 'Renascimento trouxe arte mais realista, retratando humanidade e natureza, não apenas religião.',
      hints: ['Dica: Mudança de foco', 'Dica: Perspectiva, proporção', 'Dica: Pessoas comuns em arte']
    }
  ],
  skills: { 'renascimento': 'Entender Renascimento' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['his-fund2-019']
}

export const grandesNavegacaosExpansao: Lesson = {
  id: 'his-fund2-019',
  title: 'Grandes Navegações e Expansão Europeia',
  subject: 'historia',
  grade: '8º ano',
  levels: ['fund2'],
  aliases: ['navegações', 'Vasco da Gama', 'Colombo', 'Magalhães', 'expansão europeia', 'descoberta'],
  summary: 'Exploração marítima europeia e encontro de continentes',
  intro: 'Grandes navegações (XV-XVI) conectaram continentes e moldaram mundo moderno.',
  objective: 'Entender contexto marítimo, compreender expansão, avaliar consequências',
  topic: 'Grandes Navegações',
  subtopic: 'Expansão Europeia',
  blocks: [
    {
      id: 'b1',
      title: 'Contexto e Motivações',
      text: 'Europa queria contato direto com Ásia (especiarias = riqueza). Rota terrestre bloqueada pelos otomanos. Tecnologia naval melhorou (bussola, astrolábio, caravel). Príncipe Henrique de Portugal patrocinava exploradores. Motivação: riqueza, religião, poder.',
      example: 'Pimenta, cravo, noz-moscada de Índia valiam ouro. Portugal mandava expedições costa africana. España buscava rota alternativa.'
    },
    {
      id: 'b2',
      title: 'Navegadores Famosos',
      text: 'Bartolomeu Dias (1488) dobra Cabo da Boa Esperança. Vasco da Gama (1498) chega à Índia por mar. Colombo (1492) cruza Atlântico, encontra Américas. Magalhães (1519) circunda o mundo. Cada um expande conhecimento geográfico.',
      example: 'Gama viaja 10 meses, retorna com especiarias muito lucrativas. Colombo abre "novo mundo" para Europa. Magalhães morre na viagem, mas navios completam volta.'
    },
    {
      id: 'b3',
      title: 'Consequências: Bom e Mau',
      text: 'Positivo: trocas de plantas (batata, tomate), animais, conhecimento. Negativo: colonialismo, escravização, genocídio de povos indígenas, dominação europeia por 500 anos. Mundo moderno é resultado (bom e ruim) dessas navegações.',
      example: 'Batata alimenta bilhões, mas colonialismo oprimiu. Tomate e milho mudaram culinária global, mas indígenas perderam tudo. Ambos aconteceram.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'navegacoes',
      prompt: 'Qual era principal motivação das Grandes Navegações?',
      options: [
        'Explorar por curiosidade',
        'Comercializar especiarias asiáticas (riqueza)',
        'Colonizar humanitariamente',
        'Expandir religião'
      ],
      answer: 1,
      explanation: 'Principal motivação era lucro: especiarias asiáticas valiam muito ouro. Religião era justificativa também.',
      hints: ['Dica: Economia', 'Dica: Especiarias eram valiosas', 'Dica: Riqueza motiva exploradores']
    }
  ],
  skills: { 'navegacoes': 'Entender Grandes Navegações' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

export const brasilIndependente1822a1889: Lesson = {
  id: 'his-medio-012',
  subject: 'historia',
  grade: '1º Médio',
  title: 'Brasil Independente (1822-1889) — Império',
  levels: ['medio'],
  aliases: ['Brasil Império', '1822', 'Dom Pedro I', 'Dom Pedro II', 'Abolição', 'república'],
  summary: 'Período de construção de estado nacional brasileiro',
  intro: 'Brasil se tornou império independente em 1822 e durou até 1889.',
  objective: 'Entender processo de independência, compreender império, valorizar abolição',
  topic: 'Brasil Moderno',
  subtopic: 'Brasil Império',
  blocks: [
    {
      id: 'b1',
      title: 'Independência de Portugal',
      text: 'Portugal enfraquecia com guerras napoleônicas. Família real portuguesa veio para Brasil (1808). Príncipe Pedro declarou independência em 1822 ("Grito do Ipiranga"). Novo país: Império do Brasil. D. Pedro I era primeiro imperador.',
      example: 'D. João VI vai para Rio. D. Pedro fica como regente. Quando Portugal pede volta, Pedro diz: "Independência ou morte" e funda novo país.'
    },
    {
      id: 'b2',
      title: 'D. Pedro II e Desenvolvimento',
      text: 'D. Pedro II (filho de Pedro I) reinou 58 anos (1831-1889). Estabilizou país. Trouxe imigrantes europeus. Construiu ferrovias, portos. Aboliu escravidão gradualmente (Lei Áurea 1888). Transformou Brasil em potência agrícola.',
      example: 'Ferrovias ligam interior. Imigração traz trabalhadores. Café replaces açúcar como principal exportação. Brasil fica mais europeu, menos africano.'
    },
    {
      id: 'b3',
      title: 'Fim do Império',
      text: 'Católicos se afastam do império por secularismo. Militares ganham poder. República é proclamada em 1889 (sem votação popular). Império cai pacificamente. D. Pedro II vai para exílio.',
      example: '15 de novembro: Proclamação da República. Sem revolução violenta. Transição ordenada para novo sistema.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'brasil-imperio',
      prompt: 'Em que ano Brasil se tornou independente?',
      options: ['1500', '1750', '1822', '1889'],
      answer: 2,
      explanation: '1822: Grito do Ipiranga. D. Pedro I proclama independência de Portugal.',
      hints: ['Dica: Século 19', 'Dica: Início da década de 20', 'Dica: Grito do Ipiranga']
    }
  ],
  skills: { 'brasil-imperio': 'Entender Brasil Império' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['his-medio-013']
}

export const republicaVelha1889a1930: Lesson = {
  id: 'his-medio-013',
  subject: 'historia',
  grade: '1º-2º Médio',
  title: 'República Velha (1889-1930) — Coronelismo e Café com Leite',
  levels: ['medio'],
  aliases: ['República Velha', 'coronelismo', 'café com leite', 'República', 'oligarquias'],
  summary: 'Primeira república marcada por coronelismo e poder oligárquico',
  intro: 'República Velha foi período de poder concentrado nas oligarquias locais.',
  objective: 'Entender estrutura política injusta, compreender coronelismo, criticar sistema',
  topic: 'Brasil Moderno',
  subtopic: 'República Velha',
  blocks: [
    {
      id: 'b1',
      title: 'Coronelismo',
      text: 'Coronéis eram fazendeiros poderosos que controlavam regiões. Manipulavam eleições (voto de cabresto), tinham milícias privadas, faziam justiça própria. Povo não tinha autonomia. Presidente fazia acordos com coronéis. Sistema corrupto e injusto.',
      example: 'Um coronel no sertão era como um senhor feudal. Mandava construir igrejas, organizava eleições, tinha poder de vida e morte.'
    },
    {
      id: 'b2',
      title: 'Café com Leite',
      text: 'Acordo entre oligarquias de São Paulo (café) e Minas Gerais (leite/agricultores). Alternavam presidência. Ignoravam interesses de outras regiões. Sistema excluía povo das decisões. Levou à concentração de riqueza.',
      example: 'Presidente de SP, depois presidente de MG, alternando. Outras regiões ficavam à margem. Federal gastava só em café/leite.'
    },
    {
      id: 'b3',
      title: 'Fin da República Velha',
      text: 'Protestos de militares (Tenentismo). Classe operária crescia. Crise econômica (1929) minou poder oligárquico. Revolução de 1930 tira oligarcas do poder. Vargas toma poder e traz mudanças.',
      example: 'Marcha da Coluna Prestes (tenentes) questiona república. Bolsa de NY cai, exportação de café desaba. Oligarcas perdem base econômica.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'republica-velha',
      prompt: 'O que era "voto de cabresto"?',
      options: [
        'Voto secreto e livre',
        'Manipulação de votação por coronéis',
        'Voto obrigatório para todos',
        'Voto apenas de ricos'
      ],
      answer: 1,
      explanation: 'Voto de cabresto era manipulação: coronel ordenava voto, povo obedecia (como cabra presa a corda).',
      hints: ['Dica: Controle político', 'Dica: Sem liberdade', 'Dica: Coronéis mandavam']
    }
  ],
  skills: { 'republica-velha': 'Entender República Velha' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['his-medio-012'],
  next: ['his-medio-014']
}

export const eraVargas1930a1945: Lesson = {
  id: 'his-medio-014',
  subject: 'historia',
  grade: '2º Médio',
  title: 'Era Vargas (1930-1945) — Modernismo e Ditadura',
  levels: ['medio'],
  aliases: ['Vargas', 'Estado Novo', 'CLT', 'modernismo', '1930-1945'],
  summary: 'Período de transformação política e cultural Brasil',
  intro: 'Vargas modernizou Brasil através de ditadura e políticas de trabalho.',
  objective: 'Entender transição política, valorizar modernismo, criticar autoritarismo',
  topic: 'Brasil Moderno',
  subtopic: 'Era Vargas',
  blocks: [
    {
      id: 'b1',
      title: 'Revolução de 1930 e Consolidação de Vargas',
      text: 'Getúlio Vargas toma poder em 1930 através revolução. Promises mudar república. Governa ditatorialmente até 1945. Cria Ministério do Trabalho, CLT (Consolidação das Leis Trabalhistas), direitos para operários. Aproxima Brasil de nazismo (1942-1945).',
      example: 'Vargas dá direitos trabalhistas: 8h de trabalho, descanso semanal, férias. Suprieme direitos políticos (não há eleições). Paradoxo: avanço trabalhista + autoritarismo.'
    },
    {
      id: 'b2',
      title: 'Estado Novo (1937-1945)',
      text: 'Vargas declara ditadura aberta em 1937. Suprime direitos políticos, aumenta repressão. Polícia política (DOPS) vigia. Censura media e letras. Mas também moderniza indústria, cria empresa estatal (Vale, Petrobrás). Paternalismo político.',
      example: 'Presos políticos em Ilha Grande. Mas Vargas cria fábricas de aço, constrói Brasília (planejamento). Diz "estou aqui para trabalhar para vocês".'
    },
    {
      id: 'b3',
      title: 'Semana de Arte Moderna (1922) e Modernismo',
      text: 'Paralelo: modernistas questiona tradição cultural. Mário de Andrade, Oswald de Andrade, Portinari criam arte nova, brasileira, não europeia. Busca identidade cultural. Coincide com modernização de Vargas.',
      example: 'Poesia moderna: sem rimas, linguagem coloquial. Pintura: cores vibrantes, temas brasileiros. Antropofagia: "devorar" influências externas.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'era-vargas',
      prompt: 'O que era a CLT (Consolidação das Leis Trabalhistas)?',
      options: [
        'Lei contra trabalho',
        'Conjunto de direitos trabalhistas (8h, férias, descanso)',
        'Aumento de jornada',
        'Abolição do trabalho'
      ],
      answer: 1,
      explanation: 'CLT garantia direitos a trabalhadores: jornada de 8 horas, descanso semanal, férias pagas, etc.',
      hints: ['Dica: Beneficia trabalhadores', 'Dica: Vargas criou', 'Dica: Continua válida hoje']
    }
  ],
  skills: { 'era-vargas': 'Entender Era Vargas' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['his-medio-013'],
  next: ['his-medio-015']
}

export const redemocratizacaoConstituicao1988: Lesson = {
  id: 'his-medio-015',
  subject: 'historia',
  grade: '3º Médio',
  title: 'Redemocratização e Constituição de 1988',
  levels: ['medio'],
  aliases: ['redemocratização', 'Constituição 88', 'diretas já', 'anistia', 'democracia'],
  summary: 'Retorno da democracia e novo contrato social',
  intro: 'Brasil retornou à democracia com Constituição que dura até hoje.',
  objective: 'Entender transição democrática, compreender constituição, valorizar cidadania',
  topic: 'Brasil Contemporâneo',
  subtopic: 'Redemocratização',
  blocks: [
    {
      id: 'b1',
      title: 'Fim da Ditadura',
      text: 'Campanha "Diretas Já" em 1984 pede eleições diretas. Militar cedem. Assembleia Constituinte em 1987-1988. Tancredo Neves eleito (indiretamente), mas morre. Sarney assume e promulga Constituição 1988.',
      example: 'Milhões nas ruas pedir eleições. Militar não conseguem reprimir. Transição negociada (não revolução) recupera democracia.'
    },
    {
      id: 'b2',
      title: 'Constituição Federal de 1988',
      text: 'Chamada "Constituição Cidadã". Restabelece: voto direto, liberdade de expressão, direitos humanos, direitos sociais, direito de greve. Proíbe censura. Institui direitos indígenas, ambientais. Base de direitos ainda vigente.',
      example: 'Artigo 1: Brasil é república democrática. Direitos fundamentais garantidos. Ambientalismo. Mulheres, indígenas têm direitos pela 1ª vez.'
    },
    {
      id: 'b3',
      title: 'Impacto até Hoje',
      text: 'Constituição criou instituições: STF, Ministério Público, advocacia pública. Permitiu lutas: LGBTQ+, movimentos sociais, jornalismo crítico. Não é perfeita, mas é democrática e progressista.',
      example: 'Impeachment de presidente (Collor) via Constituição. Direitos LGBTQ+ reconhecidos. Ativismo ambiental possível. Tudo baseado em 88.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'redemocratizacao',
      prompt: 'Qual foi principal mudança da Constituição de 1988?',
      options: [
        'Mantinha ditadura',
        'Restaurava democracia e direitos civis',
        'Aumentava poder militar',
        'Proibia trabalho'
      ],
      answer: 1,
      explanation: 'Constituição 88 restaurava democracia, liberdades e direitos que ditadura havia suprimido.',
      hints: ['Dica: Fim da repressão', 'Dica: Eleições livres', 'Dica: Liberdades retornam']
    }
  ],
  skills: { 'redemocratizacao': 'Entender Redemocratização' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['his-medio-011'],
  next: ['his-medio-016']
}

export const brasilContemporaneo1990a2024: Lesson = {
  id: 'his-medio-016',
  subject: 'historia',
  grade: '3º Médio',
  title: 'Brasil Contemporâneo (1990-2024) — Política, Economia, Sociedade',
  levels: ['medio'],
  aliases: ['Brasil', 'contemporâneo', 'FHC', 'Lula', 'Dilma', 'Bolsonaro', 'economia'],
  summary: 'História recente do Brasil: crises, esperanças e desigualdade',
  intro: 'Brasil recente é marcado por instabilidade política e persistente desigualdade.',
  objective: 'Entender Brasil atual, analisar crises, avaliar progressos',
  topic: 'Brasil Contemporâneo',
  subtopic: 'História Recente',
  blocks: [
    {
      id: 'b1',
      title: 'Primeiras Décadas Democráticas (1990-2002)',
      text: 'Collor (1990-1992): impeachado por corrupção. FHC (1995-2002): estabiliza economia (Plano Real), privatiza. Crescimento mas desigualdade persiste. Neoliberalismo: menos estado, mais mercado.',
      example: 'Hiperinflação (1990). Plano Real (1994): dólar como âncora. Estabilidade, mas desemprego aumenta. Privatizações controversas.'
    },
    {
      id: 'b2',
      title: 'Era Lula (2003-2010)',
      text: 'Lula eleito em 2002. Políticas sociais: Bolsa Família, aumento salário mínimo, cotas. Reduz pobreza. Mas também favorece agronegócio, empreita. Dilma continua (2011-2016).',
      example: 'Bolsa Família sai de 3,6M para 13M famílias. Pobreza cai. Mas Odebrecht comanda política. Corrupção continua institucionalizada.'
    },
    {
      id: 'b3',
      title: 'Crise, Impeachment, Polarização (2016-2024)',
      text: 'Dilma impeachada em 2016. Temer (ilegítimo) nega direitos. Lula preso (2018-2019, later anulado). Bolsonaro eleito com anti-corrupção (mas pratica). Polarização extrema. Lula reeleito (2022).',
      example: 'Operação Lava-Jato prende Lula com acusações questionadas. Bolsonaro nega vacina, promove armas. País se divide profundamente. Desigualdade volta a crescer.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'brasil-contemporaneo',
      prompt: 'Qual foi principal programa social de Lula?',
      options: [
        'Privatização de empresas',
        'Bolsa Família (renda para pobres)',
        'Aumento de impostos',
        'Redução de estado'
      ],
      answer: 1,
      explanation: 'Bolsa Família foi programa que dava renda a famílias pobres. Reduzou pobreza, era popular.',
      hints: ['Dica: Ajudava pobres', 'Dica: Transferência de renda', 'Dica: Milhões de beneficiários']
    }
  ],
  skills: { 'brasil-contemporaneo': 'Entender Brasil Contemporâneo' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['his-medio-015'],
  next: []
}

export const revolusoesOcidentaisSecXIX: Lesson = {
  id: 'his-medio-017',
  subject: 'historia',
  grade: '3º Médio',
  title: 'Revoluções Sociais — Industrialização e Movimentos (XIX-XX)',
  levels: ['medio'],
  aliases: ['Revolução Industrial', 'socialismo', 'comunismo', 'anarquismo', 'movimentos operários'],
  summary: 'Transformações sociais causadas por industrialização e ideologias',
  intro: 'Século XIX: industrialização cria classes operárias e ideologias de mudança.',
  objective: 'Entender industrialização, compreender ideologias, valorizar direitos trabalhistas',
  topic: 'Revoluções Sociais',
  subtopic: 'Industrialização e Ideologia',
  blocks: [
    {
      id: 'b1',
      title: 'Revolução Industrial',
      text: 'Século XVIII-XIX: máquinas substituem trabalho humano. Fábricas concentram poder. Operários perdem autonomia. Salários baixos, jornada 14h+, crianças trabalham. Condições horríveis mas novo sistema irresistível.',
      example: 'Fábrica inglesa tem 1000 teares. Mas operários ganham menos e trabalham mais. Realeza + capital domina operários.'
    },
    {
      id: 'b2',
      title: 'Ideologias de Mudança',
      text: 'Socialismo (Marx): propriedade coletiva, fim de classes, operários no poder. Comunismo: sociedade sem classes, sem estado. Anarquismo: sem estado ou hierarquia. Todos criticam capitalismo injusto.',
      example: 'Marx escreve "O Capital" (1867): análise de exploração. Lenin lê Marx, faz revolução (1917). Bakunin quer anarquia. Cada um tenta mudança diferente.'
    },
    {
      id: 'b3',
      title: 'Movimentos Operários',
      text: 'Operários se organizam: sindicatos, greves, movimentos. Conquistam direitos: jornada 8h, descanso semanal, direito de greve (lentamente, através luta). Hoje direitos trabalhistas vêm dessa luta.',
      example: 'Greve de 1919 em Itália: "Biennio Rosso". Chile 1907: massacre de operários. Brasil: CLT (1943) depois de pressão. Direitos custaram sangue.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'revolucoes-sociais',
      prompt: 'O que Marx propunha como solução para exploração operária?',
      options: [
        'Fortalecer capitalismo',
        'Propriedade coletiva e sociedade sem classes',
        'Mais jornada de trabalho',
        'Escravidão'
      ],
      answer: 1,
      explanation: 'Marx propunha fim de propriedade privada, sociedade sem classes exploradas. Era revolucionário.',
      hints: ['Dica: Solução radical', 'Dica: Contra capitalismo', 'Dica: Mudança de sistema']
    }
  ],
  skills: { 'revolucoes-sociais': 'Entender Revoluções Sociais' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

export const genocidiosCrimesContraHumanidade: Lesson = {
  id: 'his-medio-018',
  subject: 'historia',
  grade: '3º Médio',
  title: 'Genocídios e Crimes contra Humanidade — História e Memória',
  levels: ['medio'],
  aliases: ['genocídio', 'Holocausto', 'Ruanda', 'Camboja', 'direitos humanos'],
  summary: 'Reflexão sobre atrocidades humanas e prevenção',
  intro: 'Século XX: piores genocídios da história. Reflexão necessária.',
  objective: 'Entender atrocidades, refletir sobre responsabilidade, prevenir futuros',
  topic: 'Crimes Contra Humanidade',
  subtopic: 'Memória e Prevenção',
  blocks: [
    {
      id: 'b1',
      title: 'Holocausto (1941-1945)',
      text: '6 milhões de judeus mortos. Planejado sistematicamente pelo estado nazista. Campos de concentração. Gás Zyklon B. Cremação em massa. Também ciganos, deficientes, presos políticos, LGBTQ+.',
      example: 'Auschwitz: 1,1M mortos em 4 anos. Seleção na chegada: câmaras gás ou trabalho escravo. Médicos fazem experimentos cruéis.'
    },
    {
      id: 'b2',
      title: 'Outros Genocídios',
      text: 'Armênia (1915): 1,5M mortos por Otomanos. Ruanda (1994): 800K Tutsis em 100 dias. Camboja (1975-79): 2M mortos por Khmer Vermelho. Não há monopólio de atrocidades — civilizações todas são capazes.',
      example: 'Ruanda: vizinhos matam vizinhos com machetes. Camboja: intelectuais executados por regime comunista. Cada país justifica diferente.'
    },
    {
      id: 'b3',
      title: 'Memória e Prevenção',
      text: '"Nunca mais" é lema após Holocausto. ONU cria Corte Internacional de Justiça. Educação sobre genocídios previne repetição. Mas mundo ainda vê genocídios (Miamma 2017, Palestina). Vigilância constante necessária.',
      example: 'Museus de Holocausto educam. Julgamentos de Nuremberg estabelecem "crimes contra humanidade". Mas não há garantia de prevenção.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 3,
      skill: 'genocidios',
      prompt: 'Por que Holocausto é considerado genocídio único?',
      options: [
        'Foi o único genocídio da história',
        'Só matou judeus',
        'Planejamento sistêmico de estado para eliminar grupo inteiro',
        'Ocorreu na Europa'
      ],
      answer: 2,
      explanation: 'Holocausto foi genocídio planejado pelo estado nazista com objetivo explícito de eliminar judeus. Único em planejamento e escala na época.',
      hints: ['Dica: Planejamento do estado', 'Dica: Método sistemático', 'Dica: Objetivo claro de extinção']
    }
  ],
  skills: { 'genocidios': 'Entender Genocídios' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

export const mundoMultipolarGeopoliticaContemporanea: Lesson = {
  id: 'his-medio-019',
  subject: 'historia',
  grade: '3º Médio',
  title: 'Mundo Multipolar — Geopolítica Contemporânea (2000-2024)',
  levels: ['medio'],
  aliases: ['geopolítica', 'multipolaridade', 'China', 'EUA', 'terrorismo', 'Ucrânia'],
  summary: 'Mundo atual: potências múltiplas, conflitos complexos, incertezas',
  intro: 'Após Guerra Fria: mundo multipolar com múltiplos centros de poder.',
  objective: 'Entender geopolítica atual, analisar conflitos, refletir sobre futuro',
  topic: 'Mundo Contemporâneo',
  subtopic: 'Geopolítica Atual',
  blocks: [
    {
      id: 'b1',
      title: 'Ascensão da China e Multipolaridade',
      text: 'China cresce exponencialmente (economia, militar). India, Brasil ganham poder. EUA permanece super potência mas não hegemônica. Rusia reagir. Ordem unipolar de 1990s se fragmenta.',
      example: 'China ultrapassar EUA como maior exportador. Investimentos chineses em África. Rusia interfere em eleições ocidentais. Novo equilibrio global.'
    },
    {
      id: 'b2',
      title: 'Terrorismo e Conflitos Proxy',
      text: '11 de setembro (2001) muda paradigma. Guerra ao terror (Afeganistão, Iraque) mata milhões, não resolve. ISIS emerge. Oriente Médio em caos. Ucrânia (2022): conflito real (não proxy). Taiwan: próximo flashpoint?',
      example: 'Talibã volta ao poder (2021) após 20 anos de guerra. Iraque fraturado. Iran nuclear-armed. Rusia invade Ucrânia: primeira guerra europeia do século 21.'
    },
    {
      id: 'b3',
      title: 'Desafios Globais',
      text: 'Clima: aquecimento global. Pandemia (COVID): mundo não preparado. Desigualdade cresce. Migrações em massa. Cyber-warfare novo domínio. Futuro incerto mas história continua — suas escolhas importam.',
      example: 'COP26, COP27 falam clima mas CO2 sobe. COVID mata 7M. Refugiados de guerras. Hackers russos atacam infraestrutura ocidental. Mundo precisa de soluções coletivas.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 3,
      skill: 'geopolitica',
      prompt: 'Qual mudança marca mundo pós-2000?',
      options: [
        'EUA continua hegemonia unipolar',
        'Multipolaridade: China, India, Brasil, Rusia ganham poder',
        'Volta da URSS',
        'Fim de conflitos globais'
      ],
      answer: 1,
      explanation: 'Mundo pós-2000 é multipolar: China sobe, EUA perde hegemonia, múltiplos centros de poder competem.',
      hints: ['Dica: Mais de um centro de poder', 'Dica: China importante', 'Dica: Contrário de unipolaridade']
    }
  ],
  skills: { 'geopolitica': 'Entender Geopolítica Contemporânea' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

// ═══════════════════════════════════════════════════════════════════════════════════
// EXPORT ARRAY
// ═══════════════════════════════════════════════════════════════════════════════════

export const HISTORIA_LOTE4: Lesson[] = [
  // Fund I
  oQueEHistoria,
  linhaDoTempo,
  minhaFamiliaEMinhaHistoria,
  minhaComUnidadeOntemeHoje,
  osPrimeirosPovosDoBoafrica,
  chegadaDosPortugueses1500,
  // Fund II
  brasilColonialParte1Capitanias,
  brasilColonialEscravidaoAfricana,
  brasilColonialParte3Bandeirantes,
  civilizacoesAntiguasEgitoMesopotamia,
  greciaAntigaDemocraciaFilosofia,
  imperioRomanoRepublicaImpério,
  idadeMediaFeudalismoReligiao,
  renascimentoHumanismo,
  grandesNavegacaosExpansao,
  // Médio
  brasilIndependente1822a1889,
  republicaVelha1889a1930,
  eraVargas1930a1945,
  segundaGuerraMundial,
  guerraFria,
  ditaduraMilitarBrasileira,
  redemocratizacaoConstituicao1988,
  brasilContemporaneo1990a2024,
  revolusoesOcidentaisSecXIX,
  genocidiosCrimesContraHumanidade,
  mundoMultipolarGeopoliticaContemporanea
]
