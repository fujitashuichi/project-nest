import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ConfirmPasswordError, EmailAlreadyRegisteredError, InvalidPasswordError, UserAuthError, UserUndefinedError } from "../error/index.js";
import { DuplicateProjectError, ProjectError } from "../error/ProjectError.js";

export const globalErrorHandler = ((err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof UserUndefinedError) {
    return res.status(404).json({ message: err.message, error: err });
  }

  // register
  if (err instanceof EmailAlreadyRegisteredError) {
    return res.status(409).json({ message: err.message, error: err });
  }

  if (err instanceof InvalidPasswordError) {
    return res.status(400).json({ message: err.message, error: err });
  }

  // login
  if (err instanceof ConfirmPasswordError) {
    return res.status(401).json({ message: err.message, error: err });
  }

  // postProduct
  if (err instanceof DuplicateProjectError) {
    return res.status(400).json({ message: err.message, error: err });
  }

  // other
  if (err instanceof UserAuthError) {
    return res.status(400).json({ message: err.message, error: err });
  }
  if (err instanceof ProjectError) {
    return res.status(400).json({ message: err.message, error: err });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    error: err
  });
});
