import bcrypt from "bcrypt"
import { RegisterDto } from "../types/index.js";
import { User } from "../types/type.db.js";
import { usersRepository } from "../repository/index.js";
import { InvalidPasswordError, UserAuthError } from "../error/index.js";

const SaltRounds = 10;

export const hashPassword = async (password: RegisterDto["password"]) => {
  return await bcrypt.hash(password, SaltRounds);
}

// email と password で認証を行い、完全なユーザーデータを獲得します.
export const comparePassword = async (email: RegisterDto["email"], password: string): Promise<User> => {
  const user = await usersRepository.findByEmail(email);

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
