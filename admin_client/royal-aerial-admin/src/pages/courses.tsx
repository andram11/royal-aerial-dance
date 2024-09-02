import React, { useContext, useState } from "react";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { FaFilter } from "react-icons/fa";
import Filter from "../components/filter";

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

    const [isFilterVisible, setFilterVisible]= useState<boolean>(false)

  return (
    <div className="mx-12">
      <h1 className="font-bold text-primary text-2xl my-6">
        Courses
      </h1>
        
        <div className="flex justify-end mb-4">
            <FaFilter className="text-secondary-200 text-xl cursor-pointer" onClick={()=> setFilterVisible(!isFilterVisible)}/>
        </div>
        <div className="flex space-x-10">

           { isFilterVisible&&

            <Filter />}
           <div className="grow h-14">
           <Table headers={headers} data={courseData} rowIcons={rowIcons} rowActions={rowActions} />
           <div className="text-center mt-10">
                <Pagination
                totalItems={30}
                currentPage={1}
                onPageChange={()=> console.log('something')}
                />
      </div>
            </div> 
         
           
        
     
        </div>
     
    </div>
  );
};

export default Courses;
