class ValidationError extends Error{
	constructor(message){
		super(message)
		this.name = "ValidationError";
		this.code = 400;
	}
}

class DatabaseError extends Error{
	constructor(message, err){
		super(message)
		this.name = "DatabaseError";
		this.code = 500;
		this.dbErr = err;
	}
}

module.exports = {
	DatabaseError,
	ValidationError
}
