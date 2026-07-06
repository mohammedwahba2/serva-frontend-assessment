import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from '@/app/store'
import { router } from '@/routes/router'
import '@/index.css'
import '@/i18n/config'
import { AppProviders } from './features/dashboard/components/AppProviders'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </Provider>
  </StrictMode>,
)