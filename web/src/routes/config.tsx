import React from 'react';
import Loading from '../components/Layout/Loading'
import { RouteProps } from '../types/routes'

const createRouteElement = (Comp: React.LazyExoticComponent<React.ComponentType<any>>) => {
  return (
    <React.Suspense fallback={<Loading></Loading>}>
      <Comp />
    </React.Suspense>
  );
}
const Layout = createRouteElement(React.lazy(() => import('../components/Layout/Layout')))

const menus: RouteProps[] = [
  { path: '/', title: '首页', index: true, element: createRouteElement(React.lazy(() => import('../pages/Home'))) },
  { path: '/dashboard2', title: '首页2', element: createRouteElement(React.lazy(() => import('../pages/Home'))) },
  {
    path: '/device',
    title: '设备',
    icon: 'scan',
    element: Layout,
    children: [
      { path: '/device/index2', title: '设备3', index: true, element: createRouteElement(React.lazy(() => import('../pages/Home'))) },
    ]
  },
  {
    path: '/device2',
    title: '设备2',
    icon: 'scan',
    children: [
      { path: '/device2/index3', title: '设备', index: true, element: createRouteElement(React.lazy(() => import('../pages/Home'))) },
      { path: '/device2/index4', title: '设备2', element: createRouteElement(React.lazy(() => import('../pages/Home'))) },
    ]
  }
]

export default menus;