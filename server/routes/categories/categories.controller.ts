import { Request, Response } from "express";
import categories from "../../models/categories/categories.model";
import {
  getFromCache,
  setValueToCache,
} from "../../services/utils/caching";

async function httpGetAllCategories(req: Request, res: Response): Promise<void> {
  try {
    // Check if search query is cached
    const checkCache = await getFromCache("categories");
    if (checkCache) {
      res.status(200).json(checkCache);
    } else {
      // If query not cached, get from DB and cache result
      await setValueToCache("categories", categories);
      res.status(200).json(categories);
    }
  } catch (error) {
    // Handle potential errors
    res.status(500).json({ error: "Failed to retrieve categories." });
  }
}

export { httpGetAllCategories };
