const express= require('express')
const paymentsRouter= express.Router()


const {httpExecutePaymentRequest, httpHandleStripeWebhook}= require('../payments/payments.controller')

//Create payment intent
paymentsRouter.post('/payments', httpExecutePaymentRequest)

//endpoint for Stripe webhooks
paymentsRouter.post('/stripe/webhook', express.raw({type: 'application/json'}), httpHandleStripeWebhook)

module.exports= paymentsRouter