/**
 * Script melhorado para enviar notificação de teste
 */

import https from 'https'

const SUPABASE_URL = 'https://khmozcolgdpkvlgctqgk.supabase.co'
const SUPABASE_KEY = 'sb_publishable_WVYBWyB9pYKbqxnqY2cATQ_DeUIyLT8'

async function sendTestNotification() {
  console.log('📢 Enviando notificação de teste...\n')

  const functionUrl = `${SUPABASE_URL}/functions/v1/send-push-notifications`
  const payload = JSON.stringify({
    title: '🧪 Teste de Notificação LUMI',
    body: 'Se você viu isso, as notificações estão funcionando! 🎉',
    url: '/estudos',
  })

  const options = {
    hostname: 'khmozcolgdpkvlgctqgk.supabase.co',
    port: 443,
    path: '/functions/v1/send-push-notifications',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
  }

  try {
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
          try {
            const result = JSON.parse(data)
            resolve({ status: res.statusCode, data: result })
          } catch {
            resolve({ status: res.statusCode, data })
          }
        })
      })
      req.on('error', reject)
      req.write(payload)
      req.end()
    })

    console.log(`Status: ${response.status}`)

    if (response.status === 200) {
      const data = response.data
      console.log('✅ Notificação enviada com sucesso!')
      console.log(`📤 Enviadas: ${data.sent}`)
      console.log(`❌ Falhadas: ${data.failed}`)
      console.log(`📊 Total de subscriptions: ${data.total}`)
    } else {
      console.log('⚠️ Resposta:', JSON.stringify(response.data, null, 2))
    }
  } catch (err) {
    console.error('❌ Erro:', err.message)
  }
}

sendTestNotification()
