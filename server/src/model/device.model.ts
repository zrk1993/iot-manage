import db from '@/utils/db'
import BaseModel from '@/model/base.model'

export const tableName = 'device'

export interface TDevice {
  device_id: number
  product_id: number
  fireware_id: number
  device_name: string
  mac_address: string
  device_key: string
  client_ip: string
  status: number
  create_time: Date
  last_time: Date
  [prop: string]: any
}

export class DeviceModel extends BaseModel<TDevice> {
  constructor() {
    super({ tableName, primaryKey: 'device_id' })
  }

  async getByName(uname: string): Promise<TDevice> {
    return this.$db.table(tableName).where({ uname }).findOrEmpty()
  }

  async getByBemfaTopic(bemfa_topic: string): Promise<TDevice> {
    return this.$db.table(tableName).where({ bemfa_topic }).findOrEmpty()
  }
}

export default new DeviceModel()
