import { useSelector } from '@/store'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AuthRouter = (props: { children: JSX.Element }) => {
  const token = useSelector(state => state.globalSlice.token)
  console.log(token)
  useEffect(() => {
    console.log(token)
  }, [token])
  console.log(3)
  const { pathname } = useLocation()
  if (pathname === '/login') return props.children
  if (!token) return <Navigate to='/login' replace />

  return props.children
}

export default AuthRouter
