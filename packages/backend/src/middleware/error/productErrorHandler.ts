import { NextFunction, Request, Response } from "express";
import { DuplicateProjectError, ProjectError } from "../../error/ProjectError.js";
import { errorResponse } from "./errorResponse.js";

export const productErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  // postProduct
  if (err instanceof DuplicateProjectError) {
    return errorResponse(res, 400, err);
  }


  if (err instanceof ProjectError) {
    return errorResponse(res, 400, err);
  }

  next();
}
