const mongoose= require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema= new mongoose.Schema({
    //Username is the registration email address
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (value) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
          },

    },

    passwordResetToken: {
      //applicable only for password reset
      type: String,
      required: false 
    },

    tokenCreationTimestamp: {
      type: Date, 
      required: false, 
      expires: 3600 // expiry time in seconds 
    }
    
})


//Passport plugin
userSchema.plugin(passportLocalMongoose)

module.exports= mongoose.model('Users', userSchema)