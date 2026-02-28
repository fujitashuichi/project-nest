import { DatabaseGetError } from "../error/DbError.js";
import { UserSchema, type UserWithoutId, type User } from "../types/index.js";
import { Database } from "sqlite3";

//// ここは型安全を保障する層ではないため、使用前に必ずバリデーションを済ませる

export class UsersRepository {
  private readonly tableName = "users";

  constructor(
    private readonly db: Database
  ) {}

  getUsers = (): Promise<User[] | []> => {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM ${this.tableName}`,
        (err, rows) => {
          if (!rows) {
            resolve([]);
            return;
          }
          if (err) {
            reject(err);
            return;
          }
          const parsedRow = UserSchema.array().safeParse(rows);
          if (!parsedRow.success) {
            console.error(parsedRow.error);
            reject(new DatabaseGetError("AppDb", this.tableName));
            return;
          }
          resolve(parsedRow.data);
        }
      )
    });
  }

  saveUser = (data: UserWithoutId): Promise<User> => {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO ${this.tableName} (email, password_hash, created_at)
          VALUES (?, ?, ?)`,
        [data.email, data.password_hash, data.created_at],
        function (err) {
          if (err) {
            reject(err);
            return;
          }
          const user: User = { id: this.lastID, ...data };
          resolve(user);
        }
      )
    });
  }

  findById = (id: number): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id],
        (err, row) => {
          if (!row) {
            resolve(null);
            return;
          }
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

  findByEmail = (email: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.tableName} WHERE email = ?`,
        [email],
        (err, row) => {
          if (!row) {
            resolve(null);
            return;
          };
          if (err) {
            console.error("findByEmail failed by getError");
            reject(err);
            return;
          }
          const parsedRow = UserSchema.safeParse(row);
          if (!parsedRow.success) {
            console.error(parsedRow.error);
            reject(new DatabaseGetError("AppDb", this.tableName));
            return;
          }
          resolve(parsedRow.data);
        }
      )
    });
  }
}
