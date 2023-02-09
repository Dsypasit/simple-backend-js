var mysql = require('mysql2')
var mysqlConfig = require('../configs/db.config')
var logger = require('../utils/logger.util')

var pool = mysql.createPool(mysqlConfig)

module.exports.connect = function(cb){
	return new Promise((resolve, reject) => {
		pool.on('connection',function(connection){
			connection.on('error', function(err){
				logger.error('error mysql when connection pool ', err)
			});
			connection.on('close', function(err){
				logger.warn('mysql connection close', err)
			});
		});
		resolve()
	})
}

module.exports.query = function(query){
	return new Promise((resolve, reject) => {
		try{
			pool.query(query, (e, r, f) => {
				if(e){
					reject(e);
				}
				else{
					resolve(r)
				}
			});
		}
		catch(ex){
			reject(ex)
		}
	})
}
