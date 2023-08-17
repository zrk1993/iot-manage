import { Koast } from 'koast'
import routers from './controller'
import { openDb } from './utils/db'

import './mqtt/broker'
import './mqtt/bemfa_mqtt'

async function main() {
  await openDb()

  const app = new Koast({ proxy: true })

  app.useSwagger(routers)
  console.log('swagger address http://localhost:3000/swagger-ui/index.html')

  app.useRouter(routers)
  app.listen(3000, () => {
    console.log('server start on http://localhost:3000')
  })
}

main()
