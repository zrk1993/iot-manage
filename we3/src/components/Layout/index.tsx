import { Outlet, Link } from 'react-router-dom'
import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled
} from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProCard, ProConfigProvider, ProLayout } from '@ant-design/pro-components'
import { Dropdown } from 'antd'
import { useState } from 'react'
import routes from '@/routes/config'
import { RouteProps } from '@/types/routes'

const parseRoute = (r: RouteProps[]) => {
  return r
    .filter(v => v.children)
    .map(v => v.children?.filter(c => c.name))
    .flat(1)
}

const Layout = () => {
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

  const [pathname, setPathname] = useState('/dashboard')
  if (typeof document === 'undefined') {
    return <div />
  }

  return (
    <ProConfigProvider hashed={false}>
      <ProLayout
        prefixCls='my-prefix'
        route={{ path: '/', routes: parseRoute(routes) }}
        location={{
          pathname
        }}
        menu={{
          collapsedShowGroupTitle: true
        }}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '七妮妮',
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
          <ProCard>
            <Outlet></Outlet>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </ProConfigProvider>
  )
}

export default Layout
