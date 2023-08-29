import * as jwt from 'jsonwebtoken'
import * as Koa from 'koa'
import dayjs from 'dayjs'
import unless = require('koa-unless')
import ResultUtils from '@/utils/result-utils'

export const secret = 'hahahahahah' + dayjs().format('YYYYMM')

const JWTTokenError = {
  TokenExpiredError: '登录过期,请重新登录！',
  JsonWebTokenError: '权限验证失败，请重新登录！',
  NotBeforeError: 'jwt not active！'
}

export const sign = (data: any): string => {
  const token = jwt.sign(data, secret, { expiresIn: '96h' })
  return token
}

export const verify = (ctx: Koa.Context): Promise<string | any> => {
  const token = ctx.query.token || ctx.header.authorization || ctx.cookies.get('authorization')
  return verifyToken(token)
}

export async function verifyToken(token: any) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error: Error, decoded: any) => {
      if (error) {
        error.message = JWTTokenError[error.name]
        error.name = 'JWTTokenError'
        reject(error)
      } else {
        resolve(decoded)
      }
    })
  })
}

export const middleware: any = async (ctx: Koa.Context, next: () => Promise<void>) => {
  try {
    const data = await verify(ctx)
    ctx.state.curUser = data
    await next()
  } catch (error) {
    ctx.body = ResultUtils.forbidden(error.meaasge)
  }
}

export const appJwt = () => {
  middleware.unless = unless
  return middleware.unless({ method: 'OPTIONS', path: [/^\/static/, /^\/api\/user\/login/] })
}

export default appJwt
