import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  password_hash: z.hash("sha256"),
  created_at: z.number().int().positive()
});
export type User = z.infer<typeof UserSchema>;
