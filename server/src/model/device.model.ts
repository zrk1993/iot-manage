import db from '@/utils/db'
import BaseModel from '@/model/base.model'

export const tableName = 'device'

export interface TDevice {
  device_id: number
  product_id: number
  product_key: string
  fireware_id: number
  device_name: string
  device_key: string
  client_ip: string
  status: number
  create_time: Date
  last_time: Date
}

export class DeviceModel extends BaseModel<TDevice> {
  constructor() {
    super({ tableName, primaryKey: 'device_id' })
  }

  async getByKey(device_key: string): Promise<TDevice> {
    if (!device_key) return null
    return this.$db.table(tableName).where({ device_key }).findOrEmpty()
  }

  async getById(id: number | string): Promise<TDevice> {
    const res = await this.$db.query(
      `SELECT d.*, p.product_name, p.product_key
      FROM t_device AS d
      LEFT JOIN t_product AS p ON p.product_id = d.product_id
      WHERE d.device_id = ?`,
      [id]
    )
    return res?.[0]
  }

  async getByBemfaTopic(bemfa_topic: string): Promise<TDevice> {
    return this.$db.table(tableName).where({ bemfa_topic }).findOrEmpty()
  }

  async list({ product_id }): Promise<TDevice[]> {
    const args = []
    let sql = `SELECT * FROM t_device WHERE 1=1`
    if (product_id) {
      sql += ' AND product_id=?'
      args.push(product_id)
    }
    return db.query(sql, args)
  }

  async page(page: number = 1, size: number = 10): Promise<{ data: TDevice[]; total: number }> {
    const args = []
    let sql = `SELECT d.*, p.product_name
      FROM t_${this.$tableName} AS d
      LEFT JOIN t_product AS p ON p.product_id = d.product_id
      WHERE 1=1`
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

export default new DeviceModel()
