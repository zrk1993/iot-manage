import { TDevice } from '../model/device.model'
import { addTopic, delTopic } from '../api/bemfa'
import deviceModel from '../model/device.model'
import products from '../constant/products'
import bemfa_mqtt from '../mqtt/bemfa_mqtt'
import logger from '../utils/logger'

export async function subscribeBemfa(id: string) {
  const device = await deviceModel.getById(id)
  if (!device) {
    throw new Error('设备不存在！')
  }
  if (!device.bemfa_topic) {
    device.bemfa_topic = id + products.find(v => v.type === device.product_type).code
    const res = await addTopic(device.bemfa_topic, device.name)
    if (res.code !== 0) {
      throw new Error(res.message)
    }
    bemfa_mqtt.unsubscribe(device.bemfa_topic, err => {
      if (err) logger.error(err.message)
    })
  }
  await deviceModel.updateById(id, { bemfa_topic: device.bemfa_topic, bemfa_iot: 1 })
}

export async function unsubscribeBemfa(id: string) {
  const device = await deviceModel.getById(id)
  if (!device) {
    throw new Error('设备不存在！')
  }
  if (device.bemfa_topic) {
    const res = await delTopic(device.bemfa_topic)
    if (res.code != 0) {
      throw new Error(res.message)
    }
    bemfa_mqtt.unsubscribe(device.bemfa_topic, err => {
      if (err) logger.error(err.message)
    })
  }
  await deviceModel.updateById(id, { bemfa_topic: null, bemfa_iot: 0 })
}
