import { Request, Response } from "express";
import { RegisterDto } from "../types/index.js";
import type { RegisterService } from "../service/index.js";

export const register = async (req: Request, res: Response, registerService: RegisterService) => {
  const dto: RegisterDto = req.body;

  const registerResult = await registerService.registerUser(dto);

  return res
    .status(201)
    .cookie("token", registerResult.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1日
    })
    .send({
      success: true,
      value: {
        token: registerResult.token
      }
    });
}
