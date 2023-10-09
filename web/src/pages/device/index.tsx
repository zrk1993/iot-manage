import { deviceDel, deviceList } from '@/api/device'
import StatusTag from '@/components/StatusTag'
import { useRequest } from 'ahooks'
import { Button, Popconfirm, Space, Table, message as antdMessage } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import DeviceAddForm from './components/DeviceAddForm'

type TDevice = {
  device_id: string
  device_name: string
  product_name: string
  device_key: boolean
  client_ip: string
  status: string
  last_time: string
}

const Device: React.FC = () => {
  const [dataSource, setSataSource] = useState([])
  const { loading, run } = useRequest(deviceList, {
    manual: true,
    onSuccess: result => {
      if (result) {
        setSataSource(result.data.data)
      }
    }
  })
  const onSearch = () => {
    run({})
  }
  const [columns] = useState<ColumnsType<TDevice>>([
    {
      title: '设备名称',
      dataIndex: 'device_name',
      key: 'device_name',
      render: (_, { device_name, device_id }) => <Link to={'/device/detail/' + device_id}>{device_name}</Link>
    },
    {
      title: '所属产品',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, { product_name }) => <>{product_name}</>
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
      title: '最后上线时间',
      dataIndex: 'last_time',
      key: 'last_time',
      render: (_, { last_time }) => <>{last_time || '-'}</>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, { device_id }) => (
        <Space size='middle'>
          <Popconfirm
            title='提示'
            cancelText='取消'
            okText='删除'
            description='确认删除设备！'
            onConfirm={async () => {
              const res = await deviceDel({ device_id })
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

  const [open, setOpen] = useState(false)

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values)
    setOpen(false)
    onSearch()
  }

  useEffect(() => {
    run({})
  }, [])

  return (
    <div>
      <DeviceAddForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      ></DeviceAddForm>
      <div className='flex justify-between'>
        <div className='text-base text-black font-semibold pl-1'>设备列表</div>
        <Button type='primary' onClick={() => setOpen(true)}>
          新建
        </Button>
      </div>
      <Table rowKey='id' className='mt-4' loading={loading} columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default Device
