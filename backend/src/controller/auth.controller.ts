import { Request, Response } from "express";
import { RegisterDto } from "../types/index.js";
import { registerUser } from "../service/index.js";

export const register = async (req: Request, res: Response) => {
  const dto: RegisterDto = req.body;

  const registerResult = await registerUser(dto);

  return res.status(201).send({
    success: true,
    value: {
      token: registerResult.token
    }
  })
}
