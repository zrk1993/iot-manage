import Layout from '@/components/Layout/index'
import { RouteProps } from '@/types/routes'
import { AlertFilled, PieChartFilled } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'

import lazyLoad from './lazyLoad'

const routes: RouteProps[] = [
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        index: true,
        icon: <PieChartFilled />,
        name: '控制面板',
        element: lazyLoad(React.lazy(() => import('@/pages/Home')))
      },
      {
        path: 'device',
        icon: <AlertFilled />,
        name: '设备管理',
        element: lazyLoad(React.lazy(() => import('@/pages/Device')))
      },
      {
        path: '/*',
        element: (
          <Link to={'/'}>
            <span>Back Home</span>
          </Link>
        )
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    element: lazyLoad(React.lazy(() => import('@/pages/Login')))
  }
]

export default routes
