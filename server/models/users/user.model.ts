
import { ParsedQs } from "qs";
import Users from "./user.mongo";

export async function existsUser(username: string) {
  try {

    return await Users.findOne({
      username: username,
    });
    
  } catch (err){
    return err
  }
   
  }

export async function saveUser(username: string, type: string) {
  try {
    return await Users.create({
      username: username,
      type: type
    })
  } catch(err){
    return err
  }

}

export async function findPasswordResetToken(username: ParsedQs){
  try {
    console.log(username)
    return await Users.findOne({username: username,
    passwordResetToken: {$ne: null} })}
    catch(err){
      return err
    }
}

interface PasswordResetRequest {
  username: any,
  passwordResetToken: string|null,
  tokenCreationTimestamp: Date|null
}

export async function updatePasswordResetToken(updateBody: PasswordResetRequest){

  try {
    return await Users.updateOne(
      { username: updateBody.username },
      { passwordResetToken: updateBody.passwordResetToken, 
        tokenCreationTimestamp: updateBody.tokenCreationTimestamp }
    );

  } catch (err) {
    return err
  }
}

export async function createUser(username: ParsedQs, password: string, type: string){
  try {
      const existsUser= await Users.findOne({
        username: username,
      });
      if (existsUser) {
        return({
          errors: "Username already exists"
        })
      } 
      const newUser = new Users({
        username: username,
        type: type, // Include type when creating the user
      });
  
      return await Users.register(newUser, password);
       
  } catch (err){
      return err
           
  }
}
