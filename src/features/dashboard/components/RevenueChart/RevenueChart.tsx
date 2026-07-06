import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Select, MenuItem } from '@mui/material'
import { BarChart, Bar, Cell, XAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import type { RevenuePerformance } from '../../types'
import { RevenueTooltip } from './RevenueTooltip'


interface RevenueChartProps {
  data: RevenuePerformance
  onPeriodChange?: (period: string) => void
  onBranchChange?: (branch: string) => void
  onNavigatePrev?: () => void
  onNavigateNext?: () => void
}



const seriesConfig = {
  rideRevenue: { labelKey: 'revenue.series.rideRevenue', color: '#1A1A1A' },
  contractRevenue: { labelKey: 'revenue.series.contractRevenue', color: '#8C8C8C' },
} as const

type SeriesKey = keyof typeof seriesConfig

const periodOptions = [
  { value: 'monthly', labelKey: 'revenue.period.monthly' },
  { value: 'weekly', labelKey: 'revenue.period.weekly' },
  { value: 'yearly', labelKey: 'revenue.period.yearly' },
] as const

const branchOptions = [
  { value: 'all', labelKey: 'revenue.branch.all' },
  { value: 'riyadh', labelKey: 'revenue.branch.riyadh' },
  { value: 'jeddah', labelKey: 'revenue.branch.jeddah' },
] as const



const mutedColor = '#D9D3C7'

export function RevenueChart({
  data,
  onPeriodChange,
  onBranchChange,
  onNavigatePrev,
  onNavigateNext,
}: RevenueChartProps) {
  const { t, i18n } = useTranslation()
  const [period, setPeriod] = useState<string>('monthly')
  const [branch, setBranch] = useState<string>('all')


  const filterSx = {
  fontSize: 14,
  borderRadius: '6px',
  bgcolor: '#FFFFFF',
  '.MuiOutlinedInput-notchedOutline': { borderColor: '#E0DACF' },
  '& .MuiSelect-select': { py: 0.7, px: 1.5 },
}

const menuProps = {
  anchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'right' as const,
  },
  transformOrigin: {
    vertical: 'top' as const,
    horizontal: 'right' as const,
  },
  slotProps: {
    paper: {
    dir: i18n.dir(),
      sx: {
        bgcolor: '#FFFFFF',
        borderRadius: '12px',
        mt: 0.5,
        minWidth: 180,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      },
    },
  },
  MenuListProps: {
    sx: { py: 0.5 },
  },
}



  const [visibleSeries, setVisibleSeries] = useState<Record<SeriesKey, boolean>>({
    rideRevenue: true,
    contractRevenue: true,
  })

  const toggleSeries = (key: SeriesKey) => {
    setVisibleSeries((prev) => {
      const nextValue = !prev[key]
      const otherKey = key === 'rideRevenue' ? 'contractRevenue' : 'rideRevenue'
      if (!nextValue && !prev[otherKey]) return prev
      return { ...prev, [key]: nextValue }
    })
  }

  const handlePeriodChange = (value: string) => {
    setPeriod(value)
    onPeriodChange?.(value)
  }

  const handleBranchChange = (value: string) => {
    setBranch(value)
    onBranchChange?.(value)
  }
const rideRadius: [number, number, number, number] =
  visibleSeries.contractRevenue
    ? [0, 0, 0, 0]
    : [6, 6, 0, 0];

  return (
    <Card sx={{ borderRadius: '16px', bgcolor: '#F0EBE3', boxShadow: 'none', p: 3 }}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-brand-dark">{t('revenue.title')}</h2>
          <p className="text-sm text-gray-500">{t('revenue.subtitle')}</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
            <Select
            value={branch}
            onChange={(e) => handleBranchChange(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={filterSx}
            MenuProps={menuProps}
            renderValue={(value) =>
                `${t('revenue.branch.label')}: ${t(
                branchOptions.find((o) => o.value === value)?.labelKey ?? branchOptions[0].labelKey
                )}`
            }
            >
            {branchOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                {t(opt.labelKey)}
                </MenuItem>
            ))}
            </Select>

          <Select

            value={period}
            onChange={(e) => handlePeriodChange(e.target.value)}
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

      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onNavigatePrev}
          className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer bg-transparent border-none"
        >
         <div className="flex items-center justify-center w-8 h-8 rounded-full  border border-gray-300 ">
                <KeyboardArrowLeftIcon sx={{ fontSize: 16 }} className="rtl:rotate-180" />
            </div>
          <div className="flex flex-col items-start">
            <span className="font-medium  text-sm text-brand-dark">{data.currentPeriodLabel}</span>
            <span>{t('revenue.previousPeriod')}</span>
          </div>
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500">{t('revenue.totalLabel')}</p>
          <div className="flex items-baseline gap-2 justify-center">
            <span className="text-2xl font-bold text-brand-dark" dir="ltr">
              {data.total.toLocaleString()} {t('revenue.currency')}
            </span>
          </div>
          <span className="flex items-center gap-0.5 text-xs text-green-600 justify-center mt-2">
            <TrendingUpIcon sx={{ fontSize: 12 }} />
            <span dir="ltr">%{data.changePercentage}</span>
            <span>{t('revenue.changeLabel')}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={onNavigateNext}
          className="flex items-center justify-center w-8 h-8 rounded-full  border border-gray-300 "
        >
        <KeyboardArrowRightIcon sx={{ fontSize: 16 }} className="rtl:rotate-180" />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data.data} barCategoryGap="30%">
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#9E9E9E' }}
            axisLine={false}
            tickLine={false}
          />
        <Tooltip content={<RevenueTooltip />} cursor={{ fill: 'transparent' }} />
<Bar
  dataKey="rideRevenue"
  stackId="revenue"
  hide={!visibleSeries.rideRevenue}
  fill={seriesConfig.rideRevenue.color}
  radius={rideRadius}
  name={t(seriesConfig.rideRevenue.labelKey)}
>
  {data.data.map((entry, index) => (
    <Cell
      key={index}
      fill={entry.isFuture ? mutedColor : seriesConfig.rideRevenue.color}
    />
  ))}
</Bar>

<Bar
  dataKey="contractRevenue"
  stackId="revenue"
  hide={!visibleSeries.contractRevenue}
  fill={seriesConfig.contractRevenue.color}
  radius={[6, 6, 0, 0]}
  name={t(seriesConfig.contractRevenue.labelKey)}
>
  {data.data.map((entry, index) => (
    <Cell
      key={index}
      fill={entry.isFuture ? mutedColor : seriesConfig.contractRevenue.color}
    />
  ))}
</Bar>
<Legend
  verticalAlign="bottom"
  content={({ payload }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      {payload?.map((entry: any) => (
        <div
          key={entry.dataKey}
          onClick={() => toggleSeries(entry.dataKey)}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            opacity: visibleSeries[entry.dataKey] ? 1 : 0.4,
            gap: 6, // المسافة بين الدائرة والكلمة
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: entry.color,
              display: 'inline-block',
              flexShrink: 0,
            }}
          />

          <span
            style={{
              color: '#4B5563',
              fontSize: 12,
            }}
          >
            {entry.value}
          </span>
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