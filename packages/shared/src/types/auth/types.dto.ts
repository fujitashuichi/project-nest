import { z } from "zod";

export const RegisterRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = z.void().or(z.object({}));
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
