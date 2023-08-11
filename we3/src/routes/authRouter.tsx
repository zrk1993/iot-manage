import { getUserInfo } from '@/api/user'
import { useDispatch, useSelector } from '@/store'
import { setUserInfo } from '@/store/reducers/userSlice'
import { Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate, useLocation } from 'react-router-dom'

const AuthRouter = (props: { children: JSX.Element }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector(state => state.globalSlice.token)
  const username = useSelector(state => state.userSlice.username)
  const { pathname } = useLocation()

  useEffect(() => {
    const getInfo = async () => {
      try {
        const {
          data: { code, data }
        } = await getUserInfo()
        if (code != 0) {
          navigate('/login', { replace: true })
        } else {
          dispatch(setUserInfo(data))
        }
      } catch (error) {
        console.error(error)
      }
    }
    if (token) getInfo()
  }, [token])

  if (pathname === '/login') return props.children
  if (!token) return <Navigate to='/login' replace />
  if (!username) {
    return (
      <Spin
        size='large'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      ></Spin>
    )
  }

  return props.children
}

export default AuthRouter
