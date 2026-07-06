import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AddIcon from '@mui/icons-material/Add'
import LaunchIcon from '@mui/icons-material/Launch'
import type { DrawerItem, OverviewStat } from '../../types'
import { useGetStatItemsQuery } from '../../api/dashboardApi'

interface StatusDrawerProps {
  open: boolean
  statId: OverviewStat['id'] | null
  status: string
  statTitleKey?: string
  onClose: () => void
}

const toneStyles: Record<DrawerItem['statusTone'], { bg: string; text: string }> = {
  success: { bg: '#E8F5E9', text: '#2E7D32' },
  info: { bg: '#E3F2FD', text: '#1565C0' },
  warning: { bg: '#FFF3E0', text: '#EF6C00' },
  danger: { bg: '#FDECEA', text: '#C62828' },
  neutral: { bg: '#F0F0F0', text: '#616161' },
}

const placeholderIconMap: Record<OverviewStat['id'], React.ReactNode> = {
  vehicles: <DirectionsCarOutlinedIcon sx={{ fontSize: 32, color: '#B8B0A3' }} />,
  drivers: <PersonOutlineIcon sx={{ fontSize: 32, color: '#B8B0A3' }} />,
  rides: <CommuteOutlinedIcon sx={{ fontSize: 32, color: '#B8B0A3' }} />,
  contracts: <DescriptionOutlinedIcon sx={{ fontSize: 32, color: '#B8B0A3' }} />,
}

const actionConfig: Record<OverviewStat['id'], { primaryKey: string; secondaryKey: string }> = {
  vehicles: { primaryKey: 'drawer.actions.contract', secondaryKey: 'drawer.actions.profile' },
  drivers: { primaryKey: 'drawer.actions.assign', secondaryKey: 'drawer.actions.profile' },
  rides: { primaryKey: 'drawer.actions.viewTrip', secondaryKey: 'drawer.actions.profile' },
  contracts: { primaryKey: 'drawer.actions.renew', secondaryKey: 'drawer.actions.profile' },
}

export function StatusDrawer({
  open,
  statId,
  status,
  statTitleKey,
  onClose,
}: StatusDrawerProps) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const [search, setSearch] = useState('')

  const { data: items, isLoading } = useGetStatItemsQuery(statId as OverviewStat['id'], {
    skip: !statId,
  })

  const filteredItems = useMemo(() => {
    if (!items) return []
    return items.filter((item) => {
      const matchesStatus = status === 'all' || item.statusKey === status
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        (item.meta?.toLowerCase().includes(search.toLowerCase()) ?? false)
      return matchesStatus && matchesSearch
    })
  }, [items, status, search])

const headerTitle =
  status === 'all'
    ? t('drawer.allTitle', { title: t(statTitleKey ?? '') })
    : t('drawer.byStatus', { status: t(status), title: t(statTitleKey ?? '') })

  const actions = statId ? actionConfig[statId] : null
  const placeholderIcon = statId ? placeholderIconMap[statId] : null

  const visibleCount = Math.min(filteredItems.length, 10)

  return (
    <Drawer
      anchor={isRtl ? 'left' : 'right'}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
            
          sx: { width: { xs: '100%', sm: 600 }, direction: isRtl ? 'rtl' : 'ltr', bgcolor: '#FFFFFF', borderRadius: 0, boxShadow: 'none' },
        },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between p-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-brand-dark">{headerTitle}</h2>
            <p className="text-xs text-gray-500 mt-0.5" dir="ltr">
              {t('drawer.availableCount', { count: filteredItems.length })}
            </p>
          </div>
          <IconButton size="small" onClick={onClose} aria-label={t('drawer.close')}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="flex items-center gap-2 p-4 border-b border-gray-100">
          <TextField
            fullWidth
            size="small"
            placeholder={t('drawer.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: '#9E9E9E' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="outlined"
            size="medium"
            startIcon={<FilterListIcon fontSize="small" />}
            sx={{ textTransform: 'none', borderColor: '#E0DACF', color: '#1A1A1A', whiteSpace: 'nowrap' }}
          >
            {t('drawer.filter')}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {isLoading && (
            <div className="flex justify-center py-10">
              <CircularProgress size={28} />
            </div>
          )}

          {!isLoading && filteredItems.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-10">
              {t('drawer.noResults')}
            </p>
          )}

          {!isLoading && filteredItems.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {filteredItems.map((item) => {
                const tone = toneStyles[item.statusTone]
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl flex flex-col border border-gray-300"
                  
                  >
                    <div className="relative flex items-center justify-center rounded-t-2xl h-30 bg-gray-100">
                      {placeholderIcon}
                      <span
                        className="absolute top-1.5 text-xs font-medium px-2 py-1 rounded-full ltr:right-1.5 rtl:left-1.5"
                        style={{ backgroundColor: tone.bg, color: tone.text }}
                      >
                        {t(item.statusKey)}
                      </span>
                    </div>
                   <div className="flex flex-col p-4 gap-2">
                    <div className="flex flex-col">
                      <span className="text-md font-semibold text-brand-dark truncate">
                        {item.title}
                      </span>
                      <span className="text-sm text-gray-500 truncate">
                        {item.subtitle}
                        {item.meta ? ` · ${item.meta}` : ''}
                      </span>
                    </div>

                    {actions && (
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                          sx={{
                            textTransform: 'none',
                            fontSize: 11,
                            bgcolor: '#1A1A1A',
                            flex: 1,
                            minWidth: 0,
                            gap: 0.5,
                           
                          }}
                        >
                          {t(actions.primaryKey)}
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
                          sx={{
                            textTransform: 'none',
                            fontSize: 11,
                            borderColor: '#E0DACF',
                            color: '#1A1A1A',
                            flex: 1,
                            minWidth: 0,
                            gap: 0.5,
                          }}
                        >
                          {t(actions.secondaryKey)}
                        </Button>
                        <IconButton size="small" sx={{ bgcolor: 'white', borderRadius: '8px' }}>
                          <MoreHorizIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </div>
                    )}
                  </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>


        <div className="flex items-center justify-between p-4 border-t border-gray-100">
          <span className="text-xs text-gray-500" dir="ltr">
            {t('drawer.showing', { count: visibleCount, total: filteredItems.length })}
          </span>
          <Button
            size="small"
            variant="contained"
            sx={{ textTransform: 'none', bgcolor: '#1A1A1A', '&:hover': { bgcolor: '#1A1A1A' } }}
          >
            {t('drawer.viewFullList')}
          </Button>
        </div>
      </div>
    </Drawer>
  )
}