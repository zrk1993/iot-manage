import { deviceTslDataSet } from '@/api/device'
import globalMsg from '@/utils/global-msg'
import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'

interface Values {
  product_name: string
}

interface FormProps {
  tsl: any
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

const ProductAddForm: React.FC<FormProps> = ({ tsl, open, onCreate, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title='属性设置'
      okText='设置'
      cancelText='取消'
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(async values => {
            setConfirmLoading(true)
            try {
              const { code, message } = await deviceTslDataSet(Object.assign({}, tsl, values))
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
      <Form form={form} className='pt-3' layout='vertical' name='form_in_modal' initialValues={{ value: '' }}>
        <Form.Item name='value' label={`${tsl?.name}-${tsl?.identifier}`} rules={[{ required: true, message: '请输入属性值' }]}>
          <Input placeholder='请输入属性值' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ProductAddForm
