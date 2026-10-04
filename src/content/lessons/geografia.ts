/**
 * GEOGRAFIA — Lote 5 Completo
 * Fundamental I até Ensino Médio
 * 24 aulas com progressão pedagógica
 */

import type { Lesson } from '../../types'

// ═══════════════════════════════════════════════════════════════════════════════════
// FUNDAMENTAL I (1º-5º ano) — Introdução à Geografia
// ═══════════════════════════════════════════════════════════════════════════════════

export const oQueEGeografia: Lesson = {
  id: 'geo-fund1-001',
  subject: 'geografia',
  grade: '1º ano',
  title: 'O que é Geografia?',
  levels: ['fund1'],
  aliases: ['geografia', 'espaço', 'lugar', 'paisagem', 'natureza', 'pessoas'],
  summary: 'Geografia estuda lugares, paisagens e relação entre humanos e natureza',
  intro: 'Geografia significa "descrição da Terra".',
  objective: 'Entender conceito de geografia, identificar paisagens naturais e culturais, compreender lugar e espaço',
  topic: 'Introdução à Geografia',
  subtopic: 'Conceitos Básicos',
  blocks: [
    {
      id: 'b1',
      title: 'O que Geógrafos Estudam',
      text: 'Geografia estuda a Terra, seus lugares, paisagens, povos e como vivem. Geógrafos observam: montanhas, rios, cidades, culturas, economia. Integram natureza e sociedade. Respondem: por que lugares são diferentes? Como humanos mudam paisagem? Como paisagem influencia pessoas?',
      example: 'Um geógrafo estuda um rio: como forma a paisagem, como povo vive dele, como é poluído. Integra geologia, biologia, história, economia.'
    },
    {
      id: 'b2',
      title: 'Paisagem Natural vs Cultural',
      text: 'Paisagem natural é sem influência humana: montanhas, florestas, rios. Paisagem cultural é modificada por humanos: cidades, estradas, plantações. Maioria da Terra é paisagem cultural hoje.',
      example: 'Floresta virgem = natural. Cidade = cultural. Floresta com estrada = mista. Deserto é natural, mas deserto com fazendas é cultural.'
    },
    {
      id: 'b3',
      title: 'Lugar e Espaço',
      text: 'Lugar é local com significado (sua casa, escola). Espaço é área geográfica maior (seu bairro, país). Ambos importam para entender mundo.',
      example: 'Sua casa é lugar especial. Seu país é espaço geográfico. Ambos moldam quem você é.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'conceito-geografia',
      prompt: 'O que geógrafos estudam?',
      options: [
        'Apenas montanhas e rios',
        'Apenas cidades e pessoas',
        'Lugares, paisagens, natureza e como humanos e natureza se relacionam',
        'Apenas história do mundo'
      ],
      answer: 2,
      explanation: 'Geografia estuda a relação entre humanos, paisagens e natureza em diferentes lugares.',
      hints: ['Dica 1: Integra vários elementos', 'Dica 2: Não é apenas um desses', 'Dica 3: É sobre lugares e como vivemos']
    }
  ],
  skills: { 'conceito-geografia': 'Entender conceito de geografia' },
  review: ['O que é lugar?', 'O que é espaço?', 'Qual diferença paisagem natural vs cultural?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-fund1-002']
}

export const mapaOrientacao: Lesson = {
  id: 'geo-fund1-002',
  subject: 'geografia',
  grade: '2º ano',
  title: 'Mapa e Orientação',
  levels: ['fund1'],
  aliases: ['mapa', 'bússola', 'norte', 'sul', 'leste', 'oeste', 'orientação'],
  summary: 'Entender mapas e se orientar geograficamente',
  intro: 'Mapas são representações da Terra que ajudam a nos orientar.',
  objective: 'Ler mapas, entender orientação cardeal, usar bússola mentalmente',
  topic: 'Localização e Orientação',
  subtopic: 'Mapas e Bússola',
  blocks: [
    {
      id: 'b1',
      title: 'O que é um Mapa',
      text: 'Mapa é representação visual de um lugar visto de cima. Reduz tamanho real. Usa cores e símbolos para mostrar: montanhas (marrom), rios (azul), cidades (preto), florestas (verde). Sempre tem escala (1cm no mapa = Xkm na realidade).',
      example: 'Mapa do Brasil cabe numa folha, mas Brasil é enorme. Mapa usa escala e símbolos para mostrar informação.'
    },
    {
      id: 'b2',
      title: 'Orientação Cardeal',
      text: 'Rosa dos ventos mostra direções: Norte (N, acima), Sul (S, abaixo), Leste (L, direita), Oeste (O, esquerda). Intermediárias: Nordeste, Noroeste, Sudeste, Sudoeste. Sol nasce no Leste, se põe no Oeste. Ajuda a se orientar.',
      example: 'São Paulo fica ao Sudeste de Brasília. O Amazonas fica ao Norte do Brasil. Recife fica ao Nordeste.'
    },
    {
      id: 'b3',
      title: 'Lendo Mapas',
      text: 'Todo mapa tem: título (o quê?), legenda (cores significam?), escala (tamanho?), norte (direção?). Seguindo essas informações, você consegue ler qualquer mapa.',
      example: 'Mapa de cidade: vermelho = ruas principais, azul = rios, verde = parques. Com legenda, você navega cidade.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'mapas',
      prompt: 'Para que servem as cores em um mapa?',
      options: [
        'Deixar bonito',
        'Mostrar informações: montanhas, rios, cidades',
        'Não tem função',
        'Confundir pessoas'
      ],
      answer: 1,
      explanation: 'Cores em mapas representam informações: azul = água, verde = floresta, marrom = montanha, etc.',
      hints: ['Dica 1: Tem propósito', 'Dica 2: Cada cor significa algo', 'Dica 3: Leia a legenda']
    }
  ],
  skills: { 'mapas': 'Ler e interpretar mapas' },
  review: ['Quais são as 4 direções?', 'Como ler um mapa?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['geo-fund1-001'],
  next: ['geo-fund1-003']
}

export const coordenadasGeograficas: Lesson = {
  id: 'geo-fund1-003',
  subject: 'geografia',
  grade: '3º ano',
  title: 'Coordenadas Geográficas',
  levels: ['fund1'],
  aliases: ['coordenadas', 'latitude', 'longitude', 'equador', 'meridiano', 'paralelo'],
  summary: 'Sistema de localização precisa na Terra',
  intro: 'Coordenadas geográficas permitem localizar qualquer lugar na Terra.',
  objective: 'Entender latitude e longitude, ler coordenadas',
  topic: 'Localização e Orientação',
  subtopic: 'Sistema de Coordenadas',
  blocks: [
    {
      id: 'b1',
      title: 'Latitude',
      text: 'Latitude é distância angular do Equador (linha horizontal no meio da Terra). Vai de 0º (Equador) a 90º (Pólos). Mede se está norte ou sul do Equador. Brasil: entre 5º N e 34º S.',
      example: 'Rio de Janeiro está a 23º S (23 graus ao sul do Equador). Localização precisa.'
    },
    {
      id: 'b2',
      title: 'Longitude',
      text: 'Longitude é distância angular do Meridiano de Greenwich (linha vertical de referência). Vai de 0º (Greenwich) a 180º. Mede se está leste ou oeste. Brasil: entre 34º O e 73º O.',
      example: 'Salvador está a 38º O. Localização precisa.'
    },
    {
      id: 'b3',
      title: 'Usando Coordenadas',
      text: 'Latitude + Longitude = localização única. Sistema GPS usa isso. Qualquer lugar na Terra tem coordenadas únicas.',
      example: 'Cristo Redentor: 22°S, 43°O. Copacabana: 23°S, 43°O. Diferença de 1 grau = ~100km.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'coordenadas',
      prompt: 'O que mede latitude?',
      options: [
        'Distância leste-oeste',
        'Distância norte-sul (do Equador)',
        'Altura de montanha',
        'Tamanho de país'
      ],
      answer: 1,
      explanation: 'Latitude mede distância norte-sul: 0º no Equador até 90º nos Pólos.',
      hints: ['Dica 1: Relacionado ao Equador', 'Dica 2: Norte ou Sul', 'Dica 3: Linhas horizontais']
    }
  ],
  skills: { 'coordenadas': 'Entender coordenadas geográficas' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['geo-fund1-002'],
  next: ['geo-fund1-004']
}

export const continentesOceanos: Lesson = {
  id: 'geo-fund1-004',
  subject: 'geografia',
  grade: '4º ano',
  title: 'Continentes e Oceanos',
  levels: ['fund1'],
  aliases: ['continentes', 'oceanos', 'América', 'Europa', 'Ásia', 'África', 'Oceania', 'Antártida'],
  summary: 'Principais landformas da Terra',
  intro: 'Terra tem 7 continentes e 5 oceanos.',
  objective: 'Localizar continentes e oceanos, compreender vastidão dos oceanos',
  topic: 'Mundo',
  subtopic: 'Continentes e Oceanos',
  blocks: [
    {
      id: 'b1',
      title: 'Sete Continentes',
      text: 'América (N e S), Europa, Ásia, África, Oceania (Austrália + Ilhas), Antártida. Todos diferentes em tamanho, clima, população. Ásia é maior. Antártida é mais frio.',
      example: 'Ásia tem 60% da população mundial. Antártida não tem cidades. Europa é pequeno mas desenvolvido.'
    },
    {
      id: 'b2',
      title: 'Cinco Oceanos',
      text: 'Pacífico (maior), Atlântico, Índico, Ártico, Antártico. Cobrem 70% da Terra. Conectados. Casa de bilhões de espécies.',
      example: 'Pacífico é maior que todos os continentes juntos. Contém Japão, Australaia, Havaí.'
    },
    {
      id: 'b3',
      title: 'Importância para Humanos',
      text: 'Oceanos fornecem comida, regulam clima, transportam comércio. Continentes têm recursos, pessoas, culturas. Ambos essenciais para vida.',
      example: 'Pesca no Atlântico alimenta milhões. Rota do Equador de navio conecta comércio global.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'continentes-oceanos',
      prompt: 'Qual continente tem maior população?',
      options: ['América', 'Europa', 'Ásia', 'África'],
      answer: 2,
      explanation: 'Ásia tem mais de 60% da população mundial: China, Índia, Japão, Indonésia.',
      hints: ['Dica 1: Tem Índia e China', 'Dica 2: Maior continente', 'Dica 3: Bilhões de pessoas']
    }
  ],
  skills: { 'continentes-oceanos': 'Localizar continentes e oceanos' },
  review: ['Nomeie 7 continentes', 'Nomeie 5 oceanos'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-fund1-005']
}

export const biomasEcossistemas: Lesson = {
  id: 'geo-fund1-005',
  subject: 'geografia',
  grade: '4º-5º ano',
  title: 'Biomas e Ecossistemas',
  levels: ['fund1'],
  aliases: ['bioma', 'ecossistema', 'floresta', 'deserto', 'savana', 'tundra', 'biodiversidade'],
  summary: 'Principais biomas terrestres e sua biodiversidade',
  intro: 'Biomas são regiões com clima, vegetação, animais específicos.',
  objective: 'Conhecer biomas principais, entender biodiversidade, valorizar conservação',
  topic: 'Biomas',
  subtopic: 'Ecossistemas Terrestres',
  blocks: [
    {
      id: 'b1',
      title: 'Biomas Principais',
      text: 'Floresta Tropical (quente, úmido, biodiversidade máxima). Floresta Temperada (4 estações). Savana (seco, pastagem). Deserto (muito seco, pouca vida). Tundra (frio extremo, vegetação mínima). Cada tem clima e vida típicos.',
      example: 'Amazônia = Floresta Tropical com 10% da biodiversidade mundial. Saara = Deserto com pouca vida. Tundra sibérica = Frio e pouco verde.'
    },
    {
      id: 'b2',
      title: 'Ecossistema',
      text: 'Ecossistema é comunidade de seres vivos (plantas, animais, fungos) interagindo num ambiente. Cadeia alimentar: produtor → herbívoro → carnívoro. Decompositor recicla nutrientes. Equilibrio delicado.',
      example: 'Floresta: árvore produz oxigênio, herbívoro come folha, carnívoro caça herbívoro. Todos dependem uns dos outros.'
    },
    {
      id: 'b3',
      title: 'Ameaças e Conservação',
      text: 'Desmatamento, poluição, mudanças climáticas destroem biomas. Espécies desaparecem. Conservar biomas é proteger vida e clima. Unidades de conservação protegem áreas.',
      example: 'Amazônia derrubada emite CO2. Extinção de espécies reduz diversidade para sempre. Parques protegem biodiversidade.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'biomas',
      prompt: 'Qual bioma tem maior biodiversidade?',
      options: ['Deserto', 'Tundra', 'Floresta Tropical', 'Savana'],
      answer: 2,
      explanation: 'Floresta Tropical tem clima perfeito: quente e úmido. Permite vida abundante e diversa.',
      hints: ['Dica 1: Quente e úmido', 'Dica 2: Perto do Equador', 'Dica 3: Amazônia fica aqui']
    }
  ],
  skills: { 'biomas': 'Entender biomas e ecossistemas' },
  review: ['Nomeie 5 biomas', 'Qual tem mais vida?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-fund1-006']
}

export const brasilRegioes: Lesson = {
  id: 'geo-fund1-006',
  subject: 'geografia',
  grade: '5º ano',
  title: 'Brasil — Regiões e Características',
  levels: ['fund1', 'fund2'],
  aliases: ['Brasil', 'regiões', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
  summary: 'Cinco regiões brasileiras: características, clima, pessoas, economia',
  intro: 'Brasil é dividido em 5 regiões: Norte, Nordeste, Centro-Oeste, Sudeste, Sul.',
  objective: 'Localizar regiões, entender características, comparar diferenças',
  topic: 'Brasil',
  subtopic: 'Regiões Brasileiras',
  blocks: [
    {
      id: 'b1',
      title: 'Cinco Regiões',
      text: 'Norte: Amazônia, floresta, menos desenvolvido. Nordeste: seco, pobre, história colonial. Centro-Oeste: cerrado, pecuária, Brasília. Sudeste: mais rico, industrializado, São Paulo Rio. Sul: europeu, frio, desenvolvido.',
      example: 'Norte tem 50% da floresta do mundo. Nordeste sofre seca. Sudeste tem mais PIB. Sul é mais europeu.'
    },
    {
      id: 'b2',
      title: 'Clima e Vegetação',
      text: 'Norte: tropical, quente. Nordeste: semiárido, seco. Centro-Oeste: tropical, savana. Sudeste: subtropical, temperado. Sul: temperado, 4 estações. Vegetação muda com clima.',
      example: 'Amazonas: 200mm chuva/ano. Caatinga (Nordeste): 300-600mm. Rio Grande do Sul: estações definidas.'
    },
    {
      id: 'b3',
      title: 'População e Economia',
      text: 'Sudeste: 45% da população. Norte: mais esparso. Sudeste: indústria, comércio. Nordeste: agricultura, turismo. Sul: agricultura, indústria. Desigualdade entre regiões.',
      example: 'São Paulo: 46M pessoas, economia avançada. Amazonas: 4M pessoas, economía baseada em floresta.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'brasil-regioes',
      prompt: 'Qual região do Brasil é mais rica e industrializada?',
      options: ['Norte', 'Nordeste', 'Sudeste', 'Centro-Oeste'],
      answer: 2,
      explanation: 'Sudeste é mais desenvolvido: tem São Paulo, Rio, maioria da indústria, maior PIB.',
      hints: ['Dica 1: Tem São Paulo', 'Dica 2: Mais industrializado', 'Dica 3: 45% da população']
    }
  ],
  skills: { 'brasil-regioes': 'Conhecer regiões brasileiras' },
  review: ['Nomeie 5 regiões', 'Qual é mais frio?', 'Qual é mais seco?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-fund2-007']
}

// ═══════════════════════════════════════════════════════════════════════════════════
// FUNDAMENTAL II (6º-9º ano) — Geografia Global
// ═══════════════════════════════════════════════════════════════════════════════════

export const americaLatina: Lesson = {
  id: 'geo-fund2-007',
  subject: 'geografia',
  grade: '6º-7º ano',
  title: 'América Latina — Países e Culturas',
  levels: ['fund2'],
  aliases: ['América Latina', 'México', 'Argentina', 'cultura', 'espanhol', 'português'],
  summary: 'Diversidade política, cultural e econômica da América Latina',
  intro: 'América Latina abrange 20 países com história colonial compartilhada.',
  objective: 'Localizar países, entender influências coloniais, valorizar cultura',
  topic: 'América',
  subtopic: 'América Latina',
  blocks: [
    {
      id: 'b1',
      title: 'Países e Línguas',
      text: 'Brasil (português), resto (espanhol). México (40M pessoas, maior economia). Argentina (desenvolvida). Peru (Incas). Colômbia (café). Venezuela (petróleo). Todos colonizados por Espanha/Portugal.',
      example: 'México: CDMX maior cidade. Argentina: Buenos Aires cosmopolita. Venezuela: petróleo mas crise.'
    },
    {
      id: 'b2',
      title: 'Cultura Mestiça',
      text: 'Mistura de indígena, europeu, africano. Resultado: arte única, música (samba, tango), religião (catolicismo + espiritismo).',
      example: 'Samba carioca vem de África. Tango argentino é sensual. Murais mexicanos retratam história.'
    },
    {
      id: 'b3',
      title: 'Economia e Desigualdade',
      text: 'Exporta commodities (café, minério, petróleo). Pouca industrialização. Desigualdade extrema. Classe média pequena.',
      example: 'Brasil exporta soja, minério. Renda per capita é 1/5 dos EUA. Gini (desigualdade) é muito alto.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'america-latina',
      prompt: 'Qual é idioma oficial da América Latina (excepto Brasil)?',
      options: ['Português', 'Espanhol', 'Inglês', 'Francês'],
      answer: 1,
      explanation: 'Espanhol é falado em 19 dos 20 países. Brasil fala português.',
      hints: ['Dica 1: Herança colonial', 'Dica 2: De Espanha', 'Dica 3: Falado por 400M pessoas']
    }
  ],
  skills: { 'america-latina': 'Entender América Latina' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-fund2-008']
}

export const clima: Lesson = {
  id: 'geo-fund2-008',
  subject: 'geografia',
  grade: '7º-8º ano',
  title: 'Clima — Fatores e Classificações',
  levels: ['fund2'],
  aliases: ['clima', 'temperatura', 'precipitação', 'pressão atmosférica', 'classificação climática'],
  summary: 'Elementos do clima e como diferentes regiões têm climas diferentes',
  intro: 'Clima é padrão de temperatura e precipitação de uma região.',
  objective: 'Entender fatores de clima, conhecer tipos climáticos, compreender variações',
  topic: 'Clima',
  subtopic: 'Climatologia',
  blocks: [
    {
      id: 'b1',
      title: 'Fatores do Clima',
      text: 'Latitude (distância do Equador): equador quente, polos frios. Altitude (altura): quanto mais alto, mais frio. Continentalidade: longe do mar é seco, perto é úmido. Correntes oceânicas: quentes/frias mudam clima.',
      example: 'Equador é quente (latitude). Andes são frios (altitude). Sibéria é seca (continental). Corrente do Golfo aquece Europa.'
    },
    {
      id: 'b2',
      title: 'Tipos Climáticos',
      text: 'Tropical (quente, chuva). Subtropical (quente, chuva). Temperado (estações definidas). Frio (pouca chuva, neve). Seco (deserto). Sistema Köppen classifica climas em 30+ tipos.',
      example: 'Amazônia = Tropical. Rio Grande do Sul = Subtropical. Sibéria = Frio. Saara = Seco.'
    },
    {
      id: 'b3',
      title: 'Impacto em Biodiversidade e Humanos',
      text: 'Clima determina vegetação: tropical tem floresta, seco tem deserto. Humanos se adaptam: roupas, casas, alimentos conforme clima. Mudanças climáticas ameaçam essas adaptações.',
      example: 'Inuites vestem casacos grossos. Beduínos usam roupas soltas e leves. Alimentos mudam: arroz no tropical, trigo no temperado.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'clima',
      prompt: 'O que torna uma região equatorial quente?',
      options: [
        'Altitude baixa',
        'Latitude (proximidade ao Equador)',
        'Longe do oceano',
        'Pressão alta'
      ],
      answer: 1,
      explanation: 'Latitude é fator principal: regiões perto do Equador recebem radiação solar direta e são sempre quentes.',
      hints: ['Dica 1: Relacionado à posição na Terra', 'Dica 2: Equador é quente', 'Dica 3: Ângulo do sol']
    }
  ],
  skills: { 'clima': 'Entender clima e seus fatores' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-fund2-009']
}

export const populacaoDinamica: Lesson = {
  id: 'geo-fund2-009',
  subject: 'geografia',
  grade: '8º-9º ano',
  title: 'População — Estrutura e Dinâmica',
  levels: ['fund2'],
  aliases: ['população', 'densidade demográfica', 'crescimento', 'migração', 'pirâmide etária'],
  summary: 'Estudar como população muda, cresce, se move geograficamente',
  intro: '8 bilhões de pessoas vivem na Terra, distribuídas desigualmente.',
  objective: 'Entender dinâmica populacional, compreender migrações, analisar crescimento',
  topic: 'População',
  subtopic: 'Dinâmica Demográfica',
  blocks: [
    {
      id: 'b1',
      title: 'Crescimento Populacional',
      text: 'Até 1800: 1 bilhão. 1927: 2 bilhões. 1960: 3 bilhões. 1974: 4 bilhões. 1987: 5 bilhões. 1999: 6 bilhões. 2011: 7 bilhões. 2024: 8 bilhões. Crescimento desacelerou mas ainda continua.',
      example: 'Doubramos população em 50 anos (1974-2024). Antes dobrávamos em 30 anos. Ritmo diminuiu pois mulheres têm menos filhos.'
    },
    {
      id: 'b2',
      title: 'Densidade Demográfica',
      text: 'Pessoas por km²: Bangladesh (1000+), Holanda (400), Brasil (23), Canadá (4). Desenvolvidos vivem em cidades. Subdesenvolvidos esparsos.',
      example: 'Cingapura: 8000/km². Canadá: 4/km². Diferença é desenvolvimento (urbano) vs rural.'
    },
    {
      id: 'b3',
      title: 'Migrações',
      text: 'Pessoas se movem por: fome, guerra, busca de trabalho. Do rural para urbano. De país pobre para rico. Migrações moldam cidades, sociedades.',
      example: 'Sírios fogem de guerra. Haitianos vão ao Brasil. Africanos vão à Europa. Cada fluxo tem razão.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'populacao',
      prompt: 'Por que crescimento populacional desacelerou?',
      options: [
        'Menos nasce pessoas',
        'Mulheres têm menos filhos (acesso a educação, contraceptivos)',
        'Mais mortes',
        'Mais emigração'
      ],
      answer: 1,
      explanation: 'Crescimento desacelerou porque mulheres educadas têm menos filhos. Aumento de idade de mãe e acesso a planejamento familiar.',
      hints: ['Dica 1: Mudança em comportamento reprodutivo', 'Dica 2: Educação feminina importante', 'Dica 3: Desenvolvidos têm menos filhos']
    }
  ],
  skills: { 'populacao': 'Entender dinâmica populacional' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

export const desenvolvimentoEconomico: Lesson = {
  id: 'geo-fund2-010',
  subject: 'geografia',
  grade: '8º-9º ano',
  title: 'Desenvolvimento Econômico e Desigualdade',
  levels: ['fund2'],
  aliases: ['desenvolvido', 'em desenvolvimento', 'subdesenvolvido', 'PIB', 'renda', 'desigualdade'],
  summary: 'Por que alguns países são ricos e outros pobres',
  intro: 'Desigualdade econômica entre países é maior desigualdade do mundo.',
  objective: 'Entender diferenças de desenvolvimento, analisar causas, criticar injustiça',
  topic: 'Economia e Desenvolvimento',
  subtopic: 'Desigualdade Global',
  blocks: [
    {
      id: 'b1',
      title: 'Desenvolvidos vs Subdesenvolvidos',
      text: 'Desenvolvidos: EUA, Canadá, Europa Ocidental, Japão, Austrália. PIB per capita >$35k. Tecnologia, educação, saúde. Subdesenvolvidos: maioria do mundo. PIB per capita <$5k. Pobreza, analfabetismo, fome.',
      example: 'Suíça: $94k PIB/pessoa. Moçambique: $500 PIB/pessoa. 188x diferença!'
    },
    {
      id: 'b2',
      title: 'Causas Históricas',
      text: 'Colonialismo roubou recursos de América, África, Ásia. Industrialização criou riqueza no Ocidente. Hoje: países ex-colônias ainda explorados. Comércio injusto: ricos compram barato de pobres.',
      example: 'Brasil exporta soja por $300/ton, compra maquinário por $1000/ton. Desvantagem continua.'
    },
    {
      id: 'b3',
      title: 'Problemas Causados',
      text: 'Pobreza causa: fome, sem educação, sem saúde, sem segurança. Leva a emigração, conflitos. Desigualdade é insustentável.',
      example: '1 bilhão pessoas vivem com <$2/dia. 250 milhões crianças não vão à escola. 5 milhões morrem de fome/desnutrição anualmente.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'desenvolvimento',
      prompt: 'Qual foi principal fator histórico causando desigualdade global?',
      options: [
        'Diferenças de inteligência',
        'Vontade de Deus',
        'Colonialismo: exploração de recursos e pessoas',
        'Distância do Equador'
      ],
      answer: 2,
      explanation: 'Colonialismo (séculos XVI-XX) roubou recursos e escravizou populações. Benefício para colonizadores, prejuízo duradouro para colonizados.',
      hints: ['Dica 1: História', 'Dica 2: Exploração europeia', 'Dica 3: Continua afetando hoje']
    }
  ],
  skills: { 'desenvolvimento': 'Entender desigualdade econômica global' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

// ═══════════════════════════════════════════════════════════════════════════════════
// ENSINO MÉDIO (1º-3º Médio) — Geografia Aplicada
// ═══════════════════════════════════════════════════════════════════════════════════

export const brasilRelievoClima: Lesson = {
  id: 'geo-medio-011',
  subject: 'geografia',
  grade: '1º Médio',
  title: 'Brasil — Relevo, Clima, Vegetação, Hidrografia',
  levels: ['medio'],
  aliases: ['Brasil', 'relevo', 'Escudo Brasileiro', 'Pantanal', 'rio Amazonas', 'Mata Atlântica'],
  summary: 'Geografía física do Brasil: estrutura do território',
  intro: 'Brasil tem grande diversidade de relevo, clima, vegetação e rios.',
  objective: 'Compreender estrutura geográfica brasileira, relacionar fatores',
  topic: 'Brasil',
  subtopic: 'Geografia Física',
  blocks: [
    {
      id: 'b1',
      title: 'Relevo Brasileiro',
      text: 'Escudo Brasileiro (planaltos, serras). Depressão Amazônica (bacia, terras baixas). Planícies (Pantanal, Costeira). Maioria planaltos antigos, pouca montanha. Serra da Mantiqueira, Serra do Mar.',
      example: 'Pico da Neblina: 2994m (mais alto). Maior parte está entre 200-1000m. Terraços suportam rios que formam quedas (energia hidroelétrica).'
    },
    {
      id: 'b2',
      title: 'Clima e Vegetação',
      text: 'Tropical (Amazônia): 2000mm chuva/ano. Subtropical (Sul): 4 estações. Semiárido (Nordeste): 300-600mm. Vegetação: Floresta Amazônica, Cerrado, Caatinga, Mata Atlântica, Pantanal.',
      example: 'Amazônia: perene. Cerrado: seco/úmido. Caatinga: adaptado a seca. Mata Atlântica: destruída (5% restante).'
    },
    {
      id: 'b3',
      title: 'Hidrografia',
      text: 'Rio Amazonas: maior volume d\'água do mundo. Rio Paraná: hidroeletricidade (Itaipu). Rio São Francisco: seca. Bacia Amazônica, Bacia do Paraná, Bacia do Atlântico.',
      example: 'Amazonas: 1100 afluentes, 209.000 km³ água/ano. Amazônia é "pulmão do mundo": 20% do oxigênio global.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'brasil-fisica',
      prompt: 'Qual rio tem maior volume de água no mundo?',
      options: ['Rio Paraná', 'Rio Amazonas', 'Rio Nilo', 'Rio Mississípi'],
      answer: 1,
      explanation: 'Amazonas descarrega 209.000 km³ de água/ano no oceano. Maior volume de qualquer rio.',
      hints: ['Dica 1: Fica na América do Sul', 'Dica 2: Na Amazônia', 'Dica 3: Maior bacia hidrográfica']
    }
  ],
  skills: { 'brasil-fisica': 'Entender geografia física do Brasil' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-medio-012']
}

export const meioAmbiente: Lesson = {
  id: 'geo-medio-012',
  subject: 'geografia',
  grade: '2º-3º Médio',
  title: 'Meio Ambiente — Mudanças Climáticas e Recursos',
  levels: ['medio'],
  aliases: ['mudanças climáticas', 'aquecimento global', 'recursos naturais', 'sustentabilidade', 'carbono'],
  summary: 'Desafios ambientais globais e caminhos para sustentabilidade',
  intro: 'Terra aquece. Recursos diminuem. Futuro depende de ações agora.',
  objective: 'Entender crises ambientais, analisar impactos, propor soluções',
  topic: 'Meio Ambiente',
  subtopic: 'Sustentabilidade',
  blocks: [
    {
      id: 'b1',
      title: 'Mudanças Climáticas',
      text: 'CO2 sobe (2021: 415ppm vs 1750: 280ppm). Temperatura sobe 1.1°C em 100 anos. Consequências: ondas de calor, secas, chuvas extremas, extinção. 97% cientistas concordam: é causado por humanos.',
      example: 'Verão 2023: ondas de calor mataram 1000s pessoas. Canada fogo. Paquistão 1/3 submerso. Coral bleaching em todos oceanos.'
    },
    {
      id: 'b2',
      title: 'Recursos Esgotáveis',
      text: 'Petróleo: ~100 anos restantes. Água doce: 3% da água, mal distribuída. Floresta: 1000 espécies extintas/dia. Fisheries: 90% overfished. Impacto: energia, segurança alimentar, biodiversidade.',
      example: 'Aquífero Guarani tem 45 anos de água. Amazônia se torna savana em 20 anos se desmatamento continuar. 1 milhão espécies em risco de extinção.'
    },
    {
      id: 'b3',
      title: 'Caminhos para Sustentabilidade',
      text: 'Energia renovável (solar, eólica). Agricultura sustentável. Educação ambiental. Leis de proteção. Cooperação global (Paris Agreement). Transição energética é lentamente, mas crítica.',
      example: 'Costa Rica: 99% eletricidade renovável. Dinamarca: 80% eólica. Mas mundo ainda depende de combustível fóssil.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 3,
      skill: 'meio-ambiente',
      prompt: 'Qual é principal causa de mudanças climáticas?',
      options: [
        'Ciclos naturais da Terra',
        'Atividades humanas: emissão de CO2 (combustível, desmatamento)',
        'Variação solar',
        'Vulcões'
      ],
      answer: 1,
      explanation: '97% de cientistas concordam: aquecimento global é causado principalmente por atividades humanas emitindo CO2.',
      hints: ['Dica 1: Humano', 'Dica 2: Industrial', 'Dica 3: Desde 1750']
    }
  ],
  skills: { 'meio-ambiente': 'Entender crises ambientais' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-medio-013']
}

export const energia: Lesson = {
  id: 'geo-medio-013',
  subject: 'geografia',
  grade: '2º-3º Médio',
  title: 'Energia — Fontes e Transição Energética',
  levels: ['medio'],
  aliases: ['energia', 'petróleo', 'carvão', 'nuclear', 'solar', 'eólica', 'transição energética'],
  summary: 'De combustível fóssil para energia renovável',
  intro: '80% energia global vem de combustível fóssil. Transição é urgente.',
  objective: 'Entender matriz energética, comparar fontes, analisar transição',
  topic: 'Energia',
  subtopic: 'Fontes e Transição',
  blocks: [
    {
      id: 'b1',
      title: 'Fontes de Energia Atuais',
      text: 'Petróleo (32%), Carvão (27%), Gás (24%), Nuclear (4%), Hidro (6%), Renovável (7%). Fósseis: baratos, estabelecidos, mas poluem. Renováveis: limpas, crescem rápido, mas precisam investimento.',
      example: 'EUA: 80% fóssil. Brasil: 65% renovável (hidro + biomassa). Alemanha: 46% renovável em 2023 (sobe rápido).'
    },
    {
      id: 'b2',
      title: 'Energias Renováveis',
      text: 'Solar: cresce 20%/ano. Eólica: 12%/ano. Hidro: estabelecida. Geotermal: localizado. Biomassa: renovável se bem gerida. Hidroelétrica no Brasil: Itaipu, Sobradinho (hidroeletricas gigantes).',
      example: 'China tem 50% da capacidade solar global. Dinamarca: 80% eólica em 2030. EUA: Texas líder em eólica.'
    },
    {
      id: 'b3',
      title: 'Transição Energética',
      text: 'Shift para renováveis é tecnicamente possível. Baratos agora: solar é <$0.02/kWh. Politicamente difícil: lobby fóssil poderoso. Países competem por liderança em tecnologia verde.',
      example: 'Alemanha Energiewende (saída do carvão). UK sem carvão em 2025. Brasil poderia ser 100% renovável com hidro + eólica.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'energia',
      prompt: 'Qual é fonte energética que cresce mais rápido no mundo?',
      options: [
        'Petróleo',
        'Carvão',
        'Solar e eólica (renováveis)',
        'Nuclear'
      ],
      answer: 2,
      explanation: 'Solar cresce 20%/ano, eólica 12%/ano. Renováveis são fonte que mais cresce no mundo.',
      hints: ['Dica 1: Limpa', 'Dica 2: Percentual alto de crescimento', 'Dica 3: Futuro da energia']
    }
  ],
  skills: { 'energia': 'Entender matriz energética global' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-medio-014']
}

export const agua: Lesson = {
  id: 'geo-medio-014',
  subject: 'geografia',
  grade: '2º-3º Médio',
  title: 'Água — Recurso Escasso',
  levels: ['medio'],
  aliases: ['água', 'aquífero', 'escassez', 'poluição', 'conflitos', 'segurança hídrica'],
  summary: 'Crise de água: disponibilidade, distribuição, poluição',
  intro: '2 bilhões pessoas enfrentam escassez severa de água.',
  objective: 'Entender crise hídrica, analisar conflitos, propor conservação',
  topic: 'Água',
  subtopic: 'Segurança Hídrica',
  blocks: [
    {
      id: 'b1',
      title: 'Distribuição Desigual',
      text: '97% água salgada. 3% doce. 2% congelada. 1% acessível. Brasil tem 12% da água doce do mundo. Mas distribuição é desigual: Amazonas abundante, Nordeste seco. Aquíferos (água subterrânea) são estratégicos.',
      example: 'Aquífero Guarani (Brasil, Argentina): 45.000km³. Aquífero árabe (Irã, Iraque): depleção rápida. Irã sofre seca crônica.'
    },
    {
      id: 'b2',
      title: 'Crises Hídricas',
      text: 'Escassez afeta 2B pessoas. Poluição: 80% wastewater retorna sujo. Agricultura usa 70% água doce. Cidades competem por água. Conflitos: Nilo (10 países), Tigre-Eufrates (5 países), Índus (2 países).',
      example: 'Síria: seca 2006-2010 causou migração, clima para guerra. Egito vs Etiópia: disputa sobre Nilo. Califórnia: seca histórica 2012-2022.'
    },
    {
      id: 'b3',
      title: 'Conservação e Solução',
      text: 'Tecnologia: dessalinização, tratamento, reutilização. Agricultura eficiente: gota a gota vs aspersão. Educação: reduzir consumo. Política: compartilhamento justo. Futuro: água será mais valiosa que petróleo.',
      example: 'Israel: 80% água reciclada. Singapura: 30% água dessalinizada. Dubai: completamente dependente de dessalinização.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'agua',
      prompt: 'Qual percentual da água mundial é doce e acessível?',
      options: ['30%', '10%', '1%', '50%'],
      answer: 2,
      explanation: '97% é salgada. De 3% doce: 2% congelada. Apenas 1% é água doce acessível para humanos.',
      hints: ['Dica 1: Muito pequeno', 'Dica 2: Menos de 3%', 'Dica 3: 2 bilhões pessoas competem']
    }
  ],
  skills: { 'agua': 'Entender segurança hídrica global' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['geo-medio-015']
}

export const migracoes: Lesson = {
  id: 'geo-medio-015',
  subject: 'geografia',
  grade: '2º-3º Médio',
  title: 'Migrações e Deslocamentos Humanos',
  levels: ['medio'],
  aliases: ['migração', 'refugiado', 'diáspora', 'êxodo', 'deslocamento forçado'],
  summary: 'Fluxos humanos provocados por pobreza, guerra, clima',
  intro: '280 milhões migrantes internacionais vivem fora de terra natal.',
  objective: 'Entender causas e consequências de migrações, analisar impactos',
  topic: 'Migrações',
  subtopic: 'Deslocamentos Humanos',
  blocks: [
    {
      id: 'b1',
      title: 'Tipos de Migrações',
      text: 'Migração econômica: busca trabalho (México→EUA). Refúgio: foge guerra (Síria→Europa, Afeganistão→Paquistão). Clima: seca, inundação forçam saída (Haiti, Bangladesh). Diáspora: comunidade dispersa (judeus, africanos, chineses).',
      example: '3.6M sírios em Turquia (maior população refugiados). 1M haitianos no Brasil. 100M chineses que saíram da China no século XX.'
    },
    {
      id: 'b2',
      title: 'Fluxos Principais Atuais',
      text: 'México→EUA: 10M. Síria→vizinhos: 5M. Afeganistão→Paquistão: 2M. Irã→Turquia: 4M. Ucrânios→EU: 6M (após 2022). Rotas: Terra, mar (Mediterrâneo: 5000+ mortes/ano).',
      example: 'Caravana haitiana 2021: 12000 pessoas pedindo asilo. Rota Mediterrânea: "botas de borracha": balsas precárias.'
    },
    {
      id: 'b3',
      title: 'Impactos e Xenofobia',
      text: 'Positivo: remessas alimentam famílias (Bangladesh: 7% PIB). Imigrantes enriquecem cidades (cultura, inovação). Negativo: exploração, discriminação, conflitos sobre recursos. Políticos exploram medo (xenofobia).',
      example: 'Migrantes enviaram $731B remessas em 2022 (3x ajuda oficial). Mas enfrentam racismo, não acesso a direitos. EUA deporta migrantes. EU fecha fronteiras.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'migracoes',
      prompt: 'Qual é principal causa de migrações atuais?',
      options: [
        'Turismo',
        'Pobreza, guerra e mudanças climáticas',
        'Curiosidade',
        'Educação apenas'
      ],
      answer: 1,
      explanation: 'Pessoas migram para escapar: pobreza (México), guerra (Síria), seca (Sahel), inundações (Bangladesh). Desespero, não escolha.',
      hints: ['Dica 1: Motivação séria', 'Dica 2: Fuga', 'Dica 3: Causa crises humanitárias']
    }
  ],
  skills: { 'migracoes': 'Entender migrações globais' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

// ═══════════════════════════════════════════════════════════════════════════════════
// EXPORT ARRAY
// ═══════════════════════════════════════════════════════════════════════════════════

export const GEOGRAFIA_LOTE5: Lesson[] = [
  // Fund I
  oQueEGeografia,
  mapaOrientacao,
  coordenadasGeograficas,
  continentesOceanos,
  biomasEcossistemas,
  brasilRegioes,
  // Fund II
  americaLatina,
  clima,
  populacaoDinamica,
  desenvolvimentoEconomico,
  // Médio
  brasilRelievoClima,
  meioAmbiente,
  energia,
  agua,
  migracoes
]
