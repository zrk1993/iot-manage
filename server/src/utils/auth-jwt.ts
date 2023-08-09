import * as jwt from 'jsonwebtoken'

type TData = {
  username: string
}

export function generateToken(data: string) {
  return jwt.sign(
    {
      data
    },
    'secret2',
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string) {
  const decode: any = jwt.verify(token, 'secret2')
  return decode.data
}
