import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { UsersRepository } from "../repository/index.js";
import { createAppDb } from "../db/app.db.js";
import { Database } from "sqlite3";
import { userMocks } from "../__mock__/index.js";

describe("user.repositoryの各メソッドを検査", () => {
  let db: Database | null = null;
  let repository: UsersRepository | null = null;

  beforeEach(async () => {
    db = await createAppDb(":memory:");
    repository = new UsersRepository(db);
  });
  afterEach(async () => {
    db = null;
    repository = null;
  })

  it("saveUserは正しく成功する", async () => {
    const result = repository?.saveUser(userMocks.user());

    await expect(result).resolves.toBe(userMocks.user());
  });

  it("getUsersは正しく成功する");

  it("findByIdは正しく成功する");

  it("findByEmailは正しく成功する");
});