import { signToken } from "./jwt.js";
import { JWTPayload } from "../types/types.payload.js";

export const generateToken = (data: JWTPayload): string => {
  return signToken({ email: data.email });
}
