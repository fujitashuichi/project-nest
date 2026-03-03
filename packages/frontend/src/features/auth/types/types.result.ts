export type RegisterResult =
  | { ok: false, errorType: "RegisterFailed" | "GetTokenFailed" }
  | { ok: true }

export type LoginResult = boolean;

export type LogoutResult = boolean;
