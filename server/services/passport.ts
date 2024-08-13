import dontenv from "dotenv";
dontenv.config();

import passport from "passport";
import { Request } from "express";

import { existsUser, saveUser } from "../models/users/user.model";

//Mongo user modl
import userSchema from "../models/users/user.mongo";

//Login strategies
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";


//Initialize login strategies
interface GoogleProfile extends Profile {
  _json: {
    email: string;
    iss: string;
    aud: string;
    sub: string;
    iat: number;
    exp: number;
  };
}

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/v1/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      passReqToCallback: true,
      scope: ["email", "profile"],
    },
    // Verify Google call back details in order to extract user info & tokens
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      const googleProfile = profile as GoogleProfile;

      //We check if email doesn't exist in the DB already, if not we store it
      const userEmail: string = googleProfile._json.email;
      try {
        const user = await existsUser(userEmail);
        if (!user) {
          await saveUser(userEmail, "thirParty");
        } 
      } catch (err) {
        return err;
      }
      done(null, { id: googleProfile._json.sub, email: googleProfile._json.email });
    }
  )
);


//Google login serialisers
//Save the session to cookie

export interface SerializeUser {
  id?: string;
}

passport.serializeUser((user: SerializeUser, done) => {
  done(null, user.id);
});
//Read the session from the cookie
passport.deserializeUser((id: string, done) => {
  //Example if deserializing would be done using a DB - User.findById(id).then( user=> done(null, user))
  done(null, id);
});

passport.use(new LocalStrategy(userSchema.authenticate()));

export default passport;
