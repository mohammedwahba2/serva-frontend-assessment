import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Select, MenuItem } from '@mui/material'
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import type { VehicleUsagePerformance } from '../../types'
import { UsageTooltip } from './UsageTooltip'

interface VehicleUsageChartProps {
  data: VehicleUsagePerformance
  onPeriodChange?: (period: string) => void
  onBranchChange?: (branch: string) => void
}

const periodOptions = [
  { value: 'monthly', labelKey: 'usage.period.monthly' },
  { value: 'weekly', labelKey: 'usage.period.weekly' },
  { value: 'yearly', labelKey: 'usage.period.yearly' },
] as const

const branchOptions = [
  { value: 'all', labelKey: 'revenue.branch.all' },
  { value: 'riyadh', labelKey: 'revenue.branch.riyadh' },
  { value: 'jeddah', labelKey: 'revenue.branch.jeddah' },
] as const


export function VehicleUsageChart({
  data,
  onPeriodChange,
  onBranchChange,
}: VehicleUsageChartProps) {
  const { t, i18n } = useTranslation()
  const [period, setPeriod] = useState<string>('monthly')
  const [branch, setBranch] = useState<string>('all')

  const [visibleSegments, setVisibleSegments] = useState<Record<string, boolean>>(
    () => Object.fromEntries(data.segments.map((s) => [s.key, true]))
  )

  const toggleSegment = (key: string) => {
    setVisibleSegments((prev) => {
      const nextValue = !prev[key]
      const activeCount = Object.values(prev).filter(Boolean).length

      if (!nextValue && activeCount <= 1) return prev
      return { ...prev, [key]: nextValue }
    })
  }

  const chartData = data.data.map((row) => ({ month: row.month, ...row.values }))

  const filterSx = {
  fontSize: 14,
  borderRadius: '6px',
  bgcolor: '#FFFFFF',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#E0DACF' },
  '& .MuiSelect-select': { py: 0.7, px: 1.5 },
}

  const menuProps = {
    slotProps: {
      paper: {
        dir: i18n.dir(),
        sx: { bgcolor: '#FFFFFF', borderRadius: '12px', mt: 0.5, minWidth: 160 },
      },
    },
  }

  return (
    <Card sx={{ borderRadius: '16px', bgcolor: '#F0EBE3', boxShadow: 'none', p: 3 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-brand-dark">{t('usage.title')}</h2>

        <div className="flex items-center gap-2">
          <Select
            value={branch}
            onChange={(e) => { setBranch(e.target.value); onBranchChange?.(e.target.value) }}
            IconComponent={KeyboardArrowDownIcon}
            sx={filterSx}
            MenuProps={menuProps}
            renderValue={(value) =>
              `${t('usage.branch.label')}: ${t(branchOptions.find((o) => o.value === value)?.labelKey ?? branchOptions[0].labelKey)}`
            }
          >
            {branchOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{t(opt.labelKey)}</MenuItem>
            ))}
          </Select>



  
            <Select
  
              value={period}
              onChange={(e) => { setPeriod(e.target.value); onPeriodChange?.(e.target.value) }}
              IconComponent={KeyboardArrowDownIcon}
              sx={filterSx}
              MenuProps={menuProps}
              renderValue={(value) =>
                `${t('revenue.period.label')}: ${t(
                  periodOptions.find((o) => o.value === value)?.labelKey ?? periodOptions[0].labelKey
                )}`
              }
            >
              {periodOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {t(opt.labelKey)}
                </MenuItem>
              ))}
            </Select>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          {data.segments.map((seg) => (
            <button
              key={seg.key}
              type="button"
              onClick={() => toggleSegment(seg.key)}
              className="flex items-center gap-1.5 text-xs cursor-pointer bg-transparent border-none p-0"
              style={{ opacity: visibleSegments[seg.key] ? 1 : 0.4 }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-gray-600">{t(seg.labelKey)}</span>
            </button>
          ))}
        </div>

        <div className="text-end">
          <span className="text-xs text-gray-500 me-1">{t('usage.totalLabel')}</span>
          <span className="text-xl font-bold text-brand-dark" dir="ltr">
            {data.utilizationPercentage}%
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} barCategoryGap="30%">
        <XAxis
          dataKey="month"
          tickFormatter={(value) => t(value)}
          tick={{ fontSize: 12, fill: '#9E9E9E' }}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
          <Tooltip content={<UsageTooltip segments={data.segments} />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
          {data.segments.map((seg) => (
            <Bar
              key={seg.key}
              dataKey={seg.key}
              stackId="usage"
              hide={!visibleSegments[seg.key]}
              fill={seg.color}
              name={t(seg.labelKey)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}