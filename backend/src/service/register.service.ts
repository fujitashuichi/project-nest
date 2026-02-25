import { RegisterDto } from "../types/index.js";
import { hashPassword, signToken } from "../lib/index.js";
import { usersRepository } from "../repository/user.repository.js";
import { User } from "../types/type.db.js";


export const registerUser = async (dto: RegisterDto): Promise<{ user: User, token: string }> => {
  if (await usersRepository.findByEmail(dto.email) !== null) {
    throw new Error("Email already registered.");
  }

  const password_hash = await hashPassword(dto.password);
//////////////////////////////////////////////
  const id = "server creates new Id";
//////////////////////////////////////////////

  const newUser: User = {
    id: id,
    email: dto.email,
    password_hash: password_hash,
    created_at: Date.now()
  }
  await usersRepository.saveUser(newUser);

  const token = signToken({ email: dto.email });

  return {
    user: newUser,
    token: token
  };
}
