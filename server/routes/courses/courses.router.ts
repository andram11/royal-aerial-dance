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

function checkLoggedIn(req: Request, res: Response, next:NextFunction) {
  const isLoggedIn= true
  if (!isLoggedIn){
      return res.status(401).json({
          error: 'You must first log in!'
      })
  }

  next()
}

coursesRouter.get('/courses/search', checkLoggedIn, httpSearchCourses)
coursesRouter.get('/courses/:id', httpFindCourseById)
coursesRouter.get("/courses/stock/:id", httpCheckCourseStock)
coursesRouter.post("/courses", httpCreateCourse);
coursesRouter.put("/courses/:id", httpUpdateCourse)
coursesRouter.delete("/courses/:id", httpDeleteCourseById)

export default coursesRouter;
