import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
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

const PAGE_SIZE = 10

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
  const [statusFilter, setStatusFilter] = useState(status)
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null)
  const [moreMenu, setMoreMenu] = useState<{ anchor: HTMLElement; itemId: string } | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const { data: items, isLoading } = useGetStatItemsQuery(statId as OverviewStat['id'], {
    skip: !statId,
  })

  // Reset local UI state whenever the drawer is opened for a (possibly new) stat/status
  useEffect(() => {
    if (!open) return
    setSearch('')
    setStatusFilter(status)
    setVisibleLimit(PAGE_SIZE)
    setHiddenIds(new Set())
  }, [open, statId, status])

  const statusOptions = useMemo(() => {
    if (!items) return []
    return Array.from(new Set(items.map((item) => item.statusKey)))
  }, [items])

  const filteredItems = useMemo(() => {
    if (!items) return []
    return items.filter((item) => {
      if (hiddenIds.has(item.id)) return false
      const matchesStatus = statusFilter === 'all' || item.statusKey === statusFilter
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        (item.meta?.toLowerCase().includes(search.toLowerCase()) ?? false)
      return matchesStatus && matchesSearch
    })
  }, [items, statusFilter, search, hiddenIds])

  // Collapse back to the first page whenever the active filters change
  useEffect(() => {
    setVisibleLimit(PAGE_SIZE)
  }, [statusFilter, search])

  const visibleItems = filteredItems.slice(0, visibleLimit)
  const hasMore = visibleLimit < filteredItems.length

  const headerTitle =
    statusFilter === 'all'
      ? t('drawer.allTitle', { title: t(statTitleKey ?? '') })
      : t('drawer.byStatus', { status: t(statusFilter), title: t(statTitleKey ?? '') })

  const actions = statId ? actionConfig[statId] : null
  const placeholderIcon = statId ? placeholderIconMap[statId] : null

  const handleFilterSelect = (value: string) => {
    setStatusFilter(value)
    setFilterAnchor(null)
  }

  const handleRemoveItem = (item: DrawerItem) => {
    setHiddenIds((prev) => new Set(prev).add(item.id))
    setToast(t('drawer.removedToast', { title: item.title }))
    setMoreMenu(null)
  }

  // Menu paper style shared by the filter menu and the per-item "more" menu,
  // pinned to solid white regardless of the theme's default paper color.
  const menuPaperSx = {
    bgcolor: '#FFFFFF',
    borderRadius: '12px',
    minWidth: 180,
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  }

  return (
    <Drawer
      anchor={isRtl ? 'left' : 'right'}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          dir: isRtl ? 'rtl' : 'ltr',
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
            onClick={(e) => setFilterAnchor(e.currentTarget)}
            sx={{
              textTransform: 'none',
              borderColor: statusFilter === 'all' ? '#E0DACF' : '#1A1A1A',
              color: '#1A1A1A',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FilterListIcon fontSize="small" />
            <span>{statusFilter === 'all' ? t('drawer.filter') : t(statusFilter)}</span>
          </Button>
          <Menu
            anchorEl={filterAnchor}
            open={Boolean(filterAnchor)}
            onClose={() => setFilterAnchor(null)}
            slotProps={{ paper: { dir: isRtl ? 'rtl' : 'ltr', sx: menuPaperSx } }}
          >
            <MenuItem selected={statusFilter === 'all'} onClick={() => handleFilterSelect('all')}>
              {t('drawer.filterAll')}
            </MenuItem>
            {statusOptions.map((opt) => (
              <MenuItem key={opt} selected={statusFilter === opt} onClick={() => handleFilterSelect(opt)}>
                {t(opt)}
              </MenuItem>
            ))}
          </Menu>
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
              {visibleItems.map((item) => {
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
                            sx={{
                              textTransform: 'none',
                              fontSize: 11,
                              bgcolor: '#1A1A1A',
                              flex: 1,
                              minWidth: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                            }}
                          >
                            <AddIcon sx={{ fontSize: 14 }} />
                            <span>{t(actions.primaryKey)}</span>
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{
                              textTransform: 'none',
                              fontSize: 11,
                              borderColor: '#E0DACF',
                              color: '#1A1A1A',
                              flex: 1,
                              minWidth: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                            }}
                          >
                            <LaunchIcon sx={{ fontSize: 14 }} />
                            <span>{t(actions.secondaryKey)}</span>
                          </Button>
                          <IconButton
                            size="small"
                            sx={{ bgcolor: 'white', borderRadius: '8px' }}
                            onClick={(e) => setMoreMenu({ anchor: e.currentTarget, itemId: item.id })}
                          >
                            <MoreHorizIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <Menu
                            anchorEl={moreMenu?.itemId === item.id ? moreMenu.anchor : null}
                            open={moreMenu?.itemId === item.id}
                            onClose={() => setMoreMenu(null)}
                            slotProps={{ paper: { dir: isRtl ? 'rtl' : 'ltr', sx: menuPaperSx } }}
                          >
                            <MenuItem onClick={() => setMoreMenu(null)}>
                              {t('drawer.moreMenu.viewDetails')}
                            </MenuItem>
                            <MenuItem onClick={() => handleRemoveItem(item)} sx={{ color: '#C62828' }}>
                              {t('drawer.moreMenu.remove')}
                            </MenuItem>
                          </Menu>
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
            {t('drawer.showing', { count: visibleItems.length, total: filteredItems.length })}
          </span>
          <Button
            size="small"
            variant="contained"
            disabled={!hasMore}
            onClick={() => setVisibleLimit(filteredItems.length)}
            sx={{ textTransform: 'none', bgcolor: '#1A1A1A', '&:hover': { bgcolor: '#1A1A1A' } }}
          >
            {t('drawer.viewFullList')}
          </Button>
        </div>
      </div>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={2500}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: isRtl ? 'left' : 'right' }}
      >
        <Alert onClose={() => setToast(null)} severity="success" variant="filled" sx={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          {toast}
        </Alert>
      </Snackbar>
    </Drawer>
  )
}