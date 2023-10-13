import db from '@/utils/db'
import BaseModel from '@/model/base.model'

export type TTSL = {
  tsl_id: number
  product_id: number
  type: 'property' | 'service' | 'event'
  identifier: string
  name: string
}

const tableName = 'tsl'

export class TSLModel extends BaseModel<TTSL> {
  constructor() {
    super({ tableName, primaryKey: 'tsl_id' })
  }

  async deviceProperty(device_id: number) {
    const sql = `
    SELECT t1.value, t1.create_time, t3.type, t3.identifier, t3.name
    FROM t_tsl_data t1
      LEFT JOIN t_tsl_data t2 ON t1.tsl_id = t2.tsl_id AND t1.create_time < t2.create_time
      LEFT JOIN t_tsl t3 ON t3.tsl_id = t1.tsl_id
    WHERE t2.tsl_id IS NULL AND t1.device_id = ? AND t3.type = 'property'`
    return db.query(sql, [device_id])
  }

  async tslData(params: { page?: number; size?: number; device_id?: number; type?: string }) {
    const args = []
    let sql = `
      SELECT d.*, t.identifier, t.name, t.type FROM t_tsl_data d
      LEFT JOIN t_tsl t ON t.tsl_id = d.tsl_id
      WHERE 1=1
    `
    if (params.device_id) {
      sql += ' AND d.device_id = ?'
      args.push(params.device_id)
    }
    if (params.type) {
      sql += ' AND t.type = ?'
      args.push(params.type)
    }
    const [{ total }] = await db.query(
      sql.replace(/SELECT[\s\S]*?FROM/, 'SELECT COUNT(*) AS total FROM'),
      args
    )
    sql += ` ORDER BY d.tsl_data_id DESC LIMIT ?, ?`
    args.push(params.page * params.size - params.size, +params.size)
    const data = await db.query(sql, args)
    return {
      data,
      total
    }
  }
}

export default new TSLModel()
