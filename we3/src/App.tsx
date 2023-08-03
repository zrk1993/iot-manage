import { useRoutes } from 'react-router-dom'
import routes from './routes/config'

function App() {
  const element = useRoutes(routes)

  return <>{element}</>
}

export default App
