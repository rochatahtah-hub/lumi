import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh flex flex-col items-center justify-center bg-grafite text-offwhite p-4">
          <p className="text-5xl mb-4">⚠️</p>
          <h1 className="text-2xl font-bold mb-2">Algo deu errado</h1>
          <p className="text-offwhite/70 mb-4">{this.state.error?.message || 'Erro desconhecido'}</p>
          <p className="text-offwhite/50 text-sm mb-6">Detalhes: {this.state.error?.toString()}</p>
          <Link to="/" className="px-4 py-2 bg-laranja text-white rounded-lg font-semibold hover:bg-laranja-escuro transition">
            Voltar ao início
          </Link>
        </div>
      )
    }

    return this.props.children
  }
}
