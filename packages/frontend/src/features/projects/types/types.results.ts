import type { Project } from "@pkg/shared";

export type CreateProjectResult =
  | { success: false, errorType: "ProjectAlreadyExists" | "UserNotRegisteredError" | "UnknownError" }
  | { success: true, value: Project }
