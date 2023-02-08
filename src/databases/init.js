var db = require('./mysql.db')
module.exports = function(){
	return new Promise((resolve, reject) => {
		db.query(`CREATE TABLE IF NOT EXISTS users(
		id integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
		name varchar(50),
		age int
	);`).then((r) => {
		db.query(`INSERT INTO users (name, age) VALUES ("dsy",19)`).then(r=> resolve(r))
	})
	})
}
