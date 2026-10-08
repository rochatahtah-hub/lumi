import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

serve(async (req) => {
  // Apenas POST permitido
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    )

    // Pegar hora atual em São Paulo
    const now = new Date()
    const saoPauloTime = new Date(now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }))
    const currentHour = saoPauloTime.getHours()
    const currentMinute = saoPauloTime.getMinutes()

    console.log(`[schedule] Verificando notificações para ${currentHour}:${String(currentMinute).padStart(2, '0')}`)

    // Buscar subscriptions ativas com horário que coincida
    const { data: subscriptionsToNotify, error: fetchError } = await supabaseClient
      .from('push_subscriptions')
      .select('*')
      .eq('status', 'active')
      .eq('notification_enabled', true)
      .eq('preferred_hour', currentHour)

    if (fetchError) {
      console.error('[schedule] Erro ao buscar subscriptions:', fetchError)
      return new Response(
        JSON.stringify({ error: 'Erro ao buscar subscriptions', details: fetchError }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!subscriptionsToNotify || subscriptionsToNotify.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Nenhuma notificação a enviar neste horário',
          scheduledTime: `${currentHour}:${String(currentMinute).padStart(2, '0')}`
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Mensagens variadas
    const messages = [
      { title: '📚 Hora do LUMI!', body: 'Que tal continuar seus estudos hoje?' },
      { title: '🌟 Seu aprendizado continua!', body: 'Tem uma aula esperando por você.' },
      { title: '🧠 Vamos aprender algo novo?', body: 'Abra o LUMI e continue de onde parou.' },
      { title: '✨ Volta para o LUMI!', body: 'Sua próxima aula está pronta para você.' },
      { title: '🎯 Tempo de estudar!', body: 'O LUMI tem novidades para você descobrir.' },
      { title: '🚀 Você está indo muito bem!', body: 'Que tal continuar a jornada de aprendizado?' },
      { title: '💪 Parabéns pelos estudos!', body: 'Você está fazendo ótimo progresso. Continue assim!' },
      { title: '🎓 Volta ao LUMI!', body: 'Não perca as próximas aulas interessantes.' },
    ]

    // Selecionar mensagem aleatória
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]

    // Enviar notificações para cada subscription
    let successCount = 0
    let failureCount = 0

    for (const subscription of subscriptionsToNotify) {
      try {
        // Chamar send-push-notifications com autenticação segura
        const pushResponse = await fetch(
          `${Deno.env.get('SUPABASE_URL')}/functions/v1/send-push-notifications`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Deno.env.get('SEND_NOTIFICATIONS_SECRET_KEY')}`,
            },
            body: JSON.stringify({
              title: randomMessage.title,
              body: randomMessage.body,
              url: 'https://lumiensina.app.br/estudos',
            }),
          }
        )

        if (pushResponse.ok) {
          successCount++
        } else {
          failureCount++
        }
      } catch (err) {
        console.error(`[schedule] Erro ao enviar para ${subscription.id}:`, err)
        failureCount++
      }
    }

    console.log(`[schedule] Enviadas: ${successCount}, Falhadas: ${failureCount}`)

    return new Response(
      JSON.stringify({
        success: true,
        scheduledTime: `${currentHour}:${String(currentMinute).padStart(2, '0')}`,
        subscriptionsMatched: subscriptionsToNotify.length,
        sent: successCount,
        failed: failureCount,
        messageUsed: randomMessage.title,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('[schedule] Erro geral:', err)
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
