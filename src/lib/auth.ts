// Placeholder para autenticação
// TODO: Integrar com Supabase auth real

interface User {
  id?: string
  name?: string
  email?: string
}

interface AuthContext {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export function useAuth(): AuthContext {
  // Retorna contexto dummy por enquanto
  return {
    user: null,
    loading: false,
    signIn: async () => {},
    signOut: async () => {},
  }
}

export { User, AuthContext }
