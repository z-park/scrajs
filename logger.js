const log4js = require('log4js')

const logger = log4js.getLogger()
const config = require('./config')

log4js.configure(config.log)

module.exports = logger