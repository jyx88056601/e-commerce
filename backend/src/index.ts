import path from 'path';
import dotenv from "dotenv";
dotenv.config();
//backend library: express
import express, { Request, Response } from 'express'
// create express obj
const app = express()


// connect to databse
import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

const MONGDB_URI = process.env.MONGODB_URI || "mongodb://localhost/ecommercedb";
mongoose.set("strictQuery", true);
mongoose.connect (MONGDB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));



//CORS is essential for building secure and interoperable web applications
import cors from "cors"
import { productRouter } from "./routers/productRouter";
import seedRouter from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";
import { orderRouter } from "./routers/orderRouter";
import keyRouter from "./routers/keyRouter";
app.use(cors({
  credentials:true,
  origin: ["http://localhost:5173"],
})) 

app.use((express.json())) // extracting JSON data from the request body in userRouter.ts
// the incoming data in the request body is parsed and made accessible in a convenient format (req.body) for your route handlers.
app.use(express.urlencoded({extended: true})); 

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/seed', seedRouter);
app.use('/api/orders', orderRouter);
app.use('/api/keys', keyRouter);

 
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
)

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
