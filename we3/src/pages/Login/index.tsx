import { login } from '@/api/user'
import { useDispatch } from '@/store/index'
import { setToken } from '@/store/reducers/globalSlice'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message as antdMessage } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = antdMessage.useMessage()

  const onFinish = async (formData: any) => {
    setLoading(true)
    try {
      const { code, message, data } = await login(formData)
      if (code != 0) {
        messageApi.error(message)
        return
      }
      dispatch(setToken(data))
      navigate('/', { replace: true })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <div className='h-full w-full flex items-center justify-center mx-auto'>
        <div className='bg-white rounded-lg px-6 pt-8 pb-6 mx-2 w-full md:w-[330px]'>
          <div className='text-center text-3xl text-black font-medium'>Iot manage</div>
          <div className='text-center text-sm text-gray-500 mt-2'>物联网管理平台</div>
          <Form className='mt-8' onFinish={onFinish} autoComplete='off' size='large'>
            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input placeholder='用户名' prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码!' }]}>
              <Input.Password placeholder='密码' prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} className='w-full' type='primary' htmlType='submit'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login
