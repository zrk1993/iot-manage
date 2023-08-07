import * as jwt from 'jsonwebtoken'

type TData = {
  username: string
}

export function generateToken(data: string) {
  return jwt.sign(
    {
      data
    },
    'secret',
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): string {
  try {
    const decoded = jwt.verify(token, 'secret')
    return decoded as string
  } catch (err) {
    console.error(err)
  }
}
