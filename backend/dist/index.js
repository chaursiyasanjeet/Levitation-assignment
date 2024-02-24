"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const generateInvoice_1 = __importDefault(require("./routes/generateInvoice"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.set("view engine", "ejs");
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
dotenv_1.default.config();
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.get("/", (req, res) => {
    res.status(200).json({
        service: "Backend server",
        status: "Active",
        time: new Date(),
    });
});
app.use(auth_1.default);
app.use(generateInvoice_1.default);
//error handler middleware
app.use((req, res, next) => {
    const err = new Error("page not found");
    err.status = 404;
    next(err);
});
//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: "FAILED",
        message: err.message,
    });
});
//server listening
const mongoDBUrl = process.env.MONGODB_URL;
if (!mongoDBUrl) {
    throw new Error("MongoDB URL is not defined.");
}
// Connect to MongoDB
mongoose_1.default
    .connect(mongoDBUrl)
    .then(() => {
    // Start the server
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
})
    .catch((err) => console.log(err));
