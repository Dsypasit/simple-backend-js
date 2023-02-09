const request = require('supertest')
const app = require('../app')

var mysqlLib = require('../src/databases/mysql.db')
var init = require('../src/databases/init')

beforeAll(async () => {
  await mysqlLib.connect()
  await init()
});
afterAll(done => {
  done()
})

describe("GET /health", () => {
  it("should return status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /users", () =>{
	it("should return all users", async () =>{
		const res = await request(app).get("/users")
			.auth('admin', 1234)
		expect(res.statusCode).toBe(200);
	})
})

describe("POST /users", () =>{
	it("should return new users", async () =>{
		const res = await request(app).post("/users")
			.auth('admin', 1234)
			.send({
				name: 'dsy',
				age: 19
			})
		expect(res.statusCode).toBe(201);
		expect(res.body.name).toBe('dsy');
		expect(res.body.age).toBe(19);
	})
})

describe("PUT /users", () =>{
	it("should return updated users", async () =>{
		const resCreate = await request(app).post("/users")
			.auth('admin', 1234)
			.send({
				name: 'dsy1',
				age: 19
			});


		const res = await request(app).put(`/users/${resCreate.body.id}`)
			.auth('admin', 1234)
			.send({
				name: 'dsyy',
				age: 20
			});
		expect(res.statusCode).toBe(200);
	})
})

describe("DELETE /users", () =>{
	it("should return updated users", async () =>{
		const resCreate = await request(app).post("/users")
			.auth('admin', 1234)
			.send({
				name: 'dsy1',
				age: 19
			});

		const res = await request(app).delete(`/users/${resCreate.body.id}`)
			.auth('admin', 1234)
		expect(res.statusCode).toBe(200);
	})
})
