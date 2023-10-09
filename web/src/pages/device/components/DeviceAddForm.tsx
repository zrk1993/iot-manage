import { deviceAdd } from '@/api/device'
import { productList } from '@/api/product'
import globalMsg from '@/utils/global-msg'
import { useRequest } from 'ahooks'
import { Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface Values {
  device_name: string
  product_id: string
}

interface DeviceAddFormProps {
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

const DeviceAddForm: React.FC<DeviceAddFormProps> = ({ open, onCreate, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const { data, loading } = useRequest(productList)
  const products: any[] = data?.data || []

  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title='新建设备'
      okText='创建'
      cancelText='取消'
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(async values => {
            setConfirmLoading(true)
            try {
              const { code, message } = await deviceAdd(values)
              if (code != 0) {
                globalMsg.error(message)
                return
              }
            } catch (error) {
              console.error(error)
            } finally {
              setConfirmLoading(false)
            }
            form.resetFields()
            onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form form={form} className='pt-3' layout='vertical' name='form_in_modal' initialValues={{ device_name: '', device_key: '', product_id: null }}>
        <Form.Item name='product_id' label='所属产品' rules={[{ required: true, message: '请选择所属产品' }]}>
          <Select placeholder='请选择所属产品' allowClear>
            {loading
              ? null
              : products.map(v => (
                  <Option key={v.product_id} value={v.product_id}>
                    {v.product_name}
                  </Option>
                ))}
          </Select>
        </Form.Item>
        <Form.Item name='device_name' label='设备名' rules={[{ required: true, message: '请输入设备名' }]}>
          <Input placeholder='请输入设备名称' />
        </Form.Item>
        <Form.Item name='device_key' label='deviceKey' rules={[{ required: true, message: '请输入device_key' }]}>
          <Input placeholder='请输入device_key' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DeviceAddForm
