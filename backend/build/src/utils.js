"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET || "yjiang55", {
        expiresIn: '30d',
    });
};
exports.generateToken = generateToken;
const isAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        // Authorization ex: Bearer eyJhbGciOiJIUzI1NiIXVCJ9...TJVA95OrM7E20RMHrHDcEfxjoYZgeFONFh7HgQ
        // length of "Bearer " is 7
        // token part : eyJhbGciOiJIUzI1NiIXVCJ9...TJVA95OrM7E20RMHrHDcEfxjoYZgeFONFh7HgQ
        const token = authorization.slice(7, authorization.length);
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "yjiang55");
        // Request.ts is build in the file Request.ts where the req.user is defined
        req.user = decode;
        next(); // call next function after being authorized
    }
    else {
        res.status(401).json({ message: "No Token" });
    }
};
exports.isAuth = isAuth;
