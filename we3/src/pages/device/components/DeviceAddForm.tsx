import { deviceAdd } from '@/api/device'
import { productList } from '@/api/product'
import { useRequest } from 'ahooks'
import { Form, Input, Modal, Select, Switch, message as antdMessage } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface Values {
  name: string
  product_type: string
  bemfa_iot: boolean
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
              const { code, message } = await deviceAdd(Object.assign(values, { bemfa_iot: values.bemfa_iot ? 1 : 0 }))
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
      <Form form={form} layout='vertical' name='form_in_modal' initialValues={{ modifier: 'public' }}>
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
        <Form.Item name='bemfa_iot' label='连接巴法云' valuePropName='checked'>
          <Switch checkedChildren='开启' unCheckedChildren='关闭' defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DeviceAddForm
