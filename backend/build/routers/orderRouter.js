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
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderModel_1 = require("../models/orderModel");
const utils_1 = require("../utils");
exports.orderRouter = express_1.default.Router();
// get all orders with user id
exports.orderRouter.get('/mine', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.OrderModel.find({ user: req.user._id }); // link to mongodb
    res.json(orders); // send result back to frontend
})));
// get the order based on specific id
// /api/orders/:id
exports.orderRouter.get('/:id', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.OrderModel.findById(req.params.id);
    if (order) {
        res.json(order);
    }
    else {
        res.status(404).json({ message: "Order Not Found" });
    }
})));
// 
exports.orderRouter.post('/', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.orderItems.length === 0) {
        res.status(400).json({ message: "Cart is empty" });
    }
    else {
        const createdOrder = yield orderModel_1.OrderModel.create({
            // transforms an array of product objects by adding a new property named product to each object. 
            // The value of this new property is set to the _id property of the original product object.
            orderItems: req.body.orderItems.map((product) => (Object.assign(Object.assign({}, product), { product: product._id }))),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id, // from util.ts: isAuth()
        });
        res.status(201).json({ message: "Order Created", order: createdOrder });
    }
})));
exports.orderRouter.put(// put : update data  hook: usePayOrderMutation
'/:id/pay', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.OrderModel.findById(req.params.id); // find order by order id from frontend
    if (order) { // if order exists in the database then update the isPaid for this order to true
        order.isPaid = true;
        order.paidAt = new Date(Date.now());
        order.paymentResult = {
            paymentId: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const updatedOrder = yield order.save(); // save changes to mongodb and get the updated order
        res.send({ order: updatedOrder, message: 'Order Paid Successfully' }); // send back to front end
    }
    else {
        res.status(404).json({ message: 'Order Not Found' }); // order does not exist
    }
})));
