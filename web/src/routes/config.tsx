import React from 'react'
import { RouteProps } from '../types/routes'
import { lazyLoad } from './index'

const Layout = lazyLoad(
  React.lazy(() => import('../components/Layout/Layout')),
  { fallback: <div></div> }
)

const routes: RouteProps[] = [
  {
    path: '/',
    title: '首页',
    index: true,
    element: lazyLoad(React.lazy(() => import('../pages/Home')))
  },
  {
    path: '/dashboard2',
    title: '首页2',
    element: lazyLoad(React.lazy(() => import('../pages/Home')))
  },
  {
    path: '/device',
    title: '设备',
    icon: 'scan',
    element: Layout,
    children: [
      {
        path: '/device/index2',
        title: '设备3',
        index: true,
        element: lazyLoad(React.lazy(() => import('../pages/Home')))
      }
    ]
  },
  {
    path: '/device2',
    title: '设备2',
    icon: 'scan',
    element: Layout,
    children: [
      {
        path: '/device2/index3',
        title: '设备',
        index: true,
        element: lazyLoad(React.lazy(() => import('../pages/Device')))
      },
      {
        path: '/device2/index4',
        title: '设备2',
        element: lazyLoad(React.lazy(() => import('../pages/Home')))
      }
    ]
  }
]

export default routes
