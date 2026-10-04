import type { Lesson } from '../../types'

export const QUIMICA_LOTE8: Lesson[] = [
  {
    id: 'qui-fund2-001', subject: 'quimica', grade: '8º-9º', title: 'Átomos e Moléculas',
    levels: ['fund2'], aliases: ['átomo', 'molécula', 'elemento', 'substância', 'composto'],
    summary: 'Blocos de construção da matéria', intro: 'Tudo é feito de átomos.',
    objective: 'Entender estrutura atômica', topic: 'Estrutura Atômica', subtopic: 'Átomos',
    blocks: [
      {id: 'b1', title: 'Estrutura Atômica', text: 'Núcleo (prótons+nêutrons). Elétrons orbitam. Próton=carga+. Elétron=carga-. Neutro: # prótons = # elétrons.', example: 'Carbono: 6 prótons, 6 nêutrons, 6 elétrons.'},
      {id: 'b2', title: 'Elemento vs Composto', text: 'Elemento: um tipo átomo (ouro=Au). Composto: múltiplos elementos (água=H₂O). Molécula: átomos ligados.', example: 'Ouro puro: só ouro. Água: 2H+1O ligados.'},
      {id: 'b3', title: 'Ligações Químicas', text: 'Iônica: ganha/perde elétron. Covalente: compartilha elétrons. Força liga átomos em moléculas.', example: 'NaCl: iônico. H₂O: covalente.'}
    ],
    questions: [{id: 'q1', type: 'mc', difficulty: 1, skill: 'atomos', prompt: 'Núcleo tem?', options: ['Elétrons', 'Prótons e nêutrons', 'Apenas prótons', 'Nada'], answer: 1, explanation: 'Núcleo=prótons+nêutrons.', hints: ['Dica: centro', 'Dica: positivo', 'Dica: pesado']}],
    skills: {'atomos': 'Entender átomos'}, review: [], commonDoubts: [], commonErrors: [], prerequisites: [], next: []
  },
  {
    id: 'qui-fund2-002', subject: 'quimica', grade: '9º', title: 'Reações Químicas',
    levels: ['fund2'], aliases: ['reação', 'combustão', 'oxido-redução', 'equação'],
    summary: 'Átomos reorganizam em reações', intro: 'Química é reorganização de átomos.',
    objective: 'Entender reações, balancear equações', topic: 'Reações', subtopic: 'Mecanismos',
    blocks: [
      {id: 'b1', title: 'Equação Química', text: 'Reactantes → Produtos. Balanceada: mesmo # átomos antes e depois. CH₄+2O₂→CO₂+2H₂O (combustão de metano).', example: 'Combustão: queima de combustível com oxigênio.'},
      {id: 'b2', title: 'Tipos de Reações', text: 'Síntese: A+B→AB. Decomposição: AB→A+B. Combustão: combustível+O₂→CO₂+H₂O. Neutralização: ácido+base→sal+água.', example: 'Explosivo TNT: decomposição explosiva rápida.'},
      {id: 'b3', title: 'Energia', text: 'Exotérmica: libera calor (queima). Endotérmica: absorve calor (frio).', example: 'Fogo: exotérmica. Gelo melting: endotérmica.'}
    ],
    questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'reacoes', prompt: 'Combustão é?', options: ['Decomposição', 'Combustível+O₂→CO₂+H₂O', 'Síntese', 'Neutralização'], answer: 1, explanation: 'Combustão queima combustível com oxigênio.', hints: ['Dica: fogo', 'Dica: oxigênio', 'Dica: libera calor']}],
    skills: {'reacoes': 'Entender reações'}, review: [], commonDoubts: [], commonErrors: [], prerequisites: [], next: []
  },
  {
    id: 'qui-medio-003', subject: 'quimica', grade: '1º-2º Médio', title: 'Tabela Periódica',
    levels: ['medio'], aliases: ['tabela periódica', 'elemento', 'período', 'grupo'],
    summary: 'Organização de 118 elementos', intro: 'Mendeleev criou tabela periódica.',
    objective: 'Entender organização periódica', topic: 'Tabela Periódica', subtopic: 'Organização',
    blocks: [
      {id: 'b1', title: 'Organização', text: 'Linhas=períodos (valência). Colunas=grupos (propriedades similares). Metais (esquerda), não-metais (direita), metaloides (meio).', example: 'Grupo 1: alkali metals (Li, Na, K). Grupo 18: gases nobres (He, Ne, Ar).'},
      {id: 'b2', title: 'Tendências', text: 'Tamanho atômico: decresce à direita. Ionização: cresce à direita. Eletronegatividade: cresce à direita.', example: 'Flúor: muito eletronegativo (puxa elétrons).'},
      {id: 'b3', title: 'Aplicação', text: 'Prediz propriedades. Elemento desconhecido? Tabela diz comportamento.', example: 'Elemento 119 será produzido em laboratório (não existe na natureza).'}
    ],
    questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'periodica', prompt: 'Gases nobres estão em qual grupo?', options: ['Grupo 1', 'Grupo 17', 'Grupo 18', 'Grupo 13'], answer: 2, explanation: 'Gases nobres (He, Ne, Ar) em grupo 18.', hints: ['Dica: não reagem', 'Dica: coluna direita', 'Dica: última coluna']}],
    skills: {'periodica': 'Entender tabela periódica'}, review: [], commonDoubts: [], commonErrors: [], prerequisites: [], next: []
  },
  {
    id: 'qui-medio-004', subject: 'quimica', grade: '2º Médio', title: 'Ácidos e Bases',
    levels: ['medio'], aliases: ['ácido', 'base', 'pH', 'neutralização'],
    summary: 'pH governa reações químicas', intro: 'Ácidos e bases são opostos.',
    objective: 'Entender pH, ácidos, bases, neutralização', topic: 'Ácido-Base', subtopic: 'Equilíbrio',
    blocks: [
      {id: 'b1', title: 'Definição', text: 'Ácido: libera H⁺ (pH<7). Base: libera OH⁻ (pH>7). Neutro: pH=7. Escala pH: 1-14.', example: 'Limão (pH~2): ácido. Sabão (pH~13): base. Água (pH=7): neutra.'},
      {id: 'b2', title: 'Neutralização', text: 'Ácido+Base→Sal+Água. Exotérmica (libera calor). HCl+NaOH→NaCl+H₂O (ácido clorídrico+hidróxido sódio=sal).', example: 'Indigestion: ácido estômago muito. Tomar antiácido (base) neutraliza.'},
      {id: 'b3', title: 'pH Extremo', text: 'pH muito baixo (ácido): corroe. pH muito alto (base): também corroe. Meio é delicado.', example: 'Aço em ácido: dissolve. Pele em ácido: queima.'}
    ],
    questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'ph', prompt: 'pH 1 é?', options: ['Neutro', 'Base', 'Ácido muito forte', 'Não existe'], answer: 2, explanation: 'pH<7 é ácido. pH=1 é MUITO ácido.', hints: ['Dica: escala 1-14', 'Dica: <7=ácido', 'Dica: perigoso']}],
    skills: {'ph': 'Entender pH'}, review: [], commonDoubts: [], commonErrors: [], prerequisites: [], next: []
  },
  {
    id: 'qui-medio-005', subject: 'quimica', grade: '2º-3º Médio', title: 'Química Orgânica',
    levels: ['medio'], aliases: ['carbono', 'orgânico', 'hidrocarboneto', 'isômero'],
    summary: 'Química de vida é carbono-baseado', intro: 'Carbono é rei da química orgânica.',
    objective: 'Entender carbono, isômeros, biomoléculas', topic: 'Química Orgânica', subtopic: 'Compostos de Carbono',
    blocks: [
      {id: 'b1', title: 'Por que Carbono?', text: 'Carbono: forma 4 ligações. Pode ligar com si mesmo (cadeias). Cria complexidade. Base de vida (DNA, proteínas, gorduras).', example: 'Diamante e grafite: ambos carbono puro, estrutura diferente=propriedades diferentes.'},
      {id: 'b2', title: 'Isômeros', text: 'Mesma fórmula molecular, estrutura diferente, propriedades diferentes. C₆H₁₂O₆: glicose vs frutose (ambos açúcar, gosto diferente).', example: 'Cis vs trans gordura: mesma fórmula, trans é mais prejudicial à saúde.'},
      {id: 'b3', title: 'Grupos Funcionais', text: 'Álcool (-OH): vinho. Ácido carboxílico (-COOH): vinagre. Amina (-NH₂): proteínas. Grupo funcional determina comportamento.', example: 'Etanol (álcool) bebe. Ácido acético (ácido) no vinagre.'}
    ],
    questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'organica', prompt: 'Base de vida?', options: ['Nitrogênio', 'Oxigênio', 'Carbono', 'Hidrogênio'], answer: 2, explanation: 'Carbono: forma vida (DNA, proteínas, etc).', hints: ['Dica: 4 ligações', 'Dica: cadeia longa', 'Dica: átomos no corpo']}],
    skills: {'organica': 'Entender química orgânica'}, review: [], commonDoubts: [], commonErrors: [], prerequisites: [], next: []
  },
  {
    id: 'qui-medio-006', subject: 'quimica', grade: '3º Médio', title: 'Eletroquímica',
    levels: ['medio'], aliases: ['bateria', 'célula galvânica', 'eletrólise', 'corrosão'],
    summary: 'Eletricidade e química se encontram', intro: 'Bateria é reação química gerando eletricidade.',
    objective: 'Entender bateria, eletrólise, corrosão', topic: 'Eletroquímica', subtopic: 'Reações Redox',
    blocks: [
      {id: 'b1', title: 'Célula Galvânica', text: 'Bateria: dois metais diferentes + eletrólito. Reação química → fluxo de elétrons (corrente). Ânodo (negativo), cátodo (positivo).', example: 'Bateria de carro: chumbo e óxido de chumbo em ácido sulfúrico.'},
      {id: 'b2', title: 'Eletrólise', text: 'Inverso de bateria. Eletricidade força reação química. Separa água em H₂ e O₂. Refina metais.', example: 'Eletrólise de água: 2H₂O + eletricidade → 2H₂ + O₂.'},
      {id: 'b3', title: 'Corrosão', text: 'Oxidação lenta de metal. Ferrugem é oxido de ferro. Proteção: galvanização, tinta, eletrólise inversa.', example: 'Carro sem pintura: fermugem em dias. Com proteção: dura anos.'}
    ],
    questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'eletroquimica', prompt: 'Bateria gera eletricidade via?', options: ['Magnetismo', 'Reação química', 'Luz', 'Calor'], answer: 1, explanation: 'Reação química em bateria → fluxo elétrons.', hints: ['Dica: redox', 'Dica: elétrons movem', 'Dica: dois metais']}],
    skills: {'eletroquimica': 'Entender eletroquímica'}, review: [], commonDoubts: [], commonErrors: [], prerequisites: [], next: []
  },
  {
    id: 'qui-medio-007', subject: 'quimica', grade: '3º Médio', title: 'Química Aplicada',
    levels: ['medio'], aliases: ['fármaco', 'polímero', 'síntese', 'indústria'],
    summary: 'Química resolve problemas reais', intro: 'Remédios, plásticos, combustível: tudo química aplicada.',
    objective: 'Entender aplicações industriais', topic: 'Química Aplicada', subtopic: 'Indústria e Medicamentos',
    blocks: [
      {id: 'b1', title: 'Fármacos', text: 'Medicina é química pura. Aspirina, antibióticos, antivirais: moléculas desenhadas. Síntese em laboratório depois produção industrial.', example: 'Penicilina: descoberta acidental 1928, revolucionou medicina.'},
      {id: 'b2', title: 'Polímeros', text: 'Plástico: longas cadeias de carbono. PET (garrafas), polietileno (sacolas), silicone (implantes). Não-biodegradável (problema).', example: '1kg plástico leva 500+ anos decompor.'},
      {id: 'b3', title: 'Síntese Industrial', text: 'Haber-Bosch: N₂+H₂→NH₃ (fertilizante) alimenta 4 bilhões. Craqueamento de petróleo: obtém gasolina. Siderurgia: transforma minério em aço.', example: 'Sem fertilizantes sintéticos: fome em massa.'}
    ],
    questions: [{id: 'q1', type: 'mc', difficulty: 2, skill: 'aplicada', prompt: 'Polímero é?', options: ['Metal', 'Ácido', 'Longa cadeia moléculas', 'Elemento'], answer: 2, explanation: 'Polímero=muitas moléculas ligadas (poli=muitos).', hints: ['Dica: plástico', 'Dica: cadeia', 'Dica: artificial']}],
    skills: {'aplicada': 'Entender química aplicada'}, review: [], commonDoubts: [], commonErrors: [], prerequisites: [], next: []
  }
]
