import { deviceInfo } from '@/api/device'
import StatusTag from '@/components/StatusTag'
import { useRequest } from 'ahooks'
import { Descriptions, Spin } from 'antd'
import type { DescriptionsProps } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const BaseInfo: React.FC<{ device_id: string }> = ({ device_id }) => {
  const [items, setItems] = useState<DescriptionsProps['items']>([])

  const { loading, run } = useRequest(deviceInfo, {
    manual: true,
    onSuccess: result => {
      if (result) {
        const v = result.data
        const data: DescriptionsProps['items'] = [
          {
            key: 'device_name',
            label: '设备名称',
            children: v.device_name
          },
          {
            key: 'device_key',
            label: 'deviceKey',
            children: v.device_key
          },
          {
            key: 'status',
            label: '状态',
            children: <StatusTag status={v.status}></StatusTag>
          },
          {
            key: 'product_name',
            label: '所属类型',
            children: v.product_name
          },
          {
            key: 'client_ip',
            label: 'IP地址',
            children: v.client_ip
          },
          {
            key: 'create_time',
            label: '创建时间',
            children: v.create_time ? dayjs(v.create_time).format('YY-MM-DD HH:mm:ss') : '-'
          },
          {
            key: 'last_time',
            label: '最后上线时间',
            children: v.last_time ? dayjs(v.last_time).format('YY-MM-DD HH:mm:ss') : ''
          }
        ]
        setItems(data)
      }
    }
  })

  useEffect(() => {
    run({ device_id })
  }, [])

  return <div>{loading ? <Spin></Spin> : <Descriptions title='' bordered items={items} />}</div>
}

export default BaseInfo
