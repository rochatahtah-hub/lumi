import { useEffect, useState } from 'react'
import { CalendarClock, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card, Spinner } from '../../components/ui'
import { subjectById } from '../../content/subjects'
import { closeKbCycle, kb, kbStatus, localMode, unanswered, type KbStats, type KbStatus, type Unanswered } from './api'
import { Table } from './Admin'

/** "PERGUNTAS QUE O LUMI NÃO ENCONTROU" — pauta para ampliar a base */
export function AdminUnanswered() {
  const [rows, setRows] = useState<Unanswered[] | null>(null)
  const [days, setDays] = useState(90)
  const [busy, setBusy] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const load = () => unanswered(days).then(setRows).catch((e) => { setRows([]); setMsg({ ok: false, text: e.message }) })
  useEffect(() => { void load() }, [days]) // eslint-disable-line react-hooks/exhaustive-deps

  const research = async (r: Unanswered) => {
    setBusy(r.question); setMsg(null)
    try {
      await kb({ action: 'research', topic: r.question, subject: r.subject_id ?? undefined })
      setMsg({ ok: true, text: `"${r.question}" pesquisado — revise em Conteúdos encontrados pela IA.` })
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : String(e) })
    } finally { setBusy(null) }
  }

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-semibold">Perguntas que o LUMI não encontrou</h2>
        <p className="mt-1 text-sm text-cinza-texto">Tudo que os alunos procuraram e não estava na base. Perguntas parecidas (mesmas palavras, sem considerar acentos e maiúsculas) são agrupadas.</p>
        <label className="mt-3 flex items-center gap-2 text-sm">Período:
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="rounded-lg border border-cinza px-2 py-1">
            <option value={30}>30 dias</option><option value={90}>90 dias</option><option value={365}>12 meses</option>
          </select>
        </label>
        {msg && <p className={`mt-3 text-sm ${msg.ok ? 'text-sucesso' : 'text-erro'}`}>{msg.text}</p>}
      </Card>
      {localMode ? <Card><p className="text-sm text-cinza-texto">Disponível com o backend configurado.</p></Card> : !rows ? <Spinner label="Carregando…" /> : (
        <Card className="p-0">
          {!rows.length && <p className="p-4 text-sm text-cinza-texto">Nenhuma pergunta sem resposta no período. 🎉</p>}
          <ul className="divide-y divide-cinza">
            {rows.map((r) => (
              <li key={r.question + r.first_at} className="flex flex-wrap items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">"{r.question}"</p>
                  <p className="text-xs text-cinza-texto">
                    {r.times} {r.times === 1 ? 'vez' : 'vezes'} · primeira em {new Date(r.first_at).toLocaleDateString('pt-BR')} · última em {new Date(r.last_at).toLocaleDateString('pt-BR')}
                    {r.subject_id ? ` · ${subjectById(r.subject_id)?.name}` : ''}{r.possible_topic ? ` · assunto provável: ${r.possible_topic}` : ''}
                  </p>
                </div>
                {r.resolved ? <span className="rounded-full bg-sucesso-suave px-2 py-0.5 text-xs text-sucesso">já está na base</span>
                  : r.has_ai_content ? <Link to="/admin/ia" className="rounded-full bg-laranja-suave px-2 py-0.5 text-xs text-laranja-escuro">pesquisado — revisar</Link>
                  : <Button variant="outline" className="!min-h-9 !py-1 text-sm" disabled={!!busy} onClick={() => research(r)}><Search size={14} /> {busy === r.question ? 'Pesquisando…' : 'Pesquisar'}</Button>}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}

const STAT_LABEL: [keyof KbStats, string][] = [
  ['new_lessons', 'Novos conteúdos'], ['reviewed_lessons', 'Conteúdos revisados'], ['corrections', 'Correções realizadas'], ['new_questions', 'Novos exercícios'],
  ['ai_found', 'Novos assuntos encontrados pela IA'], ['ai_approved', 'Aprovados para a base'], ['ai_pending', 'Aguardando revisão'], ['unanswered', 'Perguntas não encontradas'],
]

/** "ATUALIZAÇÃO DA BASE" — ciclo mensal de revisão e ampliação */
export function AdminKbUpdate() {
  const [st, setSt] = useState<KbStatus | null | undefined>(undefined)
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const load = () => kbStatus().then(setSt).catch(() => setSt(null))
  useEffect(() => { void load() }, [])
  if (localMode) return <Card><p className="text-sm text-cinza-texto">Disponível com o backend configurado.</p></Card>
  if (st === undefined) return <Spinner label="Carregando…" />
  if (!st) return <Card><p className="text-erro">Não foi possível carregar.</p></Card>
  const overdue = new Date(st.next_update) < new Date()

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4"><p className="text-xs text-cinza-texto">Última atualização</p><p className="text-lg font-bold">{st.last_update ? new Date(st.last_update).toLocaleDateString('pt-BR') : 'Nenhuma ainda'}</p></Card>
        <Card className={`p-4 ${overdue ? 'border-laranja' : ''}`}><p className="text-xs text-cinza-texto">Próxima atualização</p><p className="flex items-center gap-2 text-lg font-bold"><CalendarClock size={18} className="text-laranja" /> {new Date(st.next_update).toLocaleDateString('pt-BR')}</p>{overdue && <p className="text-xs text-laranja-escuro">Atualização do mês pendente</p>}</Card>
        <Card className="p-4"><p className="text-xs text-cinza-texto">Base oficial hoje</p><p className="text-lg font-bold">{st.current.published_total} conteúdos · {st.current.questions_total} exercícios</p></Card>
      </div>

      <Card>
        <h2 className="font-semibold">Ciclo atual (desde {new Date(st.current_period_start).toLocaleDateString('pt-BR')})</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STAT_LABEL.map(([k, label]) => (
            <div key={k} className="rounded-2xl bg-offwhite p-3"><p className="text-xl font-bold">{st.current[k]}</p><p className="text-xs text-cinza-texto">{label}</p></div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-cinza p-3 text-sm">
          <p className="font-semibold">Roteiro da atualização mensal</p>
          <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-grafite-3">
            <li>Revisar <Link to="/admin/ia" className="underline">conteúdos encontrados pela IA</Link> e adicionar os aprovados à base.</li>
            <li>Ver <Link to="/admin/nao-encontradas" className="underline">perguntas não encontradas</Link> e pesquisar as mais frequentes.</li>
            <li>Conferir no <Link to="/admin" className="underline">painel</Link> as questões com maior índice de erro e corrigir enunciados, dicas e respostas.</li>
            <li>Adicionar palavras-chave, sinônimos e perguntas relacionadas onde a busca falhou.</li>
            <li>Revisar as <Link to="/admin/fontes" className="underline">fontes</Link> e fechar o ciclo abaixo.</li>
          </ol>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <input className="min-w-60 flex-1 rounded-xl border-2 border-cinza px-3 py-2 text-sm outline-none focus:border-laranja" placeholder="Resumo do que foi feito neste ciclo" value={notes} onChange={(e) => setNotes(e.target.value)} />
          <Button disabled={busy} className="!min-h-10 !py-2" onClick={async () => { setBusy(true); await closeKbCycle(notes); setNotes(''); await load(); setBusy(false) }}>Registrar atualização do mês</Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold">Atualizações anteriores</h2>
        <Table empty="Nenhuma atualização registrada ainda." head={['Fechada em', 'Novos', 'Revisados', 'Correções', 'Exercícios', 'Da IA']}
          rows={st.history.map((h) => [`${new Date(h.closed_at).toLocaleDateString('pt-BR')}${h.notes ? ` — ${h.notes}` : ''}`, h.summary.new_lessons, h.summary.reviewed_lessons, h.summary.corrections, h.summary.new_questions, h.summary.ai_approved])} />
      </Card>
    </div>
  )
}
