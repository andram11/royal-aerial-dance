import dontenv from "dotenv"
dontenv.config()

import { Request, Response } from "express";
import Stripe from 'stripe'
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY as string)
import { PaymentDetails} from "../types"
import { existsTransactionForPaymentId, updateTransactionStatus } from "../models/transactions/transactions.model"
import { updateCourseStock, findCourseById } from "../models/courses/courses.model";
import sendEmail from '../services/email/email'
import { EmailResponse } from "../types";

export async function handleStripePaymentIntent(paymentDetails: PaymentDetails){
    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: paymentDetails.amount*100,
            currency: paymentDetails.currency,
            payment_method_types: ['card']
        })
        return {
            body: {paymentIntent}
        }
    } catch(error){
        return {
            error: JSON.stringify({error})
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



export async function handleStripeCallback(req: Request, res:Response){
     //TO DO add for production environment
        //   const sig = req.headers['stripe-signature'];
        let event=req.body;
        try {
           //TO DO add for production environment
          //event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SECRET_ENDPOINT);

             // Handle the event
        if (event.type==='payment_intent.succeeded' || 'payment_intent.failed') {
            //For production environment
            //const paymentIntentSucceeded = event.data.object;
      
            // Functions to handle the event
            //Update transaction details
            const transaction= await existsTransactionForPaymentId(event.id)
    
            if (transaction) {
         
                await updateTransactionStatus({
                    courseDetails: transaction.courseDetails,
                    status: event.status,
                    paymentId: event.id,
                    participantDetails: transaction.participantDetails,
                    paymentMethod: transaction.paymentMethod
                    })
               
                      //Update stock for courseIds and send confirmation email for each course 
                      let emailPreviewsList: EmailResponse[] = []
                    if (event.type==='payment_intent.succeeded'){
                        
                        for (const course of transaction.courseDetails) {
                        
                           await updateCourseStock(course.courseId, course.quantity);
                           // Get course details   
                           const courseDetails= await findCourseById(course.courseId)
        
                           let emailSubject= `Your registration for ${courseDetails.title}`
                           //Send confirmation email to participant 
                     
                           const emailResponse = await sendEmail(
                               transaction.participantDetails.email,
                               emailSubject,
                               { participantFirstName: transaction.participantDetails.firstName, 
                                courseName: courseDetails.title,
                                location: courseDetails.location,
                                startDate: courseDetails.startDate.toDateString(),
                                timeslot: courseDetails.timeslot },
                               "./templates/paymentConfirmation.handlebars"
                           );
                              emailPreviewsList.push(emailResponse)
                            }
                    }
             
                return ({
                    emailPreviewsList
                    //message: 'Transaction and stock updated accordingly.'
                })

            } 

          
        } else {
          //TO DO log this somewhere
          return ( {
            error: `Unhandled event type ${event.type}`
          });
        }

        } catch (err) {
          return ({error: `Webhook Error: ${err.message}`});
        }


       
}
