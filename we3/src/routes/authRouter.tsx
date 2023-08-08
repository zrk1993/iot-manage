import { useSelector } from '@/store'
import { Navigate, useLocation } from 'react-router-dom'

const AuthRouter = (props: { children: JSX.Element }) => {
  const token = useSelector(state => state.globalSlice.token)
  const { pathname } = useLocation()
  console.log(pathname, token)
  if (pathname === '/login') return props.children
  if (!token) return <Navigate to='/login' replace />
  return props.children
}

export default AuthRouter
