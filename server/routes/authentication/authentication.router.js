require("dotenv").config();
const express = require("express");
const passport = require("passport");

const authenticationRouter = express.Router();



//local imports
const {
  httpHandleLogout,
  httpHandleGoogleLogin,
  httpHandleUserLogin,
  httpHandleGoogleCallback,
  httpHandleForgotPassword,
  httpHandlePasswordReset
} = require("../../routes/authentication/authentication.controller");

//Google login
authenticationRouter.get(
  "/auth/google",
  httpHandleGoogleLogin,
  passport.authenticate("google")
);
authenticationRouter.get(
  "/auth/google/callback",
  httpHandleGoogleCallback,
  passport.authenticate("google"),
  
);

//Local login
authenticationRouter.post("/auth/login", httpHandleUserLogin);

//Log out authenticated user
authenticationRouter.post("/auth/logout", httpHandleLogout);

//Forgot password
authenticationRouter.post('/auth/forgotPassword/:username', httpHandleForgotPassword)

//Password reset
authenticationRouter.post('/auth/resetPassword/', httpHandlePasswordReset)


module.exports = authenticationRouter;