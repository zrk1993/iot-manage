import Layout from '@/components/Layout'
import { RouteProps } from '@/types/routes'
import React from 'react'
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'

import config from './config'
import lazyLoad from './lazyLoad'

const rootRouter: RouteProps[] = [
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      ...config,
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
    element: lazyLoad(React.lazy(() => import('@/pages/login/index')))
  },
  {
    path: '/test',
    name: 'test',
    element: lazyLoad(React.lazy(() => import('@/pages/test/index')))
  }
]

const Router = () => {
  return useRoutes(rootRouter)
}

export default Router
