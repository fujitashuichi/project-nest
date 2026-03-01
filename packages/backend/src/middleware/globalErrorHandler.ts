import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { EmailAlreadyRegisteredError, InvalidPasswordError, UserAuthError } from "../error/index.js";

export const globalErrorHandler = ((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof EmailAlreadyRegisteredError) {
    return res.status(409).json({ message: err.message });
  }

  if (err instanceof InvalidPasswordError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof UserAuthError) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal Server Error" });
});
