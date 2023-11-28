"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
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
const productRouter_1 = require("./routers/productRouter");
const seedRouter_1 = __importDefault(require("./routers/seedRouter"));
const userRouter_1 = require("./routers/userRouter");
const orderRouter_1 = require("./routers/orderRouter");
const keyRouter_1 = __importDefault(require("./routers/keyRouter"));
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173"],
}));
app.use((express_1.default.json())); // extracting JSON data from the request body in userRouter.ts
// the incoming data in the request body is parsed and made accessible in a convenient format (req.body) for your route handlers.
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/users', userRouter_1.userRouter);
app.use('/api/products', productRouter_1.productRouter);
app.use('/api/seed', seedRouter_1.default);
app.use('/api/orders', orderRouter_1.orderRouter);
app.use('/api/keys', keyRouter_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../dist')));
app.get('*', (req, res) => res.sendFile(path_1.default.join(__dirname, '../../dist/index.html')));
const PORT = parseInt((process.env.PORT || '4000'), 10);
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
