
//const userSchema = require('../../models/user.mongo')
const {createUser}= require('../../models/user.model')

async function httpCreateUser(req, res){
  const handleUserCreation= await createUser(req.body.username, req.body.password)

  return res.json(handleUserCreation)
}


module.exports= {
    httpCreateUser
}