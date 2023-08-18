import { DBM } from 'soul-orm'
import logger from '../utils/logger'

const orm = new DBM({
  connectionLimit: 10,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'iot',
  isDebug: true
})

orm.setLogger(logger as any)

export default orm
