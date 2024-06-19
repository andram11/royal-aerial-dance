//The controller takes in actions from the router and updates/makes changes to the model

const categories= require('../../models/categories.model')

function getAllCategories(req, res){
   return res.status(200).json(categories)
}

module.exports = {
    getAllCategories,
}