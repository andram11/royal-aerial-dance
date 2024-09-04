import React, { useContext, useState } from "react";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { FaFilter } from "react-icons/fa";
import Filter from "../components/filter";
import { useCourses } from "../hooks/coursesContext";
import { formatDateToBelgium } from "../utils";
import { getAllCourses } from "../api/api";

//Test data
const onView = (id: string) => {
  console.log("View", id);
};
const onEdit = (id: string) => {
  console.log("Edit", id);
};
const onDelete = (id: string) => {
  console.log("Delete", id);
};
const onDownload = (id: string) => {
  console.log("Download", id);
};

//Fixed Headers for Courses page
const headers = [
  "Title",
  "Start Date",
  "Timeslot",
  "Location",
  "Teacher",
  "Category",
  "Stock",
  "Actions",
];

//Test data
// const courseData = [
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
//   ["Aerial Fluidity", "10-12", "Brussels", "Andra", "Aerial Hoop", "10"],
// ];
//Fixed row icons for Courses Page
const rowIcons = ["view", "edit", "delete", "download"];
const rowActions = [
  { view: onView, edit: onEdit, delete: onDelete, download: onDownload },
];

//Pagination
const ITEMS_PER_PAGE = 10;

const Courses: React.FC = () => {
  //Visbibility of filter
  const [isFilterVisible, setFilterVisible] = useState<boolean>(false);
  //Pagination details
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [skippedItems, setSkippedItems] = useState<number>(0);

  //Get first page of courses
  const { courses, loading, error, fetchCourses } = useCourses();
  if (loading)
    return (
      <div className="font-bold text-primary text-2xl my-6">LOADING...</div>
    );
  if (error)
    return <div className="font-bold text-primary text-2xl my-6">{error}</div>;

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
  
    // Fetch courses with the updated skip value
    fetchCourses(ITEMS_PER_PAGE, newSkippedItems); // Use the new skip value directly
  };
  

  //Prepare course data for display
  const courseData = courses
    ? courses.items
        .slice() //  shallow copy to avoid mutating the original data
        .sort((a, b) => {
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          ); // Sort by most recent date
        })
        .map((course) => [
          course.title,
          formatDateToBelgium(course.startDate),
          course.timeslot,
          course.location,
          course.teacher,
          course.category,
          course.stock,
        ])
    : [];

  return (
    <div className="mx-12">
      <h1 className="font-bold text-primary text-2xl my-6">Courses</h1>

      <div className="flex justify-end mb-4">
        <FaFilter
          className="text-secondary-200 text-xl cursor-pointer"
          onClick={() => setFilterVisible(!isFilterVisible)}
        />
      </div>
      <div className="flex space-x-10">
        {isFilterVisible && <Filter />}
        <div className="grow h-14">
          <Table
            headers={headers}
            data={courseData}
            rowIcons={rowIcons}
            rowActions={rowActions}
          />
          <div className="text-center mt-10">
            <Pagination
              totalItems={courses?.totalItems}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
