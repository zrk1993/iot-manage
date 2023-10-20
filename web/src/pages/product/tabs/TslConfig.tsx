import { tslDel, tslList } from '@/api/tsl'
import { useRequest } from 'ahooks'
import { Button, Popconfirm, Space, Table, message as antdMessage } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import TslAddForm from '../components/TslAddForm'

type TTsl = {
  tsl_id: number
  type: string
  identifier: string
  name: string
}

const Tsl: React.FC = () => {
  const { id } = useParams()
  const [dataSource, setSataSource] = useState([])
  const { loading, run } = useRequest(tslList, {
    manual: true,
    onSuccess: result => {
      if (result) {
        setSataSource(result.data || [])
      }
    }
  })
  const onSearch = () => {
    run({ product_id: id })
  }
  const [columns] = useState<ColumnsType<TTsl>>([
    {
      title: '功能类型',
      dataIndex: 'type',
      key: 'type',
      render: (_, { type }) => <>{type}</>
    },
    {
      title: '功能名称',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name }) => <>{name}</>
    },
    {
      title: '标识符',
      dataIndex: 'identifier',
      key: 'identifier',
      render: (_, { identifier }) => <>{identifier}</>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, { tsl_id }) => (
        <Space size='middle'>
          <Popconfirm
            title='提示'
            cancelText='取消'
            okText='删除'
            description='确认删除模型！'
            onConfirm={async () => {
              const res = await tslDel({ tsl_id })
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
    run({ product_id: id })
  }, [])

  return (
    <div>
      <TslAddForm
        product_id={id!}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      ></TslAddForm>
      <div className='flex justify-between'>
        <Button type='primary' onClick={() => setOpen(true)}>
          新建
        </Button>
      </div>
      <Table rowKey='tsl_id' className='mt-4' loading={loading} columns={columns} dataSource={dataSource} bordered />
    </div>
  )
}

export default Tsl
