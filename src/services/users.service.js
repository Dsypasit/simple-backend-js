const db = require('../databases/mysql.db');
const { DatabaseError, ValidationError } = require('../utils/errors.util');

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function get(){
	var result
	try{
		result = db.query("SELECT * FROM users").then((r) => {
			return r
		});
	}
	catch(e) {
		throw new DatabaseError("can't select from database", e)
	}
	return result
}

function getByID(id){
	if (!isNumeric(id)){
		throw new ValidationError("id must be a number")
	}
	var result
	try{
		result = db.query(`SELECT * FROM users WHERE id=${id}`).then((r) => {
			return r
		});
	}
	catch(e){
		throw new DatabaseError("can't select by id from database", e)
	}
	return result
}

function create(name, age){
	if (!isNumeric(age)){
		throw new ValidationError("age must be a number")
	}

	var result
	try{
		result = db.query(`INSERT INTO users (name, age) VALUES ("${name}", ${age})`)
	}
	catch(e){
		throw new DatabaseError("can't create data", e)
	}

	return result
}

function update(id, name, age){
	if (!isNumeric(age) || !isNumeric(id)){
		throw new ValidationError("age or id must be a number")
	}

	var result
	try{
		result = db.query(`UPDATE users SET name="${name}", age=${age} WHERE id=${id}`)
	}
	catch(e){
		throw new DatabaseError("can't update data", e)
	}
	return result
}

function deleteUser(id){
		console.log('test2')
	if (!isNumeric(id)){
		throw new ValidationError("id must be a number")
	}

	var result
	try{
		result = db.query(`DELETE FROM users WHERE id=${id}`);
		console.log('test')
	}
	catch(e){
		throw new DatabaseError("can't delete data", e)
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
