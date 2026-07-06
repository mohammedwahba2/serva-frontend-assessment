import { useTranslation } from 'react-i18next'
import { Card, Button } from '@mui/material'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined'
import type { ActivityItem, ActivityType } from '../../types'
import { useGetRecentActivityQuery } from '../../api/dashboardApi'
import { getRelativeTime } from '@/shared/utils/relativeTime'
import LaunchIcon from '@mui/icons-material/Launch'

const iconMap: Record<ActivityType, React.ReactNode> = {
  contractCreated: <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />,
  paymentReceived: <PaymentOutlinedIcon sx={{ fontSize: 16 }} />,
  rideCompleted: <CommuteOutlinedIcon sx={{ fontSize: 16 }} />,
  vehicleReturned: <DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} />,
  contractExpiring: <EventBusyOutlinedIcon sx={{ fontSize: 16 }} />,
}

const iconBg: Record<ActivityType, string> = {
  contractCreated: '#1A1A1A',
  paymentReceived: '#8C8C8C',
  rideCompleted: '#1A1A1A',
  vehicleReturned: '#1A1A1A',
  contractExpiring: '#F5A623',
}

const toneStyles: Record<ActivityItem['statusTone'], { bg: string; text: string }> = {
  success: { bg: '#E8F5E9', text: '#2E7D32' },
  info: { bg: '#E3F2FD', text: '#1565C0' },
  warning: { bg: '#FFF3E0', text: '#EF6C00' },
  danger: { bg: '#FDECEA', text: '#C62828' },
  neutral: { bg: '#F0F0F0', text: '#616161' },
}

export function RecentActivity() {
  const { t } = useTranslation()
  const { data: items } = useGetRecentActivityQuery()

  return (
   <Card sx={{ borderRadius: '16px', bgcolor: '#F0EBE3', boxShadow: 'none', p: 0, overflow: 'hidden', direction: 'rtl' }}>
      <div className="flex items-center justify-between px-5 py-4">
        <Button
          variant="text"
          size="small"
          startIcon={<LaunchIcon fontSize="small"    className='rtl:-scale-x-100 ltr:scale-x-100'/>}
          sx={{ textTransform: 'none', color: '#6B7280', fontSize: 14, gap: .5 }}
        >
          {t('activity.viewAll')}
        </Button>
        <h2 className="text-base font-bold text-brand-dark">{t('activity.title')}</h2>
      </div>


        <div className="flex flex-col">
          {items?.map((item) => {
            const tone = toneStyles[item.statusTone]
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 px-5 py-3 border-t border-white/60"
              >
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {getRelativeTime(item.timestamp, t)}
                </span>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: tone.bg, color: tone.text }}
                  >
                    {t(item.statusKey)}
                  </span>
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="flex flex-col items-end text-end">
                    <span className="text-sm font-medium text-brand-dark">
                      {t(item.titleKey)}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-[320px]">
                      {item.detail}
                    </span>
                  </div>

          

                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white"
                    style={{ backgroundColor: iconBg[item.type] }}
                  >
                    {iconMap[item.type]}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
    </Card>
  )
}