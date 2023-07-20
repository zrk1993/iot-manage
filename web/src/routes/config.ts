import React from 'react';

export interface IMenuBase {
  path: string;
  title: string;
  icon?: string;
  component?: React.LazyExoticComponent<() => JSX.Element>;
}

export interface IMenu extends IMenuBase {
  subs?: IMenu[];
}

const menus: IMenu[] = [
  { path: '/', title: '首页', component: React.lazy(() => import('../pages/Home')) },
  { path: '/dashboard2', title: '首页2', component: React.lazy(() => import('../pages/Login')) },
  {
    path: '/device',
    title: '设备',
    icon: 'scan',
    subs: [
      { path: '/device/index', title: '设备3', component: React.lazy(() => import('../pages/Home')) },
    ]
  },
  {
    path: '/device',
    title: '设备',
    icon: 'scan',
    subs: [
      { path: '/device/index', title: '设备', component: React.lazy(() => import('../pages/Home')) },
      { path: '/device/index', title: '设备2', component: React.lazy(() => import('../pages/Home')) },
    ]
  }
]

export default menus;