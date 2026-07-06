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

export type PeriodValue = 'monthly' | 'weekly' | 'yearly'
export type BranchValue = 'all' | 'riyadh' | 'jeddah'

export interface RevenueQueryParams {
  period: PeriodValue
  branch: BranchValue
  offset: number 
}

export interface DrawerItem {
  id: string
  title: string
  subtitle: string
  meta?: string
  statusKey: string
  statusTone: 'success' | 'info' | 'warning' | 'danger' | 'neutral'
}

export interface TrendDataPoint {
  month: string
  rides: number
  contracts: number
}

export interface RidesContractsTrend {
  total: number
  data: TrendDataPoint[]
}

export interface VehicleUsageSegment {
  key: string
  labelKey: string
  color: string
}

export interface VehicleUsageDataPoint {
  month: string
  values: Record<string, number>
}

export interface VehicleUsagePerformance {
  utilizationPercentage: number
  segments: VehicleUsageSegment[]
  data: VehicleUsageDataPoint[]
}

export type ActivityType =
  | 'contractCreated'
  | 'paymentReceived'
  | 'rideCompleted'
  | 'vehicleReturned'
  | 'contractExpiring'

export interface ActivityItem {
  id: string
  type: ActivityType
  titleKey: string
  detail: string
  statusKey: string
  statusTone: 'success' | 'info' | 'warning' | 'danger' | 'neutral'
  timestamp: string
}

export interface PeriodBranchParams {
  period: PeriodValue
  branch: BranchValue
}