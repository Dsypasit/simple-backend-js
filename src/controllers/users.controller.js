const uuid = require('uuid')
const userService = require('../services/users.service')
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
	result = await userService.create(req.body.name, req.body.age);
	req.body.id = result.insertId;
	res.status(201).send(req.body);
	return
}

async function getById(req, res) {
	if (!('userId' in req.params)){
		res.status(400)
		return
	}
	result = await userService.getByID(req.params.userId)
	res.status(200).json(result)
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
	result = await userService.update(req.params.userId, req.body.name, req.body.age)
	res.status(200).json({message: 'update success'});
}

async function deleteUser(req, res){
	result = await userService.deleteUser(req.params.userId)
	res.status(200).json({message: `delete success`});
}

module.exports = {
	get,
	create,
	deleteUser,
	update,
	getById
}
