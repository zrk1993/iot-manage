import routes from '@/routes/config'
import { useSelector } from '@/store'
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled
} from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProConfigProvider, ProLayout } from '@ant-design/pro-components'
import { Dropdown } from 'antd'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import './index.scss'

const Layout = () => {
  const nickname = useSelector(state => state.userSlice.nickname)
  const avatar = useSelector(state => state.userSlice.avatar)

  const [settings] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: false,
    navTheme: 'light',
    contentWidth: 'Fluid',
    colorPrimary: '#1677FF',
    siderMenuType: 'sub',
    fixedHeader: false
  })

  const { pathname: defaultPathname } = useLocation()
  const [pathname, setPathname] = useState(defaultPathname)
  if (typeof document === 'undefined') {
    return <div />
  }

  return (
    <ProConfigProvider hashed={false}>
      <ProLayout
        prefixCls='my-prefix'
        route={{ path: '/', routes: routes }}
        location={{
          pathname
        }}
        menu={{
          collapsedShowGroupTitle: true
        }}
        avatarProps={{
          src: avatar,
          size: 'small',
          title: nickname,
          render: (_, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: '退出登录'
                    }
                  ]
                }}
              >
                {dom}
              </Dropdown>
            )
          }
        }}
        actionsRender={props => {
          if (props.isMobile) return []
          if (typeof window === 'undefined') return []
          return [
            <InfoCircleFilled key='InfoCircleFilled' />,
            <QuestionCircleFilled key='QuestionCircleFilled' />,
            <GithubFilled key='GithubFilled' />
          ]
        }}
        onMenuHeaderClick={e => console.log(e)}
        menuItemRender={(item, dom) => (
          <Link
            to={item?.path || '/'}
            onClick={() => {
              setPathname(item.path || '/')
            }}
          >
            {dom}
          </Link>
        )}
        {...settings}
      >
        <PageContainer>
          <Outlet></Outlet>
        </PageContainer>
      </ProLayout>
    </ProConfigProvider>
  )
}

export default Layout
