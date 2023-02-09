var winston = require('winston')
var logConfig = require('../configs/logger.config')

module.exports = winston.createLogger(logConfig);
