import {client as redisClient} from '../../services/redis'


let results= null 

export async function getFromCache(key:string) {
    const value= await redisClient.get(key)
    if (value) {
        results = JSON.parse(value);
        console.log(results)
        return results 
    } else {
        return null 
    }

}

export async function setValueToCache(key:string, value: object):Promise<void> {
    redisClient.setEx(key, 300, JSON.stringify(value))
}