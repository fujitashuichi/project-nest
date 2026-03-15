import { z } from "zod"
import { ResponseErrorName } from "./types.responseErrorName.js"

export type AuthFetchPath =
  | "/api/auth/register"
  | "/api/auth/login"
  | "/api/auth/logout"
  | "/api/auth/me"

export type SessionFetchPath =
  | "/api/auth/session"

export type UserFetchPath =
  | `/api/user/${number}/products`

export type ProjectFetchPath =
  | "/api/projects"
  | `/api/projects/${number}`


export type ResponseJson<T extends unknown> =
  | {
    success: false,
    errorName: ResponseErrorName,
    message?: string,
  }
  | {
    success: true,
    data: T,
    message?: string
  }
