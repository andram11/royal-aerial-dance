import Courses from "./courses.mongo";
import { Course } from "../../types";
import mongoose from 'mongoose'
import { ParsedQs } from 'qs';

//Data access layer - to avoid exposing how the consumer has to interact with the data, instead just serving the data
export async function searchCourses(skip: number, limit: number, query: ParsedQs) {
  try {
    //Create the query to send to the DB by removing skip and limit, these 2 properties are calculated by getPagination function separately
    for (const [key, value] of Object.entries(query)) {
      if (key === "skip" || key === "limit") {
        delete query[key];
      } else {
        if (key==="startDate"){

          query[key]= {$gte: value} 
        }
        if (key==="endDate"){
          query[key]= {$lte: value}
        }

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
  startDate: Date,
  timeslot: string,
  dayOfWeek: string
) {
  try {
    return await Courses.find({
      $and: [
        { category: category },
        { location: location },
        { startDate: startDate },
        { timeslot: timeslot },
        { dayOfWeek: dayOfWeek },
      ],
    });
  } catch (err) {
    return err;
  }
}

export async function updateCourse(courseId: mongoose.Types.ObjectId, course: Course) {
  try {
    return await Courses.findOneAndUpdate(
      {
        _id: courseId,
      },
      {
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
      },
      {
        returnDocument: "after",
      }
    );
  } catch (err) {
    return err;
  }
}

export async function findCourseById(courseId: mongoose.Types.ObjectId) {
  try {
    return await Courses.findOne({
      _id: courseId,
    });
  } catch (err) {
    return err;
  }
}

export async function deleteCourseById(courseId: mongoose.Types.ObjectId) {
  try {
    return await Courses.findOneAndDelete({
      _id: courseId,
    });
  } catch (err) {
    return err;
  }
}

export async function updateCourseStock(courseId: mongoose.Types.ObjectId, stockToSubstract: number){
  try {
    return await Courses.findOneAndUpdate(
      {
        _id: courseId,
      },
      {
        
        $inc: {stock: -stockToSubstract},
      
      },
      {
        returnDocument: "after",
      }
    );
  } catch (err) {
    return err;
  }
}