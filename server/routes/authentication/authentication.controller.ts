//The controller takes in actions from the router and updates/makes changes to the model
import dontenv from "dotenv"
dontenv.config()
import passport from "passport";

import {forgotPassword, resetPassword} from '../../models/authentication/authentication.model'
import { Request, Response, NextFunction } from "express";
import { PassportUser } from "../../types";

//Logout user
export function httpHandleLogout(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      if (req.session) {
        req.session.destroy((err:unknown) => {
          if (err) {
            return next(err);
          }
          res.clearCookie('connect.sid', { path: '/' }); // Ensure the cookie is cleared
          return res.status(200).json({ message: "Logout successful." });
        });
      }

    });
  } else {
    res.status(400).json({ message: "There was an error." });
  }
}

//User login using local login (email & password) handlers
export function httpHandleUserLogin(req: Request, res:Response) {
  passport.authenticate("local", function (err: Error|null, user:PassportUser|false) {
    if (err) {
      res.json({ message: err });
    } else {
      console.log(user)
      if (!user) {
        res.status(400).json({message: "Username or password incorrect." });
      } else {
        req.logIn(user, function(err) {
    
          res.json({ message: "Login successful.", data: {"username": user.username, "userId": user._id} })
        }); 
      }
    }
  })(req, res);
}


//Handle forgot password flow
export async function httpHandleForgotPassword(req: Request, res:Response) {
  const response = await forgotPassword(req.params.username as string);
  if (!response.error) {
    res.status(200).json({
     response
    });
  } else {
    res.status(400).json({
      error: response,
    });
  }
}

//Handle password reset flow
export async function httpHandlePasswordReset(req: Request, res: Response) {
 const response = await resetPassword(req.query) 
 if (!response.errors) {
  res.status(200).json({
   response
  });
} else {
  res.status(400).json({
    error: response,
  });
}
}

//Handle access to endpoints
export function httpCheckLoggedIn(req: Request, res: Response, next: NextFunction) {
  const isLoggedIn = req.isAuthenticated() && req.user && req.session;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must first log in!",
    });
  }

  next();
}

