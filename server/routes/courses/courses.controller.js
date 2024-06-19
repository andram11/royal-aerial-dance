//The controller takes in actions from the router and updates/makes changes to the model

const {getAllAvailableCourses,  createCourse}= require('../../models/courses.model')


async function httpGetAllCourses(req, res){
   return res.status(200).json(await getAllAvailableCourses())
}

async function httpCreateCourse(req, res){
    const course= req.body

    if (!course.category || 
        !course.title || 
        !course.level || 
        !course.location ||
        !course.dayOfWeek ||
        !course.timeslot ||
        !course.price ||
        !course.stock ||
        !course.teacher ||
        !course.status ){
        return res.status(400).json({
            error: 'Missing required properties'
        })
    }

    createCourse(course)
    res.status(201).json(course)
}


module.exports = {
    httpGetAllCourses,
    httpCreateCourse
    
}