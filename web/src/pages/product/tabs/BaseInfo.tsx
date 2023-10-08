import { productInfo } from '@/api/product'
import { useRequest } from 'ahooks'
import { Descriptions, Spin } from 'antd'
import type { DescriptionsProps } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BaseInfo = () => {
  const { id } = useParams()
  const [items, setItems] = useState<DescriptionsProps['items']>([])

  const { loading, run } = useRequest(productInfo, {
    manual: true,
    onSuccess: result => {
      if (result) {
        const v = result.data
        const data: DescriptionsProps['items'] = [
          {
            key: 'product_name',
            label: '产品名称',
            children: v.product_name
          },
          {
            key: 'product_key',
            label: 'ProductKey',
            children: v.product_key
          },
          {
            key: 'create_time',
            label: '创建时间',
            children: v.create_time ? dayjs(v.create_time).format('YY-MM-DD HH:mm:ss') : '-'
          }
        ]
        setItems(data)
      }
    }
  })

  useEffect(() => {
    run({ product_id: id })
  }, [])

  return <div>{loading ? <Spin></Spin> : <Descriptions title='' bordered items={items} />}</div>
}

export default BaseInfo
