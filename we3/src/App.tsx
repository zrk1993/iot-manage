import { useState } from 'react'
import { Button, Input } from 'antd'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='card'>
        11
        <Input>11</Input>
        <Button onClick={() => setCount(count => count + 1)}>count is {count}</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
