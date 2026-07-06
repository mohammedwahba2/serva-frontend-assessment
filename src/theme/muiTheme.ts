import { createTheme } from '@mui/material/styles'

export const getTheme = (direction: 'ltr' | 'rtl') =>
  createTheme({
    direction,
    typography: {
      fontFamily:
        direction === 'rtl'
          ? "'Cairo', 'Roboto', sans-serif"
          : "'Inter', 'Roboto', sans-serif",
    },
    palette: {
      primary: {
        main: '#1A1A1A',
      },
      background: {
        default: '#F5F1EC',
        paper: '#EDE7DE',
      },
      text: {
        primary: '#1A1A1A',
      },
      success: {
        main: '#4CAF50',
      },
      error: {
        main: '#E53935',
      },
    },
  })