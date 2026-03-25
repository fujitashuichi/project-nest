import { Prisma } from "../../generated/prisma/index.js";
import { UpdateProjectPayload } from "../types/type.db.js";

/**
 * Zodでパースした後のPayloadを、PrismaのUpdateInputとして安全に扱うための変換器
 * ホワイトリストとして使えるのは動作保証ができているもののみ
 */

type WhiteList =
  | UpdateProjectPayload;


export const castForPrismaUpdate = <T extends Prisma.ProjectUpdateInput>(
  data: WhiteList
): T => {
  // shared の toPrismaUpdate で整形が終わっている前提
  return data as T;
};