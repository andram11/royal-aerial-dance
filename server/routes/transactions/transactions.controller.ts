//The controller takes in actions from the router and updates/makes changes to the model
import mongoose, { Types } from "mongoose";
import { Request, Response } from "express";
import {
  searchTransactions,
  createTransaction,
  findTransactionById,
} from "../../models/transactions/transactions.model";

import getPagination from "../../services/query";
import { createParticipant } from "../../models/participants/participants.model";

export async function httpSearchTransactions(req: Request, res: Response) {
  //Calculate proper pagination parameters
  const { skip, limit } = getPagination(
    Number(req.query.skip),
    Number(req.query.limit)
  );
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
  const transaction = req.body;
  //Create participant
  const participantRegistration = await createParticipant(req.body.participant);
  //If no errors, create transaction
  if (!participantRegistration.errors) {
    //We remove participant details from transaction and add the participantId which is needed by the Transaction model
    delete transaction.participant;
    transaction.participantId = participantRegistration._id;

    //Create transaction
    const response = await createTransaction(req.body);
    if (!response.errors) {
      res.status(201).json(response);
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
  } else {
    //if errors during participant creation
    res.status(400).json({
      error: participantRegistration.message,
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
