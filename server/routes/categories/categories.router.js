const express= require('express')


const categoriesRouter= express.Router()


const {hhtGetAllCategories}= require('../../routes/categories/categories.controller')
categoriesRouter.get('/categories', hhtGetAllCategories)

module.exports= categoriesRouter