import { IconButton } from '@mui/material'

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const navItems = [
  { icon: DashboardOutlinedIcon, label: 'dashboard' },
  { icon: DirectionsCarOutlinedIcon, label: 'vehicles' },
  { icon: DescriptionOutlinedIcon, label: 'contracts' },
  { icon: PeopleOutlinedIcon, label: 'drivers' },
  { icon: SettingsOutlinedIcon, label: 'settings' },
]

export function Sidebar() {
  return (
    <aside className="fixed top-0 ltr:left-0 rtl:right-0 z-50 flex h-screen w-16 flex-col items-center gap-3 py-6 white">
      {navItems.map(({ icon: Icon, label }, index) => {
        const isActive = index === 0

        return (
          <IconButton
            key={label}
            size="medium"
            sx={{
              borderRadius: '10px',
              ...(isActive
                ? {
                    bgcolor: '#1A1A1A',
                    color: '#FFFFFF',
                    '&:hover': {
                      bgcolor: '#1A1A1A',
                    },
                  }
                : {
                    color: '#6B7280',
                    '&:hover': {
                      bgcolor: '#F3F4F6',
                    },
                  }),
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        )
      })}
    </aside>
  )
}