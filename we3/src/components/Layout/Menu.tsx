import routes from '@/routes/config'
import { Menu as AntdMenu } from 'antd'
import type { MenuProps } from 'antd'
import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [current, setCurrent] = useState(pathname)

  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key)
    navigate(e.key)
  }

  return (
    <div className='h-full'>
      <AntdMenu onClick={onClick} defaultSelectedKeys={[current]} inlineCollapsed={props.collapsed} mode='inline' items={items} />
    </div>
  )
}

export default Menu
