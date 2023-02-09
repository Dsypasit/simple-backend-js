const logger = require('../utils/logger.util')
const morgan = require('morgan')

const stream = {
	write:(message) => logger.http(message)
};

module.exports = morgan(
	":remote-addr :method :url :status :res[content-length] - :response-time ms",
	{
		stream
	}
);
