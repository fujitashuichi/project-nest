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
