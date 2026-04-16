import z from "zod";
import { RegisterRequestSchema } from "@pkg/shared"

export const JWTPayloadSchema = RegisterRequestSchema.pick({ email: true });
export type JWTPayload = z.infer<typeof JWTPayloadSchema>;

export type CreateUserPayload = {
  email: string,
  passwordHash: string
}
