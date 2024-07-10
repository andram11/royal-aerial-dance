import  express from 'express'
const paymentsRouter= express.Router()


import {httpExecutePaymentRequest, httpHandleStripeWebhookResponse} from '../payments/payments.controller'

//Create payment intent
paymentsRouter.post('/payments', httpExecutePaymentRequest)



//Endpoint for Stripe webhooks (simulation purposes)
paymentsRouter.post('/stripe/webhook', express.raw({type: 'application/json'}), httpHandleStripeWebhookResponse)

export default paymentsRouter