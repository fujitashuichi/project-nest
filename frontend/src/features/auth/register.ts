import { apiClient } from "../api-client";
impor

export const resisterUser = () => {
  return async (props: RegisterReq): AdaptorResult<string> => {
    const response: ServiceResult = await apiClient("/api/");

    if (!response.ok) {
      return {
        ok: false,
        error: new Error()
      }
    }
  }
}
