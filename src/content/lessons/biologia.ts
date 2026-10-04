/**
 * BIOLOGIA — Lote 6 Completo
 * Fundamental I até Ensino Médio
 * 20 aulas com progressão pedagógica
 */

import type { Lesson } from '../../types'

// ═══════════════════════════════════════════════════════════════════════════════════
// FUNDAMENTAL I (1º-5º ano) — Vida Básica
// ═══════════════════════════════════════════════════════════════════════════════════

export const seresVivosNaoVivos: Lesson = {
  id: 'bio-fund1-001',
  subject: 'biologia',
  grade: '1º-2º ano',
  title: 'Seres Vivos vs Não-Vivos',
  levels: ['fund1'],
  aliases: ['seres vivos', 'não-vivos', 'vida', 'característica', 'movimento', 'crescimento'],
  summary: 'Características que definem vida',
  intro: 'O que é vida? Como distinguir seres vivos de coisas não-vivas?',
  objective: 'Identificar seres vivos, compreender características de vida, classificar objetos',
  topic: 'Conceitos Básicos',
  subtopic: 'Definição de Vida',
  blocks: [
    {
      id: 'b1',
      title: 'Características de Seres Vivos',
      text: 'Seres vivos: nascem, crescem, se reproduzem, morrem. Respiram (trocam gases). Se alimentam. Respondem ao ambiente. Se movem (alguns). Não-vivos: pedras, água, ar — não fazem nenhum disso.',
      example: 'Planta: cresce, respira, se reproduz. Pedra: não cresce, não respira, nunca morre porque nunca viveu.'
    },
    {
      id: 'b2',
      title: 'Exemplos de Seres Vivos',
      text: 'Animais (você, inseto, peixe). Plantas (árvore, grama, flor). Fungos (cogumelo). Bactérias (invisíveis mas vivas). Microorganismos. Todos respiram (mesmo plantas).',
      example: 'Gato é vivo: respira, come, cresce, se reproduz, morre. Carro não é vivo: não respira, não se reproduz, precisa gasolina (não é alimento).'
    },
    {
      id: 'b3',
      title: 'Vida Requer Certas Coisas',
      text: 'Água: todas células têm água. Energia: vem do alimento (ou luz para plantas). Ar: oxigênio para respirar (maioria). Temperatura: nem muito quente nem muito frio.',
      example: 'Peixes na água gelada respiram oxigênio dissolvido. Plantas no deserto armazenam água. Bactérias termófilas vivem em água quente 100°C.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'vida-basica',
      prompt: 'Qual é característica de ser vivo?',
      options: [
        'Ser muito grande',
        'Nascer, crescer, se reproduzir e morrer',
        'Ser colorido',
        'Viver em terra'
      ],
      answer: 1,
      explanation: 'Todos seres vivos nascem, crescem, se reproduzem e morrem. Isso define vida.',
      hints: ['Dica 1: Ciclo', 'Dica 2: Começo, meio, fim', 'Dica 3: Todo animal e planta']
    }
  ],
  skills: { 'vida-basica': 'Definir vida e características' },
  review: ['O que é ser vivo?', 'Nomeie 3 seres vivos', 'O que não-vivos não fazem?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['bio-fund1-002']
}

export const plantasAnimaisBasico: Lesson = {
  id: 'bio-fund1-002',
  subject: 'biologia',
  grade: '2º-3º ano',
  title: 'Plantas e Animais — Básico',
  levels: ['fund1'],
  aliases: ['planta', 'animal', 'herbívoro', 'carnívoro', 'diferença', 'classificação'],
  summary: 'Diferenças entre plantas e animais',
  intro: 'Plantas e animais são seres vivos muito diferentes.',
  objective: 'Diferenciar plantas de animais, entender necessidades de cada um',
  topic: 'Seres Vivos',
  subtopic: 'Plantas vs Animais',
  blocks: [
    {
      id: 'b1',
      title: 'Como Plantas Vivem',
      text: 'Plantas fazem comida usando luz solar (fotossíntese). Raiz bebe água do solo. Folhas capturam luz. Não se movem muito (ficam no lugar). Alguns animais comem plantas.',
      example: 'Árvore: raiz na terra, tronco sustenta, galhos e folhas pegam sol. Não anda, não fala, não corre — mas está viva.'
    },
    {
      id: 'b2',
      title: 'Como Animais Vivem',
      text: 'Animais comem para se alimentar (planta ou animal). Podem se mover (andar, nadar, voar). Sentem com olhos, orelhas, nariz. Alguns comem plantas (herbívoro), alguns comem carne (carnívoro).',
      example: 'Vaca: herbívoro, come grama. Leão: carnívoro, come vaca. Você: onívoro, come planta e animal.'
    },
    {
      id: 'b3',
      title: 'Interdependência',
      text: 'Plantas precisam de terra, água, luz. Animais precisam de comida (plantas ou outros animais). Ambos respiram. Ciclo: planta cresce, animal come, animal morre e volta à terra (nutrientes para planta).',
      example: 'Cadeia: grama → vaca → leão. Cada um depende do outro. Se acabar grama, vaca morre, leão morre.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'plantas-animais',
      prompt: 'Como plantas fazem comida?',
      options: [
        'Comendo outras plantas',
        'Usando luz solar (fotossíntese)',
        'Comendo animais',
        'Bebendo água'
      ],
      answer: 1,
      explanation: 'Plantas fazem comida usando fotossíntese: luz solar + água + CO2 = glicose.',
      hints: ['Dica 1: Usa energia do sol', 'Dica 2: Nome tem "foto" (luz)', 'Dica 3: Nas folhas']
    }
  ],
  skills: { 'plantas-animais': 'Diferenciar plantas e animais' },
  review: ['Como planta se alimenta?', 'Como animal se alimenta?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['bio-fund1-001'],
  next: ['bio-fund1-003']
}

export const reproducaoBasica: Lesson = {
  id: 'bio-fund1-003',
  subject: 'biologia',
  grade: '3º-4º ano',
  title: 'Reprodução Básica',
  levels: ['fund1'],
  aliases: ['reprodução', 'bebê', 'nascer', 'gerar', 'clonagem', 'sexuada'],
  summary: 'Como seres vivos criam novos seres vivos',
  intro: 'Reprodução é característica de toda vida.',
  objective: 'Entender reprodução, diferenciar tipos, valorizar diversidade reprodutiva',
  topic: 'Reprodução',
  subtopic: 'Mecanismos Básicos',
  blocks: [
    {
      id: 'b1',
      title: 'Reprodução Sexuada',
      text: 'Macho + Fêmea fazem bebê novo (combinação de genes de ambos). Humanos, mamíferos, pássaros. Rápido e resulta em diversidade.',
      example: 'Você tem genes de pai e mãe. Irmão é diferente (genes diferentes). Cão + Gata = filhote com genes de ambos.'
    },
    {
      id: 'b2',
      title: 'Reprodução Assexuada',
      text: 'Um ser produz clone (cópia) de si sem outro. Bactérias se dividem. Alguns plantas fazem mudas (clones). Rápido, sem variedade.',
      example: 'Bactéria se divide em 2 idênticas. Morango faz "corredor" que vira nova planta (clone). Todos iguais.'
    },
    {
      id: 'b3',
      title: 'Por que Reproduzir?',
      text: 'Reprodução garante que espécie continua. Sexuada: cria diversidade, alguns sobrevivem a mudanças. Assexuada: rápida, eficiente. Ambas têm vantagens.',
      example: 'Se ambiente muda (seca), plantas sexuadas com genes diferentes têm chance de sobreviver. Clone não.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'reproducao',
      prompt: 'Qual tipo reprodução resulta em cópia igual do pai?',
      options: [
        'Reprodução sexuada',
        'Reprodução assexuada',
        'Ambas',
        'Nenhuma'
      ],
      answer: 1,
      explanation: 'Reprodução assexuada resulta em clone: cópia igual do genitor.',
      hints: ['Dica 1: Uma pessoa só', 'Dica 2: Idêntico', 'Dica 3: Bactérias fazem assim']
    }
  ],
  skills: { 'reproducao': 'Entender reprodução' },
  review: ['O que é reprodução sexuada?', 'O que é assexuada?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['bio-fund1-001'],
  next: ['bio-fund1-004']
}

export const habitatEcossistemaSimples: Lesson = {
  id: 'bio-fund1-004',
  subject: 'biologia',
  grade: '4º-5º ano',
  title: 'Habitat e Ecossistema Simples',
  levels: ['fund1'],
  aliases: ['habitat', 'ecossistema', 'floresta', 'rio', 'interação', 'comunidade'],
  summary: 'Onde seres vivos vivem e como interagem',
  intro: 'Cada ser vivo tem seu lugar especial na natureza.',
  objective: 'Entender habitat, compreender ecossistema, valorizar interdependência',
  topic: 'Ecologia Básica',
  subtopic: 'Habitat e Ecossistema',
  blocks: [
    {
      id: 'b1',
      title: 'Habitat',
      text: 'Habitat é casa do ser vivo. Peixe: rio/oceano. Árvore: floresta. Você: casa. Cada um precisa de condições certas: comida, abrigo, clima.',
      example: 'Urso polar: gelo do Ártico (não sobrevive em deserto). Camelo: deserto (não sobrevive no gelo). Adaptação ao habitat.'
    },
    {
      id: 'b2',
      title: 'Ecossistema',
      text: 'Ecossistema é comunidade inteira: todas plantas, animais, fungos num lugar. Todos interagem: comem um ao outro, compartilham ar, renovam solo. Exemplo: floresta inteira é ecossistema.',
      example: 'Floresta: árvore, inseto na árvore, pássaro come inseto, pássaro morre, volta à terra alimenta árvore.'
    },
    {
      id: 'b3',
      title: 'Equilíbrio',
      text: 'Ecossistema em equilíbrio: predador controla presa, presa alimenta predador. Se um muda, tudo muda. Destruir habitat destrói ecossistema inteiro.',
      example: 'Sem presa: predador morre de fome. Muita presa: população explode. Destruir floresta: centenas de espécies desaparecem.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 1,
      skill: 'habitat-eco',
      prompt: 'O que é habitat?',
      options: [
        'Casa de um ser vivo com condições que ele precisa',
        'Toda a floresta',
        'Temperatura do ar',
        'Tipo de comida'
      ],
      answer: 0,
      explanation: 'Habitat é lugar onde ser vivo vive: tem comida, abrigo, clima certo.',
      hints: ['Dica 1: Casa', 'Dica 2: Específico para cada criatura', 'Dica 3: Peixe tem diferente de árvore']
    }
  ],
  skills: { 'habitat-eco': 'Entender habitat e ecossistema' },
  review: ['O que é habitat?', 'O que é ecossistema?', 'Qual a diferença?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['bio-fund1-005']
}

export const cadeiaCadaAlimentarSimples: Lesson = {
  id: 'bio-fund1-005',
  subject: 'biologia',
  grade: '5º ano',
  title: 'Cadeia Alimentar Simples',
  levels: ['fund1', 'fund2'],
  aliases: ['cadeia alimentar', 'produtor', 'consumidor', 'decompositor', 'energia'],
  summary: 'Fluxo de energia através dos seres vivos',
  intro: 'Tudo come algo e é comido por algo.',
  objective: 'Entender cadeia alimentar, compreender fluxo de energia, valorizar cada papel',
  topic: 'Ecologia',
  subtopic: 'Cadeia Alimentar',
  blocks: [
    {
      id: 'b1',
      title: 'Cadeias Alimentares',
      text: 'Produtores (plantas): fazem energia. Consumidores primários (herbívoros): comem plantas. Consumidores secundários (carnívoros): comem herbívoros. Decompositores: reciclam nutrientes.',
      example: 'Simples: grama → coelho → raposa. Coelho morre, decompositor recicla, nutrientes volta para grama.'
    },
    {
      id: 'b2',
      title: 'Fluxo de Energia',
      text: 'Energia vem do sol. Planta captura. Herbívoro come planta, perde 90% energia (só usa 10%). Carnívoro come herbívoro, perde 90% de novo. Poucas plantas alimentam muitos herbívoros alimentam poucos carnívoros.',
      example: 'Precisa 100 kg grama para fazer 10 kg coelho. Precisa 10 kg coelho para fazer 1 kg raposa. Pirâmide de energia.'
    },
    {
      id: 'b3',
      title: 'Importância',
      text: 'Cadeia alimentar mostra que tudo está conectado. Matar um animal afeta toda cadeia. Entender cadeia ajuda conservar natureza.',
      example: 'Extinção de abelhas afeta polinização afeta frutas afeta herbívoros afeta carnívoros. Uma espécie desaparece, cascata de problema.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'cadeia-alimentar',
      prompt: 'Qual é produtor numa cadeia alimentar?',
      options: [
        'Herbívoro',
        'Carnívoro',
        'Planta (que faz energia do sol)',
        'Decompositor'
      ],
      answer: 2,
      explanation: 'Produtor é planta que faz comida a partir de luz solar usando fotossíntese.',
      hints: ['Dica 1: Primeiro da cadeia', 'Dica 2: Faz energia', 'Dica 3: Usa luz solar']
    }
  ],
  skills: { 'cadeia-alimentar': 'Entender cadeia alimentar' },
  review: ['Desenhe uma cadeia simples', 'Qual faz energia?', 'Qual come quem?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['bio-fund1-002'],
  next: ['bio-fund2-006']
}

// ═══════════════════════════════════════════════════════════════════════════════════
// FUNDAMENTAL II (6º-9º ano) — Biologia Estrutural
// ═══════════════════════════════════════════════════════════════════════════════════

export const celulaUnidadeVida: Lesson = {
  id: 'bio-fund2-006',
  subject: 'biologia',
  grade: '6º ano',
  title: 'Célula — Unidade da Vida',
  levels: ['fund2'],
  aliases: ['célula', 'núcleo', 'mitocôndria', 'membrana', 'citoplasma', 'microscópio'],
  summary: 'Estrutura básica de todos os seres vivos',
  intro: 'Toda vida é feita de células. Célula é unidade mínima de vida.',
  objective: 'Entender estrutura celular, conhecer organelas, compreender função',
  topic: 'Citologia',
  subtopic: 'Estrutura Celular',
  blocks: [
    {
      id: 'b1',
      title: 'O que é Célula',
      text: 'Célula é saquinho minúsculo (0.001mm) cheio de vida. Você tem 37 trilhões de células. Cada célula respira, come, cresce, morre. Células formam tecidos, tecidos formam órgãos.',
      example: 'Célula vermelha do sangue: vive 120 dias, depois morre. Você faz 2 milhões por segundo para repor. Pele inteira se renova em 2-4 semanas.'
    },
    {
      id: 'b2',
      title: 'Partes da Célula',
      text: 'Membrana: cerca a célula. Citoplasma: gel interior. Núcleo: tem DNA (instruções). Mitocôndria: fornece energia. Organelas: fazem tarefas.',
      example: 'Membrana é porta: controla o que entra/sai. Mitocôndria é bateria: fornece ATP (energia). Núcleo é biblioteca: tem receita para tudo.'
    },
    {
      id: 'b3',
      title: 'Célula Procariota vs Eucariota',
      text: 'Procariota (bactéria): sem núcleo. Eucariota (você, planta): tem núcleo. Eucariota é maior e mais complexa. Ambas têm membrana e citoplasma.',
      example: 'Bactéria: simples, rápida, adaptável. Célula humana: complexa, lenta em dividir, especializada.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'celula',
      prompt: 'Qual organela fornece energia para célula?',
      options: [
        'Núcleo',
        'Mitocôndria',
        'Ribossomo',
        'Membrana'
      ],
      answer: 1,
      explanation: 'Mitocôndria é "bateria" da célula: produz ATP (energia usada em tudo).',
      hints: ['Dica 1: Energia', 'Dica 2: "Bateria" celular', 'Dica 3: Respiração celular']
    }
  ],
  skills: { 'celula': 'Entender estrutura celular' },
  review: ['Nomeie 4 partes da célula', 'O que mitocôndria faz?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['bio-fund2-007']
}

export const fotossinteseRespiracao: Lesson = {
  id: 'bio-fund2-007',
  subject: 'biologia',
  grade: '7º ano',
  title: 'Fotossíntese e Respiração',
  levels: ['fund2'],
  aliases: ['fotossíntese', 'respiração', 'glicose', 'oxigênio', 'CO2', 'energia'],
  summary: 'Processos que fazem e usam energia em seres vivos',
  intro: 'Fotossíntese faz comida. Respiração usa comida.',
  objective: 'Entender ambos processos, compreender interdependência, valorizar plantas',
  topic: 'Bioenergética',
  subtopic: 'Processos Energéticos',
  blocks: [
    {
      id: 'b1',
      title: 'Fotossíntese',
      text: 'Processo em plantas: luz solar + água + CO2 → glicose (comida) + oxigênio. Ocorre nas folhas. Clorofila (verde) capta luz. Resultado: alimento para planta, oxigênio para nós.',
      example: 'Árvore: pega CO2 do ar, água das raízes, luz do sol → faz açúcar (glicose) → cresce tronco/galhos/folhas. Soltador oxigênio que você respira.'
    },
    {
      id: 'b2',
      title: 'Respiração',
      text: 'Processo em todas células: glicose + oxigênio → energia (ATP) + CO2 + água. Ocorre em mitocôndria. Queima alimento para liberar energia. Respiração aeróbica (com oxigênio) é mais eficiente.',
      example: 'Você respira: pega O2 do ar → células usam para queimar glicose → libera CO2 → expira. Energia liberada move músculos, pensa, digere.'
    },
    {
      id: 'b3',
      title: 'Ciclo da Vida',
      text: 'Fotossíntese e respiração são opostos. Planta faz O2 + glicose. Você usa O2 + glicosa, libera CO2. Planta respira CO2. Ciclo infinito: você respira, planta usa CO2, faz O2 novo.',
      example: 'Selada: planta + você numa caixa = ciclo fechado. Planta produz O2 novo, você produz CO2 novo, vai eternamente sem entrada/saída.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'fotossintese',
      prompt: 'O que é entrada de fotossíntese?',
      options: [
        'Glicose e oxigênio',
        'Luz solar, água e CO2',
        'Apenas luz solar',
        'Oxigênio e água'
      ],
      answer: 1,
      explanation: 'Fotossíntese entrada: luz + água + CO2. Saída: glicose + oxigênio.',
      hints: ['Dica 1: Planta precisa disso', 'Dica 2: Tem 3 coisas', 'Dica 3: Ar + água + luz']
    }
  ],
  skills: { 'fotossintese': 'Entender fotossíntese e respiração' },
  review: ['Equação de fotossíntese?', 'Equação de respiração?'],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['bio-fund1-002'],
  next: ['bio-fund2-008']
}

export const reproducaoSexuadaAssexuada: Lesson = {
  id: 'bio-fund2-008',
  subject: 'biologia',
  grade: '7º-8º ano',
  title: 'Reprodução Sexuada vs Assexuada',
  levels: ['fund2'],
  aliases: ['meiose', 'mitose', 'gameta', 'esperma', 'óvulo', 'vantagens'],
  summary: 'Mecanismos e vantagens evolutivas de cada tipo',
  intro: 'Duas estratégias reprodutivas diferentes com propósitos diferentes.',
  objective: 'Entender mecanismos, comparar vantagens, apreciar estratégias evolutivas',
  topic: 'Reprodução',
  subtopic: 'Mecanismos',
  blocks: [
    {
      id: 'b1',
      title: 'Reprodução Assexuada',
      text: 'Uma célula (mãe) se divide em duas iguais via mitose. Rápido: bactéria dobra população a cada 20 minutos. Eficiente: sem procurar parceiro. Mas: sem diversidade, todos têm mesma fraqueza.',
      example: 'Bactéria MRSA resistente a antibiótico: clona, tudo é resistente. Sem diversidade, tudo morre junto se muda ambiente.'
    },
    {
      id: 'b2',
      title: 'Reprodução Sexuada',
      text: 'Macho (esperma) + fêmea (óvulo) = bebê diferente. Via meiose: célula se divide em 4 com metade dos genes. Lento: procura parceiro, 9 meses gravidez. Mas: diversidade, variação genética, alguns sobrevivem a tudo.',
      example: 'Você tem genes pai + mãe. Irmão tem combinação diferente. Se doença mata uma pessoa, outra (genética diferente) pode sobreviver.'
    },
    {
      id: 'b3',
      title: 'Estratégia Evolutiva',
      text: 'Assexuada: ótimo para ambiente estável. Sexuada: ótimo para ambiente caótico. Maioria dos complexos (humanos, animais) é sexuada. Bactérias são assexuadas (mais simples).',
      example: 'Ambiente muda rápido: sexuada vence (diversidade). Ambiente estável: assexuada vence (rápido). Humanos sexuados porque mundo é impredizível.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'reproducao-avancada',
      prompt: 'Qual tipo reprodução cria diversidade genética?',
      options: [
        'Assexuada',
        'Sexuada',
        'Ambas',
        'Nenhuma'
      ],
      answer: 1,
      explanation: 'Sexuada combina genes de dois pais → variação. Assexuada é clone → sem variação.',
      hints: ['Dica 1: Dois pais', 'Dica 2: Genes diferentes', 'Dica 3: Diversidade evolutiva']
    }
  ],
  skills: { 'reproducao-avancada': 'Entender reprodução avançada' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['bio-fund1-003'],
  next: ['bio-fund2-009']
}

export const herancaGeneticaMendel: Lesson = {
  id: 'bio-fund2-009',
  subject: 'biologia',
  grade: '8º-9º ano',
  title: 'Herança Genética — Mendel',
  levels: ['fund2'],
  aliases: ['Mendel', 'lei da segregação', 'dominante', 'recessivo', 'genes', 'herança'],
  summary: 'Como características passam de pais a filhos',
  intro: 'Mendel descobriu padrões de herança estudando ervilhas.',
  objective: 'Entender leis de Mendel, compreender herança, aplicar conceitos',
  topic: 'Genética Clássica',
  subtopic: 'Hereditariedade',
  blocks: [
    {
      id: 'b1',
      title: 'Gregor Mendel',
      text: 'Monge austriaco (1800s) experimentou com plantas de ervilha. Descobriu padrões. Traits aparecem em proporções: 3 dominante : 1 recessivo. Lei da segregação: genes se separam na meiose.',
      example: 'Ervilha alta (dominante) + ervilha baixa (recessiva) = 75% alta, 25% baixa na geração. Padrão previsível.'
    },
    {
      id: 'b2',
      title: 'Dominante vs Recessivo',
      text: 'Gene dominante: aparece se herdado de um ou ambos pais. Gene recessivo: aparece só se herdado de ambos. Você tem 2 genes por trait. Exemplo: olho castanho dominante (BB ou Bb), olho azul recessivo (bb).',
      example: 'Se pai tem Bb (olho castanho), mãe tem Bb (olho castanho), filho pode ser BB (castanho certo), Bb (castanho), bb (azul). 75% castanho, 25% azul.'
    },
    {
      id: 'b3',
      title: 'Aplicação Humana',
      text: 'Genes controlam altura, cor de cabelo, inteligência (complexo). Alguns traits simples (grupo sanguíneo). Outros complexos (múltiplos genes). Teste de DNA mostra herança.',
      example: 'Anemia falciforme: recessivo. Se ambos pais carregam, 25% chance filho tem doença. Hemofilia: ligada ao X, mais comum em homens.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'mendel',
      prompt: 'Se ambos pais são Aa (gene dominante/recessivo), qual proporção de filhos é aa (recessivo)?',
      options: ['25%', '50%', '75%', '100%'],
      answer: 0,
      explanation: 'Aa × Aa = 1 AA, 2 Aa, 1 aa. 25% aa (recessivo).',
      hints: ['Dica 1: Lei de Mendel', 'Dica 2: 3:1 proporção', 'Dica 3: Um em cada 4']
    }
  ],
  skills: { 'mendel': 'Entender genética mendeliana' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['bio-fund2-010']
}

export const evolucaoDarwinSelecaoNatural: Lesson = {
  id: 'bio-fund2-010',
  subject: 'biologia',
  grade: '8º-9º ano',
  title: 'Evolução — Darwin e Seleção Natural',
  levels: ['fund2'],
  aliases: ['Darwin', 'evolução', 'seleção natural', 'adaptação', 'origem das espécies'],
  summary: 'Como espécies mudam ao longo do tempo',
  intro: 'Vida não é estática. Tudo está evoluindo constantemente.',
  objective: 'Entender seleção natural, compreender mecanismo de evolução, apreciar Darwin',
  topic: 'Evolução',
  subtopic: 'Mecanismo Evolutivo',
  blocks: [
    {
      id: 'b1',
      title: 'Charles Darwin',
      text: 'Naturalista inglês (1809-1882). Viajou 5 anos em Galápagos estudando pássaros. Notou variação entre espécies. Propôs que vida compartilha ancestral comum. Origem das Espécies (1859) revolucionou biologia.',
      example: 'Tentilhões em Galápagos: bicos diferentes por dieta diferente (sementes). Mesmo ancestral, divergiu. Prova de evolução.'
    },
    {
      id: 'b2',
      title: 'Seleção Natural',
      text: 'Mecanismo: 1) Variação entre indivíduos. 2) Reprodução diferencial (alguns deixam mais filhos). 3) Herdabilidade (filhos herdam traits de pais). Resultado: traits úteis aumentam, inúteis diminuem. Ambiente "seleciona".',
      example: 'Bactérias resistentes a antibiótico: ambiente mata as sensíveis, resistentes sobrevivem e se reproduzem. Resistência evolui em semanas.'
    },
    {
      id: 'b3',
      title: 'Evidência',
      text: 'Fósseis mostram mudança ao longo do tempo. DNA mostra que humanos compartilham 99% com chimpanzés. Evolução é fato observado não "teoria" especulativa.',
      example: 'Cavalo antigo tinha 4 dedos, moderno tem 1 casco. Transição documentada em fóssil. Vestigiais (apêndice, coccix) mostram ancestrais.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'evolucao',
      prompt: 'Como seleção natural age?',
      options: [
        'Ambiente muda organismos intencionalmente',
        'Indivíduos melhor adaptados sobrevivem e reproduzem mais',
        'Deus escolhe quem sobrevive',
        'Tudo é acaso'
      ],
      answer: 1,
      explanation: 'Seleção natural: indivíduos melhor adaptados sobrevivem, deixam mais filhos, trait aumenta na população.',
      hints: ['Dica 1: Sobrevivência e reprodução', 'Dica 2: Gradual', 'Dica 3: Sem intenção']
    }
  ],
  skills: { 'evolucao': 'Entender evolução' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

// ═══════════════════════════════════════════════════════════════════════════════════
// ENSINO MÉDIO (1º-3º Médio) — Biologia Molecular
// ═══════════════════════════════════════════════════════════════════════════════════

export const dnaRnaGenetica: Lesson = {
  id: 'bio-medio-011',
  subject: 'biologia',
  grade: '1º Médio',
  title: 'Genética Molecular — DNA e RNA',
  levels: ['medio'],
  aliases: ['DNA', 'RNA', 'nucleotídeo', 'dupla hélice', 'genes', 'código genético'],
  summary: 'Linguagem molecular da vida',
  intro: 'DNA é moléculas que guardam receita para fazer você.',
  objective: 'Entender estrutura de DNA, compreender fluxo de informação, valorizar beleza molecular',
  topic: 'Genética Molecular',
  subtopic: 'DNA e RNA',
  blocks: [
    {
      id: 'b1',
      title: 'Estrutura de DNA',
      text: 'DNA é dupla hélice feita de nucleotídeos (A, T, G, C). Pares: A-T (2 pontes), G-C (3 pontes). Helicase abre, polimerase copia. Cromossomas são DNA compactado. Humano tem 3 bilhões de pares de bases.',
      example: 'DNA inteiro de você seria 2m de comprimento. Compactado em cromossomas cabe em núcleo (invisível de longe). Contém 20.000 genes aproximadamente.'
    },
    {
      id: 'b2',
      title: 'Fluxo de Informação',
      text: 'DNA (armazenamento) → RNA (mensageiro) → Proteína (execução). Transcrição: DNA cópia para RNA. Tradução: RNA instruções ribossomo fazer proteína. Proteínas fazem tudo (estrutura, enzimas, hormônios).',
      example: 'Gene para insulina: DNA tem instruções → RNA cópia → ribossomo lê RNA → faz proteína insulina → controla açúcar no sangue.'
    },
    {
      id: 'b3',
      title: 'Código Genético',
      text: 'Código de 3 letras (codon) = um aminoácido. 64 codons, 20 aminoácidos. Código é universal (quase) - bactéria e você usam código parecido. Prova que tudo vem do mesmo ancestral.',
      example: 'Codon ATG = começo. UCA = serina. UAA = parada. Ordem de codons = ordem de aminoácidos = estrutura de proteína.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'dna-rna',
      prompt: 'Qual é função de RNA?',
      options: [
        'Armazenar informação',
        'Copiar DNA e levar instruções para ribossomo',
        'Fazer proteínas',
        'Regular genes'
      ],
      answer: 1,
      explanation: 'RNA é mensageiro: copia DNA, leva instruções para ribossomo fazer proteína.',
      hints: ['Dica 1: Intermediário', 'Dica 2: Fluxo de informação', 'Dica 3: Transcrição']
    }
  ],
  skills: { 'dna-rna': 'Entender DNA e RNA' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['bio-medio-012']
}

export const biotecnologiaEngenhariaGenetica: Lesson = {
  id: 'bio-medio-012',
  subject: 'biologia',
  grade: '2º Médio',
  title: 'Biotecnologia e Engenharia Genética',
  levels: ['medio'],
  aliases: ['CRISPR', 'transgênico', 'clonagem', 'terapia gênica', 'OGM', 'biotecnologia'],
  summary: 'Manipulação de genes para benefício humano',
  intro: 'Podemos editar genes. Isso é poder extraordinário.',
  objective: 'Entender biotecnologia, analisar ética, debater aplicações',
  topic: 'Aplicações Biotecnologia',
  subtopic: 'Engenharia Genética',
  blocks: [
    {
      id: 'b1',
      title: 'Técnicas de Edição',
      text: 'CRISPR-Cas9: tesoura molecular que corta DNA em lugar específico. Preciso. Rápido. Barato (vs outros métodos antigos). Permite correção de genes mutados. Revolucionou genética.',
      example: 'Doença genética: mutação de um gene. CRISPR corta região mutada, celula conserta. Cura potencial de talassemia, anemia falciforme.'
    },
    {
      id: 'b2',
      title: 'Aplicações Atuais',
      text: 'Transgênicos (OGM): milho, soja com genes inseridos (resistente a praga). Medicina: vacinas de mRNA (COVID-19). Terapia gênica: corrigir genes em pacientes. Diagnóstico: teste de DNA.',
      example: 'Milho Bt tem gene de bactéria que mata inseto. Resistente, menos pesticida. Vacina COVID: mRNA instrui célula fazer proteína spike.'
    },
    {
      id: 'b3',
      title: 'Ética e Risco',
      text: 'Benefício: cura de doenças. Risco: "designer babies" (eugenia). Ambiental: OGM pode escapar, dominar espécies selvagens. Segurança alimentar: trangenicos são seguros (cientificamente), mas "natural" vende melhor.',
      example: 'Clonagem de ovelha Dolly mostrou é possível clonar mamíferos. Clonar humano é tecnicamente possível, mas eticamente proibido (maioria países).'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'biotecnologia',
      prompt: 'O que é CRISPR?',
      options: [
        'Tipo de proteína',
        'Técnica de edição de genes',
        'Doença genética',
        'Enzima que copia DNA'
      ],
      answer: 1,
      explanation: 'CRISPR-Cas9 é "tesoura molecular" que corta DNA em lugar preciso para editar genes.',
      hints: ['Dica 1: Ferramenta', 'Dica 2: Edição', 'Dica 3: Revolucionou genética']
    }
  ],
  skills: { 'biotecnologia': 'Entender biotecnologia' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: ['bio-medio-011'],
  next: ['bio-medio-013']
}

export const evolucaoHumana: Lesson = {
  id: 'bio-medio-013',
  subject: 'biologia',
  grade: '2º Médio',
  title: 'Evolução Humana',
  levels: ['medio'],
  aliases: ['evolução humana', 'hominídeos', 'Lucy', 'Homo sapiens', 'ancestral comum'],
  summary: 'Como humanos evoluíram de primatas',
  intro: 'Humanos e chimpanzés compartilham ancestral comum de 6 milhões de anos atrás.',
  objective: 'Entender genealogia humana, compreender evidência, valorizar perspectiva evolutiva',
  topic: 'Evolução Humana',
  subtopic: 'Filogenia',
  blocks: [
    {
      id: 'b1',
      title: 'Árvore de Parentesco',
      text: 'Australopithecus (4M anos atrás): bípede mas pequeno cérebro. Homo habilis: faz ferramentas. Homo erectus: fogo. Homo neanderthalensis: enterrava mortos (cultura). Homo sapiens: nós, 300K anos.',
      example: 'Lucy (Australopithecus afarensis): 3.2M anos. Esqueleto mostra bípede (caminha direito). Cérebro pequeno (400cc vs nosso 1400cc).'
    },
    {
      id: 'b2',
      title: 'Adaptações Humanas',
      text: 'Bipedalismo: mãos livres para ferramentas. Cérebro grande: pensamento complexo. Linguagem: comunicação avançada. Cultura: transmite conhecimento. Esses 4 definem humanidade.',
      example: 'Quando antepassados começaram andar em 2 pernas, mãos ficaram livres. Ferramentas requeria cérebro maior. Seleção natural favorecia cérebro grande.'
    },
    {
      id: 'b3',
      title: 'Evidência',
      text: 'Fósseis mostram transição. DNA mostra 99% homologia com chimpanzés. Anatomia: ossos vestigiais (coccix). Embriologia: fases de desenvolvimento semelhantes. Tudo aponta origem comum.',
      example: 'Homo sapiens saiu da África ~70K anos atrás. Colonizou mundo. Ícone de evolução mas ainda evoluindo (menos apêndice por seleção).'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'evolucao-humana',
      prompt: 'Qual foi adaptação crucial na evolução humana?',
      options: [
        'Andar em duas pernas (bipedalismo)',
        'Falar linguagem',
        'Usar ferramentas',
        'Cérebro grande'
      ],
      answer: 0,
      explanation: 'Bipedalismo liberou as mãos, permitindo ferramentas e desenvolvimento de cérebro maior.',
      hints: ['Dica 1: Primeira grande mudança', 'Dica 2: Liberou mãos', 'Dica 3: Australopithecus']
    }
  ],
  skills: { 'evolucao-humana': 'Entender evolução humana' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['bio-medio-014']
}

export const ecologiaPopulacoesComunidades: Lesson = {
  id: 'bio-medio-014',
  subject: 'biologia',
  grade: '2º-3º Médio',
  title: 'Ecologia — Populações e Comunidades',
  levels: ['medio'],
  aliases: ['população', 'comunidade', 'dinâmica populacional', 'competição', 'simbiose'],
  summary: 'Interações entre populações em ecossistema',
  intro: 'Ecologia estuda relações entre organismos e ambiente.',
  objective: 'Entender dinâmica populacional, compreender interações, aplicar conhecimento',
  topic: 'Ecologia',
  subtopic: 'Dinâmica de Populações',
  blocks: [
    {
      id: 'b1',
      title: 'Dinâmica Populacional',
      text: 'Tamanho população controlado por: natalidade (nascimentos), mortalidade (mortes), imigração (chegam), emigração (saem). Crescimento exponencial (rápido) vs logístico (curva S, atinge limite).',
      example: 'Coelhos sem predador: crescem exponencialmente. Quando alimento acaba: curva logística, população estabiliza ou decresce.'
    },
    {
      id: 'b2',
      title: 'Interações entre Populações',
      text: 'Predação: um mata outro. Competição: ambos quer mesmo recurso. Simbiose: mutualismo (ambos ganham), comensalismo (um ganha outro nada), parasitismo (um ganha outro perde).',
      example: 'Leão-gazela: predação. Plantas pelo mesmo nutriente: competição. Peixe-palhaço-anêmona: mutualismo. Rêmora-tubarão: comensalismo. Pulga-cão: parasitismo.'
    },
    {
      id: 'b3',
      title: 'Sucessão Ecológica',
      text: 'Após perturbação (fogo, vulcão): sucessão primária (nada → liquens → musgos → gramado → arbustos → floresta). Processo leva séculos. Comunidade final é clímax.',
      example: 'Lava vulcânica (rocha nua) → liquens quebram rocha → solo forma → musgos → gramas → arbustos → árvores em 500+ anos.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'ecologia-pop',
      prompt: 'O que é simbiose mutualística?',
      options: [
        'Um organismo mata outro',
        'Ambos organismos ganham benefício',
        'Um ganha, outro nada',
        'Um ganha, outro perde'
      ],
      answer: 1,
      explanation: 'Mutualismo: relação onde ambos organismos ganham benefício.',
      hints: ['Dica 1: Ambos ganham', 'Dica 2: Cooperação', 'Dica 3: Positivo para 2']
    }
  ],
  skills: { 'ecologia-pop': 'Entender ecologia de populações' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['bio-medio-015']
}

export const biomasAquaticos: Lesson = {
  id: 'bio-medio-015',
  subject: 'biologia',
  grade: '2º-3º Médio',
  title: 'Biomas Aquáticos',
  levels: ['medio'],
  aliases: ['oceano', 'rio', 'lago', 'coral', 'fitoplâncton', 'ecossistema aquático'],
  summary: 'Ecossistemas de água doce e salgada',
  intro: 'Água cobre 70% da Terra. Biomas aquáticos são diversos.',
  objective: 'Conhecer biomas aquáticos, compreender importância, valorizar conservação',
  topic: 'Biomas',
  subtopic: 'Ambientes Aquáticos',
  blocks: [
    {
      id: 'b1',
      title: 'Oceanos',
      text: 'Zona fótica: 0-200m, luz penetra, fotossíntese. Fitoplâncton é base. Recife de coral: biodiversidade máxima. Zona afótica: escuro, pressão alta, bactérias quimiossintéticas.',
      example: 'Recife de coral cobre <1% oceano mas tem 25% espécies marinhas. Morrendo por branqueamento (calor, poluição).'
    },
    {
      id: 'b2',
      title: 'Água Doce',
      text: 'Rios: fluxo, nutrientes vindos de terra. Lagos: estagnado, estratificação por temperatura. Wetlands/pântanos: transição, biodiversidade alta. Aquíferos: água subterrânea.',
      example: 'Amazônia: maior rio, 10% água doce do mundo descarregada. Lagos: Vitória, Malavi, Baikal (mais profundo).'
    },
    {
      id: 'b3',
      title: 'Ameaças',
      text: 'Poluição: plástico, esgoto, petróleo. Overfishing: superpesca. Mudanças climáticas: aquecimento, acidificação. Destruição de habitat: dragas, construção.',
      example: 'Grande mancha de plástico no Pacífico: 5 trilhões de plásticos. Recifes 50% destruídos. 90% peixes grandes extintos em 100 anos.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'biomas-aquaticos',
      prompt: 'Qual é base da cadeia alimentar marinha?',
      options: [
        'Peixes grandes',
        'Algas',
        'Fitoplâncton (algas microscópicas)',
        'Bactérias'
      ],
      answer: 2,
      explanation: 'Fitoplâncton: algas microscópicas que fazem fotossíntese. Base de maioria da vida marinha.',
      hints: ['Dica 1: Microscópico', 'Dica 2: Faz fotossíntese', 'Dica 3: Alimenta zooplâncton']
    }
  ],
  skills: { 'biomas-aquaticos': 'Entender biomas aquáticos' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: ['bio-medio-016']
}

export const conservacaoBiodiversidade: Lesson = {
  id: 'bio-medio-016',
  subject: 'biologia',
  grade: '3º Médio',
  title: 'Conservação e Biodiversidade',
  levels: ['medio'],
  aliases: ['biodiversidade', 'extinção', 'áreas protegidas', 'Natureza 2000', 'IUCN'],
  summary: 'Proteção de diversidade de vida',
  intro: 'Perdemos 1 espécie a cada 15 minutos. Precisamos agir agora.',
  objective: 'Entender crise de biodiversidade, conhecer estratégias, agir',
  topic: 'Conservação',
  subtopic: 'Biodiversidade',
  blocks: [
    {
      id: 'b1',
      title: 'Crise de Biodiversidade',
      text: 'Estamos na 6ª extinção em massa. Humanos causaram: habitat loss (80% do problema), poluição, clima, overfishing. Taxa: 100-1000x background. Milhão espécies em risco.',
      example: 'Rinoceronte-de-java: <75 indivíduos. Saola (Vietnã): <250. Panda: <2000 (recoverin). Abelhas desaparecem 40%/ano.'
    },
    {
      id: 'b2',
      title: 'Estratégias de Conservação',
      text: 'Áreas protegidas: parques nacionais (14% terra). Habitat corridors: ligar populações isoladas. Reprodução em cativeiro: último recurso. Educação: conscientizar população.',
      example: 'Parque do Serengeti: 1.4M gnus migram. Corredor de jaguares: liga populações isoladas México-Brasil. Panda criação em cativeiro recuou extinção.'
    },
    {
      id: 'b3',
      title: 'Por que Importa',
      text: 'Biodiversidade = estabilidade ecológica. Sem polinizadores: sem frutas. Sem árvores: sem oxigênio. Colapso em cascata. Moralmente: temos responsabilidade de não matar.',
      example: 'Perda de abelhas: alimentos dependem delas. Floresta morta: CO2 aumenta. Corais mortos: pesqueiros colapsam.'
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'mc',
      difficulty: 2,
      skill: 'conservacao',
      prompt: 'Qual é principal causa de extinção?',
      options: [
        'Mudanças climáticas',
        'Perda de habitat (destruição de floresta, etc)',
        'Poluição',
        'Overfishing'
      ],
      answer: 1,
      explanation: 'Perda de habitat é 80% das causas de extinção. Quando habitat desaparece, espécies não têm lugar para viver.',
      hints: ['Dica 1: 80% das causas', 'Dica 2: Derrubada de floresta', 'Dica 3: Sem casa']
    }
  ],
  skills: { 'conservacao': 'Entender conservação de biodiversidade' },
  review: [],
  commonDoubts: [],
  commonErrors: [],
  prerequisites: [],
  next: []
}

// ═══════════════════════════════════════════════════════════════════════════════════
// EXPORT ARRAY
// ═══════════════════════════════════════════════════════════════════════════════════

export const BIOLOGIA_LOTE6: Lesson[] = [
  // Fund I
  seresVivosNaoVivos,
  plantasAnimaisBasico,
  reproducaoBasica,
  habitatEcossistemaSimples,
  cadeiaCadaAlimentarSimples,
  // Fund II
  celulaUnidadeVida,
  fotossinteseRespiracao,
  reproducaoSexuadaAssexuada,
  herancaGeneticaMendel,
  evolucaoDarwinSelecaoNatural,
  // Médio
  dnaRnaGenetica,
  biotecnologiaEngenhariaGenetica,
  evolucaoHumana,
  ecologiaPopulacoesComunidades,
  biomasAquaticos,
  conservacaoBiodiversidade
]
