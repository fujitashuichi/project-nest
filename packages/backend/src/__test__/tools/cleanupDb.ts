import { prisma } from "../../lib/prisma.js";

// DBを介するテストで必須
// beforeEach内で使用する

export const cleanupDb = async () => {
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();
}
