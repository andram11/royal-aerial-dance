import { Request, Response } from "express";
import { getRevenueByDimension } from "../../models/analytics/analytics.model";
import mongoose from "mongoose";
import qs from "qs";

export async function httpGetAnalytics(req: Request, res: Response) {
    const dimension = req.query.dimension as string || '';
    const response = await getRevenueByDimension(dimension);
    if (!response.errors) {
      res.status(200).json(response);
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
  }