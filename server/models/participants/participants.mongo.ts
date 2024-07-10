import mongoose from 'mongoose'

const participantsSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        
    },
    lastName: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // courseId: {
    //     type: [ mongoose.Schema.Types.ObjectId],
    //     ref: 'Courses',
    //     required: true
    // }
})


export default mongoose.model('Participants', participantsSchema)