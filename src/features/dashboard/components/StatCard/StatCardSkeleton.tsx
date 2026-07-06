import {  Skeleton, Card } from '@mui/material'

export function StatCardSkeleton() {
  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 2.5,
        boxShadow: 'none',
        bgcolor: '#F0EBE3',
      }}
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <Skeleton width="40%" height={40} />
          <Skeleton width="60%" />
          <Skeleton width="45%" />
        </div>

        <Skeleton
          variant="circular"
          width={40}
          height={40}
        />
      </div>

      <Skeleton
        width="70%"
        height={24}
        sx={{ mt: 3 }}
      />
    </Card>
  )
}