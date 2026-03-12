import { NextFunction, Request, Response } from "express";
import { UserUndefinedError } from "../../error/UserAuthError.js";
import { errorResponse } from "./errorResponse.js";

export const userErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserUndefinedError) {
    return errorResponse(res, 404, err);
  }

  next();
}
