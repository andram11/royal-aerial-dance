import dontenv from "dotenv"
dontenv.config()
import express from "express";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
const authenticationRouter = express.Router();



//local imports
import {
  httpHandleLogout,
  httpHandleUserLogin,
  httpHandleForgotPassword,
  httpHandlePasswordReset
} from "../../routes/authentication/authentication.controller";

//Google login
authenticationRouter.get(
  "/auth/google",
    passport.authenticate("google")
);

authenticationRouter.get(
  "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "https://localhost:5173",
      failureRedirect: "/v1/login"
    })
);

//Local login
authenticationRouter.post("/auth/login", httpHandleUserLogin);

//Log out authenticated user
authenticationRouter.post("/auth/logout", httpHandleLogout);

//Forgot password
authenticationRouter.post('/auth/forgotPassword/:username', httpHandleForgotPassword)

//Password reset
authenticationRouter.post('/auth/resetPassword/', httpHandlePasswordReset)


export default authenticationRouter;