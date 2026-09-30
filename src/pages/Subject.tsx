import { useState } from 'react'
import { CheckCircle2, ChevronRight, Search } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card, Page, TopBar } from '../components/ui'
import { SubjectIcon } from '../components/SubjectIcon'
import { LEVELS, subjectById } from '../content/subjects'
import { useAllLessons } from '../lib/repo'
import { useLumi } from '../lib/store'
import type { SubjectId } from '../types'

export default function SubjectPage() {
  const { id = '' } = useParams()
  const nav = useNavigate()
  const subject = subjectById(id)
  const lessons = useAllLessons().filter((l) => l.subject === id && l.origin !== 'colado')
  const stats = useLumi((s) => s.lessons)
  const level = useLumi((s) => s.profile.level)
  const [q, setQ] = useState('')

  if (!subject) return <><TopBar title="Matéria" /><Page><p>Matéria não encontrada.</p></Page></>

  // primeiro as aulas da série do aluno
  const sorted = [...lessons].sort((a, b) => Number(!!level && b.levels.includes(level)) - Number(!!level && a.levels.includes(level)))

  return (
    <>
      <TopBar title={subject.name} />
      <Page>
        <div className="flex items-center gap-3">
          <SubjectIcon id={subject.id as SubjectId} box={52} size={28} />
          <div>
            <h2 className="text-xl font-semibold">{subject.name}</h2>
            <p className="text-sm text-cinza-texto">{lessons.length} {lessons.length === 1 ? 'aula pronta' : 'aulas prontas'} · ou peça qualquer assunto</p>
          </div>
        </div>

        {subject.id === 'ingles' && (
          <Link to="/ingles" className="mt-5 flex items-center gap-3 rounded-3xl bg-grafite p-4 text-offwhite">
            <span className="text-3xl" aria-hidden>🇬🇧</span>
            <span className="flex-1"><span className="block font-semibold">Curso de Inglês do LUMI</span><span className="block text-sm text-offwhite/75">Trilha A1 → C1, nivelamento, revisão e jogos</span></span>
            <ChevronRight className="text-laranja" />
          </Link>
        )}

        <form className="mt-5" onSubmit={(e) => { e.preventDefault(); if (q.trim()) nav(`/estudar?q=${encodeURIComponent(q.trim())}&materia=${subject.id}`) }}>
          <label className="flex items-center gap-3 rounded-2xl border-2 border-cinza bg-white px-4 focus-within:border-laranja">
            <Search size={20} className="text-cinza-texto" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Qual assunto de ${subject.name}?`} className="min-h-13 w-full bg-transparent py-3 outline-none" maxLength={200} enterKeyHint="go" />
          </label>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {subject.suggestions.map((s) => (
            <button key={s} onClick={() => nav(`/estudar?q=${encodeURIComponent(s)}&materia=${subject.id}`)} className="rounded-full bg-laranja-suave px-3 py-1.5 text-sm text-laranja-escuro">{s}</button>
          ))}
        </div>

        <h3 className="mb-3 mt-7 font-semibold">Aulas</h3>
        {sorted.length === 0 && (
          <Card><p className="text-cinza-texto">Ainda não há aulas prontas de {subject.name} na base. Digite um assunto acima que eu preparo para você.</p></Card>
        )}
        <div className="space-y-3">
          {sorted.map((l) => {
            const st = stats[l.id]
            return (
              <Link key={l.id} to={`/estudar?lesson=${l.id}`} className="flex items-center gap-3 rounded-2xl border border-cinza bg-white p-4 transition hover:border-laranja">
                <div className="flex-1">
                  <p className="font-semibold">{l.title}</p>
                  <p className="text-sm text-cinza-texto">{l.grade || l.levels.map((x) => LEVELS.find((y) => y.id === x)?.label).join(' · ')}</p>
                  {l.origin === 'ia' && <span className="mt-1 inline-block rounded-full bg-laranja-suave px-2 py-0.5 text-xs text-laranja-escuro">criada para você</span>}
                </div>
                {st && <span className="flex items-center gap-1 text-sm font-medium text-sucesso"><CheckCircle2 size={18} /> {st.best}%</span>}
                <ChevronRight size={20} className="text-cinza-texto" />
              </Link>
            )
          })}
        </div>
      </Page>
    </>
  )
}
