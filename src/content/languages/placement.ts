// Nivelamento de Espanhol e Francês (perguntas originais do LUMI). Resultado = estimativa, nunca certificação.
import type { PlacementItem } from '../english/placement'

export const ES_PLACEMENT: PlacementItem[] = [
  // A1
  { level: 'A1', difficulty: 1, prompt: 'Hola, yo ______ Ana. Soy de Brasil.', options: ['se llama', 'me llamo', 'te llamas', 'llamo'], answer: 1, explanation: 'Com “yo”, o verbo llamarse fica “me llamo”.' },
  { level: 'A1', difficulty: 1, prompt: '— ¿De dónde eres? — ______', options: ['Estoy bien, gracias.', 'Tengo quince años.', 'Soy de México.', 'Me llamo Pedro.'], answer: 2, explanation: '“¿De dónde eres?” pergunta a origem: “Soy de México”.' },
  { level: 'A1', difficulty: 1, prompt: 'Ella ______ dos hermanos.', options: ['tengo', 'tienes', 'tienen', 'tiene'], answer: 3, explanation: 'Tener com “ella”: tiene.' },
  // A2
  { level: 'A2', difficulty: 2, prompt: 'Ayer ______ al cine con mis amigos.', options: ['fui', 'voy', 'iré', 'he ido mañana'], answer: 0, explanation: '“Ayer” pede o pretérito indefinido: fui.' },
  { level: 'A2', difficulty: 2, prompt: 'Este libro es ______ interesante que aquel.', options: ['muy', 'más', 'tan', 'mucho'], answer: 1, explanation: 'Comparação de superioridade: más + adjetivo + que.' },
  { level: 'A2', difficulty: 2, prompt: 'Todos los días ______ a las siete. (levantarse)', options: ['levanto', 'se levanto', 'me levanto', 'me levantas'], answer: 2, explanation: 'Verbo reflexivo com “yo”: me levanto.' },
  // B1
  { level: 'B1', difficulty: 2, prompt: 'Espero que ______ buen tiempo el sábado.', options: ['hace', 'haga', 'hará', 'hacía'], answer: 1, explanation: '“Espero que” expressa desejo e pede o subjuntivo: haga.' },
  { level: 'B1', difficulty: 3, prompt: 'Si tuviera dinero, ______ por el mundo.', options: ['viajo', 'viajaré', 'viajaba', 'viajaría'], answer: 3, explanation: 'Hipótese irreal: si + imperfecto de subjuntivo, condicional (viajaría).' },
  { level: 'B1', difficulty: 2, prompt: 'Mi hermano me dijo que ______ cansado.', options: ['estaba', 'está mañana', 'estará ayer', 'estoy'], answer: 0, explanation: 'Estilo indireto no passado: “dijo que estaba”.' },
  // B2
  { level: 'B2', difficulty: 3, prompt: 'Si me lo ______ dicho, habría venido.', options: ['habías', 'hubieras', 'habrías', 'has'], answer: 1, explanation: 'Condicional do passado: si + pluscuamperfecto de subjuntivo (hubieras dicho).' },
  { level: 'B2', difficulty: 3, prompt: 'Cuidado com o falso amigo: em espanhol, “exquisito” significa…', options: ['estranho', 'delicioso, muito gostoso', 'exagerado', 'caro'], answer: 1, explanation: '“Exquisito” = delicioso. “Esquisito” em português seria “raro” em espanhol.' },
  { level: 'B2', difficulty: 3, prompt: 'No creo que él ______ razón.', options: ['tenga', 'tiene', 'tendrá', 'tenía'], answer: 0, explanation: '“No creo que” expressa dúvida e pede o subjuntivo: tenga.' },
  // C1
  { level: 'C1', difficulty: 3, prompt: '“¡Qué puntual! Solo llegaste dos horas tarde.” A intenção da frase é…', options: ['um elogio sincero', 'uma pergunta', 'ironia', 'um pedido de desculpas'], answer: 2, explanation: 'Elogiar a pontualidade de quem chegou duas horas atrasado é ironia.' },
  { level: 'C1', difficulty: 3, prompt: 'Elija el conector más formal: “______, los datos indican lo contrario.”', options: ['Pero', 'No obstante', 'Y', 'Bueno'], answer: 1, explanation: '“No obstante” é o conector adversativo de registro formal.' },
  { level: 'C1', difficulty: 3, prompt: 'Por mucho que ______, no lo convencerás.', options: ['insistes', 'insistirás', 'insistías', 'insistas'], answer: 3, explanation: '“Por mucho que” (concessiva) pede o subjuntivo: insistas.' },
]

export const IT_PLACEMENT: PlacementItem[] = [
  // A1
  { level: 'A1', difficulty: 1, prompt: 'Ciao, io ______ Luca.', options: ['ti chiami', 'mi chiamo', 'si chiama', 'chiamo'], answer: 1, explanation: 'Chiamarsi com “io”: mi chiamo.' },
  { level: 'A1', difficulty: 1, prompt: 'Noi ______ brasiliani.', options: ['siete', 'sono', 'siamo', 'sei'], answer: 2, explanation: 'Essere com “noi”: siamo.' },
  { level: 'A1', difficulty: 1, prompt: 'Em “chiesa”, o grupo “ch” soa como…', options: ['“x” (chiado)', '“k” (como em “casa”)', '“tch”', '“s”'], answer: 1, explanation: 'Em italiano, “ch” antes de e/i soa como “k”: chiesa = “kiéza”.' },
  // A2
  { level: 'A2', difficulty: 2, prompt: 'Ieri ______ al cinema con Marco.', options: ['vado', 'andrò', 'sono andato', 'andavo domani'], answer: 2, explanation: 'Ação concluída no passado: passato prossimo (sono andato/a).' },
  { level: 'A2', difficulty: 2, prompt: 'Da bambino ______ sempre al parco.', options: ['giocavo', 'ho giocato una volta', 'giocherò', 'gioco'], answer: 0, explanation: 'Hábito no passado: imperfetto (giocavo).' },
  { level: 'A2', difficulty: 2, prompt: 'Roma è ______ grande di Firenze.', options: ['molto', 'troppo', 'più', 'tanto'], answer: 2, explanation: 'Comparativo de superioridade: più + adjetivo + di.' },
  // B1
  { level: 'B1', difficulty: 2, prompt: 'Penso che lui ______ ragione.', options: ['ha', 'abbia', 'avrà', 'aveva'], answer: 1, explanation: '“Penso che” expressa opinião e pede o congiuntivo: abbia.' },
  { level: 'B1', difficulty: 3, prompt: 'Se avessi tempo, ______ l’italiano ogni giorno.', options: ['studio', 'studierò', 'studiavo', 'studierei'], answer: 3, explanation: 'Período hipotético: se + congiuntivo imperfetto, condizionale (studierei).' },
  { level: 'B1', difficulty: 2, prompt: 'Il libro? ______ ho già letto.', options: ['Lo', 'Gli', 'Le', 'Ne'], answer: 0, explanation: 'Pronome direto masculino singular: lo (l’ho già letto).' },
  // B2
  { level: 'B2', difficulty: 3, prompt: 'Benché ______ tardi, continuiamo a lavorare.', options: ['è', 'sarà', 'sia', 'era'], answer: 2, explanation: '“Benché” pede o congiuntivo: sia.' },
  { level: 'B2', difficulty: 3, prompt: 'Cuidado com o falso amigo: em italiano, “burro” significa…', options: ['manteiga', 'burro (animal)', 'pessoa ignorante', 'cenoura'], answer: 0, explanation: '“Burro” = manteiga. O animal é “asino”.' },
  { level: 'B2', difficulty: 3, prompt: 'Mi ha detto che ______ il giorno dopo.', options: ['verrà', 'sarebbe venuto', 'viene', 'veniva ieri'], answer: 1, explanation: 'Discurso indireto no passado: o futuro vira condizionale passato (sarebbe venuto).' },
  // C1
  { level: 'C1', difficulty: 3, prompt: '«Che bella sorpresa: di nuovo in ritardo!» Il tono è…', options: ['ammirato', 'neutro', 'ironico', 'interrogativo'], answer: 2, explanation: 'Fingir alegria com um atraso repetido é ironia.' },
  { level: 'C1', difficulty: 3, prompt: 'Scegli la frase di registro formale.', options: ['Boh, non lo so.', 'Non saprei dirLe.', 'Che ne so io?', 'Mah, vediamo.'], answer: 1, explanation: '“Non saprei dirLe” usa o condizionale e o “Lei” de cortesia: registro formal.' },
  { level: 'C1', difficulty: 3, prompt: 'Qualora ______ problemi, La preghiamo di contattarci.', options: ['ci sono', 'ci saranno', 'ci fossero', 'ci erano'], answer: 2, explanation: '“Qualora” (caso) pede o congiuntivo: ci fossero.' },
]

export const FR_PLACEMENT: PlacementItem[] = [
  // A1
  { level: 'A1', difficulty: 1, prompt: 'Bonjour, je ______ Marie.', options: ['m’appelle', 't’appelles', 's’appelle', 'appelle'], answer: 0, explanation: 'S’appeler com “je”: je m’appelle.' },
  { level: 'A1', difficulty: 1, prompt: 'Nous ______ brésiliens.', options: ['êtes', 'sont', 'sommes', 'suis'], answer: 2, explanation: 'Être com “nous”: nous sommes.' },
  { level: 'A1', difficulty: 1, prompt: 'Na palavra “Paris”, o “s” final…', options: ['soa como “s”', 'não é pronunciado', 'soa como “z”', 'soa como “x”'], answer: 1, explanation: 'Em francês, a consoante final costuma ser muda: “Pari”.' },
  // A2
  { level: 'A2', difficulty: 2, prompt: 'Hier, je ______ au cinéma.', options: ['vais', 'irai', 'suis allé', 'allais demain'], answer: 2, explanation: 'Ação concluída no passado (“hier”): passé composé, “je suis allé(e)”.' },
  { level: 'A2', difficulty: 2, prompt: 'Quand j’étais petit, je ______ au foot tous les jours.', options: ['jouais', 'ai joué une fois', 'jouerai', 'joue'], answer: 0, explanation: 'Hábito no passado: imparfait (je jouais).' },
  { level: 'A2', difficulty: 2, prompt: 'Elle est ______ grande que sa sœur.', options: ['très', 'beaucoup', 'trop', 'plus'], answer: 3, explanation: 'Comparativo de superioridade: plus + adjetivo + que.' },
  // B1
  { level: 'B1', difficulty: 2, prompt: 'Il faut que tu ______ tes devoirs.', options: ['fais', 'fasses', 'feras', 'faisais'], answer: 1, explanation: '“Il faut que” pede o subjonctif: que tu fasses.' },
  { level: 'B1', difficulty: 3, prompt: 'Si j’avais le temps, j’______ le piano.', options: ['apprends', 'apprendrai', 'apprendrais', 'ai appris'], answer: 2, explanation: 'Hipótese: si + imparfait, conditionnel (j’apprendrais).' },
  { level: 'B1', difficulty: 3, prompt: 'Le livre ______ je te parle est génial.', options: ['que', 'dont', 'qui', 'où'], answer: 1, explanation: '“Parler de quelque chose”: o relativo que substitui “de + nome” é “dont”.' },
  // B2
  { level: 'B2', difficulty: 3, prompt: 'Bien qu’il ______ tard, nous continuons.', options: ['est', 'sera', 'était', 'soit'], answer: 3, explanation: '“Bien que” pede o subjonctif: soit.' },
  { level: 'B2', difficulty: 3, prompt: 'Cuidado com o falso amigo: em francês, “librairie” significa…', options: ['biblioteca', 'livraria', 'liberdade', 'livro'], answer: 1, explanation: '“Librairie” = livraria (loja). Biblioteca é “bibliothèque”.' },
  { level: 'B2', difficulty: 3, prompt: 'Il m’a dit qu’il ______ le lendemain.', options: ['viendrait', 'viendra', 'vient', 'venait hier'], answer: 0, explanation: 'Discours indirect no passado: futuro vira conditionnel (viendrait).' },
  // C1
  { level: 'C1', difficulty: 3, prompt: '« Quelle surprise ! Encore en retard. » Le ton est…', options: ['admiratif', 'neutre', 'ironique', 'interrogatif'], answer: 2, explanation: 'Fingir surpresa com um atraso repetido é ironia.' },
  { level: 'C1', difficulty: 3, prompt: 'Choisissez la phrase au registre soutenu (formal).', options: ['J’sais pas.', 'Je sais pas trop.', 'Sais pas, moi.', 'Je ne saurais vous le dire.'], answer: 3, explanation: '“Je ne saurais vous le dire” é registro formal (soutenu).' },
  { level: 'C1', difficulty: 3, prompt: '« Je vous prie d’agréer, Madame, l’expression de mes salutations distinguées. » Cette phrase sert à…', options: ['fechar uma carta formal', 'pedir desculpas', 'fazer um convite', 'reclamar de algo'], answer: 0, explanation: 'É uma fórmula tradicional de encerramento de cartas e e-mails formais.' },
]
