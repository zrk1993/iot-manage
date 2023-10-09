import { tslAdd } from '@/api/tsl'
import globalMsg from '@/utils/global-msg'
import { Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface Values {
  type: string
  identifier: string
  name: string
}

interface TslAddFormProps {
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

const ProductAddForm: React.FC<TslAddFormProps> = ({ open, onCreate, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title='新建物模型'
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
              const { code, message } = await tslAdd(values)
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
      <Form form={form} className='pt-3' layout='vertical' name='form_in_modal' initialValues={{ type: 'property', name: '', identifier: '' }}>
        <Form.Item name='type' label='功能类型' rules={[{ required: true, message: '请选择功能类型' }]}>
          <Select placeholder='请选择功能类型' allowClear>
            <Option key='property' value='property'>
              属性
            </Option>
            <Option key='event' value='event'>
              服务
            </Option>
            <Option key='service' value='service'>
              事件
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name='name' label='功能名称' rules={[{ required: true, message: '请输入功能名称' }]}>
          <Input placeholder='请输入功能名称' />
        </Form.Item>
        <Form.Item name='identifier' label='标识符' rules={[{ required: true, message: '请输入标识符' }]}>
          <Input placeholder='请输入标识符' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ProductAddForm
