import express from "express";
const paymentsRouter = express.Router();

import {
  httpExecutePaymentRequest,
  httpHandleStripeWebhookResponse,
} from "../payments/payments.controller";
import { checkLoggedIn } from "../../services/utils/checkLoggedIn";
//Create payment intent
paymentsRouter.post("/payments", checkLoggedIn,httpExecutePaymentRequest);

//Endpoint for Stripe webhooks (simulation purposes)
paymentsRouter.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  httpHandleStripeWebhookResponse
);

export default paymentsRouter;
