import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Grow } from '@mui/material'
import { PieChart, Pie, Cell } from 'recharts'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LaunchIcon from '@mui/icons-material/Launch'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import type { OverviewStat } from '../../types'

interface StatCardProps {
  stat: OverviewStat
  icon: React.ReactNode
  onStatusClick?: (statId: string, status: string) => void
}

export function StatCard({
  stat,
  icon,
  onStatusClick,
}: StatCardProps) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  const [isHovered, setIsHovered] = useState(false)
  const isUp = stat.trend.direction === 'up'

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        sx={{
          borderRadius: '16px',
          bgcolor: '#F0EBE3',
          boxShadow: 'none',
          p: 2.5,
          position: 'relative',
          zIndex: isHovered ? 20 : 1,
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start space-y-1">
            <span
              className="text-3xl font-semibold text-brand-dark"
              dir="ltr"
            >
              {stat.value.toLocaleString()}
            </span>

            <span className="text-md text-brand-dark mt-1">
              {t(stat.title)}
            </span>

            <span className="text-sm text-gray-500">
              {t(stat.subtitle)}
            </span>
          </div>

          <div className="text-brand-dark bg-white/60 rounded-full w-10 h-10 flex items-center justify-center">
            {icon}
          </div>
        </div>

        <div
          className={`flex items-center gap-1 mt-5 text-xs ${
            isUp ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isUp ? (
            <TrendingUpIcon sx={{ fontSize: 14 }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 14 }} />
          )}

          <span dir="ltr">{stat.trend.percentage}%</span>
          <span>{t('dashboard.stats.comparedToLastMonth')}</span>
        </div>
      </Card>

      <Grow
        in={isHovered}
        timeout={200}
        style={{ transformOrigin: 'top' }}
      >
        <Card
          sx={{
            position: 'absolute',
            top: '100%',
            insetInlineEnd: 0,
            mt: 1,
            width: '100%',
            borderRadius: '16px',
            bgcolor: '#FFFFFF',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            p: 2.5,
            zIndex: 30,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-brand-dark">
                    {t('dashboard.stats.byStatus', {
                title: t(stat.title),
                })}
            </span>

           <Button
            variant="outlined"
            size="small"
            onClick={() => onStatusClick?.(stat.id, 'all')}
            className="text-xs text-gray-500 hover:text-brand-dark"
            endIcon={<LaunchIcon fontSize="small"    className='rtl:-scale-x-100 ltr:scale-x-100'/>}
            sx={{
            textTransform: 'none',
          }}
          >
            {t('dashboard.stats.viewAll')}
          </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 flex flex-col gap-2">
              {stat.breakdown.map((item) => (
                <button
                  key={t(item.status)}
                  onClick={() =>
                    onStatusClick?.(stat.id, item.status)
                  }
                  className="flex items-center justify-between text-xs cursor-pointer hover:opacity-70"
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span className="text-brand-dark">
                    {t(item.status)}
                    </span>
                  </span>

                  <span
                    className="text-gray-500"
                    dir="ltr"
                  >
                    {item.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative flex items-center justify-center shrink-0">
              <PieChart width={90} height={90}>
                <Pie
                  data={stat.breakdown}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={28}
                  outerRadius={42}
                  paddingAngle={2}
                  stroke="none"
                >
                  {stat.breakdown.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
              </PieChart>

              <div className="absolute flex flex-col items-center">
                <span
                  className="text-base font-bold text-brand-dark"
                  dir="ltr"
                >
                  {stat.value}
                </span>

                <span className="text-[10px] text-gray-500">
                  {t(stat.title)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Grow>
    </div>
  )
}