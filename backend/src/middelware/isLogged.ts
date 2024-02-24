import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

declare module "express" {
  interface Request {
    userExist?: any;
  }
}

dotenv.config();

const isLogged = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const jwtToken: string = req.headers.token as string;
    const user: any = jwt.verify(jwtToken, process.env.JWT_SECRET as string);
    req.userExist = user;
    next();
  } catch (error) {
    console.log(error);
    next(new Error("Please login first"));
  }
};

export default isLogged;
