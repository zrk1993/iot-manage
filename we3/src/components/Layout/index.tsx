import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined
} from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-components'
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer
} from '@ant-design/pro-components'
import { Button, ConfigProvider, Divider, Dropdown, Input, Popover, theme } from 'antd'
import React, { useState } from 'react'
import defaultProps from './defaultProps'

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: false,
    navTheme: 'light',
    contentWidth: 'Fluid',
    colorPrimary: '#1677FF',
    siderMenuType: 'sub',
    fixedHeader: false
  })

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1')

  if (typeof document === 'undefined') {
    return <div />
  }
  return (
    <ProConfigProvider hashed={false}>
      <ProLayout
        prefixCls='my-prefix'
        {...defaultProps}
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
          render: (props, dom) => {
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
          <div
            onClick={() => {
              setPathname(item.path || '/welcome')
            }}
          >
            {dom}
          </div>
        )}
        {...settings}
      >
        <PageContainer>
          <ProCard
            style={{
              height: '200vh',
              minHeight: 800
            }}
          >
            <div />
          </ProCard>
        </PageContainer>

        <SettingDrawer
          pathname={pathname}
          enableDarkTheme
          getContainer={(e: any) => {
            if (typeof window === 'undefined') return e
            return document.getElementById('test-pro-layout')
          }}
          settings={settings}
          onSettingChange={changeSetting => {
            setSetting(changeSetting)
          }}
          disableUrlParams={false}
        />
      </ProLayout>
    </ProConfigProvider>
  )
}
