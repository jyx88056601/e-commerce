import express, {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/userModel";
import { generateToken } from "../utils";

export const userRouter = express.Router();

// POST /api/users/signin
userRouter.post('/signin', asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email }); // find user based on the email in mongodb
        if(user) { // if user exists
            if(bcrypt.compareSync(req.body.password, user.password)) { // compare the password
                 res.json({
                    _id: user.id,
                    name: user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token: generateToken(user),
                })
            } else {    
                return
            }
        }
        // if user does not exist
        res.status(401).json({message: "Invalid email or password"});
    })
  );