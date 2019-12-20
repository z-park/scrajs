const util = require('util')

const crawler = require('./crawler')
const logger  = require('./logger')

!async function() {
  try {
   await crawler()
  }
  catch (err) {
    logger.error(err)
  }
}()

