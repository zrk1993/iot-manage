import { deviceAdd } from '@/api/device'
import { productList } from '@/api/product'
import { useRequest } from 'ahooks'
import { Form, Input, Modal, Select, message as antdMessage } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface Values {
  name: string
  product_type: string
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
                antdMessage.error(message)
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
      <Form form={form} layout='vertical' name='form_in_modal' initialValues={{ name: '', product_type: null }}>
        <Form.Item name='name' label='设备名' rules={[{ required: true, message: '请输入设备名' }]}>
          <Input placeholder='请输入设备名称' />
        </Form.Item>
        <Form.Item name='product_type' label='设备类型' rules={[{ required: true, message: '请选择设备类型' }]}>
          <Select placeholder='请选择设备类型' allowClear>
            {loading
              ? null
              : products.map(v => (
                  <Option key={v.type} value={v.type}>
                    {v.name}
                  </Option>
                ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DeviceAddForm
