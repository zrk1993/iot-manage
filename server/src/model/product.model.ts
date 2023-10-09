import db from '@/utils/db'
import BaseModel from '@/model/base.model'

export type TProduct = {
  product_id: number
  product_name: string
  product_key: string
}

const tableName = 'product'

export class ProductModel extends BaseModel<TProduct> {
  constructor() {
    super({ tableName, primaryKey: 'product_id' })
  }

  async getByKey(product_key: string): Promise<TProduct> {
    return this.$db.table(tableName).where({ product_key }).findOrEmpty()
  }

  async list(): Promise<TProduct[]> {
    return db.query(
      `SELECT p.*,
      (SELECT COUNT(*) FROM t_device AS d WHERE d.product_id = p.product_id) as device_count
      FROM t_product AS p`
    )
  }
}

export default new ProductModel()
