import {httpCreateUser} from './signUp.controller'
import express from 'express'


const signUpRouter= express.Router()  

signUpRouter.post('/auth/signUp', httpCreateUser)

export default signUpRouter