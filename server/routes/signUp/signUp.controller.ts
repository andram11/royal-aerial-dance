
//const userSchema = require('../../models/user.mongo')
import {createUser} from '../../models/users/user.model'
import { Request, Response } from "express";

export async function httpCreateUser(req: Request, res: Response){
  const response= await createUser(req.body.username, req.body.password)
  if (!response.errors) {
    res.status(200).json({
     userId: response._id,
     message: `User created with ${response.username} and id: ${response._id}`,
     
    });
  } else {
    res.status(400).json({
      error: response,
    });
  }
}
