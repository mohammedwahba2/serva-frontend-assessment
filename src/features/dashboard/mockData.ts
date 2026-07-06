import type { OverviewStat } from './types'
import type { RevenuePerformance } from './types';
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

export const revenuePerformance: RevenuePerformance = {
  total: 84000,
  changePercentage: 15,
  changeDirection: 'up',
  currentPeriodLabel: 'يوليو',
  data: [
    { month: 'ديسمبر', rideRevenue: 15000, contractRevenue: 22000, isFuture: false },
    { month: 'نوفمبر', rideRevenue: 14000, contractRevenue: 21000, isFuture: false },
    { month: 'أكتوبر', rideRevenue: 16000, contractRevenue: 23000, isFuture: false },
    { month: 'سبتمبر', rideRevenue: 10000, contractRevenue: 12000, isFuture: false },
    { month: 'أغسطس', rideRevenue: 8000, contractRevenue: 9000, isFuture: false },
    { month: 'يوليو', rideRevenue: 9000, contractRevenue: 10000, isFuture: false },
    { month: 'يونيو', rideRevenue: 34000, contractRevenue: 48000, isFuture: false },
    { month: 'مايو', rideRevenue: 36000, contractRevenue: 52000, isFuture: false },
    { month: 'أبريل', rideRevenue: 32000, contractRevenue: 46000, isFuture: false },
    { month: 'مارس', rideRevenue: 28000, contractRevenue: 40000, isFuture: false },
    { month: 'فبراير', rideRevenue: 24000, contractRevenue: 35000, isFuture: false },
    { month: 'يناير', rideRevenue: 20000, contractRevenue: 30000, isFuture: false },
  ],
}
