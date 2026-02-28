import z from "zod";

export const UserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  password_hash: z.hash("sha256"),
  created_at: z.number().int().positive()
});
export type User = z.infer<typeof UserSchema>;

const UserWithoutIdSchema = UserSchema.omit({ id: true });
export type UserWithoutId = z.infer<typeof UserWithoutIdSchema>
