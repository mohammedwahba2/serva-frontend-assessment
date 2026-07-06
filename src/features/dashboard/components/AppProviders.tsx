import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { cacheRtl, cacheLtr } from '@/theme/rtlCache'
import { getTheme } from '@/theme/muiTheme'

export function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const { i18n } = useTranslation()

  const isRtl = i18n.language === 'ar'

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={getTheme(isRtl ? 'rtl' : 'ltr')}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}