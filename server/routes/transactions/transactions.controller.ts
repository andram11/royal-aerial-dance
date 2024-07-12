//The controller takes in actions from the router and updates/makes changes to the model
import mongoose, { Types } from "mongoose";
import { Request, Response } from "express";
import qs from 'qs'
import {
  searchTransactions,
  createTransaction,
  findTransactionById,
  getTransactionsForCourseId
} from "../../models/transactions/transactions.model";

import getPagination from "../../services/query";
import {
  getFromCache,
  setValueToCache,
} from "../../services/utils/caching";


export async function httpSearchTransactions(req: Request, res: Response) {
  //Calculate proper pagination parameters
  const { skip, limit } = getPagination(
    Number(req.query.skip),
    Number(req.query.limit)
  );
  
  //Check if search query is cached
  const query = qs.stringify(req.query);
  const checkCache = await getFromCache(query);
  if (checkCache) {
    res.status(200).json(checkCache);
  } else {
    //If query not cached, get from DB and cache results
    const response = await searchTransactions(skip, limit, req.query);
    setValueToCache(query, response);
    if (!response.errors) {
      res.status(200).json({
        totalItems: response.length,
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
}

export async function httpCreateNewTransaction(req: Request, res: Response) {
    //Create transaction
    const response = await createTransaction(req.body);
    if (!response.errors) {
      res.status(201).json(response);
    } else {
      res.status(400).json({
        error: response.message,
      });
    }
}

export async function httpFindTransactionById(req: Request, res: Response) {
  const transactionId = new mongoose.Types.ObjectId(
    req.params.id
  ) as Types.ObjectId;
   //Check if course is cached
   const checkCache = await getFromCache(req.params.id);
   if (checkCache) {
     //console.log('cache hit')
     res.status(200).json(checkCache);
   } else {
     //If course not cached, get from DB and cache it
     const response = await findTransactionById(transactionId);
     setValueToCache(req.params.id, response);
     //console.log('cache miss')
     if (!response.errors) {
       res.status(200).json(response);
     } else {
       res.status(400).json({
         error: response.message,
       });
     }
   }

}

export async function httpSearchTransactionByCourseId(req: Request, res: Response){
  const courseId = new mongoose.Types.ObjectId(
    req.params.id
  ) as Types.ObjectId;
  //Calculate proper pagination parameters
  const { skip, limit } = getPagination(
    Number(req.query.skip),
    Number(req.query.limit)
  );

    //Check if search query is cached
    const checkCache = await getFromCache(req.params.id);
    if (checkCache) {
      res.status(200).json(checkCache);
    } else {
      //If query not cached, get from DB and cache results
      const response = await getTransactionsForCourseId(skip, limit, courseId, qs.stringify(req.query.status));
      console.log(response)
      setValueToCache(req.params.id, response);
      if (!response.errors) {
        res.status(200).json({
          totalItems: response.length,
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

}