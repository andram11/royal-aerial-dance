import express, { Request, Response, NextFunction } from "express";
import { httpGetAllUsers } from "./users.controller";
import { checkLoggedIn } from "../../services/utils/checkLoggedIn";

const usersRouter = express.Router();

usersRouter.get("/users/search", checkLoggedIn, httpGetAllUsers);

export default usersRouter;
