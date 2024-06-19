require("dotenv").config();
const { stripePaymentIntent } = require("../services/stripe");
const {checkCourseStock}= require('./courses.model')
const { addNewTransaction } = require("./transactions.model");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function handlePaymentRequest(paymentDetails) {
    //Create payment intent with Stripe
  try {
    const stripeRequest = await stripePaymentIntent(paymentDetails);

    //Create participant in DB: TODO

    //Create transaction details in DB
    // Check stock for provided courses 

    const transaction = await addNewTransaction({ courseDetails: paymentDetails.body.courseDetails,
        paymentId: stripeRequest.body.paymentIntent.id,
        participantDetails: "123456",
        status: "initiated",
        paymentMethod: paymentDetails.body.paymentMethod})
    //If Stripe request has been registered & transaction has been correctly registered
    if (stripeRequest && transaction) 
    return ({message: 'Your paiment request has been registered. ' +  transaction.message})
  } catch (err) {
    return ({error: err})
  }
}

module.exports = {
  handlePaymentRequest,
};
