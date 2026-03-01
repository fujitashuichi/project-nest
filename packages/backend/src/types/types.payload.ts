import z from "zod";
import { RegisterDtoSchema } from "./types.dto.js"

export const JWTPayloadSchema = RegisterDtoSchema.pick({ email: true });
export type JWTPayload = z.infer<typeof JWTPayloadSchema>;
