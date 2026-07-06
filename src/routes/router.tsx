/* eslint-disable react-refresh/only-export-components */

import { SectionLoader } from '@/features/dashboard/components/SectionLoader'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'


const App = lazy(() => import('@/App'))
const ErrorPage = lazy(() => import('@/ErrorPage'))


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<SectionLoader />}>
        <App />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<SectionLoader />}>
        <ErrorPage />
      </Suspense>
    ),
  },
])