const transactions = require("./transactions.mongo");

const coursesDatabase = require("./courses.mongo");


async function existsTransactionForCourseId(courseId) {
  return await transactions.findOne({
    courseId: courseId,
  });
}

async function existsTransactionWithId(transactionId) {
  return await transactions.findOne({
    _id: transactionId,
  });
}

async function existsTransactionForPaymentId(paymentId) {
  return await transactions.findOne({
    paymentId: paymentId,
  });
}


async function getAllTransactions(skip, limit) {
  return await transactions.find({}, { _id: 0, __v: 0 })
  .sort()
  .skip(skip)
  .limit(limit);
}

//Operation for  updating a transaction status
async function updateTransactionEndDate(paymentId) {
   return await transactions.updateOne(
      { paymentId: paymentId },
      { historyEndDate: new Date() })
   
}

//Operation for updating a transaction status
async function updateTransactionStatus(updateBody) {
  try {
    //update endDate of the previous status for the same transaction
    const updatePreviousStatusEndDate= await updateTransactionEndDate(updateBody.paymentId)
    if (!updatePreviousStatusEndDate) {
        //TO DO log errors somewhere
        return ({message: "An error occured. Please try again later."})
    } 

    //Retrieve the details of the transaction
    const transactionDetails= await existsTransactionForPaymentId(updateBody.paymentId)
    //Create new transaction with same details but a new status 
    const response = await addNewTransaction(
      {
        courseDetails: transactionDetails.courseId,
        //courseName: transactionDetails.courseName,
        status: updateBody.status,
        paymentId: updateBody.paymentId,
        participantDetails: transactionDetails.participantId,
        paymentMethod: transactionDetails.paymentMethod
      }
    );
    return response;
  } catch (err) {
    return ({error: err})
  }
}

async function addNewTransaction(transactionDetails) {
  //console.log(transactionDetails)
  //Have all required model properties been provided?
  if (!transactionDetails.courseDetails ||  
    !transactionDetails.status || 
    !transactionDetails.participantDetails || 
    !transactionDetails.paymentId ||
    !transactionDetails.paymentMethod)
  {
      return ({
          error: 'Missing required properties.'
      })
  }

  

  //Register participants with payment reference & courseId
  //TO DO add after participant model has been defined

  try {
    //Extract courseId list from courseDetails
    let courseList= []
      for (const courseId in transactionDetails.courseDetails){
        courseList.push(transactionDetails.courseDetails[courseId].courseId)
      }
        //Create transaction for courseId's
        const response = await transactions.create({
          courseId: courseList,
          status: transactionDetails.status,
          paymentId: transactionDetails.paymentId,
          participantId: transactionDetails.participantDetails,
          paymentMethod: transactionDetails.paymentMethod
        });
      

        return ({message: `Transaction created with id: ${response._id} `});
      } catch (err) {
        return ({
          error: err
        });
      }
   
}

async function deleteTransactionById(transactionId) {
  const deleted = await transactions.updateOne(
    {
      _id: transactionId,
    },
    {
      status: "Deleted",
    }
  );

  return deleted.modifiedCount === 1;
}

module.exports = {
  getAllTransactions,
  addNewTransaction,
  updateTransactionStatus,

  existsTransactionForCourseId,
  existsTransactionWithId,
  deleteTransactionById,
  existsTransactionForPaymentId
};
