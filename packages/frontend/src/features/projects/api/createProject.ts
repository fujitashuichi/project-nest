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
    return {
      success: false,
      error: response.error
    }
  }

  return {
    success: true,
    value: response.body
  }
}