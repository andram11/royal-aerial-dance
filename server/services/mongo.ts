import dontenv from "dotenv"
dontenv.config()
import mongoose from 'mongoose'

const MONGO_URL= process.env.MONGO_CONNECTION_STRING as string

//Mongoose connection will open once
mongoose.connection.once('open', ()=> {
    console.log('MongoDb connection ready...')
})

mongoose.connection.on('error', (err)=> {
    console.error(err)
})

export async function mongoConnect(){
    await mongoose.connect(MONGO_URL)

}

export async function mongoDisconnect(){
    await mongoose.disconnect()
}

