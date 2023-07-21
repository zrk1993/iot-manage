import React, { useState } from 'react';
import { Button } from 'antd'

const SiderCustom = () => {
  const [num, setNum] = useState(0)
  const onClick = () => {
    setNum(num + 1)
  }
  console.log(num)
  return (
    <div>
      {num}
      <Button onClick={onClick}>+1</Button>
    </div>
  )
}

export default SiderCustom;