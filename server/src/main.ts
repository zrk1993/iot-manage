import { Koast } from 'koast'
import routers from './controller'
import { openDb } from './utils/db'

import config from './config'
import './mqtt/broker'
import './mqtt/bemfa_mqtt'
import logger from './utils/logger'

async function main() {
  await openDb()

  const app = new Koast({ proxy: true, prefix: '/api' })

  app.useSwagger(routers)
  logger.info('swagger address http://localhost:' + config.SERVER_PORT + '/swagger-ui/index.html')

  app.useRouter(routers)
  app.listen(config.SERVER_PORT, () => {
    logger.info('server start on http://localhost:' + config.SERVER_PORT)
  })
}

main()
