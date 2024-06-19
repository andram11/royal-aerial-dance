const {httpCreateUser}= require('./signUp.controller')
const express= require('express')


const signUpRouter= express.Router()  

signUpRouter.post('/auth/signUp', httpCreateUser)

module.exports= signUpRouter