//The controller takes in actions from the router and updates/makes changes to the model
import {Request, Response} from 'express'
import { createCourse, existsConcurrentCourse} from '../../models/courses/courses.model'


// async function httpGetAllCourses(req, res){
//    return res.status(200).json(await getAllAvailableCourses())
// }

export async function httpCreateCourse(req: Request, res: Response){
    const course= req.body
    //Check if a course doesn't already exist for combination location, startDate, timeslot and category
    const existsCourse= await existsConcurrentCourse(course.category, course.location, course.startDate, course.timeslot, course.dayOfWeek)
    if (existsCourse) {
        res.status(400).json({
            error: "A course of the same type exists already at the specified time and location."
        })
    } else {
        //Else create new course
    const response= await createCourse(course)
    if (!response.errors) {
        res.status(201).json(response)
    }
    else {
        res.status(400).json({
            error: response.message
        })
    }
    }
    
    
}
