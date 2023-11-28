"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//backend library: express
const express_1 = __importDefault(require("express"));
// create express obj
const app = (0, express_1.default)();
// connect to databse
const mongoose_1 = __importDefault(require("mongoose"));
if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}
const MONGDB_URI = process.env.MONGODB_URI || "mongodb://localhost/ecommercedb";
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(MONGDB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
//CORS is essential for building secure and interoperable web applications
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173"],
}));
const product_1 = __importDefault(require("./src/product"));
// app will listen to port 4000 and wait for the valid request and return res.json(sampleProducts);
app.get('/api/products', (req, res) => {
    res.json(product_1.default);
});
// for find product with specific slug
app.get('/api/products/:slug', (req, res) => {
    res.json(product_1.default.find((product) => product.slug === req.params.slug));
});
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
