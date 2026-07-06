import type { TFunction } from 'i18next'

export function getRelativeTime(isoDate: string, t: TFunction): string {
  const now = Date.now()
  const then = new Date(isoDate).getTime()
  const diffMs = now - then
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return t('activity.time.justNow')
  if (diffMinutes < 60) return t('activity.time.minutesAgo', { count: diffMinutes })
  if (diffHours < 24) return t('activity.time.hoursAgo', { count: diffHours })
  if (diffDays === 1) return t('activity.time.yesterday')
  return t('activity.time.daysAgo', { count: diffDays })
}