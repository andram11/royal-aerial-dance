
//const userSchema = require('../../models/user.mongo')
import {createUser} from '../../models/users/user.model'
import { Request, Response } from "express";

export async function httpCreateUser(req: Request, res: Response){
  const response= await createUser(req.body.username, req.body.password, "local")
  if (!response.errors) {
    res.status(200).json({
      data: {
        userId: response._id,
        username: response.username
      },
     
     message: `User created with ${response.username} and id: ${response._id}`,
     
    });
  } else {
    res.status(400).json({
      error: response,
    });
  }
}
