import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { checkRateLimit, rateLimitResponse } from '../_shared/rate-limit.ts'

const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY') || ''
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY') || ''
const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT') || 'mailto:noreply@lumiensina.app.br'

interface PushNotification {
  title: string
  body: string
  url?: string
}

interface PushSubscription {
  id: string
  endpoint: string
  auth_key: string
  p256dh_key: string
}

// Importar web-push (usar polyfill simples)
async function sendPushNotification(
  subscription: PushSubscription,
  notification: PushNotification
): Promise<boolean> {
  try {
    const response = await fetch(subscription.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'TTL': '24', // 24 horas
      },
      body: JSON.stringify({
        title: notification.title,
        body: notification.body,
        url: notification.url || '/estudos',
      }),
    })

    return response.ok || response.status === 201
  } catch (err) {
    console.error(`[send-push] Erro ao enviar para ${subscription.endpoint}:`, err)
    return false
  }
}

serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': 'https://lumiensina.app.br',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // 🔐 RATE LIMITING: 10 requisições por minuto por IP
  const rateLimitCheck = checkRateLimit(req, {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 10, // máximo 10 requisições
  })

  if (!rateLimitCheck.allowed) {
    return rateLimitResponse(rateLimitCheck.retryAfter, 'Muitas requisições. Tente novamente em alguns segundos.')
  }

  try {
    // 🔐 AUTENTICAÇÃO: Validar token Bearer
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Missing token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Verificar se token é válido (service role key ou scheduled job token)
    const validToken = Deno.env.get('SEND_NOTIFICATIONS_SECRET_KEY')
    if (!validToken || token !== validToken) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Invalid token' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    )

    const requestBody = await req.json() as Partial<PushNotification>
    const { title, body, url } = requestBody

    if (!title || !body) {
      return new Response(
        JSON.stringify({ error: 'title e body são obrigatórios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Sanitizar entradas
    if (title.length > 100 || body.length > 300) {
      return new Response(
        JSON.stringify({ error: 'title ou body muito longo' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Buscar todas as subscriptions ativas
    const { data: subscriptions, error: fetchError } = await supabaseClient
      .from('push_subscriptions')
      .select('*')
      .eq('status', 'active')
      .eq('notification_enabled', true)

    if (fetchError) {
      console.error('[send-push] Erro ao buscar subscriptions:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar subscriptions' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: 'Nenhuma subscription ativa' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Enviar para todas as subscriptions
    let successCount = 0
    let failureCount = 0

    for (const subscription of subscriptions as PushSubscription[]) {
      const sent = await sendPushNotification(subscription, {
        title,
        body,
        url,
      })

      if (sent) {
        successCount++

        // Log do envio bem-sucedido
        await supabaseClient.from('notification_log').insert({
          subscription_id: subscription.id,
          title,
          message: body,
          delivered: true,
        })

        // Atualizar last_notification_at
        await supabaseClient
          .from('push_subscriptions')
          .update({ last_notification_at: new Date().toISOString() })
          .eq('id', subscription.id)
      } else {
        failureCount++

        // Log do envio falhado
        await supabaseClient.from('notification_log').insert({
          subscription_id: subscription.id,
          title,
          message: body,
          delivered: false,
        })
      }
    }

    console.log(`[send-push] Enviados: ${successCount}, Falhados: ${failureCount}`)

    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        failed: failureCount,
        total: subscriptions.length,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (err) {
    console.error('[send-push] Erro geral:', err)
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
