const uuid = require('uuid')
const express = require('express');
const app = express();

let users = [
	{
		id : '1',
		name: 'pasit',
		age: 20,
	}
]

app.get('/health', function(req, res){
	res.status(200).send("ok");
});


app.use(express.json());
app.use((req, res, next) => {
	const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
	const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
	if (login && password && login == 'admin' && password == '1234'){
		return next()
	}
	res.status(401).send('Unauthorize')
})

app.get('/users', (req, res) => {
	res.status(200).json(users);
	return
});

app.post('/users', (req, res) => {
	if (req.headers['content-type'] != 'application/json'){
		res.status(405).send('not allow');
		return
	}
	req.body.id = uuid.v4();
	users.push(req.body);
	res.status(201).send(req.body)
	return
});

app.get('/users/:userId', (req, res) => {
	if (!('userId' in req.params)){
		res.status(400)
		return
	}
	res.status(200).json(users.filter(({id}) => id == req.params.userId))
})

app.put('/users/:userId', (req, res) => {
	if (!('userId' in req.params)){
		res.status(400)
		return
	}
	if (req.headers['content-type'] != 'application/json'){
		res.status(405).send('not allow');
		return
	}
	let index = users.findIndex(({id}) => id == req.params.userId);
	if (index == -1){
		res.status(200).json({message: "not found"});
		return
	}
	users[index].age = req.body.name;
	users[index].name = req.body.age;
	res.status(200).json(req.body);
})

app.delete('/users/:userId', (req, res)=>{
	let index = users.findIndex(({id}) => id == req.params.userId);
	if (index == -1){
		res.status(200).json({message: "not found"});
		return
	}
	let user = users.pop(index);
	res.status(200).json({message: `delete ${user.name} success`});
})

const port = process.env.PORT || 8080;
app.listen(port, ()=>console.log(`listen on port ${port}`));
