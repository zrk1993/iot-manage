import { deviceDel, deviceList } from '@/api/device'
import StatusTag from '@/components/StatusTag'
import { useRequest } from 'ahooks'
import { Button, Popconfirm, Space, Table, message as antdMessage } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import QueryForm from './components/QueryForm'

type TDevice = {
  id: string
  name: string
  product_type_name: string
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
      render: (_, { name, id }) => <Link to={'/device/detail/' + id}>{name}</Link>
    },
    {
      title: '类型',
      dataIndex: 'product_type_name',
      key: 'product_type_name',
      render: (_, { product_type_name }) => <>{product_type_name}</>
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
      render: (_, { status }) => <StatusTag status={status}></StatusTag>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, { id }) => (
        <Space size='middle'>
          <Popconfirm
            title='提示'
            cancelText='取消'
            okText='删除'
            description='确认删除设备！'
            onConfirm={async () => {
              const res = await deviceDel({ id })
              if (res.code != 0) {
                return antdMessage.error(res.message)
              }
              onSearch()
            }}
          >
            <Button type='text' danger>
              删除
            </Button>
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
