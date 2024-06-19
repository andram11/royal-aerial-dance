import mongoose from 'mongoose'

const coursesSchema= new mongoose.Schema({
    category: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
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
        enum: ["weekly", "biMonthly", "monthly"]
    },
    timeslot: {
        type: String,
        required: true
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
        required: true
    }



})


export default mongoose.model('Courses', coursesSchema)