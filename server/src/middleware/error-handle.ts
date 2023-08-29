import { Context } from 'koast'
import logger from '@/utils/logger'
import ResultUtils from '@/utils/result-utils'

export default () => {
  return async (ctx: Context, next: () => Promise<void>) => {
    try {
      await next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return (ctx.body = ResultUtils.forbidden('登陆过期，请重新登陆！'))
      }
      ctx.body = ResultUtils.internalServerError(error.message)
      logger.error('server error：', error)
    }
  }
}
