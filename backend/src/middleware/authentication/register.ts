import { Request, Response } from "express";
import { RegisterDtoSchema } from "../../types/types.dto.js";
import { generateToken } from "../../lib/generateToken.js";


export const register = (req: Request, res: Response) => {
  const parsedDto = RegisterDtoSchema.safeParse(req.body);

  if (!parsedDto.success) {
    return res.status(400).send({
      success: false,
      message: "Invalid Json Data: Data type is not valid"
    })
  }

  const data = parsedDto.data;

  const payload = {
    id: data.id,
    email: data.email
  }
  const result = generateToken(payload);

  if (!result.ok) {
    return res.status(403).send({
      success: false,
      message: result.error
    })
  }

  return res.status(201).send({
    success: true,
    value: {
      id: data.id,
      email: data.email,
      token: result.token
    }
  })
}
