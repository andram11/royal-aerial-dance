//The controller takes in actions from the router and updates/makes changes to the model

const {getAllTransactions, 
    addNewTransaction, 
    existsTransactionWithId, 
    deleteTransactionById,
    updateTransactionById}= require('../../models/transactions.model')

const {getPagination}= require('../../services/query')

async function httpGetAllTransactions(req, res){
   const {skip, limit}= getPagination(req.query)
   const transactions= await getAllTransactions(skip, limit) 
   return res.status(200).json(transactions)
}

async function httpCreateNewTransaction(req, res){
    const handleNewTransactionCreation = await addNewTransaction(req.body)
    res.json(handleNewTransactionCreation)
}

async function httpUpdateTransactionById(req, res) {
    const transaction= req.params.id
    const response= await updateTransactionById(transaction)
    res.status(200).json(response)

}
async function httpDeleteTransaction (req, res){
    const transactionId=req.params.id

    const existsTransaction= await existsTransactionWithId(transactionId)

    //if transaction doesn't exist
    if (!existsTransaction)
    {
        return res.status(404).json({
            error: 'Transaction not found.'
        })
    }

    //else
    const deleted= await deleteTransactionById(transactionId)
    if (!deleted){
        return res.status(400).json({
            error: 'Transaction could not be deleted'
        })
    }

    return res.status(200).json({
        ok: true
    })
}

module.exports = {
    httpGetAllTransactions,
    httpCreateNewTransaction,
    httpDeleteTransaction,
    httpUpdateTransactionById
}