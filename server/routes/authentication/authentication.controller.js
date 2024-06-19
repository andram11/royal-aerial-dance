//The controller takes in actions from the router and updates/makes changes to the model
require("dotenv").config();
const passport = require("passport");

const {saveRedirectLink, forgotPassword}= require('../../models/authentication.model')

function httpHandleLogout(req, res, next) {
  console.log(req.isAuthenticated())
  console.log(req)
  if(req.isAuthenticated()){
      req.session= null

      return res.status(200).json({ message: "Logout successful." })
      
    }
    
    else {
      req.session= null
      res.status(400).json({message: "There was an error."})
     
  }
}

//Google login handlers
function httpHandleGoogleLogin(req, res, next) {
  //Testing purposes: If a redirect url is provided upon social login then we save it and return it with Google callback
  saveRedirectLink(req.query.redirectLink, req.session.oauth2return)
  next();
}
function httpHandleGoogleCallback(req, res) {
  res.redirect(req.session.oauth2return || "/");
}
//User login using local login (email & password) handlers
function httpHandleUserLogin(req, res) {
  passport.authenticate("local", function (err, user) {
    if (err) {
      res.json({ message: err });
    } else {
      if (!user) {
        res.json({message: "Username or password incorrect." });
      } else {
        req.logIn(user, function(err) {
    
          res.json({ message: "Login successful.", data: {"username": user.username, "userId": user._id} })
        }); 
      }
    }
  })(req, res);
}


//Handle forgot password flow
async function httpHandleForgotPassword(req, res) {
  const handleForgotPassword = await forgotPassword(req.params.username);
  return res.json(handleForgotPassword);
}

//Handle password reset flow
async function httpHandlePasswordReset(req, res) {
 const handlePasswordReset = await resetPassword(
  req.query.username, req.query.token, req.body.password )

  return res.json(handlePasswordReset)
}

//Handle access to endpoints
function httpCheckLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must first log in!",
    });
  }

  next();
}

module.exports = {
  httpHandleLogout,
  httpHandleGoogleLogin,
  httpHandleUserLogin,
  httpHandleGoogleCallback,
  httpHandleForgotPassword,
  httpHandlePasswordReset,
  httpCheckLoggedIn
};
