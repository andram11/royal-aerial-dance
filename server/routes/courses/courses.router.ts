import express from "express";

const coursesRouter = express.Router();

import {
  httpCreateCourse,
  httpSearchCourses,
} from "../../routes/courses/courses.controller";

coursesRouter.get('/courses/search', httpSearchCourses)
coursesRouter.post("/courses", httpCreateCourse);

export default coursesRouter;
