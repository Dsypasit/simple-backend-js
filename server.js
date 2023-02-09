const app = require('./app')
var logger = require('./src/utils/logger.util')
var mysqlLib = require('./src/databases/mysql.db')
var init = require('./src/databases/init')

var server;
let connections = [];

mysqlLib.connect().then(()=>init().then(()=>{

	const port = process.env.PORT || 8080;
	server = app.listen(port, ()=>console.log(`listen on port ${port}`));

	server.on('connection', connection => {
		connections.push(connection);
		connection.on('close', () => connections = connections.filter(curr => curr !== connection));
	});

})).catch(e=>{
	console.error("Error connecting to mysql:", e);
	process.exit();
})


process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown(){
	server.close(()=>{
		console.log('Closed out remaining connection');
		process.exit(1);
	})

	setTimeout(() => {
		console.error('Could not close connections in time, forcefully shutting down');
		process.exit(1);
	}, 10000);

	connections.forEach(curr => curr.end());
	setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}
