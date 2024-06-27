import Transactions from "./transactions.mongo";

import mongoose from 'mongoose'

import { Transaction } from "../../types";
import { ParsedQs } from 'qs';


export async function existsTransactionForCourseId(courseId: mongoose.Types.ObjectId) {
  try{
    return await Transactions.findOne({
      courseId: courseId,
    });
  } catch(err) {
    return err
  }
 
}

export async function findTransactionById(transactionId: mongoose.Types.ObjectId) {
  try {
    return await Transactions.findOne({
      _id: transactionId,
    });
  } catch(err) {
    return err
  }

}

export async function existsTransactionForPaymentId(paymentId: string) {
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
export async function updateTransactionEndDate(paymentId: string) {
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
        courseId: transactionDetails.courseId,
        //courseName: transactionDetails.courseName,
        status: updateBody.status,
        paymentId: updateBody.paymentId,
        participantId: transactionDetails.participantId,
        paymentMethod: transactionDetails.paymentMethod
      }
    );
    return response;
  } catch (err) {
    return err
  }
}

export async function createTransaction(transactionDetails: Transaction) {

  //Register participants with payment reference & courseId
  //TO DO add after participant model has been defined

  try {
        //Create transaction for courseId's
        const response = await Transactions.create({
          courseId: transactionDetails.courseId,
          status: transactionDetails.status,
          paymentId: transactionDetails.paymentId,
          participantId: transactionDetails.participantId,
          paymentMethod: transactionDetails.paymentMethod
        });
      

        return ({message: `Transaction created with id: ${response._id} `});
      } catch (err) {
        return err
      }
   
}

