import z from "zod";
import { ProjectSchema } from "./types.data.js";

export const PostProjectRequestSchema = ProjectSchema.pick({
  title: true,
  description: true,
}).strict();
export type PostProjectRequest = z.infer<typeof PostProjectRequestSchema>;

export const PostProjectResponseSchema = ProjectSchema;
export type PostProjectResponse = z.infer<typeof PostProjectResponseSchema>;

export const GetProjectsResponseSchema = ProjectSchema.array();
export type GetProjectsResponse = z.infer<typeof GetProjectsResponseSchema>;

// 更新可能にするプロパッティを設定する
export const PatchProjectRequestSchema = ProjectSchema.pick({
  title: true,
  description: true,
  status: true
}).partial();
export type PatchProjectRequest = z.infer<typeof PatchProjectRequestSchema>;

export const PatchProjectResponseSchema = ProjectSchema;
export type PatchProjectResponse = z.infer<typeof PatchProjectResponseSchema>;
