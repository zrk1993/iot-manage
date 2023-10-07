import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import React from 'react'

import BaseInfo from './tabs/BaseInfo'

const DeviceDetail: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '设备信息',
      children: <BaseInfo></BaseInfo>
    },
    // {
    //   key: '2',
    //   label: '运行状态',
    //   children: ''
    // },
    // {
    //   key: '3',
    //   label: '物模型',
    //   children: ''
    // },
    // {
    //   key: '4',
    //   label: '日志管理',
    //   children: ''
    // },
    {
      key: '5',
      label: 'OTA升级',
      children: ''
    }
  ]

  return (
    <div className='bg-white p-6 rounded-md'>
      <div className='flex'>
        <span></span>
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
      <Tabs className='mb-4 mt-5' defaultActiveKey='1' items={tabItems} onChange={onChange} />
    </div>
  )
}

export default DeviceDetail
