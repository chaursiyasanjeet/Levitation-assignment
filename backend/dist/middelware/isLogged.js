"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isLogged = (req, res, next) => {
    try {
        const jwtToken = req.headers.token;
        const user = jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET);
        req.userExist = user;
        next();
    }
    catch (error) {
        console.log(error);
        next(new Error("Please login first"));
    }
};
exports.default = isLogged;
