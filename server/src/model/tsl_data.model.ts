import db from '@/utils/db'
import BaseModel from '@/model/base.model'

export type TTSL_DATA = {
  tsl_data_id: number
  tsl_id: number
  device_id: number
  create_time: Date
  value: string
  input_data: string
  output_data: string
}

const tableName = 'tsl_data'

export class TSL_DdataModel extends BaseModel<TTSL_DATA> {
  constructor() {
    super({ tableName, primaryKey: 'tsl_data_id' })
  }
}

export default new TSL_DdataModel()
