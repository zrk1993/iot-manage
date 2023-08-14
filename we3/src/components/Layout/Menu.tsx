import routes from '@/routes/config'
import { Menu as AntdMenu } from 'antd'
import type { MenuProps } from 'antd'
import { FC } from 'react'

import './Menu.scss'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = routes.map(v => {
  return {
    label: v.name,
    key: v.path!,
    icon: v.icon
  }
})

const Menu: FC<{ collapsed: boolean }> = props => {
  return (
    <div className='h-full'>
      <AntdMenu defaultSelectedKeys={['/']} mode='inline' inlineCollapsed={props.collapsed} items={items} />
    </div>
  )
}

export default Menu
