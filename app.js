const express = require('express');
const app = express();
const checkAuth = require('./src/middlewares/users.middleware')
const morganMiddleware = require('./src/middlewares/morgan.middleware')
const userRouter = require('./src/routes/users.routes')
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(morganMiddleware)

app.get('/health', function(req, res){
	res.status(200).send("ok");
});


app.use(checkAuth);
app.use('/users', userRouter);

module.exports = app

