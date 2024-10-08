//The controller takes in actions from the router and updates/makes changes to the model
import mongoose, { Types } from "mongoose";
import { Request, Response } from "express";
import qs from 'qs'
import {
  searchTransactions,
  createTransaction,
  findTransactionById,
  getTransactionsForCourseId,
  deleteTransaction
} from "../../models/transactions/transactions.model";

import { updateCourseStock, checkCourseStock } from "../../models/courses/courses.model";

import getPagination from "../../services/query";
import {
  deleteKeyFromCache,
  getFromCache,
  setValueToCache,
} from "../../services/utils/caching";


export async function httpSearchTransactions(req: Request, res: Response) {
  //Get pagination parameters
  const skip= Number(req.query.skip)
  const limit= Number(req.query.limit)
  

  //Check if search query is cached
  const query = qs.stringify(req.query);
  // const checkCache = await getFromCache(query);
  // if (checkCache) {
  //   res.status(200).json(checkCache);
  // } else {
    //If query not cached, get from DB and cache results

    //Get total number of items 
    const totalItems=await searchTransactions(0,0,{})
    const response = await searchTransactions(skip, limit, req.query);

    setValueToCache(query, response);
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


export async function httpCreateNewTransaction(req: Request, res: Response) {
  try {

    if (req.body.status==="succeeded"){
       // First, check stock for each course in the request
    for (const course of req.body.courseDetails) {
      const stockResponse = await checkCourseStock(course.courseId);
      
      // Check if the stock is sufficient
      if (stockResponse.stock < course.quantity) {
        return res.status(400).json({
          error: `Not enough stock available for course ID ${course.courseId}`,
        });
      }
    }

    // If stock is sufficient for all courses, create the transaction
    const response = await createTransaction(req.body);

    if (response.errors) {
      return res.status(400).json({
        error: response.message,
      });
    }

    // If transaction creation is successful, update stock for each course
    for (const course of req.body.courseDetails) {
      await updateCourseStock(course.courseId, course.quantity);
    }

    return res.status(201).json(response);

    } else {

      const response = await createTransaction(req.body);

    if (response.errors) {
      return res.status(400).json({
        error: response.message,
      });
    }

    return res.status(201).json(response);
    }
   
  } catch (err) {
   // console.log(err)
    return res.status(500).json({
      error: "An error occurred while creating the transaction.",
      details: err.error,
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

      const response = await getTransactionsForCourseId(skip, limit, courseId, qs.stringify(req.query.status));
 
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

export async function httpDeleteTransactionById(req: Request, res: Response) {
      const transactionId = new mongoose.Types.ObjectId(req.params.id) as Types.ObjectId;
      const response = await deleteTransaction(transactionId);
      if (!response.errors) {
        //Remove key from cache
        deleteKeyFromCache(req.params.id);
        res.status(200).json({
          message:
            "Transaction with id " + response._id + " has been successfully deleted.",
        });
      } else {
        res.status(400).json({
          error: response.message,
        });
      }
    }
