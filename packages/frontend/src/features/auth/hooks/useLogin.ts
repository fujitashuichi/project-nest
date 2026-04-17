import { LoginRequestSchema, type LoginRequest } from "@pkg/shared";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { AuthCtxType } from "../../../Context";
import { isSessionActive, login } from "../api";
import { parseFormData } from "../../../lib";

type Result = AuthCtxType["login"];

const errorMap = {
  UnRegistered: "そのメールアドレスは登録されていません",
  Unknown: "エラーが発生しました"
} as const;


export const useLogin = (setSessionStatus: AuthCtxType["session"]["setStatus"]): Result => {
  const [overrideStatus, setOverrideStatus] = useState<"error" | null>(null);
  const [errorMessage, setErrorMessage] = useState<Result["errorMessage"]>(null);

  const mutation = useMutation({
    mutationFn: (body: LoginRequest) => login(body),
    onSuccess: (result) => {
      if (!result.ok) {
        setOverrideStatus("error");
        setErrorMessage(errorMap[result.errorType])
        return setSessionStatus("inactive");
      }
      setSessionStatus("active");
      window.location.replace("/");
    },
    onError: async () => {
      setSessionStatus("idle");

      const session = await isSessionActive();
      if (session) {
        // auth.jsの通信による不整合が多いため、フォールバックを用意
        /*
          BE処理が成功しているにも関わらず通信が失敗することがあります。
          Express/React間の整合性を保つには課題が多く、
          BEのsessionコンテキストを直接参照する他ありませんでした。
        */
        mutation.status = "success";
        setSessionStatus("active");
        return window.location.replace("/");
      }

      setSessionStatus("inactive");
    }
  });


  const tryLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const parsed = await parseFormData({
      formData,
      schema: LoginRequestSchema,
      useFor: "noEmptyValues"
    });

    if (!parsed.success) {
      setSessionStatus("inactive");
      alert("入力値に不備があります");
      return;
    }

    setOverrideStatus(null);
    setSessionStatus("idle");
    mutation.mutate(parsed.data);
  }


  const trulyStatus = overrideStatus ?? (mutation.status === "success" ? "loggedIn" : mutation.status);

  return { status: trulyStatus, errorMessage, login: tryLogin }
}
