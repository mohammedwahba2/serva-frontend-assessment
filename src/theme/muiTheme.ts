import { createTheme } from '@mui/material/styles'

export const getTheme = (direction: 'ltr' | 'rtl') =>
  createTheme({
    direction,
  })