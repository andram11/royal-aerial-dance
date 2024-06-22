//The controller takes in actions from the router and updates/makes changes to the model
import { Request, Response } from "express";
import {
  createCourse,
  deleteCourseById,
  existsConcurrentCourse,
  findCourseById,
  searchCourses,
  updateCourse
} from "../../models/courses/courses.model";
import getPagination from "../../services/query";
import { getDayOfWeek } from "../../services/utils/getDay";

export async function httpSearchCourses(req: Request, res: Response) {
    //Calculate proper pagination parameters
  const { skip, limit } = getPagination(
    Number(req.query.skip),
    Number(req.query.limit)
  );
  const response = await searchCourses(skip, limit, req.query);
  if (!response.errors) {
    res.status(200).json({
      totalItems: response.length,
      skippedItems: skip,
      pageLimit: limit,
      items: response,
    });
  } else {
    res.status(400).json({
      error: response.message,
    });
  }
}

export async function httpCreateCourse(req: Request, res: Response) {
  const course = req.body;
  //Check if dayOfWeek is correct for the given date
  const confirmDayOfWeek= getDayOfWeek(course.startDate)
  if (confirmDayOfWeek !==course.dayOfWeek) {
    res.status(400).json({
        error:
          "Provided date doesn't correspond to provided day of the week.",
      });
  }
    //Check if a course doesn't already exist for combination location, startDate, timeslot and category
    const existsCourse = await existsConcurrentCourse(
        course.category,
        course.location,
        course.startDate,
        course.timeslot,
        course.dayOfWeek
      );

  if (existsCourse) {
    res.status(400).json({
      error:
        "A course of the same type exists already at the specified time and location.",
    });
  } else {
    //Else create new course
    const response = await createCourse(course);
    if (!response.errors) {
      res.status(201).json(response);
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
  }
}

export async function httpUpdateCourse(req: Request, res:Response){
    const courseId= req.params.id
    const course= req.body
     //Check if dayOfWeek is correct for the given date
  const confirmDayOfWeek= getDayOfWeek(course.startDate)
  if (confirmDayOfWeek !==course.dayOfWeek) {
    res.status(400).json({
        error:
          "Provided date doesn't correspond to provided day of the week.",
      });
  }
    //Update course
    const response = await updateCourse(courseId, course);
    if (!response.errors) {
      res.status(200).json(response);
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
  
    
}

export async function httpFindCourseById(req:Request, res:Response){
    const courseId= req.params.id
    const response= await findCourseById(courseId)
    if (!response.errors) {
        res.status(200).json(response);
      } else {
        res.status(400).json({
          error: response.message,
        });
      }
}

export async function httpDeleteCourseById(req:Request, res:Response){
    const courseId= req.params.id
    const response= await deleteCourseById(courseId)
    if (!response.errors) {
        res.status(200).json({message: "Course with id " + response._id + " has been successfully deleted."
        });
      } else {
        res.status(400).json({
          error: response.message,
        });
      }
}