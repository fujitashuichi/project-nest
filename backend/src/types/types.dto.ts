import z from "zod";

export const RegisterDtoSchema = z.object({
  id: z.string(),
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type RegisterDto = z.infer<typeof RegisterDtoSchema>;