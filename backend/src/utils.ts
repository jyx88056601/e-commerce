import {Request, Response, NextFunction} from "express"
import {User} from "./models/userModel";
import jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET || "yjiang55", {
        expiresIn: '30d',
    })
}



export const isAuth = (req:Request, res: Response, next :  NextFunction) => {
   const {authorization} = req.headers;
   if(authorization) {
       // Authorization ex: Bearer eyJhbGciOiJIUzI1NiIXVCJ9...TJVA95OrM7E20RMHrHDcEfxjoYZgeFONFh7HgQ
       // length of "Bearer " is 7
       // token part : eyJhbGciOiJIUzI1NiIXVCJ9...TJVA95OrM7E20RMHrHDcEfxjoYZgeFONFh7HgQ
       const token = authorization.slice(7,authorization.length);
       const decode = jwt.verify(
           token,
           process.env.JWT_SECRET || "yjiang55", // the key to decrypt token
        )
        // Request.ts is build in the file Request.ts where the req.user is defined
        req.user = decode as {
            _id: string,
            name: string,
            email: string,
            isAdmin: boolean,
            token: string,
        }
        next() // call next function after being authorized
   } else {
       res.status(401).json({message: "No Token"});
   }

}