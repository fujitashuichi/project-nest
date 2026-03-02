import z from "zod";

export const RegisterRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = z.object({
  token: z.string()
});
export type ResisterResponse = z.infer<typeof RegisterResponseSchema>;
