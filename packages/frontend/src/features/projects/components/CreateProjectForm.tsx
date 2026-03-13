import type React from "react";
import { useState } from "react";
import { AppButton } from "../../../components";
import { parseFormData } from "../../../lib";
import { PostProjectRequestSchema } from "@pkg/shared";
import { createProject } from "../api";
import { AppLoadingBar } from "../../../components/AppLoadingBar";

type Status = "loading" | "default" | "success";

export function CreateProjectForm() {
  const [status, setStatus] = useState<Status>("default");

  const errorMap = {
    ProjectAlreadyExists: "同名のプロジェクトが既に存在します",
    UserNotRegisteredError: "ユーザーが登録されていません",
    UnknownError: "申し訳ありません。エラーが発生しました",
  } as const;

  const tryCreateProject = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    const formData: FormData = new FormData(e.currentTarget);
    const parsed = await parseFormData(formData, PostProjectRequestSchema);

    if (!parsed.success) {
      setStatus("default");
      alert("入力内容に不備があります");
      return;
    }

    const result = await createProject(parsed.data);

    if (!result.success) {
      setStatus("default");
      const errorCode = result.errorType;
      alert(errorMap[errorCode]);
      return;
    }

    setStatus("success");
    setTimeout(() => setStatus("default"), 3000);
  };

  return (
    <>
      {status === "default" && (
        <form onSubmit={tryCreateProject}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            required
            minLength={1}
            maxLength={30}
            placeholder="project title"
          />

          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            maxLength={100}
            placeholder="project description"
          />

          <AppButton variant="primary" type="submit">
            Create Project
          </AppButton>
        </form>
      )}

      {status === "loading" && (
        <AppLoadingBar className="fixed top-0 left-1/2 -translate-x-1/2 z-10 w-20 h-1.5" />
      )}

      {status === "success" && (
        <h1>プロジェクトが作成されました</h1>
      )}
    </>
  );
}
