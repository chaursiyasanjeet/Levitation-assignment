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
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, mobile, password, } = req.body;
        //if anything is empty
        if (!name || !email || !mobile || !password) {
            res.status(400).json({
                status: "FAILED",
                message: "Epmty fields",
            });
            return;
        }
        //checking if already exist
        const existingEmail = yield user_1.default.findOne({ email });
        const existingMobile = yield user_1.default.findOne({ mobile });
        //if user already exist
        if (existingEmail || existingMobile) {
            res.status(409).json({
                status: "FAILED",
                message: "user already exist",
            });
            return;
        }
        //encrypting the password
        const encryptedPasswd = yield bcrypt_1.default.hash(password, 10);
        //creating user
        const user = new user_1.default({
            name,
            email,
            mobile,
            password: encryptedPasswd,
        });
        yield user.save();
        res.json({
            status: "SUCCESS",
            message: "User registered successfully",
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "FAILED", message: "Server error" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, } = req.body;
        if (!email || !password) {
            res.json({
                status: "FAILED",
                message: "fields can't empty",
            });
            return;
        }
        //checking for user exist
        const userExist = yield user_1.default.findOne({ email });
        //if user found
        if (userExist) {
            const passwdMatched = yield bcrypt_1.default.compare(password, userExist.password);
            if (!passwdMatched) {
                res.status(500).json({
                    status: "FAILED",
                    message: "password wrong",
                });
                return;
            }
            const jwtToken = jsonwebtoken_1.default.sign(userExist.toJSON(), process.env.JWT_SECRET);
            res.json({
                status: "SUCCESS",
                message: `${userExist.name} signed in successfully`,
                jwtToken,
            });
        }
        //if user not found
        else {
            res.status(500).json({
                status: "FAILED",
                message: "user not exist,Please Register First",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "FAILED", message: "Server error" });
    }
}));
exports.default = router;
