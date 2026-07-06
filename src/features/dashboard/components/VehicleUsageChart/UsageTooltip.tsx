import { useTranslation } from 'react-i18next'
import type { VehicleUsageSegment } from '../../types'

interface UsageTooltipProps {
  active?: boolean
  payload?: Array<{ dataKey: string; value: number; color?: string }>
  label?: string
  segments: VehicleUsageSegment[]
}

export function UsageTooltip({ active, payload, label, segments }: UsageTooltipProps) {
  const { t } = useTranslation()

  if (!active || !payload || payload.length === 0) return null

  const total = payload.reduce((sum, p) => sum + (p.value ?? 0), 0)

  return (
    <div
      style={{
        backgroundColor: '#1A1A1A',
        borderRadius: '10px',
        padding: '12px 16px',
        minWidth: 170,
        color: '#FFFFFF',
      }}
    >
     <p className="text-sm font-medium mb-2">{label ? t(label) : ''}</p>


      {segments.map((seg) => {
        const value = payload.find((p) => p.dataKey === seg.key)?.value ?? 0
        const pct = total ? Math.round((value / total) * 100) : 0
        return (
          <div key={seg.key} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-xs text-gray-300">{t(seg.labelKey)}</span>
            </div>
            <span className="text-xs font-medium" dir="ltr">
              {value.toLocaleString()} ({pct}%)
            </span>
          </div>
        )
      })}
    </div>
  )
}