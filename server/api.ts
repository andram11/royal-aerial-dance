import express, {Request, Response, NextFunction} from 'express'


const api= express.Router()

//Oauth middleware

function checkLoggedIn(req: Request, res: Response, next:NextFunction) {
    const isLoggedIn= true
    if (!isLoggedIn){
        return res.status(401).json({
            error: 'You must first log in!'
        })
    }

    next()
}


//Categories
import categoriesRouter from './routes/categories/categories.router'
api.use(categoriesRouter)

//Courses
import coursesRouter from './routes/courses/courses.router'
api.use(coursesRouter)

//Transactions
import transactionsRouter from './routes/transactions/transactions.router'
api.use(transactionsRouter)

//Payments
import paymentsRouter from './routes/payments/payments.router'
api.use(paymentsRouter)

//Authentication
import authenticationRouter from './routes/authentication/authentication.router'
api.use(authenticationRouter)

//SignUp
import signUpRouter from './routes/signUp/signUp.router'
api.use(signUpRouter)

export default api