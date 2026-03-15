import { ProjectSchema, UserSchema } from "@pkg/shared";
import { z } from "zod";

export const DbUserSchema = z.object({
  id: z.number().int(),
  email: z.email(),
  password_hash: z.string(),
  created_at: z.number().int().positive()
});
export type DbUser = z.infer<typeof DbUserSchema>;

const SaveUserPayloadSchema = UserSchema.omit({ id: true }).extend({ passwordHash: z.string() });
export type SaveUserPayload = z.infer<typeof SaveUserPayloadSchema>


export const ProjectWithoutIdSchema = ProjectSchema.omit({ id: true });
export type ProjectWithoutId = z.infer<typeof ProjectWithoutIdSchema>;
