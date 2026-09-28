import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Spinner } from '../../components/ui'
import { LEVELS, SUBJECTS, subjectById } from '../../content/subjects'
import { getAiFound, kb, listAiFound, localMode, type AiFound } from './api'
import { AdminLessonEditor } from './Lessons'

const input = 'rounded-xl border-2 border-cinza bg-white px-3 py-2 text-sm outline-none focus:border-laranja'
const TABS: { id: AiFound['status']; label: string }[] = [
  { id: 'pending', label: 'Aguardando revisão' }, { id: 'approved', label: 'Adicionados à base' }, { id: 'rejected', label: 'Rejeitados' },
]
const ORIGIN: Record<AiFound['origin'], string> = { aluno: 'pergunta de aluno', admin: 'pesquisa da equipe', rotina: 'rotina mensal' }

/** "CONTEÚDOS ENCONTRADOS PELA IA" — tudo que a IA pesquisou para preencher lacunas da base */
export default function AdminAiFound() {
  const [tab, setTab] = useState<AiFound['status']>('pending')
  const [items, setItems] = useState<AiFound[] | null>(null)
  const [form, setForm] = useState({ topic: '', subject: '', stage: '', notes: '' })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const load = () => listAiFound(tab).then(setItems).catch((e) => { setItems([]); setMsg({ ok: false, text: e.message }) })
  useEffect(() => { void load() }, [tab]) // eslint-disable-line react-hooks/exhaustive-deps

  const research = async () => {
    setBusy(true); setMsg(null)
    try {
      await kb({ action: 'research', topic: form.topic, subject: form.subject || undefined, stage: form.stage || undefined, notes: form.notes })
      setMsg({ ok: true, text: 'Pesquisa concluída. O conteúdo está na lista "Aguardando revisão".' })
      setForm({ topic: '', subject: '', stage: '', notes: '' })
      setTab('pending'); void load()
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : String(e) })
    } finally { setBusy(false) }
  }

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-semibold">Conteúdos encontrados pela IA</h2>
        <p className="mt-1 text-sm text-cinza-texto">
          Quando um aluno pergunta algo que não existe na base, a IA pesquisa em fontes confiáveis, responde ao aluno e registra aqui.
          Revise, corrija se precisar e clique em <b>Adicionar à base oficial</b> — daí em diante o LUMI responde esse assunto pela própria base, sem chamar a IA.
        </p>
      </Card>

      <Card>
        <h3 className="font-semibold">Pesquisar um assunto novo</h3>
        {localMode ? <p className="mt-2 text-sm text-cinza-texto">Disponível com o backend configurado.</p> : (
          <form className="mt-3 grid gap-2" onSubmit={(e) => { e.preventDefault(); void research() }}>
            <div className="flex flex-wrap gap-2">
              <input className={`${input} min-w-48 flex-1`} placeholder="Assunto (ex.: mitose)" required minLength={3} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
              <select className={input} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}><option value="">Matéria</option>{SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
              <select className={input} value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}><option value="">Nível</option>{LEVELS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}</select>
            </div>
            <textarea className={input} rows={2} placeholder="Orientações (opcional): o que priorizar, fontes preferidas, cuidados…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <Button disabled={busy} className="!min-h-10 w-fit !py-2"><Search size={16} /> {busy ? 'Pesquisando…' : 'Pesquisar com IA'}</Button>
          </form>
        )}
        {msg && <p className={`mt-3 text-sm ${msg.ok ? 'text-sucesso' : 'text-erro'}`}>{msg.text}</p>}
      </Card>

      <div className="flex gap-1 overflow-x-auto">
        {TABS.map((t) => <button key={t.id} onClick={() => setTab(t.id)} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${tab === t.id ? 'bg-grafite text-white' : 'bg-white text-grafite ring-1 ring-cinza'}`}>{t.label}</button>)}
      </div>

      {!items ? <Spinner label="Carregando…" /> : !items.length ? <Card><p className="text-sm text-cinza-texto">{localMode ? 'Disponível com o backend configurado.' : 'Nada aqui.'}</p></Card> : (
        <Card className="p-0">
          <ul className="divide-y divide-cinza">
            {items.map((it) => (
              <li key={it.id}>
                <Link to={it.status === 'approved' && it.lesson_id ? `/admin/conteudos/${it.lesson_id}` : `/admin/ia/${it.id}`} className="block px-4 py-3 hover:bg-offwhite">
                  <p className="font-medium">{it.topic}</p>
                  <p className="text-sm text-grafite-3">"{it.question}"</p>
                  <p className="text-xs text-cinza-texto">
                    {it.subject_id ? subjectById(it.subject_id)?.name : 'Matéria a definir'}{it.level ? ` · ${LEVELS.find((l) => l.id === it.level)?.label}` : ''} · {ORIGIN[it.origin]} ·
                    {' '}{new Date(it.created_at).toLocaleDateString('pt-BR')} · {it.sources.length} {it.sources.length === 1 ? 'fonte' : 'fontes'} · entregue a {it.times_served} {it.times_served === 1 ? 'aluno' : 'alunos'}
                  </p>
                  {it.review_notes && <p className="mt-1 text-xs text-erro">Motivo: {it.review_notes}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}

/** revisão de um conteúdo da IA: dados da pesquisa + editor completo */
export function AdminAiReview() {
  const { id = '' } = useParams()
  const [item, setItem] = useState<AiFound | null | undefined>(undefined)
  useEffect(() => { getAiFound(id).then(setItem) }, [id])
  if (item === undefined) return <Spinner label="Abrindo conteúdo…" />
  if (!item) return <Card><p>Conteúdo não encontrado.</p></Card>
  return (
    <div className="space-y-4">
      <Link to="/admin/ia" className="text-sm text-cinza-texto hover:text-grafite">← Conteúdos encontrados pela IA</Link>
      <Card>
        <p className="text-xs uppercase tracking-wide text-cinza-texto">Pesquisa registrada em {new Date(item.created_at).toLocaleString('pt-BR')}</p>
        <p className="mt-1"><b>Pergunta do aluno:</b> "{item.question}"</p>
        <p><b>Assunto identificado:</b> {item.topic} · <b>Matéria:</b> {item.subject_id ? subjectById(item.subject_id)?.name : '—'} · <b>Nível:</b> {LEVELS.find((l) => l.id === item.level)?.label ?? '—'}</p>
        <p className="text-sm text-cinza-texto">Provedor: {item.provider ?? '—'} · entregue a {item.times_served} {item.times_served === 1 ? 'aluno' : 'alunos'} antes da revisão</p>
        <p className="mt-3 font-semibold">Fontes consultadas na pesquisa</p>
        {item.sources.length ? (
          <ul className="mt-1 space-y-1 text-sm">
            {item.sources.map((s, i) => <li key={i}>• <a className="underline hover:text-laranja" href={s.url} target="_blank" rel="noreferrer noopener">{s.title || s.url}</a></li>)}
          </ul>
        ) : <p className="text-sm text-erro">Nenhuma fonte registrada — confira as informações com atenção redobrada.</p>}
        {item.status !== 'pending' && <p className="mt-3 rounded-xl bg-offwhite p-2 text-sm">Este conteúdo já foi {item.status === 'approved' ? 'adicionado à base' : 'rejeitado'}.</p>}
      </Card>
      {item.status === 'pending' && <AdminLessonEditor aiItem={item} />}
    </div>
  )
}
