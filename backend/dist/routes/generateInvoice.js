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
const isLogged_1 = __importDefault(require("../middelware/isLogged"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
//saving data
router.post("/generateInvoice", isLogged_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productDetails = req.body;
        if (!productDetails.length) {
            res.status(200).json({ status: "FAILED", message: "Empty Filed" });
            return;
        }
        const id = req.userExist._id;
        const user = yield user_1.default.findById(id);
        if (!user) {
            res.status(404).json({ status: "FAILED", message: "User not found" });
            return;
        }
        // Ensure that the 'products' field exists and is an array
        if (!user.products) {
            user.products = [];
        }
        const produtDetailsWithDate = {
            productDetails,
            createdAt: new Date(),
        };
        user.products.push(produtDetailsWithDate);
        const updatedUser = yield user_1.default.findByIdAndUpdate(req.userExist._id, {
            products: user.products,
        });
        if (!updatedUser) {
            res
                .status(500)
                .json({ status: "FAILED", message: "Failed to update user" });
            return;
        }
        res.status(200).json({ status: "SUCCESS", message: "Invoice Generated" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
//invoice dynamic page
router.get("/invoice/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.default.findOne({ _id: id });
        const products = user === null || user === void 0 ? void 0 : user.products;
        let productToRender;
        let total;
        let totalWithGst;
        if (products && products.length > 0) {
            productToRender = products[products.length - 1].productDetails;
            total = productToRender.reduce((acc, item) => {
                return item.quantity * item.rate + acc;
            }, 0);
            totalWithGst = total + 0.18 * total;
        }
        else {
            console.log("Products array is undefined or empty.");
        }
        res.render("index", {
            productall: productToRender,
            total: total,
            totalWithGst: totalWithGst,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
//generate invoice
router.post("/getInvoice", isLogged_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userExist._id;
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        const invoiceUrl = `${req.protocol}://${req.get("host")}/invoice/${id}`;
        yield page.goto(invoiceUrl, {
            waitUntil: "networkidle2",
        });
        yield page.setViewport({ width: 1680, height: 1050 });
        const currentDate = new Date();
        const fileName = `invoice${currentDate.getTime()}`;
        // Corrected: Add await before page.pdf
        const generatedPdf = yield page.pdf({
            path: path_1.default.join(__dirname, "../public/invoices", fileName + ".pdf"),
            format: "A4",
            printBackground: true,
        });
        const pdfUrl = path_1.default.join(__dirname, "../public/invoices", fileName + ".pdf");
        yield browser.close();
        res.status(200).json({
            status: "SUCCESS",
            messages: "Invoice generated",
            fileName: fileName,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/downloadInvoice/:filename", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileName = req.params.filename;
        const pdfUrl = path_1.default.join(__dirname, "../public/invoices", fileName + ".pdf");
        res.download(pdfUrl, fileName + ".pdf", (err) => {
            if (err) {
                console.log(err);
                res
                    .status(500)
                    .json({ status: "SUCCESS", message: "Pdf downloaded" });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
