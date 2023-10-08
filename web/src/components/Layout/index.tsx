import Header from '@/components/Layout/Header'
import Menu from '@/components/Layout/Menu'
import ToggleIcon from '@/components/Layout/ToggleIcon'
import { isMobile } from '@/utils/tools'
import { Drawer } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import './index.scss'

export default function Test() {
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const hideDrawer = () => {
    setOpen(false)
  }
  return (
    <div className='h-full flex flex-col'>
      <Header showDrawer={showDrawer}></Header>
      <div className='flex-1 flex overflow-auto'>
        {isMobile() ? (
          <Drawer
            headerStyle={{ display: 'none' }}
            bodyStyle={{ padding: 0 }}
            maskClosable={true}
            width={215}
            placement='left'
            open={open}
            onClose={hideDrawer}
          >
            <Menu collapsed={collapsed}></Menu>
          </Drawer>
        ) : (
          <div className={`sider ${collapsed ? 'collapsed' : ''}`}>
            <ToggleIcon onClick={toggleCollapsed} collapsed={collapsed}></ToggleIcon>
            <Menu collapsed={collapsed}></Menu>
          </div>
        )}
        <div className='flex-1 p-5' style={{ overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
