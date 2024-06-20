//Module imports
import dontenv from "dotenv"
dontenv.config()

import fs from 'fs'
import http from 'http'
import https from 'https'


//Config imports
import app from './app'


import {mongoConnect} from './services/mongo'

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
    serverHttps.listen(PORT, ()=> {
        console.log(`Listening on port ${PORT}`)
    })
}


startServer()

