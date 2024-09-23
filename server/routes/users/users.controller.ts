import { Request, Response } from "express";

import { getAllUsers } from "../../models/users/user.model";

export async function httpGetAllUsers(req: Request, res: Response) {
      //Get pagination parameters
    const skip= Number(req.query.skip)
    const limit= Number(req.query.limit)
    //Get total number of items 
    const totalItems=await getAllUsers(0,0)
    const response= await getAllUsers(skip, limit)

    if (!response.errors) {
        res.status(200).json({
            totalItems: totalItems.length,
            skippedItems: skip,
            pageLimit: limit,
            items: response,
          });
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
  }