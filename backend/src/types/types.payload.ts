import z from "zod";
import { RegisterDtoSchema } from "./types.dto.js"

export const JWTPayloadSchema = RegisterDtoSchema.pick({ id: true, email: true });
export type JWTPayload = z.infer<typeof JWTPayloadSchema>;
