import { Database } from "sqlite3";
import { createAppDb } from "../db/index.js";
import { UsersRepository } from "../repository/index.js";
import { LoginRequest } from "@pkg/shared";
import { hashPassword, signToken } from "../lib/index.js";
import { ConfirmPasswordError, UserUndefinedError } from "../error/UserAuthError.js";


const appDb = await createAppDb("app.db");

export class LoginStateManagementService {
  private readonly usersRepository: UsersRepository;

  constructor(db: Database = appDb) {
    this.usersRepository = new UsersRepository(db);
  }

  tryLogin = async (dto: LoginRequest): Promise<{ token: string }> => {
    const user = await this.usersRepository.findByEmail(dto.email);
    const dtoPassword_hash = await hashPassword(dto.password);

    if (!user) {
      throw new UserUndefinedError();
    }

    if (user.password_hash !== dtoPassword_hash) {
      throw new ConfirmPasswordError();
    }

    const newToken = signToken({ email: dto.email });

    return {
      token: newToken
    };
  }
}
