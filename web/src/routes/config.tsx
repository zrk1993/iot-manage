import { RouteProps } from '@/types/routes'
import { AlertFilled, BulbFilled, ControlFilled, PieChartFilled, SoundFilled, TagFilled, VideoCameraFilled } from '@ant-design/icons'
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
    icon: <ControlFilled />,
    name: 'OTA升级',
    element: lazyLoad(React.lazy(() => import('@/pages/firmware')))
  },
  {
    path: '/firmware/detail/:id',
    meta: { hide: true },
    element: lazyLoad(React.lazy(() => import('@/pages/firmware/detail')))
  },
  {
    path: '/log',
    icon: <VideoCameraFilled />,
    name: '日志服务',
    element: lazyLoad(React.lazy(() => import('@/pages/device')))
  },
  {
    path: '/cron',
    icon: <TagFilled />,
    name: '定时任务',
    element: lazyLoad(React.lazy(() => import('@/pages/device')))
  },
  {
    path: '/event',
    icon: <SoundFilled />,
    name: '事件响应',
    element: lazyLoad(React.lazy(() => import('@/pages/device')))
  }
]

export default routes
