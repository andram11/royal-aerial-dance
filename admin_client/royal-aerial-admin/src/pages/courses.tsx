import React, { useState } from "react";
import Table from "../components/table";
import Pagination from "../components/pagination";
import { FaFilter } from "react-icons/fa";
import Filter from "../components/filter";
import { useCourses } from "../hooks/coursesContext";
import { formatDateToBelgium } from "../utils";
import { capitalizeFirstLetter } from "../utils";
import { getCourseById, updateCourse } from "../api/api";
import Modal from "../components/modal";
import UpdateModal from "../components/updateModal";
import { FaPlus } from "react-icons/fa";
import CreateModal from "../components/createModal";


//Test data

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

//Pagination
const ITEMS_PER_PAGE = 10;

const Courses: React.FC = () => {
  //Visbibility of filter
  const [isFilterVisible, setFilterVisible] = useState<boolean>(false);
  //Pagination details
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [skippedItems, setSkippedItems] = useState<number>(0);
  //Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState<any>(null);
  //Update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  //Create modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  //Get first page of courses
  const { courses, loading, error, fetchCourses } = useCourses();
  if (loading)
    return (
      <div className="font-bold text-primary text-2xl my-6">LOADING...</div>
    );
  if (error)
    return <div className="font-bold text-primary text-2xl my-6">{error}</div>;

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

    // Fetch courses with the updated skip value
    fetchCourses(ITEMS_PER_PAGE, newSkippedItems); // Use the new skip value directly
  };

  //Prepare course data for display
  const courseData = courses
    ? courses.items
        .slice() // Shallow copy to avoid mutating the original data
        .sort((a, b) => {
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          ); // Sort by most recent date
        })
        .map((course) => ({
          id: course._id, // Add the course ID
          data: [
            capitalizeFirstLetter(course.title),
            formatDateToBelgium(course.startDate),
            course.timeslot,
            capitalizeFirstLetter(course.location),
            capitalizeFirstLetter(course.teacher),
            capitalizeFirstLetter(course.category),
            course.stock,
          ],
        }))
    : [];

  //View course details (course details + participant list)
  const onView = async (id: string) => {
    // Check if the course exists in the courses context

    const existingCourse = courses?.items.find((course) => course._id === id);

    if (existingCourse) {
      // Course found in context, no need to call the API
      const filteredCourseDetails = {
        courseId: existingCourse._id,
        title: existingCourse.title,
        startDate: formatDateToBelgium(existingCourse.startDate),
        timeslot: existingCourse.timeslot,
        location: existingCourse.location,
        teacher: existingCourse.teacher,
        category: existingCourse.category,
        stock: existingCourse.stock,
        status: existingCourse.status,
      };
      setModalDetails(filteredCourseDetails);
      setIsModalOpen(true);
    } else {
      // Course not found in context, call the API
      try {
        const courseDetails = await getCourseById(id);
        const filteredCourseDetails = {
          courseId: courseDetails._id,
          title: courseDetails.title,
          startDate: formatDateToBelgium(courseDetails.startDate),
          timeslot: courseDetails.timeslot,
          location: courseDetails.location,
          teacher: courseDetails.teacher,
          category: courseDetails.category,
          stock: courseDetails.stock,
          status: courseDetails.status,
        };
        setModalDetails(filteredCourseDetails);
        setIsModalOpen(true);
      } catch (err) {
        throw err;
      }
    }
  };

  //Edit course details
  const onEdit = async (id: string) => {
    try {
      const courseDetails = await getCourseById(id);
      const filteredCourseDetails = {
        courseId: courseDetails._id,
        level: courseDetails.level,
        title: courseDetails.title,
        startDate: formatDateToBelgium(courseDetails.startDate),
        endDate: formatDateToBelgium(courseDetails.endDate),
        recurrent: courseDetails.recurrent,
        recurrenceType: courseDetails.recurrenceType,
        timeslot: courseDetails.timeslot,
        price: courseDetails.price,
        location: courseDetails.location,
        dayOfWeek: courseDetails.dayOfWeek,
        teacher: courseDetails.teacher,
        category: courseDetails.category,
        stock: courseDetails.stock,
        status: courseDetails.status,
      };
      setModalDetails(filteredCourseDetails);
      setIsUpdateModalOpen(true);
    } catch (err) {
      throw err;
    }
  };

  //On add new course
  

  //Submit course update
  //Function which handles what happens when a course has been edited
  const onUpdateSubmit = async (courseId: string, updateData: any) => {
    try {
      const response = await updateCourse(courseId, updateData);
      setModalDetails(response);
      //fetchCourses(10, 0);
      return response;
    } catch (err) {
      throw err;
    }
  };
  //Row actions
  const rowActions = [
    { view: onView, edit: onEdit, delete: onDelete, download: onDownload },
  ];

  // If loading, show loading message
  if (loading) {
    return (
      <div className="font-bold text-primary text-2xl my-6">LOADING...</div>
    );
  }

  // If error, show error message
  if (error) {
    return <div className="font-bold text-primary text-2xl my-6">{error}</div>;
  }

  return (
    <div className="mx-12">
      <h1 className="font-bold text-primary text-2xl my-6">Courses</h1>
      <div className="flex space-x-4">
        <FaPlus className="text-secondary-200 text-xl cursor-pointer"/><p className="text-lg"> Add new course</p>
      </div>

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
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              details={modalDetails}
              tabs="participants"
            />
            <UpdateModal
              isOpen={isUpdateModalOpen}
              onClose={() => setIsUpdateModalOpen(false)}
              details={modalDetails}
              updateComponent="course"
              onSubmit={onUpdateSubmit}
            />
            <CreateModal
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              createComponent="course"
              onSubmit={onUpdateSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
