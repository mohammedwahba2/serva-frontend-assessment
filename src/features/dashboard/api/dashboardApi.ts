import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { OverviewStat, RevenuePerformance } from '../types'
import { overviewStats, revenuePerformance } from '../mockData'

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
    getRevenuePerformance: builder.query<RevenuePerformance, void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 300))
        return { data: revenuePerformance }
      },
    }),
  }),
})

export const { useGetOverviewStatsQuery, useGetRevenuePerformanceQuery } = dashboardApi