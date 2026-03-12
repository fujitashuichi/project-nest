import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { authErrorHandler } from "./authErrorHandler.js";
import { productErrorHandler } from "./productErrorHandler.js";
import { userErrorHandler } from "./userErrorHandler.js";

export const globalErrorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  authErrorHandler;
  productErrorHandler;
  userErrorHandler;

  return res.status(500).json({
    message: "Internal Server Error",
    error: err
  });
};
