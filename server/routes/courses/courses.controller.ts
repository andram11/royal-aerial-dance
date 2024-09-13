//The controller takes in actions from the router and updates/makes changes to the model
import mongoose, { Types } from "mongoose";
import { Request, Response } from "express";
import {
  createCourse,
  deleteCourseById,
  findCourseById,
  searchCourses,
  updateCourse,
  checkCourseStock,
} from "../../models/courses/courses.model";
import getPagination from "../../services/query";
import {
  getFromCache,
  setValueToCache,
  deleteKeyFromCache,
} from "../../services/utils/caching";
import qs from "qs";
import {
  checkCourseCreation,
  checkCourseUpdate,
} from "../../services/courses/courseBusinessRules";

export async function httpSearchCourses(req: Request, res: Response) {
  //Get pagination parameters
  const skip= Number(req.query.skip)
  const limit= Number(req.query.limit)
  // //Check if search query is cached
  const query = qs.stringify(req.query);
  // const checkCache = await getFromCache(query);
  // if (checkCache) {
  //   res.status(200).json(checkCache);
  // } else {
    //If query not cached, get from DB and cache results
    //Get total number of items 
    const totalItems=await searchCourses(0,0,{})
    //Get courses based on course criteria
    const response = await searchCourses( skip, limit, req.query);
    setValueToCache(query, {
      totalItems: totalItems.length,
      skippedItems: skip,
      pageLimit: limit,
      items: response,
    });
    if (!response.errors) {
      res.status(200).json({
        totalItems: totalItems.length,
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
  //Check business rules for course creation
  const checkCourse = await checkCourseCreation(course);
  //If no errors create course in DB
  if (!checkCourse) {
    const response = await createCourse(course);
    if (!response.errors) {
      res.status(201).json(response);
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
  } else {
    res.status(400).json(checkCourse);
  }
}

export async function httpUpdateCourse(req: Request, res: Response) {
  const courseId = new mongoose.Types.ObjectId(req.params.id) as Types.ObjectId;
  const course = req.body;
  console.log(course)
  //Check business rules for course update
  const checkCourse = await checkCourseUpdate(course);
  //Update course
  if (!checkCourse) {
    const response = await updateCourse(courseId, course);
    if (!response.errors) {
      res.status(201).json(response);
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
  } else {
    res.status(400).json(checkCourse);
  }
}

export async function httpFindCourseById(req: Request, res: Response) {
  const courseId = new mongoose.Types.ObjectId(req.params.id) as Types.ObjectId;

  //Check if course is cached
  const checkCache = await getFromCache(req.params.id);
  if (checkCache) {
    //console.log('cache hit')
    res.status(200).json(checkCache);
  } else {
    //If course not cached, get from DB and cache it
    const response = await findCourseById(courseId);
    setValueToCache(req.params.id, response);
    //console.log('cache miss')
    if (!response.errors) {
      res.status(200).json(response);
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
  }
}

export async function httpDeleteCourseById(req: Request, res: Response) {
  const courseId = new mongoose.Types.ObjectId(req.params.id) as Types.ObjectId;
  const response = await deleteCourseById(courseId);
  if (!response.errors) {
    //Remove key from cache
    deleteKeyFromCache(req.params.id);
    res.status(200).json({
      message:
        "Course with id " + response._id + " has been successfully deleted.",
    });
  } else {
    res.status(400).json({
      error: response.message,
    });
  }
}

export async function httpCheckCourseStock(req: Request, res: Response) {
  if (req.query.quantity) {
    const courseId = new mongoose.Types.ObjectId(
      req.params.id
    ) as Types.ObjectId;
    const response = await checkCourseStock(courseId);
    if (!response.errors) {
      if (response.stock >= req.query.quantity) {
        res.status(200).json({
          message: "Requested quantity available in stock.",
        });
      } else {
        res.status(200).json({
          message: "Requested quantity not available in stock.",
        });
      }
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
  } else {
    res.status(400).json({
      error: "Mandatory query parameter 'quantity' not provided",
    });
  }
}
