import React, { useState, useCallback, useEffect, useMemo, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const Child = memo((props: any) => {
  console.log('Child')
  return (
    <>
      <div>
        Child: {props.text} <input type='text' onInput={props.handleInputChange} />{' '}
      </div>
    </>
  )
})

Child.displayName = 'MapOneMapBJ'

const Home = () => {
  const navigate = useNavigate()
  const [num, setNum] = useState(0)
  const [num2, setNum2] = useState(0)
  const onClick = () => {
    setNum(num + 1)
  }
  const onClick2 = () => {
    // navigate('/device/index2')
    setNum2(num2 + 1)
  }

  useEffect(() => {
    console.log('useEffect', num)
  }, [num])

  const aa = useMemo(() => {
    console.log('useMemo-', num2)
    return 'useMemo-' + num2
  }, [num2])

  const handleInputChange = useCallback(() => {
    console.log('useCallback')
  }, [])

  console.log(num)
  return (
    <div className='h-full w-full'>
      {num}
      <Button onClick={onClick}>+1</Button>
      <div>---</div>
      {num2} ---- {aa}
      <Button onClick={onClick2}>+1</Button>
      <div>----</div>
      <Child text={num2} handleInputChange={handleInputChange}></Child>
    </div>
  )
}

export default Home
