import { Card, Skeleton } from '@mui/material'

interface ChartSkeletonProps {
  height?: number
  bars?: number
}

const HEIGHT_PATTERN = [55, 80, 65, 40, 70, 50, 90, 60, 45, 75, 55, 68]

export function ChartSkeleton({ height = 260, bars = 12 }: ChartSkeletonProps) {
  return (
    <Card sx={{ borderRadius: '16px', bgcolor: '#F0EBE3', boxShadow: 'none', p: 3 }}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-2">
          <Skeleton variant="text" width={140} height={28} />
          <Skeleton variant="text" width={100} height={16} />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton variant="rounded" width={110} height={34} sx={{ borderRadius: '6px' }} />
          <Skeleton variant="rounded" width={110} height={34} sx={{ borderRadius: '6px' }} />
        </div>
      </div>

      <div className="flex items-end gap-3" style={{ height }}>
        {Array.from({ length: bars }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            sx={{ flex: 1, borderRadius: '6px 6px 0 0' }}
            height={`${HEIGHT_PATTERN[i % HEIGHT_PATTERN.length]}%`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-5 mt-4">
        <Skeleton variant="text" width={70} height={16} />
        <Skeleton variant="text" width={70} height={16} />
      </div>
    </Card>
  )
}