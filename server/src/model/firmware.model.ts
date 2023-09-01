import db from '@/utils/db'
import BaseModel from '@/model/base.model'

export type TFirmware = {
  firmware_id: number
  product_id: number
  desc: string
  version: number
  file_name: string
  file_size: number
  create_time: Date
}

const tableName = 'firmware'

export class FirmwareModel extends BaseModel<TFirmware> {
  constructor() {
    super({ tableName, primaryKey: 'firmware_id' })
  }
}

export default new FirmwareModel()
