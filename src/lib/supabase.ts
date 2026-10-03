import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** Validar se URL é um HTTP(S) válido */
const isValidUrl = (str: string | undefined): boolean => {
  if (!str) return false
  try {
    const urlObj = new URL(str)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/** null = modo 100% local (sem nuvem). Todo o app funciona assim. */
export const supabase: SupabaseClient | null = isValidUrl(url) && key ? createClient(url as string, key, { auth: { persistSession: true, autoRefreshToken: true } }) : null

export const cloudEnabled = !!supabase
