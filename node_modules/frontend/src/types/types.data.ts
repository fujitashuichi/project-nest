import z from "zod";

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  created_at: z.number().int().positive()
});
export type User = z.infer<typeof UserSchema>;
