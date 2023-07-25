import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/config'

const App: React.FC = () => {
  const Element = useRoutes(routes)

  return <>{Element}</>
}

export default App
