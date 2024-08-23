import express from 'express';
import { httpGetAllCategories } from './categories.controller';

const categoriesRouter = express.Router();

// Define the route with TypeScript typing
categoriesRouter.get('/categories', httpGetAllCategories);

export default categoriesRouter;
