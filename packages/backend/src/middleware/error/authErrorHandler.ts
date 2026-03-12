import { NextFunction, Request, Response } from "express";
import { ConfirmPasswordError, EmailAlreadyRegisteredError, InvalidPasswordError, UnAuthorizedError, UserAuthError } from "../../error/UserAuthError.js";
import { errorResponse } from "./errorResponse.js";

export const authErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UnAuthorizedError) {
    return errorResponse(res, 401, err);
  }

  // register
  if (err instanceof EmailAlreadyRegisteredError) {
    return errorResponse(res, 409, err);
  }

  if (err instanceof InvalidPasswordError) {
    return errorResponse(res, 400, err);
  }

  // login
  if (err instanceof ConfirmPasswordError) {
    return errorResponse(res, 401, err);
  }


  if (err instanceof UserAuthError) {
    return errorResponse(res, 400, err);
  }

  next();
}
