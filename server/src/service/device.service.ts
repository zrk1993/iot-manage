import { TDevice } from '@/model/device.model'
import { addTopic, delTopic } from '@/api/bemfa'
import deviceModel from '@/model/device.model'
import tslModel from '@/model/tsl.model'
import products from '@/constant/products'
import bemfa_mqtt from '@/mqtt/bemfa_mqtt'
import logger from '@/utils/logger'
import broker from '@/mqtt/broker'

export async function subscribeBemfa(id: number) {
  // const device = await deviceModel.getById(id)
  // if (!device) {
  //   throw new Error('设备不存在！')
  // }
  // if (!device.bemfa_topic) {
  //   device.bemfa_topic = id + products.find(v => v.type === device.product_type).code
  //   const res = await addTopic(device.bemfa_topic, device.name)
  //   if (res.code !== 0) {
  //     throw new Error(res.message)
  //   }
  //   bemfa_mqtt.unsubscribe(device.bemfa_topic, err => {
  //     if (err) logger.error(err.message)
  //   })
  // }
  // await deviceModel.updateById(id, { bemfa_topic: device.bemfa_topic, bemfa_iot: 1 })
}

export async function unsubscribeBemfa(id: number) {
  // const device = await deviceModel.getById(id)
  // if (!device) {
  //   throw new Error('设备不存在！')
  // }
  // if (device.bemfa_topic) {
  //   const res = await delTopic(device.bemfa_topic)
  //   if (res.code != 0) {
  //     throw new Error(res.message)
  //   }
  //   bemfa_mqtt.unsubscribe(device.bemfa_topic, err => {
  //     if (err) logger.error(err.message)
  //   })
  // }
  // await deviceModel.updateById(id, { bemfa_topic: null, bemfa_iot: 0 })
}

export async function propertySet(device_id: number, tsl_id: number, value: any) {
  const tsl = await tslModel.getById(tsl_id)
  const device = await deviceModel.getById(device_id)
  broker.publish(
    {
      cmd: 'publish',
      qos: 1,
      dup: false,
      topic: `/sys/${device.product_key}/${device.device_key}/thing/service/property/set`,
      payload: JSON.stringify({
        params: {
          [tsl.identifier]: value
        }
      }),
      retain: false
    },
    err => {
      if (err) logger.error(err.message)
    }
  )
}
