import { deviceInfo } from '@/api/device'
import StatusTag from '@/components/StatusTag'
import { useRequest } from 'ahooks'
import { Descriptions, Spin } from 'antd'
import type { DescriptionsProps } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BaseInfo = () => {
  const { id } = useParams()
  const [items, setItems] = useState<DescriptionsProps['items']>([])

  const { loading, run } = useRequest(deviceInfo, {
    manual: true,
    onSuccess: result => {
      if (result) {
        const v = result.data
        const data: DescriptionsProps['items'] = [
          {
            key: 'name',
            label: '设备名称',
            children: v.name
          },
          {
            key: 'id',
            label: 'ID',
            children: v.id
          },
          {
            key: 'status',
            label: '状态',
            children: <StatusTag status={v.status}></StatusTag>
          },
          {
            key: 'product_type_name',
            label: '产品类型',
            children: v.product_type_name
          },
          {
            key: 'mac_address',
            label: 'MAC地址',
            children: v.mac_address
          },
          {
            key: 'remote_address',
            label: 'IP地址',
            children: v.remote_address
          },
          {
            key: 'create_time',
            label: '创建时间',
            children: v.create_time ? dayjs(v.create_time).format('YY-MM-DD HH:mm:ss') : '-'
          },
          {
            key: 'connect_time',
            label: '连接时间',
            children: v.connect_time ? dayjs(v.connect_time).format('YY-MM-DD HH:mm:ss') : ''
          },
          {
            key: 'disconnect_time',
            label: '断开时间',
            children: v.disconnect_time ? dayjs(v.disconnect_time).format('YY-MM-DD HH:mm:ss') : ''
          }
        ]
        setItems(data)
      }
    }
  })

  useEffect(() => {
    run({ id })
  }, [])

  return <div>{loading ? <Spin></Spin> : <Descriptions title='' bordered items={items} />}</div>
}

export default BaseInfo
