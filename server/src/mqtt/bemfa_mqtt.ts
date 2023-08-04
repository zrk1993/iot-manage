import * as mqtt from 'mqtt'
import config from '../config'

const client = mqtt.connect({
  host: 'bemfa.com',
  port: 9501,
  clientId: config.BEMFA_CLIENT_ID
})

client.on('error', err => {
  console.error(err.message)
  process.exit()
})

client.on('connect', packet => {
  console.log(packet.cmd)
})

export default client
