import express from "express";

const transactionsRouter = express.Router();

import {
  httpCreateNewTransaction,
  httpDeleteTransactionById,
  httpSearchTransactionByCourseId,
  httpSearchTransactions,
} from "../../routes/transactions/transactions.controller";

import { checkLoggedIn } from "../../services/utils/checkLoggedIn";


transactionsRouter.get("/transactions/search", checkLoggedIn, httpSearchTransactions);
transactionsRouter.post("/transactions", httpCreateNewTransaction);
//returns the transactions list for a courseId 
transactionsRouter.get("/transactions/:id/search", checkLoggedIn, httpSearchTransactionByCourseId)
transactionsRouter.delete("/transactions/:id", checkLoggedIn, httpDeleteTransactionById)

export default transactionsRouter;
