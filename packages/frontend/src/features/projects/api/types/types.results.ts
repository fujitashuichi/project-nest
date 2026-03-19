import type { Project } from "@pkg/shared";

type ServiceResult<T, P> =
  | { success: false, errorType: T }
  | { success: true, value: P }

export type CreateProjectResult = ServiceResult<
  "ProjectAlreadyExists" | "UnAuthorized" | "InvalidData",
  Project
>

export type GetProjectsResult = ServiceResult<
  "InvalidDataError" | "UnAuthorized",
  Project[]
>

export type UpdateProjectResult = ServiceResult<
  "UnAuthorized" | "UserUndefined" | "ProjectUndefined" | "InvalidData",
  Project
>

export type DeleteProjectResult = ServiceResult<
  "UnAuthorized" | "UserUndefined" | "ProjectUndefined" | "InvalidData",
  undefined
>
