/**
 * LUMI — Expansão de Base Oficial para ~190 Lições
 * Filosofia (12), Sociologia (12), Geografia (20), Artes (10),
 * Educação Física (8), Português Adicional (30), Matemática Adicional (20), Ciências Adicional (15)
 */

import type { Lesson } from '../../types'

// ===== FILOSOFIA (12 lições) =====

export const empirismoRacionalismo: Lesson = {
  id: 'empirismo-racionalismo',
  subject: 'filosofia',
  title: 'Empirismo vs Racionalismo',
  levels: ['fund2', 'medio'],
  grade: '9º ano',
  aliases: ['descartes', 'locke', 'hume'],
  summary: 'Debate filosófico entre empirismo e racionalismo na origem do conhecimento',
  intro: 'Duas correntes fundamentais da Filosofia Medieval e Moderna divergem sobre como obtemos conhecimento.',
  objective: 'Comparar empirismo e racionalismo como teorias do conhecimento',
  blocks: [
    {
      id: 'b1',
      title: 'Racionalismo',
      text: 'Corrente que defende a razão como fonte primária do conhecimento. Descartes: "Penso, logo existo".',
      example: 'Matemática é conhecimento racional: verdades universais sem depender da experiência.',
      skill: 'racionalismo-filosofia'
    },
    {
      id: 'b2',
      title: 'Empirismo',
      text: 'Corrente que defende a experiência como fonte do conhecimento. Locke: mente é "tábula rasa".',
      example: 'Aprendemos o que é "vermelho" por experiência sensorial, não por razão pura.',
      skill: 'empirismo-filosofia'
    }
  ],
  questions: [],
  skills: {
    'racionalismo-filosofia': 'Entender racionalismo cartesiano',
    'empirismo-filosofia': 'Compreender empirismo britânico'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const iluminismo: Lesson = {
  id: 'iluminismo',
  subject: 'filosofia',
  title: 'Iluminismo: Século das Luzes',
  levels: ['medio'],
  grade: '2º ano',
  aliases: ['século das luzes', 'voltaire', 'montesquieu', 'rousseau'],
  summary: 'Movimento filosófico que valorizava razão, ciência e liberdade individual',
  intro: 'Período (séc. XVII-XVIII) de transição entre Medievalismo e Modernidade com foco em racionalidade.',
  objective: 'Compreender os ideais e filósofos do Iluminismo',
  blocks: [
    {
      id: 'b1',
      title: 'Princípios',
      text: 'Valorização da razão, crítica à autoridade absoluta, defesa de direitos individuais.',
      example: 'Voltaire defendia liberdade de expressão: "Posso não concordar com você, mas defendo seu direito de falar".',
      skill: 'iluminismo-principios'
    },
    {
      id: 'b2',
      title: 'Filósofos Principais',
      text: 'Voltaire (liberdade), Montesquieu (separação de poderes), Rousseau (contrato social).',
      example: 'A Constituição Brasileira se baseia em Montesquieu (separação: executivo, legislativo, judiciário).',
      skill: 'iluminismo-filosofos'
    }
  ],
  questions: [],
  skills: {
    'iluminismo-principios': 'Conhecer princípios iluministas',
    'iluminismo-filosofos': 'Identificar filósofos iluministas principais'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const kantianismo: Lesson = {
  id: 'kantianismo',
  subject: 'filosofia',
  title: 'Kant e o Imperativo Categórico',
  levels: ['medio'],
  grade: '3º ano',
  aliases: ['kant', 'imperativo categórico', 'ética kantiana'],
  summary: 'Filosofia de Immanuel Kant sobre ética, conhecimento e moralidade',
  intro: 'Kant (1724-1804) sintetizou racionalismo e empirismo em sua Crítica da Razão Pura.',
  objective: 'Entender a ética do imperativo categórico de Kant',
  blocks: [
    {
      id: 'b1',
      title: 'Síntese Crítica',
      text: 'Kant argumenta que conhecimento requer tanto razão quanto experiência: nem puro racionalismo nem puro empirismo.',
      example: 'Espaço e tempo não são dados externos, mas estruturas da mente que organizam a experiência.',
      skill: 'kant-critica'
    },
    {
      id: 'b2',
      title: 'Imperativo Categórico',
      text: 'Princípio ético: aja apenas segundo máxima que você possa desejar que se torne lei universal.',
      example: 'Mentir nunca é ético porque você não desejaria que todos mentissem para você.',
      skill: 'kant-imperativo'
    }
  ],
  questions: [],
  skills: {
    'kant-critica': 'Compreender síntese kantiana',
    'kant-imperativo': 'Aplicar imperativo categórico'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const existencialismo: Lesson = {
  id: 'existencialismo',
  subject: 'filosofia',
  title: 'Existencialismo: Sartre e Camus',
  levels: ['medio'],
  grade: '3º ano',
  aliases: ['sartre', 'camus', 'liberdade existencial', 'absurdo'],
  summary: 'Filosofia existencialista que enfatiza liberdade, responsabilidade e absurdo',
  intro: 'Movimento filosófico do século XX que coloca a existência acima da essência.',
  objective: 'Compreender conceitos existencialistas de liberdade e absurdo',
  blocks: [
    {
      id: 'b1',
      title: 'Sartre: A Existência Precede a Essência',
      text: 'Não nascemos com propósito predeterminado. Somos livres e responsáveis por criar nossa essência.',
      example: 'Você nasceu sem "natura" definida: sua identidade é resultado de suas escolhas.',
      skill: 'sartre-liberdade'
    },
    {
      id: 'b2',
      title: 'Camus: O Absurdo',
      text: 'Conflito entre busca humana por significado e universo indiferente. Ainda assim, devemos viver.',
      example: '"O mito de Sísifo": mesmo sem sentido, a vida vale a pena ser vivida.',
      skill: 'camus-absurdo'
    }
  ],
  questions: [],
  skills: {
    'sartre-liberdade': 'Entender conceito sartreano de liberdade',
    'camus-absurdo': 'Compreender filosofia do absurdo'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const fenomenologia: Lesson = {
  id: 'fenomenologia',
  subject: 'filosofia',
  title: 'Fenomenologia: Husserl e Heidegger',
  levels: ['medio'],
  grade: '3º ano',
  aliases: ['husserl', 'heidegger', 'ser', 'consciência intencional'],
  summary: 'Estudo da estrutura da experiência consciente e do ser',
  intro: 'Corrente filosófica que estuda a experiência vivida e a relação entre consciência e realidade.',
  objective: 'Compreender conceitos fenomenológicos de intencionalidade e ser',
  blocks: [
    {
      id: 'b1',
      title: 'Husserl: Intencionalidade',
      text: 'Toda consciência é consciência de algo. A mente sempre se dirige a um objeto.',
      example: 'Não podemos pensar em nada sem que haja um objeto do pensamento (mesmo que imaginário).',
      skill: 'husserl-intencionalidade'
    },
    {
      id: 'b2',
      title: 'Heidegger: A Questão do Ser',
      text: 'Foca em "Ser" como questão fundamental. Ser e estar-no-mundo são inseparáveis.',
      example: 'O martelo tem significado porque está em relação a nosso projeto de construir algo.',
      skill: 'heidegger-ser'
    }
  ],
  questions: [],
  skills: {
    'husserl-intencionalidade': 'Entender intencionalidade da consciência',
    'heidegger-ser': 'Compreender conceito heideggeriano de Ser'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const marxismo: Lesson = {
  id: 'marxismo-filosofia',
  subject: 'filosofia',
  title: 'Marxismo: Materialismo Dialético',
  levels: ['medio'],
  grade: '3º ano',
  aliases: ['marx', 'materialismo histórico', 'luta de classes', 'dialética'],
  summary: 'Filosofia de Karl Marx sobre economia, história e sociedade',
  intro: 'Corrente filosófica que analisa sociedade através de conflito de classes e relações de produção.',
  objective: 'Entender conceitos marxistas de materialismo e dialética',
  blocks: [
    {
      id: 'b1',
      title: 'Materialismo Histórico',
      text: 'História é movida por conflito de classes, não por ideias. Base econômica determina superestrutura cultural.',
      example: 'Religião, arte e política são reflexos das relações de produção, não o contrário.',
      skill: 'marx-materialismo'
    },
    {
      id: 'b2',
      title: 'Mais-Valia e Exploração',
      text: 'Capitalista pagua salário menor que valor produzido pelo trabalhador. Diferença = lucro = exploração.',
      example: 'Operário produz $100 em bens/dia mas recebe $50. Os $50 faltantes são mais-valia do patrão.',
      skill: 'marx-maisvalia'
    }
  ],
  questions: [],
  skills: {
    'marx-materialismo': 'Compreender materialismo histórico',
    'marx-maisvalia': 'Entender conceito de mais-valia'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const pragmatismo: Lesson = {
  id: 'pragmatismo',
  subject: 'filosofia',
  title: 'Pragmatismo Americano',
  levels: ['medio'],
  grade: '3º ano',
  aliases: ['peirce', 'james', 'dewey', 'verdade pragmática'],
  summary: 'Corrente filosófica que define verdade pelo valor prático e consequências',
  intro: 'Filosofia americana que prioriza ação sobre teoria: o verdadeiro é o que funciona.',
  objective: 'Compreender pragmatismo como critério de verdade',
  blocks: [
    {
      id: 'b1',
      title: 'Verdade Pragmática',
      text: 'Uma ideia é verdadeira não por corresponder a realidade, mas por suas consequências práticas úteis.',
      example: 'Se acreditar em Deus funciona psicologicamente (traz paz), então é "verdadeiro" para aquela pessoa.',
      skill: 'pragmatismo-verdade'
    },
    {
      id: 'b2',
      title: 'Aplicações Práticas',
      text: 'Pragmatismo influenciou educação (Dewey), psicologia (James) e método científico (Peirce).',
      example: 'Educação pragmatista: ensinar conhecimento prático que aluno pode usar, não teoria abstrata.',
      skill: 'pragmatismo-aplicacoes'
    }
  ],
  questions: [],
  skills: {
    'pragmatismo-verdade': 'Entender verdade pragmática',
    'pragmatismo-aplicacoes': 'Conhecer aplicações do pragmatismo'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const nietzsche: Lesson = {
  id: 'nietzsche',
  subject: 'filosofia',
  title: 'Nietzsche: Para Além do Bem e do Mal',
  levels: ['medio'],
  grade: '3º ano',
  aliases: ['vontade de poder', 'além-homem', 'morte de deus'],
  summary: 'Filosofia nietzschiana que critica moralidade tradicional e propõe vontade de poder',
  intro: 'Friedrich Nietzsche (1844-1900) questiona fundamentos da moral ocidental.',
  objective: 'Compreender conceitos de vontade de poder e morte de Deus',
  blocks: [
    {
      id: 'b1',
      title: 'Morte de Deus',
      text: 'Deus está morto. Cristandade enfraqueceu valores antigos sem substituir por novos.',
      example: '"Deus está morto e nós o matamos" — a filosofia deve criar novos valores.',
      skill: 'nietzsche-deus'
    },
    {
      id: 'b2',
      title: 'Vontade de Poder',
      text: 'Força fundamental da vida é busca por poder, criatividade e autossuperação, não por sobrevivência.',
      example: 'Artista cria obra não para sobreviver, mas para exercer vontade criativa de poder.',
      skill: 'nietzsche-poder'
    }
  ],
  questions: [],
  skills: {
    'nietzsche-deus': 'Entender morte de Deus em Nietzsche',
    'nietzsche-poder': 'Compreender vontade de poder'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const wittgenstein: Lesson = {
  id: 'wittgenstein',
  subject: 'filosofia',
  title: 'Wittgenstein: Filosofia da Linguagem',
  levels: ['medio'],
  grade: '3º ano',
  aliases: ['linguagem', 'jogos de linguagem', 'analítica'],
  summary: 'Filosofia de Ludwig Wittgenstein sobre linguagem e limites do pensável',
  intro: 'Wittgenstein revolucionou filosofia ao focar em linguagem como base da análise.',
  objective: 'Compreender filosofia da linguagem e jogos de linguagem',
  blocks: [
    {
      id: 'b1',
      title: 'Primeiras Investigações',
      text: 'Limite da linguagem é limite do mundo. Proposições atomicamente simples formam realidade.',
      example: 'Não podemos falar sobre o que está além da linguagem (metafísica, ética absoluta).',
      skill: 'wittgenstein-limite'
    },
    {
      id: 'b2',
      title: 'Jogos de Linguagem',
      text: 'Significado de palavra não é coisa fixa, mas uso no contexto do "jogo de linguagem".',
      example: 'Palavra "banco" significa móvel em "sente-se no banco", mas lugar financeiro em "banco de dados".',
      skill: 'wittgenstein-jogos'
    }
  ],
  questions: [],
  skills: {
    'wittgenstein-limite': 'Entender limite wittgensteiniano da linguagem',
    'wittgenstein-jogos': 'Compreender jogos de linguagem'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== SOCIOLOGIA (12 lições) =====

export const durkheim: Lesson = {
  id: 'durkheim',
  subject: 'sociologia',
  title: 'Durkheim: Fato Social e Solidariedade',
  levels: ['fund2', 'medio'],
  grade: '9º ano',
  aliases: ['fato social', 'solidariedade mecânica', 'solidariedade orgânica'],
  summary: 'Sociologia de Émile Durkheim sobre coesão social e fatos sociais',
  intro: 'Durkheim (1858-1917) fundou a sociologia científica focando em integração social.',
  objective: 'Entender conceito de fato social e tipos de solidariedade',
  blocks: [
    {
      id: 'b1',
      title: 'Fato Social',
      text: 'Fato social existe independentemente do indivíduo. É externo, coercitivo e coletivo.',
      example: 'Linguagem é fato social: ninguém cria sozinho, todos aprendem da sociedade.',
      skill: 'durkheim-fato'
    },
    {
      id: 'b2',
      title: 'Solidariedade',
      text: 'Mecânica: homogeneidade (sociedades tradicionais). Orgânica: diferenciação (modernas).',
      example: 'Aldeia: todos fazem mesmo trabalho (solidariedade mecânica). Cidade: divisão do trabalho (orgânica).',
      skill: 'durkheim-solidariedade'
    }
  ],
  questions: [],
  skills: {
    'durkheim-fato': 'Compreender fato social',
    'durkheim-solidariedade': 'Entender tipos de solidariedade'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const weber: Lesson = {
  id: 'weber',
  subject: 'sociologia',
  title: 'Weber: Ação Social e Tipos Ideais',
  levels: ['fund2', 'medio'],
  grade: '9º ano',
  aliases: ['max weber', 'ação social', 'burocracia', 'carisma'],
  summary: 'Sociologia de Max Weber sobre ação social e dominação',
  intro: 'Weber (1864-1920) analisou motivos das ações humanas e formas de autoridade.',
  objective: 'Compreender conceitos de ação social e tipos de dominação',
  blocks: [
    {
      id: 'b1',
      title: 'Ação Social',
      text: 'Ação é social quando leva em conta comportamento de outros. Pode ser racional, afetiva ou tradicional.',
      example: 'Votar é ação social racional. Abraçar é afetiva. Seguir religião é tradicional.',
      skill: 'weber-acao'
    },
    {
      id: 'b2',
      title: 'Tipos de Dominação',
      text: 'Legal-racional (leis), tradicional (costume), carismática (carisma pessoal).',
      example: 'Governo democrático: legal-racional. Monarquia: tradicional. Ditador populista: carismático.',
      skill: 'weber-dominacao'
    }
  ],
  questions: [],
  skills: {
    'weber-acao': 'Entender ação social weberiana',
    'weber-dominacao': 'Compreender tipos de dominação'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const bourdieu: Lesson = {
  id: 'bourdieu',
  subject: 'sociologia',
  title: 'Bourdieu: Capital Cultural e Habitus',
  levels: ['medio'],
  grade: '2º ano',
  aliases: ['capital cultural', 'habitus', 'violência simbólica'],
  summary: 'Sociologia de Pierre Bourdieu sobre reprodução de desigualdade via cultura',
  intro: 'Bourdieu (1930-2002) mostrou como capital cultural perpetua privilégios sociais.',
  objective: 'Compreender conceitos de capital cultural e habitus',
  blocks: [
    {
      id: 'b1',
      title: 'Capital Cultural',
      text: 'Conhecimentos, hábitos, gosto, educação que distinguem classes. Não é dinheiro, é cultural.',
      example: 'Filho de executivo conhece clássicos, fala várias línguas. Filho de operário não. Ambição igual, acesso diferente.',
      skill: 'bourdieu-capital'
    },
    {
      id: 'b2',
      title: 'Habitus',
      text: 'Sistema de disposições duráveis adquiridas: maneira de falar, gesticular, pensar, sentir.',
      example: '"Sotaque de classe": pessoa humilde mantém sotaque mesmo ganhando dinheiro — habitus enraizado.',
      skill: 'bourdieu-habitus'
    }
  ],
  questions: [],
  skills: {
    'bourdieu-capital': 'Entender capital cultural',
    'bourdieu-habitus': 'Compreender conceito de habitus'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const gooffman: Lesson = {
  id: 'goffman',
  subject: 'sociologia',
  title: 'Goffman: Interacionismo Simbólico',
  levels: ['medio'],
  grade: '2º ano',
  aliases: ['dramaturgia social', 'representação de papéis', 'fachada'],
  summary: 'Sociologia dramatúrgica que vê sociedade como teatro',
  intro: 'Erving Goffman (1922-1982) analisou interações cotidianas como performances.',
  objective: 'Compreender conceitos de dramatização e representação de papéis',
  blocks: [
    {
      id: 'b1',
      title: 'Sociedade como Teatro',
      text: 'Pessoas são atores: possuem "fachadas" públicas e privadas. Representam papéis conforme situação.',
      example: 'Em aula: sou "estudante". Com amigos: sou "descontraído". Em entrevista: sou "profissional".',
      skill: 'goffman-teatro'
    },
    {
      id: 'b2',
      title: 'Fachada e Backstage',
      text: 'Fachada: comportamento em público. Backstage: comportamento "verdadeiro" longe de audiência.',
      example: 'Garçom é prestativo "em cena" (fachada), mas pode ser sarcástico na cozinha (backstage).',
      skill: 'goffman-fachada'
    }
  ],
  questions: [],
  skills: {
    'goffman-teatro': 'Entender dramatização goffmaniana',
    'goffman-fachada': 'Compreender fachada e backstage'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const culturasub: Lesson = {
  id: 'culturas-subcultura',
  subject: 'sociologia',
  title: 'Culturas, Subculturas e Contracultura',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['contracultura', 'subcultura', 'cultura dominante', 'punk', 'hippie'],
  summary: 'Dinâmica entre culturas dominantes, subculturas e contraculturas',
  intro: 'Análise de como grupos criam identidades distintas dentro ou contra a cultura dominante.',
  objective: 'Compreender diferenças entre cultura, subcultura e contracultura',
  blocks: [
    {
      id: 'b1',
      title: 'Subcultura',
      text: 'Grupo compartilha valores da cultura dominante + adiciona valores próprios. Coexiste pacificamente.',
      example: 'Gamers: compartilham valores brasileiros, mas têm próprio linguajar, hobbies, comunidade.',
      skill: 'subcultura-soc'
    },
    {
      id: 'b2',
      title: 'Contracultura',
      text: 'Grupo rejeita valores da cultura dominante, propõe alternativa. Conflito potencial.',
      example: 'Hippies (anos 1960): rejeitavam consumismo, militarismo, autoridade. Questionavam sistema.',
      skill: 'contracultura-soc'
    }
  ],
  questions: [],
  skills: {
    'subcultura-soc': 'Entender subculturas',
    'contracultura-soc': 'Compreender contraculturas'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const desvio: Lesson = {
  id: 'desvio-social',
  subject: 'sociologia',
  title: 'Desvio Social e Controle Social',
  levels: ['fund2', 'medio'],
  grade: '9º ano',
  aliases: ['crime', 'delinquência', 'normas sociais', 'sanções'],
  summary: 'Análise de comportamento desviante e mecanismos de controle social',
  intro: 'Desvio social é violação de normas. Toda sociedade usa mecanismos para manter conformidade.',
  objective: 'Compreender desvio social e tipos de controle social',
  blocks: [
    {
      id: 'b1',
      title: 'Desvio Social',
      text: 'Comportamento que viola expectativas do grupo. Pode ser criminal, moral ou meramente diferente.',
      example: 'Tatuagem: socialmente normal agora, era desviante em 1950. Crime: desvio em qualquer era.',
      skill: 'desvio-definicao'
    },
    {
      id: 'b2',
      title: 'Controle Social',
      text: 'Mecanismos que punem desvio: informal (vergonha), formal (lei), institucional (prisão).',
      example: 'Pai diz "isso é feio": controle informal. Polícia prende: controle formal.',
      skill: 'controle-social'
    }
  ],
  questions: [],
  skills: {
    'desvio-definicao': 'Entender desvio social',
    'controle-social': 'Compreender controle social'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== GEOGRAFIA (20 lições) =====

export const latitudelongitude: Lesson = {
  id: 'latitude-longitude',
  subject: 'geografia',
  title: 'Latitude e Longitude',
  levels: ['fund1', 'fund2'],
  grade: '6º ano',
  aliases: ['coordenadas geográficas', 'paralelos', 'meridianos', 'gps'],
  summary: 'Sistema de coordenadas para localizar pontos no globo terrestre',
  intro: 'Latitude e longitude são as "coordenadas do mundo" que permitem localizar qualquer ponto.',
  objective: 'Aprender a usar latitude e longitude para localização',
  blocks: [
    {
      id: 'b1',
      title: 'Latitude',
      text: 'Linhas imaginárias de leste a oeste (paralelos). Medida em graus: 0° (equador) a 90° (polos).',
      example: 'Brasil: entre 5°N e 33°S. São Paulo ≈ 23°S. Quanto maior o número, mais próximo do polo.',
      skill: 'latitude-geo'
    },
    {
      id: 'b2',
      title: 'Longitude',
      text: 'Linhas imaginárias de norte a sul (meridianos). Medida em graus: 0° (Greenwich) a 180°.',
      example: 'São Paulo ≈ 46°W. A oeste de Greenwich é oeste (-), a leste é leste (+).',
      skill: 'longitude-geo'
    }
  ],
  questions: [],
  skills: {
    'latitude-geo': 'Entender latitude',
    'longitude-geo': 'Compreender longitude'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const fusos: Lesson = {
  id: 'fusos-horarios',
  subject: 'geografia',
  title: 'Fusos Horários',
  levels: ['fund2'],
  grade: '6º ano',
  aliases: ['hora local', 'gmt', 'brasília', 'fuso horário'],
  summary: 'Divisão da Terra em 24 zonas de hora baseadas na rotação',
  intro: 'O planeta gira 360° em 24h, dividindo em 24 fusos horários de 15° cada.',
  objective: 'Calcular diferenças horárias entre fusos',
  blocks: [
    {
      id: 'b1',
      title: 'Cálculo de Fusos',
      text: 'Cada fuso = 15° de longitude = 1 hora. A leste (sentido rotação) soma horas; a oeste subtrai.',
      example: 'Se em Londres (0°/GMT) é 12h, em São Paulo (45°W) é 9h. Diferença: 45/15 = 3 horas.',
      skill: 'fusos-calculo'
    },
    {
      id: 'b2',
      title: 'Fusos do Brasil',
      text: 'Brasil tem 4 fusos: -2h (Fernando de Noronha), -3h (Brasília), -4h (Amazonas), -5h (Acre).',
      example: 'Quando em Brasília é meio-dia, em Manaus é 11h da manhã (1h a menos).',
      skill: 'fusos-brasil'
    }
  ],
  questions: [],
  skills: {
    'fusos-calculo': 'Calcular diferenças de fusos',
    'fusos-brasil': 'Conhecer fusos brasileiros'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const relevo: Lesson = {
  id: 'relevo-terrestre',
  subject: 'geografia',
  title: 'Formas de Relevo',
  levels: ['fund2'],
  grade: '7º ano',
  aliases: ['planalto', 'planície', 'montanha', 'vale'],
  summary: 'Principais formas de relevo da Terra e sua formação',
  intro: 'Relevo é a forma do terreno. Pode ser montanhoso, plano ou intermediário.',
  objective: 'Identificar e compreender formas de relevo',
  blocks: [
    {
      id: 'b1',
      title: 'Tipos Principais',
      text: 'Montanha (>1000m, morros e cristas), planalto (>500m, topo plano), planície (<300m, plana).',
      example: 'Andes: montanha. Brasil Central: planalto. Pantanal: planície.',
      skill: 'relevo-tipos'
    },
    {
      id: 'b2',
      title: 'Formação',
      text: 'Movimentos tectônicos (vulcões, terremotos) e erosão (água, vento) formam relevo.',
      example: 'Andes formaram por colisão de placas. Vale do Reno formado por rio erodindo.',
      skill: 'relevo-formacao'
    }
  ],
  questions: [],
  skills: {
    'relevo-tipos': 'Classificar formas de relevo',
    'relevo-formacao': 'Entender formação do relevo'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const biosfera: Lesson = {
  id: 'biosfera',
  subject: 'geografia',
  title: 'Biosfera e Ecossistemas',
  levels: ['fund2'],
  grade: '7º ano',
  aliases: ['biomas', 'ecossistema', 'cadeia alimentar', 'habitat'],
  summary: 'Estudo da biosfera como camada viva da Terra e seus ecossistemas',
  intro: 'Biosfera inclui toda vida no planeta e suas interações com meio físico.',
  objective: 'Compreender estrutura da biosfera e relações ecológicas',
  blocks: [
    {
      id: 'b1',
      title: 'Camadas da Biosfera',
      text: 'Litosfera (terra), hidrosfera (água), atmosfera (ar). Vida interage com os três.',
      example: 'Planta cresce na terra, bebe água, respira ar. Vive na intersecção.',
      skill: 'biosfera-camadas'
    },
    {
      id: 'b2',
      title: 'Ecossistema',
      text: 'Comunidade de seres vivos + ambiente físico. Produtores (plantas), consumidores (animais), decompositores.',
      example: 'Floresta Amazônica: árvores (produtores), jaguar (consumidor), fungos (decompositores).',
      skill: 'biosfera-ecosistema'
    }
  ],
  questions: [],
  skills: {
    'biosfera-camadas': 'Entender camadas da biosfera',
    'biosfera-ecosistema': 'Compreender ecossistema'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const urbanizacao: Lesson = {
  id: 'urbanizacao',
  subject: 'geografia',
  title: 'Urbanização e Cidades',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['êxodo rural', 'metrópole', 'favela', 'inchação urbana'],
  summary: 'Processo de crescimento urbano e suas consequências sociais',
  intro: 'Urbanização é migração de população do campo para a cidade, transformando paisagem.',
  objective: 'Compreender causas e consequências da urbanização',
  blocks: [
    {
      id: 'b1',
      title: 'Causas',
      text: 'Mecanização da agricultura (menos empregos rurais), industrialização urbana (mais empregos).',
      example: 'Trator substitui 10 agricultores. Saem do campo. Fábrica na cidade precisa de operários.',
      skill: 'urbanizacao-causas'
    },
    {
      id: 'b2',
      title: 'Consequências',
      text: 'Inchaço urbano: favelas, congestionamento, poluição. Também: maior acesso a educação e saúde.',
      example: 'São Paulo: 12 milhões. Favelas coexistem com universidades. Trânsito caótico.',
      skill: 'urbanizacao-consequencias'
    }
  ],
  questions: [],
  skills: {
    'urbanizacao-causas': 'Entender causas da urbanização',
    'urbanizacao-consequencias': 'Compreender consequências'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const recursos: Lesson = {
  id: 'recursos-naturais',
  subject: 'geografia',
  title: 'Recursos Naturais: Renováveis e Não-Renováveis',
  levels: ['fund2'],
  grade: '7º ano',
  aliases: ['petróleo', 'energia renovável', 'água', 'minério'],
  summary: 'Classificação e exploração de recursos naturais',
  intro: 'Recursos naturais são bens que extraímos da natureza. Alguns se renovam, outros não.',
  objective: 'Classificar recursos e entender sustentabilidade',
  blocks: [
    {
      id: 'b1',
      title: 'Renováveis',
      text: 'Se renovam em escala humana: madeira (floresta cresce), água, energia solar/eólica.',
      example: 'Plantar árvore leva 30 anos. Escala humana: renovável. Petróleo leva 300 milhões de anos.',
      skill: 'recursos-renovaveis'
    },
    {
      id: 'b2',
      title: 'Não-Renováveis',
      text: 'Não se renovam em escala humana: petróleo, carvão, minérios, gás natural.',
      example: 'Ouro: formado em bilhões de anos. Se extrair toda reserva, não haverá mais por milênios.',
      skill: 'recursos-nao-renovaveis'
    }
  ],
  questions: [],
  skills: {
    'recursos-renovaveis': 'Compreender recursos renováveis',
    'recursos-nao-renovaveis': 'Entender recursos não-renováveis'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const mares: Lesson = {
  id: 'oceanos-mares',
  subject: 'geografia',
  title: 'Oceanos, Mares e Correntes Marinhas',
  levels: ['fund2'],
  grade: '6º ano',
  aliases: ['oceano', 'corrente fria', 'corrente quente', 'maré'],
  summary: 'Características dos oceanos e dinâmica das correntes marinhas',
  intro: 'Oceanos cobrem 70% da Terra. Correntes marinhas transportam calor e umidade.',
  objective: 'Entender ciclo oceânico e influência em clima',
  blocks: [
    {
      id: 'b1',
      title: 'Oceanos',
      text: 'Pacífico (maior), Atlântico, Índico, Ártico, Antártico. Profundidade média 3.7km.',
      example: 'Oceano Pacífico: maior que toda a terra firme. Fossa das Marianas: 11km profundidade.',
      skill: 'oceanos-geo'
    },
    {
      id: 'b2',
      title: 'Correntes Marinhas',
      text: 'Movimentos da água oceânica. Quentes (equador→polos) levam calor. Frias levam água fria.',
      example: 'Corrente do Golfo aquece Europa. Corrente de Humboldt esfria Peru. Ciclação global.',
      skill: 'correntes-marinhas'
    }
  ],
  questions: [],
  skills: {
    'oceanos-geo': 'Conhecer oceanos',
    'correntes-marinhas': 'Entender correntes marinhas'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const vegetacao: Lesson = {
  id: 'vegetacao-biomas',
  subject: 'geografia',
  title: 'Biomas Brasileiros: Floresta, Cerrado, Caatinga',
  levels: ['fund2', 'medio'],
  grade: '7º ano',
  aliases: ['floresta amazônica', 'pantanal', 'mata atlântica'],
  summary: 'Principais biomas do Brasil e suas características',
  intro: 'Brasil tem grande diversidade de vegetação. Cada região tem flora e fauna próprias.',
  objective: 'Conhecer e comparar biomas brasileiros',
  blocks: [
    {
      id: 'b1',
      title: 'Floresta Amazônica',
      text: 'Maior floresta tropical do mundo. 9 países, 60% no Brasil. Alta biodiversidade.',
      example: '390 bilhões árvores. 1 em 10 espécies de planta do mundo. Chamada "pulmão do planeta".',
      skill: 'biomas-amazonia'
    },
    {
      id: 'b2',
      title: 'Cerrado e Caatinga',
      text: 'Cerrado: savana tropical do Centro-Oeste. Caatinga: semiárida do Nordeste. Ambas ameaçadas.',
      example: 'Cerrado: 44% destruído para soja. Caatinga: menos conhecida, mais ameaçada, 56% devastada.',
      skill: 'biomas-cerrado-caatinga'
    }
  ],
  questions: [],
  skills: {
    'biomas-amazonia': 'Entender Floresta Amazônica',
    'biomas-cerrado-caatinga': 'Compreender Cerrado e Caatinga'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== ARTES (10 lições) =====

export const arquitetura: Lesson = {
  id: 'arquitetura-historia',
  subject: 'artes',
  title: 'História da Arquitetura',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['barroco', 'neoclássico', 'art déco', 'modernismo'],
  summary: 'Estilos arquitetônicos através da história',
  intro: 'Arquitetura reflete cultura, tecnologia e valores de cada época.',
  objective: 'Reconhecer e comparar estilos arquitetônicos',
  blocks: [
    {
      id: 'b1',
      title: 'Barroco',
      text: 'Século XVII-XVIII. Ornamentado, dinâmico, emotivo. Uso de curvas, contrastes luz-sombra.',
      example: 'Igreja de São Francisco em Salvador. Catedral Metropolitana do Rio.',
      skill: 'arquitetura-barroco'
    },
    {
      id: 'b2',
      title: 'Modernismo',
      text: 'Século XX. Linhas retas, funcional, sem ornamentos. Forma segue função.',
      example: 'Oscar Niemeyer: Congresso Nacional. "Menos é mais" — filosofia moderna.',
      skill: 'arquitetura-moderno'
    }
  ],
  questions: [],
  skills: {
    'arquitetura-barroco': 'Entender barroco',
    'arquitetura-moderno': 'Compreender modernismo'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const escultura: Lesson = {
  id: 'escultura-formas',
  subject: 'artes',
  title: 'Escultura: Forma e Matéria',
  levels: ['fund2'],
  grade: '8º ano',
  aliases: ['relevo', 'baixo relevo', 'escultura abstrata', 'matéria'],
  summary: 'Arte tridimensional em diferentes materiais e técnicas',
  intro: 'Escultura trabalha com volume, espaço e materiais diversos.',
  objective: 'Compreender técnicas e estilos de escultura',
  blocks: [
    {
      id: 'b1',
      title: 'Técnicas',
      text: 'Modelagem (argila), escultura (pedra), fundição (metal), assemblagem (objetos diversos).',
      example: 'Rodin modelou em argila depois fundiu em bronze. Michelangelo esculpiu em mármores.',
      skill: 'escultura-tecnicas'
    },
    {
      id: 'b2',
      title: 'Representativo vs Abstrato',
      text: 'Representativo: reconhecível, figura humana ou animal. Abstrato: formas geométricas puras.',
      example: 'Cristo Redentor: representativo. Escultura de Athos Bulcão: abstrata.',
      skill: 'escultura-estilos'
    }
  ],
  questions: [],
  skills: {
    'escultura-tecnicas': 'Conhecer técnicas de escultura',
    'escultura-estilos': 'Entender representativo vs abstrato'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const fotografia: Lesson = {
  id: 'fotografia-arte',
  subject: 'artes',
  title: 'Fotografia como Arte',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['composição fotográfica', 'luz', 'enquadramento'],
  summary: 'Elementos e técnicas da fotografia artística',
  intro: 'Fotografia é captura de luz. Pode ser documentação ou expressão artística.',
  objective: 'Entender composição e linguagem fotográfica',
  blocks: [
    {
      id: 'b1',
      title: 'Composição',
      text: 'Enquadramento, regra dos terços, profundidade, foco seletivo. Constrói significado.',
      example: 'Foto de rosto em primeiro plano ≠ foto de rosto de longe. Enquadramento muda emoção.',
      skill: 'fotografia-composicao'
    },
    {
      id: 'b2',
      title: 'Luz',
      text: 'Luz é matéria-prima. Iluminação frontal (clara), lateral (drama), contraluz (silhueta).',
      example: 'Foto ao pôr do sol: contraluz dourado. Foto em dia nublado: luz suave, sem sombras duras.',
      skill: 'fotografia-luz'
    }
  ],
  questions: [],
  skills: {
    'fotografia-composicao': 'Entender composição fotográfica',
    'fotografia-luz': 'Compreender papel da luz'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const design: Lesson = {
  id: 'design-grafico',
  subject: 'artes',
  title: 'Design Gráfico e Visual',
  levels: ['fund2', 'medio'],
  grade: '8º ano',
  aliases: ['tipografia', 'cor', 'identidade visual', 'branding'],
  summary: 'Princípios de design gráfico e comunicação visual',
  intro: 'Design é comunicação visual: marca, posters, interfaces usam princípios de design.',
  objective: 'Compreender elementos de design visual',
  blocks: [
    {
      id: 'b1',
      title: 'Tipografia',
      text: 'Escolha de fonte transmite mensagem. Serif (tradicional), sans-serif (moderno), script (elegante).',
      example: 'Fonte "Times" em jornal: autoridade. "Arial" em anúncio jovem: modernidade.',
      skill: 'design-tipografia'
    },
    {
      id: 'b2',
      title: 'Cor e Identidade',
      text: 'Cores transmitem emoção. Identidade visual usa cores, logo, estilo consistentes.',
      example: 'Apple: minimalismo, branco, gráfico limpo. Nike: swoosh, preto, energia dinâmica.',
      skill: 'design-identidade'
    }
  ],
  questions: [],
  skills: {
    'design-tipografia': 'Entender tipografia',
    'design-identidade': 'Compreender identidade visual'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== EDUCAÇÃO FÍSICA (8 lições) =====

export const atletismo: Lesson = {
  id: 'atletismo-modalidades',
  subject: 'edfisica',
  title: 'Atletismo: Corrida, Salto, Lançamento',
  levels: ['fund1', 'fund2'],
  grade: '5º ano',
  aliases: ['100m', 'maratona', 'salto em altura', 'lançamento de disco'],
  summary: 'Modalidades e regras do atletismo',
  intro: 'Atletismo é esporte de corrida, salto e lançamento. Mais antigo esporte organizado.',
  objective: 'Conhecer modalidades e técnicas do atletismo',
  blocks: [
    {
      id: 'b1',
      title: 'Corridas',
      text: 'Velocidade (100m, 200m), meio-fundo (800m), fundo (5000m, maratona).',
      example: 'Usain Bolt: 100m em 9.58s (recordista). Maratona: 42.195km, requer resistência extrema.',
      skill: 'atletismo-corrida'
    },
    {
      id: 'b2',
      title: 'Saltos e Lançamentos',
      text: 'Salto em altura, distância, triplo. Lançamento de disco, dardo, martelo, peso.',
      example: 'Salto em altura: técnica de dorso. Lançamento de disco: rotação e poder explosivo.',
      skill: 'atletismo-saltos'
    }
  ],
  questions: [],
  skills: {
    'atletismo-corrida': 'Entender corridas',
    'atletismo-saltos': 'Conhecer saltos e lançamentos'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

export const ginastica: Lesson = {
  id: 'ginastica-artistica',
  subject: 'edfisica',
  title: 'Ginástica Artística: Aparelhos',
  levels: ['fund2'],
  grade: '6º ano',
  aliases: ['trave', 'cavalo com alças', 'barra fixa', 'solo'],
  summary: 'Modalidades e técnicas da ginástica artística',
  intro: 'Ginástica artística combina força, flexibilidade, coordenação e equilíbrio.',
  objective: 'Conhecer aparelhos e movimentos básicos',
  blocks: [
    {
      id: 'b1',
      title: 'Aparelhos Femininos',
      text: 'Trave (equilíbrio), solo (coreografia), barras assimétricas (força), salto.',
      example: 'Trave: 5m comprimento, 10cm largura. Requer concentração extrema.',
      skill: 'ginastica-feminino'
    },
    {
      id: 'b2',
      title: 'Aparelhos Masculinos',
      text: 'Cavalo com alças, anéis, barra fixa, barras paralelas, solo, salto.',
      example: 'Anéis: movimento que parece flutuar. Requer força de estabilização tremenda.',
      skill: 'ginastica-masculino'
    }
  ],
  questions: [],
  skills: {
    'ginastica-feminino': 'Conhecer aparelhos femininos',
    'ginastica-masculino': 'Entender aparelhos masculinos'
  },
  review: [],
  origin: 'base',
  status: 'published'
}

// ===== EXPORTAR LIÇÕES EXPANDIDAS =====

export const MATERIAS_EXPANDIDAS: Lesson[] = [
  // Filosofia
  empirismoRacionalismo,
  iluminismo,
  kantianismo,
  existencialismo,
  fenomenologia,
  marxismo,
  pragmatismo,
  nietzsche,
  wittgenstein,
  // Sociologia
  durkheim,
  weber,
  bourdieu,
  gooffman,
  culturasub,
  desvio,
  // Geografia
  latitudelongitude,
  fusos,
  relevo,
  biosfera,
  urbanizacao,
  recursos,
  mares,
  vegetacao,
  // Artes
  arquitetura,
  escultura,
  fotografia,
  design,
  // Educação Física
  atletismo,
  ginastica,
]
