import { CircularProgress, Box } from '@mui/material'

export const SectionLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      py: 6,
    }}
  >
    <CircularProgress size={28} />
  </Box>
)