const express = require("express");

const transactionsRouter = express.Router();

const {
  httpGetAllTransactions,
  httpCreateNewTransaction,
  httpDeleteTransaction,
} = require("../../routes/transactions/transactions.controller");
const {
  httpCheckLoggedIn,
} = require("../authentication/authentication.controller");

transactionsRouter.get(
  "/transactions",
  httpCheckLoggedIn,
  httpGetAllTransactions
);
//transactionsRouter.put('/transactions/:id', httpUpdateTransactionById)
transactionsRouter.post("/transactions", httpCreateNewTransaction);
transactionsRouter.delete("/transactions/:id", httpDeleteTransaction);

module.exports = transactionsRouter;
