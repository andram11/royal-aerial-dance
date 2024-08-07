import express from "express";

const transactionsRouter = express.Router();

import {
  httpCreateNewTransaction,
  httpSearchTransactionByCourseId,
  httpSearchTransactions,
} from "../../routes/transactions/transactions.controller";




transactionsRouter.get("/transactions/search", httpSearchTransactions);
transactionsRouter.post("/transactions", httpCreateNewTransaction);
//returns the transactions list for a courseId 
transactionsRouter.get("/transactions/:id/search", httpSearchTransactionByCourseId)

export default transactionsRouter;
