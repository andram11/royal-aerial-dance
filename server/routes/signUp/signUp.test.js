require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Sign up Router", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test POST /auth/signUp", () => {
    const fullSignUpData = {
      username: process.env.SIGNUP_TEST_USERNAME,
      password: process.env.SIGNUP_TEST_PASSWORD,
    };

    const missingSignUpData = {
      username: process.env.SIGNUP_TEST_USERNAME,
    };

    const existingSignUpData = {
      username: process.env.SIGNUP_TEST_USERNAME_EXISTS,
      password: process.env.SIGNUP_TEST_PASSWORD,
    };

    test("It should respond with registration successful and user id", async () => {
      const response = await request(app)
        .post("/v1/auth/signUp")
        .send(fullSignUpData)
        .expect(200);

      expect(response.body).toMatchObject({
        message: /Registration successful. User created with id:/,
      });
    });

    test("It should catch missing properties", async () => {
      const response = await request(app)
        .post("/v1/auth/signUp")
        .send(missingSignUpData)
        .expect(200);

      expect(response.body).toStrictEqual({
        error: "Missing required properties.",
      });
    });

    test("It should catch existing username", async () => {
      const response = await request(app)
        .post("/v1/auth/signUp")
        .send(existingSignUpData)
        .expect(200);

      expect(response.body).toStrictEqual({
        error: "Username already exists.",
      });
    });
  });
});
