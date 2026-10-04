import type { Lesson } from '../../types'

export const movimentoForca: Lesson = {
  id: 'fis-fund2-001',
  subject: 'fisica',
  grade: '8º ano',
  title: 'Movimento e Força',
  levels: ['fund2'],
  aliases: ['força', 'movimento', 'velocidade', 'aceleração', 'Newton'],
  summary: 'Leis de Newton explicam movimento',
  intro: 'Por que as coisas se movem? Newton respondeu.',
  objective: 'Entender leis de Newton, compreender força e movimento',
  topic: 'Mecânica',
  subtopic: 'Movimento',
  blocks: [
    {id: 'b1', title: 'Velocidade e Aceleração', text: 'Velocidade: rapidez em direção (km/h). Aceleração: mudança de velocidade. Freio do carro: aceleração negativa. Curva a mesma velocidade: ainda é aceleração (muda direção).', example: 'Carro em 100 km/h reto: sem aceleração. Em 100 km/h curva: aceleração (força lateral).'},
    {id: 'b2', title: '3 Leis de Newton', text: '1ª: Objeto em repouso fica em repouso (inercia). 2ª: F=ma (força=massa×aceleração). 3ª: Ação-reação (empurra parede, parede empurra você).', example: 'Seatbelt prende você (lei 1ª: corpo quer continuar em movimento). Rocket ejecta combustível (lei 3ª).'},
    {id: 'b3', title: 'Aplicação Prática', text: 'Engenheiros usam F=ma para tudo: freios, motores, estruturas. Entender força é entender mundo físico.', example: 'Ponte engenheira calcula forças de vento, peso, movimento para não desabar.'}
  ],
  questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'newton', prompt: 'Qual lei explica por que você se projeta quando carro freia?', options: ['1ª lei (inercia)', '2ª lei', '3ª lei', 'Sem lei'], answer: 0, explanation: '1ª lei: você continua em movimento (inercia) quando carro pára.', hints: ['Dica: continuar movimento', 'Dica: inércia', 'Dica: primeira lei']}],
  skills: {'newton': 'Entender leis de Newton'},
  review: ['O que é velocidade?', 'Qual F=ma?'],
  commonDoubts: [], commonErrors: [], prerequisites: [], next: []
}

export const energiaTrabalhoPotencia: Lesson = {
  id: 'fis-fund2-002',
  subject: 'fisica',
  grade: '8º-9º ano',
  title: 'Energia, Trabalho e Potência',
  levels: ['fund2'],
  aliases: ['energia', 'trabalho', 'potência', 'conservação', 'cinética', 'potencial'],
  summary: 'Energia é conservada, transforma entre formas',
  intro: 'Energia não desaparece, só muda de forma.',
  objective: 'Entender energia, trabalho, potência, conservação',
  topic: 'Energia',
  subtopic: 'Conceitos Energéticos',
  blocks: [
    {id: 'b1', title: 'Formas de Energia', text: 'Cinética: movimento. Potencial: altura. Térmica: calor. Química: combustível. Elétrica: voltagem. Radiante: luz. Todas convertíveis.', example: 'Bola caindo: potencial→cinética. Combustão: química→térmica+cinética.'},
    {id: 'b2', title: 'Trabalho=Força×Distância', text: 'Trabalho (W) é energia transferida por força. W=Fd. Você levanta caixa (faz trabalho). Depois caixa tem mais energia potencial.', example: 'Levantar 10kg 1m (gravidade=10): W=10×1=10 joules.'},
    {id: 'b3', title: 'Conservação', text: 'Lei: energia total é conservada. Forma muda, total permanece. Universo é sistema isolado (energia total constante).', example: 'Bateria converte energia química em elétrica. Lâmpada converte em luz+calor. Total permanece.'}
  ],
  questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'energia', prompt: 'Qual forma energia tem bola no topo de uma montanha?', options: ['Cinética', 'Potencial', 'Térmica', 'Nenhuma'], answer: 1, explanation: 'Bola em altura tem energia potencial (pode cair).', hints: ['Dica: altura', 'Dica: potencial', 'Dica: antes de cair']}],
  skills: {'energia': 'Entender energia'},
  review: [],
  commonDoubts: [], commonErrors: [], prerequisites: [], next: []
}

export const calorTermodinamica: Lesson = {
  id: 'fis-fund2-003',
  subject: 'fisica',
  grade: '9º ano',
  title: 'Calor e Termodinâmica',
  levels: ['fund2'],
  aliases: ['calor', 'temperatura', 'termodinâmica', 'entropia', 'isolamento'],
  summary: 'Fluxo de calor entre corpos segue leis',
  intro: 'Calor flui de quente para frio, nunca ao contrário.',
  objective: 'Entender calor, temperatura, 2ª lei da termodinâmica',
  topic: 'Termodinâmica',
  subtopic: 'Fluxo de Calor',
  blocks: [
    {id: 'b1', title: 'Calor vs Temperatura', text: 'Temperatura: energia média das moléculas. Calor: transferência de energia térmica. Xícara quente tem alta temperatura. Calor flui de xícara (quente) para ar (frio).', example: 'Água 100°C é temperatura. Quando esfria, libera calor para ambiente.'},
    {id: 'b2', title: '2ª Lei da Termodinâmica', text: 'Calor flui de quente para frio. Nunca ao contrário sem trabalho externo (geladeira usa eletricidade). Entropia (desordem) sempre aumenta.', example: 'Xícara quente perde calor e esfria. Nunca aquece sozinha (violaria lei).'},
    {id: 'b3', title: 'Aplicação', text: 'Isolamento térmico (garrafa térmica): reduz fluxo de calor. Motores: convertem calor em trabalho (mas sempre perdem eficiência por lei).', example: 'Motor carro: 70% energia para calor (perda), 30% para movimento.'}
  ],
  questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'termo', prompt: 'Por que xícara quente esfria?', options: ['Ganha frio', 'Perde calor para ambiente', 'Temperatura diminui sozinha', 'Nenhuma'], answer: 1, explanation: 'Calor flui de quente (xícara) para frio (ar).', hints: ['Dica: fluxo de energia', 'Dica: para ambiente', 'Dica: 2ª lei']}],
  skills: {'termo': 'Entender termodinâmica'},
  review: [],
  commonDoubts: [], commonErrors: [], prerequisites: [], next: []
}

export const ondasSom: Lesson = {
  id: 'fis-fund2-004',
  subject: 'fisica',
  grade: '8º-9º ano',
  title: 'Ondas e Som',
  levels: ['fund2'],
  aliases: ['onda', 'som', 'frequência', 'comprimento', 'velocidade', 'ressonância'],
  summary: 'Ondas transmitem energia, som é onda',
  intro: 'Ondas estão por toda parte: som, luz, água.',
  objective: 'Entender ondas, compreender som, aplicar conceitos',
  topic: 'Ondas',
  subtopic: 'Som e Ondas',
  blocks: [
    {id: 'b1', title: 'Propriedades de Ondas', text: 'Frequência: quantas vezes por segundo (Hz). Comprimento: distância entre cristas. Velocidade: frequência × comprimento. Som viaja ~340 m/s no ar.', example: 'Nota musical: frequência define altura. Mais alta=mais frequência. Luz visível: 380-700 nanômetros.'},
    {id: 'b2', title: 'Som é Onda de Pressão', text: 'Som viaja através meio (ar, água, sólido). Vibração causa ondas de pressão. Ouvido sente vibração de 20-20000 Hz (humano).', example: 'Trovão: 20-200 Hz. Sopreno: 260-1050 Hz. Cão ouve 40-60000 Hz (ultrassônico).'},
    {id: 'b3', title: 'Ressonância', text: 'Quando onda bate na frequência natural: amplifica. Vidro quebra em frequência certa. Pontes desabam se vibração coincide com frequência natural.', example: 'Cálice crystal pode quebrar com nota musical alta (ressonância).'}
  ],
  questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'ondas', prompt: 'Som viaja via?', options: ['Vácuo', 'Ondas de pressão em meio', 'Luz', 'Magnetismo'], answer: 1, explanation: 'Som é onda de pressão, precisa meio (ar, água, etc).', hints: ['Dica: precisa meio', 'Dica: pressão', 'Dica: por isso vácuo sem som']}],
  skills: {'ondas': 'Entender ondas'},
  review: [],
  commonDoubts: [], commonErrors: [], prerequisites: [], next: []
}

export const eletricidade: Lesson = {
  id: 'fis-medio-005',
  subject: 'fisica',
  grade: '1º Médio',
  title: 'Eletricidade e Magnetismo',
  levels: ['medio'],
  aliases: ['eletricidade', 'voltagem', 'corrente', 'resistência', 'circuito', 'magnetismo'],
  summary: 'Cargas elétricas criam força e magnetismo',
  intro: 'Eletricidade alimenta mundo moderno.',
  objective: 'Entender circuitos, lei de Ohm, magnetismo',
  topic: 'Eletromagnetismo',
  subtopic: 'Corrente Elétrica',
  blocks: [
    {id: 'b1', title: 'Lei de Ohm', text: 'V=IR (voltagem=corrente×resistência). Maior V: mais corrente flui. Maior R: menos corrente. Isso governa todos circuitos eletrônicos.', example: 'Bateria 12V, resistor 4Ω → corrente=3A.'},
    {id: 'b2', title: 'Circuitos Série vs Paralelo', text: 'Série: componentes em linha. Paralelo: componentes lado a lado. Série: voltagem divide. Paralelo: voltagem mesma.', example: 'Christmas lights série: se uma quebra, todas apagam. Paralelo: uma apaga, resto acende.'},
    {id: 'b3', title: 'Magnetismo', text: 'Cargas em movimento criam magnetismo. Ímã tem campo. Motor usa magnetismo. Gerador inverte: movimento→eletricidade.', example: 'Dinamo de bicicleta: movimento rodas→gera eletricidade→acende luz.'}
  ],
  questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'ohm', prompt: 'Lei de Ohm é?', options: ['V=IR', 'F=ma', 'E=mc²', 'P=mgh'], answer: 0, explanation: 'V=IR é lei de Ohm que governa eletricidade.', hints: ['Dica: voltagem', 'Dica: corrente', 'Dica: eletricidade']}],
  skills: {'ohm': 'Entender eletricidade'},
  review: [],
  commonDoubts: [], commonErrors: [], prerequisites: [], next: []
}

export const ondaLuzOtica: Lesson = {
  id: 'fis-medio-006',
  subject: 'fisica',
  grade: '2º Médio',
  title: 'Onda Luminosa e Óptica',
  levels: ['medio'],
  aliases: ['luz', 'óptica', 'refração', 'reflexão', 'lente', 'prisma'],
  summary: 'Luz é onda eletromagnética que viaja em linha reta',
  intro: 'Luz é visível, mas infravermelha e ultravioleta também existem.',
  objective: 'Entender luz, reflexão, refração, lentes',
  topic: 'Óptica',
  subtopic: 'Fenômenos Luminosos',
  blocks: [
    {id: 'b1', title: 'Natureza da Luz', text: 'Luz é onda eletromagnética. Viaja 300.000 km/s (vácuo). Visível: 380-700 nm. Infravermelha: calor. Ultravioleta: danosa.', example: 'Cor determina frequência. Vermelho: 430 THz. Violeta: 750 THz.'},
    {id: 'b2', title: 'Reflexão e Refração', text: 'Reflexão: rebota na superfície. Refração: muda direção ao passar meio (ar→água). Prisma refrata, separa cores.', example: 'Espelho: reflexão. Água: refração (colher parece quebrada).'},
    {id: 'b3', title: 'Lentes', text: 'Lente convexa: converge (foco). Côncava: diverge. Óculos corrigem usando refração. Câmera usa lente para focar.', example: 'Pessoa míope: lente côncava. Presbiopia: convexa. Telescópio: múltiplas lentes amplificam.'}
  ],
  questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'luz', prompt: 'Luz viaja em vácuo a?', options: ['100k km/s', '300k km/s', '1M km/s', '10k km/s'], answer: 1, explanation: 'Luz viaja a 300.000 km/s em vácuo (c).', hints: ['Dica: 3 seguido de zeros', 'Dica: constante c', 'Dica: mais rápido que qualquer coisa']}],
  skills: {'luz': 'Entender óptica'},
  review: [],
  commonDoubts: [], commonErrors: [], prerequisites: [], next: []
}

export const fisicaModerna: Lesson = {
  id: 'fis-medio-007',
  subject: 'fisica',
  grade: '3º Médio',
  title: 'Física Moderna — Relatividade e Quântica',
  levels: ['medio'],
  aliases: ['relatividade', 'quântica', 'Einstein', 'E=mc²', 'átomo', 'fóton'],
  summary: 'Realidade é estranha em velocidades altas e escalas minúsculas',
  intro: 'Einstein e Planck revolucionaram física.',
  objective: 'Entender relatividade, física quântica, aplicações',
  topic: 'Física Moderna',
  subtopic: 'Relatividade e Quântica',
  blocks: [
    {id: 'b1', title: 'Relatividade de Einstein', text: 'E=mc² (energia=massa×c²). Massa e energia são conversíveis. Nada viaja mais que luz. Tempo é relativo (vai mais devagar perto de gravidade).', example: 'Bomba atômica: pequena massa → ENORME energia. 1kg = 20 megatons TNT.'},
    {id: 'b2', title: 'Física Quântica', text: 'Em nível atômico: regras diferentes. Partícula é também onda (dualidade). Incerteza: não pode conhecer simultaneamente posição e momento. Probabilidade governa.', example: 'Elétron: não está em lugar específico, tem "nuvem de probabilidade" ao redor núcleo.'},
    {id: 'b3', title: 'Aplicações', text: 'Laser: usa quântica. Transistor: usa quântica. Nuclear: usa relatividade. Medicina: PET scan usa antimatter.', example: 'Microchip: bilhões de transistores, cada um usa quântica. Sem quântica, eletrônicos não funcionam.'}
  ],
  questions: [{id: 'q1', type: 'mc', difficulty: 3, skill: 'moderna', prompt: 'E=mc² significa?', options: ['Energia=massa×velocidade da luz²', 'Força=massa×aceleração', 'Trabalho=força×distância', 'Potência=energia/tempo'], answer: 0, explanation: 'E=mc²: massa pode converter em ENORME energia.', hints: ['Dica: Einstein', 'Dica: conversão', 'Dica: bomba atômica']}],
  skills: {'moderna': 'Entender física moderna'},
  review: [],
  commonDoubts: [], commonErrors: [], prerequisites: [], next: []
}

export const FISICA_LOTE7: Lesson[] = [
  movimentoForca, energiaTrabalhoPotencia, calorTermodinamica, ondasSom,
  eletricidade, ondaLuzOtica, fisicaModerna
]
