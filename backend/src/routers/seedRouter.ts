import express, { Request, Response} from "express";
import asyncHandler from "express-async-handler";
import {ProductModel} from "../models/productModel"
import { UserModel } from "../models/userModel";
import sampleProducts from "../product";
import sampleUsers from "../users";

const seedRouter = express.Router();

seedRouter.get('/',  asyncHandler(async (req: Request,res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(sampleProducts);

    await UserModel.deleteMany({});
    const createUsers = await UserModel.insertMany(sampleUsers);
   
    // send to client
    // using res.json is more explicit and makes it clear that you are intentionally sending JSON data
    // res.send({createdProducts, createUsers}) 
    res.json({createdProducts, createUsers});
  
}))

export default seedRouter;