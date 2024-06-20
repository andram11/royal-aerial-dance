import mongoose from 'mongoose'

const coursesSchema= new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ["pole dance", "aerial hoop", "contemporary dance", "yoga", "heels dance", "workshops"]
    },
    title: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        enum: ["beginner", "intermediate", "advanced", "allLevel", "absoluteBeginner"]
    },
    location: {
        type: String,
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    recurrent: {
        type: Boolean
    },
    recurrenceType: {
        type: String,
        enum: ["weekly", "biMonthly", "monthly", "oneTime"]
    },
    timeslot: {
        type: String,
        required: true,
        validate: /[0-9][0-9]:[0-9][0-9]/
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "cancelled", "inactive"]
    }



})


export default mongoose.model('Courses', coursesSchema)