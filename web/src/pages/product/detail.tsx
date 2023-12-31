import Back from '@/components/Back'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import React from 'react'

import BaseInfo from './tabs/BaseInfo'
import TopicList from './tabs/TopicList'
import TslConfig from './tabs/TslConfig'

const DeviceDetail: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '产品信息',
      children: <BaseInfo></BaseInfo>
    },
    {
      key: '2',
      label: 'Topic列表',
      children: <TopicList></TopicList>
    },
    {
      key: '3',
      label: '物模型TSL',
      children: <TslConfig></TslConfig>
    }
  ]

  return (
    <div className='bg-white p-6 rounded-md'>
      <div className='flex items-center'>
        <Back></Back>
        <div className='text-lg text-black'>产品详情</div>
      </div>
      <Tabs className='mb-4 mt-2' defaultActiveKey='1' items={tabItems} onChange={onChange} />
    </div>
  )
}

export default DeviceDetail
