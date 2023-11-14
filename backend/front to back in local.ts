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
mongoose.connect(MONGDB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));



//CORS is essential for building secure and interoperable web applications
import cors from "cors"
app.use(cors({
  credentials:true,
  origin: ["http://localhost:5173"],
}))
// 
import sampleProducts from   "./src/data"
// app will listen to port 4000 and wait for the valid request and return res.json(sampleProducts);




 
app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProducts)
})

// for find product with specific slug
app.get('/api/products/:slug', (req: Request, res: Response) => {
  res.json(sampleProducts.find((product) => product.slug === req.params.slug));
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
