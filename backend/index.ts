//backend library: express
import express, { Request, Response } from 'express'
// create express obj
const app = express()
//CORS is essential for building secure and interoperable web applications
import cors from "cors"
app.use(cors({
  credentials:true,
  origin: ["http://localhost:5173"],
}))
// 
import sampleProducts from   "../backend/src/data"
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
