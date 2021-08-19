const request = require("supertest")("https://airportgap.dev-tester.com/api");
const request_barru = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("POST /login", function () {
  it("Success Login with valid email and password", async function () {
    const response = await request_barru
      .post("/login")
      .send({ email: "cobapopo@gmail.com", password: "cobabin" });

    const attributes = response.body;

    expect(response.status).to.eql(200);
    expect(response.body.status).to.eql('SUCCESS_LOGIN');
    expect(response.body.message).to.eql('Anda Berhasil Login');
    expect(attributes).to.include.keys("data", "message", "status"); 
  });
});

describe("POST /login", function () {
  it("Failed Login with valid email and invalid password", async function () {
    const response = await request_barru
      .post("/login")
      .send({ email: "cobapopo@gmail.com", password: "bukanjodohku" });

    const attributes = response.body;

    expect(response.status).to.eql(200);
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.message).to.eql('Email atau Password Anda Salah');
    expect(attributes).to.include.keys("data", "message", "status");
  });
});

describe("POST /login", function () {
  it("Failed Login with empty field in email", async function () {
    const response = await request_barru
      .post("/login")
      .send({ email: "", password: "cobabin" });

    const attributes = response.body;

    expect(response.status).to.eql(200);
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.message).to.eql('Cek kembali email anda');
    expect(attributes).to.include.keys("data", "message", "status");
  });
});

describe("POST /login", function () {
  it("Failed Login with invalid email format", async function () {
    const response = await request_barru
      .post("/login")
      .send({ email: "cobapopo", password: "cobabin" });

    const attributes = response.body;

    expect(response.status).to.eql(200);
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.message).to.eql('Cek kembali email anda');
    expect(attributes).to.include.keys("data", "message", "status");
  });
});
