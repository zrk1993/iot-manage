import { deviceSubscriptions } from '@/api/mqtt'
import { useRequest } from 'ahooks'
import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'

type TData = {
  topic: string
  desc: string
}

const TslData: React.FC<{ device_id: string }> = ({ device_id }) => {
  const [dataSource, setSataSource] = useState([])
  const { loading, run } = useRequest(deviceSubscriptions, {
    defaultParams: [{ device_id }],
    onSuccess: result => {
      if (result) {
        setSataSource(result.data)
      }
    }
  })

  const onSearch = () => {
    run({ device_id })
  }
  const [columns] = useState<ColumnsType<TData>>([
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
      render: (_, { topic }) => <>{topic}</>
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      render: (_, { desc }) => <>{desc}</>
    }
  ])

  useEffect(() => {
    run({})
  }, [])

  return (
    <div>
      <div className='flex justify-between'>
        <Button type='primary' onClick={onSearch}>
          查询
        </Button>
      </div>
      <Table rowKey='topic' className='mt-4' pagination={false} loading={loading} columns={columns} dataSource={dataSource} bordered />
    </div>
  )
}

export default TslData
