import * as mqtt from 'mqtt'
import broker from './broker'
import config from '../config'
import * as deviceModel from '../model/device.model'

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
  console.log('bemfa mqtt connect ', packet.cmd)
})

client.on('message', async function (topic, message) {
  const device = await deviceModel.getByBemfaTopic(topic)
  if (device?.bemfa_iot) {
    broker.publish(
      {
        cmd: 'publish',
        qos: 1,
        dup: false,
        topic: device.mac_address,
        payload: message,
        retain: false
      },
      err => {
        if (err) console.error(err.message)
      }
    )
  }
})

export default client
