import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { RouteProps } from '@/types/routes'
import { lazyLoad } from './index'

import Layout from '@/components/Layout/index'

const routes: RouteProps[] = [
  {
    path: '/',
    name: 'dashboard',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        index: true,
        element: <Navigate to='dashboard' />
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        element: lazyLoad(React.lazy(() => import('@/pages/Home')))
      },
      {
        path: 'device',
        name: '设备',
        icon: 'scan',
        children: [
          {
            path: 'list',
            name: '设备',
            index: true,
            element: lazyLoad(React.lazy(() => import('@/pages/Device')))
          },
          {
            path: 'detail',
            name: '设备2',
            element: lazyLoad(React.lazy(() => import('@/pages/Device')))
          }
        ]
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
