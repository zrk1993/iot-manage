import type { TDevice } from '@/model/device.model'

export const parseClientId = (id: string) => {
  const v = id.split('/')
  return {
    product_key: v[0],
    device_key: v[1]
  }
}

export const getClientId = (device: TDevice) => {
  return `${device.product_key}/${device.device_key}`
}

export const parseTopic = (topic: string) => {
  const v = topic.split('/')
  return {
    product_key: v[0],
    device_key: v[1]
  }
}
