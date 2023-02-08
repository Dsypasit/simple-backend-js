const db = require('../databases/mysql.db')

function get(){
	let result = db.query("SELECT * FROM users").then((r) => {
		return r
	});
	return result
}

function getByID(id){
	let result = db.query(`SELECT * FROM users WHERE id=${id}`).then((r) => {
		return r
	});
	return result
}

function create(name, age){
	let result = db.query(`INSERT INTO users (name, age) VALUES ("${name}", ${age})`)
	return result
}

function update(id, name, age){
	let result = db.query(`UPDATE users SET name="${name}", age=${age} WHERE id=${id}`)
	return result
}

function deleteUser(id){
	let result = db.query(`DELETE FROM users WHERE id=${id}`);
	return result
}

module.exports = {
	get,
	getByID,
	create,
	update,
	deleteUser
}
