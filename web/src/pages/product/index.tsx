import { productDel, productList } from '@/api/product'
import { useRequest } from 'ahooks'
import { Button, Popconfirm, Space, Table, message as antdMessage } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ProductAddForm from './components/ProductAddForm'

type TProduct = {
  product_id: number
  product_name: string
  product_key: string
  device_count: number
}

const Product: React.FC = () => {
  const [dataSource, setSataSource] = useState([])
  const { loading, run } = useRequest(productList, {
    manual: true,
    onSuccess: result => {
      if (result) {
        setSataSource(result.data)
      }
    }
  })
  const onSearch = () => {
    run({})
  }
  const [columns] = useState<ColumnsType<TProduct>>([
    {
      title: '产品名称',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (_, { product_name, product_id }) => <Link to={'/product/detail/' + product_id}>{product_name}</Link>
    },
    {
      title: '产品ID',
      dataIndex: 'product_key',
      key: 'product_key',
      render: (_, { product_key }) => <>{product_key}</>
    },
    {
      title: '设备数量',
      dataIndex: 'device_count',
      key: 'device_count',
      render: (_, { device_count }) => <>{device_count}</>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, { product_id }) => (
        <Space size='middle'>
          <Popconfirm
            title='提示'
            cancelText='取消'
            okText='删除'
            description='确认删除产品！'
            onConfirm={async () => {
              const res = await productDel({ product_id })
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
      <ProductAddForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      ></ProductAddForm>
      <div className='flex justify-between'>
        <div className='text-base text-black font-semibold pl-1'>产品列表</div>
        <Button type='primary' onClick={() => setOpen(true)}>
          新建
        </Button>
      </div>
      <Table rowKey='id' className='mt-4' loading={loading} columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default Product
