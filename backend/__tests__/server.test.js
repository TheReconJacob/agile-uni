const supertest = require("supertest");
const server = require("../server.js");
let request;

beforeAll(async () => {
  await server.serverStart;
  request = supertest(server);
});

afterAll(() => {
  server.close();
});

describe("When testing the server.js it", () => {
  it("Should connect successfully and be able to return a response", async () => {
    const response = await request
      .get("/")
      .set("Authorization", `bearer ${process.env.AUTHTOKEN}`);

    expect(response.text).toBe("Hello World");
  });
});
