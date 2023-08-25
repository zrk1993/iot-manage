import db from '../utils/db'
import BaseModel from './base.model'

export const tableName = 'device'

export interface TDevice {
  id: string
  name: string
  product_type: string
  mac_address: string
  status: number
  create_time: Date
  connect_time: Date
  disconnect_time: Date
  remote_address: string
  bemfa_iot: number
  bemfa_topic: string
  [prop: string]: any
}

export class DeviceModel extends BaseModel<TDevice> {
  constructor() {
    super({ tableName, primaryKey: 'id' })
  }

  async getByName(uname: string): Promise<TDevice> {
    return this.$db.table(tableName).where({ uname }).findOrEmpty()
  }

  async getByBemfaTopic(bemfa_topic: string): Promise<TDevice> {
    return this.$db.table(tableName).where({ bemfa_topic }).findOrEmpty()
  }
}

export default new DeviceModel()
