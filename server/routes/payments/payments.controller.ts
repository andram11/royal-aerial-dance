import { handleStripePaymentIntent, handleStripeCallback } from "../../services/stripe";
import { Request, Response } from "express";
import { createTransaction } from "../../models/transactions/transactions.model";

export async function httpExecutePaymentRequest(req: Request, res: Response) {
  //Create payment intent with Stripe
  const paymentRequestHandler = await handleStripePaymentIntent(req.body.paymentDetails);
  //Create transaction body and add transaction to DB
  if (!paymentRequestHandler.error) {
      
      const transactionRequestBody = {
        courseDetails: req.body.courseDetails,
        status: req.body.paymentDetails.status,
        paymentId: paymentRequestHandler.body?.paymentIntent.id,
        participantDetails: req.body.participantDetails,
        paymentMethod: req.body.paymentDetails.paymentMethod,
      };
      const transaction = await createTransaction(transactionRequestBody);

      if (!transaction.errors) {
        res.status(201).json(transaction);
      } else {
        res.status(400).json({
          error: transaction.message,
        });
      }
    } 
  else {
    res.status(400).json({
      error: paymentRequestHandler.error,
    });
  }
}

export async function httpHandleStripeWebhookResponse(req: Request, res: Response){
  const response= await handleStripeCallback(req,res)
  console.log(response)
  if (!response?.error) {
    res.status(201).json(response);
  } else {
    res.status(400).json({
      error: response.error,
    });
  }
}

