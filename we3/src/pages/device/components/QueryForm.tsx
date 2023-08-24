import { Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'

import DeviceAddForm from './DeviceAddForm'

type FieldType = {
  username?: string
  password?: string
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

const QueryForm: React.FC<{ search: () => void; loading: boolean }> = props => {
  const [open, setOpen] = useState(false)

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values)
    setOpen(false)
    props.search()
  }

  const search = () => {
    props.search()
  }

  return (
    <div className='bg-white rounded-md px-4 py-5'>
      <DeviceAddForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      ></DeviceAddForm>
      <Form layout='inline' initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item<FieldType> label='设备' name='username'>
          <Input placeholder='请输入' />
        </Form.Item>

        <Form.Item label='状态'>
          <Select
            placeholder='请选择'
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: '', label: '全部' },
              { value: '1', label: '在线' },
              { value: '-1', label: '离线' },
              { value: '0', label: '未连接' }
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button loading={props.loading} className='mr-2' type='primary' htmlType='submit' onClick={search}>
            搜索
          </Button>
          <Button
            type='primary'
            htmlType='submit'
            onClick={() => {
              setOpen(true)
            }}
          >
            新建
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default QueryForm
