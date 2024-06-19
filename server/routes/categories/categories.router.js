const express= require('express')


const categoriesRouter= express.Router()


const {getAllCategories}= require('../../routes/categories/categories.controller')
categoriesRouter.get('/categories', getAllCategories)

module.exports= categoriesRouter