const uuid = require('uuid')
const userService = require('../services/users.service')
const { DatabaseError, ValidationError } = require('../utils/errors.util')
const logger = require('../utils/logger.util')
let users = [
	{
		id : '1',
		name: 'pasit',
		age: 20,
	}
]

function errorHandling(res, err){
	if (err instanceof DatabaseError){
			res.status(err.code).send(e.message);
			logger.error(e.message, e.dbErr);
		}else if (err instanceof ValidationError){
			res.status(err.code).send(e.message);
			logger.warn(e.message);
		} 
		else{
			res.status(500);
		}
}

async function get(req, res){
	try{
		result = await userService.get();
		res.status(200).json(result);
	}
	catch(e){
		errorHandling(res, e)
	}
	return
}

async  function create(req, res)  {
	if (req.headers['content-type'] != 'application/json'){
		res.status(405).send('not allow');
		return
	}

	try{
		result = await userService.create(req.body.name, req.body.age);
		req.body.id = result.insertId;
		res.status(201).send(req.body);
	} 
	catch(e){
		errorHandling(res, e)
	}
	return
}

async function getById(req, res) {
	if (!('userId' in req.params)){
		res.status(400)
		return
	}

	try{
		result = await userService.getByID(req.params.userId);
		res.status(200).json(result);
	}
	catch(e){
		errorHandling(res, e)
	}
	return
}

async function update(req, res) {
	if (!('userId' in req.params)){
		res.status(400)
		return
	}

	if (req.headers['content-type'] != 'application/json'){
		res.status(405).send('not allow');
		return
	}

	try{
		result = await userService.update(req.params.userId, req.body.name, req.body.age)
		res.status(200).json({message: 'update success'});
	}
	catch(e){
		errorHandling(res, e)
	}
	return
}

async function deleteUser(req, res){
	if (!('userId' in req.params) || isNaN(parseInt(req.parseInt))){
		res.status(400);
		return
	}

	try{
		result = await userService.deleteUser(req.params.userId);
		res.status(200).json({message: `delete success`});
	}
	catch(e){
		errorHandling(res, e)
	}
	return
}

module.exports = {
	get,
	create,
	deleteUser,
	update,
	getById
}
