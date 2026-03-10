import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError, UserUndefinedError } from "../error/UserAuthError.js";
import { verifyToken } from "../lib/jwt.js";
import { UserService } from "../service/user.service.js";
import { Database } from "sqlite3";

export const authorize = (req: Request, res: Response, next: NextFunction, db: Database) => {
  return async () => {
    const service = new UserService(db);
    const token = req.cookies.token;

    if (!token) throw new UnAuthorizedError();

    const verified = verifyToken(token);
    const user = await service.findByEmail(verified.email);

    if (!user) throw new UserUndefinedError();
    res.locals.userId = user.id;

    next();
  }
}
