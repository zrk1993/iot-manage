import db from '../utils/db'
import BaseModel from './base.model'

export const tableName = 'device'

export interface TDevice {
  id: string
  name: string
  product_type: string
  mac_address: string
  status: number
  create_time: string
  connect_time: string
  disconnect_time: string
  remote_address: string
  bemfa_iot: number
  bemfa_topic: string
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
