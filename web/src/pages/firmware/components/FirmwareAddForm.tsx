import { firmwareAdd } from '@/api/firmware'
import { productList } from '@/api/product'
import Upload from '@/components/Upload'
import globalMsg from '@/utils/global-msg'
import { CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'

const { Option } = Select

interface Values {
  product_id: string
  firmware_name: string
  version: number
  file_uid: string
}

interface DeviceAddFormProps {
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

const normFile = (e: any) => {
  console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const DeviceAddForm: React.FC<DeviceAddFormProps> = ({ open, onCreate, onCancel }) => {
  const [fileUid, setFileUid] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [products, setProducts] = useState<any[]>([])
  useRequest(productList, {
    onSuccess: result => {
      if (result) {
        setProducts(result.data || [])
      }
    }
  })

  const initialValues = {
    product_id: null,
    firmware_name: '',
    version: '',
    file_uid: ''
  }
  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title='添加升级包'
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
              const { code, message } = await firmwareAdd(values)
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
      <Form form={form} className='pt-3' layout='vertical' name='form_in_modal' initialValues={initialValues}>
        <Form.Item name='product_id' label='所属产品' rules={[{ required: true, message: '请选择所属产品' }]}>
          <Select placeholder='请选择所属产品' allowClear>
            {products.map(v => (
              <Option key={v.product_id} value={v.product_id}>
                {v.product_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='firmware_name' label='升级包名称' rules={[{ required: true, message: '请输入升级包名称' }]}>
          <Input placeholder='请输入升级包名称' />
        </Form.Item>
        <Form.Item name='version' label='版本号' rules={[{ required: true, message: '请输入版本号' }]}>
          <Input placeholder='请输入版本号' />
        </Form.Item>
        <Form.Item getValueFromEvent={normFile} name='file_uid' label='升级包' rules={[{ required: true, message: '请上传升级包' }]}>
          <div className='flex items-center'>
            <div className='mr-4'>{fileUid}</div>
            {fileUid ? (
              <CloseOutlined
                className='cursor-pointer'
                onClick={() => {
                  form.setFieldValue('file_uid', '')
                  setFileUid('')
                }}
              />
            ) : (
              <Upload
                onSuccess={v => {
                  form.setFieldValue('file_uid', v)
                  form.validateFields()
                  setFileUid(v)
                }}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            )}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DeviceAddForm
