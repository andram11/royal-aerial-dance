import express, { Request, Response, NextFunction } from "express";
import { httpGetAllUsers } from "./users.controller";

const usersRouter = express.Router();

usersRouter.get("/users/search", httpGetAllUsers);

export default usersRouter;
