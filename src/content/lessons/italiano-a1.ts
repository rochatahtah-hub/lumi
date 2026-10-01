import { block, eqsPt, fill, lesson, mc, order, tf } from '../dsl'

export const itSalutazioni = lesson({
  id: 'it-salutazioni', subject: 'italiano', title: 'Salutazioni', levels: ['fund1'], grade: '6º ano',
  topic: 'Italiano A1', subtopic: 'Greetings',
  aliases: ['ciao', 'buongiorno', 'buonasera', 'arrivederci', 'piacere'],
  summary: 'Cumprimentos em italiano.',
  intro: 'Ciao! Como saudar em italiano?',
  objective: 'Cumprimentos e apresentações.',
  next: [],
  skills: { salut: 'Salutazioni', pres: 'Presentazione' },
  blocks: [
    block('salut', 'Salutazioni', 'Ciao (informal). Buongiorno (formal dia). Buonasera (noite). Arrivederci (adeus formal). Piacere (prazer). Grazie (obrigado).', 'Ciao = oi/oi. Buongiorno = olá (formal).', 'Ciao casual.', 'Cordiale.', '1. Qual formal?'),
    block('pres', 'Mi chiamo...', 'Mi chiamo... (me chamo). Sono... (sou). Di dove sei? (de onde é?). Sono brasiliano(a).', 'Mi chiamo Marco.', 'Sono italiano.', 'Apresentação.', '1. Como nome?'),
  ],
  questions: [
    mc(1, 'salut', 'Ciao é?', ['formal', 'informal', 'noturno'], 1, ['Qual tipo?'], 'informal.'),
    tf(1, 'salut', 'Buongiorno = dia.', true, ['Qual período?'], 'Verdadeiro.'),
    fill(1, 'pres', 'Mi ___ Marco.', ['chiamo'], ['Me chamo.'], 'chiamo.'),
    mc(2, 'pres', 'Piacere = ?', ['adeus', 'prazer', 'obrigado'], 1, ['Primeira vez.'], 'prazer.'),
    order(2, 'salut', 'Ordem.', ['Buongiorno', 'Grazie', 'Arrivederci'], ['Conversação.'], 'Buongiorno→Grazie→Arrivederci.'),
  ],
  review: ['Ciao (informal)', 'Buongiorno (formal dia)', 'Buonasera (noite)', 'Arrivederci (adeus)', 'Mi chiamo... (me chamo)'],
  relatedQuestions: ['italiano básico'],
  equivalentQuestions: eqsPt(['italiano'], ['salutazioni', 'ciao']),
  commonErrors: [],
  sources: [],
})

export const itEssereAvere = lesson({
  id: 'it-essere-avere', subject: 'italiano', title: 'Essere e avere', levels: ['fund1'], grade: '6º ano',
  topic: 'Italiano A1', subtopic: 'Present tense',
  aliases: ['essere', 'avere', 'sono', 'ho'],
  summary: 'Conjugação de essere (ser) e avere (ter).',
  intro: 'Sono..., Ho...',
  objective: 'Conjugar no presente.',
  next: [],
  skills: { essere: 'Essere', avere: 'Avere' },
  blocks: [
    block('essere', 'Essere', 'Sono (sou). Sei (és). È (é). Siamo (somos). Siete (sois). Sono (são).', 'Sono italiano.', 'È bello.', 'Memorizar.', '1. Yo soy=?'),
    block('avere', 'Avere', 'Ho (tenho). Hai (tens). Ha (tem). Abbiamo (temos). Avete (tendes). Hanno (têm).', 'Ho un cane.', 'Ha 25 anni.', 'Padrão.', '1. Yo tengo=?'),
  ],
  questions: [
    mc(1, 'essere', 'Sono = yo?', ['eres', 'soy', 'es'], 1, ['Yo.'], 'soy.'),
    tf(1, 'essere', 'È = él.', true, ['Él/ella.'], 'Verdadeiro.'),
    fill(1, 'avere', 'Ho un ___.', ['gatto'], ['Gato.'], 'gatto.'),
    mc(2, 'avere', 'Ha = él ___?', ['tiene', 'tienes', 'ha'], 0, ['Tiene.'], 'tiene.'),
    order(2, 'essere', 'Ordene.', ['sono', 'sei', 'è'], ['Singular.'], 'sono→sei→è.'),
  ],
  review: ['Sono, Sei, È', 'Siamo, Siete, Sono', 'Ho, Hai, Ha', 'Abbiamo, Avete, Hanno'],
  relatedQuestions: ['italiano verbos'],
  equivalentQuestions: eqsPt(['essere'], ['avere', 'italiano']),
  commonErrors: [],
  sources: [],
})

export const itNumeri = lesson({
  id: 'it-numeri', subject: 'italiano', title: 'Numeri', levels: ['fund1'], grade: '6º ano',
  topic: 'Italiano A1', subtopic: 'Numbers 0-100',
  aliases: ['numeri', 'zero', 'uno', 'due', 'dieci'],
  summary: 'Números até 100.',
  intro: '0-20 memorizar, 20+ padrão.',
  objective: 'Contar em italiano.',
  next: [],
  skills: { num: 'Numeri' },
  blocks: [
    block('num', 'Zero a venti', '0=zero, 1=uno, 2=due, 3=tre, 4=quattro, 5=cinque, 6=sei, 7=sette, 8=otto, 9=nove, 10=dieci, 11=undici, 12=dodici, 13=tredici, 14=quattordici, 15=quindici, 16=sedici, 17=diciassette, 18=diciotto, 19=diciannove, 20=venti.', 'Undici=11 (especial).', 'Diciassette=17 (10+7).', 'Memorização.', '1. Qual 15?'),
    block('num', 'Venti a cento', '20=venti, 30=trenta, 40=quaranta, 50=cinquanta, 60=sessanta, 70=settanta, 80=ottanta, 90=novanta, 100=cento. 21=ventuno, 22=ventidue, 25=venticinque, etc.', '25=venticinque.', 'Padrão regular.', 'Fácil após 20.', '1. Qual 75?'),
  ],
  questions: [
    mc(1, 'num', 'Cinque = ?', ['quattro', 'cinque', 'sei'], 1, ['Cinco.'], 'cinque.'),
    tf(1, 'num', 'Undici = 11.', true, ['11?'], 'Verdadeiro.'),
    fill(1, 'num', 'Due = ___.', ['2'], ['Dos.'], '2.'),
    mc(2, 'num', 'Venti = vinte?', ['18', '19', '20'], 2, ['Vinte.'], '20.'),
    order(2, 'num', 'Ordene.', ['tre', 'uno', 'due'], ['Menor.'], 'uno→due→tre.'),
  ],
  review: ['0-20: memorizar', '20-100: padrão', 'Undici (11)', 'Diciassette (17)'],
  relatedQuestions: ['italiano números'],
  equivalentQuestions: eqsPt(['numeri'], ['italiano números']),
  commonErrors: [],
  sources: [],
})

export const itFamiglia = lesson({
  id: 'it-famiglia', subject: 'italiano', title: 'La famiglia', levels: ['fund1'], grade: '6º ano',
  topic: 'Italiano A1', subtopic: 'Family',
  aliases: ['famiglia', 'padre', 'madre', 'fratello', 'sorella', 'nonna', 'nonno'],
  summary: 'Família em italiano.',
  intro: 'Chi è mio padre?',
  objective: 'Nomes de familiares.',
  next: [],
  skills: { fam: 'Famiglia' },
  blocks: [
    block('fam', 'La famiglia', 'Padre (pai). Madre (mãe). Fratello (irmão). Sorella (irmã). Nonno (avô). Nonna (avó). Figlio (filho). Figlia (filha). Cugino (primo). Cugina (prima). Marito (marido). Moglie (esposa).', 'Mio padre = meu pai.', 'Mia madre = minha mãe.', 'Possessivo.', '1. Quem sorella?'),
  ],
  questions: [
    mc(1, 'fam', 'Madre = ?', ['hermana', 'madre', 'tía'], 1, ['Mamá.'], 'madre.'),
    tf(1, 'fam', 'Fratello = irmão.', true, ['Hermano?'], 'Verdadeiro.'),
    fill(1, 'fam', 'Mio ___ = meu pai.', ['padre'], ['Papa.'], 'padre.'),
    mc(2, 'fam', 'Cugina = prima ou primo?', ['primo', 'prima'], 1, ['Feminino.'], 'prima.'),
    order(2, 'fam', 'Gerações.', ['Nonna', 'Madre', 'Figlia'], ['Maior.'], 'Nonna→Madre→Figlia.'),
  ],
  review: ['Padre, Madre', 'Fratello, Sorella', 'Nonno, Nonna', 'Figlio, Figlia'],
  relatedQuestions: ['italiano famiglia'],
  equivalentQuestions: eqsPt(['famiglia'], ['italia familia']),
  commonErrors: [],
  sources: [],
})
