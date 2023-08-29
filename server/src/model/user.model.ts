import db from '../utils/db'
import BaseModel from './base.model'

export type TUser = {
  id: string
  username: string
  password: string
}

const tableName = 'user'

export class USerModel extends BaseModel<TUser> {
  constructor() {
    super({ tableName })
  }

  async getUserByName(username: string): Promise<TUser> {
    return this.$db.table(tableName).where({ username }).findOrEmpty()
  }
}

export default new USerModel()
