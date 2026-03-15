import { User, UserSchema } from "@pkg/shared";
import { Database } from "sqlite3";
import { dbObjectToCamel } from "./dataTypeMapper.js";
import { SaveUserPayload } from "../types/type.db.js";

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
          if (!rows) return resolve([]);
          if (err) return reject(err);

          const users = dbObjectToCamel({
            data: rows,
            nullToUndefined: true,
            schema: UserSchema.array()
          });
          resolve(users);
        }
      )
    });
  }

  saveUser = (data: SaveUserPayload): Promise<User> => {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO ${this.tableName} (email, password_hash, created_at)
          VALUES (?, ?, ?)`,
        [data.email, data.passwordHash, data.createdAt],
        function (err) {
          if (err) {
            reject(err);
            return;
          }
          const savedUser = { id: this.lastID, ...data };
          const user = dbObjectToCamel({
            data: savedUser,
            nullToUndefined: true,
            schema: UserSchema
          });
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
          const user = dbObjectToCamel({
            data: row,
            nullToUndefined: true,
            schema: UserSchema
          });
          resolve(user);
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
          const user = dbObjectToCamel({
            data: row,
            nullToUndefined: true,
            schema: UserSchema
          })
          resolve(user);
        }
      )
    });
  }
}
