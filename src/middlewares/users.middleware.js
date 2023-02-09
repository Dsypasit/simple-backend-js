const logger = require('../utils/logger.util')

module.exports = (req, res, next) => {
	const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
	const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
	if (login && password && login == 'admin' && password == '1234'){
		return next()
	}
	logger.info('someone try to access my system')
	res.status(401).send('Unauthorize')
}
