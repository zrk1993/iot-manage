import { deviceTslProperty } from '@/api/device'
import { EditFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Col, Empty, Row } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import PropertySetForm from '../components/PropertySetForm'

const RunInfo: React.FC<{ device_id: string }> = ({ device_id }) => {
  const [dataList, setDataList] = useState<any[]>([])

  const { run } = useRequest(deviceTslProperty, {
    manual: true,
    onSuccess: result => {
      setDataList(result.data)
    }
  })

  useEffect(() => {
    run({ device_id })
    const timer = setInterval(() => {
      run({ device_id })
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const [tsl, setTsl] = useState(null)
  const [open, setOpen] = useState(false)
  const onCreate = (values: any) => {
    console.log('Received values of form: ', values)
    setOpen(false)
  }

  return (
    <div className='p-3'>
      <PropertySetForm
        tsl={tsl}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      ></PropertySetForm>
      {dataList.length ? (
        <Row gutter={[10, 10]}>
          {dataList.map(v => (
            <Col md={6} span={12}>
              <div className='rounded shadow-md border border-neutral-400 border-solid py-3 px-5'>
                <div className='flex items-center cursor-pointer hover:text-blue-500'>
                  <div className='text-neutral-600 font-light flex-1'>
                    {v.name}-{v.identifier}
                  </div>
                  <EditFilled
                    onClick={() => {
                      setTsl(v)
                      setOpen(true)
                    }}
                  />
                </div>
                <div className='mt-2 text-3xl font-semibold'>{v.value || '-'}</div>
                <div className='mt-2 text-neutral-600 font-light'>{v.create_time ? dayjs(v.create_time).format('MM-DD HH:mm:ss') : '-'}</div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty></Empty>
      )}
    </div>
  )
}

export default RunInfo
