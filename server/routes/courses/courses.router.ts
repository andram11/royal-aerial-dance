import express, {Request, Response, NextFunction} from 'express'

const coursesRouter = express.Router();

import {
  httpCreateCourse,
  httpSearchCourses,
  httpUpdateCourse,
  httpFindCourseById,
  httpDeleteCourseById,
  httpCheckCourseStock
} from "../../routes/courses/courses.controller";
import { checkLoggedIn } from '../../services/utils/checkLoggedIn';




coursesRouter.get('/courses/search',httpSearchCourses)
coursesRouter.get('/courses/:id', httpFindCourseById)
coursesRouter.get("/courses/stock/:id", httpCheckCourseStock)
coursesRouter.post("/courses", checkLoggedIn, httpCreateCourse);
coursesRouter.put("/courses/:id",  httpUpdateCourse)
coursesRouter.delete("/courses/:id", checkLoggedIn, httpDeleteCourseById)

export default coursesRouter;
