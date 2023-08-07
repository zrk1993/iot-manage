import { LoginForm, ProFormText } from '@ant-design/pro-components'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './index.scss'

const Login = () => {
  return (
    <div className='flex justify-center pt-28'>
      <div className='overflow-hidden rounded-lg bg-white p-6 pb-10 lg:p-12'>
        <LoginForm title='Iot manage' subTitle='物联网管理系统'>
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
  )
}

export default Login
