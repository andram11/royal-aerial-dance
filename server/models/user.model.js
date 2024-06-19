
const users = require("./user.mongo");

async function existsUser(username) {
    return await users.findOne({
      username: username,
    });
  }

async function saveUser(username) {
  return await users.create({
    username: username
  })
}

async function findPasswordResetToken(username){
  return await users.findOne({username: username,
    passwordResetToken: {$ne: null} })
}

async function updatePasswordResetToken(updateBody){

  try {
    const response = await users.updateOne(
      { username: updateBody.username },
      { passwordResetToken: updateBody.passwordResetToken, 
        tokenCreationTimestamp: updateBody.tokenCreationTimestamp }
    );
    return response;
  } catch (err) {
    return err
  }
}

async function createUser(username, password){
  if (!username || !password){
    return ({
       error: 'Missing required properties.'
    })
}
  const userExists = await existsUser(username)
  if (userExists) {
    return ({error: "Username already exists."})
  }

  try {
      const userRegistration= await users.register(
          new users({ 
            username: username 
          }), password
        )
        return ({message: "Registration successful. User created with id: "+ userRegistration._id})
  } catch (err){
      return ({ error: err})
           
  }
}

module.exports= {
    existsUser,
    findPasswordResetToken, 
    updatePasswordResetToken,
    saveUser,
    createUser
}