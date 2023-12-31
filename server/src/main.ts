require('module-alias/register')
import { Koast } from 'koast'
import routers from '@/controller'
import logger from '@/utils/logger'
import config from '@/config'
import errorHandle from '@/middleware/error-handle'
import appJwt from '@/middleware/app-jwt'
import '@/mqtt/broker'
import '@/mqtt/bemfa_mqtt'

async function main() {
  const app = new Koast({ proxy: true, prefix: '/api' })

  app.use(appJwt())
  app.use(errorHandle())

  app.useSwagger(routers)

  app.useRouter(routers)
  app.listen(config.SERVER_PORT, () => {
    logger.info('server start on http://localhost:' + config.SERVER_PORT)
  })
}

process.on('rejectionHandled', logger.error.bind(logger))
process.on('uncaughtException', logger.error.bind(logger))
process.on('warning', logger.warn.bind(logger))

main()
