const {handlePaymentRequest} = require('../../models/payment.model')
const {handleStripeCallback}= require('../../services/stripe')

async function httpExecutePaymentRequest(req, res){
 const paymentRequestHandler= await handlePaymentRequest(req)
   res.json(paymentRequestHandler)
 }

async function httpHandleStripeWebhook(req, res){
  const stripeWebhookHandler= await handleStripeCallback(req,res)
  res.json(stripeWebhookHandler)
}
 module.exports= {
  httpExecutePaymentRequest,
  httpHandleStripeWebhook
 }