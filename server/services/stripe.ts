import dontenv from "dotenv"
dontenv.config()

import {Request} from 'express'
import Stripe from 'stripe'
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY as string)


const { 
    updateTransactionStatus}= require('../models/transactions.model')

interface PaymentDetails {
    body: {
        amount: number,
        currency: string,

    }
}

export const stripePaymentIntent= async function(paymentDetails: PaymentDetails){
    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: paymentDetails.body.amount*100,
            currency: paymentDetails.body.currency,
            payment_method_types: ['card']
        })
        return {
            body: {paymentIntent}
        }
    } catch(error){
        return {
            body: JSON.stringify({error})
        }
    }

}




//Stripe webhook for receiving notifications when payment succeded/failed
//TO DO rework only with a publicly accessible URL
// async function createWebhookEndpoint(){
//     const webhookEndpoint = await stripe.webhookEndpoints.create({
//         enabled_events: [ 'payment_intent.payment_failed',
//         'payment_intent.succeeded',],
//         url: 'https://'+process.env.CLIENT_URL+ '/stripe/webhook',
//       });
     
// }


//Handling webhook callbacks
export const handleStripeCallback= async function (req: Request){
     //TO DO add for production environment
        //   const sig = req.headers['stripe-signature'];
        let event=req.body;
        try {
           //TO DO add for production environment
          //event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SECRET_ENDPOINT);
        } catch (err) {
          return (`Webhook Error: ${err.message}`);
        }
      
        // Handle the event
        if (event.type==='payment_intent.succeeded' || 'payment_intent.failed') {
          
            //For production environment
            //const paymentIntentSucceeded = event.data.object;
      
            // function to handle the event
            //Update transaction details
           await updateTransactionStatus({
              paymentId: event.id,
              status: event.status})
          
        } else {
          //TO DO log this somewhere
          console.log(`Unhandled event type ${event.type}`);
        }
}
