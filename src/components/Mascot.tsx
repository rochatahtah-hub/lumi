/**
 * Mascot — LUMI como companheiro visual
 * Mostra reações animar da conforme o aluno estuda
 */

import React, { useEffect, useState } from 'react'
import type { MascotReaction } from '../lib/mascot-reactions'

interface MascotProps {
  reaction?: MascotReaction
  isVisible?: boolean
  position?: 'bottom-right' | 'bottom-left' | 'top-right'
}

export function Mascot({ reaction, isVisible = true, position = 'bottom-right' }: MascotProps) {
  const [displayMessage, setDisplayMessage] = useState<MascotReaction | undefined>(reaction)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (reaction) {
      setDisplayMessage(reaction)
      setIsAnimating(true)

      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(() => setDisplayMessage(undefined), 300)
      }, reaction.duration)

      return () => clearTimeout(timer)
    }
  }, [reaction])

  if (!isVisible || !displayMessage) return null

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-40 flex flex-col items-center gap-2`}>
      {/* Mascote Avatar */}
      <div
        className={`relative transform transition-all ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        {/* Corpo */}
        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-500 text-4xl shadow-lg">
          {/* Emoji do mascote — LUMI */}
          <span className="text-3xl">🤖</span>
        </div>

        {/* Olhos animados (opcional) */}
        {displayMessage.emotion === 'excellent' && (
          <div className="absolute top-6 left-4 text-lg">✨</div>
        )}
        {displayMessage.emotion === 'incorrect' && (
          <div className="absolute top-6 right-4 text-lg">😅</div>
        )}
      </div>

      {/* Mensagem em balão */}
      <div
        className={`relative max-w-xs transform transition-all ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        {/* Balão de fala */}
        <div className="rounded-lg bg-white px-4 py-3 shadow-lg border-2 border-orange-200">
          <p className="text-center text-sm font-semibold text-gray-800">{displayMessage.message}</p>

          {/* Seta do balão */}
          <div className="absolute -bottom-2 left-4 h-3 w-3 rotate-45 bg-white border border-orange-200" />
        </div>

        {/* Efeito de brilho */}
        <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
      </div>

      {/* Animation keyframes (adicionar ao Tailwind ou CSS) */}
      <style>{`
        @keyframes bounce-celebrate {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-10px) rotate(-2deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          75% { transform: translateY(-5px) rotate(-1deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-bounce-celebrate {
          animation: bounce-celebrate 0.6s ease-in-out;
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  )
}

/**
 * Hook para gerenciar reações do mascote
 */
export function useMascot() {
  const [reaction, setReaction] = useState<MascotReaction | null>(null)

  const showReaction = (r: MascotReaction) => {
    setReaction(r)
  }

  const clearReaction = () => {
    setReaction(null)
  }

  return { reaction, showReaction, clearReaction }
}

/**
 * Context Provider para reações globais do mascote
 */
import { createContext, useContext, ReactNode } from 'react'

interface MascotContextType {
  reaction: MascotReaction | null
  showReaction: (r: MascotReaction) => void
  clearReaction: () => void
}

const MascotContext = createContext<MascotContextType | undefined>(undefined)

export function MascotProvider({ children }: { children: React.ReactNode }) {
  const { reaction, showReaction, clearReaction } = useMascot()

  return (
    <MascotContext.Provider value={{ reaction, showReaction, clearReaction }}>
      {children}
      {reaction && <Mascot reaction={reaction} />}
    </MascotContext.Provider>
  )
}

export function useMascotContext() {
  const context = useContext(MascotContext)
  if (!context) {
    throw new Error('useMascotContext deve ser usado dentro de MascotProvider')
  }
  return context
}
