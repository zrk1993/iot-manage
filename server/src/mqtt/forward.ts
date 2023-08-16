import broker from './broker'
import bemfa_mqtt from './bemfa_mqtt'
import * as deviceModel from '../model/device.model'

async function startForward() {
  broker.on('subscribe', async (subscriptions, client) => {
    const device = await deviceModel.getByKey(client.id)
    if (device?.bemfa_iot) {
      subscriptions.forEach(s => {
        bemfa_mqtt.subscribe(s.topic, error => {
          if (error) console.error(error)
        })
      })
    }
  })

  broker.on('unsubscribe', async (unsubscriptions, client) => {
    const device = await deviceModel.getByKey(client.id)
    if (device?.bemfa_iot) {
      unsubscriptions.forEach(topic => {
        console.log(topic)
        bemfa_mqtt.unsubscribe(topic, err => {
          if (err) console.error(err.message)
        })
      })
    }
  })

  bemfa_mqtt.on('message', async function (topic, message) {
    const device = await deviceModel.getByBemfaTopic(topic)
    if (device?.bemfa_iot) {
      broker.publish(
        {
          cmd: 'publish',
          qos: 1,
          dup: false,
          topic: device.mac,
          payload: message,
          retain: false
        },
        err => {
          if (err) console.error(err.message)
        }
      )
    }
  })
}

export default startForward
