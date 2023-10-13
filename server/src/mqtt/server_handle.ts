import type { AedesPublishPacket } from 'aedes'
import aedes from 'aedes'
import TslDataModel from '@/model/tsl_data.model'
import TslModel from '@/model/tsl.model'
import DeviceModel from '@/model/device.model'
import { parseTopic } from '@/utils/mtqq-tool'

const map = {
  // 属性设置
  '/sys/+/+/thing/event/property/post': async (packet: AedesPublishPacket) => {
    const { device_key } = parseTopic(packet.topic)
    const device = await DeviceModel.getByKey(device_key)
    if (device) {
      const payload = JSON.parse(packet.payload.toString())
      const keys = Object.keys(payload.params)
      for (let i = 0; i < keys.length; i++) {
        const tsl = await TslModel.getByParams(device.product_id, 'property', keys[i])
        if (tsl) {
          await TslDataModel.insert({
            device_id: device.device_id,
            tsl_id: tsl.tsl_id,
            value: payload.params[keys[i]].value
          })
        }
      }
    }
  }
}

async function hand(aedes: aedes) {
  Object.keys(map).forEach(k => {
    aedes.subscribe(
      k,
      (packet, cb) => {
        cb()
        map[k](packet)
      },
      () => {}
    )
  })
}

export default hand
