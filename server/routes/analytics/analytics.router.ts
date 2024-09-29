import express, { Request, Response, NextFunction } from "express";
import { httpGetAnalytics } from "./analytics.controller";
import { checkLoggedIn } from "../../services/utils/checkLoggedIn";

const analyticsRouter = express.Router();

analyticsRouter.get("/analytics", checkLoggedIn, httpGetAnalytics);

export default analyticsRouter;
