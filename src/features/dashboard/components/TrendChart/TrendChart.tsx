import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Select, MenuItem } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import type { BranchValue, PeriodValue } from '../../types'
import { useGetRidesContractsTrendQuery } from '../../api/dashboardApi'
import { TrendTooltip } from './TrendTooltip'
import { ChartSkeleton } from '../ChartSkeleton'
import type { Props as LegendContentProps } from 'recharts/types/component/DefaultLegendContent'

const seriesConfig = {
  rides: { labelKey: 'trend.series.rides', color: '#1A1A1A' },
  contracts: { labelKey: 'trend.series.contracts', color: '#B0AFAF' },
} as const

type SeriesKey = keyof typeof seriesConfig

const periodOptions = [
  { value: 'monthly', labelKey: 'trend.period.monthly' },
  { value: 'weekly', labelKey: 'trend.period.weekly' },
  { value: 'yearly', labelKey: 'trend.period.yearly' },
] as const

const branchOptions = [
  { value: 'all', labelKey: 'revenue.branch.all' },
  { value: 'riyadh', labelKey: 'revenue.branch.riyadh' },
  { value: 'jeddah', labelKey: 'revenue.branch.jeddah' },
] as const

export function TrendChart() {
  const { t, i18n } = useTranslation()
  const [period, setPeriod] = useState<PeriodValue>('monthly')
  const [branch, setBranch] = useState<BranchValue>('all')

  const { data, isLoading } = useGetRidesContractsTrendQuery({ period, branch })

  const [visibleSeries, setVisibleSeries] = useState<Record<SeriesKey, boolean>>({
    rides: true,
    contracts: true,
  })

  const toggleSeries = (key: SeriesKey) => {
    setVisibleSeries((prev) => {
      const nextValue = !prev[key]
      const otherKey = key === 'rides' ? 'contracts' : 'rides'
      if (!nextValue && !prev[otherKey]) return prev
      return { ...prev, [key]: nextValue }
    })
  }

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

  if (isLoading || !data) {
    return <ChartSkeleton height={220} />
  }

  const maxValue = Math.max(...data.data.flatMap((d) => [d.rides, d.contracts]), 1)
  const yDomain: [number, number] = [0, Math.ceil(maxValue * 1.1)]

  return (
    <Card sx={{ borderRadius: '16px', bgcolor: '#F0EBE3', boxShadow: 'none', p: 3 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-brand-dark">{t('trend.title')}</h2>

        <div className="flex items-center gap-2">
          <Select
            value={branch}
            onChange={(e) => setBranch(e.target.value as BranchValue)}
            IconComponent={KeyboardArrowDownIcon}
            sx={filterSx}
            MenuProps={menuProps}
            renderValue={(value) =>
              `${t('trend.branch.label')}: ${t(branchOptions.find((o) => o.value === value)?.labelKey ?? branchOptions[0].labelKey)}`
            }
          >
            {branchOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{t(opt.labelKey)}</MenuItem>
            ))}
          </Select>

          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodValue)}
            IconComponent={KeyboardArrowDownIcon}
            sx={filterSx}
            MenuProps={menuProps}
            renderValue={(value) =>
              `${t('trend.period.label')}: ${t(periodOptions.find((o) => o.value === value)?.labelKey ?? periodOptions[0].labelKey)}`
            }
          >
            {periodOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{t(opt.labelKey)}</MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-bold text-brand-dark" dir="ltr">
          {data.total.toLocaleString('en-US')}
        </span>
        <span className="text-sm text-gray-500">{t('trend.totalLabel')}</span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data.data} barCategoryGap="30%">
          <XAxis
            dataKey="month"
            tickFormatter={(value) => t(value)}
            tick={{ fontSize: 12, fill: '#9E9E9E' }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis hide domain={yDomain} />
          <Tooltip content={<TrendTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
          <Bar
            dataKey="rides"
            hide={!visibleSeries.rides}
            fill={seriesConfig.rides.color}
            radius={[4, 4, 0, 0]}
            name={t(seriesConfig.rides.labelKey)}
            isAnimationActive
            animationDuration={500}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="contracts"
            hide={!visibleSeries.contracts}
            fill={seriesConfig.contracts.color}
            radius={[4, 4, 0, 0]}
            name={t(seriesConfig.contracts.labelKey)}
            isAnimationActive
            animationDuration={500}
            animationEasing="ease-out"
          />
          <Legend
            verticalAlign="bottom"
            content={(props: LegendContentProps) => (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                {props.payload?.map((entry) => (
                  <div
                    key={String(entry.dataKey)}
                    onClick={() => toggleSeries(entry.dataKey as SeriesKey)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer',
                      opacity: visibleSeries[entry.dataKey as SeriesKey] ? 1 : 0.4,
                      transition: 'opacity 0.15s ease',
                    }}
                  >
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: entry.color, display: 'inline-block' }} />
                    <span style={{ color: '#4B5563', fontSize: 12 }}>{entry.value}</span>
                  </div>
                ))}
              </div>
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}