require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Authentication Router", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  //TEST OBJECTS login
  const loginData = {
    username: process.env.SIGNUP_TEST_USERNAME,
    password: process.env.SIGNUP_TEST_PASSWORD,
  };
  const wrongLoginData = {
    username: process.env.SIGNUP_TEST_USERNAME,
    password: "123",
  };

  const inexistingUsername = {
    username: "inexisting123@email.com",
    password: "123",
  };

  //Forgot password test objects
  const usernameExists = process.env.SIGNUP_TEST_USERNAME;
  const usernameDoesNotExist = "idontexist@email.com";

  describe("Test Google Authentication connexion", () => {
    test("It should redirect (to user authentication page)", async () => {
      const response = await request(app).get("/v1/auth/google").expect(302);
    });

    test("It should redirect (to home page or redirect link)", async () => {
      const response = await request(app)
        .get("/v1/auth/google/callback")
        .expect(302);
    });
  });

  describe("Test successful local login", () => {
    test("It should return successful login", async () => {
      const response = await request(app)
        .post("/v1/auth/login")
        .send(loginData)
        .expect(200);

      expect(response.body).toMatchObject({
        message: /Login successful./,
      });
    });

    test("It should return error message", async () => {
      const response = await request(app)
        .post("/v1/auth/login")
        .send(wrongLoginData)
        .expect(200);

      expect(response.body).toMatchObject({
        message: /Username or password incorrect./,
      });
    });

    test("It should return error message", async () => {
      const response = await request(app)
        .post("/v1/auth/login")
        .send(inexistingUsername)
        .expect(200);

      expect(response.body).toMatchObject({
        message: /Username or password incorrect./,
      });
    });
  });

  describe("Test logout", () => {
    test("It should redirect", async () => {
      const response = await request(app).get("/v1/auth/logout").expect(302);
    });
  });

  describe("Test forgot password: existing username", () => {
    test("It should return reset password link", async () => {
      const response = await request(app)
        .post(`/v1/auth/forgotPassword/${usernameExists}`)
        .expect(200);

      expect(response.body).toMatchObject({
        message: /Forgot password link sent to the provided email./,
        testPreviewLink: /message/,
      });
    });

    test("It should return error message", async () => {
      const response = await request(app)
        .post(`/v1/auth/forgotPassword/${usernameDoesNotExist}`)
        .expect(200);

      expect(response.body).toMatchObject({
        error: /Username email does not exist./,
      });
    });
  });
});
