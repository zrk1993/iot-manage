import { otaDel, otaDeviceUpgrade, otaList } from '@/api/ota'
import UpgradeStatus from '@/components/UpgradeStatus'
import { useRequest } from 'ahooks'
import { Button, Popconfirm, Space, Table, message as antdMessage } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Link } from 'react-router-dom'

type TOta = {
  ota_id: number
  device_id: string
  device_name: string
  status: string
  progress: number
  create_time: string
  update_time: string
}

const Tsl: React.FC<{ firmware_id: string; onRef: React.RefObject<any> }> = ({ firmware_id, onRef }) => {
  const [dataSource, setSataSource] = useState([])
  const { loading, run } = useRequest(otaList, {
    manual: true,
    onSuccess: result => {
      if (result) {
        setSataSource(result.data || [])
      }
    }
  })
  const onSearch = () => {
    run({ firmware_id: firmware_id })
  }

  useImperativeHandle(onRef, () => {
    return {
      onSearch: onSearch
    }
  })

  const [columns] = useState<ColumnsType<TOta>>([
    {
      title: 'ID',
      dataIndex: 'ota_id',
      key: 'ota_id',
      render: (_, { ota_id }) => <>{ota_id}</>
    },
    {
      title: '设备',
      dataIndex: 'device_name',
      key: 'device_name',
      render: (_, { device_name, device_id }) => <Link to={'/device/detail/' + device_id}>{device_name}</Link>
    },
    {
      title: '升级状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status, progress }) => (
        <>
          <UpgradeStatus status={status} progress={progress}></UpgradeStatus>
        </>
      )
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (_, { update_time }) => <>{update_time ? dayjs(update_time).format('YY-MM-DD HH:mm:ss') : '-'}</>
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (_, { create_time }) => <>{dayjs(create_time).format('YY-MM-DD HH:mm:ss')}</>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, { ota_id }) => (
        <Space size='middle'>
          <Popconfirm
            title='提示'
            cancelText='取消'
            okText='OTA '
            description='确认推送升级！'
            onConfirm={async () => {
              const res = await otaDeviceUpgrade({ ota_id })
              if (res.code != 0) {
                return antdMessage.error(res.message)
              }
              onSearch()
            }}
          >
            <Button type='primary' size='small'>
              推送
            </Button>
          </Popconfirm>
          <Popconfirm
            title='提示'
            cancelText='取消'
            okText='删除'
            description='确认删除数据！'
            onConfirm={async () => {
              const res = await otaDel({ ota_id })
              if (res.code != 0) {
                return antdMessage.error(res.message)
              }
              onSearch()
            }}
          >
            <Button type='text' size='small' danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ])

  useEffect(() => {
    run({ firmware_id: firmware_id })
  }, [])

  return (
    <div>
      <Table rowKey='firmware_id' className='mt-5' loading={loading} columns={columns} dataSource={dataSource} bordered />
    </div>
  )
}

export default Tsl
