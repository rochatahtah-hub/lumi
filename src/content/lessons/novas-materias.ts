import type { Lesson } from '../../types'

const AUTORAL = { title: 'Conteúdo autoral LUMI', kind: 'autoral' } as const

// ========== HISTÓRIA ==========

export const imperioRomano: Lesson = {
  id: 'his-imperio-romano',
  subject: 'historia',
  title: 'Império Romano',
  levels: ['fund2', 'medio'],
  grade: '7º ano e 1ª série',
  aliases: ['imperio romano', 'roma antiga', 'cesar', 'augustus', 'republica romana', 'queda roma'],
  summary: 'Conheça a história de Roma: da República ao Império e sua queda.',
  intro: 'Roma foi a civilização mais poderosa da antiguidade. Vamos entender como se formou, cresceu e caiu.',
  skills: {
    origem: 'Origem e República',
    imperio: 'O Império',
    sociedade: 'Sociedade Romana',
    queda: 'Queda do Império'
  },
  blocks: [
    {
      id: 'b1', skill: 'origem', title: 'Origem e República Romana',
      text: 'Roma começou como uma pequena aldeia no Lácio (Itália central) por volta de 753 a.C. Passou por monarquia (reis) e depois virou República (509 a.C.), governada por cônsules eleitos. A República conquistou toda a Itália e o Mediterrâneo.',
      example: 'Durante a República, havia Senado (nobres) e povo. Os cônsules eram como presidentes, mas havia dois ao mesmo tempo para evitar o poder absoluto.',
      variants: {
        simples: 'Roma começou pequena e virou poderosa. Primeiro tinha reis, depois elegiam líderes (cônsules). Conquistou tudo que via pela frente.',
        exemplo: 'Hannibal, general de Cartago, quase derrota Roma nas Guerras Púnicas, mas os romanos venceram e tomaram o controle do Mediterrâneo.',
        outra: 'República = rei foi embora, povo e nobres compartem poder. Senado faz leis, cônsules executam, povo vota.',
        detalhado: 'A República tinha sistema de freios e contrapesos: cônsules, Senado (300 patrícios), Assembleia Popular. Magistrados (questores, pretores, censores) distribuíam tarefas. Durou quase 500 anos (509–27 a.C.).',
      },
    },
    {
      id: 'b2', skill: 'imperio', title: 'O Império (Augusto até a queda)',
      text: 'Em 27 a.C., Augusto (Otávio) encerrou a República e criou o Império. Ele se tornou o primeiro imperador, mantendo aparência de democracia. O Império durou até 476 d.C. no Ocidente (1453 no Oriente, em Constantinopla).',
      example: 'Augusto é famoso pela frase "encontrei Roma de tijolos e a deixei de mármore", referindo-se aos prédios que mandou construir.',
      variants: {
        simples: 'Augusto virou imperador. Disse que era só um líder, mas mandava em tudo. O Império teve paz (Pax Romana) por muito tempo.',
        exemplo: 'Nero, Trajano, Adriano, Marcos Aurélio — cada imperador deixava sua marca em Roma. Alguns eram bons, outros péssimos (Nero queimou Roma e matou cristãos).',
        outra: 'Império = um líder (imperador) manda sozinho, mas finge que o Senado ainda existe. Povo ganha pão e circo (shows e comida) para aceitar.',
        detalhado: 'Apogeu: II d.C. (Trajano). Crises: III d.C. (30 imperadores em 50 anos). Reforma de Diocleciano (284 d.C.): divide Império em 4 partes. Constantino (312 d.C.): legaliza cristianismo. Teodósio (395 d.C.): divide definitivamente em Ocidente e Oriente.',
      },
    },
    {
      id: 'b3', skill: 'sociedade', title: 'Sociedade Romana',
      text: 'A sociedade era dividida em: Patrícios (nobres), Plebeus (povo comum), Escravos. Havia também clientes (dependentes de patrícios). Roma tinha cidades, estradas, aquedutos, anfiteatros. Religio era importante — Deuses romanos vinha da Grécia com outros nomes.',
      example: 'Gladiadores lutavam até a morte no Coliseu de Roma. A multidão aplaudia o vencedor ou pedia morte do vencido.',
      variants: {
        simples: 'Ricos mandavam, pobres obedeciam, escravos trabalhavam sem parar. Roma tinha muitos prédios bonitos, ruas e um jeito próprio de viver.',
        exemplo: 'Mulher romana tinha pouco direito, sempre sob tutela de homem (pai, marido, filho). Mas algumas tiveram influência política.',
        outra: 'Escravidão era normal. Vinha de guerras (prisioneiros) ou dívida. Havia milhões de escravos — nas minas, nas casas, na agricultura.',
        detalhado: 'Hierarquia: Imperador → Senadores (ricos) → Cavaleiros (comerciantes, administradores) → Plebeus (trabalhadores urbanos, agricultores) → Escravos. Família era importante (pátria potestás = poder do pai absoluto).',
      },
    },
    {
      id: 'b4', skill: 'queda', title: 'Queda do Império Romano Ocidental',
      text: 'Século V: invasões bárbaras (visigodos, vândalos, ostrogodos, francos). Roma enfraquecida, exército disperso, crise econômica. Em 410, Visigodos saquearam Roma. Em 476, Rômulo Augústulo foi deposto — fim do Império Ocidental. Oriente (Bizâncio) continuou até 1453.',
      example: 'Alarico liderou os visigodos. Roma não era invencível — caiu por corrupção interna e pressão externa.',
      variants: {
        simples: 'Roma enfraqueceu, bárbaros invadiram, império desabou. Fim da Antiguidade, começo da Idade Média.',
        exemplo: 'Não foi uma queda repentina: levou décadas. Crise militar, política e econômica pioraram juntas.',
        outra: 'Bárbaros não eram selvagens: muitos queriam viver como romanos. Problema era o caos administrativo.',
        detalhado: 'Causas: (1) Pressão dos bárbaros do norte (Germânicos), (2) Crise econômica (inflação, impostos altos), (3) Exército enfraquecido (mercenários bárbaros), (4) Cristianismo reduziu lealdade ao Estado pago, (5) Divisão do Império em 395 d.C. fragmentou força. Rômulo Augústulo era adolescente quando perdeu o trono.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'origem', prompt: 'Que evento marca o fim da Monarquia Romana e o início da República?', options: ['Morte de César', 'Expulsão do último rei (509 a.C.)', 'Nascimento de Augusto', 'Invasão dos bárbaros'], answer: 1, hints: ['Foi em 509 a.C.', 'Um rei foi expulso', 'Povo se revoltou contra o poder absoluto'], explanation: 'A República começou com a expulsão do último rei, por volta de 509 a.C.' },
    { id: 'q2', type: 'mc', difficulty: 1, skill: 'imperio', prompt: 'Quem foi o primeiro imperador romano?', options: ['Julio César', 'Augusto (Otávio)', 'Nero', 'Trajano'], answer: 1, hints: ['Ele também é chamado de Otávio', 'Seu reinado começou em 27 a.C.', 'Construiu muitos edifícios em Roma'], explanation: 'Augusto foi o primeiro imperador romano.' },
    { id: 'q3', type: 'tf', difficulty: 1, skill: 'queda', prompt: 'O Império Romano Ocidental caiu em 476 d.C.', answer: true, hints: ['Rômulo Augústulo foi deposto', 'Visigodos invadiram Roma', 'Fim da Antiguidade'], explanation: 'Verdadeiro: 476 d.C. marca o fim do Império Romano Ocidental.' },
  ],
  review: ['República (509–27 a.C.): cônsules, Senado, povo', 'Império (27 a.C.–476 d.C.): Augusto, Pax Romana', 'Sociedade: Patrícios, Plebeus, Escravos', 'Queda (410–476): invasões bárbaras, enfraquecimento'],
  sources: [{ title: 'BNCC — História', url: 'http://basenacionalcomum.mec.gov.br/', kind: 'curriculo' }, AUTORAL],
}

// ========== GEOGRAFIA ==========

export const biomas: Lesson = {
  id: 'geo-biomas',
  subject: 'geografia',
  title: 'Biomas do Brasil',
  levels: ['fund2', 'medio'],
  grade: '6º e 7º ano',
  aliases: ['biomas brasil', 'floresta amazonica', 'cerrado', 'pantanal', 'caatinga', 'mata atlantica', 'ecosistemas'],
  summary: 'Conheça os 6 principais biomas brasileiros: características, flora, fauna e importância.',
  intro: 'O Brasil tem vários climas e ambientes diferentes. Cada um é um bioma — um ecossistema único.',
  skills: {
    amazonia: 'Amazônia',
    cerrado: 'Cerrado',
    pantanal: 'Pantanal',
    caatinga: 'Caatinga',
    mataAtlantica: 'Mata Atlântica',
    marinho: 'Bioma Marinho'
  },
  blocks: [
    {
      id: 'b1', skill: 'amazonia', title: 'Amazônia — A Floresta Tropical',
      text: 'A Amazônia é a maior floresta tropical do mundo, cobrindo 5,5 milhões km² (60% no Brasil). Clima quente e úmido o ano todo. Tem mais de 10% de todas as espécies de seres vivos do planeta. Rio Amazonas é o maior em volume de água.',
      example: 'A Amazônia produz 20% do oxigênio do planeta. Jacaré, onça, anaconda, arara e boto-rosa vivem lá.',
      variants: {
        simples: 'Floresta gigante, quente e cheia de água. Muitos animais e plantas. Rio Amazonas passa pelo meio.',
        exemplo: 'Indígenas vivem na Amazônia há milhares de anos, conhecem as plantas e animais melhor que ninguém.',
        outra: 'Desmatamento ameaça a Amazônia. Árvores são cortadas para criar pastos ou plantar soja.',
        detalhado: 'Estratificação: dossel (árvores altas, 30m+), emergentes (acima de tudo), sub-bosque (sombra), chão (húmus). Ciclo de água: evapotranspiração gera chuvas. Fauna: 430 espécies de mamíferos, 1.300 aves, 3.000 peixes.',
      },
    },
    {
      id: 'b2', skill: 'cerrado', title: 'Cerrado — A Savana Brasileira',
      text: 'Cerrado cobre 2 milhões km² (23% do Brasil). Clima quente e seco, com duas estações: seca (4–5 meses) e chuva. Vegetação: arbustos e árvores esparsas com raízes profundas. Solos são ácidos e pobres em nutrientes.',
      example: 'Cobrimos Goiás, Mato Grosso, Tocantins, Bahia, Minas Gerais, São Paulo (norte). Tem fruta do cerrado como buriti, pequi, murici.',
      variants: {
        simples: 'Savana seca com árvores espalhadas. Quente, com seca e chuva. Raízes profundas para beber água subterrânea.',
        exemplo: 'Queimadas naturais são importantes — matam parasitas e permitem novas plantas nascer. Indígenas e quilombolas vivem lá.',
        outra: 'Agricultura: soja, milho, algodão. Pastagem para gado. Destruição: cerrado perdeu 50% em 50 anos.',
        detalhado: 'Fisionomia: campo limpo (só grama), campo sujo (grama + arbustos), cerrado sensu stricto (arbustos 3m + árvores esparsas), cerradão (floresta densa). Fauna: tamanduá, lobo-guará, tatu, perdiz, cobra cascavel.',
      },
    },
    {
      id: 'b3', skill: 'pantanal', title: 'Pantanal — A Maior Planície Inundável',
      text: 'Pantanal cobre 150.000 km² (maior parte em Mato Grosso do Sul). Sofre inundação periódica (enchente de Rio Paraguai). Clima tropical com seca em alguns meses. Vegetação mista: floresta, cerrado, campos. Biodiversidade altíssima.',
      example: 'Jacaré, capivara, onça-pintada, anta, ariranha — predadores topo da cadeia. Maior concentração de vida selvagem da América do Sul.',
      variants: {
        simples: 'Planície que alaga periodicamente. Muito úmido, cheio de água e animais. Rio Paraguai controla as enchentes.',
        exemplo: 'Pescadores e pesquisadores vão lá. Turismo ecológico é importante. Queimadas (2020) mataram muitos animais.',
        outra: 'Gado pastoreia no Pantanal. Pecuária é tradição, mas queimadas ameaçam.',
        detalhado: 'Ciclo hidrológico: chuva de dezembro a março → enchente (fevereiro a maio) → seca (agosto a outubro). Vegetação adapta a inundação: raízes suspensas (mangue-do-pantanal), árvores resistentes. Fauna: 1.046 aves, 159 mamíferos, 260 peixes, 98 répteis.',
      },
    },
    {
      id: 'b4', skill: 'caatinga', title: 'Caatinga — O Semiárido do Nordeste',
      text: 'Caatinga cobre 900.000 km² (11% do Brasil, principalmente Nordeste). Clima quente e seco, chuva <500mm/ano (muito pouca). Vegetação: arbustos baixos, cactos, árvores com folhas pequenas. Adaptações à seca: raízes profundas, folhas que caem.',
      example: 'Mandacaru, xique-xique, algaroba, catingueira. Animais: jararaca, lagarto, raposa do campo, emu.',
      variants: {
        simples: 'Sertão seco do Nordeste. Pouca chuva, plantas espinhentas, muito quente. Vida difícil mas rica.',
        exemplo: 'Cangaceiro (bandido), vaqueiro — personagens do sertão. Seca causa sofrimento: fome e migração.',
        outra: 'Agricultor planta durante chuva, colhe e guarda água. Crise: quando não chove, tudo seca.',
        detalhado: 'Adaptações de plantas: perda de folhas (reduz água), raízes profundas, caules suculentos (armazenam água). Fauna: 148 répteis endêmicos, 330 aves, 79 mamíferos. Sertanejo conhece plantas medicinais.',
      },
    },
    {
      id: 'b5', skill: 'mataAtlantica', title: 'Mata Atlântica — A Floresta Tropical Litorânea',
      text: 'Mata Atlântica cobriu original 1,3 milhões km² (14% do Brasil). Hoje resta só 12%. Clima tropical úmido. Uma das florestas mais ricas e ameaçadas do planeta. Encosta da Serra do Mar (topografia difícil).',
      example: 'Onça-pintada, jacaré-de-papo-amarelo, tucano, preguiça. Muitas plantas usadas em medicamentos.',
      variants: {
        simples: 'Floresta na costa. Muita chuva, vegetação fechada. Quase desapareceu por desmatamento.',
        exemplo: 'Cidades crescem sobre a Mata (São Paulo, Rio, Salvador). Casarões históricos estão onde era floresta.',
        outra: 'Resta em fragmentos pequenos. Reflorestamento tenta recuperar, mas é lento.',
        detalhado: 'Fitofisionomia: floresta ombrófila densa (maior), densa aluvial (várzea), mata de araucária (Sul). Fauna: 261 espécies de mamíferos (61% endêmicas), 1.026 aves (184 endêmicas). Status: bioma critico, apenas 12% preservado.',
      },
    },
    {
      id: 'b6', skill: 'marinho', title: 'Bioma Marinho — Oceano e Recifes',
      text: 'Litoral brasileiro: 7.491 km. Bioma marinho inclui recifes de coral (Nordeste), mangues (desembocadura de rios), zona fótica (luz) e abissal (escuro profundo). Corrente fria de Benguela e quente do Brasil controlam temperatura.',
      example: 'Coral, esponja, golfinho, tubarão, tartaruga marinha. Manguezais são berço de peixes e caranguejos.',
      variants: {
        simples: 'Oceano, recifes, mangues. Muito peixe, tubarão, golfinho. Turismo e pesca são importantes.',
        exemplo: 'Manguezal é onde salgado encontra doce. Raízes aéreas prendemas lama, protegem costa.',
        outra: 'Poluição: óleo de navio, plástico, esgoto. Recifes morrem com aquecimento da água.',
        detalhado: 'Zona epipelágica (0–200m, luz): fitoplâncton, peixe. Mesopelágica (200–1.000m, crepúsculo): lula. Batipelágica (1.000–4.000m): bactéria quimiossintetizante. Hadopelágica (>6.000m): pouquíssima vida. Manguezal: Rhizophora mangle (raízes em arco).',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'amazonia', prompt: 'Qual é a maior floresta tropical do mundo?', options: ['Congo', 'Amazônia', 'Floresta Boreal', 'Floresta Temperada'], answer: 1, hints: ['Fica no Brasil', 'Rio Amazonas passa por ela', 'Produz oxigênio para o mundo'], explanation: 'A Amazônia é a maior floresta tropical do mundo.' },
    { id: 'q2', type: 'mc', difficulty: 1, skill: 'cerrado', prompt: 'O Cerrado é um bioma brasileiro com clima:', options: ['Tropical úmido', 'Quente e seco', 'Temperado', 'Polar'], answer: 1, hints: ['Tem seca de 4–5 meses', 'Árvores espalhadas', 'Raízes profundas'], explanation: 'O Cerrado tem clima quente e seco.' },
    { id: 'q3', type: 'tf', difficulty: 2, skill: 'mataAtlantica', prompt: 'A Mata Atlântica original cobria 14% do Brasil e hoje restam apenas 12% dela.', answer: true, hints: ['Desmatamento foi massivo', 'Cidades cresceram no lugar', 'Bioma critico'], explanation: 'Verdadeiro: a Mata Atlântica perdeu 88% de sua cobertura original.' },
  ],
  review: ['Amazônia: floresta tropical úmida, 60% no Brasil', 'Cerrado: savana quente e seca, 23% do Brasil', 'Pantanal: planície inundável, maior biodiversidade', 'Caatinga: semiárido do Nordeste, adaptado à seca', 'Mata Atlântica: floresta costeira, 12% restante', 'Bioma marinho: oceano, recifes, manguezais'],
  sources: [{ title: 'BNCC — Geografia', url: 'http://basenacionalcomum.mec.gov.br/', kind: 'curriculo' }, AUTORAL],
}

// ========== FÍSICA ==========

export const termologia: Lesson = {
  id: 'fis-termologia',
  subject: 'fisica',
  title: 'Termologia — Calor e Temperatura',
  levels: ['medio'],
  grade: '2º Ensino Médio',
  aliases: ['termologia', 'calor', 'temperatura', 'dilatacao', 'equilibrio termico', 'escalas de temperatura'],
  summary: 'Aprenda a diferença entre calor e temperatura, escalas termométricas e dilatação térmica.',
  intro: 'Quando tocamos algo quente, sentimos calor. Mas o que é temperatura? E por que a panela dilatata no fogo?',
  skills: {
    temp: 'Temperatura e Escalas',
    calor: 'Calor e Energia',
    dilat: 'Dilatação Térmica'
  },
  blocks: [
    {
      id: 'b1', skill: 'temp', title: 'Temperatura e Escalas Termométricas',
      text: 'Temperatura mede agitação molecular (movimento de partículas). Quanto mais quente, mais rápidas as moléculas se movem. Escalas: Celsius (0–100°C = água congela e ferve), Fahrenheit (32–212°F = mesmo), Kelvin (273–373K = escala absoluta, começa no zero absoluto −273°C).',
      example: 'Fórmula de conversão: C/5 = (F−32)/9 = (K−273)/5',
      variants: {
        simples: 'Temperatura diz se algo está quente ou frio. Celsius é a que usamos. Kelvin é usada em ciência.',
        exemplo: '0°C = 32°F = 273K (água congela). 100°C = 212°F = 373K (água ferve).',
        outra: 'Termômetro mede temperatura: mercúrio sobe com calor, desce com frio. Sonda eletrônica é mais precisa.',
        detalhado: 'Zero absoluto (0K = −273°C) é a menor temperatura possível: moléculas param de se mover. Celsius: ponto triplo da água = 0,01°C (exato). Fahrenheit: mantém −40°C = −40°F.',
      },
    },
    {
      id: 'b2', skill: 'calor', title: 'Calor e Energia Térmica',
      text: 'Calor é transferência de energia térmica de um corpo quente para um frio. Fluxo: quente → frio. Equilíbrio: quando temperaturas igualam. Unidade: caloria (cal) ou joule (J). Capacidade térmica: c = Q / (m × ΔT), onde Q é calor, m é massa, ΔT é mudança de temperatura.',
      example: 'Água tem alta capacidade térmica: precisa de muito calor para aquecer. Metal esquenta rápido (baixa capacidade).',
      variants: {
        simples: 'Calor viaja de quente para frio. Se o frio esquenta e o quente esfria, eles se equilibram.',
        exemplo: 'Café esfria, mesa aquece até temperatura ambiente. Espontaneamente, calor nunca vai do frio pro quente.',
        outra: 'Calor latente: mudança de fase (sólido → líquido → gás) sem mudar temperatura (exemplo: gelo derrete a 0°C).',
        detalhado: 'Q = m × c × ΔT (calor sensível). Calor latente: Q = m × L (L = calor latente de fusão ou vaporização). Primeira Lei da Termodinâmica: ΔU = Q − W (variação de energia interna = calor − trabalho).',
      },
    },
    {
      id: 'b3', skill: 'dilat', title: 'Dilatação Térmica',
      text: 'Corpos expandem quando aquecidos (moléculas se afastam). Dilatação linear: ΔL = L0 × α × ΔT (comprimento). Dilatação volumétrica: ΔV = V0 × γ × ΔT (volume). Coeficiente α depende do material.',
      example: 'Trilhos de trem têm espaços: para dilatação no verão. Vidro e metal se dilatam diferente — por isso vidro temperado quebra com água quente.',
      variants: {
        simples: 'Calor faz coisas incham. Barra de ferro fica mais comprida. Gaveta fica apertada.',
        exemplo: 'Pontes têm juntas de dilatação. Sem elas, explodem no calor.',
        outra: 'Água é exceção: expande quando CONGELA (por isso gelo flutua). Densidade: gelo < água líquida.',
        detalhado: 'Dilatação linear: barra aumenta comprimento α × L0 × ΔT. Dilatação volumétrica: γ ≈ 3α (em geral). Aplicação: bimetalista (dois metais diferentes): quando aquecido, um dilata mais → curva (usado em termostato).',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'temp', prompt: 'Qual é o ponto de ebulição da água em Celsius e Fahrenheit?', options: ['0°C e 32°F', '50°C e 122°F', '100°C e 212°F', '−40°C e −40°F'], answer: 2, hints: ['Água ferve a cem na escala Celsius', '212 em Fahrenheit', 'Usa-se para cozinhar'], explanation: 'A água ferve a 100°C e 212°F.' },
    { id: 'q2', type: 'fill', difficulty: 1, skill: 'calor', prompt: 'Calor sempre flui de um corpo ________ para um corpo frio.', answers: ['quente'], hints: ['Direção do fluxo térmico', 'Temperatura de origem', 'Oposto de frio'], explanation: 'Calor flui do quente para o frio.' },
    { id: 'q3', type: 'tf', difficulty: 2, skill: 'dilat', prompt: 'Quando a temperatura aumenta, todos os sólidos se dilatam da mesma forma.', answer: false, hints: ['Depende do material', 'Coeficiente varia', 'Ferro dilata diferente de alumínio'], explanation: 'Falso: a dilatação depende do material (coeficiente α).' },
  ],
  review: ['Temperatura: agitação molecular', 'Celsius, Fahrenheit, Kelvin', 'Calor: transferência de energia térmica', 'Dilatação: ΔL = L0 × α × ΔT'],
  sources: [{ title: 'BNCC — Física', url: 'http://basenacionalcomum.mec.gov.br/', kind: 'curriculo' }, AUTORAL],
}

// ========== QUÍMICA ==========

export const reacoesQuimicas: Lesson = {
  id: 'qui-reacoes-quimicas',
  subject: 'quimica',
  title: 'Reações Químicas',
  levels: ['medio'],
  grade: '1º Ensino Médio',
  aliases: ['reacoes quimicas', 'combustao', 'sintese', 'decomposicao', 'deslocamento', 'balanceamento'],
  summary: 'Entenda como substâncias se transformam: síntese, decomposição, combustão e deslocamento.',
  intro: 'Quando queimamos lenha, algo novo aparece (cinza, calor). Isso é reação química — átomos se reorganizam.',
  skills: {
    tipos: 'Tipos de Reações',
    balanc: 'Balanceamento',
    esteq: 'Estequiometria'
  },
  blocks: [
    {
      id: 'b1', skill: 'tipos', title: 'Tipos de Reações Químicas',
      text: 'Síntese (adição): A + B → AB (exemplo: 2H2 + O2 → 2H2O). Decomposição: AB → A + B (exemplo: 2H2O → 2H2 + O2). Deslocamento (substituição simples): A + BC → AC + B (exemplo: Fe + CuSO4 → FeSO4 + Cu). Dupla troca: AB + CD → AD + CB (exemplo: AgNO3 + NaCl → AgCl + NaNO3). Combustão: Combustível + O2 → CO2 + H2O.',
      example: 'Lenha queimando: C + O2 → CO2 (exotérmica, libera calor). Bolo crescendo no forno: reação de decomposição do fermento.',
      variants: {
        simples: 'Reação química: átomos se unem ou se separam, criando novas substâncias. Sinais: cor muda, esquenta, gás escapa, precipitado forma.',
        exemplo: 'Ferrugem: Fe se junta com O2 para fazer Fe2O3 (sintese muito lenta). Explosivo: combustão muito rápida.',
        outra: 'Velocidade: depende de temperatura, concentração, catalisador. Enzima é um catalisador biológico (no corpo, na fermentação).',
        detalhado: 'Exotérmica (libera Q) vs. Endotérmica (absorve Q). Equação: Reagentes → Produtos. Setas: → (vai), ↔ (reversível), Δ (aquecimento). Estado: (s) sólido, (l) líquido, (g) gás, (aq) aquoso.',
      },
    },
    {
      id: 'b2', skill: 'balanc', title: 'Balanceamento de Equações',
      text: 'Lei de Lavoisier: átomos não se criam nem se destroem (conservação). Equação balanceada: mesmo número de cada átomo nos reagentes e produtos. Método: colocar coeficientes (números antes) de substâncias.',
      example: 'H2 + O2 → H2O | Desbalanceada: 2H esquerda, 2H e 1O direita. Balanceada: 2H2 + O2 → 2H2O (4H e 2O em cada lado).',
      variants: {
        simples: 'Contar átomos: contar de cada tipo de cada lado. Se não bater, colocar números até bater.',
        exemplo: 'Fe + O2 → Fe2O3. Começar pelo Fe: 4Fe esquerda → precisa 4Fe direita (2 × Fe2O3). Depois O2: 2Fe2O3 tem 6O → precisa 3O2.',
        outra: 'Praticar com compostos comuns: H2, O2, NaCl, H2SO4, Ca(OH)2.',
        detalhado: 'Método algébrico: a·H2 + b·O2 → c·H2O. Igualar: H: 2a = 2c → a = c. O: 2b = c → b = 1/2, ou multiplica tudo por 2: 2H2 + 1O2 → 2H2O.',
      },
    },
    {
      id: 'b3', skill: 'esteq', title: 'Estequiometria — Cálculos com Reações',
      text: 'Estequiometria: proporção molar (mols) entre reagentes e produtos (a razão dos coeficientes). Molar (M) = mols / volume (L). Mol: 6,02 × 10²³ partículas (número de Avogadro). Cálculo: mols = massa / massa molar (g/mol).',
      example: 'Combustão: C + O2 → CO2. 1 mol de C precisa 1 mol de O2 para fazer 1 mol de CO2. Se queimar 12g de C (= 1 mol), precisa 32g de O2 (= 1 mol).',
      variants: {
        simples: 'Moléculas em quantidade (mols). Se receita precisa 2 de açúcar e 1 de água, dobra tudo proporcional.',
        exemplo: 'Limitar reagente: em 2H2 + O2 → 2H2O, se tiver 4 mols H2 mas só 1 mol O2, O2 acaba primeiro (limita).',
        outra: 'Rendimento: nem toda reação é 100% eficiente. Se espera 10g mas faz só 8g, rendimento = 80%.',
        detalhado: 'n = m / M. Molar: c = n / V. Diluição: c1×V1 = c2×V2. Titulação: n(ácido) = n(base) × (Va/Vb) × (cb/ca).',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'tipos', prompt: 'Que tipo de reação é a combustão?', options: ['Síntese', 'Decomposição', 'Combustível + O2 → CO2 + H2O', 'Dupla troca'], answer: 2, hints: ['Queimar lenha', 'Produz gás carbônico', 'Libera calor'], explanation: 'Combustão é a reação de combustível com O2, produzindo CO2 e H2O.' },
    { id: 'q2', type: 'fill', difficulty: 2, skill: 'balanc', prompt: 'Na equação __H2 + __O2 → __H2O, preencha os coeficientes.', answers: ['2', '1', '2', '2 1 2'], hints: ['Contar átomos', '4H esquerda = 4H direita', '2O esquerda = 2O direita'], explanation: 'Balanceada: 2H2 + 1O2 → 2H2O' },
  ],
  review: ['Síntese: A + B → AB', 'Decomposição: AB → A + B', 'Combustão: Combustível + O2 → CO2 + H2O', 'Balanceamento: conservar átomos', 'Estequiometria: proporção molar'],
  sources: [{ title: 'BNCC — Química', url: 'http://basenacionalcomum.mec.gov.br/', kind: 'curriculo' }, AUTORAL],
}

// ========== BIOLOGIA ==========

export const citologia: Lesson = {
  id: 'bio-citologia',
  subject: 'biologia',
  title: 'Citologia — A Célula',
  levels: ['fund2', 'medio'],
  grade: '7º ano e 1º série',
  aliases: ['citologia', 'celula', 'celula animal', 'celula vegetal', 'organelas', 'nucleo', 'mitocondria'],
  summary: 'Conheça a estrutura da célula: núcleo, organelas e diferenças entre animal e vegetal.',
  intro: 'Toda vida é feita de células. Uma célula é a menor unidade de vida. Mas como ela é por dentro?',
  skills: {
    basico: 'Célula Básica',
    procario: 'Procariotas vs. Eucariotas',
    animal: 'Célula Animal',
    vegetal: 'Célula Vegetal'
  },
  blocks: [
    {
      id: 'b1', skill: 'basico', title: 'Estrutura Básica da Célula',
      text: 'Toda célula tem: membrana plasmática (controla o que entra/sai), citoplasma (gel com organelas), núcleo (em eucariotas, tem DNA). Célula procariota: sem núcleo (bactérias, archaeas). Célula eucariota: com núcleo (animais, plantas, fungos).',
      example: 'Você tem ~37 trilhões de células. Cada uma tem a mesma membrana que todo seu corpo (proporção).',
      variants: {
        simples: 'Célula é como uma mini-fábrica: membrana é a parede, citoplasma é o chão com máquinas (organelas), núcleo é o escritório.',
        exemplo: 'Bactéria (procariota): DNA flutuando, sem núcleo. Célula sua (eucariota): DNA dentro de um saco (núcleo), com várias organelas especializadas.',
        outra: 'Membrana: bicamada lipídica com proteínas (canais, receptores). Deixa entrar o que precisa, bloqueia o resto.',
        detalhado: 'Membrana: fosfolipídio + proteína + colesterol (animal). Citoplasma: citosol (líquido) + organelas. Núcleo: envolto por carioteca (dois lipídios), tem cromatina (DNA + proteína), nucléolo (fabrica ribossomos).',
      },
    },
    {
      id: 'b2', skill: 'procario', title: 'Procariotas vs. Eucariotas',
      text: 'Procariota (bactéria): sem núcleo, sem organelas membranosas, DNA circular, ribossomos menores, ~1–10 μm. Eucariota (animal, planta, fungo): com núcleo, com organelas, DNA linear (cromossomos), ribossomos maiores, ~10–100 μm. Eucariotas surgiram depois, evoluíram de procariotas.',
      example: 'Você é feito de células eucariotas. A bactéria que te causa infecção é procariota.',
      variants: {
        simples: 'Procariota = simples, rápido, pequeno. Eucariota = complexo, lento, maior.',
        exemplo: 'Bactéria: DNA solto no citoplasma (nucleoide). Você: DNA empacotado em cromossomos dentro do núcleo.',
        outra: 'Procariotas não têm mitocôndria, cloroplasto, retículo. Eucariotas têm (exceto planta sem mitocôndria muito rara).',
        detalhado: 'Origem: endossimbiose = mitocôndria era procariota (mitocondriota), cloroplasto era procariota (cianobactéria). Evidência: mitocôndria e cloroplasto têm DNA próprio (mtDNA, ptDNA), ribossomos tipo procariota.',
      },
    },
    {
      id: 'b3', skill: 'animal', title: 'Organelas da Célula Animal',
      text: 'Núcleo: DNA, controla proteína (transcrição, tradução). Mitocôndria: energia (ATP, respiração). Retículo endoplasmático liso: fabrica lipídios. Retículo endoplasmático rugoso: fabrica proteína (ribossomos). Golgi: modifica, emala proteína. Lisossomo: digere (vesículas com enzimas). Centrossomos: organiza microtúbulos (mitose). Ribossomos: fabrica proteína (no RE ou citoplasma).',
      example: 'Célula de músculo: muita mitocôndria (precisa energia). Célula do fígado: muito retículo e Golgi (faz enzimas).',
      variants: {
        simples: 'Organelas: cada uma faz um serviço. Núcleo manda, mitocôndria fornece energia, retículo faz proteína.',
        exemplo: 'Proteína: gene (DNA) → mRNA (núcleo) → ribossomo (lê mRNA, faz proteína) → Golgi (embrulha) → vesícula (entrega).',
        outra: 'Lisossomo mata bactéria (vesícula + enzima digestiva). Se lisossomo explode, célula se mata (morte celular programada).',
        detalhado: 'Matriz mitocondrial: ciclo de Krebs. Crista: cadeia de transporte de elétrons (ATP sintase). Golgi: cisterna (sáculos), recebe do RE, modifica, manda para lisossomo ou membrana (exocitose).',
      },
    },
    {
      id: 'b4', skill: 'vegetal', title: 'Célula Vegetal — Diferenças',
      text: 'Célula vegetal tem: parede celular (fora, celulose, rigidez), grande vacúolo (70% volume, armazena água), cloroplasto (fotossíntese). Não tem centrossomos nem lisossomos (Golgi faz). Plasmodesmos: canais entre células. Parede: celulose (papel) + hemicelulose + pectina.',
      example: 'Planta é verde por cloroplasto (tem clorofila). Água murcheia planta (vacúolo perde turgência). Parede impede expansão: daí rigidez.',
      variants: {
        simples: 'Planta: parede verde (celulose) + grande bolsa de água (vacúolo) + clorofila (verde).',
        exemplo: 'Alface murcha quando seca: vacúolo perde água, murcha. Bota na água: vacúolo enche novamente, fica rígida (turgência).',
        outra: 'Cloroplasto: tilacoides (onde luz vira ATP) + estroma (onde ATP vira açúcar = ciclo de Calvin).',
        detalhado: 'Parede primária: celulose + hemicelulose + pectina, deixa passar água. Parede secundária (madeira): lignina + celulose, bem rígida. Vacúolo: suco celular (água + sais + pigmentos), mantém forma com turgência.',
      },
    },
  ],
  questions: [
    { id: 'q1', type: 'mc', difficulty: 1, skill: 'basico', prompt: 'Qual é a menor unidade de vida?', options: ['Átomo', 'Molécula', 'Célula', 'Tecido'], answer: 2, hints: ['Viva e autossuficiente', 'Vírus não conta (não é vivo sozinho)', 'Você é feito disso'], explanation: 'A célula é a menor unidade de vida.' },
    { id: 'q2', type: 'tf', difficulty: 1, skill: 'procario', prompt: 'Bactérias são eucariotas porque têm membrana plasmática.', answer: false, hints: ['Membrana ≠ eucariota', 'Eucariota = núcleo', 'Bactéria = procariota (sem núcleo)'], explanation: 'Falso: bactérias são procariotas (sem núcleo), mesmo tendo membrana.' },
    { id: 'q3', type: 'mc', difficulty: 2, skill: 'animal', prompt: 'Qual organela é responsável por produzir energia (ATP)?', options: ['Retículo endoplasmático', 'Mitocôndria', 'Golgi', 'Lisossomo'], answer: 1, hints: ['Respiração celular', 'Mitocôndria é a "fábrica de energia"', 'ATP = adenosina trifosfato'], explanation: 'A mitocôndria produz ATP através da respiração celular.' },
    { id: 'q4', type: 'mc', difficulty: 1, skill: 'vegetal', prompt: 'Qual estrutura dá rigidez à célula vegetal?', options: ['Membrana plasmática', 'Vacúolo', 'Parede celular', 'Cloroplasto'], answer: 2, hints: ['Feita de celulose', 'Protege a planta', 'Fora da célula'], explanation: 'A parede celular, feita de celulose, dá rigidez à célula vegetal.' },
  ],
  review: ['Procariota: sem núcleo (bactéria)', 'Eucariota: com núcleo (você, planta)', 'Mitocôndria: energia', 'Retículo: faz proteína', 'Cloroplasto: fotossíntese (planta)', 'Parede celular: rigidez (planta)'],
  sources: [{ title: 'BNCC — Biologia', url: 'http://basenacionalcomum.mec.gov.br/', kind: 'curriculo' }, AUTORAL],
}
