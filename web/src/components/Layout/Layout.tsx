import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button} from 'antd';
import SiderCustom from './SiderCustom';

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='h-full flex'>
      <SiderCustom collapsed={collapsed}></SiderCustom>
      <div className="flex-1 h-full">
        <div className="p-2">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}/>
        </div>
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MyLayout
