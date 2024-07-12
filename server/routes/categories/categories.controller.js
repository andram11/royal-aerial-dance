//The controller takes in actions from the router and updates/makes changes to the model

const categories = require("../../models/categories/categories.model");
const {
  getFromCache,
  setValueToCache,
} = require("../../services/utils/caching");

async function httpGetAllCategories(req, res) {
  //Check if search query is cached
  const checkCache = await getFromCache("categories");
  if (checkCache) {
    res.status(200).json(checkCache);
  } else {
    //If query not cached, get from DB and cache result
    setValueToCache("categories", categories);
    res.status(200).json(categories);
  }
}

module.exports = {
  httpGetAllCategories,
};
