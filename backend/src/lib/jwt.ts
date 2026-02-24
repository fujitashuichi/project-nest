import jwt from "jsonwebtoken"
import { JWTPayloadSchema, type JWTPayload } from "../types/types.payload.js"

const JWT_SECRET = import.meta.env.NODE_JWT_SECRET;

export const signToken = (payload: JWTPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
}

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const data = JWTPayloadSchema.safeParse(decoded);

    if (!data.success) {
      return {
        ok: false,
        error: new Error("Invalid Token")
      }
    }

    return {
      ok: true,
      data: data
    }
  } catch(err: unknown) {
    return {
      ok: false,
      error: err
    }
  }
}
