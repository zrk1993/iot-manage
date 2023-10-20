import { firmwareDel, firmwareList } from '@/api/firmware'
import { useRequest } from 'ahooks'
import { Button, Popconfirm, Space, Table, message as antdMessage } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import FirmwareAddForm from './components/FirmwareAddForm'

type TFirmware = {
  firmware_id: number
  firmware_name: string
  version: string
  product_name: string
  file_uid: string
  create_time: string
}

const Product: React.FC = () => {
  const [dataSource, setSataSource] = useState([])
  const { loading, run } = useRequest(firmwareList, {
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
  const [columns] = useState<ColumnsType<TFirmware>>([
    {
      title: 'ID',
      dataIndex: 'firmware_id',
      key: 'firmware_id',
      render: (_, { firmware_id }) => <>{firmware_id}</>
    },
    {
      title: '升级包',
      dataIndex: 'firmware_name',
      key: 'firmware_name',
      render: (_, { firmware_name, firmware_id }) => <Link to={'/firmware/detail/' + firmware_id}>{firmware_name}</Link>
    },
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
      render: (_, { version }) => <>{version}</>
    },
    {
      title: '所属产品',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, { product_name }) => <>{product_name}</>
    },
    {
      title: '文件UID',
      dataIndex: 'file_uid',
      key: 'file_uid',
      render: (_, { file_uid }) => <>{file_uid}</>
    },
    {
      title: '添加时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (_, { create_time }) => <>{dayjs(create_time).format('YY-MM-DD HH:mm:ss')}</>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, { firmware_id }) => (
        <Space size='middle'>
          <Popconfirm
            title='提示'
            cancelText='取消'
            okText='删除'
            description='确认删除升级包！'
            onConfirm={async () => {
              const res = await firmwareDel({ firmware_id })
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
      <FirmwareAddForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      ></FirmwareAddForm>
      <div className='flex justify-between'>
        <div className='text-base text-black font-semibold pl-1'>升级包</div>
        <Button type='primary' onClick={() => setOpen(true)}>
          添加
        </Button>
      </div>
      <Table rowKey='firmware_id' className='mt-4' loading={loading} columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default Product
