import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  DrawerItem,
  OverviewStat,
  PeriodBranchParams,
  RevenuePerformance,
  RevenueQueryParams,
  RidesContractsTrend,
  VehicleUsagePerformance,
  ActivityItem,
} from '../types'
import {
  overviewStats,
  statItemsMock,
  recentActivity,
  getRevenuePerformance,
  getRidesContractsTrend,
  getVehicleUsage,
} from '../mockData'

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getOverviewStats: builder.query<OverviewStat[], void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return { data: overviewStats }
      },
    }),
    getRevenuePerformance: builder.query<RevenuePerformance, RevenueQueryParams>({
      queryFn: async (params) => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return { data: getRevenuePerformance(params) }
      },
    }),
    getStatItems: builder.query<DrawerItem[], OverviewStat['id']>({
      queryFn: async (statId) => {
        await new Promise((resolve) => setTimeout(resolve, 250))
        return { data: statItemsMock[statId] ?? [] }
      },
    }),
    getRidesContractsTrend: builder.query<RidesContractsTrend, PeriodBranchParams>({
      queryFn: async (params) => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return { data: getRidesContractsTrend(params) }
      },
    }),
    getVehicleUsage: builder.query<VehicleUsagePerformance, PeriodBranchParams>({
      queryFn: async (params) => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return { data: getVehicleUsage(params) }
      },
    }),
    getRecentActivity: builder.query<ActivityItem[], void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return { data: recentActivity }
      },
    }),
  }),
})

export const {
  useGetOverviewStatsQuery,
  useGetRevenuePerformanceQuery,
  useGetStatItemsQuery,
  useGetRidesContractsTrendQuery,
  useGetVehicleUsageQuery,
  useGetRecentActivityQuery,
} = dashboardApi