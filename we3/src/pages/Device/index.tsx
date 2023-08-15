import { deviceList } from '@/api/device'
import { useRequest } from 'ahooks'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React from 'react'

type TDevice = {
  name: string
  key: string
  topic: string
  bemfa: boolean
  online: boolean
}

const columns: ColumnsType<TDevice> = [
  {
    title: '设备',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>
  },
  {
    title: 'Topic',
    dataIndex: 'topic',
    key: 'topic'
  },
  {
    title: '状态',
    key: 'online',
    dataIndex: 'online',
    render: (_, { online }) => {
      const color = online ? 'geekblue' : 'green'
      return <Tag color={color}>{online}</Tag>
    }
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
]

const Device: React.FC = () => {
  const { data, loading } = useRequest(deviceList)
  const dataSource = data?.data || []

  return (
    <div>
      <Table loading={loading} columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default Device
