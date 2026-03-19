import type { User } from "@pkg/shared";

export type RegisterResult =
  | { ok: false, errorType: "AlreadyRegistered" | "GetTokenFailed" }
  | { ok: true }

export type LoginResult = boolean;

export type LogoutResult = boolean;

export type GetUserDataResult =
  | { ok: false, errorType: "UnAuthorized" | "InvalidData" }
  | { ok: true, data: User }
