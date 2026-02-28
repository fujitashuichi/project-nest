import { User } from "../types/type.db.js"

export const userMocks = {
  users: (): User[] => {
    return [
      { id: 1, email: "example1@gmail.com", password_hash: "hash", created_at: 1 },
      { id: 2, email: "example2@outlook.jp", password_hash: "hash", created_at: 1 },
      { id: 3, email: "example3@co.jp", password_hash: "hash", created_at: 1 }
    ]
  },

  user: (): User => {
    return { id: 4, email: "example@gmail.com", password_hash: "hash", created_at: 1 }
  }
}
