import { block, eqsPt, fill, lesson, mc, order, tf } from '../dsl'
const FONTES = []

export const frSalutations = lesson({
  id: 'fr-salutations', subject: 'frances', title: 'Salutations (Saudações)', levels: ['fund1'], grade: '6º ano',
  topic: 'Français A1', subtopic: 'Greetings, courtesy, introductions',
  aliases: ['bonjour', 'bonsoir', 'salut', 'comment ça va', 'enchanté'],
  summary: 'Aprenda cumprimentos e apresentações em francês.',
  intro: 'Bonjour! Como saudar em francês?',
  objective: 'Cumprimentar e se apresentar em francês.',
  next: [],
  skills: { salut: 'Cumprimentos', pres: 'Apresentação' },
  blocks: [
    block('salut', 'Cumprimentos', 'Bonjour (dia). Bonsoir (noite). Salut (informal). Au revoir (adeus). S\'il vous plaît (formal). Merci (obrigado).', 'Bonjour = ola dia.', 'Salut = informal.', 'Curta e polida.', '1. Qual tempo?'),
    block('pres', 'Je m\'appelle...', 'Je suis... (sou). Je m\'appelle... (me chamo). Enchanté(e) (prazer). Et vous? (e você?).', 'Je m\'appelle Marie.', 'Je suis brésilien(ne).', 'Simples apresentação.', '1. Como falar nome?'),
  ],
  questions: [
    mc(1, 'salut', 'Saudação à noite?', ['Bonjour', 'Bonsoir', 'Salut'], 1, ['Noite=?'], 'Bonsoir.'),
    tf(1, 'salut', 'Salut é formal.', false, ['Formal ou informal?'], 'Falso (informal).'),
    fill(1, 'pres', 'Je m\'___ Marie.', ['appelle'], ['Me chamo.'], 'appelle.'),
    mc(2, 'pres', 'Enchanté significa?', ['Adeus', 'Prazer', 'Obrigado'], 1, ['Primeira vez?'], 'Prazer.'),
    order(2, 'salut', 'Ordem conversa.', ['Bonjour', 'Merci', 'Au revoir'], ['Início-fim.'], 'Bonjour→Merci→Au revoir.'),
  ],
  review: ['Bonjour (dia), Bonsoir (noite)', 'Je m\'appelle... (me chamo)', 'Enchanté (prazer)', 'Au revoir (adeus)'],
  relatedQuestions: ['como falar francês'],
  equivalentQuestions: eqsPt(['francês'], ['bonjour', 'salutations']),
  commonErrors: [],
  sources: FONTES,
})

export const frPresent = lesson({
  id: 'fr-present-etre-avoir', subject: 'frances', title: 'Être et avoir', levels: ['fund1'], grade: '6º ano',
  topic: 'Français A1', subtopic: 'Present tense verbs',
  aliases: ['être', 'avoir', 'je suis', 'j\'ai'],
  summary: 'Conjugação de être (ser/estar) e avoir (ter).',
  intro: 'Je suis... J\'ai...',
  objective: 'Conjugar être e avoir no presente.',
  next: [],
  skills: { etre: 'Être', avoir: 'Avoir' },
  blocks: [
    block('etre', 'Être (ser/estar)', 'Je suis. Tu es. Il/Elle est. Nous sommes. Vous êtes. Ils/Elles sont.', 'Je suis français.', 'Il est brésilien.', 'Fácil memorizar.', '1. Yo soy=?'),
    block('avoir', 'Avoir (ter)', 'J\'ai. Tu as. Il/Elle a. Nous avons. Vous avez. Ils/Elles ont.', 'J\'ai un chat.', 'Elle a 20 ans.', 'Mesmo padrão.', '1. Yo tengo=?'),
  ],
  questions: [
    mc(1, 'etre', 'Je suis = ?', ['Tú eres', 'Yo soy', 'Él es'], 1, ['Yo?'], 'Yo soy.'),
    tf(1, 'etre', 'Il est = él está.', true, ['Él?'], 'Verdadeiro.'),
    fill(1, 'avoir', 'J\'___ un livre.', ['ai'], ['Tengo.'], 'ai.'),
    mc(2, 'avoir', 'Elle a = ella ___?', ['es', 'tiene', 'está'], 1, ['Tiene.'], 'tiene.'),
    order(2, 'etre', 'Ordene.', ['je', 'tu', 'il', 'nous'], ['Singular primero.'], 'je→tu→il→nous.'),
  ],
  review: ['Je suis, Tu es, Il est', 'Nous sommes, Vous êtes, Ils sont', 'J\'ai, Tu as, Il a', 'Nous avons, Vous avez, Ils ont'],
  relatedQuestions: ['francês verbos'],
  equivalentQuestions: eqsPt(['être'], ['avoir', 'francês presente']),
  commonErrors: [],
  sources: FONTES,
})

export const frNumbers = lesson({
  id: 'fr-nombres', subject: 'frances', title: 'Nombres (Números)', levels: ['fund1'], grade: '6º ano',
  topic: 'Français A1', subtopic: 'Numbers 0-100',
  aliases: ['nombres', 'zéro', 'un', 'deux', 'chiffres'],
  summary: 'Números em francês de 0 a 100.',
  intro: '0-20: especial. 20-99: padrão. 100: cent.',
  objective: 'Contar até 100 em francês.',
  next: [],
  skills: { num: 'Números' },
  blocks: [
    block('num', 'Zéro a vingt', '0=zéro, 1=un, 2=deux, 3=trois, 4=quatre, 5=cinq, 6=six, 7=sept, 8=huit, 9=neuf, 10=dix, 11=onze, 12=douze, 13=treize, 14=quatorze, 15=quinze, 16=seize, 17=dix-sept, 18=dix-huit, 19=dix-neuf, 20=vingt.', '17=dix-sept (10+7).', 'Onze=11 (especial).', 'Memória.', '1. Qual é 15?'),
    block('num', 'Vingt a cent', '20=vingt, 30=trente, 40=quarante, 50=cinquante, 60=soixante, 70=soixante-dix (60+10), 80=quatre-vingts (4×20), 90=quatre-vingt-dix (4×20+10), 100=cent.', '70=60+10 (francês usa 60).', '80=4×20 (vigesimal).', 'Padrão após 20.', '1. Qual é 75?'),
  ],
  questions: [
    mc(1, 'num', '5 em francês?', ['cinq', 'six', 'dix'], 0, ['Memória.'], 'cinq.'),
    tf(1, 'num', 'Onze = 11.', true, ['Special?'], 'Verdadeiro.'),
    fill(1, 'num', '1 em francês: ___.', ['un'], ['Básico.'], 'un.'),
    mc(2, 'num', '20 em francês?', ['dix-neuf', 'vingt', 'trente'], 1, ['Vinte.'], 'vingt.'),
    order(2, 'num', 'Ordene.', ['trois', 'un', 'deux'], ['Menor primeiro.'], 'un→deux→trois.'),
  ],
  review: ['0-20: memorizar', '20-60: padrão', '70=60+10', '80=4×20', '90=4×20+10'],
  relatedQuestions: ['francês números'],
  equivalentQuestions: eqsPt(['nombres'], ['números francés']),
  commonErrors: ['Confundir 70 com 17 (ambos têm "dix").'],
  sources: FONTES,
})

export const frFamiliale = lesson({
  id: 'fr-famille', subject: 'frances', title: 'La famille (Família)', levels: ['fund1'], grade: '6º ano',
  topic: 'Français A1', subtopic: 'Family members',
  aliases: ['famille', 'père', 'mère', 'frère', 'sœur', 'maison'],
  summary: 'Membros da família em francês.',
  intro: 'Quem é meu pai?',
  objective: 'Nomear familiares em francês.',
  next: [],
  skills: { fam: 'Família' },
  blocks: [
    block('fam', 'La famille', 'Père (pai). Mère (mãe). Frère (irmão). Sœur (irmã). Grand-mère (avó). Grand-père (avô). Fils (filho). Fille (filha). Cousine (prima). Cousin (primo). Mari (marido). Femme (esposa).', 'Mon père = meu pai.', 'Ma mère = minha mãe.', 'Possessivo muda.', '1. Quem é sœur?'),
  ],
  questions: [
    mc(1, 'fam', 'Mère = ?', ['tía', 'madre', 'hermana'], 1, ['Mamá.'], 'madre.'),
    tf(1, 'fam', 'Frère é irmão.', true, ['Hermano?'], 'Verdadeiro.'),
    fill(1, 'fam', 'Meu pai: mon ___.', ['père'], ['Papa.'], 'père.'),
    mc(2, 'fam', 'Cousine = prima ou primo?', ['primo', 'prima'], 1, ['Femenino.'], 'prima.'),
    order(2, 'fam', 'Gerações.', ['Grand-mère', 'Mère', 'Fille'], ['Maior primeiro.'], 'Grand-mère→Mère→Fille.'),
  ],
  review: ['Père, Mère', 'Frère, Sœur', 'Grand-mère, Grand-père', 'Fils, Fille'],
  relatedQuestions: ['francês familia'],
  equivalentQuestions: eqsPt(['famille'], ['francés familia']),
  commonErrors: [],
  sources: FONTES,
})
