import { db } from '../utils/db'

type TDevice = {
  name: string
  key: string
  topic: string
  bemfa: boolean
  online: boolean
}

export async function page(params: { page: number; size: number }) {
  const count = params.size || 10
  const offset = (params.page - 1) * params.size || 0
  return await db.all(`SELECT * FROM t_device LIMIT ? OFFSET ?`, [count, offset])
}
