import * as jwt from 'jsonwebtoken'

type TData = {
  username: string
}

const secret = '123aabbccoo'

export function generateToken(data: string) {
  return jwt.sign(
    {
      data
    },
    secret,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string) {
  const decode: any = jwt.verify(token, secret)
  return decode.data
}
