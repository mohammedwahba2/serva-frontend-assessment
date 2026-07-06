import { useState, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Avatar,
  Button,
  Menu,
  MenuItem,
} from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import LanguageIcon from '@mui/icons-material/Language'

import { Logo } from '../Logo'

interface HeaderProps {
  userName: string
}

export function Header({ userName }: HeaderProps) {
  const { t, i18n } = useTranslation()

  const isRtl = i18n.language === 'ar'

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const open = Boolean(anchorEl)

  const toggleLanguage = () => {
    i18n.changeLanguage(isRtl ? 'en' : 'ar')
  }

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ')

    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`
      : name.slice(0, 2)
  }

  return (
    <header className="flex items-center justify-between bg-brand-bg px-6 py-6">
      <Logo />

      <div className="flex items-center gap-4">
        <Button
          variant="outlined"
          size="small"
          startIcon={<LanguageIcon fontSize="small" />}
          onClick={toggleLanguage}
          sx={{
            borderRadius: '50px',
            textTransform: 'none',
          }}
        >
          {t('language')}
        </Button>

        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={handleOpen}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: '#1A1A1A',
              fontSize: 14,
            }}
          >
            {getInitials(userName)}
          </Avatar>

          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-brand-dark">
              {userName}
            </span>

            <span className="text-xs text-gray-400">
              {t('companySubtitle')}
            </span>
          </div>

          <KeyboardArrowDownIcon
            fontSize="small"
            sx={{
              transition: 'transform 0.2s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                direction: isRtl ? 'rtl' : 'ltr',
                minWidth: 180,
                borderRadius: '12px',
                bgcolor: '#FFFFFF',
                border: '1px solid #F0EBE3',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              },
            },
          }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              py: 1.2,
              fontSize: 14,
              color: '#1A1A1A',
              justifyContent: isRtl ? 'flex-end' : 'flex-start',
              textAlign: isRtl ? 'right' : 'left',
              direction: isRtl ? 'rtl' : 'ltr',
              '&:hover': {
                bgcolor: '#F0EBE3',
              },
            }}
          >
            {t('profile')}
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            sx={{
              py: 1.2,
              fontSize: 14,
              color: '#1A1A1A',
              justifyContent: isRtl ? 'flex-end' : 'flex-start',
              textAlign: isRtl ? 'right' : 'left',
              direction: isRtl ? 'rtl' : 'ltr',
              '&:hover': {
                bgcolor: '#F0EBE3',
              },
            }}
          >
              {t('settings')}
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            sx={{
              py: 1.2,
              fontSize: 14,
              color: '#E53935',
              justifyContent: isRtl ? 'flex-end' : 'flex-start',
              textAlign: isRtl ? 'right' : 'left',
              direction: isRtl ? 'rtl' : 'ltr',
              '&:hover': {
                bgcolor: '#FEE9E9',
              },
            }}
          >
              {t('logout')}
          </MenuItem>
        </Menu>
      </div>
    </header>
  )
}