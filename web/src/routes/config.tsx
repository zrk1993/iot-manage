import { RouteProps } from '@/types/routes'
import { AlertFilled, BulbFilled, PieChartFilled } from '@ant-design/icons'
import React from 'react'

import lazyLoad from './lazyLoad'

const routes: RouteProps[] = [
  {
    path: '/',
    index: true,
    icon: <PieChartFilled />,
    name: '控制面板',
    element: lazyLoad(React.lazy(() => import('@/pages/home')))
  },
  {
    path: '/product',
    icon: <BulbFilled />,
    name: '产品管理',
    element: lazyLoad(React.lazy(() => import('@/pages/product')))
  },
  {
    path: '/product/detail/:id',
    meta: { hide: true },
    element: lazyLoad(React.lazy(() => import('@/pages/product/detail')))
  },
  {
    path: '/device',
    icon: <AlertFilled />,
    name: '设备管理',
    element: lazyLoad(React.lazy(() => import('@/pages/device')))
  },
  {
    path: '/device/detail/:id',
    meta: { hide: true },
    element: lazyLoad(React.lazy(() => import('@/pages/device/detail')))
  },
  {
    path: '/ota',
    icon: <AlertFilled />,
    name: 'OTA升级',
    element: lazyLoad(React.lazy(() => import('@/pages/device')))
  },
  {
    path: '/log',
    icon: <AlertFilled />,
    name: '日志服务',
    element: lazyLoad(React.lazy(() => import('@/pages/device')))
  },
  {
    path: '/cron',
    icon: <AlertFilled />,
    name: '定时任务',
    element: lazyLoad(React.lazy(() => import('@/pages/device')))
  },
  {
    path: '/event',
    icon: <AlertFilled />,
    name: '事件响应',
    element: lazyLoad(React.lazy(() => import('@/pages/device')))
  }
]

export default routes
