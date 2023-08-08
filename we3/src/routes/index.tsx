import { useRoutes } from 'react-router-dom'

import routes from './config'

const Router = () => {
  return useRoutes(routes)
}

export default Router
