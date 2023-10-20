import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Back = () => {
  const navigate = useNavigate()

  return (
    <div
      className='cursor-pointer mr-1 hover:text-blue-600'
      onClick={() => {
        navigate(-1)
      }}
    >
      <ArrowLeftOutlined />
    </div>
  )
}

export default Back
