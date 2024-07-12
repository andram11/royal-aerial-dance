
import dontenv from "dotenv"
dontenv.config()
import { createClient } from 'redis';

export const client = createClient({
    password: process.env.REDIS_PASSWORD as string,
    socket: {
        host: process.env.REDIS_HOST as string,
        port: parseInt(process.env.REDIS_PORT as string, 10)
    }
});

export async function redisConnect(){
    try{
        await client.connect()
        console.log('Connected to Redis successfully');
    }
    catch (err) {
        console.error('Failed to connect to Redis', err);
      }

}