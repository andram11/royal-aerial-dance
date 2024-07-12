import mongoose from 'mongoose'
import  passportLocalMongoose from 'passport-local-mongoose'

const userSchema= new mongoose.Schema({
    //Username is the registration email address
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },

    passwordResetToken: {
      //applicable only for password reset
      type: String,
      required: false 
    },

    tokenCreationTimestamp: {
      type: Date, 
      required: false, 
    }
    
})


//Passport plugin
userSchema.plugin(passportLocalMongoose)

export default mongoose.model('Users', userSchema)