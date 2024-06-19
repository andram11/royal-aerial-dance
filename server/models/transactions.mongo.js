const mongoose= require('mongoose')

const transactionSchema = new mongoose.Schema({
    //A participant can buy multiple courses with the same payment
    courseId: {
        type: [mongoose.Types.ObjectId],
        required: true

    },
    paymentId: {
        type: String,
        required: true
    }, 
    participantId: {
        type: String,//TO DO mongoose.Types.ObjectId
        required: true
    },
    status: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },

    historyStartDate: {
        type: Date,
        default: new Date()
    },
    historyEndDate: {
        type: Date,
        default: null 
    }
})

module.exports= mongoose.model('Transaction', transactionSchema)