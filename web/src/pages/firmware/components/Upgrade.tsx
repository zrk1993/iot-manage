import { deviceList } from '@/api/device'
import { otaCreate } from '@/api/ota'
import globalMsg from '@/utils/global-msg'
import { useRequest } from 'ahooks'
import { Form, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'

const { Option } = Select

interface Values {
  product_id: string
  firmware_name: string
  version: number
  file_uid: string
}

interface DeviceAddFormProps {
  firmware_id: string
  product_id: string
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

const DeviceAddForm: React.FC<DeviceAddFormProps> = ({ firmware_id, product_id, open, onCreate, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [products, setProducts] = useState<any[]>([])
  const { run } = useRequest(deviceList, {
    manual: true,
    onSuccess: result => {
      if (result) {
        setProducts(result.data || [])
      }
    }
  })

  useEffect(() => {
    if (product_id) {
      run({ product_id })
    }
  }, [product_id])

  const initialValues = {
    device_ids: []
  }
  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title='OTA'
      okText='升级'
      cancelText='取消'
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(async values => {
            setConfirmLoading(true)
            try {
              const { code, message } = await otaCreate({ firmware_id, ...values })
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
      <Form form={form} className='pt-3 pb-4' layout='vertical' name='form_in_modal' initialValues={initialValues}>
        <Form.Item name='device_ids' label='目标设备' rules={[{ required: true, message: '请选择目标设备' }]}>
          <Select placeholder='请选择目标设备' allowClear mode='multiple'>
            {products.map(v => (
              <Option key={v.device_id} value={v.device_id}>
                {v.device_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DeviceAddForm
