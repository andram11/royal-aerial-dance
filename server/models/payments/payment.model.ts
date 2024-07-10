import dontenv from "dotenv"
dontenv.config()

import { handleStripePaymentIntent } from "../../services/stripe";
import { PaymentDetails} from "../../types";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function handlePaymentIntent(paymentDetails: PaymentDetails){
    //Create payment intent with Stripe
  try {
    return await handleStripePaymentIntent(paymentDetails);
  } catch (err) {
    return ({error: err})
  }
}

