require("dotenv").config();

//Token encryption/decryption
import crypto from "crypto";
import bcrypt from "bcryptjs";

//User model
const {existsUser, updatePasswordResetToken, findPasswordResetToken }=require("../models/user.model")
//Email service
import sendEmail from '../services/email/email'



//Handle redirects for Google login
export function saveRedirectLink(redirectLink: string, oauth2return: string ){
    // Save the url of the user's current page so the app can redirect back to it after authorization
  if (redirectLink) {
    
    oauth2return = redirectLink || "/";
  }
}

//Forgot password
export async function forgotPassword(username: string) {
    //Does user exist?
 const user = await existsUser(username);
 if (!user) return({error: "Username email does not exist."});

 //Does user already have a reset token ?
 const token = await findPasswordResetToken(username);
 //if yes, we remove the existing reset token (by setting the field to empty/null)
 if (token)
   await updatePasswordResetToken({
     username: username,
     passwordResetToken: null,
     tokenCreationTimestamp: null,
   });

 //Create a new reset token
 let resetToken = crypto.randomBytes(32).toString("hex");
 const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

 //Store the new reset token together with the user details in the User model
 await updatePasswordResetToken({
   username: username,
   passwordResetToken: hash,
   tokenCreationTimestamp: Date.now(),
 });

 //Create the reset link to send to the user by email
 const resetLink = `${process.env.CLIENT_URL}/auth/resetPassword?token=${resetToken}&username=${user.username}`;
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

}
 
//Reset password 
export async function resetPassword(username: string, token: string, password: string){
   //Check if provided email address (username) exists
   const user = await existsUser(username);
   if (!user) return ({message: "Username email does not exist."});
 
   //Check if a reset token exists for the provided username
   const passwordResetToken = await findPasswordResetToken(username);
   if (passwordResetToken==='') {
    return({message: "Invalid or expired password reset token"});
   }
 
   //Check if token stored in the DB for the username correspond to the one provided in the request
   const isTokenValid = await bcrypt.compare(
     token,
     passwordResetToken.passwordResetToken
   );
   if (!isTokenValid) {
    return({message: "Invalid or expired password reset token"});
   }
 
   //Reset user password using passport mongoose plugin (setPassword function is usually used for forgot password use cases)
   await user.setPassword(password);
   const userSaved = await user.save();
   if (!userSaved) {
    return ({message: "Password could not be reset. Please try again later."});
   }
 
   //Send email to confirm successful password reset
   const response = await sendEmail(
     username,
     "Password Reset Successfully",
     { name: username },
     "./templates/resetPassword.handlebars"
   );
 
   //Remove (set to null) the token from the DB
   await updatePasswordResetToken({
     username: username,
     passwordResetToken: '',
     tokenCreationTimestamp: null,
   });
 
   //Return response
   return ({
     message: "Password changed successfully.",
     testPreviewLink: response,
   });
}

