import { deviceTslProperty } from '@/api/device'
import { useRequest } from 'ahooks'
import { Col, Row } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

const RunInfo: React.FC<{ device_id: string }> = ({ device_id }) => {
  const [dataList, setDataList] = useState<any[]>([])

  useRequest(deviceTslProperty, {
    defaultParams: [{ device_id }],
    onSuccess: result => {
      setDataList(result.data)
    }
  })

  return (
    <div className='p-3'>
      <Row gutter={[10, 10]}>
        {dataList.map(v => (
          <Col md={6} span={12}>
            <div className='rounded shadow-md border border-neutral-400 border-solid  py-3 px-5'>
              <div className='text-neutral-600 font-light'>{v.name}</div>
              <div className='mt-2 text-3xl font-semibold'>{v.value}</div>
              <div className='mt-2 text-neutral-600 font-light'>{dayjs(v.create_time).format('MM-DD HH:mm:ss')}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default RunInfo
