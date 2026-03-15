import { ResponseErrorNameSchema, ResponseJson } from "@pkg/shared";
import { Response } from "express";

export const errorResponse = (res: Response, status: number, err: Error) => {
  const errorName = err.name;

  const parsedErrorName = ResponseErrorNameSchema.safeParse(errorName);
  if (!parsedErrorName.success) {
    const json: ResponseJson<undefined> = {
      success: false,
      errorName: "InternalServerError"
    };
    return res.status(500).json(json);
  }

  const json: ResponseJson<undefined> = {
    success: false,
    errorName: parsedErrorName.data
  }
  return res.status(status).json(json);
}
