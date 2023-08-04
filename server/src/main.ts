import { Koast } from 'koast'
import routers from './controller'

import startForward from './mqtt/forward'

async function main() {
  const app = new Koast({ proxy: true })

  app.useSwagger([routers])
  console.log('swagger address http://localhost:3000/swagger-ui/index.html')

  app.useRouter([routers])
  app.listen(3000, () => {
    console.log('server start on http://localhost:3000')
  })
}

main()
startForward()
