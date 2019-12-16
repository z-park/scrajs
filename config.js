module.exports = {
  // 
  log: {
    appenders: { 
      cheese: { type: 'file', filename: './log/error.log' },
      console: {
        type: 'console',
        layout: { type: 'colored'}
      }
    },
    categories: { 
      default: { appenders: ['cheese', 'console'], level: 'error' } 
    }
  }
}