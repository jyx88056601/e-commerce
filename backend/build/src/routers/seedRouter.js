"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = require("../models/productModel");
const userModel_1 = require("../models/userModel");
const product_1 = __importDefault(require("../product"));
const users_1 = __importDefault(require("../users"));
const seedRouter = express_1.default.Router();
seedRouter.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield productModel_1.ProductModel.deleteMany({});
    const createdProducts = yield productModel_1.ProductModel.insertMany(product_1.default);
    yield userModel_1.UserModel.deleteMany({});
    const createUsers = yield userModel_1.UserModel.insertMany(users_1.default);
    // send to client
    // using res.json is more explicit and makes it clear that you are intentionally sending JSON data
    // res.send({createdProducts, createUsers}) 
    res.json({ createdProducts, createUsers });
})));
exports.default = seedRouter;
