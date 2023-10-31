import otaModel from '@/model/ota.model'
import firmwareModel from '@/model/firmware.model'
import deviceModel from '@/model/device.model'
import broker from '@/mqtt/broker'
import logger from '@/utils/logger'

export async function informDevice(ota_id: number) {
  const ota = await otaModel.getById(ota_id)
  const device = await deviceModel.getById(ota.device_id)
  broker.publish(
    {
      cmd: 'publish',
      qos: 1,
      dup: false,
      topic: `/ota/device/upgrade/${device.product_key}/${device.device_key}`,
      payload: JSON.stringify({
        url: `http://192.168.200.55:9500/api/ota/update/${ota_id}`
      }),
      retain: false
    },
    err => {
      if (err) logger.error(err.message)
    }
  )
}
