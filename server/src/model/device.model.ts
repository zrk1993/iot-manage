import { db } from '../utils/db'

type TDevice = {
  id: string
  name: string
  key: string
  product_type: string
  mac: string
  online: boolean
  create_time: string
  connect_time: string
  disconnect_time: string
  bemfa_iot: boolean
  bemfa_topic: string
}

export async function page(params: { page: number; size: number }): Promise<TDevice[]> {
  const count = params.size || 10
  const offset = (params.page - 1) * params.size || 0
  return await db.all(`SELECT * FROM t_device LIMIT ? OFFSET ?`, [count, offset])
}

export async function getByKey(key: string): Promise<TDevice> {
  return await db.get(`SELECT * FROM t_device WHERE key = ? LIMIT 1`, [key])
}

export async function getByBemfaTopic(topic: string): Promise<TDevice> {
  return await db.get(`SELECT * FROM t_device WHERE bemfa_topic = ? LIMIT 1`, [topic])
}
