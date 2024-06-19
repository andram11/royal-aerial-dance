//Module Imports
import dontenv from "dotenv"
dontenv.config()

import cookie from 'cookie-session'


const cookieSession= cookie({
        name: 'session',
        maxAge: 24*60*60*1000,//1h in miliseconds
        keys: [process.env.COOKIE_KEY_1 as string,process.env.COOKIE_KEY_2 as string]
})



export default cookieSession
