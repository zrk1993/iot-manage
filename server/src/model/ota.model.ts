import db from '@/utils/db'
import BaseModel from '@/model/base.model'

export type TOta = {
  ota_id: number
  product_id: number
  firmware_id: number
  desc: string
  batch_no: string
  status: number
  progress: number
  create_time: Date
  update_time: Date
}

const tableName = 'Ota'

export class OtaModel extends BaseModel<TOta> {
  constructor() {
    super({ tableName, primaryKey: 'ota_id' })
  }
}

export default new OtaModel()
