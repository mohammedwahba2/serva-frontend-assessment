import type { DrawerItem, OverviewStat } from './types'
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