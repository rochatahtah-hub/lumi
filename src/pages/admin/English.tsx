import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui'
import { COURSE, allUnits } from '../../content/english/course'
import { subjectById } from '../../content/subjects'
import { availableGames } from '../../games/content'
import { GAMES } from '../../games/registry'
import { qualityCheck } from '../../lib/quality'
import { allLessons, useAllLessons } from '../../lib/repo'
import { normalize } from '../../lib/text'
import { CEFR_LEVELS, type EnglishInfo, type EnglishSkill, type Lesson, type LessonGames } from '../../types'

const input = 'mt-1 w-full rounded-xl border border-cinza bg-white px-3 py-2 text-sm outline-none focus:border-laranja'
const Search = ({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) => (
  <input className={`${input} max-w-sm`} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
)
const Pill = ({ children, tone = 'cinza' }: { children: React.ReactNode; tone?: 'cinza' | 'ok' | 'aviso' }) => (
  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tone === 'ok' ? 'bg-sucesso-suave text-sucesso' : tone === 'aviso' ? 'bg-laranja-suave text-laranja-escuro' : 'bg-cinza/60 text-grafite'}`}>{children}</span>
)

/** Aba “Inglês”: a trilha completa com o estado de cada aula (pronta, em revisão, em produção) */
export function AdminEnglish() {
  const lessons = useAllLessons()
  const byId = new Map(lessons.map((l) => [l.id, l]))
  const planned = allUnits().flatMap((u) => u.lessons).filter((l) => !byId.has(l.id)).length
  const ready = lessons.filter((l) => l.english).length
  return (
    <div className="space-y-4">
      <Card>
        <p className="font-semibold">Curso de Inglês · trilha A1 → C1</p>
        <p className="mt-1 text-sm text-cinza-texto">{ready} aulas prontas · {planned} previstas “em produção” · {allUnits().length} unidades. A estrutura (níveis, seções, unidades e objetivos) fica em <code>src/content/english/course.ts</code> e é enviada ao banco pelo seed.</p>
      </Card>
      {COURSE.map((lv) => (
        <Card key={lv.id}>
          <p className="text-lg font-bold">{lv.id} · {lv.title}</p>
          <p className="text-sm text-cinza-texto">{lv.can}</p>
          {lv.sections.map((s) => (
            <div key={s.id} className="mt-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-cinza-texto">{s.title}</p>
              {s.units.map((u) => (
                <div key={u.id} className="mt-2 rounded-2xl border border-cinza p-3">
                  <p className="font-semibold">{u.title} <span className="font-normal text-cinza-texto">— {u.subtitle}</span></p>
                  <p className="text-xs text-cinza-texto">🎯 {u.objective}</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {u.lessons.map((cl) => {
                      const l = byId.get(cl.id)
                      const q = l ? qualityCheck(l, lessons) : undefined
                      return (
                        <li key={cl.id} className="flex flex-wrap items-center gap-2">
                          {l ? <Link to={`/admin/conteudos/${cl.id}`} className="font-medium text-laranja-escuro hover:underline">{cl.title}</Link> : <span className="text-cinza-texto">{cl.title}</span>}
                          {!l ? <Pill>em produção</Pill> : q?.ok ? <Pill tone="ok">oficial</Pill> : <Pill tone="aviso">em revisão</Pill>}
                          {l && <span className="text-xs text-cinza-texto">{l.questions.length} exercícios · {l.english?.vocabulary?.length ?? 0} palavras · {availableGames(l).length} jogos</span>}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </Card>
      ))}
    </div>
  )
}

/** Aba “Vocabulário”: todas as palavras do curso, com busca */
export function AdminVocabulary() {
  const [q, setQ] = useState('')
  const [lv, setLv] = useState('')
  const lessons = useAllLessons()
  const rows = useMemo(() => lessons.flatMap((l) => (l.english?.vocabulary ?? []).map((v) => ({ v, l }))), [lessons])
  const nq = normalize(q)
  const shown = rows.filter(({ v, l }) => (!lv || l.english?.cefr === lv) && (!nq || normalize(`${v.word} ${v.translation} ${v.definition}`).includes(nq)))
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <Search value={q} onChange={setQ} placeholder="Buscar palavra, tradução ou definição" />
        <select className={`${input} w-auto`} value={lv} onChange={(e) => setLv(e.target.value)}><option value="">Todos os níveis</option>{CEFR_LEVELS.map((x) => <option key={x}>{x}</option>)}</select>
        <span className="text-sm text-cinza-texto">{shown.length} de {rows.length} palavras</span>
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-offwhite text-left text-xs text-cinza-texto"><tr>{['Palavra', 'Tradução', 'Classe', 'Nível', 'Dif.', 'Exemplo', 'Aula'].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-cinza">
            {shown.slice(0, 400).map(({ v, l }) => (
              <tr key={`${l.id}-${v.word}`}>
                <td className="px-3 py-2 font-semibold">{v.word}</td><td className="px-3 py-2">{v.translation}</td><td className="px-3 py-2 text-cinza-texto">{v.pos}</td>
                <td className="px-3 py-2">{l.english?.cefr}</td><td className="px-3 py-2">{v.difficulty}</td><td className="px-3 py-2 text-cinza-texto">{v.example}</td>
                <td className="px-3 py-2"><Link to={`/admin/conteudos/${l.id}`} className="text-laranja-escuro hover:underline">{l.title}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

/** Aba “Gramática”: cada tópico com estrutura, formas e comparação */
export function AdminGrammar() {
  const lessons = useAllLessons().filter((l) => l.english?.grammar)
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {lessons.map((l) => {
        const g = l.english!.grammar!
        return (
          <Card key={l.id}>
            <div className="flex items-center justify-between gap-2"><p className="font-semibold">{g.name}</p><Pill>{l.english!.cefr}</Pill></div>
            <p className="mt-1 text-sm text-cinza-texto">{g.when}</p>
            <p className="mt-2 rounded-xl bg-grafite px-3 py-1.5 font-mono text-xs text-offwhite">{g.structure}</p>
            <p className="mt-2 text-xs"><b>+</b> {g.affirmative.join(' · ')}</p>
            <p className="text-xs"><b>−</b> {g.negative.join(' · ')}</p>
            <p className="text-xs"><b>?</b> {g.interrogative.join(' · ')}</p>
            <Link to={`/admin/conteudos/${l.id}`} className="mt-2 inline-block text-sm font-semibold text-laranja">Editar aula →</Link>
          </Card>
        )
      })}
    </div>
  )
}

/** Aba “Exercícios”: todas as questões, filtrando por matéria, tipo e dificuldade */
export function AdminExercises() {
  const [subject, setSubject] = useState('ingles')
  const [type, setType] = useState('')
  const [diff, setDiff] = useState('')
  const [q, setQ] = useState('')
  const lessons = useAllLessons().filter((l) => l.origin !== 'colado')
  const subjects = [...new Set(lessons.map((l) => l.subject))]
  const nq = normalize(q)
  const rows = lessons.filter((l) => !subject || l.subject === subject).flatMap((l) => l.questions.map((x) => ({ x, l })))
    .filter(({ x }) => (!type || x.type === type) && (!diff || String(x.difficulty) === diff) && (!nq || normalize(x.prompt).includes(nq)))
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2">
        <select className={`${input} w-auto`} value={subject} onChange={(e) => setSubject(e.target.value)}><option value="">Todas as matérias</option>{subjects.map((s) => <option key={s} value={s}>{subjectById(s)?.name}</option>)}</select>
        <select className={`${input} w-auto`} value={type} onChange={(e) => setType(e.target.value)}><option value="">Todos os tipos</option>{['mc', 'tf', 'fill', 'match', 'order', 'open'].map((t) => <option key={t}>{t}</option>)}</select>
        <select className={`${input} w-auto`} value={diff} onChange={(e) => setDiff(e.target.value)}><option value="">Todas as dificuldades</option><option value="1">Fácil</option><option value="2">Média</option><option value="3">Difícil</option></select>
        <Search value={q} onChange={setQ} placeholder="Buscar no enunciado" />
        <span className="text-sm text-cinza-texto">{rows.length} exercícios</span>
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-offwhite text-left text-xs text-cinza-texto"><tr>{['Enunciado', 'Tipo', 'Dif.', 'Habilidade', 'Aula'].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-cinza">
            {rows.slice(0, 400).map(({ x, l }) => (
              <tr key={`${l.id}-${x.id}`}>
                <td className="max-w-md px-3 py-2">{x.prompt}</td><td className="px-3 py-2">{x.type}</td><td className="px-3 py-2">{x.difficulty}</td>
                <td className="px-3 py-2 text-cinza-texto">{l.skills[x.skill] ?? x.skill}</td>
                <td className="px-3 py-2"><Link to={`/admin/conteudos/${l.id}`} className="text-laranja-escuro hover:underline">{l.title}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

/** Aba “Jogos”: quais jogos cada aula oferece (a partir do material da Base Oficial) */
export function AdminGames() {
  const lessons = useAllLessons().filter((l) => l.origin !== 'colado')
  const total = lessons.reduce((a, l) => a + availableGames(l).length, 0)
  return (
    <div className="space-y-3">
      <Card>
        <p className="font-semibold">{total} jogos disponíveis em {lessons.length} conteúdos</p>
        <p className="mt-1 text-sm text-cinza-texto">Um jogo aparece para a aula quando há material suficiente (ex.: 4 pares para a Memória, 5 questões para o Quiz, 3 alvos para o Mapa). O material extra de jogo é editado na própria aula, na seção “Inglês e jogos”.</p>
      </Card>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-offwhite text-left text-xs text-cinza-texto"><tr><th className="px-3 py-2">Conteúdo</th>{GAMES.map((g) => <th key={g.id} className="px-1 py-2 text-center" title={g.name}>{g.emoji}</th>)}</tr></thead>
          <tbody className="divide-y divide-cinza">
            {lessons.map((l) => {
              const av = new Set(availableGames(l))
              return (
                <tr key={l.id}>
                  <td className="px-3 py-1.5"><Link to={`/admin/conteudos/${l.id}`} className="hover:underline">{l.title}</Link> <span className="text-xs text-cinza-texto">{subjectById(l.subject)?.name}</span></td>
                  {GAMES.map((g) => <td key={g.id} className="px-1 py-1.5 text-center">{av.has(g.id) ? <Link to={`/jogos/${g.id}/${l.id}`} className="text-sucesso" title={`Abrir ${g.name}`}>●</Link> : <span className="text-cinza">·</span>}</td>)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

const AREAS: EnglishInfo['area'][] = ['vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing', 'pronunciation', 'review']
const SKILLS: EnglishSkill[] = ['reading', 'writing', 'listening', 'speaking', 'vocabulary', 'grammar']

/** campo JSON com validação (para as partes estruturadas de Inglês e dos jogos) */
function JsonField({ label, value, onChange, disabled, hint }: { label: string; value: unknown; onChange: (v: unknown) => void; disabled?: boolean; hint: string }) {
  const [text, setText] = useState(() => (value === undefined ? '' : JSON.stringify(value, null, 2)))
  const [err, setErr] = useState('')
  return (
    <label className="block text-sm font-medium">{label} <span className="font-normal text-cinza-texto">— {hint}</span>
      <textarea className={`${input} font-mono text-xs`} rows={Math.min(14, Math.max(3, text.split('\n').length))} value={text} disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => { if (!text.trim()) { setErr(''); return onChange(undefined) } try { onChange(JSON.parse(text)); setErr('') } catch (e) { setErr(e instanceof Error ? e.message : 'JSON inválido') } }} />
      {err && <span className="text-xs text-erro">JSON inválido: {err}</span>}
    </label>
  )
}

/** seção do formulário de aula: dados do Curso de Inglês (só para Inglês) e material dos jogos (qualquer matéria) */
export function EnglishGamesEditor({ lesson, set, readOnly }: { lesson: Lesson; set: (p: Partial<Lesson>) => void; readOnly: boolean }) {
  const e = lesson.english
  const setE = (p: Partial<EnglishInfo>) => set({ english: { cefr: 'A1', unit: '', order: 1, area: 'grammar', focus: [], ...e, ...p } })
  const setG = (p: Partial<LessonGames>) => set({ games: { ...lesson.games, ...p } })
  return (
    <Card>
      <p className="font-semibold">Inglês e jogos</p>
      <p className="text-xs text-cinza-texto">Nível, unidade e atividades do curso; material extra dos jogos (palavras, pares, sequências, frases, diálogos, mapa). Tudo passa pela revisão e fica no histórico.</p>
      <fieldset disabled={readOnly} className="mt-3 grid gap-3">
        {lesson.subject === 'ingles' && (
          <>
            <div className="grid gap-3 sm:grid-cols-4">
              <label className="text-sm font-medium">Nível (CEFR)<select className={input} value={e?.cefr ?? ''} onChange={(x) => setE({ cefr: x.target.value as EnglishInfo['cefr'] })}><option value="">—</option>{CEFR_LEVELS.map((c) => <option key={c}>{c}</option>)}</select></label>
              <label className="text-sm font-medium sm:col-span-2">Unidade<select className={input} value={e?.unit ?? ''} onChange={(x) => setE({ unit: x.target.value })}><option value="">—</option>{allUnits().map((u) => <option key={u.id} value={u.id}>{u.level} · {u.title}</option>)}</select></label>
              <label className="text-sm font-medium">Ordem na unidade<input type="number" min={1} className={input} value={e?.order ?? 1} onChange={(x) => setE({ order: Number(x.target.value) })} /></label>
              <label className="text-sm font-medium">Área<select className={input} value={e?.area ?? 'grammar'} onChange={(x) => setE({ area: x.target.value as EnglishInfo['area'] })}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select></label>
              <div className="text-sm font-medium sm:col-span-3">Habilidades trabalhadas
                <div className="mt-1 flex flex-wrap gap-3">{SKILLS.map((s) => <label key={s} className="flex items-center gap-1 font-normal"><input type="checkbox" checked={!!e?.focus.includes(s)} onChange={(x) => setE({ focus: x.target.checked ? [...(e?.focus ?? []), s] : (e?.focus ?? []).filter((y) => y !== s) })} /> {s}</label>)}</div>
              </div>
            </div>
            <label className="text-sm font-medium">Mini desafio<input className={input} value={e?.challenge ?? ''} onChange={(x) => setE({ challenge: x.target.value })} /></label>
            <label className="text-sm font-medium">Dicas (uma por linha)<textarea className={input} rows={2} value={(e?.tips ?? []).join('\n')} onChange={(x) => setE({ tips: x.target.value.split('\n') })} /></label>
            <JsonField label="Vocabulário" value={e?.vocabulary} onChange={(v) => setE({ vocabulary: v as EnglishInfo['vocabulary'] })} hint='lista de { word, translation, pos, definition, example, difficulty, pronunciation?, synonyms?… }' />
            <JsonField label="Gramática" value={e?.grammar} onChange={(v) => setE({ grammar: v as EnglishInfo['grammar'] })} hint='{ name, when, structure, affirmative[], negative[], interrogative[], compare?, context? }' />
            <JsonField label="Reading" value={e?.reading} onChange={(v) => setE({ reading: v as EnglishInfo['reading'] })} hint='{ title, genre, text, questions: [{ prompt, options[], answer, explanation, difficulty }] }' />
            <JsonField label="Listening" value={e?.listening} onChange={(v) => setE({ listening: v as EnglishInfo['listening'] })} hint='{ title, kind, script[] (roteiro original), rate?, audioUrl? (só com licença), questions[] }' />
            <JsonField label="Speaking" value={e?.speaking} onChange={(v) => setE({ speaking: v as EnglishInfo['speaking'] })} hint='{ situation, vocabulary[], phrases[], example, challenge, expected[] }' />
            <JsonField label="Writing" value={e?.writing} onChange={(v) => setE({ writing: v as EnglishInfo['writing'] })} hint='{ prompt, criteria[], model, keywords[], minWords }' />
          </>
        )}
        <JsonField label="Palavras do caça-palavras" value={lesson.games?.words} onChange={(v) => setG({ words: v as LessonGames['words'] })} hint='[{ word, clue, difficulty }]' />
        <JsonField label="Pares (memória / ligue)" value={lesson.games?.pairs} onChange={(v) => setG({ pairs: v as LessonGames['pairs'] })} hint='[{ a, b, difficulty, speak? }]' />
        <JsonField label="Sequências" value={lesson.games?.sequences} onChange={(v) => setG({ sequences: v as LessonGames['sequences'] })} hint='[{ prompt, items[] na ordem certa, difficulty, explanation, words? }]' />
        <JsonField label="Frases para completar" value={lesson.games?.blanks} onChange={(v) => setG({ blanks: v as LessonGames['blanks'] })} hint='[{ sentence com ___, options[], answer, explanation, difficulty }]' />
        <JsonField label="Diálogos" value={lesson.games?.dialogues} onChange={(v) => setG({ dialogues: v as LessonGames['dialogues'] })} hint='[{ title, lines: [{ who, text }], gap, options[], answer, explanation, difficulty }]' />
        <JsonField label="Mapa" value={lesson.games?.map} onChange={(v) => setG({ map: v as LessonGames['map'] })} hint='{ map: mundo|europa|america-sul|brasil, prompt, targets: [{ id, label, clue?, difficulty }], groups? } — ids reais do mapa' />
        <p className="text-xs text-cinza-texto">Jogos que esta aula oferece hoje: {availableGames(lesson).map((g) => GAMES.find((x) => x.id === g)?.emoji).join(' ') || 'nenhum'}</p>
      </fieldset>
    </Card>
  )
}

export const englishLessonCount = () => allLessons().filter((l) => l.english).length
