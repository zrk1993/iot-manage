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
}

export default new TSLModel()
