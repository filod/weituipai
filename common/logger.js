var log4js = require('log4js');
var config = require('../config');
log4js.configure({
  appenders: [{
    type: 'console'
  },
  {
    type: 'file',
    filename: config.LOG_FILE,
    category: 'filelog'
  }]
});

var logger =exports.logger =  log4js.getLogger();
logger.setLevel(config.LOG_LEVEL);

module.exports = logger;