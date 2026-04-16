import { email } from "zod";
import { UsersRepository } from "../repository/index.js";
import { RegisterRequest, User } from "@pkg/shared";
import { EmailAlreadyRegisteredError } from "../error/AuthError.js";
import { hashPassword } from "../lib/bcryptPassword.js";


export class UserService {
  private readonly repository = new UsersRepository();

  findById = async (id: User["id"]) => {
    return await this.repository.findById(id);
  }

  findByEmail = async (email: User["email"]) => {
    return await this.repository.findByEmail(email);
  }

  createUser = async ({ email, password }: RegisterRequest) => {
    if (await this.repository.findByEmail(email)) {
      throw new EmailAlreadyRegisteredError(email);
    };

    const passwordHash = await hashPassword(password);

    return await this.repository.createUser({ email, passwordHash })
  }
}