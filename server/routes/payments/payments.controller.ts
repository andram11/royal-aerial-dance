import { handleStripePaymentIntent, handleStripeCallback } from "../../services/stripe";
import { Request, Response } from "express";
import { createParticipant } from "../../models/participants/participants.model";
import { createTransaction } from "../../models/transactions/transactions.model";

export async function httpExecutePaymentRequest(req: Request, res: Response) {
  //retrieve details about payments, courses, participant
  const { paymentDetails, courseDetails, participantDetails } = req.body;

  //Create payment intent with Stripe
  const paymentRequestHandler = await handleStripePaymentIntent(paymentDetails);
  //We register the participant details in the DB
  if (!paymentRequestHandler.error) {
      //Register the participant in DB
    const participantRegistration = await createParticipant(participantDetails);
    if (!participantRegistration.errors) {
      //Register the transaction in the DB
      const transactionRequestBody = {
        courseDetails: courseDetails,
        status: paymentDetails.status,
        paymentId: paymentRequestHandler.body?.paymentIntent.id,
        participantId: participantRegistration._id,
        paymentMethod: paymentDetails.paymentMethod,
      };
      const transaction = await createTransaction(transactionRequestBody);

      if (!transaction.errors) {
        res.status(201).json(transaction);
      } else {
        res.status(400).json({
          error: transaction.message,
        });
      }
    } else {
      //if errors during participant creation
      res.status(400).json({
        error: participantRegistration.message,
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
  if (!response?.error) {
    res.status(201).json(response);
  } else {
    res.status(400).json({
      error: response.message,
    });
  }
}

