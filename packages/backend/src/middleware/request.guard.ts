import { NextFunction, Request, Response } from "express";
import { RequestName, zodGuard } from "./zod.guard.js";
import { securityGuard } from "./security.guard.js";

export const requestValidator = (req: Request, res: Response, next: NextFunction, requestName: RequestName) => {
  if (!securityGuard(req, res)) return;
  if (!zodGuard(req, res, requestName)) return;

  next();
}
