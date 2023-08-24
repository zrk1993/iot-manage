import { deviceDel, deviceList } from '@/api/device'
import { useRequest } from 'ahooks'
import { Button, Popconfirm, Space, Table, Tag, message as antdMessage } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'

import QueryForm from './components/QueryForm'

type TDevice = {
  id: string
  name: string
  mac_address: string
  bemfa: boolean
  status: string
}

const Device: React.FC = () => {
  const [dataSource, setSataSource] = useState([])
  const { loading, run } = useRequest(deviceList, {
    manual: true,
    onSuccess: result => {
      if (result) {
        setSataSource(result.data)
      }
    }
  })
  const onSearch = () => {
    run(dataSource)
  }
  const [columns] = useState<ColumnsType<TDevice>>([
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
      render: (_, { id }) => (
        <Space size='middle'>
          <Popconfirm
            title='删除'
            cancelText='取消'
            description='确认删除设备'
            onConfirm={async () => {
              const res = await deviceDel({ id })
              if (res.code != 0) {
                return antdMessage.error(res.message)
              }
              onSearch()
            }}
          >
            <Button type='text'>删除</Button>
          </Popconfirm>
        </Space>
      )
    }
  ])

  useEffect(() => {
    run(dataSource)
  }, [])

  return (
    <div>
      <QueryForm search={onSearch} loading={loading} />
      <Table rowKey='id' className='mt-4' loading={loading} columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default Device
