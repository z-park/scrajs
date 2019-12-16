const util = require('util')

const log4js = require('log4js')

const crawler = require('./crawler')
const config = require('./config')

// 日志配置
const logger = log4js.getLogger()

log4js.configure(config.log)

!async function() {
  try {
   await crawler()
  }
  catch (err) {
    logger.error(err)
  }
}()

