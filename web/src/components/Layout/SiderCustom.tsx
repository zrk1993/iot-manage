import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import routesConfig from '../../routes/config'

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = routesConfig.map(r => getItem(r.title, r.path, <MailOutlined />, r.subs?.map(v => getItem(v.title, v.path))));

interface IProps {
  collapsed: boolean
}

const App = (props: IProps) => {
  const { collapsed } = props;
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (v) => {
    navigate(v.key)
  };
  console.log('1')

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="bg-white">
      <div className="demo-logo-vertical" />
      <Menu
        className="h-full"
        mode="inline"
        onClick={onClick}
        items={items}
      />
    </Sider>
  );
};

export default App;