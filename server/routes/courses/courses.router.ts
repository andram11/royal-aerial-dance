import express from "express";

const coursesRouter = express.Router();

import {
  httpCreateCourse,
  httpSearchCourses,
  httpUpdateCourse,
  httpFindCourseById,
  httpDeleteCourseById
} from "../../routes/courses/courses.controller";

coursesRouter.get('/courses/search', httpSearchCourses)
coursesRouter.get('/courses/:id', httpFindCourseById)
coursesRouter.post("/courses", httpCreateCourse);
coursesRouter.put("/courses/:id", httpUpdateCourse)
coursesRouter.delete("/courses/:id", httpDeleteCourseById)

export default coursesRouter;
