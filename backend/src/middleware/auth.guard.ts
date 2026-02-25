import { NextFunction, Request, Response } from "express";
import { RegisterDtoSchema } from "../types/index.js";

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
  const parsedDto = RegisterDtoSchema.safeParse(req.body);

  if (!parsedDto.success) {
    return res.status(400).send({
      success: false,
      message: parsedDto.error.message
    });
  }

  req.body = parsedDto.data;

  next();
}
