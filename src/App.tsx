import { useTranslation } from 'react-i18next'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { cacheRtl, cacheLtr } from '@/theme/rtlCache'
import { getTheme } from '@/theme/muiTheme'

function App() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={getTheme(isRtl ? 'rtl' : 'ltr')}>
        <CssBaseline />
        <div dir={isRtl ? 'rtl' : 'ltr'} className="text-3xl font-bold text-blue-600">
          <h1>{t('welcome', { name: 'Mohamed Wahba' })}</h1>
          <button onClick={() => i18n.changeLanguage(isRtl ? 'en' : 'ar')}>
            Switch Language
          </button>
        </div>
      </ThemeProvider>
      </CacheProvider>
  )
}

export default App