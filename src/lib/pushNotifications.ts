import { supabase } from './supabase'

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || ''

export interface PushSubscriptionData {
  endpoint: string
  auth_key: string
  p256dh_key: string
  preferred_hour?: number
  preferred_minute?: number
}

export async function requestPushPermission(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    console.warn('Push notifications não suportadas')
    return false
  }

  try {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  } catch (err) {
    console.error('Erro ao solicitar permissão:', err)
    return false
  }
}

export async function subscribeToPushNotifications(preferredHour?: number): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !supabase) {
    console.error('Service Workers não suportados')
    return false
  }

  try {
    const registration = await navigator.serviceWorker.ready

    const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY)

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey as BufferSource,
    })

    const rawKey = subscription.getKey('p256dh')
    const authSecret = subscription.getKey('auth')

    if (!rawKey || !authSecret) {
      console.error('Falha ao obter chaves da subscription')
      return false
    }

    const data: PushSubscriptionData = {
      endpoint: subscription.endpoint,
      auth_key: arrayBufferToBase64(authSecret),
      p256dh_key: arrayBufferToBase64(rawKey),
      preferred_hour: preferredHour || 14,
      preferred_minute: 0,
    }

    const deviceId = generateDeviceId()
    const { error } = await supabase!
      .from('push_subscriptions')
      .insert({
        ...data,
        device_id: deviceId,
        status: 'active',
      })

    if (error) {
      console.error('Erro ao salvar subscription:', error)
      return false
    }

    console.log('✅ Inscrito em push notifications')
    return true
  } catch (err) {
    console.error('Erro ao subscrever:', err)
    return false
  }
}

export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !supabase) return false

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    if (!subscription) {
      console.warn('Nenhuma subscription ativa')
      return true
    }

    const unsubscribed = await subscription.unsubscribe()

    if (unsubscribed) {
      const { error } = await supabase!
        .from('push_subscriptions')
        .update({ status: 'revoked' })
        .eq('endpoint', subscription.endpoint)

      if (error) console.error('Erro ao revogar:', error)
    }

    return unsubscribed
  } catch (err) {
    console.error('Erro ao desinscrever:', err)
    return false
  }
}

export async function updateNotificationPreference(hour: number, minute: number = 0): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !supabase) return false

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    if (!subscription) {
      console.warn('Nenhuma subscription ativa')
      return false
    }

    const { error } = await supabase!
      .from('push_subscriptions')
      .update({
        preferred_hour: hour,
        preferred_minute: minute,
        notification_enabled: true,
      })
      .eq('endpoint', subscription.endpoint)

    return !error
  } catch (err) {
    console.error('Erro ao atualizar preferência:', err)
    return false
  }
}

export async function disableNotifications(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !supabase) return false

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    if (!subscription) return false

    const { error } = await supabase!
      .from('push_subscriptions')
      .update({ notification_enabled: false })
      .eq('endpoint', subscription.endpoint)

    return !error
  } catch (err) {
    console.error('Erro ao desabilitar notificações:', err)
    return false
  }
}

export async function enableNotifications(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !supabase) return false

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    if (!subscription) return false

    const { error } = await supabase!
      .from('push_subscriptions')
      .update({ notification_enabled: true })
      .eq('endpoint', subscription.endpoint)

    return !error
  } catch (err) {
    console.error('Erro ao habilitar notificações:', err)
    return false
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function generateDeviceId(): string {
  const stored = localStorage.getItem('lumi_device_id')
  if (stored) return stored

  const id = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  localStorage.setItem('lumi_device_id', id)
  return id
}

export async function isPushEnabled(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) return false

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()
    return subscription !== null
  } catch {
    return false
  }
}
