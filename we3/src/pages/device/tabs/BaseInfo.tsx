import { deviceInfo } from '@/api/device'
import StatusTag from '@/components/StatusTag'
import { useRequest } from 'ahooks'
import { Button, Descriptions, Spin, Upload, message as antdMessage } from 'antd'
import type { DescriptionsProps, UploadProps } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const props: UploadProps = {
  name: 'file',
  action: '/api/file/upload',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      antdMessage.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      antdMessage.error(`${info.file.name} file upload failed.`)
    }
  }
}

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
          },
          {
            key: 'img',
            label: '图片',
            children: (
              <div>
                <Upload {...props}>
                  <Button>Click to Upload</Button>
                </Upload>
              </div>
            )
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
