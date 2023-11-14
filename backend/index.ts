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
import { productRouter } from "./src/routers/productRouter";
import seedRouter from "./src/routers/seedRouter";
app.use(cors({
  credentials:true,
  origin: ["http://localhost:5173"],
})) 

app.use('/api/products', productRouter);
app.use('/api/seed', seedRouter);

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
