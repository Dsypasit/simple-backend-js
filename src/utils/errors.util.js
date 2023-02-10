class ValidationError extends Error{
	constructor(message){
		this.message = message;
		this.name = "ValidationError";
		this.code = 400;
	}
}

class DatabaseError extends Error{
	constructor(message, err){
		this.message = message;
		this.name = "DatabaseError";
		this.code = 500;
		this.dbErr = err;
	}
}

module.exports = {
	DatabaseError,
	ValidationError
}
