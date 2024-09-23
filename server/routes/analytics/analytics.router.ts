import express, { Request, Response, NextFunction } from "express";
import { httpGetAnalytics } from "./analytics.controller";

const analyticsRouter = express.Router();

analyticsRouter.get("/analytics", httpGetAnalytics);

export default analyticsRouter;
