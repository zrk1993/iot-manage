import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Home = () => {
  const navigate = useNavigate()
  const [num, setNum] = useState(0)
  const onClick = () => {
    setNum(num + 1)
  }
  const onClick2 = () => {
    navigate('/device/index2')
  }

  console.log(num)
  return (
    <div className='h-full w-full'>
      {num}
      <Button onClick={onClick}>+1</Button>
      <Button onClick={onClick2}>+1</Button>
    </div>
  )
}

export default Home
