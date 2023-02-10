const winston = require('winston')
const { combine, json, timestamp, printf } = winston.format
const fs = require('fs');
const path = require('path');

const logDir = 'log'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const allLog = path.join(logDir, 'results.log');
const errorLog = path.join(logDir, 'error.log');

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
	http: 4,
  debug: 5,
  trace: 6,
};

module.exports = {
	levels: logLevels,
  level: 'debug',
  format: combine(
		timestamp(), 
		printf((info) => `[${ info.timestamp }] ${info.level}: ${info.message}`)
	),
  transports: [
		new winston.transports.Console(), 
		new winston.transports.File({
			filename: allLog
		}),
		new winston.transports.File({
			level: 'error',
			filename: errorLog
		})
	],
}
