import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    //A participant can buy multiple courses and pay at the same time for all
    courseDetails: [ {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Courses',
            required: true
    
        },
        quantity : {
            type: Number
        }
}],
    paymentId: {
        type: String,
        required: true
    }, 
    participantDetails: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
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
            required: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }
    },
    status: {
        type: String,
        required: true,
        enum: ["initiated", "failed", "succeeded", "deleted"]
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