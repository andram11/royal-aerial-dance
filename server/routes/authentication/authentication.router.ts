import dontenv from "dotenv"
dontenv.config()
import express from "express";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
const authenticationRouter = express.Router();

interface User {
  id: string;
  email: string;
}

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
  (req, res, next) => {
    const redirect = (req.query.redirect as string)|| '/';
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      state: encodeURIComponent(redirect),
    })(req, res, next);
  }
);

authenticationRouter.get(
  "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/v1/login"
    }),
    (req, res) => {
      // Send the user data back to the frontend
      //Including redirect link
      const redirect = req.query.state ? decodeURIComponent(req.query.state as string) : '/';
      const user = {
        id: (req.user as User).id,
        username: (req.user as User).email,
      };
      res.redirect(`https://localhost:5173/auth/callback?user=${encodeURIComponent(JSON.stringify(user))}&redirect=${encodeURIComponent(redirect)}`);
    }
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