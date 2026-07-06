import { useTranslation } from 'react-i18next'

export function WelcomeBanner() {
  const { t } = useTranslation()

  return (
    <div className="px-6 pb-4 space-y-1">
      <p className="text-sm text-gray-500">{t('companySubtitle')}</p>
      <h1 className="text-2xl font-semibold text-brand-dark"> {t('welcome', { name: t('defaultUserName') })}</h1>
      <p className="text-sm text-gray-700">{t('welcomeSubtitle')}</p>
    </div>
  )
}