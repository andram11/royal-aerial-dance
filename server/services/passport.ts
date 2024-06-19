import dontenv from "dotenv"
dontenv.config()

import passport from "passport";

const {existsUser, saveUser}= require('../models/user.model')

//Mongo user modl
const userSchema = require("../models/user.mongo");

//Login strategies
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {Strategy as LocalStrategy} from "passport-local";

//Initialize login strategies

passport.use(new GoogleStrategy(
    {
      callbackURL: "/v1/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      passReqToCallback: true,
      scope: ["email"],
    },
    // Verify Google call back details in order to extract user info & tokens
async (req, accessToken, refreshToken, email, done)=> {
  console.log(email)
  //We check if email doesn't exist in the DB already, if not we store it
   const userEmail= email._json.email
   const user= existsUser(userEmail)
   console.log(user)
    user.then((user: Object) => {
      if (!user){
        saveUser(userEmail)
      }
    })
      done(null, email);
    }
  ));
//Google login serialisers
//Save the session to cookie

interface User {
  id?: string
}

passport.serializeUser((user:User, done) => {
  console.log(user)
  done(null, user.id);
});
//Read the session from the cookie
//TO DO add type
passport.deserializeUser((id: string, done) => {
  //Example if deserializing would be done using a DB - User.findById(id).then( user=> done(null, user))
  done(null, id);
});

passport.use(new LocalStrategy(userSchema.authenticate()));


//Local login serialisers
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

export default passport