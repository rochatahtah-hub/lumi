import { useSyncExternalStore } from 'react'

// Instalação pelo mecanismo OFICIAL do navegador (PWA). Nada de APK ou download de arquivo.
interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'lumi:install-dismissed-at'
const DISMISS_DAYS = 14

let deferred: InstallPromptEvent | null = null
let justInstalled = false
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

// o evento dispara logo no carregamento — por isso a captura fica aqui, antes de qualquer tela
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as InstallPromptEvent
    emit()
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    justInstalled = true
    emit()
  })
}

export const isStandalone = () =>
  typeof window !== 'undefined' && (window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true)

export const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
export const isMobile = () => /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent) || isIos()

export type InstallMode = 'prompt' | 'ios' | 'none'

/** 'prompt' = o navegador permite instalar com um toque · 'ios' = Safari: instalação oficial pela "Tela de Início" */
export function installMode(): InstallMode {
  if (isStandalone()) return 'none'
  if (deferred) return 'prompt'
  if (isIos()) return 'ios'
  return 'none'
}

export async function promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!deferred) return 'unavailable'
  const ev = deferred
  await ev.prompt()
  const { outcome } = await ev.userChoice
  deferred = null
  if (outcome === 'accepted') justInstalled = true
  emit()
  return outcome
}

export function dismissInvite() {
  try { localStorage.setItem(DISMISS_KEY, String(Date.now())) } catch { /* sem armazenamento */ }
  emit()
}

/** convite automático: só no celular, fora do app instalado e sem ter sido recusado nos últimos dias */
export function shouldInvite(): boolean {
  if (!isMobile() || installMode() === 'none') return false
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY) ?? 0)
    return !at || Date.now() - at > DISMISS_DAYS * 86400_000
  } catch {
    return true
  }
}

export const wasJustInstalled = () => justInstalled
export const clearJustInstalled = () => { justInstalled = false; emit() }

/** re-renderiza quando o estado de instalação muda */
export function useInstallState() {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l) },
    () => `${installMode()}|${justInstalled}|${shouldInvite()}|${requested}`,
    () => 'none|false|false',
  )
}

// abrir o convite a partir de qualquer tela (ex.: "📱 Instalar o LUMI" em Mais)
let requested = false
export const requestInvite = () => { requested = true; emit() }
export const inviteRequested = () => requested
export const closeInvite = () => { requested = false; emit() }
