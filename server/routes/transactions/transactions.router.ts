import express from "express";

const transactionsRouter = express.Router();

import {
  httpCreateNewTransaction,
  httpSearchTransactions,
} from "../../routes/transactions/transactions.controller";


import { httpCheckLoggedIn } from "../authentication/authentication.controller";

transactionsRouter.get("/transactions/search", httpCheckLoggedIn, httpSearchTransactions);
transactionsRouter.post("/transactions", httpCreateNewTransaction);

export default transactionsRouter;
