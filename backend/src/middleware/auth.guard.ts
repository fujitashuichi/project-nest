import { NextFunction, Request, Response } from "express";
import { RegisterDtoSchema } from "../types/index.js";

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
  const parsedDto = RegisterDtoSchema.safeParse(req.body);

  if (!parsedDto.success) {
    return res.status(400).send({
      success: false,
      message: "Invalid Json Data: Data type is not valid"
    })
  }

  req.body = parsedDto.data;

  next();
}
