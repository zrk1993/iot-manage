import type { Client, AuthenticateError } from 'aedes'
import Aedes from 'aedes'
import { createServer } from 'net'
import bemfa_mqtt from './bemfa_mqtt'
import deviceModel from '../model/device.model'
import logger from '../utils/logger'

const port = 9501
const aedes = new Aedes()

aedes.authenticate = async function (client, username, password, callback) {
  const device = await deviceModel.getById(client.id)
  if (!device) {
    const error = new Error('Auth error') as AuthenticateError
    error.returnCode = 4
    return callback(error, null)
  }
  if (!device.mac_address) {
    await deviceModel.updateById(device.id, { mac_address: username })
  }
  callback(null, client.id === device.id)
}

aedes.authorizeSubscribe = async function (client, sub, callback) {
  const device = await deviceModel.getById(client.id)
  if (!device) {
    return callback(new Error('wrong device'))
  }
  if (sub.topic !== device.mac_address) {
    // return callback(new Error('wrong topic'))
  }
  callback(null, sub)
}

aedes.on('clientReady', async client => {
  const device = await deviceModel.getById(client.id)
  if (device) {
    await deviceModel.updateById(device.id, {
      status: 1,
      connect_time: new Date(),
      remote_address: (client.conn as any).remoteAddress?.replace('::ffff:', '')
    })
    if (device.bemfa_iot && device.bemfa_topic) {
      bemfa_mqtt.subscribe(device.bemfa_topic, error => {
        if (error) logger.error(error)
      })
    }
  }
})

aedes.on('clientDisconnect', async client => {
  const device = await deviceModel.getById(client.id)
  if (device) {
    await deviceModel.updateById(device.id, {
      status: -1,
      disconnect_time: new Date()
    })
    if (device.bemfa_iot && device.bemfa_topic) {
      bemfa_mqtt.unsubscribe(device.bemfa_topic, err => {
        if (err) logger.error(err.message)
      })
    }
  }
})

const server = createServer(aedes.handle)

server.listen(port, function () {
  logger.log('mqtt broker on port ', port)
})

export function getcClients(): Client[] {
  return Object.values((aedes as any).clients)
}

export default aedes
