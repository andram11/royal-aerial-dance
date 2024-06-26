import express from "express";

const transactionsRouter = express.Router();

import {

  httpCreateNewTransaction,

} from "../../routes/transactions/transactions.controller";

// transactionsRouter.get(
//   "/transactions",
//   httpCheckLoggedIn,
//   httpGetAllTransactions
// );
//transactionsRouter.put('/transactions/:id', httpUpdateTransactionById)
transactionsRouter.post("/transactions", httpCreateNewTransaction);
//transactionsRouter.delete("/transactions/:id", httpDeleteTransaction);

export default transactionsRouter;
