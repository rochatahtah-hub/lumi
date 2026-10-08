/**
 * Script para enviar notificação de teste para todos os usuários
 * Uso: npx ts-node scripts/send-test-notification.ts
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || ''

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Variáveis de ambiente não configuradas')
  console.error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function sendTestNotification() {
  console.log('📢 Enviando notificação de teste...\n')

  try {
    // Chamar a Edge Function
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-push-notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        title: '🧪 Teste de Notificação LUMI',
        body: 'Se você viu isso, as notificações estão funcionando! 🎉',
        url: '/estudos',
      }),
    })

    const result = await response.json()

    if (response.ok) {
      console.log('✅ Notificação enviada com sucesso!')
      console.log(`📤 Enviadas: ${result.sent}`)
      console.log(`❌ Falhadas: ${result.failed}`)
      console.log(`📊 Total de subscriptions: ${result.total}`)
    } else {
      console.error('❌ Erro ao enviar notificação:', result.error)
      process.exit(1)
    }
  } catch (err) {
    console.error('❌ Erro de conexão:', err)
    process.exit(1)
  }
}

sendTestNotification()
