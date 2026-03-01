import { apiClient } from "../../../lib/api-client";
import type { UserRegisterBodyType } from "../types/types.data";
import type { ApiResult, RegisterResult } from "../types/types.result";

export const resisterUser = async (body: UserRegisterBodyType): Promise<RegisterResult> => {
  const response: ApiResult = await apiClient({
    path: "/api/register",
    method: "POST",
    body: body
  });

  if (!response.ok) {
    return {
      ok: false,
      error: new Error()
    }
  }

  const data = await response.json;
  if (isToken(data)) {
    return {
      ok: false,
      error: new Error("invalid json: failed to get Token")
    }
  }

  return {
    ok: true,
    token: data
  }
}

const isToken = (value: unknown): value is string => {
  return typeof value === "string";
}
