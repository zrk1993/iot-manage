import { Koast } from 'koast'
import routers from '@/src/controller'
import logger from '@/src/utils/logger'
import config from '@/src/config'
import '@/src/mqtt/broker'
import '@/src/mqtt/bemfa_mqtt'

async function main() {
  const app = new Koast({ proxy: true, prefix: '/api' })

  app.useSwagger(routers)
  logger.info('swagger address http://localhost:' + config.SERVER_PORT + '/swagger-ui/index.html')

  app.useRouter(routers)
  app.listen(config.SERVER_PORT, () => {
    logger.info('server start on http://localhost:' + config.SERVER_PORT)
  })
}

main()
