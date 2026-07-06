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