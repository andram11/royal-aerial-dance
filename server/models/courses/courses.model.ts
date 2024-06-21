import Courses from "./courses.mongo";
import { Course } from "../../types";

//Data access layer - to avoid exposing how the consumer has to interact with the data, instead just serving the data
export async function searchCourses(skip: number, limit: number, query: any) {
  //query as type any because it comes from the Request which as a parsed string type and I am not sure how to handle it
  try {
    //Create the query to send to the DB by removing skip and limit, these 2 properties are calculated by getPagination function separately
    for (const [key, value] of Object.entries(query)) {
      if (key === "skip" || key === "limit") {
        delete query[key];
      }
    }
    //Use query object directly in the db
    return await Courses.find(query).sort("startDate").skip(skip).limit(limit);

  } catch (err) {
    return err;
  }
}

export async function createCourse(course: Course) {
  try {
    return await Courses.create({
      //title;level;location;dayOfWeek;timeslot
      category: course.category,
      title: course.title,
      location: course.location,
      startDate: course.startDate,
      endDate: course.endDate,
      recurrent: course.recurrent,
      recurrenceType: course.recurrenceType,
      level: course.level,
      dayOfWeek: course.dayOfWeek,
      timeslot: course.timeslot,
      price: course.price,
      stock: course.stock,
      teacher: course.teacher,
      status: course.status,
    });
  } catch (err) {
    return err;
  }
}

export async function existsConcurrentCourse(
  category: string,
  location: string,
  startDate: string,
  timeslot: string,
  dayOfWeek: string
) {
  try {
    return await Courses.findOne({
      category: category,
      location: location,
      startDate: startDate,
      timeslot: timeslot,
      dayOfWeek: dayOfWeek,
    });
  } catch (err) {
    return err;
  }
}
// export async function checkCourseStock(courseId, quantity){
//       return await Courses.findOne({
//         _id: courseId,
//         stock:{$gte: quantity}
//       })
//     }

// export async function existsCourse(courseId){
//       return await Courses.findOne({
//         _id: courseId,

//       });
//     }
