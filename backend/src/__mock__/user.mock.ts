import { User } from "../types/type.db.js"

export const userMocks = {
  users: (): User[] => {
    return [
      { id: "00000001", email: "example1@gmail.com", password_hash: "hash", created_at: 1 },
      { id: "00000002", email: "example2@outlook.jp", password_hash: "hash", created_at: 1 },
      { id: "00000003", email: "example3@co.jp", password_hash: "hash", created_at: 1 }
    ]
  },

  user: (): User => {
    return { id: "00000004", email: "example@gmail.com", password_hash: "hash", created_at: 1 }
  }
}
