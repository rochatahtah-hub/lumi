import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, History, Plus, Save, Trash2 } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Spinner } from '../../components/ui'
import { LEVELS, SUBJECTS, subjectById } from '../../content/subjects'
import { refreshCloudLessons } from '../../lib/repo'
import { validateQuestion } from '../../lib/validate'
import { SOURCE_KINDS, type Block, type Lesson, type LevelId, type Question, type ReexplainMode, type SourceKind, type SubjectId } from '../../types'
import { listLessons, lessonVersions, loadLesson, localMode, promoteAiFound, rejectAiFound, saveLesson, setLessonStatus, type AiFound, type LessonRow, type LessonStatus } from './api'

export const SOURCE_LABEL: Record<SourceKind, string> = { curriculo: 'Currículo', livro: 'Livro', material: 'Material didático', site: 'Site educacional', instituicao: 'Instituição', video: 'Vídeo', canal: 'Canal educativo', autoral: 'Autoral', ia: 'Pesquisa da IA' }

const STATUS: Record<LessonStatus, { label: string; cls: string }> = {
  draft: { label: 'Rascunho', cls: 'bg-cinza text-grafite' },
  in_review: { label: 'Em revisão', cls: 'bg-laranja-suave text-laranja-escuro' },
  published: { label: 'Publicada', cls: 'bg-sucesso-suave text-sucesso' },
  archived: { label: 'Arquivada', cls: 'bg-offwhite text-cinza-texto' },
}
const input = 'w-full rounded-xl border-2 border-cinza bg-white px-3 py-2 text-sm outline-none focus:border-laranja disabled:bg-offwhite'

export default function AdminLessons() {
  const nav = useNavigate()
  const [rows, setRows] = useState<LessonRow[] | null>(null)
  const [filter, setFilter] = useState({ q: '', subject: '', status: '' })
  useEffect(() => { listLessons().then(setRows).catch(() => setRows([])) }, [])
  if (!rows) return <Spinner label="Carregando conteúdos…" />
  const shown = rows.filter((r) => (!filter.subject || r.subject_id === filter.subject) && (!filter.status || r.status === filter.status) && r.title.toLowerCase().includes(filter.q.toLowerCase()))

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input className={`${input} max-w-xs`} placeholder="Buscar aula…" value={filter.q} onChange={(e) => setFilter({ ...filter, q: e.target.value })} />
        <select className={`${input} w-auto`} value={filter.subject} onChange={(e) => setFilter({ ...filter, subject: e.target.value })}>
          <option value="">Todas as matérias</option>
          {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select className={`${input} w-auto`} value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
          <option value="">Todos os status</option>
          {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        {!localMode && <Button className="ml-auto !min-h-10 !py-2" onClick={() => nav('/admin/conteudos/nova')}><Plus size={16} /> Nova aula</Button>}
      </div>
      <Card className="mt-4 p-0">
        <ul className="divide-y divide-cinza">
          {shown.map((r) => (
            <li key={r.id}>
              <Link to={`/admin/conteudos/${r.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-offwhite">
                <span className="flex-1">
                  <span className="block font-medium">{r.title}</span>
                  <span className="block text-xs text-cinza-texto">{subjectById(r.subject_id)?.name} · {r.origin} · v{r.version}{r.updated_at ? ` · ${new Date(r.updated_at).toLocaleDateString('pt-BR')}` : ''}</span>
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS[r.status].cls}`}>{STATUS[r.status].label}</span>
              </Link>
            </li>
          ))}
          {!shown.length && <li className="p-4 text-sm text-cinza-texto">Nenhuma aula encontrada.</li>}
        </ul>
      </Card>
    </div>
  )
}

const blank = (): Lesson => ({
  id: `admin-${crypto.randomUUID().slice(0, 8)}`, subject: 'matematica', title: '', levels: ['fund2'], grade: '', aliases: [], summary: '', intro: 'Vamos entender juntos.',
  blocks: [{ id: 'b1', title: '', text: '', skill: 'geral' }], questions: [], skills: { geral: 'Geral' }, review: [], sources: [],
})

const newQuestion = (type: Question['type'], n: number, skill: string): Question => {
  const base = { id: `q${n}`, difficulty: 2 as const, skill, hints: ['', '', ''] as [string, string, string], explanation: '', prompt: '' }
  switch (type) {
    case 'mc': return { ...base, type, options: ['', '', '', ''], answer: 0 }
    case 'tf': return { ...base, type, answer: true }
    case 'fill': return { ...base, type, answers: [''] }
    case 'match': return { ...base, type, pairs: [['', ''], ['', ''], ['', '']] }
    case 'open': return { ...base, type, modelAnswer: '', keywords: [] }
    case 'order': return { ...base, type, items: ['', '', ''] }
  }
}

/**
 * Editor completo de uma aula. Em modo de revisão de conteúdo da IA (aiItem), o botão principal vira
 * "Adicionar à base oficial" — o conteúdo revisado é publicado e passa a responder os alunos pela base.
 */
export function AdminLessonEditor({ aiItem, onDone }: { aiItem?: AiFound; onDone?: () => void } = {}) {
  const params = useParams()
  const id = aiItem ? '' : params.id ?? ''
  const nav = useNavigate()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [rejectNotes, setRejectNotes] = useState('')
  const [status, setStatus] = useState<LessonStatus>('draft')
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const [versions, setVersions] = useState<Awaited<ReturnType<typeof lessonVersions>> | null>(null)
  const readOnly = localMode

  useEffect(() => {
    if (aiItem) {
      const slug = aiItem.topic.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)
      setLesson({ ...blank(), ...aiItem.content, id: aiItem.lesson_id ?? `ia-${slug}-${aiItem.id.slice(0, 6)}`, sources: (aiItem.content.sources ?? []).filter((x) => x.kind !== 'ia') })
      setStatus('in_review')
      return
    }
    if (id === 'nova') return setLesson(blank())
    loadLesson(id).then((l) => {
      if (!l) return setMsg({ ok: false, text: 'Aula não encontrada.' })
      setLesson(l)
      setStatus((l as { status?: LessonStatus }).status ?? 'published')
    })
  }, [id, aiItem])

  const problems = useMemo(() => {
    if (!lesson) return []
    const p: string[] = []
    if (!lesson.title.trim()) p.push('Título vazio')
    if (!lesson.blocks.some((b) => b.title && b.text)) p.push('Pelo menos 1 bloco completo')
    lesson.blocks.forEach((b, i) => { if (!b.title || !b.text) p.push(`Bloco ${i + 1} incompleto`) })
    lesson.questions.forEach((q, i) => {
      if (!validateQuestion(q, q.id)) p.push(`Questão ${i + 1} incompleta`)
      if (q.hints.some((h) => !h.trim())) p.push(`Questão ${i + 1}: faltam dicas (3 níveis)`)
      if (!lesson.skills[q.skill]) p.push(`Questão ${i + 1}: habilidade "${q.skill}" não cadastrada`)
    })
    if (lesson.questions.length < 3) p.push('Pelo menos 3 questões')
    return p
  }, [lesson])

  if (!lesson) return msg ? <Card><p className="text-erro">{msg.text}</p></Card> : <Spinner label="Abrindo aula…" />
  const set = (patch: Partial<Lesson>) => setLesson({ ...lesson, ...patch })
  const setBlock = (i: number, patch: Partial<Block>) => set({ blocks: lesson.blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)) })
  const setQ = (i: number, patch: Partial<Question>) => set({ questions: lesson.questions.map((q, j) => (j === i ? ({ ...q, ...patch } as Question) : q)) })
  const move = <T,>(arr: T[], i: number, d: number) => { const a = [...arr]; const [x] = a.splice(i, 1); a.splice(i + d, 0, x); return a }
  const skillIds = Object.keys(lesson.skills)

  const promote = async () => {
    if (!aiItem) return
    if (problems.length) return setMsg({ ok: false, text: 'Corrija os itens pendentes antes de adicionar à base oficial.' })
    setSaving(true)
    try {
      const lessonId = await promoteAiFound(aiItem.id, { ...lesson, blocks: lesson.blocks.map((b, i) => ({ ...b, id: `b${i + 1}` })) })
      void refreshCloudLessons(true)
      onDone?.()
      nav(`/admin/conteudos/${lessonId}`, { replace: true })
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : 'Erro ao adicionar.' })
    } finally {
      setSaving(false)
    }
  }

  const save = async (nextStatus?: LessonStatus) => {
    if (nextStatus === 'published' && problems.length) return setMsg({ ok: false, text: 'Corrija os itens pendentes antes de publicar.' })
    setSaving(true)
    setMsg(null)
    try {
      const clean = { ...lesson, blocks: lesson.blocks.map((b, i) => ({ ...b, id: `b${i + 1}` })) }
      await saveLesson(clean, nextStatus)
      if (nextStatus) setStatus(nextStatus)
      setMsg({ ok: true, text: nextStatus === 'published' ? 'Publicada — os alunos recebem na próxima abertura do app.' : 'Salvo. A versão anterior ficou no histórico.' })
      void refreshCloudLessons(true)
      if (id === 'nova') nav(`/admin/conteudos/${lesson.id}`, { replace: true })
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : 'Erro ao salvar.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4 pb-24">
      <div className="flex flex-wrap items-center gap-2">
        {!aiItem && <Link to="/admin/conteudos" className="text-sm text-cinza-texto hover:text-grafite">← Conteúdos</Link>}
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS[status].cls}`}>{STATUS[status].label}</span>
        {!readOnly && !aiItem && id !== 'nova' && (
          <button className="ml-auto flex items-center gap-1 text-sm text-cinza-texto hover:text-grafite" onClick={async () => setVersions(await lessonVersions(lesson.id))}><History size={16} /> Histórico</button>
        )}
      </div>

      {versions && (
        <Card>
          <p className="font-semibold">Versões anteriores</p>
          <p className="text-xs text-cinza-texto">O histórico nunca é apagado. Carregar uma versão e salvar cria uma versão nova.</p>
          {!versions.length && <p className="text-sm text-cinza-texto">Nenhuma versão anterior.</p>}
          <ul className="mt-2 divide-y divide-cinza text-sm">
            {versions.map((v) => (
              <li key={`${v.version}-${v.saved_at}`} className="flex items-center justify-between gap-3 py-2">
                <span>Versão {v.version} · substituída em {new Date(v.saved_at).toLocaleString('pt-BR')} por {v.saved_by_email}</span>
                <button className="font-semibold text-laranja" onClick={() => { setLesson({ ...v.content, id: lesson.id }); setVersions(null); setMsg({ ok: true, text: `Versão ${v.version} carregada no editor. Salve para restaurar.` }) }}>Carregar</button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card>
        <fieldset disabled={readOnly} className="grid gap-3 sm:grid-cols-2">
          <label className="sm:col-span-2 text-sm font-medium">Título<input className={input} value={lesson.title} onChange={(e) => set({ title: e.target.value })} /></label>
          <label className="text-sm font-medium">Matéria
            <select className={input} value={lesson.subject} onChange={(e) => set({ subject: e.target.value as SubjectId })}>{SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
          </label>
          <label className="text-sm font-medium">Série/ano (texto)<input className={input} value={lesson.grade} onChange={(e) => set({ grade: e.target.value })} placeholder="ex.: 6º e 7º ano" /></label>
          <div className="sm:col-span-2 text-sm font-medium">Níveis
            <div className="mt-1 flex flex-wrap gap-3">{LEVELS.map((l) => (
              <label key={l.id} className="flex items-center gap-1.5 font-normal"><input type="checkbox" checked={lesson.levels.includes(l.id)} onChange={(e) => set({ levels: e.target.checked ? [...lesson.levels, l.id] : lesson.levels.filter((x) => x !== l.id) as LevelId[] })} /> {l.label}</label>
            ))}</div>
          </div>
          <label className="text-sm font-medium">Assunto<input className={input} value={lesson.topic ?? ''} onChange={(e) => set({ topic: e.target.value })} placeholder="ex.: Plantas" /></label>
          <label className="text-sm font-medium">Subassunto<input className={input} value={lesson.subtopic ?? ''} onChange={(e) => set({ subtopic: e.target.value })} placeholder="ex.: Fotossíntese" /></label>
          <label className="sm:col-span-2 text-sm font-medium">Perguntas relacionadas (uma por linha — do jeito que os alunos perguntam)<textarea className={input} rows={3} value={(lesson.relatedQuestions ?? []).join('\n')} onChange={(e) => set({ relatedQuestions: e.target.value.split('\n') })} placeholder="Como as plantas produzem seu próprio alimento?" /></label>
          <label className="sm:col-span-2 text-sm font-medium">Palavras-chave e sinônimos (separados por vírgula)<input className={input} value={lesson.aliases.join(', ')} onChange={(e) => set({ aliases: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) })} /></label>
          <label className="sm:col-span-2 text-sm font-medium">Resumo<textarea className={input} rows={2} value={lesson.summary} onChange={(e) => set({ summary: e.target.value })} /></label>
          <label className="sm:col-span-2 text-sm font-medium">Introdução<textarea className={input} rows={2} value={lesson.intro} onChange={(e) => set({ intro: e.target.value })} /></label>
          <label className="sm:col-span-2 text-sm font-medium">Pontos de revisão (um por linha)<textarea className={input} rows={3} value={lesson.review.join('\n')} onChange={(e) => set({ review: e.target.value.split('\n') })} /></label>
        </fieldset>
      </Card>

      <Card>
        <p className="font-semibold">Habilidades</p>
        <p className="text-xs text-cinza-texto">Ligam blocos e questões — usadas na revisão automática e no relatório "Você foi bem em / Vamos revisar".</p>
        <fieldset disabled={readOnly} className="mt-2 space-y-2">
          {skillIds.map((k) => (
            <div key={k} className="flex gap-2">
              <input className={`${input} w-40 font-mono`} value={k} readOnly />
              <input className={input} value={lesson.skills[k]} onChange={(e) => set({ skills: { ...lesson.skills, [k]: e.target.value } })} />
            </div>
          ))}
          <button className="text-sm font-semibold text-laranja" onClick={() => { const k = prompt('Identificador curto (sem espaço):')?.trim(); if (k) set({ skills: { ...lesson.skills, [k]: k } }) }}>+ Habilidade</button>
        </fieldset>
      </Card>

      <Card>
        <p className="font-semibold">Fontes</p>
        <p className="text-xs text-cinza-texto">Livros, materiais didáticos, sites educacionais, instituições, vídeos e canais usados neste conteúdo.</p>
        <fieldset disabled={readOnly} className="mt-2 space-y-2">
          {(lesson.sources ?? []).map((src, i) => (
            <div key={i} className="flex flex-wrap gap-2">
              <select className={`${input} w-auto`} value={src.kind} onChange={(e) => set({ sources: (lesson.sources ?? []).map((x, j) => (j === i ? { ...x, kind: e.target.value as SourceKind } : x)) })}>
                {SOURCE_KINDS.map((k) => <option key={k} value={k}>{SOURCE_LABEL[k]}</option>)}
              </select>
              <input className={`${input} min-w-40 flex-1`} placeholder="Título / nome da fonte" value={src.title} onChange={(e) => set({ sources: (lesson.sources ?? []).map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) })} />
              <input className={`${input} min-w-40 flex-1`} placeholder="Link (opcional)" value={src.url ?? ''} onChange={(e) => set({ sources: (lesson.sources ?? []).map((x, j) => (j === i ? { ...x, url: e.target.value || undefined } : x)) })} />
              <IconBtn label="Remover fonte" onClick={() => set({ sources: (lesson.sources ?? []).filter((_, j) => j !== i) })}><Trash2 size={16} /></IconBtn>
            </div>
          ))}
          <button className="text-sm font-semibold text-laranja" onClick={() => set({ sources: [...(lesson.sources ?? []), { title: '', kind: 'site' }] })}>+ Fonte</button>
        </fieldset>
      </Card>

      <h2 className="pt-2 text-lg font-semibold">Blocos da explicação</h2>
      {lesson.blocks.map((b, i) => (
        <Card key={i}>
          <fieldset disabled={readOnly} className="grid gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Bloco {i + 1}</span>
              <select className={`${input} ml-auto w-auto`} value={b.skill ?? ''} onChange={(e) => setBlock(i, { skill: e.target.value })}>{skillIds.map((k) => <option key={k} value={k}>{lesson.skills[k]}</option>)}</select>
              <IconBtn label="Subir" onClick={() => i > 0 && set({ blocks: move(lesson.blocks, i, -1) })}><ArrowUp size={16} /></IconBtn>
              <IconBtn label="Descer" onClick={() => i < lesson.blocks.length - 1 && set({ blocks: move(lesson.blocks, i, 1) })}><ArrowDown size={16} /></IconBtn>
              <IconBtn label="Remover" onClick={() => set({ blocks: lesson.blocks.filter((_, j) => j !== i) })}><Trash2 size={16} /></IconBtn>
            </div>
            <input className={input} placeholder="Título" value={b.title} onChange={(e) => setBlock(i, { title: e.target.value })} />
            <textarea className={input} rows={3} placeholder="Explicação curta" value={b.text} onChange={(e) => setBlock(i, { text: e.target.value })} />
            <textarea className={input} rows={2} placeholder="Exemplo" value={b.example ?? ''} onChange={(e) => setBlock(i, { example: e.target.value })} />
            <details>
              <summary className="cursor-pointer text-sm text-cinza-texto">Reformulações do "Não entendi" ({Object.keys(b.variants ?? {}).length}/4)</summary>
              <div className="mt-2 grid gap-2">
                {(['simples', 'exemplo', 'outra', 'detalhado'] as ReexplainMode[]).map((m) => (
                  <label key={m} className="text-xs font-medium">{m}<textarea className={input} rows={2} value={b.variants?.[m] ?? ''} onChange={(e) => setBlock(i, { variants: { ...b.variants, [m]: e.target.value } })} /></label>
                ))}
              </div>
            </details>
          </fieldset>
        </Card>
      ))}
      {!readOnly && <Button variant="outline" onClick={() => set({ blocks: [...lesson.blocks, { id: '', title: '', text: '', skill: skillIds[0] }] })}><Plus size={16} /> Bloco</Button>}

      <h2 className="pt-2 text-lg font-semibold">Exercícios ({lesson.questions.length})</h2>
      {lesson.questions.map((q, i) => <QuestionEditor key={q.id + i} q={q} n={i + 1} skills={lesson.skills} readOnly={readOnly} onChange={(patch) => setQ(i, patch)} onRemove={() => set({ questions: lesson.questions.filter((_, j) => j !== i) })} />)}
      {!readOnly && (
        <div className="flex flex-wrap gap-2">
          {(['mc', 'tf', 'fill', 'match', 'order', 'open'] as const).map((t) => (
            <Button key={t} variant="outline" className="!min-h-10 !py-2 text-sm" onClick={() => {
              const n = Math.max(0, ...lesson.questions.map((q) => Number(q.id.replace(/\D/g, '')) || 0)) + 1
              set({ questions: [...lesson.questions, newQuestion(t, n, skillIds[0] ?? 'geral')] })
            }}><Plus size={14} /> {TYPE_LABEL[t]}</Button>
          ))}
        </div>
      )}

      {!readOnly && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-cinza bg-white/95 backdrop-blur">
          <div className="safe-bottom mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 pt-2">
            {msg ? <p className={`flex-1 text-sm ${msg.ok ? 'text-sucesso' : 'text-erro'}`}>{msg.text}</p>
              : <p className="flex-1 text-sm text-cinza-texto">{problems.length ? `${problems.length} pendência(s): ${problems.slice(0, 2).join('; ')}${problems.length > 2 ? '…' : ''}` : 'Tudo certo para publicar.'}</p>}
            {aiItem ? (
              <>
                <input className={`${input} w-48`} placeholder="Motivo (se rejeitar)" value={rejectNotes} onChange={(e) => setRejectNotes(e.target.value)} />
                <Button variant="ghost" disabled={saving} className="!min-h-10 !py-2" onClick={async () => { await rejectAiFound(aiItem.id, rejectNotes); onDone?.(); nav('/admin/ia', { replace: true }) }}>Rejeitar</Button>
                <Button disabled={saving} onClick={promote} className="!min-h-10 !py-2">Adicionar à base oficial</Button>
              </>
            ) : <>
            <Button variant="ghost" disabled={saving} onClick={() => save()} className="!min-h-10 !py-2"><Save size={16} /> Salvar</Button>
            {status !== 'published'
              ? <Button disabled={saving} onClick={() => save('published')} className="!min-h-10 !py-2">Publicar</Button>
              : <Button variant="outline" disabled={saving} onClick={async () => { await setLessonStatus(lesson.id, 'draft'); setStatus('draft'); void refreshCloudLessons(true); setMsg({ ok: true, text: 'Despublicada (voltou para rascunho).' }) }} className="!min-h-10 !py-2">Despublicar</Button>}
            </>}
          </div>
        </div>
      )}
    </div>
  )
}

const TYPE_LABEL: Record<Question['type'], string> = { mc: 'Múltipla escolha', tf: 'Verdadeiro/falso', fill: 'Completar', match: 'Associação', open: 'Aberta', order: 'Ordenar' }

function IconBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return <button type="button" aria-label={label} title={label} onClick={onClick} className="grid h-8 w-8 place-items-center rounded-lg text-cinza-texto hover:bg-offwhite hover:text-grafite">{children}</button>
}

function QuestionEditor({ q, n, skills, readOnly, onChange, onRemove }: { q: Question; n: number; skills: Record<string, string>; readOnly: boolean; onChange: (p: Partial<Question>) => void; onRemove: () => void }) {
  const invalid = !validateQuestion(q, q.id)
  return (
    <Card className={invalid ? 'border-erro/50' : ''}>
      <fieldset disabled={readOnly} className="grid gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold">{n}. {TYPE_LABEL[q.type]}</span>
          {invalid && <span className="rounded-full bg-erro-suave px-2 text-xs text-erro">incompleta</span>}
          <select className={`${input} ml-auto w-auto`} value={q.skill} onChange={(e) => onChange({ skill: e.target.value })}>{Object.entries(skills).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
          <select className={`${input} w-auto`} value={q.difficulty} onChange={(e) => onChange({ difficulty: Number(e.target.value) as 1 | 2 | 3 })}>
            <option value={1}>Fácil</option><option value={2}>Médio</option><option value={3}>Difícil</option>
          </select>
          <IconBtn label="Remover" onClick={onRemove}><Trash2 size={16} /></IconBtn>
        </div>
        <textarea className={input} rows={2} placeholder={q.type === 'tf' ? 'Afirmação' : 'Enunciado'} value={q.prompt} onChange={(e) => onChange({ prompt: e.target.value })} />

        {q.type === 'mc' && q.options.map((o, i) => (
          <label key={i} className="flex items-center gap-2">
            <input type="radio" name={`ans-${q.id}-${n}`} checked={q.answer === i} onChange={() => onChange({ answer: i } as Partial<Question>)} aria-label="Correta" />
            <input className={input} placeholder={`Alternativa ${String.fromCharCode(65 + i)}`} value={o} onChange={(e) => onChange({ options: q.options.map((x, j) => (j === i ? e.target.value : x)) } as Partial<Question>)} />
          </label>
        ))}
        {q.type === 'tf' && (
          <select className={input} value={String(q.answer)} onChange={(e) => onChange({ answer: e.target.value === 'true' } as Partial<Question>)}><option value="true">Verdadeiro</option><option value="false">Falso</option></select>
        )}
        {q.type === 'fill' && (
          <input className={input} placeholder="Respostas aceitas (separe por |)" value={q.answers.join(' | ')} onChange={(e) => onChange({ answers: e.target.value.split('|').map((x) => x.trim()) } as Partial<Question>)} />
        )}
        {q.type === 'match' && q.pairs.map((p, i) => (
          <div key={i} className="flex gap-2">
            <input className={input} placeholder="Esquerda" value={p[0]} onChange={(e) => onChange({ pairs: q.pairs.map((x, j) => (j === i ? [e.target.value, x[1]] : x)) } as Partial<Question>)} />
            <input className={input} placeholder="Direita" value={p[1]} onChange={(e) => onChange({ pairs: q.pairs.map((x, j) => (j === i ? [x[0], e.target.value] : x)) } as Partial<Question>)} />
          </div>
        ))}
        {q.type === 'order' && (
          <textarea className={input} rows={4} placeholder="Itens na ORDEM CORRETA, um por linha (o app embaralha)" value={q.items.join('\n')} onChange={(e) => onChange({ items: e.target.value.split('\n') } as Partial<Question>)} />
        )}
        {q.type === 'open' && (
          <>
            <textarea className={input} rows={2} placeholder="Resposta modelo" value={q.modelAnswer} onChange={(e) => onChange({ modelAnswer: e.target.value } as Partial<Question>)} />
            <input className={input} placeholder="Ideias-chave para correção (separe por vírgula)" value={q.keywords.join(', ')} onChange={(e) => onChange({ keywords: e.target.value.split(',').map((x) => x.trim()).filter(Boolean) } as Partial<Question>)} />
          </>
        )}

        <div className="grid gap-2 sm:grid-cols-3">
          {q.hints.map((h, i) => (
            <input key={i} className={input} placeholder={`💡 Dica ${i + 1}`} value={h} onChange={(e) => onChange({ hints: q.hints.map((x, j) => (j === i ? e.target.value : x)) as [string, string, string] })} />
          ))}
        </div>
        <textarea className={input} rows={2} placeholder="Explicação da resposta" value={q.explanation} onChange={(e) => onChange({ explanation: e.target.value })} />
      </fieldset>
    </Card>
  )
}
