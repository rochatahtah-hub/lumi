# 🏗️ Arquitetura do Sistema de Push Notifications LUMI

## Fluxo Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUÁRIO NO CELULAR                       │
└────────────┬──────────────────────────────────────────────────┬──┘
             │                                                  │
             ▼                                                  ▼
    ┌────────────────────┐                         ┌──────────────────┐
    │   LUMI PWA ABERTO  │                         │  LUMI PWA FECHADO│
    │  (vê notificação)  │                         │  (recebe no OS)  │
    └────────┬───────────┘                         └────────┬─────────┘
             │                                              │
             │ Service Worker intercepta                   │ OS entrega
             │ push event                                  │ notificação
             │                                              │
             ▼                                              ▼
    ┌────────────────────────────────────────────────────────────┐
    │              NOTIFICAÇÃO RENDERIZADA                        │
    │  "📚 Hora do LUMI! Que tal continuar seus estudos hoje?"   │
    │                                                             │
    │  [Abrir LUMI]  [Descartar]                                 │
    └────────────────────────────────────────────────────────────┘
             │                                       │
             └──────────────────┬────────────────────┘
                                │
                      Usuário clica
                                │
                                ▼
                    ┌──────────────────────┐
                    │ Abre LUMI em /estudos│
                    │ (rota customizada)   │
                    └──────────────────────┘
```

## Componentes Implementados

### 1. Frontend (React)

```
App.tsx
├── NotificationRequest (novo)
│   ├── Solicita permissão na primeira vez
│   ├── Mostra apenas em PWA instalado
│   └── Permite escolher horário
│
└── NotificationSettings (novo)
    ├── Toggle ativar/desativar
    ├── Configurar horário (14:00 padrão)
    └── Salvar preferências
```

### 2. Service Worker

```
public/custom-sw.ts (novo)
├── Push Event Handler
│   ├── Recebe notificação do servidor
│   ├── Seleciona mensagem aleatória
│   ├── Renderiza com ícone/som/vibração
│   └── Adiciona ações (Abrir/Descartar)
│
└── Notification Click Handler
    ├── Fecha notificação
    ├── Localiza janela do LUMI aberta
    ├── Navega para /estudos
    └── Ou abre nova janela se fechado
```

### 3. Backend (Supabase)

```
Database
├── push_subscriptions (novo)
│   ├── endpoint (URL única do navegador)
│   ├── auth_key + p256dh_key (criptografia)
│   ├── device_id (identificar dispositivo)
│   ├── preferred_hour:minute
│   ├── status (active/inactive/revoked)
│   ├── notification_enabled (boolean)
│   └── last_notification_at
│
└── notification_log (novo)
    ├── subscription_id (FK)
    ├── message + title
    ├── sent_at + delivered
    ├── clicked_at (analytics)
    └── Rastreia histórico completo
```

### 4. Edge Function

```
send-push-notifications (novo)
│
├── Input: {title, body, url?}
│
├── Busca todas as subscriptions ativas
│
├── Para cada subscription:
│   ├── Serializa dados em JSON
│   ├── POST para subscription.endpoint
│   ├── Log de sucesso/falha em notification_log
│   └── Atualiza last_notification_at
│
└── Output: {success, sent, failed, total}
```

## Fluxo de Dados Completo

### Quando usuário ativa notificações

```
1. NotificationRequest.tsx
   └─> requestPushPermission()
       └─> Notification.requestPermission()
           └─> Browser pede ao SO
               └─> Usuário clica "Permitir"

2. subscribeToPushNotifications()
   └─> navigator.serviceWorker.ready
       └─> registration.pushManager.subscribe()
           ├─> Gera chaves p256dh + auth
           └─> Retorna objeto PushSubscription
               {endpoint, keys}

3. Salvar no Supabase
   └─> supabase.from('push_subscriptions').insert()
       ├─> deviceId (localStorage)
       ├─> preferredHour (14 padrão)
       └─> status = 'active'

4. LocalStorage
   └─> lumi_notification_decision = 'accepted'
   └─> lumi_device_id = 'device_XXXXX'
```

### Quando servidor envia notificação

```
1. Admin chama Edge Function
   └─> POST /functions/v1/send-push-notifications
       {title: "...", body: "..."}

2. Edge Function busca subscriptions
   └─> SELECT * FROM push_subscriptions
       WHERE status='active' AND notification_enabled=true

3. Para cada subscription, HTTP POST
   └─> POST subscription.endpoint
       ├─> Headers: TTL=24, Content-Type=application/octet-stream
       └─> Body: JSON {title, body, url}

4. Log em notification_log
   └─> INSERT {subscription_id, title, message, delivered}

5. Atualizar last_notification_at
   └─> UPDATE push_subscriptions
       SET last_notification_at = NOW()
```

### Quando notificação chega

```
1. Service Worker
   └─> self.addEventListener('push', event)
       ├─> event.data.json() → {title, body, url}
       ├─> Seleciona mensagem se não enviada
       └─> self.registration.showNotification()

2. Sistema Operacional
   └─> Renderiza notificação na barra
       (mesmo que app esteja fechado)

3. Usuário clica
   └─> notificationclick event
       ├─> Procura janela do LUMI
       ├─> Se aberta: navega para /estudos
       └─> Se fechada: abre nova janela

4. App se abre
   └─> Rota /estudos carrega
       └─> Usuário vê seção de estudos
```

## Dados Sensíveis & Segurança

```
Frontend (.env.local)
└─> VITE_VAPID_PUBLIC_KEY ✅ Seguro (público)

Supabase Edge Function Secrets
├─> VAPID_PUBLIC_KEY ✅
├─> VAPID_PRIVATE_KEY 🔒 CRÍTICO (assinatura)
└─> VAPID_SUBJECT ✅

Banco de Dados
├─> endpoint: String único do navegador
├─> auth_key: Encriptação (mantém secreto)
├─> p256dh_key: Encriptação (mantém secreto)
└─> device_id: UUID aleatória

❌ NUNCA em código:
   - VAPID_PRIVATE_KEY
   - URLs de endpoint individuais
   - auth_key ou p256dh_key plaintext
```

## Mensagens Variadas (8 templates)

```
NotificationTemplate[]
├─> "📚 Hora do LUMI! Que tal continuar seus estudos hoje?"
├─> "🌟 Seu aprendizado continua! Tem uma aula esperando."
├─> "🧠 Vamos aprender algo novo? Abra o LUMI e continue!"
├─> "✨ Volta para o LUMI! Sua próxima aula está pronta."
├─> "🎯 Tempo de estudar! O LUMI tem novidades para você."
├─> "🚀 Você está indo muito bem! Quer continuar?"
├─> "💪 Parabéns pelos estudos! Você faz ótimo progresso."
└─> "🎓 Volta ao LUMI! Não perca as próximas aulas."

Cada notificação:
├─> Title (emoji + texto)
├─> Body (contextualizado)
├─> Icon: /pwa-192x192.png
├─> Tag: 'lumi-study-reminder' (substitui anterior)
├─> Vibrate: [200, 100, 200]
└─> Actions: [Abrir, Descartar]
```

## Estatísticas & Monitoramento

```
Dashboard Supabase

📊 Usuarios que ativaram
   SELECT COUNT(*) FROM push_subscriptions
   WHERE status = 'active'

📈 Taxa de entrega (7 dias)
   SELECT COUNT(*) FILTER (WHERE delivered) 
          / COUNT(*) * 100 as taxa
   FROM notification_log
   WHERE sent_at > NOW() - '7 days'

🖱️ Taxa de cliques (7 dias)
   SELECT COUNT(*) FILTER (WHERE clicked)
          / COUNT(*) * 100 as taxa
   FROM notification_log
   WHERE sent_at > NOW() - '7 days'

⏰ Distribuição por horário
   SELECT preferred_hour, COUNT(*)
   FROM push_subscriptions
   WHERE status = 'active'
   GROUP BY preferred_hour
   ORDER BY preferred_hour
```

## Performance & Limites

```
Supabase Edge Function
├─> Timeout: 10 segundos
├─> Memory: 512MB
├─> Max concurrent: 1000/segundo
└─> Custo: ~$0.000002 por invocação

Browser Push Notification
├─> Max size: 4KB payload
├─> TTL: 24 horas (configurável)
├─> Network: offline suportado
└─> Prioridade: system-dependent

Banco de Dados
├─> push_subscriptions: ~1KB por linha
├─> notification_log: ~200B por linha
└─> Retenção: 90 dias (ajustável)
```

## Regras Importantes

```
✅ FAZER:
├─> Pedir permissão em contexto amigável
├─> Respeitar a escolha do usuário
├─> Permitir desativar a qualquer momento
├─> Variações de mensagem
├─> Horário configurável
├─> HTTPS obrigatório
└─> Logs de entrega

❌ NÃO FAZER:
├─> Enviar spam (limite 1x por dia)
├─> Notificações sem permissão
├─> Armazenar dados desnecessários
├─> Expor VAPID_PRIVATE_KEY
├─> Nomes humanos no serviço (é funcionalidade)
└─> Mensagens falsas para teste após produção
```

---

**Diagrama atualizado**: 2024-10-07  
**Status**: Pronto para produção após configurar VAPID keys
