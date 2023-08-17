import * as log4js from 'log4js'
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'dateFile',
      filename: 'log/app.log',
      maxLogSize: 1 * 1024 * 1024, // = 1Mb
      numBackups: 5,
      pattern: '.MM'
    }
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'error' }
  }
})

const logger = log4js.getLogger()

logger.level = 'info'

export default logger
