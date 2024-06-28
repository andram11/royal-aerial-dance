import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    //A participant can buy multiple courses and pay at the same time for all
    courseId: {
        type: [ mongoose.Schema.Types.ObjectId],
        ref: 'Courses',
        required: true

    },
    paymentId: {
        type: String,
        required: true
    }, 
    participantId: {
        type: [ mongoose.Schema.Types.ObjectId],
        ref: 'Participants',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["initiated", "failed", "success", "deleted"]
    },
    paymentMethod: {
        type: String,
        required: true
    },

    historyStartDate: {
        type: Date,
        default: Date.now
    },
    historyEndDate: {
        type: Date,
        default: null 
    }
})

export default mongoose.model('Transactions', transactionSchema)