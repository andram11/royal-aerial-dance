const express= require('express')


const coursesRouter= express.Router()


const {httpGetAllCourses, httpDeleteCourse, httpCreateCourse}= require('../../routes/courses/courses.controller')

coursesRouter.get('/courses', httpGetAllCourses)
coursesRouter.post('/courses', httpCreateCourse)

module.exports= coursesRouter