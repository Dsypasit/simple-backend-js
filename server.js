const app = require('./app')
var logger = require('./src/utils/logger.util')
var mysqlLib = require('./src/databases/mysql.db')
var init = require('./src/databases/init')

mysqlLib.connect().then(()=>init().then(()=>{

	const port = process.env.PORT || 8080;
	app.listen(port, ()=>console.log(`listen on port ${port}`));
})).catch(e=>{
	console.error("Error connecting to mysql:", e);
	process.exit();
})
