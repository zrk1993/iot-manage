import db from '@/utils/db'
import BaseModel from '@/model/base.model'

export type TFirmware = {
  firmware_id: number
  product_id: number
  version: number
  firmware_name: string
  file_uid: string
  create_time: Date
}

const tableName = 'firmware'

export class FirmwareModel extends BaseModel<TFirmware> {
  constructor() {
    super({ tableName, primaryKey: 'firmware_id' })
  }

  async page(page: number = 1, size: number = 10): Promise<{ data: TFirmware[]; total: number }> {
    const args = []
    let sql = `SELECT f.*, p.product_name FROM t_firmware f LEFT JOIN t_product p ON p.product_id = f.product_id WHERE 1=1`
    const [{ total }] = await db.query(
      sql.replace(/SELECT[\s\S]*?FROM/, 'SELECT COUNT(*) AS total FROM'),
      args
    )
    sql += ` ORDER BY ${this.$primaryKey} DESC LIMIT ?, ?`
    args.push(page * size - size, +size)
    const data = await db.query(sql, args)
    return {
      data,
      total
    }
  }
}

export default new FirmwareModel()
