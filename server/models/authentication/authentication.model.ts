import dontenv from "dotenv"
dontenv.config()
import { ParsedQs } from 'qs';
import qs from 'qs'

//Token encryption/decryption
import crypto from "crypto";
import bcrypt from "bcryptjs";

//User model
import {existsUser, updatePasswordResetToken, findPasswordResetToken } from "../users/user.model"
//Email service
import sendEmail from '../../services/email/email'

//Forgot password
export async function forgotPassword(username: string) {
  try {
       //Does user exist?
     
 const user = await existsUser(username);

 if (!user) return({error: "Username email does not exist."});

 //Does user already have a reset token ?
 const token = await findPasswordResetToken(qs.parse(username));
 //if yes, we remove the existing reset token (by setting the field to empty/null)
 if (token){
  await updatePasswordResetToken({
    username: username,
    passwordResetToken: null,
    tokenCreationTimestamp: null,
  });
 }
   

 //Create a new reset token
 let resetToken = crypto.randomBytes(32).toString("hex");
 const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

 //Store the new reset token together with the user details in the User model
 await updatePasswordResetToken({
   username: username,
   passwordResetToken: hash,
   tokenCreationTimestamp: new Date(),
 });

 //Create the reset link to send to the user by email
 const resetLink = `${process.env.CLIENT_CALL_BACK_RESET_PASS}?token=${resetToken}&username=${user.username}`;
 //Send the email to the user with the new reset token
 const response = await sendEmail(
   username,
   "Password Reset Request",
   { name: username, link: resetLink },
   "./templates/requestResetPassword.handlebars"
 );

 //Since this is using a fake email provider, for testing purposes, we return a preview of how the reset password email would look like
 //In a production environment, we would just return the message
 return ({
   message: "Forgot password link sent to the provided email.",
   testPreviewLink: response,
 });

  } catch (err) {
    return err
  }
 
}
 
//Reset password 
export async function resetPassword(query: ParsedQs){
    try {
       //Check if provided email address (username) exists

   const user = await existsUser(query.username as string);
   console.log(user)
   if (!user) return ({message: "Username email does not exist."});
 
   //Check if a reset token exists for the provided username
   const passwordResetToken = await findPasswordResetToken(query.username as ParsedQs);
   const now= new Date()
   const maxAge = 1 * 60 * 60 * 1000
   if (passwordResetToken===''|| now.getTime()- passwordResetToken.tokenCreationTimestamp.getTime() > maxAge) {
    return({message: "Invalid or expired password reset token"});
   }
 
   //Check if token stored in the DB for the username correspond to the one provided in the request
   if (typeof query.token==='string'){
    const isTokenValid = await bcrypt.compare(
      query.token,
      passwordResetToken.passwordResetToken
    );
    if (!isTokenValid) {
      return({message: "Invalid or expired password reset token"});
     }
   } else {
    return({message: "Invalid or expired password reset token"});
   }
 
   //Reset user password using passport mongoose plugin (setPassword function is usually used for forgot password use cases)
   console.log(await user.setPassword(query.password));
   const userSaved = await user.save();
   console.log(userSaved)
   if (!userSaved) {
    return ({message: "Password could not be reset. Please try again later."});
   }
 
   //Send email to confirm successful password reset

   const response = await sendEmail(
     query.username,
     "Password Reset Successfully",
     { name: query.username },
     "./templates/resetPassword.handlebars"
   );
 
   //Remove (set to null) the token from the DB
   await updatePasswordResetToken({
     username: query.username,
     passwordResetToken: '',
     tokenCreationTimestamp: null,
   });
 
   //Return response
   return ({
     message: "Password changed successfully.",
     testPreviewLink: response,
   });
    } catch(err) {
      return err
    }
  
}

