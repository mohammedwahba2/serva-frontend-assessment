import { useTranslation } from 'react-i18next'

const seriesColors = {
  rideRevenue: '#FFFFFF', 
  contractRevenue: '#8C8C8C',
} as const

interface RevenueTooltipProps {
  active?: boolean
  payload?: Array<{
    dataKey: string
    value: number
  }>
  label?: string
}

export function RevenueTooltip({ active, payload, label }: RevenueTooltipProps) {
  const { t } = useTranslation()

  if (!active || !payload || payload.length === 0) return null

  const rideValue = payload.find((p) => p.dataKey === 'rideRevenue')?.value ?? 0
  const contractValue = payload.find((p) => p.dataKey === 'contractRevenue')?.value ?? 0
  const total = rideValue + contractValue

  return (
    <div
      style={{
        backgroundColor: '#1A1A1A',
        borderRadius: '10px',
        padding: '12px 16px',
        minWidth: 160,
        color: '#FFFFFF',
      }}
    >
      <p className="text-sm font-medium mb-2">{label}</p>

      <div className="flex items-center justify-between gap-4 mb-1.5">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: seriesColors.rideRevenue }}
          />
          <span className="text-xs text-gray-300">{t('revenue.series.rideRevenue')}</span>
        </div>
        <span className="text-xs font-medium" dir="ltr">
          {rideValue.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 mb-2.5">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: seriesColors.contractRevenue }}
          />
          <span className="text-xs text-gray-300">{t('revenue.series.contractRevenue')}</span>
        </div>
        <span className="text-xs font-medium" dir="ltr">
          {contractValue.toLocaleString()}
        </span>
      </div>

      <div
        className="flex items-center justify-between gap-4 pt-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
      >
        <span className="text-xs text-gray-300">{t('revenue.totalLabel')}</span>
        <span className="text-sm font-bold" dir="ltr">
          {total.toLocaleString()} {t('revenue.currency')}
        </span>
      </div>
    </div>
  )
}