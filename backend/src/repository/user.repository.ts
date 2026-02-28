import { DatabaseGetError } from "../error/DbError.js";
import { UserSchema, type User } from "../types/index.js";
import { Database } from "sqlite3";

//// ここは型安全を保障する層ではないため、使用前に必ずバリデーションを済ませる

export class UsersRepository {
  private readonly tableName = "users";

  constructor(
    private readonly db: Database
  ) {}

  getUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM ${this.tableName}`,
        (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
          const parsedRow = UserSchema.array().safeParse(rows);
          if (!parsedRow.success) {
            reject(new DatabaseGetError("AppDb", this.tableName));
            return;
          }
          resolve(parsedRow.data);
        }
      )
    });
  }

  saveUser = (user: User): Promise<true> => {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO ${this.tableName} (id, email, password_hash, created_at)
          VALUES (? ? ? ?)`,
        [user.id, user.email, user.password_hash, user.created_at],
        (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(true);
        }
      )
    });
  }

  findById = (id: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id],
        (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          const parsedRow = UserSchema.safeParse(row);
          if (!parsedRow.success) {
            reject(new DatabaseGetError("AppDb", this.tableName));
            return;
          }
          resolve(parsedRow.data);
        }
      )
    });
  }

  findByEmail = (email: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.tableName} WHERE email = ?`,
        [email],
        (err, row) => {
          if (err) {
            reject(err);
            return;
          }
          const parsedRow = UserSchema.safeParse(row);
          if (!parsedRow.success) {
            reject(new DatabaseGetError("AppDb", this.tableName));
            return;
          }
          resolve(parsedRow.data);
        }
      )
    });
  }
}
