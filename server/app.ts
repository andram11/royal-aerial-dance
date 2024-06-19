//Module Imports
import dontenv from "dotenv"
dontenv.config()

import cors from 'cors'
import express, {Express, Request, Response, NextFunction} from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
//import passport from 'passport'


//Config imports : TO DO
import api from './api'
import cookieSession from './services/session'

//Create express server
const app: Express= express()


//adding Helmet module for securing http headers
app.use(helmet())

//TO DO
import passport from './services/passport'


//Handling sessions
app.use(cookieSession)
//Handle existing bug with Passport Js
import {Cb} from './types';
app.use((req: Request, res:Response, next: NextFunction)=> {
    if (req.session && !req.session.regenerate){
        req.session.regenerate = (cb:Cb)=> {
            cb('')
        }
    }
    if (req.session && !req.session.save){
        req.session.save = (cb:Cb)=> {
            cb('')
        }
    }
    next()
})

//Initializing Passport
app.use(passport.session())
app.use(passport.initialize())


//JSON
app.use(express.json())

//Cors middleware
app.use(cors({
    origin: process.env.CLIENT_URL_1 as string,
    credentials: true,
}))

//Logging
app.use(morgan('combined'))

//Import v1 api configuration
app.use('/v1', api)

export default app