import { Button, Form, Input, Select } from 'antd'
import React from 'react'

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

const QueryForm: React.FC = () => (
  <div className='bg-white rounded-md px-4 py-5'>
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
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true }
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          新建
        </Button>
      </Form.Item>
    </Form>
  </div>
)

export default QueryForm
