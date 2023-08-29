require('module-alias/register')
import { Koast } from 'koast'
import routers from '@/controller'
import logger from './utils/logger'
import config from './config'
import errorHandle from './middleware/error-handle'
import appJwt from './middleware/app-jwt'
import './mqtt/broker'
import './mqtt/bemfa_mqtt'

async function main() {
  const app = new Koast({ proxy: true, prefix: '/api' })

  app.use(appJwt())
  app.use(errorHandle())

  app.useRouter(routers)
  app.listen(config.SERVER_PORT, () => {
    logger.info('server start on http://localhost:' + config.SERVER_PORT)
  })
}

main()
