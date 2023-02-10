const db = require('../databases/mysql.db');
const { DatabaseError, ValidationError } = require('../utils/errors.util');

function get(){
	try{
		let result = db.query("SELECT * FROM users").then((r) => {
			return r
		});
	}
	catch(e) {
		throw DatabaseError("can't select from database", e)
	}
	return result
}

function getByID(id){
	if (isNaN(parseInt(id))){
		throw ValidationError("id must be a number")
	}
	try{
		let result = db.query(`SELECT * FROM users WHERE id=${id}`).then((r) => {
			return r
		});
	}
	catch(e){
		throw DatabaseError("can't select by id from database", e)
	}
	return result
}

function create(name, age){
	if (isNaN(parseInt(age))){
		throw ValidationError("age must be a number")
	}

	try{
		let result = db.query(`INSERT INTO users (name, age) VALUES ("${name}", ${age})`)
	}
	catch(e){
		throw DatabaseError("can't create data", e)
	}

	return result
}

function update(id, name, age){
	if (isNaN(parseInt(id)) || isNaN(parseInt(age))){
		throw ValidationError("age or id must be a number")
	}

	try{
		let result = db.query(`UPDATE users SET name="${name}", age=${age} WHERE id=${id}`)
	}
	catch(e){
		throw DatabaseError("can't update data", e)
	}
	return result
}

function deleteUser(id){
	if (isNaN(parseInt(id)) ){
		throw ValidationError("age or id must be a number")
	}

	try{
		let result = db.query(`DELETE FROM users WHERE id=${id}`);
	}
	catch(e){
		throw DatabaseError("can't delete data", e)
	}

	return result
}

module.exports = {
	get,
	getByID,
	create,
	update,
	deleteUser
}
