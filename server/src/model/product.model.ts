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
}

export default new ProductModel()
