import type {
  DrawerItem,
  OverviewStat,
  RidesContractsTrend,
  TrendDataPoint,
  VehicleUsagePerformance,
  VehicleUsageSegment,
  VehicleUsageDataPoint,
  ActivityItem,
  RevenuePerformance,
  RevenueDataPoint,
  RevenueQueryParams,
  PeriodBranchParams,
} from './types'

interface RevenueBucket {
  key: string       
  monthIndex: number 
  rideRevenue: number
  contractRevenue: number
}

interface TrendBucket {
  key: string
  rides: number
  contracts: number
}

export const overviewStats: OverviewStat[] = [
  {
    id: 'drivers',
    title: 'dashboard.stats.drivers.title',
    subtitle: 'dashboard.stats.drivers.subtitle',
    value: 25,
    trend: { percentage: 3, direction: 'down' },
    breakdown: [
      { status: 'dashboard.status.active', count: 18, color: '#4CAF50' },
      { status: 'dashboard.status.onLeave', count: 5, color: '#FFA726' },
      { status: 'dashboard.status.suspended', count: 2, color: '#E53935' },
    ],
  },
  {
    id: 'rides',
    title: 'dashboard.stats.rides.title',
    subtitle: 'dashboard.stats.rides.subtitle',
    value: 182,
    trend: { percentage: 12, direction: 'up' },
    breakdown: [
      { status: 'dashboard.status.completed', count: 150, color: '#4CAF50' },
      { status: 'dashboard.status.inProgress', count: 20, color: '#42A5F5' },
      { status: 'dashboard.status.cancelled', count: 12, color: '#E53935' },
    ],
  },
  {
    id: 'contracts',
    title: 'dashboard.stats.contracts.title',
    subtitle: 'dashboard.stats.contracts.subtitle',
    value: 5700,
    trend: { percentage: 6, direction: 'up' },
    breakdown: [
      { status: 'dashboard.status.activeContract', count: 5200, color: '#4CAF50' },
      { status: 'dashboard.status.expiringSoon', count: 350, color: '#FFA726' },
      { status: 'dashboard.status.expired', count: 150, color: '#9E9E9E' },
    ],
  },
  {
    id: 'vehicles',
    title: 'dashboard.stats.vehicles.title',
    subtitle: 'dashboard.stats.vehicles.subtitle',
    value: 51,
    trend: { percentage: 8, direction: 'up' },
    breakdown: [
      { status: 'dashboard.status.available', count: 18, color: '#4CAF50' },
      { status: 'dashboard.status.onContract', count: 21, color: '#42A5F5' },
      { status: 'dashboard.status.onTrip', count: 6, color: '#616161' },
      { status: 'dashboard.status.reserved', count: 3, color: '#FFA726' },
      { status: 'dashboard.status.outOfService', count: 1, color: '#E53935' },
    ],
  },
]



export const statItemsMock: Record<OverviewStat['id'], DrawerItem[]> = {
  vehicles: [
    { id: 'v1', title: 'Honda Accord 2021', subtitle: 'Sedan · 5678 DEF', meta: '22,400 km', statusKey: 'dashboard.status.available', statusTone: 'success' },
    { id: 'v2', title: 'Ford F-150 2020', subtitle: 'Truck · 9101 GHI', meta: '45,600 km', statusKey: 'dashboard.status.available', statusTone: 'success' },
    { id: 'v3', title: 'Tesla Model 3 2023', subtitle: 'Electric · 1123 JEL', meta: '7,200 km', statusKey: 'dashboard.status.available', statusTone: 'success' },
    { id: 'v4', title: 'Chevrolet Bolt 2022', subtitle: 'Electric · 1415 MNO', meta: '13,300 km', statusKey: 'dashboard.status.available', statusTone: 'success' },
    { id: 'v5', title: 'BMW X5 2021', subtitle: 'SUV · 1617 PQR', meta: '30,100 km', statusKey: 'dashboard.status.onContract', statusTone: 'info' },
    { id: 'v6', title: 'Jeep Wrangler 2020', subtitle: 'SUV · 1819 STU', meta: '40,700 km', statusKey: 'dashboard.status.onContract', statusTone: 'info' },
    { id: 'v7', title: 'Volkswagen Golf 2019', subtitle: 'Hatchback · 2021 VWX', meta: '55,000 km', statusKey: 'dashboard.status.onTrip', statusTone: 'neutral' },
    { id: 'v8', title: 'Nissan Leaf 2023', subtitle: 'Electric · 2223 YZA', meta: '5,800 km', statusKey: 'dashboard.status.reserved', statusTone: 'warning' },
    { id: 'v9', title: 'Subaru Outback 2022', subtitle: 'Wagon · 2425 BCD', meta: '18,400 km', statusKey: 'dashboard.status.available', statusTone: 'success' },
    { id: 'v10', title: 'Mercedes-Benz C-Class 2021', subtitle: 'Sedan · 2627 EFG', meta: '27,900 km', statusKey: 'dashboard.status.outOfService', statusTone: 'danger' },
  ],
  drivers: [
    { id: 'd1', title: 'Khalid Al-Otaibi', subtitle: 'License #C-4821', statusKey: 'dashboard.status.active', statusTone: 'success' },
    { id: 'd2', title: 'Sami Al-Zahrani', subtitle: 'License #C-4790', statusKey: 'dashboard.status.active', statusTone: 'success' },
    { id: 'd3', title: 'Anas Al-Harbi', subtitle: 'License #C-4655', statusKey: 'dashboard.status.onLeave', statusTone: 'warning' },
    { id: 'd4', title: 'Fahad Al-Qahtani', subtitle: 'License #C-4501', statusKey: 'dashboard.status.suspended', statusTone: 'danger' },
  ],
  rides: [
    { id: 'r1', title: 'Ride #R-1032', subtitle: 'Riyadh → Airport', statusKey: 'dashboard.status.completed', statusTone: 'success' },
    { id: 'r2', title: 'Ride #R-1041', subtitle: 'Jeddah → Downtown', statusKey: 'dashboard.status.inProgress', statusTone: 'info' },
    { id: 'r3', title: 'Ride #R-1050', subtitle: 'Riyadh → Mall', statusKey: 'dashboard.status.cancelled', statusTone: 'danger' },
  ],
  contracts: [
    { id: 'c1', title: 'Contract #C-4821', subtitle: 'Toyota Camry', statusKey: 'dashboard.status.activeContract', statusTone: 'success' },
    { id: 'c2', title: 'Contract #C-4655', subtitle: 'Hyundai Sonata', statusKey: 'dashboard.status.expiringSoon', statusTone: 'warning' },
    { id: 'c3', title: 'Contract #C-4102', subtitle: 'Kia Sportage', statusKey: 'dashboard.status.expired', statusTone: 'neutral' },
  ],
}


const TREND_MONTHLY_BUCKETS: TrendBucket[] = [
  { key: 'months.december', rides: 210, contracts: 140 },
  { key: 'months.november', rides: 195, contracts: 130 },
  { key: 'months.october', rides: 240, contracts: 150 },
  { key: 'months.september', rides: 180, contracts: 110 },
  { key: 'months.august', rides: 160, contracts: 95 },
  { key: 'months.july', rides: 170, contracts: 100 },
  { key: 'months.june', rides: 260, contracts: 175 },
  { key: 'months.may', rides: 280, contracts: 190 },
  { key: 'months.april', rides: 250, contracts: 165 },
  { key: 'months.march', rides: 220, contracts: 145 },
  { key: 'months.february', rides: 205, contracts: 135 },
  { key: 'months.january', rides: 190, contracts: 120 },
]

const TREND_WEEKLY_BUCKETS: TrendBucket[] = [
  { key: 'weeks.w1', rides: 48, contracts: 30 },
  { key: 'weeks.w2', rides: 55, contracts: 34 },
  { key: 'weeks.w3', rides: 51, contracts: 32 },
  { key: 'weeks.w4', rides: 60, contracts: 38 },
  { key: 'weeks.w5', rides: 64, contracts: 41 },
  { key: 'weeks.w6', rides: 58, contracts: 36 },
  { key: 'weeks.w7', rides: 40, contracts: 25 },
  { key: 'weeks.w8', rides: 36, contracts: 22 },
]

const TREND_YEARLY_BUCKETS: TrendBucket[] = [
  { key: 'years.y2023', rides: 1900, contracts: 1250 },
  { key: 'years.y2024', rides: 2400, contracts: 1600 },
  { key: 'years.y2025', rides: 2900, contracts: 1950 },
  { key: 'years.y2026', rides: 1800, contracts: 1150 },
  { key: 'years.y2027', rides: 850, contracts: 560 },
]

export function getRidesContractsTrend({ period, branch }: PeriodBranchParams): RidesContractsTrend {
  const buckets =
    period === 'monthly' ? TREND_MONTHLY_BUCKETS : period === 'weekly' ? TREND_WEEKLY_BUCKETS : TREND_YEARLY_BUCKETS

  const factor = BRANCH_FACTORS[branch]

  const data: TrendDataPoint[] = buckets.map((b) => ({
    month: b.key,
    rides: Math.round(b.rides * factor),
    contracts: Math.round(b.contracts * factor),
  }))

  const total = data.reduce((sum, d) => sum + d.rides + d.contracts, 0)

  return { total, data }
}

export const vehicleUsageSegments: VehicleUsageSegment[] = [
  { key: 'riyadh', labelKey: 'usage.branch.riyadh', color: '#1B5E20' },
  { key: 'jeddah', labelKey: 'usage.branch.jeddah', color: '#2E7D32' },
  { key: 'dammam', labelKey: 'usage.branch.dammam', color: '#66BB6A' },
  { key: 'mecca', labelKey: 'usage.branch.mecca', color: '#42A5F5' },
  { key: 'medina', labelKey: 'usage.branch.medina', color: '#9575CD' },
  { key: 'other', labelKey: 'usage.branch.other', color: '#BDBDBD' },
]

const usageKeys = vehicleUsageSegments.map((s) => s.key)

const makeUsageRow = (month: string, base: number[]): { month: string; values: Record<string, number> } => {
  const values: Record<string, number> = {}
  usageKeys.forEach((key, i) => {
    values[key] = base[i]
  })
  return { month, values }
}
const MONTHLY_USAGE_ROWS: VehicleUsageDataPoint[] = [
  makeUsageRow('months.december', [320, 210, 90, 60, 40, 25]),
  makeUsageRow('months.november', [300, 200, 85, 55, 38, 22]),
  makeUsageRow('months.october', [340, 220, 95, 65, 42, 28]),
  makeUsageRow('months.september', [280, 180, 75, 50, 35, 20]),
  makeUsageRow('months.august', [250, 160, 65, 45, 30, 18]),
  makeUsageRow('months.july', [1034, 799, 517, 470, 423, 423]),
  makeUsageRow('months.june', [360, 240, 100, 70, 45, 30]),
  makeUsageRow('months.may', [370, 245, 105, 72, 47, 31]),
  makeUsageRow('months.april', [355, 235, 98, 68, 44, 29]),
  makeUsageRow('months.march', [330, 215, 92, 62, 41, 27]),
  makeUsageRow('months.february', [310, 205, 88, 58, 39, 24]),
  makeUsageRow('months.january', [290, 195, 80, 52, 36, 21]),
]

function scaleUsageValues(values: Record<string, number>, factor: number): Record<string, number> {
  return Object.fromEntries(Object.entries(values).map(([key, v]) => [key, Math.max(0, Math.round(v * factor))]))
}

const WEEKLY_USAGE_LABELS = ['weeks.w1', 'weeks.w2', 'weeks.w3', 'weeks.w4', 'weeks.w5', 'weeks.w6', 'weeks.w7', 'weeks.w8']
const WEEKLY_USAGE_ROWS: VehicleUsageDataPoint[] = WEEKLY_USAGE_LABELS.map((label, i) => ({
  month: label,
  values: scaleUsageValues(MONTHLY_USAGE_ROWS[i % MONTHLY_USAGE_ROWS.length].values, 0.26),
}))

const YEARLY_USAGE_LABELS = ['years.y2023', 'years.y2024', 'years.y2025', 'years.y2026', 'years.y2027']
const YEARLY_USAGE_ROWS: VehicleUsageDataPoint[] = YEARLY_USAGE_LABELS.map((label, i) => ({
  month: label,
  values: scaleUsageValues(MONTHLY_USAGE_ROWS[i % MONTHLY_USAGE_ROWS.length].values, 10 + i * 2),
}))

const UTILIZATION_BY_BRANCH: Record<PeriodBranchParams['branch'], number> = {
  all: 67,
  riyadh: 74,
  jeddah: 58,
}

export function getVehicleUsage({ period, branch }: PeriodBranchParams): VehicleUsagePerformance {
  const rows =
    period === 'monthly' ? MONTHLY_USAGE_ROWS : period === 'weekly' ? WEEKLY_USAGE_ROWS : YEARLY_USAGE_ROWS

  const segments = branch === 'all' ? vehicleUsageSegments : vehicleUsageSegments.filter((s) => s.key === branch)

  const data: VehicleUsageDataPoint[] = rows.map((row) => ({
    month: row.month,
    values: branch === 'all' ? row.values : { [branch]: row.values[branch] ?? 0 },
  }))

  return {
    utilizationPercentage: UTILIZATION_BY_BRANCH[branch],
    segments,
    data,
  }
}
export const recentActivity: ActivityItem[] = [
  {
    id: 'a1',
    type: 'contractCreated',
    titleKey: 'activity.types.contractCreated',
    detail: 'Toyota Camry · Khalid Al-Otaibi · #C-4821',
    statusKey: 'dashboard.status.active',
    statusTone: 'info',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
  },
  {
    id: 'a2',
    type: 'paymentReceived',
    titleKey: 'activity.types.paymentReceived',
    detail: '4,500 SAR · Contract #C-4790',
    statusKey: 'activity.status.completed',
    statusTone: 'success',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5h ago
  },
  {
    id: 'a3',
    type: 'rideCompleted',
    titleKey: 'activity.types.rideCompleted',
    detail: 'Riyadh → King Khalid Intl. Airport · Driver Sami',
    statusKey: 'activity.status.completed',
    statusTone: 'success',
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), // yesterday
  },
  {
    id: 'a4',
    type: 'vehicleReturned',
    titleKey: 'activity.types.vehicleReturned',
    detail: 'Hyundai Sonata · 32,100 km',
    statusKey: 'dashboard.status.available',
    statusTone: 'success',
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(), // yesterday
  },
  {
    id: 'a5',
    type: 'contractExpiring',
    titleKey: 'activity.types.contractExpiring',
    detail: '#C-4655 · Expires in 3 days',
    statusKey: 'activity.status.pending',
    statusTone: 'warning',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
]

const MONTHLY_BUCKETS: RevenueBucket[] = [
  { key: 'months.december', monthIndex: 11, rideRevenue: 15000, contractRevenue: 22000 },
  { key: 'months.november', monthIndex: 10, rideRevenue: 14000, contractRevenue: 21000 },
  { key: 'months.october', monthIndex: 9, rideRevenue: 16000, contractRevenue: 23000 },
  { key: 'months.september', monthIndex: 8, rideRevenue: 10000, contractRevenue: 12000 },
  { key: 'months.august', monthIndex: 7, rideRevenue: 8000, contractRevenue: 9000 },
  { key: 'months.july', monthIndex: 6, rideRevenue: 40000, contractRevenue: 44000 },
  { key: 'months.june', monthIndex: 5, rideRevenue: 34000, contractRevenue: 48000 },
  { key: 'months.may', monthIndex: 4, rideRevenue: 36000, contractRevenue: 52000 },
  { key: 'months.april', monthIndex: 3, rideRevenue: 32000, contractRevenue: 46000 },
  { key: 'months.march', monthIndex: 2, rideRevenue: 28000, contractRevenue: 40000 },
  { key: 'months.february', monthIndex: 1, rideRevenue: 24000, contractRevenue: 35000 },
  { key: 'months.january', monthIndex: 0, rideRevenue: 20000, contractRevenue: 30000 },
]

const WEEKLY_BUCKETS: RevenueBucket[] = [
  { key: 'weeks.w1', monthIndex: 0, rideRevenue: 5200, contractRevenue: 6800 },
  { key: 'weeks.w2', monthIndex: 1, rideRevenue: 6100, contractRevenue: 7200 },
  { key: 'weeks.w3', monthIndex: 2, rideRevenue: 5800, contractRevenue: 7000 },
  { key: 'weeks.w4', monthIndex: 3, rideRevenue: 6700, contractRevenue: 8100 },
  { key: 'weeks.w5', monthIndex: 4, rideRevenue: 7200, contractRevenue: 8600 },
  { key: 'weeks.w6', monthIndex: 5, rideRevenue: 6900, contractRevenue: 8300 },
  { key: 'weeks.w7', monthIndex: 6, rideRevenue: 4300, contractRevenue: 5100 },
  { key: 'weeks.w8', monthIndex: 7, rideRevenue: 3900, contractRevenue: 4700 },
]

const YEARLY_BUCKETS: RevenueBucket[] = [
  { key: 'years.y2023', monthIndex: 0, rideRevenue: 210000, contractRevenue: 280000 },
  { key: 'years.y2024', monthIndex: 1, rideRevenue: 260000, contractRevenue: 340000 },
  { key: 'years.y2025', monthIndex: 2, rideRevenue: 310000, contractRevenue: 400000 },
  { key: 'years.y2026', monthIndex: 3, rideRevenue: 190000, contractRevenue: 230000 },
  { key: 'years.y2027', monthIndex: 4, rideRevenue: 90000, contractRevenue: 110000 },
]

const CURRENT_CURSOR: Record<RevenueQueryParams['period'], number> = {
  monthly: 6,
  weekly: 6,
  yearly: 3,
}

const BRANCH_FACTORS: Record<RevenueQueryParams['branch'], number> = {
  all: 1,
  riyadh: 0.55,
  jeddah: 0.32,
}

function buildRevenueSeries(
  buckets: RevenueBucket[],
  cursor: number,
  branchFactor: number,
): RevenuePerformance {
  const scale = (n: number) => Math.round((n * branchFactor) / 10) * 10

  const data: RevenueDataPoint[] = buckets.map((b) => ({
    month: b.key,
    rideRevenue: scale(b.rideRevenue),
    contractRevenue: scale(b.contractRevenue),
    isFuture: b.monthIndex > cursor,
  }))

  const current = buckets.find((b) => b.monthIndex === cursor) ?? buckets[0]
  const previous = buckets.find((b) => b.monthIndex === cursor - 1)

  const currentTotal = scale(current.rideRevenue + current.contractRevenue)
  const previousTotal = previous ? scale(previous.rideRevenue + previous.contractRevenue) : null

  const rawChange = previousTotal ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0

  return {
    total: currentTotal,
    changePercentage: Math.round(Math.abs(rawChange)),
    changeDirection: rawChange >= 0 ? 'up' : 'down',
    currentPeriodLabel: current.key,
    data,
  }
}

export function getRevenuePerformance({ period, branch, offset }: RevenueQueryParams): RevenuePerformance {
  const buckets =
    period === 'monthly' ? MONTHLY_BUCKETS : period === 'weekly' ? WEEKLY_BUCKETS : YEARLY_BUCKETS

  const defaultCursor = CURRENT_CURSOR[period]
  const cursor = Math.min(Math.max(defaultCursor + offset, 0), buckets.length - 1)

  return buildRevenueSeries(buckets, cursor, BRANCH_FACTORS[branch])
}