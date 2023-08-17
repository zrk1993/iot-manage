import { Koast } from 'koast'
import routers from './controller'
import { openDb } from './utils/db'

import config from './config'
import './mqtt/broker'
import './mqtt/bemfa_mqtt'

async function main() {
  await openDb()

  const app = new Koast({ proxy: true })

  app.useSwagger(routers)
  console.log('swagger address http://localhost:' + config.SERVER_PORT + '/swagger-ui/index.html')

  app.useRouter(routers)
  app.listen(config.SERVER_PORT, () => {
    console.log('server start on http://localhost:' + config.SERVER_PORT)
  })
}

main()
