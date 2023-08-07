import { db } from '../utils/db'

export type TUser = {
  username: string
  password: string
}

export async function getUserByName(username: string): Promise<TUser> {
  return await db.get('SELECT * FROM t_user WHERE username = ?', username)
}
