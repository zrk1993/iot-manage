import db from '@/utils/db'
import BaseModel from '@/model/base.model'

export type TOta = {
  ota_id: number
  product_id: number
  firmware_id: number
  batch_no: string
  status: number
  progress: number
  create_time: Date
  update_time: Date
}

const tableName = 'ota'

export class OtaModel extends BaseModel<TOta> {
  constructor() {
    super({ tableName, primaryKey: 'ota_id' })
  }

  async list(firmware_id: Pick<TOta, 'firmware_id'>): Promise<TOta[]> {
    let sql = `
      SELECT o.*, d.device_name FROM t_ota o LEFT JOIN t_device d ON o.device_id = d.device_id
      WHERE o.firmware_id = ? ORDER BY ota_id DESC
    `
    return db.query(sql, [firmware_id])
  }

  async statistic(firmware_id: Pick<TOta, 'firmware_id'>) {
    const args = [firmware_id]
    const sql = `
      SELECT 
        COUNT(*) as status_all,
        COUNT(CASE WHEN status = 0 THEN 1 END) as status_0,
        COUNT(CASE WHEN status = 1 THEN 1 END) as status_1,
        COUNT(CASE WHEN status = 2 THEN 1 END) as status_2,
        COUNT(CASE WHEN status = 3 THEN 1 END) as status_3
      FROM t_ota WHERE firmware_id = ?
    `
    const data = await db.query(sql, args)
    return data[0]
  }
}

export default new OtaModel()
