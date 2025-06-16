import { Outlet, Navigate } from 'react-router'
import { useAppSelector } from '@hooks/redux'

const PrivateRoutes = () => {
  const { token } = useAppSelector(state => state.authUser)

  return !token ? <Navigate to="/login" /> : <Outlet />
}

export default PrivateRoutes
