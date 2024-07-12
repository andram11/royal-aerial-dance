const express= require('express')


const categoriesRouter= express.Router()


const {httpGetAllCategories}= require('../../routes/categories/categories.controller')
categoriesRouter.get('/categories', httpGetAllCategories)

module.exports= categoriesRouter