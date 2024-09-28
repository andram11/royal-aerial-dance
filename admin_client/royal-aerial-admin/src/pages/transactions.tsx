import { useState } from "react";
import { useTransactions } from "../hooks/transactionsContext";
import { formatDateToBelgium, formatDateTimestamp } from "../utils";
import { FaPlus } from "react-icons/fa";
import Table from "../components/table";
import Pagination from "../components/pagination";
import Modal from "../components/modal";
import CreateModal from "../components/createModal";
import { createNewTransaction, deleteTransaction } from "../api/api";
import DeleteModal from "../components/deleteModal";

//Fixed Headers for Transactions page
const headers = ["Date", "Status", "Payment Method", "Payment Id", "Actions"];

//Fixed row icons for Courses Page
const rowIcons = ["view", "delete"];

//Pagination
const ITEMS_PER_PAGE = 10;

const Transactions: React.FC = () => {
  //Pagination details
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [skippedItems, setSkippedItems] = useState<number>(0);
  //View modal 
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [modalDetails, setModalDetails] = useState<any>(null);
 //Create modal
 const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
 //Delete modal
 const [isDeleteModalOpen, setIsDeleteModalOpen]= useState<boolean>(false)


 

  //Get first page of transactions
  const {
    transactions,
    loadingTransactions,
    errorTransactions,
    fetchTransactions,
  } = useTransactions();
  if (loadingTransactions)
    return (
      <div className="font-bold text-primary text-2xl my-6">LOADING...</div>
    );
  if (errorTransactions)
    return (
      <div className="font-bold text-primary text-2xl my-6">
        {errorTransactions}
      </div>
    );

  //Handle pagination changes
  const handlePageChange = (action: string, page?: number) => {
    let newPage = currentPage;
    let newSkippedItems = skippedItems; // Create a variable to hold the updated skip value

    if (action === "next") {
      newPage = currentPage + 1;
      newSkippedItems = skippedItems + ITEMS_PER_PAGE;
    } else if (action === "previous" && currentPage > 1) {
      newPage = currentPage - 1;
      newSkippedItems = skippedItems - ITEMS_PER_PAGE;
    } else if (action === "specific" && page) {
      newPage = page;
      newSkippedItems = (page - 1) * ITEMS_PER_PAGE;
    }

    // Update state
    setCurrentPage(newPage);
    setSkippedItems(newSkippedItems);

    fetchTransactions(ITEMS_PER_PAGE, newSkippedItems); 
  };

  //Prepare course data for display
  const transactionData = transactions
    ? transactions.items
        .slice()
        .sort((a, b) => {
            return (
              new Date(b.historyStartDate).getTime() - new Date(a.historyStartDate).getTime()
            );
          })
        .map((transaction) => ({
          id: transaction._id, 
          data: [
            formatDateToBelgium(transaction.historyStartDate),
            transaction.status,
           transaction.paymentMethod,
           transaction.paymentId
          ],
        }))
    : [];



     //View transaction details 
    const onView = (id: string) => {
    // Check if the transaction id exists in the transactions context
    const existingTransaction = transactions?.items.find((transaction) => transaction._id === id);
    
    if (existingTransaction) {
      const filteredTransactionDetails = {
        transactionId: existingTransaction._id,
        participantDetails: `First Name: ${existingTransaction.participantDetails.firstName}, 
        Last Name: ${existingTransaction.participantDetails.lastName},
        Birth Date: ${formatDateToBelgium(existingTransaction.participantDetails.birthDate)},
        Phone Number: ${existingTransaction.participantDetails.phoneNumber},
        Email: ${existingTransaction.participantDetails.email}`,
        date: formatDateTimestamp(existingTransaction.historyStartDate),
        endDate: formatDateTimestamp(existingTransaction.historyStartDate),
        paymentId: existingTransaction.paymentId,
        paymentMethod: existingTransaction.paymentMethod,
        status: existingTransaction.status,
        courseDetails: existingTransaction.courseDetails
        .map((course, index) => 
          `Course ${index + 1} - Course ID: ${course.courseId}, Quantity: ${course.quantity}`
        )
        .join(', ')
      };
      setModalDetails(filteredTransactionDetails);
      setIsModalOpen(true);
    } else {
      return <div>Cannot find the transaction details. Try again later.</div>
    }
  };

    //Add new transaction modal
    const onAdd= ()=> {
        setIsCreateModalOpen(true)
    }

    //Create new transaction
    const onCreateSubmit = async (createData: any) => {
        try {

          const response = await createNewTransaction(createData);
          return response;
        } catch (err) {
          throw err;
        }
      };

    const onDelete =  (id: string) => {
        const findTransaction = transactions?.items.find((transaction) => transaction._id === id);
        if (findTransaction) {

          const deleteCourseDetails = {
            id: findTransaction._id
          };
          setModalDetails(deleteCourseDetails);
          setIsDeleteModalOpen(true);
        } else {
          const deleteCourseDetails = {
            error: "There was an error"
          };
          setModalDetails(deleteCourseDetails);
          setIsDeleteModalOpen(true)
         
      };}

      const handleDelete =  async (id: string) => {
        try {
          const response = await deleteTransaction(id);
          setModalDetails(response);
          //close modal after 5 seconds
          setTimeout(() => {
            fetchTransactions(10, skippedItems);
          }, 5000);
          return response;
        } catch (err) {
          throw err;
        }
      };

       //Row actions
       const rowActions = [
        { view: onView, delete: onDelete },
      ];

    return(
        <div className="mx-12">
        <h1 className="font-bold text-primary text-2xl my-6">Transactions</h1>
        <div className="flex space-x-4 mb-2">
          <FaPlus className="text-secondary-200 text-xl cursor-pointer" onClick={onAdd}/>
          <p className="text-lg"> Add new transaction</p>
        </div>
  
        {/* <div className="flex justify-end mb-4">
          <FaFilter
            className="text-secondary-200 text-xl cursor-pointer"
            
          />
        </div> */}
        <div className="flex space-x-10">
          {/* {isFilterVisible && <Filter />} */}
          <div className="grow h-14">
            <Table
              headers={headers}
              data={transactionData}
              rowIcons={rowIcons}
              rowActions={rowActions}
             
            />
            <div className="text-center mt-10">
              <Pagination
                totalItems={transactions?.totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
               <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              details={modalDetails}
              itemsFor="transactions"
           
            />
            <CreateModal
            isOpen={isCreateModalOpen}
            onClose={()=> setIsCreateModalOpen(false)}
            createComponent= "transactions"
            onTransactionSubmit={onCreateSubmit}
           />
           <DeleteModal
           isOpen={isDeleteModalOpen}
           onClose= {()=> setIsDeleteModalOpen(false)}
           details={modalDetails}
           deleteComponent="transactions"
           onTransactionSubmit= {handleDelete}
  
           />
           
            </div>
          </div>
        </div>
      </div>
    
    )
  }


export default Transactions;
