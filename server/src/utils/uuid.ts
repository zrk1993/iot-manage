import crypto from 'crypto'
import dayjs from 'dayjs'

export default function () {
  const inputString = 'ABC' + Math.random()
  const md5Hash = crypto.createHash('md5')
  md5Hash.update(inputString)
  const fullMd5 = md5Hash.digest('hex')
  return 'D' + dayjs().format('YYMM') + fullMd5.slice(0, 11).toUpperCase()
}
