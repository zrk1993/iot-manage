import type { Client, AuthenticateError } from 'aedes'
import Aedes from 'aedes'
import { createServer } from 'net'
import * as deviceModel from '../model/device.model'

const port = 1883
const aedes = new Aedes()

aedes.authenticate = function (client, username, password, callback) {
  deviceModel
    .getByKey(client.id)
    .then(v => {
      if (v) {
        callback(null, true)
        // 更新 username
      } else {
        const error = new Error('Auth error') as AuthenticateError
        error.returnCode = 4
        callback(error, null)
      }
    })
    .catch(error => {
      error.returnCode = 4
      callback(error, null)
    })
}

const server = createServer(aedes.handle)

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})

export function getcClients(): Client[] {
  return Object.values((aedes as any).clients)
}

export default aedes
