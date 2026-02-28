import bcrypt from "bcrypt"
import { RegisterDto } from "../types/index.js";
import { User } from "../types/type.db.js";
import { InvalidPasswordError, UserAuthError } from "../error/index.js";
import type { UsersRepository } from "../repository/index.js";

const SaltRounds = 10;

export const hashPassword = async (password: RegisterDto["password"]) => {
  return await bcrypt.hash(password, SaltRounds);
}

// email と password で認証を行い、完全なユーザーデータを獲得します.
export const comparePassword = async (email: RegisterDto["email"], password: string, repository: UsersRepository): Promise<User> => {
  const user = await repository.findByEmail(email);

  if (!user) {
    throw new UserAuthError("The user was not found. It means the user was deleted or DB not response properly.");
  }

  const isValid = await bcrypt.compare(password, user.password_hash);

  if (isValid) {
    return user
  } else {
    throw new InvalidPasswordError();
  }
}
