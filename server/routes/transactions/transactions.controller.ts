//The controller takes in actions from the router and updates/makes changes to the model
import mongoose, { Types } from "mongoose";
import { Request, Response } from "express";
import {
  searchTransactions,
  createTransaction,
  findTransactionById
} from "../../models/transactions/transactions.model";

import getPagination from "../../services/query";


export async function httpSearchTransactions(req: Request, res: Response) {
  //Calculate proper pagination parameters
  const { skip, limit } = getPagination(
    Number(req.query.skip),
    Number(req.query.limit)
  );
  //Search by status, paymentId, paymentMethod, historyStart & endDate
  const response = await searchTransactions(skip, limit, req.query);
  if (!response.errors) {
    res.status(200).json({
      totalItems: response.length,
      skippedItems: skip,
      pageLimit: limit,
      items: response,
    });
  } else {
    res.status(400).json({
      error: response.message,
    });
  }
}

export async function httpCreateNewTransaction(req: Request, res: Response) {
    //Create transaction
    const response = await createTransaction(req.body);
    if (!response.errors) {
      res.status(201).json(response);
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
}

export async function httpFindTransactionById(req: Request, res: Response) {
  const transactionId = new mongoose.Types.ObjectId(
    req.params.id
  ) as Types.ObjectId;
  const response = await findTransactionById(transactionId);
  if (!response.errors) {
    res.status(200).json(response);
  } else {
    res.status(400).json({
      error: response.message,
    });
  }
}