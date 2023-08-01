import React, { useState } from 'react'
import { Button } from 'antd'

function MyComponent() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null)

  return (
    <div className='App'>
      <textarea ref={el} />
    </div>
  )
}

export default MyComponent
