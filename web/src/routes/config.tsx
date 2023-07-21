import React from 'react';
import type { RouteObject } from "react-router";
import Loading from '../components/Layout/Loading'

export type IMenu = RouteObject & {
  children?: IMenu[];
  title?: string;
  icon?: string;
};

const createRouteElement = (path: string) => {
  const Comp = React.lazy(() => import(path))
  return (
    <React.Suspense fallback={<Loading></Loading>}>
      <Comp />
    </React.Suspense>
  );
}
const menus: IMenu[] = [
  { path: '/', title: '首页', index: true, element: createRouteElement('../pages/Home.tsx') },
  { path: '/dashboard2', title: '首页2', element: createRouteElement('../pages/Home') },
  {
    path: '/device',
    title: '设备',
    icon: 'scan',
    children: [
      { path: '/device/index2', title: '设备3', index: true, element: createRouteElement('../pages/Device') },
    ]
  },
  {
    path: '/device2',
    title: '设备2',
    icon: 'scan',
    children: [
      { path: '/device/index3', title: '设备', index: true, element: createRouteElement('../pages/Home') },
      { path: '/device/index4', title: '设备2', element: createRouteElement('../pages/Home') },
    ]
  }
]

export default menus;