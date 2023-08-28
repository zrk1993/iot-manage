export default class ResultUtils {
  static success(msgOrData?: string | any, data?: object | string): object {
    if (data !== undefined || typeof msgOrData === 'string') {
      return { code: 0, message: msgOrData || '操作成功！', data: data || null }
    }
    return { code: 0, message: '操作成功！', data: msgOrData || null }
  }

  static badRequest(message: string, data?: any) {
    return { code: 4000, message, data }
  }

  static forbidden(message: string, data?: any) {
    return { code: 4003, message, data }
  }

  static internalServerError(message: string, data?: any) {
    return { code: 5000, message, data }
  }
}
