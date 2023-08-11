import { RouteProps } from '@/types/routes'
import { AlertFilled, PieChartFilled } from '@ant-design/icons'
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
    path: 'device',
    icon: <AlertFilled />,
    name: '设备管理',
    element: lazyLoad(React.lazy(() => import('@/pages/device')))
  }
]

export default routes
