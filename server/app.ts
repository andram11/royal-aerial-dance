//Module Imports
import dontenv from "dotenv"
dontenv.config()

import cors from 'cors'
import express, {Express} from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import session from 'express-session';
//import passport from 'passport'


//Config imports : TO DO
import api from './api'

//Create express server
const app: Express= express()


//adding Helmet module for securing http headers
app.use(helmet())

//TO DO
import passport from './services/passport'


//Handling sessions
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,//24 hours
      sameSite: 'none' 
    }
  }))

  app.set("trust proxy", 1)

//Initializing Passport
app.use(passport.session())
app.use(passport.initialize())


//JSON
app.use(express.json())

//Cors middleware
const allowedOrigins = [
  process.env.CLIENT_URL_1 as string,
  process.env.CLIENT_URL_2 as string
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the origin is in the allowedOrigins array or if there is no origin (for same-origin requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

//Logging
app.use(morgan('combined'))

//Import v1 api configuration
app.use('/v1', api)

export default app