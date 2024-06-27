import express from "express";

const transactionsRouter = express.Router();

import {
  httpCreateNewTransaction,
  httpSearchTransactions,
} from "../../routes/transactions/transactions.controller";

transactionsRouter.get("/transactions/search", httpSearchTransactions);

transactionsRouter.post("/transactions", httpCreateNewTransaction);

export default transactionsRouter;
