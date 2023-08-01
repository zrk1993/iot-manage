import React, { useState } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import routesConfig from '../../routes/config'

const { Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: string,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuItem[] = routesConfig.map(r =>
  getItem(
    r.title!,
    r.path!,
    <MailOutlined />,
    r.children?.map(v => getItem(v.title!, v.path!))
  )
)

interface IProps {
  collapsed: boolean
}

const SiderCustom: React.FC<IProps> = props => {
  const { collapsed } = props
  const navigate = useNavigate()

  const onClick: MenuProps['onClick'] = v => {
    navigate(v.key)
  }

  console.log('1')

  return (
    <Sider
      breakpoint='lg'
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme='light'
      className='bg-white h-full'
    >
      <Menu className='h-screen' mode='inline' onClick={onClick} items={items} />
    </Sider>
  )
}

export default SiderCustom
