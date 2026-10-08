import { useEffect, useState } from 'react'
import { Bell, X } from 'lucide-react'
import { requestPushPermission, subscribeToPushNotifications, isPushEnabled } from '../lib/pushNotifications'

export function NotificationRequest() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedHour, setSelectedHour] = useState(14)

  useEffect(() => {
    // Mostrar apenas se:
    // 1. PWA está instalado OU em modo de desenvolvimento
    // 2. Notificações não foram ainda habilitadas
    // 3. Usuário não recusou (verificar localStorage)
    const checkShowPrompt = async () => {
      const isPWA = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true
      const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      const hasDecided = localStorage.getItem('lumi_notification_decision')
      const alreadyEnabled = await isPushEnabled()

      // Mostrar em PWA instalado, em desenvolvimento, ou forçar com ?notif-test=1
      const forceShow = new URLSearchParams(window.location.search).get('notif-test') === '1'
      const shouldShow = (isPWA || isDev || forceShow) && !hasDecided && !alreadyEnabled

      if (shouldShow) {
        // Aguardar 2 segundos para não ser intrusivo
        setTimeout(() => setShow(true), 2000)
      }
    }

    checkShowPrompt()
  }, [])

  const handleEnable = async () => {
    setLoading(true)
    try {
      const permissionGranted = await requestPushPermission()
      if (permissionGranted) {
        const subscribed = await subscribeToPushNotifications(selectedHour)
        if (subscribed) {
          localStorage.setItem('lumi_notification_decision', 'accepted')
          setShow(false)
          console.log('✅ Notificações ativadas com sucesso!')
        }
      } else {
        localStorage.setItem('lumi_notification_decision', 'rejected')
        setShow(false)
      }
    } catch (err) {
      console.error('Erro ao ativar notificações:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDismiss = () => {
    localStorage.setItem('lumi_notification_decision', 'dismissed')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/20">
      {/* Card com animação */}
      <div className="animate-rise w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔔</div>
            <div>
              <p className="font-bold text-lg text-gray-900">Quer receber lembretes?</p>
              <p className="text-xs text-gray-600">Para estudar quando você quiser</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Descrição */}
        <p className="text-sm text-gray-700 mb-4">
          O LUMI pode avisar você quando estiver na hora de continuar seus estudos. Você escolhe o horário que preferir!
        </p>

        {/* Seletor de horário */}
        <div className="mb-5 p-3 rounded-lg bg-orange-50">
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            ⏰ Que horas você gostaria de receber o lembrete?
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              max="23"
              value={selectedHour}
              onChange={(e) => setSelectedHour(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
              className="w-16 px-2 py-1 rounded border border-gray-300 text-center font-semibold"
            />
            <span className="text-gray-600">:00</span>
            <span className="text-xs text-gray-600 ml-2">(você pode mudar depois)</span>
          </div>
        </div>

        {/* Exemplos de mensagens */}
        <div className="mb-5 space-y-2 text-xs text-gray-600">
          <p className="font-semibold text-gray-700">Exemplos de lembretes:</p>
          <div className="space-y-1 text-gray-600">
            <p>📚 "Hora do LUMI! Que tal continuar seus estudos hoje?"</p>
            <p>🌟 "Seu aprendizado continua! Tem uma aula esperando."</p>
            <p>🧠 "Vamos aprender algo novo? Abra o LUMI e continue!"</p>
          </div>
        </div>

        {/* Botões */}
        <div className="space-y-2">
          <button
            onClick={handleEnable}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? '⏳' : <Bell size={18} />}
            {loading ? 'Ativando...' : 'Ativar lembretes'}
          </button>
          <button
            onClick={handleDismiss}
            className="w-full py-2 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Agora não
          </button>
        </div>

        {/* Nota sobre privacidade */}
        <p className="mt-4 text-xs text-gray-500 text-center">
          Suas notificações são privadas e você pode desativar a qualquer momento.
        </p>
      </div>
    </div>
  )
}
