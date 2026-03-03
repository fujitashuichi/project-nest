import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ConfirmPasswordError, EmailAlreadyRegisteredError, InvalidPasswordError, UserAuthError, UserUndefinedError } from "../error/index.js";

export const globalErrorHandler = ((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof UserUndefinedError) {
    return res.status(404).json({ message: err.message });
  }

  // register
  if (err instanceof EmailAlreadyRegisteredError) {
    return res.status(409).json({ message: err.message });
  }

  if (err instanceof InvalidPasswordError) {
    return res.status(400).json({ message: err.message });
  }

  // login
  if (err instanceof ConfirmPasswordError) {
    return res.status(401).json({ message: err.message });
  }

  // other
  if (err instanceof UserAuthError) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal Server Error" });
});
