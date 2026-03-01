import z from "zod";

export const UserRegisterBodyTypeSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(20)
});
export type UserRegisterBodyType = z.infer<typeof UserRegisterBodyTypeSchema>;
