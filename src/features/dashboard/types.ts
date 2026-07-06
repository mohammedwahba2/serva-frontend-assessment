export type TrendDirection = 'up' | 'down'

export interface StatusBreakdownItem {
  status: string
  count: number
  color: string
}

export interface OverviewStat {
  id: 'vehicles' | 'contracts' | 'rides' | 'drivers'
  title: string
  subtitle: string
  value: number
  trend: {
    percentage: number
    direction: TrendDirection
  }
  breakdown: StatusBreakdownItem[]
}

export interface RevenueDataPoint {
  month: string
  rideRevenue: number | null
  contractRevenue: number | null
  isFuture: boolean
}

export interface RevenuePerformance {
  total: number
  changePercentage: number
  changeDirection: TrendDirection
  currentPeriodLabel: string
  data: RevenueDataPoint[]
}

export interface DrawerItem {
  id: string
  title: string
  subtitle: string
  statusKey: string 
  meta?: string
}

export interface DrawerItem {
  id: string
  title: string
  subtitle: string
  meta?: string
  statusKey: string
  statusTone: 'success' | 'info' | 'warning' | 'danger' | 'neutral'
}
