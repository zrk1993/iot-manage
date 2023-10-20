import { firmwareInfo } from '@/api/firmware'
import Back from '@/components/Back'
import { useRequest } from 'ahooks'
import { Button, Statistic } from 'antd'
import { Tag } from 'antd'
import React, { createRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import DeviceOta from './components/DeviceOta'
import Upgrade from './components/Upgrade'

const FirmwareDetail: React.FC = () => {
  const ChildRef = createRef<any>()
  const { id } = useParams()
  const [state, setState] = useState<{ firmware: any; statistic: any }>({
    firmware: {},
    statistic: {}
  })
  const { run } = useRequest(firmwareInfo, {
    defaultParams: [{ firmware_id: id }],
    onSuccess: result => {
      if (result) {
        setState(result.data)
      }
    }
  })

  const [open, setOpen] = useState(false)
  const onCreate = (values: any) => {
    console.log('Received values of form: ', values)
    setOpen(false)
    ChildRef.current.onSearch()
    run({ firmware_id: id })
  }

  return (
    <>
      <Upgrade
        firmware_id={state.firmware.firmware_id}
        product_id={state.firmware.product_id}
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      ></Upgrade>
      <div className='bg-white p-6 rounded-md'>
        <div className='flex items-center'>
          <Back></Back>
          <div className='text-lg text-black'>升级包详情</div>
          <Tag className='ml-2' color='#999'>
            {state.firmware.firmware_name}
          </Tag>
          <div className='flex-1'></div>
          <Button
            type='primary'
            onClick={() => {
              setOpen(true)
            }}
          >
            升级
          </Button>
        </div>
        <div className='mt-6 flex justify-between px-1'>
          <div>
            <Statistic title='目标设备总数' value={state.statistic.status_all} />
          </div>
          <div>
            <Statistic title='升级成功数' value={state.statistic.status_2} />
          </div>
          <div>
            <Statistic title='升级中数量' value={state.statistic.status_1} />
          </div>
          <div>
            <Statistic title='目标失败数' value={state.statistic.status_3} />
          </div>
        </div>
        <div>
          <DeviceOta firmware_id={id!} onRef={ChildRef}></DeviceOta>
        </div>
      </div>
    </>
  )
}

export default FirmwareDetail
