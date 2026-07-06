import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { cacheRtl, cacheLtr } from '@/theme/rtlCache'
import { getTheme } from '@/theme/muiTheme'
import { Sidebar } from './shared/layouts/Sidebar/Sidebar'
import { Header } from './features/dashboard/components/Header'
import { useGetOverviewStatsQuery } from '@/features/dashboard/api/dashboardApi'
import { StatCard } from '@/features/dashboard/components/StatCard/StatCard'
import { StatusDrawer } from '@/features/dashboard/components/StatusDrawer'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined'
import { WelcomeBanner } from './features/dashboard/components/WelcomeBanner/WelcomeBanner'
import { RevenueChart } from './features/dashboard/components/RevenueChart/RevenueChart'
import type { OverviewStat } from '@/features/dashboard/types'
import { TrendChart } from '@/features/dashboard/components/TrendChart/TrendChart'
import { VehicleUsageChart } from '@/features/dashboard/components/VehicleUsageChart/VehicleUsageChart'
import { RecentActivity } from '@/features/dashboard/components/RecentActivity'
import { StatCardSkeleton } from './features/dashboard/components/StatCard/StatCardSkeleton'

function App() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  const iconMap = {
    drivers: <PersonOutlineIcon fontSize="small" />,
    vehicles: <DirectionsCarOutlinedIcon fontSize="small" />,
    contracts: <DescriptionOutlinedIcon fontSize="small" />,
    rides: <CommuteOutlinedIcon fontSize="small" />,
  }

const {
  data,
  isLoading: overviewLoading,
} = useGetOverviewStatsQuery()


  const [drawerState, setDrawerState] = useState<{
    statId: OverviewStat['id']
    status: string
  } | null>(null)

  const handleStatusClick = (statId: string, status: string) => {
    setDrawerState({ statId: statId as OverviewStat['id'], status })
  }

  const handleDrawerClose = () => setDrawerState(null)

  const activeStat = data?.find((s) => s.id === drawerState?.statId)

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={getTheme(isRtl ? 'rtl' : 'ltr')}>
        <CssBaseline />
        <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen">
          <Sidebar />
          <div className="flex-1 rtl:mr-16 ltr:ml-16">
            <Header userName={t('defaultUserName')} />
            <WelcomeBanner />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
              {overviewLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <StatCardSkeleton key={index} />
                ))
              : data?.map((stat) => (
                  <StatCard
                    key={stat.id}
                    stat={stat}
                    icon={iconMap[stat.id]}
                    onStatusClick={handleStatusClick}
                  />
                ))}
            </div>

              <div className="px-6 mt-4">
            <RevenueChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 mt-4">
          <VehicleUsageChart />
          <TrendChart />
        </div>
        <div className="px-6 mt-4 mb-6">
        <RecentActivity />
      </div>
          </div>
        </div>

        <StatusDrawer
          open={!!drawerState}
          statId={drawerState?.statId ?? null}
          status={drawerState?.status ?? 'all'}
          statTitleKey={activeStat?.title}
          onClose={handleDrawerClose}
        />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App