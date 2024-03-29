import type { Client, AuthenticateError } from 'aedes'
import Aedes from 'aedes'
import { createServer } from 'net'
import productModel from '@/model/product.model'
import deviceModel from '@/model/device.model'
import logger from '@/utils/logger'
import cache from '@/utils/cache'
import { parseClientId } from '@/utils/mtqq-tool'
import serverHandle from './server_handle'

const port = 9501
const aedes = new Aedes()

aedes.authenticate = async function (client, productKey, password, callback) {
  if (productKey === 'admin' && password.toString() === 'zxcvbnm8') {
    client.id = 'admin'
    return callback(null, true)
  }
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
      cache.suggestDeviceKey.unshift({
        device_key: device_key,
        product_key: product.product_key,
        product_name: product.product_name,
        time: Date.now()
      })
      cache.suggestDeviceKey = cache.suggestDeviceKey.slice(0, 5)
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
  const { product_key, device_key } = parseClientId(client.id)
  aedes.publish(
    {
      cmd: 'publish',
      qos: 1,
      dup: false,
      topic: `/sys/${product_key}/${device_key}/thing/event/connect/post`,
      payload: JSON.stringify({
        client_ip: (client.conn as any).remoteAddress?.replace('::ffff:', '')
      }),
      retain: false
    },
    err => {
      if (err) logger.error(err.message)
    }
  )
})

aedes.on('clientDisconnect', async client => {
  const { product_key, device_key } = parseClientId(client.id)
  aedes.publish(
    {
      cmd: 'publish',
      qos: 1,
      dup: false,
      topic: `/sys/${product_key}/${device_key}/thing/event/disconnect/post`,
      payload: null,
      retain: false
    },
    err => {
      if (err) logger.error(err.message)
    }
  )
})

serverHandle(aedes)

setInterval(() => {
  aedes.publish(
    {
      cmd: 'publish',
      qos: 1,
      dup: false,
      topic: `/ext/ntp/jdwSdrphKj/D8BFC0FAAC28/response`,
      payload: JSON.stringify({ id: '1', code: '2', message: '3' }),
      retain: false
    },
    err => {
      if (err) logger.error(err.message)
    }
  )
}, 5000)

const server = createServer(aedes.handle)

server.listen(port, function () {
  logger.log('mqtt broker on port ', port)
})

export function getcClients(): Client[] {
  return Object.values((aedes as any).clients)
}

export default aedes
