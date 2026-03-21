import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UsersRepository } from "../../repository/index.js";
import { userMocks } from "../../__mock__/index.js";
import { MockProxy, mockReset } from "vitest-mock-extended"
import { PrismaClient } from "../../generated/prisma/client.js";
import { prismaMock } from "../../__mock__/prismaMock.js";


describe("user.repositoryの各メソッドを検査", () => {
  let repository: UsersRepository | null = null;
  let prisma: MockProxy<PrismaClient> | null = null;

  beforeEach(async () => {
    repository = new UsersRepository();
    prisma = prismaMock;
  });
  afterEach(async () => {
    repository = null;
    vi.resetAllMocks();
    mockReset(prisma);
  })

  describe("正常型", () => {
    it("saveUserは正しく成功する", async () => {
      const payload = userMocks.saveUserPayload();
      await repository!.saveUser(payload);

      expect(prisma!.project.create).toHaveBeenCalledWith(expect.anything());
    });

    it("getUsersは正しく成功する", async () => {
      await repository!.getUsers();

      expect(prisma!.user.findMany).toHaveBeenCalledWith(expect.anything());
    });

    it("findByIdは正しく成功する", async () => {
      await repository!.findById("uuid");

      expect(prisma!.user.findUnique).toHaveBeenCalledWith(expect.anything());
    });

    it("findByEmailは正しく成功する", async () => {
      await repository!.findByEmail("example@email.com");

      expect(prisma!.user.findUnique).toHaveBeenCalledWith(expect.anything());
    });
  });
});
