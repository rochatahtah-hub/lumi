import { BarChart3, Gamepad2, Globe, Home, Menu, Trophy } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/jogos', label: 'Jogos', icon: Gamepad2 },
  { to: '/idiomas', label: 'Idiomas', icon: Globe },
  { to: '/progresso', label: 'Progresso', icon: BarChart3 },
  { to: '/conquistas', label: 'Conquistas', icon: Trophy },
  { to: '/mais', label: 'Mais', icon: Menu },
]

export function BottomNav() {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-cinza bg-white/95 backdrop-blur" aria-label="Navegação principal">
      <ul className="mx-auto grid max-w-2xl grid-cols-6">
        {items.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) => `flex min-h-14 flex-col items-center justify-center gap-0.5 pt-2 text-xs font-medium transition ${isActive ? 'text-laranja' : 'text-cinza-texto hover:text-grafite'}`}
            >
              <Icon size={22} strokeWidth={2} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
