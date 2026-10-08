import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, Page } from '../components/ui'
import { ErrorBoundary } from '../components/ErrorBoundary'

function ProgressPageInner() {
  return (
    <div className="min-h-dvh">
      <header className="safe-top bg-grafite pb-6 text-offwhite">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="pt-2 text-2xl font-bold">📊 Meu progresso</h1>
          <p className="text-offwhite/80">Estude e acompanhe seu desenvolvimento.</p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <Card className="mt-4">
          <h2 className="font-semibold mb-4">Seções disponíveis</h2>
          <div className="space-y-2">
            <Link to="/jogos" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition">
              <span>🎮 Jogos</span>
              <ChevronRight size={18} />
            </Link>
            <Link to="/idiomas" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition">
              <span>🌎 Idiomas</span>
              <ChevronRight size={18} />
            </Link>
            <Link to="/conquistas" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition">
              <span>🏆 Conquistas</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </Card>

        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>O detalhamento completo do seu progresso está sendo carregado.</p>
        </div>
      </div>
    </div>
  )
}

export default function ProgressPage() {
  return (
    <ErrorBoundary>
      <ProgressPageInner />
    </ErrorBoundary>
  )
}
