"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const sampleUsers = [
    {
        name: 'Joe',
        email: 'admin@example.com',
        password: bcrypt_1.default.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Alice',
        email: 'alice@example.com',
        password: bcrypt_1.default.hashSync('password123', 10),
        isAdmin: false,
    },
    {
        name: 'Bob',
        email: 'bob@example.com',
        password: bcrypt_1.default.hashSync('pass123', 10),
        isAdmin: false,
    },
];
exports.default = sampleUsers;
