import { deviceList } from '@/api/device'
import { isMobile } from '@/utils/tools'
import { useRequest } from 'ahooks'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React from 'react'

import QueryForm from './components/QueryForm'

type TDevice = {
  name: string
  mac_address: string
  bemfa: boolean
  status: string
}

const columns: ColumnsType<TDevice> = [
  {
    title: '设备',
    dataIndex: 'name',
    key: 'name',
    render: (_, { name }) => <a>{name}</a>
  },
  {
    title: 'MAC',
    dataIndex: 'mac_address',
    key: 'mac_address',
    render: (_, { mac_address }) => <>{mac_address?.slice(-6) || '未连接'}</>
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    filters: [
      {
        text: '在线',
        value: '在线'
      },
      {
        text: '离线',
        value: '离线'
      }
    ],
    render: (_, { status }) => {
      let color = ''
      let text = ''
      if (!status) {
        color = 'default'
        text = '未连接'
      }
      if (status == '-1') {
        color = 'warning'
        text = '离线'
      }
      if (status == '1') {
        color = 'success'
        text = '在线'
      }
      return <Tag color={color}>{text}</Tag>
    }
  },
  {
    title: '操作',
    key: 'action',
    render: _ => (
      <Space size='middle'>
        <a>编辑</a>
        <a>删除</a>
      </Space>
    )
  }
]

const Device: React.FC = () => {
  const { data, loading } = useRequest(deviceList)
  const dataSource = data?.data || []

  return (
    <div>
      {!isMobile() && <QueryForm />}
      <Table className='mt-4' loading={loading} columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default Device
