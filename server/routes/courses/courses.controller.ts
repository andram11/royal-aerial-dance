//The controller takes in actions from the router and updates/makes changes to the model
import mongoose, {Types} from 'mongoose'
import { Request, Response } from "express";
import {
  createCourse,
  deleteCourseById,
  findCourseById,
  searchCourses,
  updateCourse,
} from "../../models/courses/courses.model";
import getPagination from "../../services/query";

import { checkCourseCreation,checkCourseUpdate, } from "../../services/courses/courseBusinessRules";

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
  const response = await findCourseById(courseId);
  if (!response.errors) {
    res.status(200).json(response);
  } else {
    res.status(400).json({
      error: response.message,
    });
  }
}

export async function httpDeleteCourseById(req: Request, res: Response) {
  const courseId = new mongoose.Types.ObjectId(req.params.id) as Types.ObjectId;
  const response = await deleteCourseById(courseId);
  if (!response.errors) {
    res
      .status(200)
      .json({
        message:
          "Course with id " + response._id + " has been successfully deleted.",
      });
  } else {
    res.status(400).json({
      error: response.message,
    });
  }
}
