import Transactions from "./transactions.mongo";


import mongoose from 'mongoose'

import { Transaction } from "../../types";
import { ParsedQs } from 'qs';



export async function findTransactionById(transactionId: mongoose.Types.ObjectId) {
  try {
    return await Transactions.findOne({
      _id: transactionId,
    });
  } catch(err) {
    return err
  }

}

export async function existsTransactionForPaymentId(paymentId: string | undefined) {
  try {
    return await Transactions.findOne({
      paymentId: paymentId,
    });
  } catch(err) {
    return err
  }

}

export async function searchTransactions(skip: number, limit:number, query: ParsedQs) {
  try {

    for (const [key, value] of Object.entries(query)) {
      if (key === "skip" || key === "limit") {
        delete query[key];
      } else {
        if (key==="historyStartDate"){

          query[key]= {$gte: value} 
        }
        if (key==="historyEndDate"){
          query[key]= {$lte: value}
        }

      }
    }
    return await Transactions.find(query)
    .sort("historyStartDate")
    .skip(skip)
    .limit(limit);
  } catch(err){
    return err
  }
 
}

//Operation for  updating a transaction status
export async function updateTransactionEndDate(paymentId: string | undefined) {
  try {
    return await Transactions.updateOne(
      { paymentId: paymentId },
      { historyEndDate: new Date() })
  } catch(err) {
    return err
  }
   
   
}

//Operation for updating a transaction status
export async function updateTransactionStatus(updateBody: Transaction) {
  try {
    //update endDate of the previous status for the same transaction
    const updatePreviousStatusEndDate= await updateTransactionEndDate(updateBody.paymentId)
    if (!updatePreviousStatusEndDate) {
        //TO DO log errors somewhere
        return ({message: "An error occured. Please try again later."})
    } 

    //Retrieve the details of the transaction
    const transactionDetails= await existsTransactionForPaymentId(updateBody.paymentId)
    //Create new transaction with same details but a new status 
    const response = await createTransaction(
      {
        courseDetails: transactionDetails.courseDetails,
        status: updateBody.status,
        paymentId: updateBody.paymentId,
        participantDetails: updateBody.participantDetails,
        paymentMethod: transactionDetails.paymentMethod
      }
    );
    
    return response;
    //Update the stock of a course if status=succeeded
  } catch (err) {
    return err
  }
}

export async function createTransaction(transactionDetails: Transaction) {
  try {
        //Create transaction for courseId
        const response = await Transactions.create({
          courseDetails: {
              courseId: transactionDetails.courseDetails[0].courseId, 
              quantity: transactionDetails.courseDetails[0].quantity
            
          },
          status: transactionDetails.status,
          paymentId: transactionDetails.paymentId,
          participantDetails: transactionDetails.participantDetails,
          paymentMethod: transactionDetails.paymentMethod
        });
      

        return ({message: `Transaction created with id: ${response._id} `});
      } catch (err) {
        return err
      }
   
}

export async function getTransactionsForCourseId(skip: number, limit:number, courseId: mongoose.Types.ObjectId, status:string ){
  try {
    return await Transactions.find({
      'courseDetails.courseId': courseId
    
    })
    .skip(skip)
    .limit(limit);;
  } catch(err) {
    return err
  }
}
