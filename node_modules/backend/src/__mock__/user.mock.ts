import { User } from "@pkg/shared"
import { DbUser, SaveUserPayload } from "../types/type.db.js"

export const dbUserMocks = {
  users: (): DbUser[] => {
    return [
      { id: 1, email: "example1@gmail.com", password_hash: "hash", created_at: 1 },
      { id: 2, email: "example2@outlook.jp", password_hash: "hash", created_at: 1 },
      { id: 3, email: "example3@co.jp", password_hash: "hash", created_at: 1 }
    ]
  },

  user: (): DbUser => {
    return { id: 1, email: "example@gmail.com", password_hash: "hash", created_at: 1 }
  }
}

export const userMocks = {
  users: (): User[] => {
    return [
      { id: 1, email: "example1@gmail.com", createdAt: 1 },
      { id: 2, email: "example2@outlook.jp", createdAt: 1 },
      { id: 3, email: "example3@co.jp", createdAt: 1 }
    ]
  },

  user: (): User => {
    return { id: 1, email: "example@gmail.com", createdAt: 1 }
  },

  saveUserPayload: (): SaveUserPayload => {
    return { email: "example@gmail.com", createdAt: 1, passwordHash: "passwordHash" };
  }
}
