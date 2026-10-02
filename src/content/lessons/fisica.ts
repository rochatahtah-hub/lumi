import type { Lesson } from '../../types'

const BNCC = { title: 'Base Nacional Comum Curricular (BNCC) — Física', url: 'http://basenacionalcomum.mec.gov.br/', kind: 'curriculo' } as const

// ============================================================================
// INTRODUÇÃO À FÍSICA
// ============================================================================

export const introducao_fisica: Lesson = {
  id: 'fis-introducao',
  subject: 'fisica',
  title: 'O que é Física?',
  levels: ['fund2', 'medio'],
  grade: '8º ano ao 3º Médio',
  aliases: ['física', 'o que é física', 'conceito de física', 'definição de física', 'ciência física', 'estudo da física', 'física básica', 'ramo da ciência'],
  summary: 'Entenda o que é Física, por que é importante e como ela explica o mundo ao seu redor.',
  intro: 'Física é a ciência que estuda como as coisas funcionam — desde uma bola caindo até as estrelas no céu. Vamos descobrir juntos!',
  skills: {
    conceito: 'Conceito de Física',
    importancia: 'Por que estudar Física',
    ramos: 'Ramos da Física',
    metodo: 'Método científico'
  },
  blocks: [
    {
      id: 'b1',
      skill: 'conceito',
      title: 'O que é Física?',
      text: 'Física é a ciência natural que estuda a matéria, a energia, o movimento e as forças no universo. Ela tenta responder perguntas como: "Por que as coisas caem?", "Como funciona a luz?", "Do que são feitas as coisas?"',
      example: 'Um carro acelerando, uma bola caindo, a luz do sol iluminando uma sala — tudo isso é explicado pela Física.',
      variants: {
        simples: 'Física é a ciência que estuda como funcionam as coisas e por que elas funcionam assim.',
        exemplo: 'Quando você chuta uma bola, ela se move porque você aplicou uma força. Quando você a solta, cai porque a gravidade puxa. Tudo isso é Física.',
        outra: 'Física é a tentativa de entender o comportamento de tudo no universo — objetos, luz, calor, eletricidade, átomos.',
        detalhado: 'Física é a ciência fundamental que estuda as propriedades da matéria e da energia, assim como suas interações em espaço e tempo. Ela é quantitativa (usa números e matemática) e experimental (testa ideias através de observação e experimentos).',
      },
    },
    {
      id: 'b2',
      skill: 'importancia',
      title: 'Por que estudar Física?',
      text: 'Física explica o mundo que nos rodeia e nos ajuda a criar tecnologias. Sem Física, não teríamos telefones, computadores, carros, aviões ou remédios modernos.',
      example: 'O celular que você usa funciona porque alguém entendeu Física. A internet, a televisão, a eletricidade — tudo é Física aplicada.',
      variants: {
        simples: 'Física ajuda a entender por que as coisas funcionam e como fazer coisas novas.',
        exemplo: 'Os engenheiros que construíram o avião estudaram Física para entender como as asas funcionam. Os médicos estudaram Física para entender como os ultrassons e raios-X funcionam.',
        outra: 'Física é a base de todas as tecnologias modernas. Computadores, smartphones, energia solar — tudo vem de descobertas em Física.',
        detalhado: 'Estudar Física desenvolve pensamento crítico, capacidade de resolver problemas e entendimento do universo. É essencial para carreiras em engenharia, medicina, astronomia, tecnologia e muitos outros campos.',
      },
    },
    {
      id: 'b3',
      skill: 'ramos',
      title: 'Os ramos da Física',
      text: 'Física é dividida em vários ramos principais: Mecânica (movimento e forças), Termologia (calor), Óptica (luz), Eletromagnetismo (eletricidade e magnetismo) e Física Moderna (átomos e energia).',
      example: 'Quando você estuda como uma bola se move, está em Mecânica. Quando aprende sobre temperatura, está em Termologia.',
      variants: {
        simples: 'Física tem vários tópicos: movimento, calor, luz, eletricidade e átomos.',
        exemplo: 'Mecânica — por que as coisas se movem. Termologia — por que fica quente e frio. Óptica — como vemos as cores. Eletromagnetismo — como a eletricidade funciona.',
        outra: 'Cada ramo estuda uma parte diferente da natureza. Juntos, eles explicam tudo.',
        detalhado: 'Mecânica Clássica (Newtoniana) estuda movimento e força. Termologia estuda temperatura, calor e energia térmica. Óptica estuda luz e visão. Eletromagnetismo estuda campos elétricos e magnéticos. Física Moderna estuda estrutura atômica, radioatividade e relatividade.',
      },
    },
    {
      id: 'b4',
      skill: 'metodo',
      title: 'O método científico em Física',
      text: 'Físicos usam o método científico: observam algo, fazem uma hipótese, testam com um experimento, analisam os resultados e tiram conclusões.',
      example: 'Um físico observa que objetos caem para o chão. Ele hipotetiza que existe uma força puxando. Testa com bolinhas de diferentes tamanhos, mede quanto tempo levam para cair, e conclui que a gravidade afeta todos igualmente (quando não há ar).',
      variants: {
        simples: 'Observação → Pergunta → Hipótese → Experimento → Análise → Conclusão',
        exemplo: 'Você vê uma vela queimando e quer saber o que acontece. Hipotetiza que precisa de ar. Testa cobrindo a vela com um vidro. Observa que apaga. Conclui que fogo precisa de ar.',
        outra: 'Ciência não é só memorizar fatos. É observar a natureza, fazer perguntas, testar respostas e aprender com os resultados.',
        detalhado: 'O método científico em Física envolve: (1) Observação sistemática, (2) Formulação de hipótese testável, (3) Desenho de experimento controlado, (4) Coleta de dados quantitativos, (5) Análise estatística, (6) Conclusão que pode ser reproduzida por outros cientistas. Teoria científica em Física é confirmada por múltiplos experimentos independentes.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'O que é Física?', options: ['Uma arte', 'A ciência que estuda matéria, energia e movimento', 'Uma religião', 'Uma filosofia antiga'], answer: 1, hints: ['É uma ciência', 'Estuda coisas que se movem', 'Usa números e experimentos'], explanation: 'Física é a ciência natural que estuda matéria, energia, movimento e forças no universo.' },
    { id: 'q2', type: 'tf', difficulty: 1, skill: 'importancia', prompt: 'A Física é importante apenas para cientistas, não para pessoas comuns.', answer: false, hints: ['Pense em tecnologias do dia-a-dia', 'Celulares, carros, internet...', 'Tudo usa Física'], explanation: 'Falso. Física explica o funcionamento de tecnologias que usamos todos os dias: celulares, internet, eletricidade, carros.' },
    { id: 'q3', type: 'mc', difficulty: 1, skill: 'ramos', prompt: 'Qual ramo da Física estuda o movimento?', options: ['Termologia', 'Mecânica', 'Óptica', 'Eletromagnetismo'], answer: 1, hints: ['Movimento e forças', 'É o ramo "clássico"', 'Newton estudou isso'], explanation: 'Mecânica é o ramo que estuda movimento, forças e como objetos se comportam.' },
    { id: 'q4', type: 'fill', difficulty: 2, skill: 'metodo', prompt: 'O método científico começa com ____ e termina com ____', answers: ['observação', 'conclusão'], hints: ['Você observa algo', 'Você chega a uma conclusão'], explanation: 'O método científico começa com Observação (o quê?) e termina com Conclusão (o que aprendemos?).' },
  ],
  review: ['Física estuda matéria, energia e movimento', 'Explica como o mundo funciona', 'É base de toda tecnologia moderna', 'Usa método científico: observar, hipotetizar, testar, concluir'],
  sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }],
}

// ============================================================================
// GRANDEZAS E UNIDADES
// ============================================================================

export const grandezas_unidades: Lesson = {
  id: 'fis-grandezas-unidades',
  subject: 'fisica',
  title: 'Grandezas Físicas e Unidades de Medida',
  levels: ['fund2', 'medio'],
  grade: '8º ano ao 3º Médio',
  aliases: ['grandezas físicas', 'unidades de medida', 'metro', 'quilograma', 'segundo', 'sistema internacional', 'SI', 'medição', 'como medir'],
  summary: 'Aprenda o que são grandezas físicas, como medir e quais são as unidades do Sistema Internacional.',
  intro: 'Para entender Física, precisamos medir. Distância, tempo, velocidade — tudo é medida com unidades certas. Vamos aprender!',
  skills: {
    conceito: 'O que é uma grandeza',
    unidades: 'Unidades de medida',
    si: 'Sistema Internacional',
    conversao: 'Conversão de unidades'
  },
  blocks: [
    {
      id: 'b1',
      skill: 'conceito',
      title: 'O que é uma grandeza física?',
      text: 'Uma grandeza física é qualquer coisa que pode ser medida. Tudo em Física é baseado em grandezas: comprimento, massa, tempo, velocidade, força, temperatura.',
      example: 'Sua altura (comprimento), seu peso (força/massa), quanto tempo leva para chegar na escola (tempo) — são todas grandezas físicas.',
      variants: {
        simples: 'Grandeza = qualquer coisa que você consegue medir com números.',
        exemplo: 'Você pode medir: quanto de espaço você ocupa (volume), quanto você pesa (peso/massa), quanto tempo existe (tempo), que velocidade um carro vai (velocidade).',
        outra: 'Grandezas têm número E unidade. Não é só "10", é "10 metros" ou "10 segundos".',
        detalhado: 'Grandezas físicas podem ser escalares (só número: 5 kg) ou vetoriais (número + direção: 50 km/h para o norte). Todas as grandezas têm unidade de medida apropriada.',
      },
    },
    {
      id: 'b2',
      skill: 'unidades',
      title: 'Unidades de medida',
      text: 'Uma unidade de medida é um padrão usado para medir uma grandeza. Por exemplo, metros medem comprimento, quilos medem massa, segundos medem tempo.',
      example: 'Quando você diz "tenho 1,70 metros de altura", o "metro" é a unidade. Quando diz "pesa 60 quilos", o "quilo" é a unidade.',
      variants: {
        simples: 'Unidade é o padrão que você usa para medir. Metros para distância. Quilos para peso. Segundos para tempo.',
        exemplo: 'Não dizer só "100" — dizer "100 metros" ou "100 segundos". A unidade diz o quê é o número.',
        outra: 'Todas as unidades são baseadas em padrões internacionais para que todo mundo entenda igual.',
        detalhado: 'Unidades podem ser fundamentais (metro, quilograma, segundo) ou derivadas (metros por segundo = velocidade). O Sistema Internacional padroniza qual unidade usar para cada grandeza.',
      },
    },
    {
      id: 'b3',
      skill: 'si',
      title: 'Sistema Internacional de Unidades (SI)',
      text: 'O SI é um padrão internacional que define as unidades corretas para cada grandeza. Assim, um cientista no Brasil, nos EUA ou no Japão usa as mesmas unidades.',
      example: 'No SI: comprimento em metros (m), massa em quilogramas (kg), tempo em segundos (s), temperatura em Kelvin (K), força em Newtons (N).',
      variants: {
        simples: 'SI = padrão mundial de unidades. Todo país usa SI para ciência.',
        exemplo: 'Metro para distância (não pé ou polegada). Quilo para peso (não libra). Segundo para tempo (em todo lugar).',
        outra: 'Existem 7 unidades básicas no SI. Todas as outras são derivadas delas.',
        detalhado: 'As 7 unidades fundamentais do SI são: metro (m) para comprimento, quilograma (kg) para massa, segundo (s) para tempo, Ampère (A) para corrente elétrica, Kelvin (K) para temperatura, mol (mol) para quantidade de matéria, candela (cd) para intensidade luminosa. Todas as outras unidades derivam destas.',
      },
    },
    {
      id: 'b4',
      skill: 'conversao',
      title: 'Convertendo unidades',
      text: 'Às vezes precisamos converter de uma unidade para outra. Por exemplo, de quilômetros para metros, ou de horas para segundos. Use fatores de conversão.',
      example: '5 quilômetros = 5 × 1.000 = 5.000 metros. 2 horas = 2 × 3.600 = 7.200 segundos.',
      variants: {
        simples: 'Para converter, multiplique ou divida pelo número certo. 1 km = 1.000 m. 1 hora = 60 minutos = 3.600 segundos.',
        exemplo: '10 metros em centímetros? 10 × 100 = 1.000 cm. 500 gramas em quilogramas? 500 ÷ 1.000 = 0,5 kg.',
        outra: 'Use a regra: (valor original) × (fator de conversão) = novo valor. Exemplo: 3 km × 1.000 (fator) = 3.000 m.',
        detalhado: 'Conversão usa proporções: se 1 km = 1.000 m, então x km = x × 1.000 m. Use análise dimensional: escreva a unidade velha e a nova, e encontre o fator que as conecta. Exemplo: 2 horas × (3.600 s/hora) = 7.200 segundos.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'Qual é uma grandeza física?', options: ['Cor', 'Distância', 'Beleza', 'Felicidade'], answer: 1, hints: ['Tem que medir com números', 'Distância é o tamanho de algo'], explanation: 'Distância é uma grandeza física porque pode ser medida. Cor, beleza e felicidade não podem ser medidas objetivamente em Física.' },
    { id: 'q2', type: 'tf', difficulty: 1, skill: 'unidades', prompt: 'Uma grandeza sem unidade tem significado completo em Física.', answer: false, hints: ['Pense: "tenho 10"... 10 o quê?', 'Precisa da unidade'], explanation: 'Falso. Uma grandeza sem unidade é incompleta. "Tenho 10 metros" tem sentido. "Tenho 10" sozinho não.' },
    { id: 'q3', type: 'mc', difficulty: 1, skill: 'si', prompt: 'Qual é a unidade de comprimento no SI?', options: ['Pé', 'Metro', 'Milha', 'Polegada'], answer: 1, hints: ['Unidade padrão internacional', 'Símbolo é "m"'], explanation: 'No Sistema Internacional, a unidade de comprimento é o metro (m).' },
    { id: 'q4', type: 'fill', difficulty: 2, skill: 'conversao', prompt: '3 quilômetros = ____ metros', answers: ['3000', '3.000'], hints: ['1 km = 1.000 m', 'Multiplique por 1.000'], explanation: '3 km × 1.000 m/km = 3.000 metros.' },
  ],
  review: ['Grandeza física = qualquer coisa que pode ser medida', 'Unidade = padrão de medida (metro, quilo, segundo)', 'SI = Sistema Internacional (padrão mundial)', 'Conversão usa fatores de proporcionalidade'],
  sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }],
}

// ============================================================================
// MOVIMENTO E REPOUSO
// ============================================================================

export const movimento_repouso: Lesson = {
  id: 'fis-movimento-repouso',
  subject: 'fisica',
  title: 'Movimento e Repouso',
  levels: ['fund2', 'medio'],
  grade: '8º ano ao 3º Médio',
  aliases: ['movimento', 'repouso', 'trajetória', 'posição', 'referencial', 'móvel', 'corpo em movimento', 'ponto material', 'referência'],
  summary: 'Entenda os conceitos básicos de movimento, repouso, posição e trajetória. Conheça o conceito de referencial.',
  intro: 'Tudo no universo se move — até as coisas que parecem paradas! Vamos entender o que significa estar em movimento.',
  skills: {
    conceito: 'O que é movimento',
    posicao: 'Posição e deslocamento',
    trajetoria: 'Trajetória',
    referencial: 'Referencial'
  },
  blocks: [
    {
      id: 'b1',
      skill: 'conceito',
      title: 'O que é movimento?',
      text: 'Um corpo está em movimento quando sua posição muda em relação a um referencial. Está em repouso quando sua posição não muda.',
      example: 'Um carro andando está em movimento em relação à rua. Um passageiro dentro do carro está em repouso em relação ao carro, mas em movimento em relação à rua.',
      variants: {
        simples: 'Movimento = mudar de lugar. Repouso = ficar no mesmo lugar.',
        exemplo: 'Quando você caminha pela sala, está em movimento. Quando senta e fica sentado, está em repouso.',
        outra: 'Movimento e repouso dependem do referencial — do ponto de vista de onde você está olhando.',
        detalhado: 'Em Física, movimento é definido como mudança de posição ao longo do tempo em relação a um referencial. Repouso é a ausência dessa mudança. Ambos são conceitos relativos.',
      },
    },
    {
      id: 'b2',
      skill: 'posicao',
      title: 'Posição e deslocamento',
      text: 'Posição é onde um objeto está. Deslocamento é a mudança de posição — é diferente da distância percorrida.',
      example: 'Você anda 10 metros para o norte, depois 10 metros para o sul. Andou 20 metros (distância), mas seu deslocamento é zero porque voltou ao ponto de partida.',
      variants: {
        simples: 'Posição = onde você está. Deslocamento = quanto você se moveu do ponto de partida.',
        exemplo: 'Você sai de casa (posição A), vai no trabalho (posição B) e volta (posição A). Andou muito, mas deslocamento = 0.',
        outra: 'Distância é sempre positiva. Deslocamento pode ser positivo, negativo ou zero.',
        detalhado: 'Deslocamento (Δx) = posição final - posição inicial. É uma grandeza vetorial (tem direção). Distância é a soma de todos os segmentos percorridos e é sempre positiva (escalar).',
      },
    },
    {
      id: 'b3',
      skill: 'trajetoria',
      title: 'Trajetória',
      text: 'Trajetória é o caminho que um corpo segue ao se mover. Pode ser reta, curva, circular ou uma forma qualquer.',
      example: 'Um carro em uma estrada reta segue trajetória reta. Uma bola sendo chutada segue trajetória curva.',
      variants: {
        simples: 'Trajetória = o caminho que algo percorre quando se move.',
        exemplo: 'Um avião deixa um rastro no ar — aquele rastro é aproximadamente a trajetória.',
        outra: 'A trajetória depende do referencial. Para o piloto, um objeto caindo no avião cai em linha reta. Para alguém no chão, cai em curva.',
        detalhado: 'Trajetória é o lugar geométrico de todos os pontos por onde passa o corpo. É uma propriedade do movimento em relação a um referencial específico.',
      },
    },
    {
      id: 'b4',
      skill: 'referencial',
      title: 'Referencial',
      text: 'Referencial é o ponto ou sistema de coordenadas que usamos para medir posição e movimento. Sem referencial, não podemos dizer se algo está se movendo.',
      example: 'Um passageiro no trem está em repouso em relação ao trem, mas em movimento em relação à terra. Diferentes referenciais, diferentes respostas.',
      variants: {
        simples: 'Referencial = de onde você está olhando. Muda se você está parado ou se movendo.',
        exemplo: 'Você está em um carro. Em relação ao carro, está em repouso. Em relação à rua, está em movimento.',
        outra: 'Não existe "movimento absoluto". Movimento é sempre em relação a algo (referencial).',
        detalhado: 'Um referencial é um sistema de coordenadas associado a um observador. Movimento e repouso são conceitos relativos ao referencial escolhido. A escolha de referencial não muda a física do problema, apenas sua descrição matemática.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'Uma pessoa dentro de um avião parado no chão está em movimento ou em repouso?', options: ['Sempre em movimento', 'Sempre em repouso', 'Em repouso em relação ao avião', 'Nenhuma das anteriores'], answer: 2, hints: ['Depende de qual é a referência', 'Em relação ao avião...'], explanation: 'A pessoa está em repouso em relação ao avião. Mas em relação ao solo, também está em repouso porque o avião não está voando.' },
    { id: 'q2', type: 'tf', difficulty: 1, skill: 'posicao', prompt: 'Distância percorrida é sempre igual ao deslocamento.', answer: false, hints: ['Pense em um passeio circular', 'Você anda muito mas volta ao ponto de partida'], explanation: 'Falso. Se você anda em círculo e volta ao ponto de partida, a distância é grande, mas o deslocamento é zero.' },
    { id: 'q3', type: 'mc', difficulty: 2, skill: 'trajetoria', prompt: 'Qual é a trajetória de uma bola jogada horizontalmente da janela de um prédio?', options: ['Reta vertical', 'Reta horizontal', 'Curva (parábola)', 'Círculo'], answer: 2, hints: ['A bola cai', 'Mas também se move para frente'], explanation: 'A trajetória é uma parábola porque a bola se move para frente e para baixo simultaneamente.' },
    { id: 'q4', type: 'fill', difficulty: 2, skill: 'referencial', prompt: 'Um passageiro em um trem em movimento está em ____ em relação ao trem e em ____ em relação ao solo.', answers: ['repouso', 'movimento'], hints: ['Em relação ao trem...', 'Em relação à terra...'], explanation: 'O referencial muda a resposta: repouso em relação ao trem (que se move com ele), movimento em relação ao solo.' },
  ],
  review: ['Movimento = mudança de posição em relação a referencial', 'Repouso = posição não muda', 'Deslocamento ≠ distância', 'Trajetória = caminho percorrido', 'Referencial é essencial'],
  sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }],
}

// ============================================================================
// VELOCIDADE
// ============================================================================

export const velocidade: Lesson = {
  id: 'fis-velocidade',
  subject: 'fisica',
  title: 'Velocidade: Conceito e Cálculo',
  levels: ['fund2', 'medio'],
  grade: '8º ano ao 3º Médio',
  aliases: ['velocidade', 'velocidade média', 'velocidade instantânea', 'rapidez', 'km/h', 'm/s', 'metros por segundo', 'quilômetro por hora', 'velocidade escalar', 'velocidade vetorial'],
  summary: 'Aprenda o conceito de velocidade, como calcular velocidade média e entenda a diferença entre velocidade e rapidez.',
  intro: 'Velocidade nos diz quão rápido algo está se movendo. Vamos aprender a calcular e entender esse conceito fundamental.',
  skills: {
    conceito: 'O que é velocidade',
    media: 'Velocidade média',
    instantanea: 'Velocidade instantânea',
    calculo: 'Como calcular'
  },
  blocks: [
    {
      id: 'b1',
      skill: 'conceito',
      title: 'O que é velocidade?',
      text: 'Velocidade é a taxa de mudança de posição em relação ao tempo. Em outras palavras, é o quanto de distância um objeto percorre por unidade de tempo.',
      example: 'Se você dirige 100 km em 2 horas, sua velocidade média foi de 50 km por hora.',
      variants: {
        simples: 'Velocidade = distância dividida pelo tempo. Rápido = velocidade alta. Devagar = velocidade baixa.',
        exemplo: 'Um carro que viaja 100 km em 1 hora tem velocidade de 100 km/h. Um carro que viaja 100 km em 2 horas tem velocidade de 50 km/h.',
        outra: 'Velocidade tem unidade de distância/tempo. Exemplos: m/s, km/h, cm/s.',
        detalhado: 'Velocidade é um vetor (tem direção). A fórmula é v = Δx/Δt, onde Δx é deslocamento e Δt é tempo. Se o deslocamento for em uma direção, a velocidade também será.',
      },
    },
    {
      id: 'b2',
      skill: 'media',
      title: 'Velocidade média',
      text: 'Velocidade média é o deslocamento total dividido pelo tempo total. É a velocidade constante que você teria se viajasse sem parar nem acelerar.',
      example: 'Você viaja 300 km em 5 horas. Sua velocidade média é 300/5 = 60 km/h, mesmo que tenha acelerado, freado e parado várias vezes.',
      variants: {
        simples: 'Velocidade média = total de distância / total de tempo.',
        exemplo: 'Você dirige 50 km em 1 hora (50 km/h), depois 100 km em 1 hora (100 km/h). Total: 150 km em 2 horas = 75 km/h de média.',
        outra: 'Fórmula: v_média = Δx / Δt',
        detalhado: 'Matematicamente: v_m = (x_final - x_inicial) / (t_final - t_inicial) = Δx/Δt. Note que usamos deslocamento (não distância), então mudanças de direção afetam o resultado.',
      },
    },
    {
      id: 'b3',
      skill: 'instantanea',
      title: 'Velocidade instantânea',
      text: 'Velocidade instantânea é a velocidade em um momento específico no tempo. É o que o velocímetro do carro marca naquele instante.',
      example: 'Quando você olha para o velocímetro e vê "80 km/h", essa é a velocidade instantânea naquele momento.',
      variants: {
        simples: 'Velocidade instantânea = velocidade neste exato momento, agora.',
        exemplo: 'Velocidade média da viagem: 60 km/h. Velocidade instantânea agora: 80 km/h (o que marca o velocímetro).',
        outra: 'Velocidade média é em um período de tempo. Velocidade instantânea é em um ponto do tempo.',
        detalhado: 'Matematicamente, velocidade instantânea é v = lim(Δt→0) Δx/Δt, ou seja, a derivada da posição em relação ao tempo.',
      },
    },
    {
      id: 'b4',
      skill: 'calculo',
      title: 'Como calcular velocidade',
      text: 'Use a fórmula: velocidade = distância / tempo. Certifique-se de que as unidades estão corretas.',
      example: 'Um carro viaja 120 km em 2 horas. v = 120 km / 2 h = 60 km/h. Um atleta corre 100 metros em 10 segundos. v = 100 m / 10 s = 10 m/s.',
      variants: {
        simples: 'v = d / t. Divida a distância pelo tempo.',
        exemplo: 'Você anda 5 km em 1 hora? Sua velocidade é 5 km/h.',
        outra: 'Lembre-se: a unidade depende das unidades de entrada. Se usa km e horas, resultado é km/h. Se usa metros e segundos, resultado é m/s.',
        detalhado: 'Para converter entre unidades: 1 m/s = 3,6 km/h. Isso porque 1 m/s × (3.600 s/h) ÷ (1.000 m/km) = 3,6 km/h. Então se v = 20 m/s, então v = 20 × 3,6 = 72 km/h.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'Um carro percorre 100 km em 2 horas. Qual é sua velocidade?', options: ['50 km/h', '100 km/h', '200 km/h', '2 km/h'], answer: 0, hints: ['Velocidade = distância / tempo', '100 / 2 = ?'], explanation: 'v = 100 km / 2 h = 50 km/h' },
    { id: 'q2', type: 'fill', difficulty: 1, skill: 'media', prompt: 'Se você viaja 300 km em 5 horas, sua velocidade média é ____ km/h.', answers: ['60'], hints: ['Use a fórmula v = d/t', '300 / 5 = ?'], explanation: 'v_média = 300 km / 5 h = 60 km/h' },
    { id: 'q3', type: 'tf', difficulty: 2, skill: 'instantanea', prompt: 'O velocímetro do carro marca a velocidade instantânea.', answer: true, hints: ['Marca naquele exato momento'], explanation: 'Verdadeiro. O velocímetro marca a velocidade no instante em que você olha para ele.' },
    { id: 'q4', type: 'mc', difficulty: 2, skill: 'calculo', prompt: 'Um atleta corre 100 metros em 10 segundos. Qual é sua velocidade?', options: ['10 m/s', '100 m/s', '1 m/s', '0,1 m/s'], answer: 0, hints: ['v = distância / tempo', '100 / 10 = 10'], explanation: 'v = 100 m / 10 s = 10 m/s' },
  ],
  review: ['Velocidade = distância / tempo', 'Velocidade média = deslocamento total / tempo total', 'Velocidade instantânea = velocidade naquele momento', 'Cuidado com as unidades!'],
  sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }],
}

// TODO: Continuar com mais tópicos...
// Próximos: Aceleração, Gráficos, Leis de Newton, Força, Trabalho, Energia, etc.
