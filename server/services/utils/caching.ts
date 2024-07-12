import { client as redisClient } from "../../services/redis";

let results = null;

export async function getFromCache(key: string) {
  const value = await redisClient.get(key);
  if (value) {
    results = JSON.parse(value);
    return results;
  } else {
    return null;
  }
}

export async function setValueToCache(
  key: string,
  value: object
): Promise<void> {
  //Value is stored in cache for 24h
  redisClient.setEx(key, 24 * 3600, JSON.stringify(value));
}

export async function deleteKeyFromCache(key: string) {
  const value = await redisClient.get(key);
  if (value) {
    await redisClient.del(key);
  } else {
    return null;
  }
}
