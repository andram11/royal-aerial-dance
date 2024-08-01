import {Request, Response, NextFunction} from 'express'

export function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
    const isLoggedIn = req.isAuthenticated() && req.user && req.session;
    if (!isLoggedIn) {
      return res.status(401).json({
        error: "You must first log in!",
      });
    }
  
    next();
  }