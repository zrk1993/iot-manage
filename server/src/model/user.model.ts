import db from '../utils/db'
import BaseModel from './base.model'

export type TUser = {
  username: string
  password: string
}

const tableName = 'user'

export class USerModel extends BaseModel<TUser> {
  constructor() {
    super({ tableName })
  }

  async getUserByName(uname: string): Promise<TUser> {
    return this.$db.table(tableName).where({ uname }).findOrEmpty()
  }
}

export default new USerModel()
