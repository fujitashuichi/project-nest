import { hashPassword, signToken } from "../lib/index.js";
import { UsersRepository } from "../repository/index.js";
import { createAppDb } from "../db/app.db.js";
import { Database } from "sqlite3";
import { RegisterRequest, User, UserSchema } from "@pkg/shared";
import { EmailAlreadyRegisteredError } from "../error/index.js";
import { dbObjectToCamel } from "../repository/dataTypeMapper.js";
import { DbUser } from "../types/type.db.js";


const AppDb = await createAppDb("app.db");

export class RegisterService {
  private usersRepository: UsersRepository;

  constructor(db: Database = AppDb) {
    this.usersRepository = new UsersRepository(db);
  }

  registerUser = async (dto: RegisterRequest): Promise<{ user: User, token: string }> => {
    if (await this.usersRepository.findByEmail(dto.email) !== null) {
      throw new EmailAlreadyRegisteredError(dto.email);
    }

    const hashed = await hashPassword(dto.password);

    const newUser = {
      email: dto.email,
      password_hash: hashed,
      created_at: Date.now()
    }

    const savedUser: DbUser = await this.usersRepository.saveUser(newUser);

    const { password_hash, ...requiredUserData } = savedUser;
    const token: string = signToken({ email: dto.email });

    return {
      user: dbObjectToCamel({
        data: requiredUserData,
        nullToUndefined: true,
        schema: UserSchema
      }),
      token: token
    };
  }
}
