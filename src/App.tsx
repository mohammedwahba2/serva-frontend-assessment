import { useTranslation } from 'react-i18next'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { cacheRtl, cacheLtr } from '@/theme/rtlCache'
import { getTheme } from '@/theme/muiTheme'
import { Sidebar } from './shared/layouts/Sidebar/Sidebar'
import { Header } from './features/dashboard/components/Header'

function App() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

   return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={getTheme(isRtl ? 'rtl' : 'ltr')}>
        <CssBaseline />
        <div dir={isRtl ? 'rtl' : 'ltr'} className="flex bg-brand-bg min-h-screen">
          <Sidebar />
            <div className="flex-1">
              <Header userName={t('defaultUserName')} />
            </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App