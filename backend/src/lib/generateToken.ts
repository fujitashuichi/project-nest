import { signToken } from "./jwt.js";
import { JWTPayload } from "../types/types.payload.js";

export const generateToken = (data: JWTPayload) => {
  try {
    const token = signToken({ id: data.id, email: data.email });
    return {
      ok: true,
      token: token
    };
  } catch(err: unknown) {
    return {
      ok: false,
      error: err
    }
  }
}
