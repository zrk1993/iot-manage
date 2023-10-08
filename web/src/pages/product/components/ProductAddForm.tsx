import { productAdd } from '@/api/product'
import globalMsg from '@/utils/global-msg'
import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'

interface Values {
  product_name: string
}

interface ProductAddFormProps {
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

const ProductAddForm: React.FC<ProductAddFormProps> = ({ open, onCreate, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title='新建产品'
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
              const { code, message } = await productAdd(values)
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
      <Form form={form} className='pt-3' layout='vertical' name='form_in_modal' initialValues={{ product_name: '' }}>
        <Form.Item name='product_name' label='产品名称' rules={[{ required: true, message: '请输入产品名称' }]}>
          <Input placeholder='请输入产品名称' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ProductAddForm
