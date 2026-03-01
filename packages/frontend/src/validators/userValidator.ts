import { UserSchema, type User } from "../types/data";

export const validateUser = (value: unknown): value is User => {
  const result = UserSchema.safeParse(value);
  if (!result.success) {
    console.error(result.error.message);
    return false;
  }
  return true;
}