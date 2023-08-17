import { db } from '../utils/db'

type TDevice = {
  id: string
  name: string
  product_type: string
  mac_address: string
  status: number
  create_time: string
  connect_time: string
  disconnect_time: string
  remote_address: string
  bemfa_iot: boolean
  bemfa_topic: string
}

export async function page(params: { page: number; size: number }): Promise<TDevice[]> {
  const count = params.size || 10
  const offset = (params.page - 1) * params.size || 0
  return await db.all(`SELECT * FROM t_device LIMIT ? OFFSET ?`, [count, offset])
}

export async function getById(id: string): Promise<TDevice> {
  return await db.get(`SELECT * FROM t_device WHERE id = ?`, [id])
}

export async function getByBemfaTopic(topic: string): Promise<TDevice> {
  return await db.get(`SELECT * FROM t_device WHERE bemfa_topic = ? LIMIT 1`, [topic])
}

export async function updateMacAddress(id: string, mac_address: string) {
  return await db.run('UPDATE t_device SET mac_address = ? WHERE id = ?', [mac_address, id])
}

export async function updateStatus(id: string, status: number) {
  return await db.run('UPDATE t_device SET status = ? WHERE id = ?', [status, id])
}

export async function update(id: string, data: Partial<TDevice>) {
  const setStr = Object.keys(data)
    .map(k => `${k}='${data[k]}'`)
    .join(',')
  return await db.run(`UPDATE t_device SET ${setStr} WHERE id = ?`, [id])
}
