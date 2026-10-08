import { useEffect, useState } from 'react'
import { Bell, BellOff, Clock } from 'lucide-react'
import {
  isPushEnabled,
  enableNotifications,
  disableNotifications,
  updateNotificationPreference,
  unsubscribeFromPushNotifications,
} from '../lib/pushNotifications'

export function NotificationSettings() {
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hour, setHour] = useState(14)
  const [minute, setMinute] = useState(0)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')

  useEffect(() => {
    checkNotificationStatus()
  }, [])

  const checkNotificationStatus = async () => {
    const isEnabled = await isPushEnabled()
    setEnabled(isEnabled)
  }

  const handleToggle = async () => {
    setLoading(true)
    try {
      if (enabled) {
        // Desabilitar
        const success = await unsubscribeFromPushNotifications()
        if (success) {
          setEnabled(false)
          localStorage.removeItem('lumi_notification_decision')
        }
      } else {
        // Habilitar
        setEnabled(true)
        // Trigger NotificationRequest component
        localStorage.removeItem('lumi_notification_decision')
      }
    } catch (err) {
      console.error('Erro ao alternar notificações:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSavePreference = async () => {
    setSaveStatus('saving')
    try {
      const success = await updateNotificationPreference(hour, minute)
      if (success) {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      }
    } catch (err) {
      console.error('Erro ao salvar preferência:', err)
    }
  }

  if (!('Notification' in window)) {
    return (
      <div className="space-y-3 p-4 rounded-2xl bg-gray-100 border border-gray-200">
        <p className="text-sm text-gray-600">
          Seu navegador não suporta notificações.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Status atual */}
      <div className="p-4 rounded-2xl border-2" style={{
        borderColor: enabled ? '#FF8A1F' : '#999',
        backgroundColor: enabled ? 'rgba(255, 138, 31, 0.05)' : 'rgba(0,0,0,0.02)',
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {enabled ? (
              <>
                <Bell size={24} className="text-orange-500" />
                <div>
                  <p className="font-semibold text-gray-900">Lembretes ativos</p>
                  <p className="text-xs text-gray-600">Você receberá notificações de estudo</p>
                </div>
              </>
            ) : (
              <>
                <BellOff size={24} className="text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-600">Lembretes desativados</p>
                  <p className="text-xs text-gray-600">Você não receberá notificações</p>
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleToggle}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              enabled
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            } disabled:opacity-50`}
          >
            {loading ? '...' : enabled ? 'Desativar' : 'Ativar'}
          </button>
        </div>
      </div>

      {/* Seletor de horário (apenas se ativado) */}
      {enabled && (
        <div className="p-4 rounded-2xl border border-gray-200 space-y-3">
          <label className="flex items-center gap-2 font-semibold text-gray-900">
            <Clock size={20} />
            Horário preferido
          </label>
          <p className="text-xs text-gray-600">
            Escolha a hora do dia que você gostaria de receber lembretes de estudo.
          </p>

          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Hora</label>
              <input
                type="number"
                min="0"
                max="23"
                value={hour}
                onChange={(e) => setHour(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-center font-semibold"
              />
            </div>
            <div className="text-2xl text-gray-400 mt-5">:</div>
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-1">Minuto</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minute}
                onChange={(e) => setMinute(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-center font-semibold"
              />
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Seu lembrete chegará por volta das {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}
          </p>

          <button
            onClick={handleSavePreference}
            disabled={saveStatus === 'saving'}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              saveStatus === 'saved'
                ? 'bg-green-100 text-green-600'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {saveStatus === 'saving' ? 'Salvando...' : saveStatus === 'saved' ? '✅ Salvo!' : 'Salvar horário'}
          </button>
        </div>
      )}

      {/* Informações */}
      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-xs text-blue-900">
          <strong>💡 Dica:</strong> Você pode mudar o horário dos lembretes a qualquer momento. Seus dados são privados e seguros.
        </p>
      </div>
    </div>
  )
}
