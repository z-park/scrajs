module.exports = {
  log: {
    replaceConsole: true,
    appenders: {
      info: { type: 'file', filename: './log/info.log' },
      error: { type: 'file', filename: './log/error.log' },
      console: {
        type: 'console',
        layout: { type: 'colored' }
      }
    },
    categories: { 
      default: { appenders: ['console'], level: 'info' },
      info: { appenders: ['info', 'console'], level: 'info' },
      error: { appenders: ['error', 'console'], level: 'error' }
    }
  }
}