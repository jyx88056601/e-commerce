"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const keyRouter = express_1.default.Router();
// with index.ts : app.use('api/keys', keyRouter);
// frontEnd can get Client id from the Endpoint URL, which is https://:local4000/api/keys/paypal
keyRouter.get('/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID_SANDBOX }); // send to frontend
});
exports.default = keyRouter;
