import { login } from '@/api/user'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginForm, ProFormText } from '@ant-design/pro-components'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import './index.scss'

const Login = () => {
  const navigater = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (formData: any) => {
    try {
      const {
        data: { code, message }
      } = await login(formData)
      if (code != 0) {
        messageApi.error(message)
        return false
      }
      navigater('/')
      return true
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {contextHolder}
      <div className='flex justify-center pt-28'>
        <div className='overflow-hidden rounded-lg bg-white p-6 pb-8 lg:p-12'>
          <LoginForm title='Iot manage' subTitle='物联网管理系统' onFinish={onFinish}>
            <ProFormText
              name='username'
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />
              }}
              placeholder={'请输入用户名'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!'
                }
              ]}
            />
            <ProFormText.Password
              name='password'
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />
              }}
              placeholder={'请输入密码！'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！'
                }
              ]}
            />
          </LoginForm>
        </div>
      </div>
    </>
  )
}

export default Login
