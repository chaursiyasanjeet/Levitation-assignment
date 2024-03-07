import mongoose, { Document } from "mongoose";
import express, { Request, Response, Router } from "express";
import User from "../models/user";
import isLogged from "../middelware/isLogged";
import puppeteer from "puppeteer";
import path from "path";

const router: Router = express.Router();

interface Product {
  productName: string;
  quantity: string;
  rate: string;
}

//saving data
router.post(
  "/generateInvoice",
  isLogged,
  async (req: Request, res: Response) => {
    try {
      const productDetails: Product[] = req.body;

      if (!productDetails.length) {
        res.status(200).json({ status: "FAILED", message: "Empty Filed" });
        return;
      }

      const id: string = req.userExist._id;
      const user = await User.findById(id);

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

      const updatedUser = await User.findByIdAndUpdate(req.userExist._id, {
        products: user.products,
      });

      if (!updatedUser) {
        res
          .status(500)
          .json({ status: "FAILED", message: "Failed to update user" });
        return;
      }

      res.status(200).json({ status: "SUCCESS", message: "Invoice Generated" });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//invoice dynamic page
router.get("/invoice/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const user = await User.findOne({ _id: id });
    const products = user?.products;

    let productToRender;
    let total;
    let totalWithGst;
    if (products && products.length > 0) {
      productToRender = products[products.length - 1].productDetails;

      total = productToRender.reduce((acc: any, item: any) => {
        return item.quantity * item.rate + acc;
      }, 0);

      totalWithGst = total + 0.18 * total;
    } else {
      console.log("Products array is undefined or empty.");
    }

    res.render("index", {
      productall: productToRender,
      total: total,
      totalWithGst: totalWithGst,
    });
  } catch (error) {
    console.log(error);
  }
});

//generate invoice
router.post("/getInvoice", isLogged, async (req: Request, res: Response) => {
  try {
    const id = req.userExist._id;
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    const invoiceUrl = `${req.protocol}://${req.get("host")}/invoice/${id}`;

    await page.goto(invoiceUrl, {
      waitUntil: "networkidle2",
    });

    await page.setViewport({ width: 1680, height: 1050 });
    const currentDate = new Date();
    const fileName = `invoice${currentDate.getTime()}`;

    // Corrected: Add await before page.pdf
    const generatedPdf = await page.pdf({
      path: path.join(__dirname, "../public/invoices", fileName + ".pdf"),
      format: "A4",
      printBackground: true,
    });

    const pdfUrl = path.join(
      __dirname,
      "../public/invoices",
      fileName + ".pdf"
    );

    await browser.close();
    res.status(200).json({
      status: "SUCCESS",
      messages: "Invoice generated",
      fileName: fileName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/downloadInvoice/:filename",
  async (req: Request, res: Response) => {
    try {
      const fileName = req.params.filename;

      const pdfUrl = path.join(
        __dirname,
        "../public/invoices",
        fileName + ".pdf"
      );

      res.download(pdfUrl, fileName + ".pdf", (err) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ status: "SUCCESS", message: "Pdf downloaded" });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
