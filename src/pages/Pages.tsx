import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

import { Loader } from '@consta/uikit/Loader'

import PrivateRoutes from '@components/PrivateRoutes'

const Login = lazy(() => import('./Login'))
const AsnPage = lazy(() => import('./AsnPage'))
const GoodPage = lazy(() => import('./GoodPage'))
const OrderPage = lazy(() => import('./OrderPage'))
const Error404Page = lazy(() => import('./Error404Page'))
const ReportPage = lazy(() => import('./ReportPage'))
const HelpPage = lazy(() => import('./HelpPage'))
const AboutPage = lazy(() => import('./AboutPage'))

const renderLoader = (
  <Loader
    style={{
      position: 'fixed',
      inset: '50%',
      width: '100%',
    }}
  />
)

const Pages = () => {
  return (
    <Suspense fallback={renderLoader}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="asn" element={<AsnPage />} />
          <Route path="goods" element={<GoodPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="report/:reportName" element={<ReportPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default Pages
