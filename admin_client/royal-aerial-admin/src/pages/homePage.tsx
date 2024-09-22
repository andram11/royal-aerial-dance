import Table from "../components/table";
import { Link } from "react-router-dom";
import PieChart from "../components/pieChart";
import { useCourses } from "../hooks/coursesContext";
import { capitalizeFirstLetter, formatDateToBelgium } from "../utils";
import { useTransactions } from "../hooks/transactionsContext";

//Test data COURSES
const courseHeaders = ["Title", "Location", "Stock"];

//Test data TRANSACTIONS
const transactionHeaders = ["Date", "Status", "Payment method"];

//Test data USERS
const userHeaders = ["Username", "Type"];
const userData = [
  { id: "1", data: ["andram@email.com", "Local"] },
  { id: "2", data: ["someverylongusernamewithemailaddress@test.com", "Local"] },
  { id: "3", data: ["shortUser@gmail.com", "Google"] },
  { id: "4", data: ["username@gmail.com", "Google"] },
  { id: "5", data: ["anotherOne@test.be", "Local"] },
];

const HomePage: React.FC = () => {
  //TO DO No on page change here since the table is just a preview table with a set page size of 7 elements
  const { courses, loading, error } = useCourses();
  const {
    transactions,
    loadingTransactions,
    errorTransactions,
  } = useTransactions();

  const transactionData = transactions
  ? transactions.items
      .slice(0,7)
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

        ],
      }))
  : [];

  const courseData = courses
    ? courses.items
        .slice(0, 7)
        .sort((a, b) => {
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          ); // Sort by most recent date
        })
        .map((course) => ({
          data: [
            capitalizeFirstLetter(course.title),
            capitalizeFirstLetter(course.location),
            course.stock,
          ],
        }))
    : [];



  return (
    <>
      <div className="md:grid md:grid-cols-2 lg:gap-16 my-6 mx-12">
        {/*Courses section*/}
        <div>
          <Link to="/admin/courses">
            <h1 className="font-bold text-primary mb-2 hover:text-secondary">
              COURSES
            </h1>
          </Link>

          <p className="mb-8 italic text-primary-200">Latest additions</p>

          <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
              <Table headers={courseHeaders} data={courseData} />
            )}
          </div>
        </div>

        {/*Placeholder charts*/}
        <div className="mt-14 md:mt-0 ">
          <h1 className="font-bold text-primary mb-2 hover:text-secondary">
            REVENUE PER CATEGORY
          </h1>
          <p className="mb-8 italic text-primary-200">Based on latest transactions</p>
          <div className="w-full max-w-md h-84">
            <PieChart />
          </div>
        </div>

        {/*Transactions section*/}
        <div className="mt-14">
          <Link to="/admin/transactions">
            <h1 className="font-bold text-primary mb-2 hover:text-secondary">
              TRANSACTIONS
            </h1>
          </Link>

          <p className="mb-8 italic text-primary-200">Latest additions</p>
          <div className="">
            <Table headers={transactionHeaders} data={transactionData} />
          </div>
        </div>

        {/*Users section*/}
        <div className="mt-14">
          
            <h1 className="font-bold text-primary mb-2">
              USERS
            </h1>
       

          <p className="mb-8 italic text-primary-200">Latest additions</p>
          <div >
          {loadingTransactions && <p>Loading...</p>}
            {errorTransactions && <p style={{ color: "red" }}>{error}</p>}
            {!loadingTransactions && !errorTransactions && (
            <Table headers={userHeaders} data={userData} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
