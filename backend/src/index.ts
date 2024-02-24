import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import auth from "./routes/auth";
import generateInvoice from "./routes/generateInvoice";

const app: Application = express();
app.use(cors({ origin: "*" }));

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    service: "Backend server",
    status: "Active",
    time: new Date(),
  });
});

app.use(auth);
app.use(generateInvoice);

//error handler middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: any = new Error("page not found");
  err.status = 404;
  next(err);
});

//error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    status: "FAILED",
    message: err.message,
  });
});

//server listening
const mongoDBUrl: string | undefined = process.env.MONGODB_URL;

if (!mongoDBUrl) {
  throw new Error("MongoDB URL is not defined.");
}

// Connect to MongoDB
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err: any) => console.log(err));
