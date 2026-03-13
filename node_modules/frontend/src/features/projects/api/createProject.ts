import type { PostProjectRequest } from "@pkg/shared";
import { apiClient } from "../../../lib";
import type { CreateProjectResult } from "../types";

export const createProject = async (project: PostProjectRequest): Promise<CreateProjectResult> => {
  const response = await apiClient({
    path: "/api/projects",
    method: "POST",
    body: project
  });

  if (!response.ok) {
    if (response.error.name === "DuplicateProjectError") {
      return {
        success: false,
        errorType: "ProjectAlreadyExists"
      }
    }
    if (response.status === 401) {
      return {
        success: false,
        errorType: "UserNotRegisteredError"
      }
    }

    return {
      success: false,
      errorType: "UnknownError"
    }
  }

  return {
    success: true,
    value: response.body
  }
}
