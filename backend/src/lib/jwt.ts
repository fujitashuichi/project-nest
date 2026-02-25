import jwt from "jsonwebtoken"
import { JWTPayloadSchema, Result, type JWTPayload } from "../types/index.js"
import { ENV } from "../config/env.js"

const JWT_SECRET = ENV.JWT_SECRET;

export const signToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
}

export const verifyToken = (token: string): JWTPayload => {
  // ここでTokenが秘密鍵によって解読される
  // JWTPayload は、ユーザデータを得るのに十分な情報を持つ.
  const decoded = jwt.verify(token, JWT_SECRET);
  const parsedData = JWTPayloadSchema.safeParse(decoded);

  if (!parsedData.success) {
    console.error("Decoded token is not valid");
    throw parsedData.error
  }

  return parsedData.data
}
