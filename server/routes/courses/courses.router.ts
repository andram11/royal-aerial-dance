import express from 'express'


const coursesRouter= express.Router()


import {httpCreateCourse} from '../../routes/courses/courses.controller'

//coursesRouter.get('/courses', httpGetAllCourses)
coursesRouter.post('/courses', httpCreateCourse)

export default coursesRouter