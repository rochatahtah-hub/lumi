import { useEffect, useState } from 'react'
import { Button, Card } from '../../components/ui'
import { SUBJECTS } from '../../content/subjects'
import { listChannels, listSources, localMode, setSourceTrust, upsertChannel } from './api'

const TRUST: Record<string, string> = { trusted: 'Confiável', ok: 'Ok', unreviewed: 'Não revisada', rejected: 'Rejeitada' }

export default function AdminSources() {
  const [sources, setSources] = useState<Awaited<ReturnType<typeof listSources>>>([])
  const [channels, setChannels] = useState<Awaited<ReturnType<typeof listChannels>>>([])
  const [name, setName] = useState('')
  const [subjects, setSubjects] = useState<string[]>([])
  const load = () => { void listSources().then(setSources); void listChannels().then(setChannels) }
  useEffect(load, [])

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-semibold">Canais e instituições priorizados na pesquisa</h2>
        <p className="text-sm text-cinza-texto">Resultados desses canais ganham pontuação maior. O id do YouTube é preenchido automaticamente quando o canal aparece numa pesquisa.</p>
        {localMode ? <p className="mt-3 text-sm text-cinza-texto">Disponível com o backend configurado.</p> : (
          <>
            <ul className="mt-3 divide-y divide-cinza text-sm">
              {channels.map((c) => (
                <li key={c.id} className="flex items-center gap-3 py-2">
                  <span className="flex-1"><b>{c.name}</b> <span className="text-cinza-texto">· {c.subjects.join(', ')}{c.youtube_channel_id ? ' · id ok' : ' · id pendente'}</span></span>
                  <label className="flex items-center gap-1"><input type="checkbox" checked={c.active} onChange={async (e) => { await upsertChannel({ id: c.id, name: c.name, subjects: c.subjects, active: e.target.checked }); load() }} /> ativo</label>
                </li>
              ))}
            </ul>
            <form className="mt-3 flex flex-wrap gap-2" onSubmit={async (e) => { e.preventDefault(); await upsertChannel({ name: name.trim(), subjects, active: true }); setName(''); setSubjects([]); load() }}>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome exato do canal" className="min-w-48 flex-1 rounded-xl border-2 border-cinza px-3 py-2 text-sm outline-none focus:border-laranja" />
              <select multiple value={subjects} onChange={(e) => setSubjects([...e.target.selectedOptions].map((o) => o.value))} className="h-20 rounded-xl border-2 border-cinza px-2 text-sm">
                {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <Button className="!min-h-10 !py-2">Adicionar canal</Button>
            </form>
          </>
        )}
      </Card>

      <Card>
        <h2 className="font-semibold">Fontes registradas nas aulas</h2>
        <ul className="mt-3 divide-y divide-cinza text-sm">
          {sources.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center gap-3 py-2">
              <span className="flex-1">{s.url ? <a href={s.url} target="_blank" rel="noreferrer noopener" className="font-medium hover:text-laranja">{s.title}</a> : <span className="font-medium">{s.title}</span>} <span className="text-cinza-texto">· {s.kind}</span></span>
              {localMode ? <span className="text-cinza-texto">{TRUST[s.trust]}</span> : (
                <select value={s.trust} onChange={async (e) => { await setSourceTrust(s.id, e.target.value); load() }} className="rounded-lg border border-cinza px-2 py-1">
                  {Object.entries(TRUST).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
