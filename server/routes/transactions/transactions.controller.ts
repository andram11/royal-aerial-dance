//The controller takes in actions from the router and updates/makes changes to the model
import mongoose, {Types} from 'mongoose'
import { Request, Response } from "express";
import {getAllTransactions, 
    createTransaction, 
    existsTransactionWithId, 
    deleteTransactionById} from '../../models/transactions/transactions.model';

import getPagination from '../../services/query'

// export async function httpGetAllTransactions(req, res){
//    const {skip, limit}= getPagination(req.query)
//    const transactions= await getAllTransactions(skip, limit) 
//    return res.status(200).json(transactions)
// }

export async function httpCreateNewTransaction(req: Request, res:Response){
    const transaction = req.body;
      const response = await createTransaction(req.body);
      if (!response.errors) {
        res.status(201).json(response);
      } else {
        res.status(400).json({
          error: response.message,
        });
      }
    } 


// async function httpUpdateTransactionById(req, res) {
//     const transaction= req.params.id
//     const response= await updateTransactionById(transaction)
//     res.status(200).json(response)

// }
// async function httpDeleteTransaction (req, res){
//     const transactionId=req.params.id

//     const existsTransaction= await existsTransactionWithId(transactionId)

//     //if transaction doesn't exist
//     if (!existsTransaction)
//     {
//         return res.status(404).json({
//             error: 'Transaction not found.'
//         })
//     }

//     //else
//     const deleted= await deleteTransactionById(transactionId)
//     if (!deleted){
//         return res.status(400).json({
//             error: 'Transaction could not be deleted'
//         })
//     }

//     return res.status(200).json({
//         ok: true
//     })
// }
