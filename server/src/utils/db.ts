import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

type GetValueType<T> = T extends Promise<infer R> ? R : never

export let db: GetValueType<ReturnType<typeof open>>

export async function openDb() {
  if (!db) {
    db = await open({
      filename: 'database',
      driver: sqlite3.Database
    })
  }
  return db
}
