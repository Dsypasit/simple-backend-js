const uuid = require('uuid')
const userService = require('../services/users.service')
const logger = require('../utils/logger.util')
let users = [
	{
		id : '1',
		name: 'pasit',
		age: 20,
	}
]

async function get(req, res){
	result = await userService.get()
	res.status(200).json(result);
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
	}catch(e){
		res.status(500).send("database can't get data");
		logger.error('database get error', e);
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
		res.status(500).send("database can't get data by id");
		logger.error("database can't get data by id: ", e)
	}
	return
}

async function update(req, res) {
	if (!('userId' in req.params) || isNaN(parseInt(req.parseInt))){
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
		res.status(500).send("database can't update data");
		logger.error("database can't update data :", e)
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
		res.status(500).send("database can't delete by id");
		logger.error("database can't delete by id: ", e);
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
