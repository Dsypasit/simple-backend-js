const uuid = require('uuid')
const express = require('express');
const app = express();
const checkAuth = require('./src/middlewares/users.middleware')
const userRouter = require('./src/routes/users.routes')
const cors = require('cors')

var mysqlLib = require('./src/databases/mysql.db')
var init = require('./src/databases/init')


mysqlLib.connect().then(()=>init().then(()=>{

	app.get('/health', function(req, res){
		res.status(200).send("ok");
	});

	app.use(express.json());
	app.use(cors());

	app.use(checkAuth);
	app.use('/users', userRouter);


	const port = process.env.PORT || 8080;
	app.listen(port, ()=>console.log(`listen on port ${port}`));
})).catch(e=>{
	console.error("Error connecting to mysql:", e);
	process.exit();
})
