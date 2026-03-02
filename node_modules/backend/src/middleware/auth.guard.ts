import { RegisterRequestSchema } from "@pkg/shared";
import { NextFunction, Request, Response } from "express";

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
  const parsedDto = RegisterRequestSchema.safeParse(req.body);

  if (!parsedDto.success) {
    return res.status(400).send({
      success: false,
      message: parsedDto.error.message
    });
  }

  req.body = parsedDto.data;

  next();
}
