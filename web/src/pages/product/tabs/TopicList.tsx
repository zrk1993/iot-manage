import { topicList } from '@/api/mqtt'
import { useRequest } from 'ahooks'
import { Table, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'

type TTopic = {
  category: string
  topic: string
  op: string
  desc: string
  rowSpan: number
}

const TopicList: React.FC = () => {
  const [dataSource, setSataSource] = useState<TTopic[]>([])
  const { loading, run } = useRequest(topicList, {
    manual: true,
    onSuccess: result => {
      if (result) {
        const data = (result.data as any[]).reduce((p: TTopic[], v) => {
          v.list.forEach((obj: any, i: number) => {
            obj.category = v.category
            obj.rowSpan = i === 0 ? v.list.length : 0
          })
          p.push(...v.list)
          return p
        }, [])
        setSataSource(data)
      }
    }
  })

  const [columns] = useState<ColumnsType<TTopic>>([
    {
      title: '功能',
      dataIndex: 'category',
      key: 'category',
      onCell: record => ({ rowSpan: record.rowSpan }),
      render: (_, { category }) => <>{category}</>
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
      render: (_, { topic }) => {
        return document.body.clientWidth < 1200 ? (
          <Tooltip title={topic}>
            <span className='text-blue-500'>查看</span>
          </Tooltip>
        ) : (
          <>{topic}</>
        )
      }
    },
    {
      title: '操作权限',
      dataIndex: 'op',
      key: 'op',
      render: (_, { op }) => <>{op}</>
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      render: (_, { desc }) => {
        return document.body.clientWidth < 1200 ? (
          <Tooltip title={desc}>
            <span className='text-blue-500'>查看</span>
          </Tooltip>
        ) : (
          <>{desc}</>
        )
      }
    }
  ])

  useEffect(() => {
    run()
  }, [])

  return (
    <div>
      <Table rowKey='topic' pagination={false} className='mt-2' loading={loading} columns={columns} dataSource={dataSource} bordered />
    </div>
  )
}

export default TopicList
