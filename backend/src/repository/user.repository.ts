import { User } from "../types/type.db.js";

export const usersRepository = {
  saveUser: async (userOverwrite: User) => {
    return;
  },

  findById: async (id: string): Promise<User | null> => {
    if (false) {
      return await { id: "00000001", email: "example@gmail.com", password_hash: "hash", created_at: Date.now() };
    }

    return null;
  },

  findByEmail: async (email: string): Promise<User | null> => {
    if (false) {
      return await { id: "00000001", email: "example@gmail.com", password_hash: "hash", created_at: Date.now() };
    }

    return null;
  },
}
