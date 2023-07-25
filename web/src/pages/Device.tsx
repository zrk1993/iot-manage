import React, { useState } from 'react'
import { Button } from 'antd'

const Device = () => {
  const [num, setNum] = useState(0)
  const onClick = () => {
    setNum(num + 1)
  }
  console.log(num)
  return (
    <div className=''>
      Device
      {num}
      <Button onClick={onClick}>+1</Button>
    </div>
  )
}

export default Device
