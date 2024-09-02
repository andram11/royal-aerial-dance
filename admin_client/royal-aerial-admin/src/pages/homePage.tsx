import Table from "../components/table";
import { Link } from "react-router-dom";
import PieChart from "../components/pieChart";


//Test data COURSES
const courseHeaders = ["Title", "Location", "Stock", "Actions"];
const courseData = [
  ["Aerial Fluidity", "Brussels", "10"],
  ["Aerial Fluidity", "Gent", "3"],
  ["Pole Beginner", "Mons", "2"],
  ["Pole Beginner", "Mons", "2"],
  ["Pole Beginner", "Mons", "2"]

];
const rowIcons = ["view", "edit", "delete"];

//Test data TRANSACTIONS
const transactionHeaders = ["Date", "Status", "Payment method", "Actions"];
const transactionData = [
  ["26-07-2023 10:23", "Initiated", "Stripe"],
  ["27-07-2023 10:23", "Succeeded", "Stripe"],
  ["28-07-2023 10:23", "Initiated", "Stripe"],
  ["30-07-2023 10:23", "Failed", "Stripe"],
  ["01-08-2023 10:23", "Initiated", "Stripe"]

];

//Test data USERS
const userHeaders = ["Username", "Type"];
const userData = [
  ["andram@email.com", "Local"],
  ["someverylongusernamewithemailaddress@test.com", "Local"],
  ["shortUser@gmail.com", "Google"],
  ["username@gmail.com", "Google"],
  ["anotherOne@test.be", "Local"]

];

const HomePage: React.FC = () => {
  //TO DO No on page change here since the table is just a preview table with a set page size of 7 elements

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
        <div className="">
          <Table headers={courseHeaders} data={courseData} rowIcons={rowIcons} />
        </div>
        </div>

        {/*Placeholder charts*/}
    <div className="mt-14 md:mt-0 ">
  <h1 className="font-bold text-primary mb-2 hover:text-secondary">REVENUE PER CATEGORY</h1>
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
          <Table headers={transactionHeaders} data={transactionData} rowIcons={rowIcons} />
        </div>
        </div>

        {/*Users section*/}
        <div className="mt-14">
        <Link to="/admin/transactions">
          <h1 className="font-bold text-primary mb-2 hover:text-secondary">
             USERS
          </h1>
        </Link>

        <p className="mb-8 italic text-primary-200">Latest additions</p>
        <div className="">
          <Table headers={userHeaders} data={userData} />
        </div>
        </div>

       
      </div>
    </>
  );
};

export default HomePage;
