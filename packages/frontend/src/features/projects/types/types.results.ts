import type { Project } from "@pkg/shared";

export type CreateProjectResult =
  | { success: false, error: Error }
  | { success: true, value: Project }
