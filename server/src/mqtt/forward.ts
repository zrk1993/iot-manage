import broker from './broker'
import bemfa_mqtt from './bemfa_mqtt'
import { allTopic, addTopic } from '../api/bemfa'

async function startForward() {
  broker.on('subscribe', (subscriptions, client) => {
    subscriptions.forEach(s => {
      console.log(s.topic)
      allTopic().then(res => {
        if (res.code == 0) {
          const exist = res.data.find(v => v.topic == s.topic)
          if (exist) {
            bemfa_mqtt.subscribe(s.topic, err => {
              if (err) console.error(err.message)
            })
          } else {
            addTopic(s.topic)
              .then(res => {
                if (res.code == 0) {
                  bemfa_mqtt.subscribe(s.topic, err => {
                    if (err) console.error(err.message)
                  })
                } else {
                  console.error(res.message)
                }
              })
              .catch(err => {
                console.error(err)
              })
          }
        } else {
          console.error(res.message)
        }
      })
    })
  })

  broker.on('unsubscribe', (unsubscriptions, client) => {
    unsubscriptions.forEach(topic => {
      console.log(topic)
      bemfa_mqtt.unsubscribe(topic, err => {
        if (err) console.error(err.message)
      })
    })
  })

  bemfa_mqtt.on('message', function (topic, message) {
    broker.publish(
      {
        cmd: 'publish',
        qos: 1,
        dup: false,
        topic: topic,
        payload: message,
        retain: false
      },
      err => {
        if (err) console.error(err.message)
      }
    )
  })
}

export default startForward
