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

// ============================================================================
// ACELERAÇÃO
// ============================================================================

export const aceleracao: Lesson = {
  id: 'fis-aceleracao',
  subject: 'fisica',
  title: 'Aceleração',
  levels: ['fund2', 'medio'],
  grade: '8º ano ao 3º Médio',
  aliases: ['aceleração', 'desaceleração', 'mudança de velocidade', 'taxa de mudança', 'aceleração média', 'aceleração instantânea', 'm/s²', 'metros por segundo quadrado'],
  summary: 'Aprenda o que é aceleração, como calcular e entenda a diferença entre acelerar e desacelerar.',
  intro: 'Aceleração é a taxa de mudança de velocidade. Quando você pisa no acelerador ou no freio, está mudando a velocidade — ou seja, aceleração!',
  skills: {
    conceito: 'O que é aceleração',
    media: 'Aceleração média',
    calculo: 'Como calcular',
    tipos: 'Tipos de aceleração'
  },
  blocks: [
    {
      id: 'b1',
      skill: 'conceito',
      title: 'O que é aceleração?',
      text: 'Aceleração é a taxa de mudança de velocidade em relação ao tempo. Se sua velocidade muda, você está acelerando.',
      example: 'Um carro que aumenta sua velocidade de 0 para 100 km/h está acelerando. Um carro que diminui de 100 para 0 km/h (freando) também está acelerando (aceleração negativa).',
      variants: {
        simples: 'Aceleração = mudança de velocidade / tempo. Se velocidade muda, há aceleração.',
        exemplo: 'Quando você sai do repouso em um carro, sua velocidade aumenta: está aceleração. Quando pisa no freio, velocidade diminui: aceleração negativa (desaceleração).',
        outra: 'Aceleração não é só "ficar mais rápido". É qualquer mudança de velocidade, incluindo diminuir de velocidade.',
        detalhado: 'Aceleração é a derivada da velocidade em relação ao tempo: a = dv/dt = Δv/Δt. É um vetor, tem direção. Pode ser positiva (aumenta velocidade) ou negativa (diminui velocidade).',
      },
    },
    {
      id: 'b2',
      skill: 'media',
      title: 'Aceleração média',
      text: 'Aceleração média é a mudança total de velocidade dividida pelo tempo total.',
      example: 'Um carro aumenta sua velocidade de 0 para 100 km/h em 10 segundos. Aceleração média = (100 - 0) / 10 = 10 km/h por segundo.',
      variants: {
        simples: 'a_média = mudança de velocidade / tempo',
        exemplo: 'De 20 m/s para 30 m/s em 5 segundos? a = (30-20)/5 = 2 m/s²',
        outra: 'Fórmula: a = Δv / Δt = (v_final - v_inicial) / tempo',
        detalhado: 'Matematicamente: a_m = (v_f - v_i) / (t_f - t_i). A unidade é m/s² (metros por segundo ao quadrado).',
      },
    },
    {
      id: 'b3',
      skill: 'calculo',
      title: 'Como calcular aceleração',
      text: 'Use a fórmula: a = Δv / Δt. Subtraia a velocidade inicial da final, divida pelo tempo.',
      example: 'Velocidade inicial: 10 m/s. Velocidade final: 30 m/s. Tempo: 4 segundos. a = (30-10)/4 = 5 m/s²',
      variants: {
        simples: 'a = (v_final - v_inicial) / tempo',
        exemplo: 'Um ciclista acelera de 5 m/s para 15 m/s em 2 segundos. a = (15-5)/2 = 5 m/s²',
        outra: 'Se a aceleração é negativa, significa desaceleração (freio).',
        detalhado: 'Unidade: se velocidade está em m/s e tempo em s, aceleração fica em m/s². Se velocidade em km/h e tempo em s, resultado precisa conversão.',
      },
    },
    {
      id: 'b4',
      skill: 'tipos',
      title: 'Tipos de aceleração',
      text: 'Aceleração tangencial muda a velocidade. Aceleração centrípeta muda a direção. Os dois podem ocorrer juntos.',
      example: 'Um carro em uma curva: aceleração centrípeta o mantém na trajetória curva. Se também acelera/freia, tem aceleração tangencial também.',
      variants: {
        simples: 'Tangencial = mais rápido ou mais devagar. Centrípeta = muda de direção (curva).',
        exemplo: 'Carro acelerando em linha reta: só tangencial. Carro em velocidade constante em uma curva: só centrípeta. Carro acelerando em uma curva: ambas.',
        outra: 'Aceleração centrípeta = v² / r (depende da velocidade e do raio da curva)',
        detalhado: 'Aceleração é uma grandeza vetorial. Pode ter componentes: tangencial (Δv) e centrípeta (muda direção). Aceleração total = raiz(a_tang² + a_cent²).',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'Um carro que freia está aceleração?', options: ['Não, só acelera quando fica mais rápido', 'Sim, desaceleração é aceleração negativa', 'Talvez', 'Depende da cor do carro'], answer: 1, hints: ['Aceleração é mudança de velocidade', 'Diminuir de velocidade é mudança'], explanation: 'Sim! Aceleração é qualquer mudança de velocidade, inclusive diminuir (desaceleração = aceleração negativa).' },
    { id: 'q2', type: 'fill', difficulty: 1, skill: 'media', prompt: 'Um objeto vai de 10 m/s para 30 m/s em 4 segundos. Sua aceleração é ____ m/s².', answers: ['5'], hints: ['Use a = Δv/Δt', '(30-10)/4 = ?'], explanation: 'a = (30-10)/4 = 20/4 = 5 m/s²' },
    { id: 'q3', type: 'tf', difficulty: 2, skill: 'calculo', prompt: 'Se um objeto está em repouso, sua aceleração é zero.', answer: false, hints: ['Repouso = sem movimento', 'Mas pode estar aceleração?', 'Aceleração = mudança de velocidade'], explanation: 'Falso. Um objeto em repouso pode estar com aceleração diferente de zero se está prestes a se mover ou se está em uma curva.' },
    { id: 'q4', type: 'mc', difficulty: 2, skill: 'tipos', prompt: 'Um carro em uma curva com velocidade constante tem qual tipo de aceleração?', options: ['Tangencial', 'Centrípeta', 'Nenhuma', 'Ambas'], answer: 1, hints: ['Velocidade é constante (não muda magnitude)', 'Mas muda direção'], explanation: 'Centrípeta. A velocidade não muda de magnitude, mas muda de direção (curva), portanto há aceleração centrípeta.' },
  ],
  review: ['Aceleração = mudança de velocidade / tempo', 'Aceleração negativa = desaceleração (freio)', 'Unidade: m/s²', 'Aceleração tangencial: muda velocidade', 'Aceleração centrípeta: muda direção'],
  sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }],
}

// ============================================================================
// FORÇA
// ============================================================================

export const forca: Lesson = {
  id: 'fis-forca',
  subject: 'fisica',
  title: 'Força',
  levels: ['fund2', 'medio'],
  grade: '8º ano ao 3º Médio',
  aliases: ['força', 'Newton', 'força resultante', 'força aplicada', 'força de atrito', 'força peso', 'força normal', 'N', 'interação'],
  summary: 'Aprenda o conceito de força, suas unidades e como calcular força resultante.',
  intro: 'Força é qualquer coisa que muda o movimento de um objeto — um empurrão, um puxão, a gravidade. Vamos descobrir como medir e calcular forças!',
  skills: {
    conceito: 'O que é força',
    tipos: 'Tipos de força',
    resultante: 'Força resultante',
    unidade: 'Unidade e medida'
  },
  blocks: [
    {
      id: 'b1',
      skill: 'conceito',
      title: 'O que é força?',
      text: 'Força é toda ação que causa ou tenta causar mudança no movimento de um objeto. É uma grandeza vetorial (tem direção).',
      example: 'Um empurrão, um puxão, a gravidade puxando para baixo, o atrito entre superfícies — tudo são forças.',
      variants: {
        simples: 'Força = tudo que empurra ou puxa. Muda a velocidade de algo.',
        exemplo: 'Você empurra uma bola: aplicou força. A Terra puxa a bola para baixo: força da gravidade.',
        outra: 'Força é um vetor: tem magnitude (tamanho) e direção (para onde).',
        detalhado: 'Em Física, força é definida como a causa de aceleração de um objeto (F = ma). É medida em Newtons (N). Um Newton é a força necessária para acelerar 1 kg a 1 m/s².',
      },
    },
    {
      id: 'b2',
      skill: 'tipos',
      title: 'Tipos de força',
      text: 'Existem várias forças: peso (gravidade), normal (superfície), atrito, tração (corda), elástica (mola).',
      example: 'Quando você pula: força do seu músculo te empurra para cima. Gravidade te puxa para baixo. O chão empurra para cima (força normal).',
      variants: {
        simples: 'Peso = força da gravidade. Normal = superfície empurrando. Atrito = resistência ao movimento.',
        exemplo: 'Bola caindo: peso a puxa. Corda puxando: tração. Mola esticada: força elástica.',
        outra: 'Força de contato: empurrão, puxão, atrito. Força de ação a distância: gravidade, eletricidade.',
        detalhado: 'Peso W = m × g (massa × gravidade). Força normal N é perpendicular à superfície. Atrito f = μ × N (coeficiente × normal). Tração T é ao longo da corda.',
      },
    },
    {
      id: 'b3',
      skill: 'resultante',
      title: 'Força resultante',
      text: 'Força resultante é a soma de todas as forças atuando em um objeto. Pode ser calculada graficamente ou matematicamente.',
      example: 'Dois puxam uma corda: 50 N cada um, na mesma direção. Força resultante = 100 N. Se um puxa 50 N e o outro 30 N em direção oposta: resultante = 20 N.',
      variants: {
        simples: 'Resultante = soma de todas as forças.',
        exemplo: 'Se duas pessoas empurram na mesma direção, as forças somam. Se empurram em direções opostas, subtraem.',
        outra: 'Forças na mesma direção: somam. Direções opostas: subtraem. Perpendiculares: usa Pitágoras.',
        detalhado: 'Se F1 e F2 são paralelas (mesma direção), F_r = F1 + F2. Se opostas, F_r = |F1 - F2|. Se perpendiculares, F_r = √(F1² + F2²).',
      },
    },
    {
      id: 'b4',
      skill: 'unidade',
      title: 'Unidade de força: Newton',
      text: 'A unidade de força no SI é o Newton (N). Um Newton é a força necessária para acelerar 1 quilograma a 1 metro por segundo ao quadrado.',
      example: 'Um objeto de 10 kg sob gravidade terrestre tem peso de 10 × 10 = 100 Newtons (aproximadamente).',
      variants: {
        simples: 'Força se mede em Newtons (N).',
        exemplo: 'Seu peso (força que a Terra puxa você) é aproximadamente 70 N vezes sua massa em kg. Se pesa 70 kg, peso ≈ 700 N.',
        outra: 'Newton = kg × m/s² (unidade derivada)',
        detalhado: '1 N = 1 kg⋅m/s². Fórmula: F = m × a. Se conhece massa e aceleração, calcula força. Se conhece força e massa, calcula aceleração.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'O que é força?', options: ['Apenas empurrão', 'Qualquer ação que muda movimento', 'Só puxão', 'Gravidade nada mais'], answer: 1, hints: ['Pode ser empurrão OU puxão', 'Também gravidade, atrito...'], explanation: 'Força é qualquer ação que causa ou tenta causar mudança no movimento de um objeto.' },
    { id: 'q2', type: 'fill', difficulty: 1, skill: 'tipos', prompt: 'A força que a Terra exerce sobre você é chamada ____', answers: ['peso', 'gravidade'], hints: ['Força para baixo', 'Depende da sua massa'], explanation: 'Peso é a força gravitacional da Terra sobre você: W = m × g' },
    { id: 'q3', type: 'mc', difficulty: 2, skill: 'resultante', prompt: 'Duas forças de 30 N cada, em direções opostas. Força resultante é?', options: ['60 N', '0 N', '30 N', '90 N'], answer: 1, hints: ['Direções opostas...', 'Subtraem?', '30 - 30 = ?'], explanation: 'Quando forças são opostas, subtraem: 30 - 30 = 0 N. Objeto não acelera.' },
    { id: 'q4', type: 'fill', difficulty: 2, skill: 'unidade', prompt: 'Um Newton é a força para acelerar 1 kg a ____ m/s².', answers: ['1'], hints: ['Definição de Newton', '1 N = 1 kg × 1 m/s²'], explanation: '1 N = 1 kg⋅m/s² (por definição)' },
  ],
  review: ['Força é toda ação que muda movimento', 'Força = m × a (Fórmula fundamental)', 'Unidade: Newton (N)', 'Força resultante = soma vetorial de todas as forças', 'Tipos: peso, normal, atrito, tração, elástica'],
  sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }],
}

// ============================================================================
// PRIMEIRA LEI DE NEWTON
// ============================================================================

export const primeira_lei_newton: Lesson = {
  id: 'fis-primeira-lei-newton',
  subject: 'fisica',
  title: 'Primeira Lei de Newton — Inércia',
  levels: ['fund2', 'medio'],
  grade: '8º ano ao 3º Médio',
  aliases: ['primeira lei de Newton', 'inércia', 'lei da inércia', 'repouso', 'movimento uniforme', 'corpo em repouso', 'corpo em movimento', 'força equilibrada'],
  summary: 'Aprenda a Primeira Lei de Newton e entenda o conceito de inércia.',
  intro: 'Um objeto em repouso quer ficar em repouso. Um objeto em movimento quer continuar em movimento — a menos que uma força o impeça. Isso é inércia!',
  skills: {
    enunciado: 'Enunciado da lei',
    inercia: 'O conceito de inércia',
    aplicacao: 'Aplicações práticas',
    equilibrio: 'Equilíbrio de forças'
  },
  blocks: [
    {
      id: 'b1',
      skill: 'enunciado',
      title: 'Enunciado da Primeira Lei',
      text: 'Se nenhuma força atua sobre um corpo, ou se a força resultante é zero, o corpo permanece em repouso ou em movimento retilíneo uniforme.',
      example: 'Um objeto em uma mesa lisa (sem atrito) e sem forças aplicadas vai ficar parado — ou continuar se movendo em linha reta para sempre.',
      variants: {
        simples: '"Um corpo parado quer ficar parado. Um corpo em movimento quer continuar em movimento."',
        exemplo: 'Quando você está em um carro que freia bruscamente, você é "jogado" para frente — porque seu corpo quer continuar em movimento.',
        outra: 'Força resultante zero = aceleração zero',
        detalhado: 'Matematicamente: se ΣF = 0, então a = 0, então v = constante (ou zero). O corpo não muda de velocidade.',
      },
    },
    {
      id: 'b2',
      skill: 'inercia',
      title: 'Inércia',
      text: 'Inércia é a tendência de um corpo resistir a mudanças no seu movimento. Quanto maior a massa, maior a inércia.',
      example: 'É fácil empurrar uma bola de borracha. Difícil empurrar um carro. O carro tem mais inércia porque tem mais massa.',
      variants: {
        simples: 'Inércia = resistência a mudança. Massa grande = muita inércia.',
        exemplo: 'Pena cai devagar no ar (pouca inércia). Bola de ferro cai rápido (muita inércia, mas mesmo assim tem inércia).',
        outra: 'Inércia é diretamente proporcional à massa.',
        detalhado: 'Inércia é a propriedade de resistir ao movimento. É quantificada pela massa. Quanto maior a massa, maior a inércia, mais força é necessária para acelerar.',
      },
    },
    {
      id: 'b3',
      skill: 'aplicacao',
      title: 'Aplicações da Primeira Lei',
      text: 'Cintos de segurança, air bags, freios de carro — tudo funciona porque pessoas têm inércia.',
      example: 'Carro freia: seu corpo continua se movendo para frente (inércia). Cinto de segurança o segura.',
      variants: {
        simples: 'Sem força (ou força zero), corpo continua como estava.',
        exemplo: 'Prato em uma toalha: puxe depressa e o prato fica parado (inércia). Astronauta flutuando no espaço: sem gravidade, continua se movendo em linha reta.',
        outra: 'Patinador em gelo sem atrito: se não aplicar força, vai em linha reta para sempre.',
        detalhado: 'Exemplos: satélite em órbita (equilibrado entre inércia e gravidade), nave no espaço vazio (movimento perpétuo sem forças), freio de emergência em trem.',
      },
    },
    {
      id: 'b4',
      skill: 'equilibrio',
      title: 'Equilíbrio de forças',
      text: 'Um objeto está em equilíbrio quando a força resultante é zero. Pode estar parado ou em movimento uniforme.',
      example: 'Um livro na mesa: força da mesa (normal) iguala força da gravidade (peso). Resultante = 0. Livro fica parado (equilíbrio estático).',
      variants: {
        simples: 'Equilíbrio = força resultante zero.',
        exemplo: 'Pessoa puxando em direções iguais: equilibra. Objeto na mesa: peso é equilibrado pela normal.',
        outra: 'Equilíbrio estático: objeto parado. Equilíbrio dinâmico: objeto em movimento constante.',
        detalhado: 'ΣF = 0 implica que Σ(F_x) = 0 E Σ(F_y) = 0 (componentes x e y). Torna a aceleração zero.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'enunciado', prompt: 'Qual é o enunciado da Primeira Lei de Newton?', options: ['F = ma', 'Um corpo parado quer ficar parado', 'Ação e reação', 'Força muda energia'], answer: 1, hints: ['Lei da inércia', 'Sobre tendência de movimento'], explanation: 'A Primeira Lei diz que um corpo sem forças (ou com força resultante zero) mantém seu estado de repouso ou movimento.' },
    { id: 'q2', type: 'tf', difficulty: 1, skill: 'inercia', prompt: 'Massa grande significa muita inércia.', answer: true, hints: ['Inércia = resistência a mudança', 'Mais massa = mais resistência'], explanation: 'Verdadeiro. Inércia é proporcional à massa. Quanto mais pesado, mais inércia tem.' },
    { id: 'q3', type: 'mc', difficulty: 2, skill: 'aplicacao', prompt: 'Por que o cinto de segurança te segura quando o carro freia?', options: ['Puxa você para frente', 'Impede sua inércia te levar para frente', 'Freia o carro', 'Nada, só segura'], answer: 1, hints: ['Corpo quer continuar em movimento', 'Cinto aplica força de volta'], explanation: 'Quando o carro freia, seu corpo continua em movimento para frente (inércia). O cinto aplica uma força que te traz de volta.' },
    { id: 'q4', type: 'fill', difficulty: 2, skill: 'equilibrio', prompt: 'Um livro na mesa está em equilíbrio porque força do peso é equilibrada pela força ____', answers: ['normal'], hints: ['Força que a mesa exerce', 'Perpendicular à superfície'], explanation: 'A força normal (da mesa) equilibra o peso (gravidade). Resultante = 0.' },
  ],
  review: ['Primeira Lei: corpo sem força mantém seu estado', 'Inércia = resistência a mudanças', 'Maior massa = maior inércia', 'Equilíbrio: força resultante = 0', 'Exemplos: cintos de segurança, air bags'],
  sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }],
}

// ============================================================================
// SEGUNDA LEI DE NEWTON
// ============================================================================

export const segunda_lei_newton: Lesson = {
  id: 'fis-segunda-lei-newton',
  subject: 'fisica',
  title: 'Segunda Lei de Newton — F = ma',
  levels: ['fund2', 'medio'],
  grade: '8º ano ao 3º Médio',
  aliases: ['segunda lei de Newton', 'F=ma', 'força massa aceleração', 'lei fundamental', 'lei da dinâmica', 'força resultante', 'aceleração proporcional'],
  summary: 'Aprenda a Segunda Lei de Newton, a fórmula F = ma e como calcular força, massa e aceleração.',
  intro: 'A Força resultante determina como um objeto acelera. Quanto maior a força, maior a aceleração. Quanto maior a massa, menor a aceleração para mesma força.',
  skills: {
    enunciado: 'A fórmula F = ma',
    relacao: 'Relação entre F, m e a',
    calculo: 'Como calcular',
    aplicacao: 'Aplicações'
  },
  blocks: [
    {
      id: 'b1',
      skill: 'enunciado',
      title: 'Enunciado: F = ma',
      text: 'A força resultante é igual ao produto da massa pela aceleração. Fórmula: F = m × a',
      example: 'Um carro de 1000 kg com aceleração de 2 m/s² tem força resultante de 1000 × 2 = 2000 N.',
      variants: {
        simples: 'F = m × a. Força = massa vezes aceleração.',
        exemplo: 'Se massa é 10 kg e aceleração é 5 m/s², força é 50 N.',
        outra: 'Esta é a lei mais importante da Física! Tudo em movimento depende dela.',
        detalhado: 'ΣF = ma, onde ΣF é força resultante (soma de todas as forças), m é massa (em kg), a é aceleração (em m/s²).',
      },
    },
    {
      id: 'b2',
      skill: 'relacao',
      title: 'Relações entre F, m e a',
      text: 'Força é diretamente proporcional à aceleração. Força é inversamente proporcional à massa.',
      example: 'Mesma força em um carro leve: grande aceleração. Mesma força em um carro pesado: pequena aceleração.',
      variants: {
        simples: 'Mais força = mais aceleração. Mais massa = menos aceleração.',
        exemplo: 'Bola de ping-pong vs bola de bowling: mesma força a move diferente porque têm massas diferentes.',
        outra: 'Duplicar a força duplica a aceleração. Duplicar a massa reduz a aceleração à metade.',
        detalhado: 'F ∝ a (diretamente proporcional). F ∝ 1/m (inversamente proporcional). Então a ∝ 1/m (mais massa = menos aceleração para mesma força).',
      },
    },
    {
      id: 'b3',
      skill: 'calculo',
      title: 'Como calcular usando F = ma',
      text: 'Escolha o que quer calcular e reorganize a fórmula. Se quer F: F = ma. Se quer a: a = F/m. Se quer m: m = F/a.',
      example: 'Força = 50 N, massa = 10 kg. Aceleração: a = 50/10 = 5 m/s². Ou: Aceleração = 3 m/s², massa = 4 kg. Força: F = 4×3 = 12 N.',
      variants: {
        simples: 'F = ma. Também: a = F/m, ou m = F/a.',
        exemplo: 'Conhece F e m? Calcula a = F/m. Conhece a e m? Calcula F = ma.',
        outra: 'Sempre use unidades corretas: força em Newtons, massa em kg, aceleração em m/s².',
        detalhado: 'Análise dimensional: [N] = [kg]×[m/s²]. Se resultado não tem unidade certa, algo errou.',
      },
    },
    {
      id: 'b4',
      skill: 'aplicacao',
      title: 'Aplicações da Segunda Lei',
      text: 'Cálculos de movimento de carros, foguetes, quedas, lançamentos — tudo usa F = ma.',
      example: 'Quantos Newtons de força preciso para acelerar 1000 kg a 5 m/s²? F = 1000 × 5 = 5000 N.',
      variants: {
        simples: 'Use F = ma para calcular qualquer movimento.',
        exemplo: 'Carro de 1500 kg precisa acelerar a 4 m/s². Força necessária: F = 1500 × 4 = 6000 N.',
        outra: 'Conhecendo força e massa, sabe a aceleração. Conhecendo aceleração e massa, sabe a força.',
        detalhado: 'Toda engenharia de movimento usa esta lei. Motor do carro gera força. Engenheiros calculam aceleração. Freios aplicam força oposta para desacelerar.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'enunciado', prompt: 'Qual é a fórmula da Segunda Lei de Newton?', options: ['F = m/a', 'F = ma', 'a = mF', 'F = a/m'], answer: 1, hints: ['Força = ... vezes aceleração'], explanation: 'F = ma. Força é massa vezes aceleração.' },
    { id: 'q2', type: 'fill', difficulty: 1, skill: 'relacao', prompt: 'Se duplicar a força, a aceleração ____ (aumenta ou diminui?)', answers: ['aumenta'], hints: ['F ∝ a'], explanation: 'Se duplicar F, a aceleração também duplica (são diretamente proporcionais).' },
    { id: 'q3', type: 'fill', difficulty: 2, skill: 'calculo', prompt: 'Uma força de 100 N é aplicada a um objeto de 20 kg. Sua aceleração é ____ m/s².', answers: ['5'], hints: ['a = F/m', '100/20 = ?'], explanation: 'a = F/m = 100/20 = 5 m/s²' },
    { id: 'q4', type: 'mc', difficulty: 2, skill: 'aplicacao', prompt: 'Qual força é necessária para acelerar 500 kg a 2 m/s²?', options: ['250 N', '1000 N', 'Falta informação', '250 kg'], answer: 1, hints: ['Use F = ma', '500 × 2 = ?'], explanation: 'F = 500 × 2 = 1000 N' },
  ],
  review: ['Segunda Lei: F = ma', 'Força causa aceleração', 'Força ∝ aceleração (mesma massa)', 'Força ∝ 1/massa (mesma aceleração)', 'F = ma é a lei mais importante!'],
  sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }],
}

// ============================================================================
// TERCEIRA LEI DE NEWTON
// ============================================================================

export const terceira_lei_newton: Lesson = {
  id: 'fis-terceira-lei-newton',
  subject: 'fisica',
  title: 'Terceira Lei de Newton — Ação e Reação',
  levels: ['fund2', 'medio'],
  grade: '8º ano ao 3º Médio',
  aliases: ['terceira lei de Newton', 'ação e reação', 'par ação-reação', 'forças iguais', 'direções opostas', 'interação', 'impulso-propulsão'],
  summary: 'Aprenda a Terceira Lei de Newton: ação e reação. Entenda como funcionam os foguetes, saltos e tudo que se move.',
  intro: 'Quando você pula, você empurra o chão para baixo. O chão empurra você para cima com força igual. Isso é ação e reação!',
  skills: {
    enunciado: 'Ação e reação',
    pares: 'Pares de forças',
    exemplos: 'Exemplos práticos',
    movimento: 'Como gera movimento'
  },
  blocks: [
    {
      id: 'b1',
      skill: 'enunciado',
      title: 'Enunciado: Ação e Reação',
      text: 'Se um corpo A exerce força em um corpo B, então B exerce uma força de igual magnitude e direção oposta em A.',
      example: 'Você empurra uma parede: parede empurra você com força igual (para trás).',
      variants: {
        simples: '"Para cada ação, há uma reação igual e oposta."',
        exemplo: 'Você pula: você empurra Terra para baixo, Terra empurra você para cima com mesma força.',
        outra: 'As forças sempre vêm em pares. Nunca existe apenas uma força.',
        detalhado: 'Se F_AB = força de A em B, então F_BA = -F_AB (força de B em A). Têm mesma magnitude, direções opostas, atuam em corpos diferentes.',
      },
    },
    {
      id: 'b2',
      skill: 'pares',
      title: 'Pares de ação e reação',
      text: 'Forças sempre vêm em pares iguais e opostos. Atuam em corpos diferentes.',
      example: 'Você chuta uma bola: você exerce força na bola (ela sai voando). Bola exerce força em você (seu pé "dói").',
      variants: {
        simples: 'Duas forças: mesma magnitude, direções opostas, em corpos diferentes.',
        exemplo: 'Puxador puxando corda: puxador puxa corda para frente, corda puxa puxador para trás.',
        outra: 'NÃO se cancelam porque atuam em corpos diferentes! A bola e você não cancelam — você acelera um jeito, bola outro.',
        detalhado: 'Magnitudes: |F_ação| = |F_reação|. Direções: opostas. Pontos de aplicação: em corpos diferentes. Por isso não se cancelam.',
      },
    },
    {
      id: 'b3',
      skill: 'exemplos',
      title: 'Exemplos de ação e reação',
      text: 'Foguetes, pássaros voando, peixes nadando, carros acelerando — todos usam ação e reação.',
      example: 'Foguete: expele gases para trás (ação). Gases empurram foguete para frente (reação).',
      variants: {
        simples: 'Qualquer movimento usa ação e reação.',
        exemplo: 'Pássaro: bate asa para baixo (ação). Ar empurra asa para cima (reação). Resultado: voa.',
        outra: 'Peixe: empurra água para trás. Água empurra peixe para frente. Sai nadando.',
        detalhado: 'Carro: motor gira rodas. Rodas empurram estrada para trás (ação). Estrada empurra carro para frente (reação). Carro sai voando.',
      },
    },
    {
      id: 'b4',
      skill: 'movimento',
      title: 'Como ação-reação gera movimento',
      text: 'Um objeto exerce força em algo (ação). Esse algo exerce força de volta (reação). A reação move o objeto inicial.',
      example: 'Você está em patins em piso liso. Empurra a parede (ação). Parede empurra você (reação). Você sai andando (em patins).',
      variants: {
        simples: 'Você empurra, mundo empurra de volta. Resultado: você se move.',
        exemplo: 'Em piso sem atrito, empurre parede = sai voando para trás. Só parede está parada porque prédio inteiro a segura.',
        outra: 'Foguete: queima combustível, expele gases. Gases empurram foguete. Resultado: foguete sai voando.',
        detalhado: 'F_ação (você na parede) causa reação (parede em você). Como parede está presa ao prédio, parede fica. Você se move. Impulso é transferido.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'enunciado', prompt: 'Qual é o enunciado da Terceira Lei de Newton?', options: ['F = ma', 'Para cada ação, há reação igual e oposta', 'Corpos resistem ao movimento', 'Força = energia'], answer: 1, hints: ['Ação e reação'], explanation: 'A Terceira Lei diz que forças sempre vêm em pares iguais e opostos.' },
    { id: 'q2', type: 'tf', difficulty: 1, skill: 'pares', prompt: 'Ação e reação se cancelam porque têm mesma magnitude.', answer: false, hints: ['Atuam em corpos diferentes', 'Não se cancelam!'], explanation: 'Falso. Embora iguais em magnitude, atuam em corpos diferentes então não se cancelam. Causam movimentos diferentes.' },
    { id: 'q3', type: 'mc', difficulty: 2, skill: 'exemplos', prompt: 'Por que um foguete sobe?', options: ['Porque é leve', 'Expele gases para baixo (ação), gases empurram foguete para cima (reação)', 'Porque a corda o puxa', 'Magia'], answer: 1, hints: ['Ação e reação'], explanation: 'Foguete expele gases para baixo (ação). Os gases empurram o foguete para cima (reação). Resultado: sobe.' },
    { id: 'q4', type: 'fill', difficulty: 2, skill: 'movimento', prompt: 'Você está em patins em piso liso e empurra a parede. A parede empurra você com força ____', answers: ['igual', 'mesma', 'idêntica'], hints: ['Terceira Lei', 'Magnitudes iguais'], explanation: 'A parede empurra você com força de mesma magnitude da sua ação (mas direção oposta).' },
  ],
  review: ['Terceira Lei: ação = reação (oposta)', 'Forças sempre vêm em pares', 'Atuam em corpos diferentes', 'Não se cancelam', 'Explicam todos os movimentos'],
  sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }],
}

export const trabalho: Lesson = { id: 'fis-trabalho', subject: 'fisica', title: 'Trabalho', levels: ['medio'], grade: '1º ao 3º Médio', aliases: ['trabalho', 'trabalho mecânico', 'joule', 'J', 'força deslocamento', 'trabalho força'], summary: 'Aprenda o conceito de trabalho em Física.', intro: 'Trabalho é quando força faz algo se mover. Vamos entender este conceito fundamental!', skills: { conceito: 'Conceito de trabalho', formula: 'Fórmula W = F × d', tipos: 'Tipos de trabalho', calculo: 'Como calcular' }, blocks: [ { id: 'b1', skill: 'conceito', title: 'O que é trabalho em Física?', text: 'Trabalho é a transferência de energia causada por uma força atuando ao longo de uma distância.', example: 'Você empurra uma caixa 5 metros: realizou trabalho. Você empurra a parede que não se move: não há trabalho.', variants: { simples: 'Trabalho = força × distância', exemplo: 'Carregar caixa: não é trabalho (está parada). Carregar para cima: é trabalho (distância vertical).', outra: 'Trabalho é energia transferida por força.', detalhado: 'W = F × d × cos(θ), onde θ é ângulo entre força e deslocamento. Se perpendicular, trabalho é zero.' } }, { id: 'b2', skill: 'formula', title: 'Fórmula do trabalho', text: 'Trabalho = Força × Distância (quando força é paralela ao deslocamento).', example: 'Força de 50 N, distância 10 m: W = 50 × 10 = 500 J (Joules).', variants: { simples: 'W = F × d', exemplo: 'F = 100 N, d = 5 m → W = 500 J', outra: 'Unidade: Joule (J) = N × m', detalhado: 'W = F·d·cos(θ). Se θ = 0° (mesma direção), W = Fd. Se θ = 90° (perpendicular), W = 0.' } }, { id: 'b3', skill: 'tipos', title: 'Trabalho positivo e negativo', text: 'Trabalho positivo: força e deslocamento mesma direção. Trabalho negativo: opostas.', example: 'Carregando caixa para cima: trabalho positivo. Freio reduzindo velocidade: trabalho negativo.', variants: { simples: 'Força empurrando = trabalho positivo. Força freando = trabalho negativo.', exemplo: 'Você lança bola para cima: gravidade faz trabalho negativo (tira energia).', outra: 'Trabalho total = soma de todos os trabalhos.', detalhado: 'W_total = W_força_motriz + W_atrito + W_gravidade + ...'. } }, { id: 'b4', skill: 'calculo', title: 'Calculando trabalho', text: 'Use W = F × d quando força e deslocamento têm mesma direção.', example: 'Puxar carrinho com força 40 N por 8 m: W = 40 × 8 = 320 J.', variants: { simples: 'Multiplique força por distância.', exemplo: '60 N por 3 m = 180 J', outra: 'Cuidado com unidades: Newtons e metros.', detalhado: 'Se força não é paralela: W = F × d × cos(ângulo).' } } ], questions: [ { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'O que é trabalho em Física?', options: ['Esforço físico', 'Força × Distância', 'Apenas mudar de lugar', 'Aplicar força'], answer: 1, hints: ['Envolve força e movimento'], explanation: 'Trabalho é força aplicada ao longo de uma distância (W = F × d).' }, { id: 'q2', type: 'fill', difficulty: 1, skill: 'formula', prompt: 'Força 20 N, distância 5 m. Trabalho = ____ J', answers: ['100'], hints: ['W = F × d', '20 × 5'], explanation: 'W = 20 × 5 = 100 Joules' }, { id: 'q3', type: 'mc', difficulty: 2, skill: 'tipos', prompt: 'Quando você sobe escadas, a gravidade faz trabalho?', options: ['Positivo', 'Negativo', 'Zero', 'Nenhum'], answer: 1, hints: ['Você sobe, gravidade puxa para baixo'], explanation: 'Trabalho negativo: força (gravidade) oposta ao deslocamento (você sobe).' }, { id: 'q4', type: 'fill', difficulty: 2, skill: 'calculo', prompt: 'Uma força de 30 N faz uma caixa se mover 4 m. Trabalho realizado = ____ J', answers: ['120'], hints: ['W = F × d', '30 × 4'], explanation: 'W = 30 × 4 = 120 J' } ], review: ['Trabalho = Força × Distância', 'Unidade: Joule (J)', 'Trabalho positivo: força e deslocamento mesma direção', 'Trabalho negativo: direções opostas', 'W = F × d × cos(θ)'], sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }] }

export const energia: Lesson = { id: 'fis-energia', subject: 'fisica', title: 'Energia', levels: ['fund2', 'medio'], grade: '8º ao 3º Médio', aliases: ['energia', 'energia cinética', 'energia potencial', 'energia mecânica', 'conservação energia', 'joule'], summary: 'Aprenda sobre energia, formas de energia e conservação.', intro: 'Energia é a capacidade de fazer trabalho. Vamos entender este conceito universal!', skills: { conceito: 'O que é energia', tipos: 'Tipos de energia', conservacao: 'Conservação de energia', transformacao: 'Transformação de energia' }, blocks: [ { id: 'b1', skill: 'conceito', title: 'O que é energia?', text: 'Energia é a capacidade de fazer trabalho ou causar mudanças. Sem energia, nada se move.', example: 'Comida tem energia química. Você a converte em energia de movimento.', variants: { simples: 'Energia = capacidade de fazer trabalho.', exemplo: 'Você come, ganha energia. Corre, converte energia em movimento.', outra: 'Unidade: Joule (J), mesma do trabalho.', detalhado: 'Energia é conservada: não some, só muda de forma. E_inicial = E_final' } }, { id: 'b2', skill: 'tipos', title: 'Tipos de energia', text: 'Energia cinética (movimento), energia potencial (posição), energia térmica (calor), energia química (reação).', example: 'Carro acelerado: cinética. Bola no alto: potencial. Fogo: térmica e química.', variants: { simples: 'Cinética: movimento. Potencial: altura ou posição.', exemplo: 'Pêndulo: potencial no topo, cinética na base.', outra: 'Conversões: potencial → cinética → térmica → ..', detalhado: 'E_cinética = ½mv². E_potencial = mgh. E_total = E_cinética + E_potencial' } }, { id: 'b3', skill: 'conservacao', title: 'Conservação de energia', text: 'Energia total é conservada: não surge do nada, não desaparece. Só muda de forma.', example: 'Bola caindo: potencial vira cinética. Fricção converte em calor.', variants: { simples: 'Energia não some, só muda.', exemplo: 'Sistema isolado: E_total = constante.', outra: 'Sem atrito: E_cinética + E_potencial = constante.', detalhado: 'E_inicial = E_final + E_dissipada (por atrito, calor, som).' } }, { id: 'b4', skill: 'transformacao', title: 'Transformação de energia', text: 'Energia pode se transformar: química em luz (lâmpada), potencial em cinética (queda), cinética em térmica (freio).', example: 'Celular: bateria (química) → luz/som/calor.', variants: { simples: 'Energia muda de forma.', exemplo: 'Painel solar: luz → eletricidade.', outra: 'Usina hidrelétrica: potencial de água → eletricidade.', detalhado: 'Eficiência = (energia útil / energia total) × 100%. Sempre < 100% por dissipação.' } } ], questions: [ { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'O que é energia?', options: ['Força', 'Capacidade de fazer trabalho', 'Movimento', 'Temperatura'], answer: 1, hints: ['Causa mudanças e movimento'], explanation: 'Energia é a capacidade de fazer trabalho ou causar mudanças.' }, { id: 'q2', type: 'fill', difficulty: 1, skill: 'tipos', prompt: 'Uma bola em movimento tem energia ____', answers: ['cinética'], hints: ['Movimento = qual tipo'], explanation: 'Movimento = energia cinética (E_c = ½mv²).' }, { id: 'q3', type: 'tf', difficulty: 2, skill: 'conservacao', prompt: 'Energia pode desaparecer completamente de um sistema.', answer: false, hints: ['Lei de conservação'], explanation: 'Falso. Energia é conservada: muda de forma, não desaparece.' }, { id: 'q4', type: 'mc', difficulty: 2, skill: 'transformacao', prompt: 'Uma lâmpada transforma qual energia?', options: ['Cinética em luz', 'Elétrica em luz e calor', 'Potencial em cinética', 'Química em luz'], answer: 1, hints: ['Entra eletricidade, sai luz'], explanation: 'Lâmpada transforma energia elétrica em luz (e calor).' } ], review: ['Energia = capacidade de fazer trabalho', 'Cinética: movimento. Potencial: posição.', 'Energia é conservada (não desaparece)', 'Muda de forma, não suma', 'E_total = E_cinética + E_potencial'], sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }] }

// Outros tópicos (resumidos para espaço) - completar com padrão igual
export const potencia: Lesson = { id: 'fis-potencia', subject: 'fisica', title: 'Potência', levels: ['medio'], grade: '1º ao 3º Médio', aliases: ['potência', 'watts', 'W', 'energia tempo', 'rapidez transferência'], summary: 'Potência é a taxa de transferência de energia.', intro: 'Potência mede quão rápido energia é transferida. Watts medem potência!', skills: { conceito: 'Conceito', formula: 'P = W/t', aplicacao: 'Aplicações', comparacao: 'Comparação' }, blocks: [ { id: 'b1', skill: 'conceito', title: 'O que é potência?', text: 'Potência é a taxa de transferência de energia: quanto trabalho por unidade de tempo.', example: 'Dois motores: um faz 1000 J em 10 s (100 W), outro em 5 s (200 W). Segundo é mais potente.', variants: { simples: 'Potência = trabalho / tempo', exemplo: 'Escada rápido: alta potência. Escada devagar: baixa potência.', outra: 'Unidade: Watt (W) = J/s', detalhado: 'P = W/Δt = ΔE/Δt. Maior potência = mesma tarefa em menos tempo.' } }, { id: 'b2', skill: 'formula', title: 'Fórmula P = W/t', text: 'Potência = Trabalho / Tempo. Também: P = F × v (força × velocidade).', example: 'W = 500 J, t = 10 s → P = 50 W', variants: { simples: 'P = W / t', exemplo: 'F = 100 N, v = 5 m/s → P = 500 W', outra: 'Watts = Joules / segundo', detalhado: 'P = F × v × cos(θ). Se força paralela ao movimento, P = Fv.' } }, { id: 'b3', skill: 'aplicacao', title: 'Potência no dia-a-dia', text: 'Lâmpadas (60 W), chuveiro (4000 W), motor de carro (100.000 W).', example: 'Lâmpada 100 W: consome 100 Joules por segundo.', variants: { simples: 'Watts no nome dos aparelhos.', exemplo: 'Chuveiro 5000 W usa 5 vezes mais energia que lâmpada 100 W.', outra: 'Fatura de luz mede: P × t = kWh (energia)', detalhado: '1 kWh = 3.600.000 J. Se chuveiro 4000 W em 0,5 h: consumo = 2 kWh' } }, { id: 'b4', skill: 'comparacao', title: 'Comparando potências', text: 'Mesmo trabalho: quem faz em menos tempo tem mais potência.', example: 'Correr escada vs andar escada: ambos sobem, correr tem potência maior.', variants: { simples: 'Maior potência = mesma coisa mais rápido.', exemplo: 'Carro: 200 W (bicicleta) vs 100.000 W (motor).', outra: 'Eficiência ≠ potência.', detalhado: 'Potência é sobre velocidade de transferência, não quantidade total de energia.' } } ], questions: [ { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'O que é potência?', options: ['Força', 'Taxa de transferência de energia', 'Tempo', 'Distância'], answer: 1, hints: ['Energia / tempo'], explanation: 'Potência é a taxa (velocidade) de transferência de energia: P = W/t.' }, { id: 'q2', type: 'fill', difficulty: 1, skill: 'formula', prompt: 'Trabalho 200 J, tempo 4 s. Potência = ____ W', answers: ['50'], hints: ['P = W/t', '200/4'], explanation: 'P = 200 / 4 = 50 Watts' }, { id: 'q3', type: 'tf', difficulty: 2, skill: 'aplicacao', prompt: 'Um chuveiro consome mais potência que uma lâmpada.', answer: true, hints: ['Chuveiro: ~5000 W, lâmpada: ~100 W'], explanation: 'Verdadeiro. Chuveiro típico: 5000 W. Lâmpada típica: 100 W. Chuveiro usa 50x mais!' }, { id: 'q4', type: 'fill', difficulty: 2, skill: 'comparacao', prompt: 'Subir escada correndo vs andando: qual tem potência maior?', answers: ['correndo'], hints: ['Mesma altura, menos tempo'], explanation: 'Correndo: menos tempo, mesma energia → potência maior (P = E/t).' } ], review: ['Potência = Trabalho / Tempo', 'Unidade: Watt (W)', 'P também = Força × Velocidade', 'Maior potência = mesma tarefa mais rápido', 'Watts no nome: lâmpada, chuveiro, motor'], sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }] }

export const quantidade_movimento: Lesson = { id: 'fis-quantidade-movimento', subject: 'fisica', title: 'Quantidade de Movimento', levels: ['medio'], grade: '1º ao 3º Médio', aliases: ['quantidade de movimento', 'momentum', 'kg.m/s', 'p = mv', 'impulso'], summary: 'Aprenda quantidade de movimento e sua conservação.', intro: 'Quantidade de movimento = massa × velocidade. É um vetor conservado em colisões!', skills: { conceito: 'Definição', formula: 'p = mv', conservacao: 'Conservação', colisoes: 'Em colisões' }, blocks: [ { id: 'b1', skill: 'conceito', title: 'O que é quantidade de movimento?', text: 'Quantidade de movimento (p) = massa × velocidade. É a "quantidade" de movimento que algo tem.', example: 'Bola de boliche (10 kg, 2 m/s) tem p = 20 kg.m/s. Bola de ping-pong (0,1 kg, 10 m/s) tem p = 1 kg.m/s. Boliche tem 20× mais momentum.', variants: { simples: 'p = m × v', exemplo: 'Mais massa ou mais velocidade = mais momentum.', outra: 'Unidade: kg.m/s ou kg⋅m⋅s⁻¹', detalhado: 'p é vetor (tem direção). Mudança de p = F × t (impulso).' } }, { id: 'b2', skill: 'formula', title: 'Fórmula p = mv', text: 'Quantidade de movimento = massa × velocidade. Direto!', example: 'm = 50 kg, v = 4 m/s → p = 200 kg.m/s', variants: { simples: 'p = m × v', exemplo: 'Carro 1000 kg a 20 m/s: p = 20.000 kg.m/s', outra: 'Sem unidade: não é momentum.', detalhado: 'Mudança: Δp = F × Δt (impulso = força × tempo)' } }, { id: 'b3', skill: 'conservacao', title: 'Conservação de momentum', text: 'Em um sistema isolado (sem forças externas), quantidade de movimento total é conservada.', example: 'Dois carros colidem: p_antes = p_depois. Momento se redistribui entre eles.', variants: { simples: 'p_total_antes = p_total_depois', exemplo: 'Bola 1 kg a 10 m/s bate em bola parada: o momentum é redistribuído.', outra: 'Vale em colisões elásticas e inelásticas.', detalhado: 'Σp_inicial = Σp_final. Conservação vale porque F_ação = -F_reação.' } }, { id: 'b4', skill: 'colisoes', title: 'Quantidade de movimento em colisões', text: 'Em colisões, momentum é conservado. Objetos podem mudar velocidade, mas momentum total fica igual.', example: 'Colisão: carro A (2000 kg, 10 m/s) bate em B (1000 kg, 0). Depois: A diminui, B acelera. Mas p_total antes = p_total depois.', variants: { simples: 'Antes da colisão = depois da colisão (em momentum total).', exemplo: 'Explode bolo no ar: p=0 antes, depois pedaços vão em direções diferentes mas Σp=0.', outra: 'Válido mesmo com perda de energia (inelástico).', detalhado: 'Colisão elástica: energia também conservada. Inelástica: só momentum.' } } ], questions: [ { id: 'q1', type: 'mc', difficulty: 1, skill: 'conceito', prompt: 'O que é quantidade de movimento?', options: ['Força aplicada', 'Massa × Velocidade', 'Trabalho realizado', 'Potência'], answer: 1, hints: ['p = ?'], explanation: 'Quantidade de movimento p = m × v (massa vezes velocidade).' }, { id: 'q2', type: 'fill', difficulty: 1, skill: 'formula', prompt: 'Massa 4 kg, velocidade 5 m/s. Quantidade de movimento = ____ kg.m/s', answers: ['20'], hints: ['p = m × v', '4 × 5'], explanation: 'p = 4 × 5 = 20 kg.m/s' }, { id: 'q3', type: 'tf', difficulty: 2, skill: 'conservacao', prompt: 'Em uma colisão entre dois carros, a quantidade de movimento total é conservada.', answer: true, hints: ['Sistema isolado'], explanation: 'Verdadeiro. Momento total antes = momento total depois (não há forças externas relevantes).' }, { id: 'q4', type: 'mc', difficulty: 2, skill: 'colisoes', prompt: 'Bola A (1 kg, 10 m/s) bate em bola B (1 kg, 0 m/s) parada. Qual é o momentum total antes?', options: ['0', '5', '10', '20'], answer: 2, hints: ['p_A + p_B', '1×10 + 1×0'], explanation: 'p_total = 1×10 + 1×0 = 10 kg.m/s. Este valor se conserva depois.' } ], review: ['Quantidade de movimento p = m × v', 'Unidade: kg.m/s', 'É conservada em colisões', 'p é um vetor', 'Impulso = F × t = Δp'], sources: [BNCC, { title: 'Conteúdo autoral LUMI', kind: 'autoral' }] }

// TODO: Adicionar restantes (Gravitação, Pressão, Hidrostática, Termologia, Ondas, Acústica, Óptica)
// Total atual: 16 tópicos, faltam 9 para completar 25
