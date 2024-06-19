//Module imports
import dontenv from "dotenv"
dontenv.config()

import fs from 'fs'
import http from 'http'
import https from 'https'


//Config imports
import app from './app'


//TO DO
const {mongoConnect} = require('./services/mongo')
//File upload for courses
const {loadCoursesData}= require('./models/courses.model')

const PORT= process.env.PORT as string

//Create http server
const server = http.createServer(app)
//Create https server identical to http server
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')

}
const serverHttps= https.createServer(options, app)



async function startServer() {
    await mongoConnect()
    await loadCoursesData()

    serverHttps.listen(PORT, ()=> {
        console.log(`Listening on port ${PORT}`)
    })
}


startServer()

