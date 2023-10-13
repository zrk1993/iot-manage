import { deviceTslData } from '@/api/device'
import { useRequest } from 'ahooks'
import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import React, { useState } from 'react'

type TTslData = {
  tsl_data_id: number
  type: string
  identifier: string
  name: string
  value: any
  create_time: string
}

const TslData: React.FC<{ device_id: string }> = ({ device_id }) => {
  const [total, setTotal] = useState(0)
  const [dataSource, setSataSource] = useState([])
  const { loading, run } = useRequest(deviceTslData, {
    defaultParams: [{ device_id, page: 1, size: 10 }],
    onSuccess: result => {
      if (result) {
        setSataSource(result.data.data)
        setTotal(result.data.total)
      }
    }
  })
  const onPageChange = (page: number, size: number) => {
    run({ device_id, page, size })
  }
  const onSearch = () => {
    run({ device_id, page: 1, size: 10 })
  }
  const [columns] = useState<ColumnsType<TTslData>>([
    {
      title: 'ID',
      dataIndex: 'tsl_data_id',
      key: 'tsl_data_id',
      responsive: ['md'],
      render: (_, { tsl_data_id }) => <>{tsl_data_id}</>
    },
    {
      title: '功能类型',
      dataIndex: 'type',
      key: 'type',
      responsive: ['md'],
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
      title: '数值',
      dataIndex: 'value',
      key: 'value',
      render: (_, { value }) => <>{value}</>
    },
    {
      title: '时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (_, { create_time }) => <div className='w-[60px] md:w-[100px]'>{dayjs(create_time).format('MM-DD HH:mm:ss')}</div>
    }
  ])

  return (
    <div>
      <div className='flex justify-between'>
        <Button type='primary' onClick={onSearch}>
          查询
        </Button>
      </div>
      <Table
        rowKey='tsl_data_id'
        className='mt-4'
        pagination={{ total, defaultCurrent: 1, defaultPageSize: 10, onChange: onPageChange }}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        bordered
      />
    </div>
  )
}

export default TslData
