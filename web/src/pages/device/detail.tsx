import Back from '@/components/Back'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'

import BaseInfo from './tabs/BaseInfo'
import RunInfo from './tabs/RunInfo'
import SubTopic from './tabs/SubTopic'
import TslData from './tabs/TslData'

const DeviceDetail: React.FC = () => {
  const { id } = useParams()

  const onChange = (key: string) => {
    console.log(key)
  }

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '设备信息',
      children: <BaseInfo device_id={id!}></BaseInfo>
    },
    {
      key: '3',
      label: '运行状态',
      children: <RunInfo device_id={id!}></RunInfo>
    },
    {
      key: '4',
      label: '物模型数据',
      children: <TslData device_id={id!}></TslData>
    },
    {
      key: '2',
      label: 'Topic列表',
      children: <SubTopic device_id={id!}></SubTopic>
    }
  ]

  return (
    <div className='bg-white rounded-md pl-4 pr-2 py-6 md:p-6'>
      <div className='flex items-center'>
        <Back></Back>
        <div className='text-lg text-black'>设备详情</div>
      </div>
      <div className='flex items-center mt-6'>
        <div className='w-16 h-16 rounded'>
          <img src='/vite.svg' className='w-full h-full' alt='' />
        </div>
        <div className='ml-3'>
          <div className='text-sm text-gray-700'>设备名称: 1212313</div>
          <div className='text-xs text-gray-500 mt-1'>连接状态: 1</div>
        </div>
      </div>
      <Tabs className='mb-4 mt-5' destroyInactiveTabPane defaultActiveKey='1' items={tabItems} onChange={onChange} />
    </div>
  )
}

export default DeviceDetail
