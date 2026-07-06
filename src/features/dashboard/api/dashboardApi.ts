import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  DrawerItem,
  OverviewStat,
  RevenuePerformance,
  RevenueQueryParams,
  RidesContractsTrend,
  VehicleUsagePerformance,
  ActivityItem,
} from '../types'
import {
  overviewStats,
  statItemsMock,
  ridesContractsTrend,
  vehicleUsage,
  recentActivity,
  getRevenuePerformance,
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
    getRidesContractsTrend: builder.query<RidesContractsTrend, void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return { data: ridesContractsTrend }
      },
    }),
    getVehicleUsage: builder.query<VehicleUsagePerformance, void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return { data: vehicleUsage }
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