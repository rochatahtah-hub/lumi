/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope

// Mensagens variadas de notificação
const NOTIFICATION_TEMPLATES = [
  {
    title: '📚 Hora do LUMI!',
    body: 'Que tal continuar seus estudos hoje?',
  },
  {
    title: '🌟 Seu aprendizado continua!',
    body: 'Tem uma aula esperando por você.',
  },
  {
    title: '🧠 Vamos aprender algo novo?',
    body: 'Abra o LUMI e continue de onde parou.',
  },
  {
    title: '✨ Volta para o LUMI!',
    body: 'Sua próxima aula está pronta para você.',
  },
  {
    title: '🎯 Tempo de estudar!',
    body: 'O LUMI tem novidades para você descobrir.',
  },
  {
    title: '🚀 Você está indo muito bem!',
    body: 'Que tal continuar a jornada de aprendizado?',
  },
  {
    title: '💪 Parabéns pelos estudos!',
    body: 'Você está fazendo ótimo progresso. Continue assim!',
  },
  {
    title: '🎓 Volta ao LUMI!',
    body: 'Não perca as próximas aulas interessantes.',
  },
]

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push recebido:', event.data?.text())

  if (!event.data) {
    console.error('[ServiceWorker] Push sem dados')
    return
  }

  try {
    const data = event.data.json()

    // Se o servidor enviou dados específicos, usar; senão usar template aleatório
    const template = data.title && data.body
      ? { title: data.title, body: data.body }
      : NOTIFICATION_TEMPLATES[Math.floor(Math.random() * NOTIFICATION_TEMPLATES.length)]

    const notificationOptions: NotificationOptions = {
      body: template.body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: 'lumi-study-reminder', // Substituir notificações anteriores do mesmo tipo
      requireInteraction: false,
      data: {
        url: '/estudos', // Para onde direcionar ao clicar
        ...data, // Incluir qualquer dado adicional do servidor
      },
      vibrate: [200, 100, 200], // Padrão de vibração
      actions: [
        {
          action: 'open',
          title: 'Abrir LUMI',
        },
        {
          action: 'dismiss',
          title: 'Agora não',
        },
      ],
    }

    event.waitUntil(
      self.registration.showNotification(template.title, notificationOptions)
    )
  } catch (err) {
    console.error('[ServiceWorker] Erro ao processar push:', err)
    // Fallback para notificação genérica
    event.waitUntil(
      self.registration.showNotification('LUMI', {
        body: 'Toque para abrir',
        icon: '/pwa-192x192.png',
        data: { url: '/estudos' },
      })
    )
  }
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const urlToOpen = event.notification.data?.url || '/estudos'

  // Se foi clicado em uma ação
  if (event.action === 'dismiss') {
    return
  }

  // Procurar por janela aberta do LUMI
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // Se houver window aberta, focar nela
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i]
          if (client.url === '/' && 'focus' in client) {
            (client as WindowClient).focus()
            // Navegar para a rota certa
            client.navigate(urlToOpen)
            return client
          }
        }
        // Se não houver, abrir nova janela
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      })
  )
})

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('[ServiceWorker] Notificação fechada:', event.notification.tag)
  // Aqui poderia logar analytics, por exemplo
})

// Handle service worker messages (para sincronizar com a app)
self.addEventListener('message', (event) => {
  console.log('[ServiceWorker] Mensagem recebida:', event.data)

  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

export {}
