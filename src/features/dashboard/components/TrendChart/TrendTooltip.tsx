import { useTranslation } from 'react-i18next'

interface TrendTooltipProps {
  active?: boolean
  payload?: Array<{ dataKey: string; value: number }>
  label?: string
}

export function TrendTooltip({ active, payload, label }: TrendTooltipProps) {
  const { t } = useTranslation()

  if (!active || !payload || payload.length === 0) return null

  const rides = payload.find((p) => p.dataKey === 'rides')?.value ?? 0
  const contracts = payload.find((p) => p.dataKey === 'contracts')?.value ?? 0

  return (
    <div
      style={{
        backgroundColor: '#1A1A1A',
        borderRadius: '10px',
        padding: '12px 16px',
        minWidth: 150,
        color: '#FFFFFF',
      }}
    >
      <p className="text-sm font-medium mb-2"><p>{label ? t(label) : ''}</p></p>

      <div className="flex items-center justify-between gap-4 mb-1.5">
        <span className="text-xs text-gray-300">{t('trend.series.rides')}</span>
        <span className="text-xs font-medium" dir="ltr">{rides.toLocaleString()}</span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-gray-300">{t('trend.series.contracts')}</span>
        <span className="text-xs font-medium" dir="ltr">{contracts.toLocaleString()}</span>
      </div>
    </div>
  )
}