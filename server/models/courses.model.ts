
import Courses from './courses.mongo';
import { Course } from '../types';

//Data access layer - to avoid exposing how the consumer has to interact with the data, instead just serving the data
  export async function getAllAvailableCourses(skip: number, limit: number){
      return await Courses.find({
        stock: {$gte: 0}
      }, {'__v':0})
      .sort()
      .skip(skip)
      .limit(limit);
    }

 export async function createCourse(course: Course) {
     try {
      await Courses.create({
        //title;level;location;dayOfWeek;timeslot
        title: course.title,
        location: course.location,
        level: course.level,
        dayOfWeek: course.dayOfWeek,
        timeslot: course.timeslot,
        price: course.price,
        stock: course.stock,
        teacher: course.teacher,
        status: course.status

      })
     } catch(err) {
      return err
     }
    }

export async function checkCourseStock(courseId, quantity){
      return await Courses.findOne({
        _id: courseId,
        stock:{$gte: quantity}
      })
    }

export async function existsCourse(courseId){
      return await Courses.findOne({
        _id: courseId,
      
      });
    }
  module.exports = {

    getAllAvailableCourses,
    existsCourse,
    checkCourseStock

  }

  
