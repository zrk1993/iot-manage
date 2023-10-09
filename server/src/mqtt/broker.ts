import type { Client, AuthenticateError } from 'aedes'
import Aedes from 'aedes'
import { createServer } from 'net'
import productModel from '@/model/product.model'
import deviceModel from '@/model/device.model'
import logger from '@/utils/logger'
import cache from '@/utils/cache'
import { parseClientId } from '@/utils/mtqq-tool'

const port = 9501
const aedes = new Aedes()

aedes.authenticate = async function (client, productKey, password, callback) {
  try {
    if (password.toString() != '123456780') {
      throw new Error('Auth error')
    }
    const product = await productModel.getByKey(productKey)
    if (!product) {
      throw new Error('Product error')
    }
    const { device_key } = parseClientId(client.id)
    const device = await deviceModel.getByKey(device_key)
    if (!device) {
      const suggestDeviceKey: any[] = cache.get('suggestDeviceKey') || []
      suggestDeviceKey.unshift({
        device_key: device_key,
        product_key: product.product_key,
        product_name: product.product_name,
        time: Date.now()
      })
      cache.set('suggestDeviceKey', suggestDeviceKey.slice(0, 5))
      throw new Error('Device error')
    }
  } catch (error: any) {
    error.returnCode = 4
    logger.error(error)
    return callback(error, null)
  }
  callback(null, true)
}

aedes.on('clientReady', async client => {
  const device = await deviceModel.getByKey(parseClientId(client.id).device_key)
  if (device) {
    await deviceModel.updateById(device.device_id, {
      status: 1,
      last_time: new Date(),
      client_ip: (client.conn as any).remoteAddress?.replace('::ffff:', '')
    })
  }

  aedes.publish(
    {
      cmd: 'publish',
      qos: 1,
      dup: false,
      topic: `/sys/${client.id}/thing/event/clientReady/post`,
      payload: 'message',
      retain: false
    },
    err => {
      if (err) logger.error(err.message)
    }
  )
})

aedes.on('clientDisconnect', async client => {
  const device = await deviceModel.getByKey(parseClientId(client.id).device_key)
  if (device) {
    await deviceModel.updateById(device.device_id, {
      status: -1,
      last_time: new Date()
    })
  }
  aedes.publish(
    {
      cmd: 'publish',
      qos: 1,
      dup: false,
      topic: `/sys/${client.id}/thing/event/disconnect/post`,
      payload: 'message',
      retain: false
    },
    err => {
      if (err) logger.error(err.message)
    }
  )
})

const server = createServer(aedes.handle)

server.listen(port, function () {
  logger.log('mqtt broker on port ', port)
})

export function getcClients(): Client[] {
  return Object.values((aedes as any).clients)
}

export default aedes
