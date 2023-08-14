import routes from '@/routes/config'
import { Menu as AntdMenu } from 'antd'
import type { MenuProps } from 'antd'
import { useState } from 'react'

import ToggleIcon from './ToggleIcon'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = routes.map(v => {
  return {
    label: v.name,
    key: v.path!,
    icon: v.icon
  }
})

export default function Menu() {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div style={{ width: '216px' }} className='relative'>
      <ToggleIcon onClick={toggleCollapsed}></ToggleIcon>
      <AntdMenu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' inlineCollapsed={collapsed} items={items} />
    </div>
  )
}
