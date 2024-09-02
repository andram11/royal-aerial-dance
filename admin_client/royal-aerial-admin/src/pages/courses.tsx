import React from "react";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { FaFilter } from "react-icons/fa";

const onView = (id: string)=> {
    console.log("View", id)
}

const onEdit = (id: string)=> {
    console.log("Edit", id)
}

const onDelete = (id: string)=> {
    console.log("Delete", id)
}

const onDownload = (id: string)=> {
    console.log("Download", id)
}

const headers = [
  "Title",
  "Timeslot",
  "Location",
  "Teacher",
  "Category",
  "Stock",
  "Actions",
];
const courseData = [
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
  ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
];
const rowIcons = ["view", "edit", "delete", 'download'];
const rowActions= [{'view': onView, 'edit': onEdit, 'delete': onDelete, 'download': onDownload}]

const Courses: React.FC = () => {

  return (
    <div className=" mx-12">
      <h1 className="font-bold text-primary text-2xl hover:text-secondary my-6">
        Courses
      </h1>
        <div className="flex justify-end mb-4">
            <FaFilter className="text-secondary-200 text-xl cursor-pointer" onClick={()=> console.log('filter')}/>
        </div>
      <div className="flex justify-center">
        <Table headers={headers} data={courseData} rowIcons={rowIcons} rowActions={rowActions} />
      </div>
      <div className="text-center mt-10">
        <Pagination
          totalItems={30}
          currentPage={1}
          onPageChange={()=> console.log('something')}
        />
      </div>
    </div>
  );
};

export default Courses;
